import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "book_appointment",
  title: "Book a property viewing",
  description: "Book a property viewing appointment with SouthStar Realty.",
  inputSchema: {
    name: z.string().trim().min(1),
    email: z.string().trim().email(),
    phone: z.string().trim().optional(),
    municipality: z.string().trim().optional(),
    property_id: z.string().trim().optional(),
    preferred_date: z.string().describe("ISO date, YYYY-MM-DD"),
    preferred_time: z.string().describe("e.g. 10:00 AM"),
    message: z.string().optional(),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async (input, ctx: ToolContext) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY!,
      {
        global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
        auth: { persistSession: false, autoRefreshToken: false },
      },
    );
    const { data, error } = await supabase.from("appointments").insert(input).select().single();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: `Appointment booked. Confirmation ID: ${data.id}` }],
      structuredContent: { appointment: data },
    };
  },
});
