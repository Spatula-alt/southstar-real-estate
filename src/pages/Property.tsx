import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { places } from "@/data/properties";
import { toast } from "@/hooks/use-toast";

const propertyData: Record<string, { title: string; map: string; img: string }> = {
  puertogalera: { title: "Puerto Galera", map: "https://www.google.com/maps?q=Puerto+Galera+Oriental+Mindoro&z=12&output=embed", img: "https://via.placeholder.com/1200x800.png?text=Puerto+Galera" },
  santeodoro: { title: "San Teodoro", map: "https://www.google.com/maps?q=San+Teodoro+Oriental+Mindoro&z=12&output=embed", img: "https://via.placeholder.com/1200x800.png?text=San+Teodoro" },
  baco: { title: "Baco", map: "https://www.google.com/maps?q=Baco+Oriental+Mindoro&z=12&output=embed", img: "https://via.placeholder.com/1200x800.png?text=Baco" },
  calapan: { title: "Calapan City", map: "https://www.google.com/maps?q=Calapan+City+Oriental+Mindoro&z=13&output=embed", img: "https://via.placeholder.com/1200x800.png?text=Calapan+City" },
  naujan: { title: "Naujan", map: "https://www.google.com/maps?q=Naujan+Oriental+Mindoro&z=12&output=embed", img: "https://via.placeholder.com/1200x800.png?text=Naujan" },
  victoria: { title: "Victoria", map: "https://www.google.com/maps?q=Victoria+Oriental+Mindoro&z=12&output=embed", img: "https://via.placeholder.com/1200x800.png?text=Victoria" },
  socorro: { title: "Socorro", map: "https://www.google.com/maps?q=Socorro+Oriental+Mindoro&z=12&output=embed", img: "https://via.placeholder.com/1200x800.png?text=Socorro" },
  pola: { title: "Pola", map: "https://www.google.com/maps?q=Pola+Oriental+Mindoro&z=12&output=embed", img: "https://via.placeholder.com/1200x800.png?text=Pola" },
  pinamalayan: { title: "Pinamalayan", map: "https://www.google.com/maps?q=Pinamalayan+Oriental+Mindoro&z=12&output=embed", img: "https://via.placeholder.com/1200x800.png?text=Pinamalayan" },
  gloria: { title: "Gloria", map: "https://www.google.com/maps?q=Gloria+Oriental+Mindoro&z=12&output=embed", img: "https://via.placeholder.com/1200x800.png?text=Gloria" },
  bansud: { title: "Bansud", map: "https://www.google.com/maps?q=Bansud+Oriental+Mindoro&z=12&output=embed", img: "https://via.placeholder.com/1200x800.png?text=Bansud" },
  bongabong: { title: "Bongabong", map: "https://www.google.com/maps?q=Bongabong+Oriental+Mindoro&z=12&output=embed", img: "https://via.placeholder.com/1200x800.png?text=Bongabong" },
  roxas: { title: "Roxas", map: "https://www.google.com/maps?q=Roxas+Oriental+Mindoro&z=12&output=embed", img: "https://via.placeholder.com/1200x800.png?text=Roxas" },
  mansalay: { title: "Mansalay", map: "https://www.google.com/maps?q=Mansalay+Oriental+Mindoro&z=12&output=embed", img: "https://via.placeholder.com/1200x800.png?text=Mansalay" },
  bulalacao: { title: "Bulalacao", map: "https://www.google.com/maps?q=Bulalacao+Oriental+Mindoro&z=12&output=embed", img: "https://via.placeholder.com/1200x800.png?text=Bulalacao" }
};

