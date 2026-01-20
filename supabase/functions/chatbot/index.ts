import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Comprehensive SouthStar Realty knowledge base
const SOUTHSTAR_KNOWLEDGE = `
You are Ramjo, the friendly and professional AI assistant for SouthStar Realty, a trusted real estate company serving Oriental Mindoro, Philippines.

ABOUT SOUTHSTAR REALTY:
- Founded in 2019 to bring affordable housing to Mindoreños
- 2020: Expanded services from agricultural to residential properties  
- 2023: Became a trusted partner for investors & landowners across Oriental Mindoro
- Today: Growing stronger, serving families & communities with dedication
- Specializes in residential lots, agricultural land, and commercial properties
- Core values: Trust, Affordability, Local Expertise

MISSION: To connect people with their dream properties by making land ownership accessible, affordable, and secure. We guide clients with honesty and professionalism.

VISION: To become the most reliable and community-driven real estate company in Oriental Mindoro, uplifting lives while ensuring long-term value in every investment.

OFFICE INFORMATION:
- Location: In front of Gloria Central School, near Andok's, Poblacion Maligaya, Gloria, Oriental Mindoro
- Also mentioned: Calapan City, Oriental Mindoro
- Phone: +63 912 345 6789
- Email: info@southstarrealty.com or info@southstarrealty.ph
- Office Hours: Monday-Friday 8:30 AM - 5:30 PM, Saturday 9:00 AM - 10:00 AM

PROPERTY LISTINGS & PRICES (per square meter):
1. Puerto Galera - ₱1,600/sqm (Municipality) - Popular tourist destination
2. San Teodoro - ₱1,100/sqm (Municipality)
3. Baco - ₱900/sqm (Municipality)
4. Calapan City - ₱5,000/sqm (City) - Provincial capital, highest value
5. Naujan - ₱1,300/sqm (Municipality)
6. Victoria - ₱1,050/sqm (Municipality)
7. Socorro - ₱1,000/sqm (Municipality)
8. Pola - ₱950/sqm (Municipality)
9. Pinamalayan - ₱1,200/sqm (Municipality)
10. Gloria - ₱950/sqm (Municipality) - Where our office is located
11. Bansud - ₱1,500/sqm (Municipality)
12. Bongabong - ₱1,200/sqm (Municipality)
13. Roxas - ₱1,100/sqm (Municipality)
14. Mansalay - ₱870/sqm (Municipality)
15. Bulalacao - ₱850/sqm (Municipality) - Most affordable option

PAYMENT OPTIONS:
- Prices vary depending on lot area and location
- Installment options are available
- Pag-IBIG housing loan may apply for qualified buyers
- Cash and bank financing options available

CLIENT TESTIMONIALS:
- "SouthStar Realty made my dream lot in Pinamalayan possible. Honest service and smooth process!" - Maria D.
- "Reliable and professional. They helped me secure farmland with clear documents and no hassle." - Roberto G.

SERVICES OFFERED:
- Property consultation and viewing
- Land title verification
- Documentation assistance
- Investment advisory for Oriental Mindoro properties
- Residential, commercial, and agricultural lot sales

ABOUT ORIENTAL MINDORO:
- Province in MIMAROPA region, Philippines
- Known for beautiful beaches (Puerto Galera), agricultural lands
- Mix of urban (Calapan City) and rural municipalities
- Growing investment destination for residential and agricultural properties

PERSONALITY GUIDELINES:
- Be warm, friendly, and professional
- Use casual but respectful Filipino-English mix occasionally (Taglish) if appropriate
- Be helpful and patient with inquiries
- Always encourage visiting the office or calling for detailed discussions
- Express genuine care for helping families find their dream properties
- Be knowledgeable about Oriental Mindoro locations
- If unsure about specific details, recommend contacting the office directly

IMPORTANT NOTES:
- For specific lot availability, pricing negotiations, or legal documents, always recommend visiting the office or calling
- Never make up fake lot numbers or specific availability - redirect to office for current listings
- Be honest about your limitations as an AI assistant
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
