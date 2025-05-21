
import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { v4 as uuidv4 } from "https://esm.sh/uuid@9.0.1";

// CORS headers for the function
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Base amount in FCFA
const BASE_AMOUNT = 15000;
const SHOP_NAME = "DOPE Content";
const MESSAGE = "Accès à vie à DOPE Content - plateforme complète pour créer du contenu avec l'IA";

// Function to determine currency and convert amount based on locale
function getAmountForLocale(locale = "fr") {
  // Default is XOF (FCFA)
  let currency = "XOF";
  let amount = BASE_AMOUNT;
  
  // You can add more currency conversions here
  if (locale.startsWith("en")) {
    // Convert to USD (approximate conversion: 1 USD = ~600 FCFA)
    currency = "USD";
    amount = Math.round(BASE_AMOUNT / 600);
  } else if (locale.startsWith("fr-FR") || locale.startsWith("fr-BE") || locale.startsWith("fr-CH")) {
    // Convert to EUR (approximate conversion: 1 EUR = ~655 FCFA)
    currency = "EUR";
    amount = Math.round(BASE_AMOUNT / 655);
  }
  
  return { currency, amount };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Get API key from environment variable
    const LYGOS_API_KEY = Deno.env.get("LYGOS_API_KEY");
    if (!LYGOS_API_KEY) {
      throw new Error("LYGOS_API_KEY is not configured");
    }

    // Parse request body
    const { email, locale, ipAddress } = await req.json();
    
    // Get amount and currency based on locale
    const { amount, currency } = getAmountForLocale(locale);
    
    // Generate a unique order ID
    const orderId = uuidv4();
    
    // Create client for Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Create Lygos payment
    const lygosUrl = "https://api.lygosapp.com/v1/gateway";
    const payload = {
      amount: currency === "XOF" ? amount : amount * 100, // Convert to cents for non-XOF currencies
      shop_name: SHOP_NAME,
      message: MESSAGE,
      success_url: `${req.headers.get("origin")}/payment/success?order_id=${orderId}`,
      failure_url: `${req.headers.get("origin")}/payment/failure?order_id=${orderId}`,
      order_id: orderId,
      currency: currency
    };
    
    const headers = {
      "api-key": LYGOS_API_KEY,
      "Content-Type": "application/json"
    };
    
    console.log("Sending request to Lygos:", payload);
    
    // Call Lygos API
    const lygosResponse = await fetch(lygosUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload)
    });
    
    const lygosData = await lygosResponse.json();
    
    if (!lygosResponse.ok || !lygosData.link) {
      console.error("Lygos API error:", lygosData);
      throw new Error(`Lygos API error: ${JSON.stringify(lygosData)}`);
    }
    
    // Store payment information in the database
    const { data: paymentData, error: paymentError } = await supabase
      .from('payments')
      .insert({
        amount: amount,
        currency: currency,
        lygos_order_id: orderId,
        lygos_payment_url: lygosData.link,
        client_ip: ipAddress,
        locale: locale,
        user_id: null // Will be updated if user is logged in or after registration
      })
      .select()
      .single();
    
    if (paymentError) {
      console.error("Error storing payment:", paymentError);
      throw new Error(`Error storing payment: ${paymentError.message}`);
    }
    
    return new Response(
      JSON.stringify({ 
        paymentUrl: lygosData.link,
        orderId: orderId,
        amount: amount,
        currency: currency,
        paymentId: paymentData.id
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error creating payment:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
