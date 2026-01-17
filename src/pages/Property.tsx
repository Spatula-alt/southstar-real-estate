import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { places } from "@/data/properties";
import { toast } from "@/hooks/use-toast";

const propertyData: Record<string, { title: string; map: string; img: string }> = {
  puertogalera: { title: "Puerto Galera", map: "https://www.google.com/maps?q=Puerto+Galera+Oriental+Mindoro&z=12&output=embed", img: "https://www.travelorientalmindoro.ph/Content/img/uploads/3997051e-5e30-4aff-9f65-cc33f90d3b6b_thumb.jpg" },
  santeodoro: { title: "San Teodoro", map: "https://www.google.com/maps?q=San+Teodoro+Oriental+Mindoro&z=12&output=embed", img: "https://picsum.photos/seed/santeodoro/1200/800" },
  baco: { title: "Baco", map: "https://www.google.com/maps?q=Baco+Oriental+Mindoro&z=12&output=embed", img: "https://lh3.ggpht.com/-VTVx0NXJeXg/U26xVAI8S3I/AAAAAAAAAuE/G9uLfwrQ1Oo/IMG_0004_thumb.jpg?imgmax=800" },
  calapan: { title: "Calapan City", map: "https://www.google.com/maps?q=Calapan+City+Oriental+Mindoro&z=13&output=embed", img: "https://media-cdn.tripadvisor.com/media/photo-s/02/f7/51/a2/only-at-calapan-orriental.jpg" },
  naujan: { title: "Naujan", map: "https://www.google.com/maps?q=Naujan+Oriental+Mindoro&z=12&output=embed", img: "https://alchetron.com/cdn/naujan-oriental-mindoro-7f1b2edc-f2ac-49fc-8a1e-2053f454108-resize-750.jpeg" },
  victoria: { title: "Victoria", map: "https://www.google.com/maps?q=Victoria+Oriental+Mindoro&z=12&output=embed", img: "https://i.ytimg.com/vi/jZPfSQz2nFU/hqdefault.jpg" },
  socorro: { title: "Socorro", map: "https://www.google.com/maps?q=Socorro+Oriental+Mindoro&z=12&output=embed", img: "https://th.bing.com/th/id/OIP.-OfSmxtQLf1Twz3SJ2usQwHaFj" },
  pola: { title: "Pola", map: "https://www.google.com/maps?q=Pola+Oriental+Mindoro&z=12&output=embed", img: "https://i.ytimg.com/vi/zFMqrUzJhZU/hqdefault.jpg" },
  pinamalayan: { title: "Pinamalayan", map: "https://www.google.com/maps?q=Pinamalayan+Oriental+Mindoro&z=12&output=embed", img: "https://travelorientalmindoro.ph/Content/img/uploads/888ed3ef-1f02-4ee3-8f8d-560bf8fb3474.jpg" },
  gloria: { title: "Gloria", map: "https://www.google.com/maps?q=Gloria+Oriental+Mindoro&z=12&output=embed", img: "https://travelorientalmindoro.ph/Content/img/uploads/3cf6e252-5281-4ba3-b494-2d087f0bae9e_thumb.jpg" },
  bansud: { title: "Bansud", map: "https://www.google.com/maps?q=Bansud+Oriental+Mindoro&z=12&output=embed", img: "https://tse1.mm.bing.net/th/id/OIP.lwMdzkNCu7HTv5qYAy9tQQHaET" },
  bongabong: { title: "Bongabong", map: "https://www.google.com/maps?q=Bongabong+Oriental+Mindoro&z=12&output=embed", img: "https://i.ytimg.com/vi/kSSMAxHN2yA/hqdefault.jpg" },
  roxas: { title: "Roxas", map: "https://www.google.com/maps?q=Roxas+Oriental+Mindoro&z=12&output=embed", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Mindoro_Ferry_Port.jpg/500px-Mindoro_Ferry_Port.jpg" },
  mansalay: { title: "Mansalay", map: "https://www.google.com/maps?q=Mansalay+Oriental+Mindoro&z=12&output=embed", img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/59/49/fc/buktot-beach-mansalay.jpg" },
  bulalacao: { title: "Bulalacao", map: "https://www.google.com/maps?q=Bulalacao+Oriental+Mindoro&z=12&output=embed", img: "https://i.ytimg.com/vi/FLC25tWhUD8/maxresdefault.jpg" }
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
          id="backBtn"
          onClick={() => navigate(-1)}
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            background: "#FFD700",
            border: "none",
            borderRadius: "6px",
            padding: "8px 12px",
            cursor: "pointer",
            fontWeight: 700,
            zIndex: 20
          }}
        >
          ← Back
        </button>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h1>SouthStar Realty</h1>
        </Link>
      </header>

      {/* Main */}
      <main className="wrap main-content">
        {/* Map Section */}
        <section className="map-section">
          <h2 id="propertyTitle">{property.title}</h2>
          <div className="map-box">
            <iframe
              src={property.map}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Property Location Map"
            />
          </div>
        </section>

        {/* Property Overview */}
        <div className="property-overview">
          {/* Gallery */}
          <div className="gallery">
            <div className="main-image-wrap">
              <img
                src={property.img}
                alt={`${property.title} Main Image`}
                style={{ objectFit: "contain", backgroundColor: "#f0f0f0" }}
              />
              <span className="badge">FEATURED</span>
            </div>
          </div>

          {/* Inquiry Box */}
          <aside className="inquiry-box">
            <h3>Inquire Now</h3>

            <div className="agent-card">
              <div className="agent-avatar">R</div>
              <div>
                <div className="agent-name">Ram Felix Jarabe ✔</div>
                <div className="agent-info">Listed by SouthStar Realty</div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div>
                <label>Name *</label>
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Email *</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Phone</label>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Message *</label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="buy-btn" style={{ width: "100%" }}>
                Contact agent
              </button>
            </form>
          </aside>
        </div>

        {/* Property Details */}
        <section className="details-section">
          <h2>Property Details</h2>
          <div className="meta">
            <div><strong>Location:</strong> {property.title}, Oriental Mindoro</div>
            <div><strong>Price:</strong> {placeInfo?.price || "Contact for pricing"}</div>
            <div><strong>Type:</strong> {placeInfo?.type || "Land"}</div>
          </div>

          <h3>Description</h3>
          <p>
            Prime real estate opportunity in {property.title}, Oriental Mindoro. This property offers excellent value with potential for residential or commercial development.
          </p>

          <h3>Essentials</h3>
          <ul>
            <li>Clean title</li>
            <li>Road accessible</li>
            <li>Near public utilities</li>
            <li>Flexible payment terms available</li>
          </ul>
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

export default Property;
