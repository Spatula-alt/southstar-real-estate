import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listAppointments from "./tools/list-appointments";
import bookAppointment from "./tools/book-appointment";
import listContactMessages from "./tools/list-contact-messages";
import sendContactMessage from "./tools/send-contact-message";
import listReviews from "./tools/list-reviews";
import submitReview from "./tools/submit-review";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "southstar-realty-mcp",
  title: "SouthStar Realty MCP",
  version: "0.1.0",
  instructions:
    "Tools for SouthStar Realty (Oriental Mindoro real estate): book/list property viewing appointments, send/list contact messages, and submit/list client reviews. Callers act as the signed-in app user.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [
    listAppointments,
    bookAppointment,
    listContactMessages,
    sendContactMessage,
    listReviews,
    submitReview,
  ],
});