const Property = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const placeId = (searchParams.get("place") || "calapan").toLowerCase();
  const property = propertyData[placeId] || propertyData.calapan;
  const placeInfo = places.find((p) => p.id === placeId);

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
      title: "Inquiry Sent!",
      description: `Thanks ${formData.name}! Your inquiry for ${property.title} has been recorded.`,
    });

    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Header */}
      <header className="site-header" style={{ position: "relative" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            position: "absolute",
            top: "50%",
            left: "16px",
            transform: "translateY(-50%)",
            background: "#ffd700",
            color: "#000",
            border: "none",
            borderRadius: "6px",
            padding: "8px 14px",
            cursor: "pointer",
            fontWeight: 700
          }}
        >
          ← Back
        </button>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h1>SouthStar Realty</h1>
        </Link>
      </header>

      {/* Main */}
      <main className="wrap" style={{ paddingTop: "20px" }}>
        {/* Map Section */}
        <section style={{ marginBottom: "20px" }}>
          <h2 style={{ margin: "0 0 10px 0", fontSize: "18px", color: "#0b6123" }}>{property.title}</h2>
          <div style={{ borderRadius: "10px", overflow: "hidden" }}>
            <iframe
              src={property.map}
              style={{ width: "100%", height: "420px", border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Property Location Map"
            />
          </div>
        </section>

        {/* Property Overview */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 360px",
          gap: "24px",
          marginTop: "20px"
        }}>
          {/* Gallery */}
          <div style={{
            background: "#fff",
            padding: "18px",
            borderRadius: "12px",
            border: "2px solid #ffd700",
            boxShadow: "0 6px 18px rgba(0,0,0,.06)"
          }}>
            <div style={{ position: "relative", borderRadius: "10px", overflow: "hidden" }}>
              <img
                src={property.img}
                alt={`${property.title} Main Image`}
                style={{ width: "100%", height: "420px", objectFit: "cover", display: "block" }}
              />
              <span style={{
                position: "absolute",
                left: "14px",
                top: "14px",
                background: "#0c6d2e",
                color: "#fff",
                padding: "6px 10px",
                borderRadius: "30px",
                fontSize: ".85rem",
                fontWeight: 700
              }}>
                FEATURED
              </span>
            </div>
          </div>

          {/* Inquiry Box */}
          <div style={{
            background: "#fff",
            padding: "18px",
            borderRadius: "12px",
            border: "2px solid #ffd700",
            boxShadow: "0 6px 18px rgba(0,0,0,.06)"
          }}>
            <h3 style={{ fontSize: "1.1rem", color: "#0c6d2e", marginBottom: "12px" }}>Inquire Now</h3>

            <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "12px" }}>
              <div style={{
                width: "54px",
                height: "54px",
                borderRadius: "50%",
                background: "#149f42",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700
              }}>
                R
              </div>
              <div>
                <div style={{ fontWeight: 700 }}>Ram Felix Jarabe ✔</div>
                <div style={{ fontSize: ".9rem", color: "#666" }}>Listed by SouthStar Realty</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <label style={{ fontWeight: 600, color: "#0c6d2e" }}>Name *</label>
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px", fontFamily: "inherit", fontSize: "1rem" }}
                />
              </div>

              <div>
                <label style={{ fontWeight: 600, color: "#0c6d2e" }}>Email *</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px", fontFamily: "inherit", fontSize: "1rem" }}
                />
              </div>

              <div>
                <label style={{ fontWeight: 600, color: "#0c6d2e" }}>Phone</label>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px", fontFamily: "inherit", fontSize: "1rem" }}
                />
              </div>

              <div>
                <label style={{ fontWeight: 600, color: "#0c6d2e" }}>Message *</label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px", fontFamily: "inherit", fontSize: "1rem", resize: "none" }}
                />
              </div>

              <button
                type="submit"
                style={{
                  background: "linear-gradient(135deg, #ffd700, #f6c600)",
                  color: "#0c6d2e",
                  padding: "12px",
                  borderRadius: "8px",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: "none",
                  marginTop: "6px"
                }}
              >
                Contact agent
              </button>
            </form>
          </div>
        </div>

        {/* Property Details */}
        <section style={{
          marginTop: "30px",
          background: "#fff",
          padding: "24px",
          borderRadius: "12px",
          border: "2px solid #ffd700",
          boxShadow: "0 6px 18px rgba(0,0,0,.06)"
        }}>
          <h2 style={{ color: "#0c6d2e", marginBottom: "8px" }}>Property Details</h2>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "12px" }}>
            <div><strong>Location:</strong> {property.title}, Oriental Mindoro</div>
            <div><strong>Price:</strong> {placeInfo?.price || "Contact for pricing"}</div>
            <div><strong>Type:</strong> {placeInfo?.type || "Land"}</div>
          </div>

          <h3 style={{ marginTop: "14px", color: "#149f42" }}>Description</h3>
          <p>
            Prime real estate opportunity in {property.title}, Oriental Mindoro. This property offers excellent value with potential for residential or commercial development.
          </p>

          <h3 style={{ marginTop: "14px", color: "#149f42" }}>Essentials</h3>
          <ul style={{ marginTop: "8px", listStyle: "disc", marginLeft: "20px" }}>
            <li>Clean title</li>
            <li>Road accessible</li>
            <li>Near public utilities</li>
            <li>Flexible payment terms available</li>
          </ul>
        </section>
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

export default Property;
