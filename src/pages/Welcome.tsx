import { Link } from "react-router-dom";
import southstarLogo from "@/assets/southstar-logo.png";
import AyalaFooter from "@/components/AyalaFooter";

const featuredImages = [
  {
    src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/f0/05/c1/white-beach.jpg?w=700&h=500&s=1",
    alt: "Puerto Galera Beach",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mindoro_Oriental_Capitol.jpg/1280px-Mindoro_Oriental_Capitol.jpg",
    alt: "Pinamalayan",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Gloria_Oriental_Mindoro_1.jpg/1280px-Gloria_Oriental_Mindoro_1.jpg",
    alt: "Gloria",
  },
  {
    src: "https://media-cdn.tripadvisor.com/media/photo-s/02/f7/51/a2/only-at-calapan-orriental.jpg",
    alt: "Calapan City",
  },
  {
    src: "https://i.ytimg.com/vi/kSSMAxHN2yA/hqdefault.jpg",
    alt: "Bongabong",
  },
];

const Welcome = () => {
  return (
    <>
      {/* Header */}
      <header className="welcome-header">
        <Link to="/" className="welcome-logo-link">
          <img src={southstarLogo} alt="SouthStar Realty logo" className="header-logo" />
          <h1>SouthStar Realty</h1>
        </Link>
      </header>

      {/* Featured Grid */}
      <main className="welcome-main">
        <section className="welcome-grid">
          <div className="welcome-tile">
            <img src={featuredImages[0].src} alt={featuredImages[0].alt} />
          </div>
          <div className="welcome-tile">
            <img src={featuredImages[1].src} alt={featuredImages[1].alt} />
          </div>
          <div className="welcome-tile">
            <img src={featuredImages[2].src} alt={featuredImages[2].alt} />
          </div>
          <div className="welcome-tile">
            <img src={featuredImages[3].src} alt={featuredImages[3].alt} />
          </div>
          <div className="welcome-tile welcome-cta-tile">
            <Link to="/properties" className="welcome-cta-btn">
              VIEW PROPERTY<br />LISTINGS
            </Link>
          </div>
          <div className="welcome-tile">
            <img src={featuredImages[4].src} alt={featuredImages[4].alt} />
          </div>
        </section>

        {/* Marketing Copy */}
        <section className="welcome-copy">
          <div className="welcome-copy-block">
            <p>
              We have more affordable real estate listings than any other broker in Oriental Mindoro.
              Around here, we know that the best deal is the one that doesn't break your wallet.
            </p>
            <p>
              It's a buyer's market. It's a seller's market.<br />
              It's whatever you decide it to be.<br />
              At Southstar Realty, your plans don't need approval—they just need direction.
            </p>
          </div>
          <div className="welcome-copy-block">
            <p>
              At Southstar Realty, your plans don't need approval—they just need direction.
            </p>
            <p>
              Nobody has ever lost money owning land in Oriental Mindoro.<br />
              Waiting too long? That's where people take the L.
            </p>
            <p>
              For a professional, personal, sometimes questionably enthusiastic touch, look no further than Southstar Realty.
            </p>
          </div>
          <div className="welcome-copy-block">
            <p>
              Don't think of us as your realtor—think of us as that friend who shows up uninvited but somehow gives you the best advice.
            </p>
            <p>
              The kind of friend who points out things you already noticed, like:<br />
              "This is the kitchen."<br />
              "This area's perfect for your future plans."<br />
              "This place actually makes sense if you think ahead."
            </p>
          </div>
          <div className="welcome-copy-block welcome-copy-cta">
            <p>Call Southstar Realty today, and say hello to a good <strong>BUY!</strong></p>
          </div>
        </section>
      </main>

      <AyalaFooter />
    </>
  );
};

export default Welcome;
