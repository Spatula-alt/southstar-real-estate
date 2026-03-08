import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type TabType = "messages" | "appointments" | "reviews";

const statusColors: Record<string, string> = {
  new: "#149f42",
  contacted: "#f59e0b",
  closed: "#999",
  pending: "#f59e0b",
  approved: "#149f42",
};

const Admin = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabType>("messages");
  const [messages, setMessages] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate("/login");
        return;
      }
      setUser(data.user);
      setLoading(false);
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const [msgRes, apptRes, revRes] = await Promise.all([
        supabase.from("contact_messages" as any).select("*").order("created_at", { ascending: false }),
        supabase.from("appointments" as any).select("*").order("created_at", { ascending: false }),
        supabase.from("reviews" as any).select("*").order("created_at", { ascending: false }),
      ]);
      if (msgRes.data) setMessages(msgRes.data as any[]);
      if (apptRes.data) setAppointments(apptRes.data as any[]);
      if (revRes.data) setReviews(revRes.data as any[]);
    };
    fetchData();
  }, [user]);

  const updateStatus = async (table: string, id: string, status: string) => {
    const { error } = await supabase.from(table as any).update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Could not update status.", variant: "destructive" });
      return;
    }
    toast({ title: "Updated", description: `Status changed to ${status}.` });
    // Refresh
    if (table === "contact_messages") {
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
    } else if (table === "appointments") {
      setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    } else {
      setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    }
  };

  if (loading) return <div className="wrap main-content"><p>Loading...</p></div>;

  const newMsgCount = messages.filter((m) => m.status === "new").length;
  const newApptCount = appointments.filter((a) => a.status === "new").length;
  const pendingRevCount = reviews.filter((r) => r.status === "pending").length;

  return (
    <>
      <header className="site-header">
        <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "10px" }}>
          <img src={southstarLogo} alt="SouthStar Realty logo" className="header-logo" />
          <h1>SouthStar Realty</h1>
        </Link>
      </header>

      <nav className="tab-nav">
        <div className="nav-container">
          <Link to="/">PROPERTIES</Link>
          <Link to="/admin" className="active">ADMIN</Link>
          <Link to="/login">LOG OUT</Link>
        </div>
      </nav>

      <main className="wrap main-content">
        <h2 className="section-title" style={{ textAlign: "left" }}>Admin Dashboard</h2>

        {/* Tabs */}
        <div className="admin-tabs">
          <button className={`admin-tab ${tab === "messages" ? "active" : ""}`} onClick={() => setTab("messages")}>
            Messages {newMsgCount > 0 && <span className="admin-badge">{newMsgCount}</span>}
          </button>
          <button className={`admin-tab ${tab === "appointments" ? "active" : ""}`} onClick={() => setTab("appointments")}>
            Appointments {newApptCount > 0 && <span className="admin-badge">{newApptCount}</span>}
          </button>
          <button className={`admin-tab ${tab === "reviews" ? "active" : ""}`} onClick={() => setTab("reviews")}>
            Reviews {pendingRevCount > 0 && <span className="admin-badge">{pendingRevCount}</span>}
          </button>
        </div>

        {/* Messages Tab */}
        {tab === "messages" && (
          <div className="admin-list">
            {messages.length === 0 && <p style={{ color: "#666" }}>No messages yet.</p>}
            {messages.map((m) => (
              <div key={m.id} className="admin-card">
                <div className="admin-card-header">
                  <strong>{m.name}</strong>
                  <span className="admin-status" style={{ background: statusColors[m.status] || "#999" }}>{m.status}</span>
                </div>
                <p className="admin-email">{m.email} {m.phone && `· ${m.phone}`}</p>
                <p className="admin-message">{m.message}</p>
                <div className="admin-card-footer">
                  <span className="admin-date">{new Date(m.created_at).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                  <div className="admin-actions">
                    {m.status === "new" && <button onClick={() => updateStatus("contact_messages", m.id, "contacted")}>Mark Contacted</button>}
                    {m.status !== "closed" && <button onClick={() => updateStatus("contact_messages", m.id, "closed")}>Close</button>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Appointments Tab */}
        {tab === "appointments" && (
          <div className="admin-list">
            {appointments.length === 0 && <p style={{ color: "#666" }}>No appointments yet.</p>}
            {appointments.map((a) => (
              <div key={a.id} className="admin-card">
                <div className="admin-card-header">
                  <strong>{a.name}</strong>
                  <span className="admin-status" style={{ background: statusColors[a.status] || "#999" }}>{a.status}</span>
                </div>
                <p className="admin-email">{a.email} {a.phone && `· ${a.phone}`}</p>
                <p className="admin-message">
                  📅 {new Date(a.preferred_date).toLocaleDateString("en-PH", { weekday: "long", month: "long", day: "numeric" })} at {a.preferred_time}
                  {a.municipality && ` · 📍 ${a.municipality}`}
                </p>
                {a.message && <p className="admin-message" style={{ fontStyle: "italic" }}>"{a.message}"</p>}
                <div className="admin-card-footer">
                  <span className="admin-date">{new Date(a.created_at).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })}</span>
                  <div className="admin-actions">
                    {a.status === "new" && <button onClick={() => updateStatus("appointments", a.id, "contacted")}>Mark Contacted</button>}
                    {a.status !== "closed" && <button onClick={() => updateStatus("appointments", a.id, "closed")}>Close</button>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reviews Tab */}
        {tab === "reviews" && (
          <div className="admin-list">
            {reviews.length === 0 && <p style={{ color: "#666" }}>No reviews yet.</p>}
            {reviews.map((r) => (
              <div key={r.id} className="admin-card">
                <div className="admin-card-header">
                  <strong>{r.name}</strong>
                  <span className="admin-status" style={{ background: statusColors[r.status] || "#999" }}>{r.status}</span>
                </div>
                <p className="admin-message">
                  {"★".repeat(r.rating_overall)}{"☆".repeat(5 - r.rating_overall)} — "{r.feedback}"
                </p>
                <p className="admin-email" style={{ fontSize: "0.8rem" }}>
                  Service: {r.rating_service} · Hospitality: {r.rating_hospitality} · Affordability: {r.rating_affordability} · Trust: {r.rating_trust}
                </p>
                <div className="admin-card-footer">
                  <span className="admin-date">{new Date(r.created_at).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })}</span>
                  <div className="admin-actions">
                    {r.status === "pending" && <button onClick={() => updateStatus("reviews", r.id, "approved")}>Approve</button>}
                    {r.status === "approved" && <button onClick={() => updateStatus("reviews", r.id, "pending")}>Unpublish</button>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default Admin;
