import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AyalaFooter from "@/components/AyalaFooter";
import { getAvatarUrl } from "@/utils/avatarSeed";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const StarRating = ({ value, onChange, size = 20 }: { value: number; onChange?: (v: number) => void; size?: number }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {[1, 2, 3, 4, 5].map((s) => (
      <span
        key={s}
        onClick={() => onChange?.(s)}
        style={{ cursor: onChange ? "pointer" : "default", fontSize: size, color: s <= value ? "#f59e0b" : "#ddd" }}
      >
        ★
      </span>
    ))}
  </div>
);

const CategoryBar = ({ label, value }: { label: string; value: number }) => (
  <div className="review-category-bar">
    <span className="category-label">{label}</span>
    <div className="category-track">
      <div className="category-fill" style={{ width: `${(value / 5) * 100}%` }} />
    </div>
    <span className="category-value">{value.toFixed(1)}</span>
  </div>
);

interface Review {
  id: string;
  name: string;
  rating_overall: number;
  rating_service: number;
  rating_hospitality: number;
  rating_affordability: number;
  rating_trust: number;
  feedback: string;
  avatar_url: string | null;
}

const About = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    feedback: "",
    rating_overall: 5,
    rating_service: 5,
    rating_hospitality: 5,
    rating_affordability: 5,
    rating_trust: 5,
  });

  useEffect(() => {
    const fetchReviews = async () => {
      const { data } = await supabase
        .from("reviews" as any)
        .select("id, name, rating_overall, rating_service, rating_hospitality, rating_affordability, rating_trust, feedback, avatar_url")
        .eq("status", "approved")
        .order("created_at", { ascending: false })
        .limit(8);
      if (data && (data as any[]).length > 0) {
        setReviews(data as any as Review[]);
      }
    };
    fetchReviews();
  }, []);

  const handleReviewSubmit = async () => {
    if (!form.name.trim() || !form.feedback.trim()) {
      toast({ title: "Error", description: "Name and feedback are required.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("reviews" as any).insert({
      name: form.name.trim(),
      feedback: form.feedback.trim(),
      rating_overall: form.rating_overall,
      rating_service: form.rating_service,
      rating_hospitality: form.rating_hospitality,
      rating_affordability: form.rating_affordability,
      rating_trust: form.rating_trust,
      avatar_url: getAvatarUrl(form.name, 80),
      status: "pending",
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Error", description: "Could not submit review.", variant: "destructive" });
      return;
    }
    toast({ title: "Review Submitted!", description: "Your review will be visible after admin approval." });
    setForm({ name: "", feedback: "", rating_overall: 5, rating_service: 5, rating_hospitality: 5, rating_affordability: 5, rating_trust: 5 });
    setShowForm(false);
  };

  // Default testimonials if no approved reviews in DB yet
  const displayReviews = reviews.length > 0 ? reviews : [
    { id: "1", name: "Maria Dela Cruz", rating_overall: 5, rating_service: 5, rating_hospitality: 5, rating_affordability: 4, rating_trust: 5, feedback: "Bought a 500sqm lot in Pinamalayan through SouthStar. The title was clean and transfer was done in just 3 weeks. Very smooth!", avatar_url: null },
    { id: "2", name: "Roberto Garcia", rating_overall: 5, rating_service: 5, rating_hospitality: 4, rating_affordability: 5, rating_trust: 5, feedback: "As an OFW, it was hard to buy land remotely. SouthStar handled everything — documents, verification, even site photos. Highly recommend!", avatar_url: null },
    { id: "3", name: "Jenny Santos", rating_overall: 5, rating_service: 4, rating_hospitality: 5, rating_affordability: 5, rating_trust: 5, feedback: "I was skeptical at first but Sir Ram was very patient explaining every step. Got my farmland in Bansud at a great price. Legit sila!", avatar_url: null },
    { id: "4", name: "Mark Anthony Reyes", rating_overall: 4, rating_service: 4, rating_hospitality: 4, rating_affordability: 4, rating_trust: 5, feedback: "SouthStar helped me find a commercial lot near the highway in Calapan. Professional service from consultation to final paperwork.", avatar_url: null },
  ];

  // Calculate average category ratings
  const avgRatings = {
    service: displayReviews.reduce((s, r) => s + r.rating_service, 0) / displayReviews.length,
    hospitality: displayReviews.reduce((s, r) => s + r.rating_hospitality, 0) / displayReviews.length,
    affordability: displayReviews.reduce((s, r) => s + r.rating_affordability, 0) / displayReviews.length,
    trust: displayReviews.reduce((s, r) => s + r.rating_trust, 0) / displayReviews.length,
  };
  const overallAvg = displayReviews.reduce((s, r) => s + r.rating_overall, 0) / displayReviews.length;

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
          <Link to="/popular">POPULAR</Link>
          <Link to="/about" className="active">ABOUT US</Link>
          <Link to="/contact">CONTACT</Link>
          <Link to="/agents">AGENTS</Link>
          <Link to="/login">LOG IN</Link>
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          padding: "72px 14px", textAlign: "center", color: "#fff", position: "relative", overflow: "hidden",
          backgroundSize: "cover", backgroundPosition: "center",
          backgroundImage: "url(https://travelorientalmindoro.ph/Content/img/uploads/default.jpg)"
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "12px" }}>Building Dreams in Oriental Mindoro</h2>
          <p style={{ fontSize: "1rem", opacity: 0.95 }}>
            We connect families, investors, and businesses to properties that enrich lives and uplift communities — guided by our values of trust, affordability, and reliability.
          </p>
        </div>
      </section>

      <main className="wrap main-content">
        {/* About Section */}
        <section style={{ marginBottom: "20px" }}>
          <h2 className="section-title" style={{ textAlign: "left" }}>About SouthStar Realty</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", alignItems: "center" }}>
            <img
              src="https://scontent.fmnl17-6.fna.fbcdn.net/v/t39.30808-6/558088971_122140095146909446_312887583566325529_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=jxFK7AQqRycQ7kNvwEHyskq&_nc_oc=AdndmQT9dHYMYDxGirBcUKjcWg7bWae5lK82IAh3Brj4ryLkzPlThhrnwcWIaSlqX4c&_nc_zt=23&_nc_ht=scontent.fmnl17-6.fna&_nc_gid=I32UcQrvp_SjtVjU472PEw&oh=00_AfimqyDSTbuHondFHDZuSaOahyt0An2tdlLyH1hFeSXetA&oe=69172CD2"
              alt="SouthStar Realty Office"
              style={{ width: "100%", borderRadius: "12px", boxShadow: "0 10px 30px rgba(11,106,40,0.06)" }}
            />
            <div>
              <p style={{ fontWeight: 600, color: "var(--primary-dark)", marginBottom: "12px" }}>
                SouthStar Realty is a growing real estate service provider in Oriental Mindoro, dedicated to helping families, investors, and businesses find the perfect property.
              </p>
              <p style={{ color: "#666" }}>
                From residential lots to agricultural and commercial lands, we are trusted by many for our <strong>affordable, reliable, and transparent property solutions.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section style={{ marginTop: "20px" }}>
          <h2 className="section-title" style={{ textAlign: "left" }}>Mission & Vision</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "8px" }}>
            <article className="property-card">
              <div className="property-details">
                <h3>Our Mission</h3>
                <p style={{ color: "#666" }}>To connect people with their dream properties by making land ownership <strong>accessible, affordable, and secure</strong>.</p>
              </div>
            </article>
            <article className="property-card">
              <div className="property-details">
                <h3>Our Vision</h3>
                <p style={{ color: "#666" }}>To become the <strong>most reliable and community-driven real estate company in Oriental Mindoro</strong>.</p>
              </div>
            </article>
          </div>
        </section>

        {/* Core Values */}
        <section style={{ marginTop: "20px" }}>
          <h2 className="section-title" style={{ textAlign: "left" }}>Our Core Values</h2>
          <div className="core-values-carousel">
            <div className="core-values-track">
              {[
                { title: "Trust", desc: "Every deal is built on integrity and transparency.", icon: "🤝" },
                { title: "Affordability", desc: "Cost-effective solutions without compromising value.", icon: "💰" },
                { title: "Local Expertise", desc: "Deep knowledge of Oriental Mindoro opportunities.", icon: "🏠" },
              ].map((value, idx) => (
                <article key={`first-${idx}`} className="core-value-card">
                  <span className="value-icon">{value.icon}</span>
                  <h3>{value.title}</h3>
                  <p>{value.desc}</p>
                </article>
              ))}
              {[
                { title: "Trust", desc: "Every deal is built on integrity and transparency.", icon: "🤝" },
                { title: "Affordability", desc: "Cost-effective solutions without compromising value.", icon: "💰" },
                { title: "Local Expertise", desc: "Deep knowledge of Oriental Mindoro opportunities.", icon: "🏠" },
              ].map((value, idx) => (
                <article key={`second-${idx}`} className="core-value-card">
                  <span className="value-icon">{value.icon}</span>
                  <h3>{value.title}</h3>
                  <p>{value.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Journey Timeline */}
        <section style={{ marginTop: "20px" }}>
          <h2 className="section-title" style={{ textAlign: "left" }}>Our Journey</h2>
          <div style={{ borderLeft: "3px solid var(--primary)", paddingLeft: "18px", margin: "18px 0", color: "#666" }}>
            <p style={{ marginBottom: "8px" }}><strong>2019:</strong> Founded to bring affordable housing to Mindoreños.</p>
            <p style={{ marginBottom: "8px" }}><strong>2020:</strong> Expanded services to agricultural to residential properties.</p>
            <p style={{ marginBottom: "8px" }}><strong>2023:</strong> Trusted partner for investors & landowners across Oriental Mindoro.</p>
            <p><strong>Today:</strong> Growing stronger, serving families & communities with dedication.</p>
          </div>
        </section>

        {/* Office & Map */}
        <section style={{ marginTop: "20px" }}>
          <h2 className="section-title" style={{ textAlign: "left" }}>Visit Our Office</h2>
          <p style={{ color: "#666", marginTop: "6px" }}>📍 In front of Gloria Central School, near Andok's, Poblacion Maligaya, Gloria, Oriental Mindoro.</p>
          <div className="map-section" style={{ marginTop: "12px", marginBottom: 0 }}>
            <div className="map-box">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238.2567177562571!2d121.47774517536163!3d12.968916031341093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bca8c51d3e4ae5%3A0xbb2d39ec13343e47!2sSTAR%20GYM%20AND%20SALON!5e1!3m2!1sen!2sph!4v1762691999295!5m2!1sen!2sph"
                style={{ height: "360px" }}
                loading="lazy"
                title="SouthStar Realty Office Location"
              />
            </div>
          </div>
        </section>

        {/* REDESIGNED REVIEW SECTION */}
        <section style={{ marginTop: "30px" }}>
          <h2 className="section-title" style={{ textAlign: "left" }}>What Our Clients Say</h2>

          {/* Rating Summary - Play Store Style */}
          <div className="review-summary">
            <div className="review-summary-left">
              <span className="review-big-number">{overallAvg.toFixed(1)}</span>
              <StarRating value={Math.round(overallAvg)} size={18} />
              <span className="review-count">{displayReviews.length} reviews</span>
            </div>
            <div className="review-summary-right">
              <CategoryBar label="Service" value={avgRatings.service} />
              <CategoryBar label="Hospitality" value={avgRatings.hospitality} />
              <CategoryBar label="Affordability" value={avgRatings.affordability} />
              <CategoryBar label="Trust" value={avgRatings.trust} />
            </div>
          </div>

          {/* Review Cards - Compact horizontal */}
          <div className="review-cards-grid">
            {displayReviews.map((r) => (
              <article key={r.id} className="review-card">
                <div className="review-card-header">
                  <img
                    src={r.avatar_url || getAvatarUrl(r.name, 48)}
                    alt={r.name}
                    className="review-avatar"
                  />
                  <div>
                    <div className="review-author">{r.name}</div>
                    <StarRating value={r.rating_overall} size={14} />
                  </div>
                </div>
                <p className="review-text">"{r.feedback}"</p>
              </article>
            ))}
          </div>

          {/* Submit Review Button */}
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <button className="buy-btn" onClick={() => setShowForm(!showForm)}>
              {showForm ? "Cancel" : "Write a Review"}
            </button>
          </div>

          {/* Review Submission Form */}
          {showForm && (
            <div className="review-form-box">
              <h4>Submit Your Review</h4>
              <div className="review-form-field">
                <label>Your Name *</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" />
              </div>
              <div className="review-form-field">
                <label>Overall Rating</label>
                <StarRating value={form.rating_overall} onChange={(v) => setForm({ ...form, rating_overall: v })} size={24} />
              </div>
              <div className="review-form-ratings">
                <div>
                  <label>Service</label>
                  <StarRating value={form.rating_service} onChange={(v) => setForm({ ...form, rating_service: v })} size={18} />
                </div>
                <div>
                  <label>Hospitality</label>
                  <StarRating value={form.rating_hospitality} onChange={(v) => setForm({ ...form, rating_hospitality: v })} size={18} />
                </div>
                <div>
                  <label>Affordability</label>
                  <StarRating value={form.rating_affordability} onChange={(v) => setForm({ ...form, rating_affordability: v })} size={18} />
                </div>
                <div>
                  <label>Trust</label>
                  <StarRating value={form.rating_trust} onChange={(v) => setForm({ ...form, rating_trust: v })} size={18} />
                </div>
              </div>
              <div className="review-form-field">
                <label>Your Feedback *</label>
                <textarea value={form.feedback} onChange={(e) => setForm({ ...form, feedback: e.target.value })} rows={4} placeholder="Share your experience..." />
              </div>
              <button className="buy-btn" onClick={handleReviewSubmit} disabled={submitting} style={{ width: "100%" }}>
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
              <p style={{ color: "#888", fontSize: "0.8rem", marginTop: 8 }}>Reviews are published after admin approval.</p>
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="property-card" style={{ marginTop: "30px" }}>
          <div className="property-details" style={{ textAlign: "center" }}>
            <h3>Join Our Mission</h3>
            <p style={{ color: "#666", maxWidth: "820px", margin: "0 auto 12px" }}>
              Looking for a trusted real estate partner? Be part of our journey in building Oriental Mindoro's future.
            </p>
            <Link to="/contact" className="buy-btn">Get in Touch</Link>
          </div>
        </section>
      </main>

      <AyalaFooter />
    </>
  );
};

export default About;
