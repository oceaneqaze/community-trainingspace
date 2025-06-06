
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase environment variables");
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Get request body
    const { order_id, status, transaction_id, gateway_id } = await req.json();
    
    if (!order_id) {
      throw new Error("Missing order_id");
    }
    
    // Default to success if status is not provided (for manual verification)
    let paymentStatus = status || "success";
    
    // If gateway_id is provided, verify payment status with Lygos API
    if (gateway_id && !status) {
      try {
        const apiKey = Deno.env.get("LYGOS_API_KEY");
        if (!apiKey) {
          throw new Error("LYGOS_API_KEY is not configured");
        }
        
        // Fetch the payment status from Lygos API
        const verifyResponse = await fetch(`https://api.lygosapp.com/v1/gateway/${gateway_id}`, {
          method: "GET",
          headers: {
            "api-key": apiKey,
            "Content-Type": "application/json",
          },
        });
        
        if (!verifyResponse.ok) {
          throw new Error(`Error verifying payment: ${verifyResponse.status}`);
        }
        
        const paymentData = await verifyResponse.json();
        console.log("Lygos payment verification:", paymentData);
        
        // Update the status based on the Lygos verification
        // Note: This is a simplified check. The Lygos API response format may vary.
        if (paymentData && paymentData.order_id === order_id) {
          // Payment exists and matches our order_id, consider it successful
          paymentStatus = "success";
        } else {
          // Payment doesn't match, might be fraudulent
          paymentStatus = "failed";
        }
      } catch (apiError) {
        console.error("Error verifying payment with Lygos API:", apiError);
        // Continue with the provided status if API verification fails
      }
    }
    
    // Update payment status in database
    const { data: payment, error: selectError } = await supabase
      .from("payments")
      .select("id, status, email")
      .eq("lygos_order_id", order_id)
      .single();
      
    if (selectError) {
      throw new Error(`Payment not found: ${selectError.message}`);
    }
    
    // Only update if payment is still pending
    if (payment.status === "pending") {
      // Generate invitation code if payment is successful
      let invitationCode = null;
      
      if (paymentStatus === "success") {
        // Generate a random 8-character invitation code
        invitationCode = Math.random().toString(36).substring(2, 10).toUpperCase();
        
        // Make sure the invitation code is unique
        const { count, error: countError } = await supabase
          .from("invitations")
          .select("id", { count: "exact", head: true })
          .eq("code", invitationCode);
          
        if (countError) {
          console.error("Error checking invitation code:", countError);
        } else if (count && count > 0) {
          // If code already exists, regenerate it
          invitationCode = `${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Date.now().toString(36).substring(-4).toUpperCase()}`;
        }
        
        // Create an invitation
        const { error: invitationError } = await supabase
          .from("invitations")
          .insert({
            code: invitationCode,
            status: "unused",
            created_by: "system",
            payment_id: payment.id,
          });
          
        if (invitationError) {
          console.error("Error creating invitation:", invitationError);
        }
      }
      
      // Update payment status
      const { data: updatedPayment, error: updateError } = await supabase
        .from("payments")
        .update({
          status: paymentStatus,
          transaction_id: transaction_id || null,
          updated_at: new Date().toISOString(),
          invitation_code: invitationCode,
        })
        .eq("id", payment.id)
        .select()
        .single();
        
      if (updateError) {
        throw new Error(`Error updating payment: ${updateError.message}`);
      }
      
      if (paymentStatus === "success" && payment.email) {
        // Send email with invitation code (would be implemented with another service)
        console.log(`Email would be sent to ${payment.email} with code ${invitationCode}`);
      }
      
      return new Response(JSON.stringify({ 
        success: true,
        status: updatedPayment.status,
        invitation_code: updatedPayment.invitation_code
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }
    
    // Payment already processed
    return new Response(JSON.stringify({ 
      success: true,
      status: payment.status,
      invitation_code: payment.invitation_code,
      message: "Payment already processed"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
    
  } catch (error) {
    console.error("Webhook error:", error);
    
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
