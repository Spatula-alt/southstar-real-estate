import { Link } from "react-router-dom";

// Full list of municipalities/cities for Oriental Mindoro
const municipalities = [
  { id: 'calapan', name: 'Calapan City', image: 'https://media-cdn.tripadvisor.com/media/photo-s/02/f7/51/a2/only-at-calapan-orriental.jpg' },
  { id: 'puertogalera', name: 'Puerto Galera', image: 'https://www.travelorientalmindoro.ph/Content/img/uploads/3997051e-5e30-4aff-9f65-cc33f90d3b6b_thumb.jpg' },
  { id: 'santeodoro', name: 'San Teodoro', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/36/81/c2/san-teodoro-beach.jpg' },
  { id: 'baco', name: 'Baco', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Baco_oriental_mindoro_seal.png/300px-Baco_oriental_mindoro_seal.png' },
  { id: 'naujan', name: 'Naujan', image: 'https://alchetron.com/cdn/naujan-oriental-mindoro-7f1b2edc-f2ac-49fc-8a1e-2053f454108-resize-750.jpeg' },
  { id: 'victoria', name: 'Victoria', image: 'https://i.ytimg.com/vi/jZPfSQz2nFU/hqdefault.jpg' },
  { id: 'pola', name: 'Pola', image: 'https://i.ytimg.com/vi/zFMqrUzJhZU/hqdefault.jpg' },
  { id: 'socorro', name: 'Socorro', image: 'https://th.bing.com/th/id/OIP.-OfSmxtQLf1Twz3SJ2usQwHaFj' },
  { id: 'pinamalayan', name: 'Pinamalayan', image: 'https://travelorientalmindoro.ph/Content/img/uploads/888ed3ef-1f02-4ee3-8f8d-560bf8fb3474.jpg' },
  { id: 'gloria', name: 'Gloria', image: 'https://travelorientalmindoro.ph/Content/img/uploads/3cf6e252-5281-4ba3-b494-2d087f0bae9e_thumb.jpg' },
  { id: 'bansud', name: 'Bansud', image: 'https://tse1.mm.bing.net/th/id/OIP.lwMdzkNCu7HTv5qYAy9tQQHaET' },
  { id: 'bongabong', name: 'Bongabong', image: 'https://i.ytimg.com/vi/kSSMAxHN2yA/hqdefault.jpg' },
  { id: 'roxas', name: 'Roxas', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Mindoro_Ferry_Port.jpg/500px-Mindoro_Ferry_Port.jpg' },
  { id: 'mansalay', name: 'Mansalay', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/59/49/fc/buktot-beach-mansalay.jpg' },
  { id: 'bulalacao', name: 'Bulalacao', image: 'https://i.ytimg.com/vi/FLC25tWhUD8/maxresdefault.jpg' }
];

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

        <section className="property-grid">
          {municipalities.map((place) => (
            <div
              key={place.id}
              className="property-tile"
              style={{
                backgroundImage: `url(${place.image})`
              }}
            >
              <div className="overlay">
                <h3>{place.name}</h3>
                <Link to={`/property?place=${place.id}`} className="view-btn">
                  View
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* Map Section */}
        <section className="map-section">
          <h2>Interactive Google Map</h2>
          <div className="map-box">
            <iframe
              src="https://www.google.com/maps/d/u/0/embed?mid=1bNTJ1OV14-5_u0mL2T7JeLbpheefugI&ehbc=2E312F&noprof=1"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Oriental Mindoro Map"
            />
          </div>
        </section>
      </main>

      {/* Footer - mirrors header */}
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
