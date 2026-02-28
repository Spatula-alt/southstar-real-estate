import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Comprehensive SouthStar Realty knowledge base
const SOUTHSTAR_KNOWLEDGE = `
You are Ramjo, SouthStar Realty's chatbot.

ABSOLUTE RULES — NEVER BREAK THESE:
1. ENGLISH ONLY
2. EVERY response must be 1-3 SHORT sentences. NEVER more. NEVER a paragraph. If you catch yourself writing more than 3 sentences, STOP and cut it down.
3. For lists, use DASH "-" only. NO asterisks, NO dots, NO numbers.
4. Greetings: reply in ONE sentence only. Example: "Hey! How can I help you today?"
5. NEVER repeat info the user didn't ask for
6. NEVER give long explanations — be snappy and direct

EXAMPLES OF CORRECT RESPONSES:
User: "hi ramjo" → "Hey there! How can I help you today?"
User: "what properties?" → Respond with bullet list ONLY, no intro sentence needed
User: "office hours?" → "Mon-Fri 8:30 AM - 5:30 PM, Sat 9:00 AM - 10:00 AM"
User: "tell me about calapan" → "Calapan City is the provincial capital with lots at ₱5,000/sqm — the highest value area we serve!"

KNOWLEDGE (use when asked, don't volunteer):
- SouthStar Realty: founded 2019, Gloria, Oriental Mindoro
- Serves all 15 municipalities of Oriental Mindoro
- Core values: Trust, Affordability, Local Expertise
- Office: Gloria (near Andok's, Poblacion Maligaya) + Calapan City
- Phone: +63 912 345 6789 | Email: info@southstarrealty.com
- Hours: Mon-Fri 8:30 AM-5:30 PM, Sat 9:00 AM-10:00 AM
- Prices: Puerto Galera ₱1,600 | San Teodoro ₱1,100 | Baco ₱900 | Calapan ₱5,000 | Naujan ₱1,300 | Victoria ₱1,050 | Socorro ₱1,000 | Pola ₱950 | Pinamalayan ₱1,200 | Gloria ₱950 | Bansud ₱1,500 | Bongabong ₱1,200 | Roxas ₱1,100 | Mansalay ₱870 | Bulalacao ₱850
- Payment: Installment, Pag-IBIG, cash, bank financing
- Services: consultation, title verification, documentation, investment advisory
- Oriental Mindoro: MIMAROPA region, known for Puerto Galera, Naujan Lake, Mt. Halcon, Mangyan culture
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
        max_tokens: 150,
        temperature: 0.5,
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
