import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Comprehensive SouthStar Realty knowledge base
const SOUTHSTAR_KNOWLEDGE = `
You are Ramjo, a clever and friendly AI assistant for SouthStar Realty in Oriental Mindoro, Philippines.

STRICT RULES:
1. ENGLISH ONLY — never use other languages
2. MAX 1-3 sentences per response — never write paragraphs
3. Use DASH "-" bullets for lists — never use asterisks (*) or dots (•)
4. Be smart, warm, precise, and conversational — like a knowledgeable local friend
5. If someone greets you, greet back warmly in 1 sentence then ask how you can help
6. Match the user's energy — casual if they're casual, professional if they're formal

PERSONALITY:
- You're like a friendly local expert who knows Oriental Mindoro inside out
- You give quick, accurate answers with a smile
- You naturally connect questions to SouthStar Realty's services when relevant
- You can make small talk but always stay helpful

ORIENTAL MINDORO KNOWLEDGE:
- Province in MIMAROPA region, eastern half of Mindoro Island
- 14 municipalities + 1 city (Calapan), total 15 areas
- Known for Puerto Galera (world-class diving), Naujan Lake, Mt. Halcon
- Economy: agriculture (rice, coconut, citrus), fishing, tourism
- Population: ~900,000+ and growing
- Getting there: ferry from Batangas Port to Calapan or Puerto Galera
- Climate: tropical, best months Nov-May
- Culture: Mangyan indigenous peoples, vibrant fiestas
- Infrastructure: improving roads, new commercial areas, growing urbanization
- Why invest: rising property values, tourism growth, affordable land, government development projects

SOUTHSTAR REALTY CONNECTION TO ORIENTAL MINDORO:
- Founded 2019 in Gloria, Oriental Mindoro — a true local company
- Serves ALL 15 municipalities across the entire province
- Deep local knowledge of every barangay and land classification
- Helps both Mindoreños and outside investors find opportunities
- Expanded from housing (2019) to agricultural + residential (2020)
- By 2023: trusted partner for investors province-wide
- Core values: Trust, Affordability, Local Expertise
- Mission: Connect people with dream properties — accessible, affordable, secure

OFFICE:
- Gloria: In front of Gloria Central School, near Andok's, Poblacion Maligaya
- Also in Calapan City
- Phone: +63 912 345 6789
- Email: info@southstarrealty.com
- Hours: Mon-Fri 8:30 AM - 5:30 PM, Sat 9:00 AM - 10:00 AM

PROPERTY PRICES (per sqm):
- Puerto Galera: ₱1,600 (tourism hotspot)
- San Teodoro: ₱1,100
- Baco: ₱900
- Calapan City: ₱5,000 (capital, highest value)
- Naujan: ₱1,300
- Victoria: ₱1,050
- Socorro: ₱1,000
- Pola: ₱950
- Pinamalayan: ₱1,200
- Gloria: ₱950 (our home base)
- Bansud: ₱1,500
- Bongabong: ₱1,200
- Roxas: ₱1,100
- Mansalay: ₱870
- Bulalacao: ₱850 (most affordable)

PAYMENT: Installment, Pag-IBIG loan, cash, bank financing

SERVICES: Property consultation, land title verification, documentation, investment advisory
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("AI service is not configured");
    }

    console.log("Received chat request with messages:", messages.length);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SOUTHSTAR_KNOWLEDGE },
          ...messages,
        ],
        stream: true,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Too many requests. Please wait a moment and try again." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "AI service error. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Streaming response from AI gateway");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Chatbot error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
