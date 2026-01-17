import { Link } from "react-router-dom";
import { places } from "@/data/properties";

const Popular = () => {
  return (
    <>
      {/* Header */}
      <header className="site-header">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h1>SouthStar Realty</h1>
        </Link>
      </header>

      {/* Nav */}
      <nav className="tab-nav">
        <div className="nav-container">
          <Link to="/">PROPERTIES</Link>
          <Link to="/popular" className="active">POPULAR</Link>
          <Link to="/about">ABOUT US</Link>
          <Link to="/contact">CONTACT</Link>
        </div>
      </nav>

      {/* Main */}
      <main className="wrap main-content">
        <h2 className="section-title">Municipalities & Cities of Oriental Mindoro</h2>

        <section className="popular-grid">
          {places.map((place) => (
            <div
              key={place.id}
              className="popular-tile"
              style={{
                backgroundImage: `url(${place.image || `https://via.placeholder.com/600x400.png?text=${encodeURIComponent(place.name)}`})`
              }}
            >
              <div className="popular-overlay">
                <h3>{place.name}</h3>
                <Link to={`/property?place=${place.id}`} className="popular-view-btn">
                  View
                </Link>
              </div>
            </div>
          ))}
        </section>
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

export default Popular;
