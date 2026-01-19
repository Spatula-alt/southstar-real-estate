import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { places } from "@/data/properties";

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showControls, setShowControls] = useState(false);
  const [mapSrc, setMapSrc] = useState(
    "https://www.google.com/maps/d/u/0/embed?mid=1bNTJ1OV14-5_u0mL2T7JeLbpheefugI&ehbc=2E312F&noprof=1"
  );

  const mapTypes: Record<string, string> = {
    Default: "https://www.google.com/maps/d/u/0/embed?mid=1bNTJ1OV14-5_u0mL2T7JeLbpheefugI&ehbc=2E312F&noprof=1",
    Satellite: "https://www.google.com/maps?q=Oriental+Mindoro&t=k&z=10&output=embed",
    Terrain: "https://www.google.com/maps?q=Oriental+Mindoro&t=p&z=10&output=embed",
  };

  const filteredPlaces = searchQuery.trim()
    ? places.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : places;

  const handleInquire = (placeId: string) => {
    navigate(`/property?place=${placeId}`);
  };

  return (
    <>
      {/* Header */}
      <header className="index-header">
        <img
          src="https://th.bing.com/th/id/OIP.2pfvKpHfX1z7Cen5GSLDFQHaHa?w=180&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3"
          alt="SouthStar Realty logo"
          className="header-logo"
        />
        <h1>SouthStar Realty</h1>
      </header>

      {/* Nav Row */}
      <div className="nav-row">
        <div className="nav-container">
          {/* Search Box */}
          <div className="nav-search">
            <div className="search-box">
              <div className="search-left">
                <svg viewBox="0 0 20 20">
                  <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z" />
                </svg>
              </div>
              <input
                type="text"
                className="search-input"
                placeholder="Search municipality (e.g. Gloria"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && setSearchQuery(searchQuery)}
              />
            </div>
            <button className="search-btn" onClick={() => setSearchQuery(searchQuery)}>
              Search
            </button>
          </div>

          {/* Nav Links */}
          <nav className="nav-links">
            <Link to="/popular">POPULAR</Link>
            <Link to="/about">ABOUT US</Link>
            <Link to="/contact">CONTACT</Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="wrap index-content">
        <div className="index-overview">
          {/* Property Listings - Left Column */}
          <section className="index-listings">
            {filteredPlaces.length > 0 ? (
              filteredPlaces.map((place) => (
                <article key={place.id} className="index-card">
                  <img
                    src={place.image || `https://via.placeholder.com/600x400.png?text=${encodeURIComponent(place.name)}`}
                    alt={place.name}
                  />
                  <div className="property-details">
                    <div>
                      <h3>{place.name}</h3>
                      <p>{place.price} · {place.type}</p>
                    </div>
                    <button className="buy-btn" onClick={() => handleInquire(place.id)}>
                      Inquire Now
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <p style={{ color: "#666", padding: "12px", margin: 0 }}>
                No results found.
              </p>
            )}
          </section>

          {/* Map Section - Right Column */}
          <section className="index-map">
            <h2>Interactive Google Map</h2>
            <div className="map-box">
              <button id="toggleLayers" onClick={() => setShowControls(!showControls)}>
                Map Layers
              </button>

              {showControls && (
                <div className="map-controls">
                  {Object.entries(mapTypes).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setMapSrc(value);
                        setShowControls(false);
                      }}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              )}

              <iframe
                src={mapSrc}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Oriental Mindoro Map"
              />
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="ayala-footer">
        <div className="footer-wrap">
          {/* Left: Social Icons + Copyright */}
          <div className="footer-left">
            <div className="social-icons">
              <a href="#" aria-label="Facebook" className="social-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
              <a href="#" aria-label="LinkedIn" className="social-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
              <a href="#" aria-label="X" className="social-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
              <a href="#" aria-label="Instagram" className="social-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
              <a href="#" aria-label="TikTok" className="social-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg></a>
              <a href="#" aria-label="YouTube" className="social-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
            </div>
            <div className="footer-copyright-text">
              © {new Date().getFullYear()} SouthStar Realty. All Rights Reserved | <a href="#">Terms of Use</a> | <a href="#">Privacy Notice</a>
            </div>
          </div>

          {/* Right: Navigation Columns */}
          <div className="footer-nav-columns">
            <div className="footer-nav-col">
              <a href="/">HOME</a>
              <a href="#">ESTATES</a>
              <a href="#">RESIDENTIAL BRANDS</a>
              <a href="#">PROPERTIES</a>
            </div>
            <div className="footer-nav-col">
              <a href="/about">ABOUT US</a>
              <a href="#">SUSTAINABILITY</a>
              <a href="#">CORPORATE GOVERNANCE</a>
              <a href="#">INVESTOR RELATIONS</a>
              <a href="#">NEWS ARTICLES</a>
            </div>
            <div className="footer-nav-col">
              <a href="#">MALLS</a>
              <a href="#">OFFICES</a>
              <a href="#">HOSPITALITY</a>
              <a href="#">AREIT</a>
              <a href="#">SERVICES</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Index;
