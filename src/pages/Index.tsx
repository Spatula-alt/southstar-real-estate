import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { places } from "@/data/properties";
import AyalaFooter from "@/components/AyalaFooter";
import MunicipalityMap, { MunicipalityMapHandle } from "@/components/MunicipalityMap";
import MobileDrawer from "@/components/MobileDrawer";
import southstarLogo from "@/assets/southstar-logo.png";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const mapRef = useRef<MunicipalityMapHandle>(null);
  const mapSectionRef = useRef<HTMLElement>(null);

  const filteredPlaces = searchQuery.trim()
    ? places.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : places;

  const handleInquire = (placeId: string) => {
    // Scroll to map section then zoom into municipality
    mapSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      mapRef.current?.zoomToMunicipality(placeId);
    }, 600);
  };

  return (
    <>
      {/* Header */}
      <header className="index-header">
        <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={southstarLogo}
            alt="SouthStar Realty logo"
            className="header-logo"
          />
          <h1>SouthStar Realty</h1>
        </Link>
        <MobileDrawer />
      </header>

      {/* Nav Row */}
      <div className="nav-row">
        <div className="nav-container">
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

          <nav className="nav-links desktop-nav">
            <Link to="/popular">POPULAR</Link>
            <Link to="/about">ABOUT US</Link>
            <Link to="/contact">CONTACT</Link>
            <Link to="/agents">AGENTS</Link>
            <Link to="/login">LOG IN</Link>
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
                    style={{ cursor: "pointer" }}
                    onClick={(e) => { e.stopPropagation(); window.open(place.image, "_blank"); }}
                  />
                  <div className="property-details">
                    <div>
                      <h3>{place.name}</h3>
                      <p>{place.type}</p>
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

          {/* Interactive Leaflet Map - Right Column */}
          <section className="index-map" ref={mapSectionRef}>
            <h2>Interactive Map of Oriental Mindoro</h2>
            <MunicipalityMap ref={mapRef} />
          </section>
        </div>
      </main>

      <AyalaFooter />
    </>
  );
};

export default Index;
