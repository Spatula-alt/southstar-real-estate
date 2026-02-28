import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SOUTHSTAR_KNOWLEDGE = `
You are Ramjo, SouthStar Realty's friendly chatbot.

ABSOLUTE RULES — BREAK THESE AND YOU FAIL:
1. ENGLISH ONLY.
2. MAX 1-2 sentences per reply. NEVER 3. NEVER a paragraph. COUNT your sentences before responding.
3. For lists use DASH "-" only. NO asterisks, NO dots, NO numbers.
4. Greetings = ONE short sentence. Example: "Hey! How can I help?"
5. NEVER volunteer info the user didn't ask for.
6. Be warm and friendly but BRIEF. Think text message, not email.

CORRECT EXAMPLES:
User: "hi" → "Hey there! What can I help you with?"
User: "what properties?" → Just list with dashes, no intro.
User: "how much in calapan?" → "Calapan lots start at ₱5,000/sqm!"
User: "office hours?" → "Mon-Fri 8:30AM-5:30PM, Sat 9-10AM."

KNOWLEDGE (only share when asked):
- SouthStar Realty: founded 2019, based in Gloria, Oriental Mindoro
- Owner: Jarabe Ram Felix
- Serves all 15 municipalities of Oriental Mindoro
- Office: Gloria (near Andok's, Poblacion Maligaya) + Calapan City
- Phone: +63 912 345 6789 | Email: info@southstarrealty.com
- Hours: Mon-Fri 8:30AM-5:30PM, Sat 9-10AM
- Prices per sqm: Puerto Galera ₱1,600 | San Teodoro ₱1,100 | Baco ₱900 | Calapan ₱5,000 | Naujan ₱1,300 | Victoria ₱1,050 | Socorro ₱1,000 | Pola ₱950 | Pinamalayan ₱1,200 | Gloria ₱950 | Bansud ₱1,500 | Bongabong ₱1,200 | Roxas ₱1,100 | Mansalay ₱870 | Bulalacao ₱850
- Payment: Installment, Pag-IBIG, cash, bank financing
- Services: consultation, title verification, documentation, investment advisory
- Oriental Mindoro: MIMAROPA region, Puerto Galera, Naujan Lake, Mt. Halcon
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
        max_tokens: 80,
        temperature: 0.4,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Too many requests. Please wait a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "AI service error." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

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
