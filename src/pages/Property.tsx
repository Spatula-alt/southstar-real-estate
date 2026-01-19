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

export default Property;
