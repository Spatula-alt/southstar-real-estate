import { Link } from "react-router-dom";
import AyalaFooter from "@/components/AyalaFooter";

const About = () => {
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
          <Link to="/about" className="active">ABOUT US</Link>
          <Link to="/contact">CONTACT</Link>
          <Link to="/agents">AGENTS</Link>
          <Link to="/login">LOG IN</Link>
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          padding: "72px 14px",
          textAlign: "center",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
          backgroundSize: "cover",
          backgroundPosition: "center",
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
                <p style={{ color: "#666" }}>
                  To connect people with their dream properties by making land ownership <strong>accessible, affordable, and secure</strong>. We guide clients with honesty and professionalism.
                </p>
              </div>
            </article>
            <article className="property-card">
              <div className="property-details">
                <h3>Our Vision</h3>
                <p style={{ color: "#666" }}>
                  To become the <strong>most reliable and community-driven real estate company in Oriental Mindoro</strong>, uplifting lives while ensuring long-term value in every investment.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* Core Values - Animated */}
        <section style={{ marginTop: "20px" }}>
          <h2 className="section-title" style={{ textAlign: "left" }}>Our Core Values</h2>
          <div className="core-values-carousel">
            <div className="core-values-track">
              {/* First set */}
              {[
                { title: "Trust", desc: "Every deal is built on integrity and transparency — earning the confidence of our clients.", icon: "🤝" },
                { title: "Affordability", desc: "We provide cost-effective solutions without compromising location value or clarity of process.", icon: "💰" },
                { title: "Local Expertise", desc: "Our deep knowledge of Oriental Mindoro ensures we match people to the best opportunities.", icon: "🏠" },
              ].map((value, idx) => (
                <article key={`first-${idx}`} className="core-value-card">
                  <span className="value-icon">{value.icon}</span>
                  <h3>{value.title}</h3>
                  <p>{value.desc}</p>
                </article>
              ))}
              {/* Duplicate for seamless loop */}
              {[
                { title: "Trust", desc: "Every deal is built on integrity and transparency — earning the confidence of our clients.", icon: "🤝" },
                { title: "Affordability", desc: "We provide cost-effective solutions without compromising location value or clarity of process.", icon: "💰" },
                { title: "Local Expertise", desc: "Our deep knowledge of Oriental Mindoro ensures we match people to the best opportunities.", icon: "🏠" },
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
          <p style={{ color: "#666", marginTop: "6px" }}>
            📍 In front of Gloria Central School, near Andok's, Poblacion Maligaya, Gloria, Oriental Mindoro.
          </p>
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

        {/* Testimonials */}
        <section style={{ marginTop: "20px" }}>
          <h2 className="section-title" style={{ textAlign: "left" }}>What Our Clients Say</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "8px" }}>
            {[
              { text: "Bought a 500sqm lot in Pinamalayan through SouthStar. The title was clean and transfer was done in just 3 weeks. Very smooth!", author: "Maria Dela Cruz", role: "Homeowner, Pinamalayan", avatar: "👩", stars: 5 },
              { text: "As an OFW, it was hard to buy land remotely. SouthStar handled everything — documents, verification, even site photos. Highly recommend!", author: "Roberto Garcia", role: "OFW Investor, Gloria", avatar: "👨", stars: 5 },
              { text: "I was skeptical at first but Sir Ram was very patient explaining every step. Got my farmland in Bansud at a great price. Legit sila!", author: "Jenny Santos", role: "Farmer, Bansud", avatar: "👩‍🌾", stars: 5 },
              { text: "SouthStar helped me find a commercial lot near the highway in Calapan. Professional service from consultation to final paperwork.", author: "Mark Anthony Reyes", role: "Business Owner, Calapan", avatar: "👨‍💼", stars: 4 },
            ].map((testimonial, i) => (
              <article key={i} className="property-card" style={{ padding: 0 }}>
                <div className="property-details" style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <div style={{ fontSize: "2.5rem", minWidth: "50px", height: "50px", borderRadius: "50%", background: "linear-gradient(135deg, #e8f5e9, #c8e6c9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {testimonial.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: "#f59e0b", fontSize: "0.9rem", marginBottom: "4px" }}>
                      {"★".repeat(testimonial.stars)}{"☆".repeat(5 - testimonial.stars)}
                    </div>
                    <p style={{ color: "#555", fontStyle: "italic", fontSize: "0.92rem", lineHeight: 1.5 }}>"{testimonial.text}"</p>
                    <p style={{ color: "var(--primary-dark)", fontWeight: 700, marginTop: "8px", fontSize: "0.95rem" }}>{testimonial.author}</p>
                    <p style={{ color: "#888", fontSize: "0.8rem" }}>{testimonial.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="property-card" style={{ marginTop: "30px" }}>
          <div className="property-details" style={{ textAlign: "center" }}>
            <h3>Join Our Mission</h3>
            <p style={{ color: "#666", maxWidth: "820px", margin: "0 auto 12px" }}>
              Looking for a trusted real estate partner or career opportunity? Be part of our journey in building Oriental Mindoro's future.
            </p>
            <Link to="/contact" className="buy-btn">
              Get in Touch
            </Link>
          </div>
        </section>
      </main>

      <AyalaFooter />
    </>
  );
};

export default About;
