import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

const rating = z.number().int().min(1).max(5);

export default defineTool({
  name: "submit_review",
  title: "Submit a review",
  description: "Submit a client review for SouthStar Realty. Review starts as pending until approved.",
  inputSchema: {
    name: z.string().trim().min(1),
    feedback: z.string().trim().min(1),
    rating_overall: rating.optional(),
    rating_service: rating.optional(),
    rating_hospitality: rating.optional(),
    rating_affordability: rating.optional(),
    rating_trust: rating.optional(),
    avatar_url: z.string().url().optional(),
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
    const { data, error } = await supabase.from("reviews").insert(input).select().single();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: `Review submitted (pending). ID: ${data.id}` }],
      structuredContent: { review: data },
    };
  },
});
