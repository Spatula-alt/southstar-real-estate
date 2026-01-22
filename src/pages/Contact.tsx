import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import AyalaFooter from "@/components/AyalaFooter";
import southstarLogo from "@/assets/southstar-logo.png";

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
        <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "12px" }}>
          <img src={southstarLogo} alt="SouthStar Realty logo" className="header-logo" />
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
        <div className="contact-layout">
          {/* Contact Form */}
          <article className="contact-form-box">
            <h2>Contact Us</h2>

            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Name</label>
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
                <label htmlFor="email">Email</label>
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
                <label htmlFor="message">Message</label>
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

              <p className="form-disclaimer">
                We reply within 1-2 business days. By sending this message you agree to be contacted regarding your inquiry.
              </p>
            </form>
          </article>

          {/* Office Info */}
          <article className="contact-info-box">
            <h3>Our Office</h3>
            <div className="office-details">
              <p><span className="icon">📍</span> Calapan City, Oriental Mindoro</p>
              <p><span className="icon">📞</span> +63 912 345 6789</p>
              <p>
                <span className="icon">📧</span>{" "}
                <a href="mailto:info@southstarrealty.com">info@southstarrealty.com</a>
              </p>
            </div>

            <h4>Office Hours</h4>
            <p className="hours-text">
              Mon — Fri: 8:30 AM — 5:30 PM
              <br />
              Sat: 9:00 AM — 10:00 AM
            </p>

            <h4>Quick Links</h4>
            <div className="quick-links">
              <Link to="/">View Properties</Link>
              <Link to="/about">About Us</Link>
            </div>
          </article>
        </div>
      </main>

      <AyalaFooter />
    </>
  );
};

export default Contact;
