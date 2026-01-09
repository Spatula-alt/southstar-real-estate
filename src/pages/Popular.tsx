import { Link } from "react-router-dom";
import { places } from "@/data/properties";

const Popular = () => {
  return (
    <>
      {/* Header */}
      <header className="site-header">
        <img
          src="https://th.bing.com/th/id/OIP.2pfvKpHfX1z7Cen5GSLDFQHaHa?w=180&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3"
          alt="SouthStar Realty logo"
          className="header-logo"
        />
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h1>SouthStar Realty</h1>
        </Link>
      </header>

      {/* Nav */}
      <div className="nav-row">
        <div className="nav-container" style={{ display: "flex", justifyContent: "center" }}>
          <nav className="nav-links">
            <Link to="/">PROPERTIES</Link>
            <Link to="/popular" className="active">POPULAR</Link>
            <Link to="/about">ABOUT US</Link>
            <Link to="/contact">CONTACT</Link>
          </nav>
        </div>
      </div>

      {/* Main */}
      <main className="wrap">
        <h2 style={{ fontSize: "1.6rem", margin: "30px 0 20px", color: "#0c6d2e", fontWeight: 700, textAlign: "center" }}>
          Municipalities & Cities of Oriental Mindoro
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
          padding: "20px 0 50px"
        }}>
          {places.map((place) => (
            <div
              key={place.id}
              style={{
                position: "relative",
                height: "250px",
                backgroundImage: `url(https://via.placeholder.com/600x400.png?text=${encodeURIComponent(place.name)})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "8px",
                overflow: "hidden",
                filter: "grayscale(100%)",
                transition: "all 0.4s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = "grayscale(0%)";
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "grayscale(100%)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                padding: "15px",
                background: "rgba(0, 0, 0, 0.5)",
                color: "#fff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "bold", margin: 0 }}>{place.name}</h3>
                <Link
                  to={`/property?place=${place.id}`}
                  style={{
                    background: "linear-gradient(135deg, #ffd700, #f6c600)",
                    color: "#0c6d2e",
                    display: "inline-block",
                    padding: "10px 18px",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    textDecoration: "none"
                  }}
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-brand">
          <div className="footer-text">
            <strong>SouthStar Realty</strong>
            <small>Reliable • Affordable • Trusted</small>
          </div>
        </div>
        <div>© {new Date().getFullYear()}</div>
      </footer>
    </>
  );
};

export default Popular;
