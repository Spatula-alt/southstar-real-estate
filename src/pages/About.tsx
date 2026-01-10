import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="site-header">
        <h1>SouthStar Realty</h1>
        <p className="tag">Building Dreams in Oriental Mindoro</p>
      </header>

      {/* Navigation */}
      <nav className="tab-nav">
        <div className="nav-container">
          <Link to="/">PROPERTIES</Link>
          <Link to="/popular">POPULAR</Link>
          <Link to="/about" className="active">ABOUT US</Link>
          <Link to="/contact">CONTACT</Link>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="py-16 md:py-20 text-center text-white relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url(https://travelorientalmindoro.ph/Content/img/uploads/default.jpg)" }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-[800px] mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Building Dreams in Oriental Mindoro</h2>
          <p className="text-base md:text-lg opacity-95">
            We connect families, investors, and businesses to properties that enrich lives and uplift communities — guided by our values of trust, affordability, and reliability.
          </p>
        </div>
      </section>

      <main className="wrap main-content flex-1">
        {/* About Section */}
        <section className="mb-5">
          <h2 className="section-title" style={{ textAlign: 'left' }}>About SouthStar Realty</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <img
              src="https://scontent.fmnl17-6.fna.fbcdn.net/v/t39.30808-6/558088971_122140095146909446_312887583566325529_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=jxFK7AQqRycQ7kNvwEHyskq&_nc_oc=AdndmQT9dHYMYDxGirBcUKjcWg7bWae5lK82IAh3Brj4ryLkzPlThhrnwcWIaSlqX4c&_nc_zt=23&_nc_ht=scontent.fmnl17-6.fna&_nc_gid=I32UcQrvp_SjtVjU472PEw&oh=00_AfimqyDSTbuHondFHDZuSaOahyt0An2tdlLyH1hFeSXetA&oe=69172CD2"
              alt="SouthStar Realty Office"
              className="w-full rounded-xl shadow-lg"
            />
            <div>
              <p className="font-semibold mb-3" style={{ color: 'var(--primary-dark)' }}>
                SouthStar Realty is a growing real estate service provider in Oriental Mindoro, dedicated to helping families, investors, and businesses find the perfect property.
              </p>
              <p style={{ color: '#666' }}>
                From residential lots to agricultural and commercial lands, we are trusted by many for our <strong>affordable, reliable, and transparent property solutions.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mt-8">
          <h2 className="section-title" style={{ textAlign: 'left' }}>Mission & Vision</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
            <article className="property-card">
              <div className="property-details">
                <h3>Our Mission</h3>
                <p style={{ color: '#666' }}>
                  To connect people with their dream properties by making land ownership <strong>accessible, affordable, and secure</strong>. We guide clients with honesty and professionalism.
                </p>
              </div>
            </article>
            <article className="property-card">
              <div className="property-details">
                <h3>Our Vision</h3>
                <p style={{ color: '#666' }}>
                  To become the <strong>most reliable and community-driven real estate company in Oriental Mindoro</strong>, uplifting lives while ensuring long-term value in every investment.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* Core Values */}
        <section className="mt-8">
          <h2 className="section-title" style={{ textAlign: 'left' }}>Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {[
              { title: "Trust", desc: "Every deal is built on integrity and transparency — earning the confidence of our clients." },
              { title: "Affordability", desc: "We provide cost-effective solutions without compromising location value or clarity of process." },
              { title: "Local Expertise", desc: "Our deep knowledge of Oriental Mindoro ensures we match people to the best opportunities." },
            ].map((value) => (
              <article key={value.title} className="property-card">
                <div className="property-details">
                  <h3>{value.title}</h3>
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>{value.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="mt-8">
          <h2 className="section-title" style={{ textAlign: 'left' }}>Our Journey</h2>
          <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '20px', margin: '16px 0', color: '#666' }}>
            <p className="mb-2"><strong>2019:</strong> Founded to bring affordable housing to Mindoreños.</p>
            <p className="mb-2"><strong>2020:</strong> Expanded services to agricultural to residential properties.</p>
            <p className="mb-2"><strong>2023:</strong> Trusted partner for investors & landowners across Oriental Mindoro.</p>
            <p><strong>Today:</strong> Growing stronger, serving families & communities with dedication.</p>
          </div>
        </section>

        {/* Office & Map */}
        <section className="mt-8">
          <h2 className="section-title" style={{ textAlign: 'left' }}>Visit Our Office</h2>
          <p style={{ color: '#666', marginTop: '6px' }}>
            📍 In front of Gloria Central School, near Andok's, Poblacion Maligaya, Gloria, Oriental Mindoro.
          </p>
          <div className="map-section mt-4">
            <div className="map-box">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238.2567177562571!2d121.47774517536163!3d12.968916031341093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bca8c51d3e4ae5%3A0xbb2d39ec13343e47!2sSTAR%20GYM%20AND%20SALON!5e1!3m2!1sen!2sph!4v1762691999295!5m2!1sen!2sph"
                allowFullScreen
                loading="lazy"
                title="SouthStar Realty Office Location"
              />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mt-8">
          <h2 className="section-title" style={{ textAlign: 'left' }}>What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {[
              { text: "SouthStar Realty made my dream lot in Pinamalayan possible. Honest service and smooth process!", author: "Maria D." },
              { text: "Reliable and professional. They helped me secure farmland with clear documents and no hassle.", author: "Roberto G." },
            ].map((testimonial, i) => (
              <article key={i} className="property-card">
                <div className="property-details">
                  <p style={{ color: '#666', fontStyle: 'italic' }}>"{testimonial.text}"</p>
                  <p style={{ color: 'var(--primary-dark)', fontWeight: 600, marginTop: '8px' }}>- {testimonial.author}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="property-card mt-8">
          <div className="property-details text-center">
            <h3>Join Our Mission</h3>
            <p style={{ color: '#666', maxWidth: '820px', margin: '0 auto 12px' }}>
              Looking for a trusted real estate partner or career opportunity? Be part of our journey in building Oriental Mindoro's future.
            </p>
            <Link to="/contact" className="buy-btn">
              Get in Touch
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <strong>SouthStar Realty</strong> — Reliable • Affordable • Trusted © {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default About;
