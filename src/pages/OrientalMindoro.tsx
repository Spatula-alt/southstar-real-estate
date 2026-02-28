import { Link } from "react-router-dom";
import AyalaFooter from "@/components/AyalaFooter";

const OrientalMindoro = () => {
  return (
    <div>
      {/* Header */}
      <header className="site-header">
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
          <h1>SouthStar Realty</h1>
        </Link>
        <p className="tag">Exploring Oriental Mindoro</p>
      </header>

      {/* Navigation */}
      <nav className="tab-nav">
        <div className="nav-container">
          <Link to="/">Home</Link>
          <Link to="/popular">Properties</Link>
          <Link to="/oriental-mindoro" className="active">Oriental Mindoro</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </nav>

      <div className="wrap main-content">
        {/* Hero Section */}
        <section className="om-hero">
          <h2 className="section-title">Oriental Mindoro — The Heart of MIMAROPA</h2>
          <p className="om-intro">
            Oriental Mindoro is a province in the MIMAROPA region of the Philippines, located on the eastern half of Mindoro Island. Known for its pristine beaches, lush mountains, and vibrant culture, it is one of the fastest-growing provinces for real estate investment in the country.
          </p>
        </section>

        {/* Why Oriental Mindoro */}
        <section className="om-section">
          <h3 className="om-section-title">Why Invest in Oriental Mindoro?</h3>
          <div className="om-grid">
            <div className="om-card">
              <div className="om-card-icon">🏖️</div>
              <h4>Tourism Hub</h4>
              <p>Puerto Galera is a world-renowned diving and beach destination attracting millions of tourists annually.</p>
            </div>
            <div className="om-card">
              <div className="om-card-icon">📈</div>
              <h4>Rising Property Values</h4>
              <p>With infrastructure development and urbanization, land values across all 15 municipalities are steadily increasing.</p>
            </div>
            <div className="om-card">
              <div className="om-card-icon">🌾</div>
              <h4>Agricultural Richness</h4>
              <p>Fertile lands ideal for farming, with rice, coconut, and citrus as major crops — perfect for agri-investment.</p>
            </div>
            <div className="om-card">
              <div className="om-card-icon">🏗️</div>
              <h4>Infrastructure Growth</h4>
              <p>New roads, ports, and commercial developments are transforming the province into a modern investment destination.</p>
            </div>
          </div>
        </section>

        {/* SouthStar Connection */}
        <section className="om-section">
          <h3 className="om-section-title">How SouthStar Realty Connects You to Oriental Mindoro</h3>
          <div className="om-connection">
            <div className="om-connection-item">
              <span className="om-number">01</span>
              <div>
                <h4>Local Expertise</h4>
                <p>Founded in Gloria, Oriental Mindoro, SouthStar Realty has deep roots in the province — we know every municipality, every barangay, and every opportunity.</p>
              </div>
            </div>
            <div className="om-connection-item">
              <span className="om-number">02</span>
              <div>
                <h4>Complete Coverage</h4>
                <p>We serve all 15 municipalities — from Calapan City in the north to Bulalacao in the south, covering every corner of Oriental Mindoro.</p>
              </div>
            </div>
            <div className="om-connection-item">
              <span className="om-number">03</span>
              <div>
                <h4>Affordable Options</h4>
                <p>Properties starting from ₱850/sqm in Bulalacao to prime lots at ₱5,000/sqm in Calapan City — there's something for every budget.</p>
              </div>
            </div>
            <div className="om-connection-item">
              <span className="om-number">04</span>
              <div>
                <h4>Trusted Partner</h4>
                <p>Since 2019, we've helped hundreds of Mindoreños and investors find their dream properties with transparent, reliable service.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Municipalities Overview */}
        <section className="om-section">
          <h3 className="om-section-title">The 15 Municipalities</h3>
          <div className="om-municipalities">
            {[
              { name: "Puerto Galera", desc: "World-class beaches & diving", price: "₱1,600/sqm" },
              { name: "San Teodoro", desc: "Gateway to the north", price: "₱1,100/sqm" },
              { name: "Baco", desc: "Agricultural heartland", price: "₱900/sqm" },
              { name: "Calapan City", desc: "Provincial capital & commerce center", price: "₱5,000/sqm" },
              { name: "Naujan", desc: "Home of Naujan Lake", price: "₱1,300/sqm" },
              { name: "Victoria", desc: "Peaceful rural living", price: "₱1,050/sqm" },
              { name: "Socorro", desc: "Growing community", price: "₱1,000/sqm" },
              { name: "Pola", desc: "Coastal charm", price: "₱950/sqm" },
              { name: "Pinamalayan", desc: "Commercial hub of the south", price: "₱1,200/sqm" },
              { name: "Gloria", desc: "SouthStar Realty's home base", price: "₱950/sqm" },
              { name: "Bansud", desc: "Emerging investment area", price: "₱1,500/sqm" },
              { name: "Bongabong", desc: "Trade & transport center", price: "₱1,200/sqm" },
              { name: "Roxas", desc: "Southern gateway", price: "₱1,100/sqm" },
              { name: "Mansalay", desc: "Scenic coastal town", price: "₱870/sqm" },
              { name: "Bulalacao", desc: "Most affordable frontier", price: "₱850/sqm" },
            ].map((m) => (
              <div key={m.name} className="om-muni-card">
                <h4>{m.name}</h4>
                <p className="om-muni-desc">{m.desc}</p>
                <span className="om-muni-price">{m.price}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="om-cta">
          <h3>Ready to Invest in Oriental Mindoro?</h3>
          <p>Let SouthStar Realty guide you to the perfect property.</p>
          <div className="om-cta-buttons">
            <Link to="/popular" className="buy-btn">Browse Properties</Link>
            <Link to="/contact" className="view-btn">Contact Us</Link>
          </div>
        </section>
      </div>

      <AyalaFooter />
    </div>
  );
};

export default OrientalMindoro;
