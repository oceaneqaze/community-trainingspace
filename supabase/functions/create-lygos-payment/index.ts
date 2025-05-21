
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
    // Get request body
    const { email = "", locale = "fr", ipAddress = "0.0.0.0" } = await req.json();
    
    // Check if LYGOS_API_KEY is configured
    const apiKey = Deno.env.get("LYGOS_API_KEY");
    if (!apiKey) {
      throw new Error("LYGOS_API_KEY is not configured");
    }
    
    // Initialize Supabase client for database operations
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase environment variables");
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Generate a unique order ID
    const orderId = `DOPE-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Construct success and failure URLs
    const origin = req.headers.get("origin") || new URL(req.url).origin;
    const successUrl = `${origin}/payment/success?order_id=${orderId}`;
    const failureUrl = `${origin}/payment/failure?order_id=${orderId}`;
    
    // STEP 1: Create a Lygos payment session
    const createResponse = await fetch("https://api.lygosapp.com/v1/gateway", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 15000,
        shop_name: "DOPE Content",
        message: "Accès à vie DOPE Content",
        success_url: successUrl,
        failure_url: failureUrl,
        order_id: orderId,
        // Optional parameters
        email: email || undefined,
      }),
    });

    const createData = await createResponse.json();
    
    if (!createResponse.ok) {
      console.error("Lygos API error response:", createData);
      throw new Error(`Lygos API error: ${createData.message || JSON.stringify(createData)}`);
    }
    
    const gatewayId = createData.id;
    if (!gatewayId) {
      throw new Error("No gateway ID received from Lygos");
    }
    
    // STEP 2: Get the payment URL using the gateway ID
    const getResponse = await fetch(`https://api.lygosapp.com/v1/gateway/${gatewayId}`, {
      method: "GET",
      headers: {
        "api-key": apiKey,
      },
    });
    
    const gatewayData = await getResponse.json();
    
    if (!getResponse.ok || !gatewayData.link) {
      console.error("Error getting payment link:", gatewayData);
      throw new Error("Failed to retrieve payment link");
    }
    
    const paymentUrl = gatewayData.link;
    
    // Store payment information in the database
    const { data: paymentData, error: paymentError } = await supabase
      .from("payments")
      .insert({
        email: email,
        amount: 15000,
        currency: "XOF",
        lygos_order_id: orderId,
        lygos_payment_url: paymentUrl,
        status: "pending",
        locale: locale,
        ip_address: ipAddress,
      })
      .select()
      .single();
      
    if (paymentError) {
      console.error("Error storing payment:", paymentError);
      // Continue anyway, as this shouldn't stop the payment flow
    }

    // Return payment URL to client
    return new Response(JSON.stringify({ 
      paymentUrl: paymentUrl,
      orderId: orderId
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error creating payment:", error);
    
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
