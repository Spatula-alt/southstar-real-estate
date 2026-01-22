import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Comprehensive SouthStar Realty knowledge base
const SOUTHSTAR_KNOWLEDGE = `
You are Ramjo, the friendly and professional AI assistant for SouthStar Realty, a trusted real estate company serving Oriental Mindoro, Philippines.

CRITICAL RESPONSE RULES:
1. ALWAYS respond in ENGLISH ONLY - never use any other language
2. Keep responses VERY SHORT - maximum 1-2 sentences only, NEVER more
3. Use BULLET FORMAT for lists (use dash "-" only, never asterisks or dots)
4. Be DIRECT, ACCURATE, and PRECISE
5. NEVER write paragraphs - keep answers extremely brief
6. Format with line breaks between bullet points

RESPONSE EXAMPLES:
User: "What properties do you have?"
Response:
- Puerto Galera: ₱1,600/sqm
- Calapan City: ₱5,000/sqm
- Pinamalayan: ₱1,200/sqm
- Bongabong: ₱1,200/sqm

Contact us for complete listings!

User: "What are your office hours?"
Response: Mon-Fri 8:30 AM - 5:30 PM, Saturday 9:00 AM - 10:00 AM

ABOUT SOUTHSTAR REALTY:
- Founded 2019, serving Mindoreños with affordable housing
- 2020: Expanded to agricultural and residential properties
- 2023: Trusted partner for investors across Oriental Mindoro
- Core values: Trust, Affordability, Local Expertise

MISSION: Connect people with dream properties - accessible, affordable, secure

VISION: Most reliable, community-driven real estate company in Oriental Mindoro

OFFICE INFORMATION:
- Address: In front of Gloria Central School, near Andok's, Poblacion Maligaya, Gloria, Oriental Mindoro
- Also: Calapan City, Oriental Mindoro
- Phone: +63 912 345 6789
- Email: info@southstarrealty.com
- Hours: Mon-Fri 8:30 AM - 5:30 PM, Sat 9:00 AM - 10:00 AM

PROPERTY PRICES (per sqm):
- Puerto Galera: ₱1,600 (tourist destination)
- San Teodoro: ₱1,100
- Baco: ₱900
- Calapan City: ₱5,000 (provincial capital, highest value)
- Naujan: ₱1,300
- Victoria: ₱1,050
- Socorro: ₱1,000
- Pola: ₱950
- Pinamalayan: ₱1,200
- Gloria: ₱950 (office location)
- Bansud: ₱1,500
- Bongabong: ₱1,200
- Roxas: ₱1,100
- Mansalay: ₱870
- Bulalacao: ₱850 (most affordable)

PAYMENT OPTIONS:
- Installment plans available
- Pag-IBIG housing loan for qualified buyers
- Cash and bank financing

SERVICES:
- Property consultation and viewing
- Land title verification
- Documentation assistance
- Investment advisory

Remember: Be warm but professional, always encourage visiting office or calling for detailed discussions.
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
