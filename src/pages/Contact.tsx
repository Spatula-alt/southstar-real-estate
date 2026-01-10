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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="site-header">
        <h1>SouthStar Realty</h1>
        <p className="tag">Contact Us</p>
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

      <main className="wrap main-content flex-1">
        <div className="property-overview">
          {/* Contact Form */}
          <article className="property-card">
            <div className="property-details">
              <h2>Contact Us</h2>

              <form onSubmit={handleSubmit} className="form mt-4">
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

                <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '8px' }}>
                  We reply within 1-2 business days. By sending this message you agree to be contacted regarding your inquiry.
                </p>
              </form>
            </div>
          </article>

          {/* Office Info */}
          <article className="inquiry-box">
            <h3>Our Office</h3>
            <div style={{ color: '#666' }}>
              <p className="mb-2">📍 Calapan City, Oriental Mindoro</p>
              <p className="mb-2">📞 +63 912 345 6789</p>
              <p>
                📧{" "}
                <a href="mailto:info@southstarrealty.com" style={{ color: 'var(--primary)' }}>
                  info@southstarrealty.com
                </a>
              </p>
            </div>

            <h4 style={{ fontWeight: 700, color: 'var(--primary-dark)', marginTop: '16px', marginBottom: '8px' }}>Office Hours</h4>
            <p style={{ color: '#666' }}>
              Mon — Fri: 8:30 AM — 5:30 PM
              <br />
              Sat: 9:00 AM — 10:00 AM
            </p>

            <div className="mt-4">
              <h4 style={{ fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '8px' }}>Quick Links</h4>
              <div>
                <p className="mb-1">
                  <Link to="/" style={{ color: 'var(--primary)' }}>
                    View Properties
                  </Link>
                </p>
                <p>
                  <Link to="/about" style={{ color: 'var(--primary)' }}>
                    About Us
                  </Link>
                </p>
              </div>
            </div>
          </article>
        </div>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <strong>SouthStar Realty</strong> — Reliable • Affordable • Trusted © {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Contact;
