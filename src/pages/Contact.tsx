import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Message Sent!",
      description: `Thank you for your inquiry, ${formData.name}! We will contact you at ${formData.email} within 1-2 business days.`,
    });

    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Header */}
      <header className="site-header">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h1>SouthStar Realty</h1>
        </Link>
      </header>

      {/* Navigation */}
      <nav className="tab-nav">
        <div className="nav-container">
          <Link to="/">PROPERTIES</Link>
          <Link to="/popular">POPULAR</Link>
          <Link to="/about">ABOUT US</Link>
          <Link to="/contact" className="active">CONTACT</Link>
        </div>
      </nav>

      <main className="wrap main-content">
        <div className="property-overview">
          {/* Contact Form */}
          <article className="property-card">
            <div className="property-details">
              <h2>Contact Us</h2>

              <form onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
                <div>
                  <label htmlFor="name">Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="phone">Phone (optional)</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+63 912 345 6789"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit">Send Message</button>

                <p style={{ color: "#666", fontSize: "0.9rem", marginTop: "8px" }}>
                  We reply within 1-2 business days. By sending this message you agree to be contacted regarding your inquiry.
                </p>
              </form>
            </div>
          </article>

          {/* Office Info */}
          <article className="inquiry-box">
            <h3>Our Office</h3>
            <div style={{ color: "#666" }}>
              <p style={{ marginBottom: "8px" }}>📍 Calapan City, Oriental Mindoro</p>
              <p style={{ marginBottom: "8px" }}>📞 +63 912 345 6789</p>
              <p>
                📧{" "}
                <a href="mailto:info@southstarrealty.com" style={{ color: "var(--primary)" }}>
                  info@southstarrealty.com
                </a>
              </p>
            </div>

            <h4 style={{ fontWeight: 700, color: "var(--primary-dark)", marginTop: "16px", marginBottom: "8px" }}>Office Hours</h4>
            <p style={{ color: "#666" }}>
              Mon — Fri: 8:30 AM — 5:30 PM
              <br />
              Sat: 9:00 AM — 10:00 AM
            </p>

            <div style={{ marginTop: "16px" }}>
              <h4 style={{ fontWeight: 700, color: "var(--primary-dark)", marginBottom: "8px" }}>Quick Links</h4>
              <div>
                <p style={{ marginBottom: "4px" }}>
                  <Link to="/" style={{ color: "var(--primary)" }}>
                    View Properties
                  </Link>
                </p>
                <p>
                  <Link to="/about" style={{ color: "var(--primary)" }}>
                    About Us
                  </Link>
                </p>
              </div>
            </div>
          </article>
        </div>
      </main>

      {/* Footer */}
      <footer className="branded-footer">
        <div className="footer-content">
          <div className="footer-brand-section">
            <strong>SouthStar Realty</strong>
            <small>Reliable • Affordable • Trusted</small>
          </div>
          <div className="footer-copyright">
            © {new Date().getFullYear()} SouthStar Realty. All Rights Reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Contact;
