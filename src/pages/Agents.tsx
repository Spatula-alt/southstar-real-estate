import { Link } from "react-router-dom";
import southstarLogo from "@/assets/southstar-logo.png";
import AyalaFooter from "@/components/AyalaFooter";
import { agents } from "@/data/agents";
import { getAgentAvatarUrl } from "@/utils/avatarSeed";

const Agents = () => {
  return (
    <>
      <header className="site-header">
        <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "10px" }}>
          <img src={southstarLogo} alt="SouthStar Realty logo" className="header-logo" />
          <h1>SouthStar Realty</h1>
        </Link>
      </header>

      <nav className="tab-nav">
        <div className="nav-container">
          <Link to="/properties">PROPERTIES</Link>
          <Link to="/popular">POPULAR</Link>
          <Link to="/about">ABOUT US</Link>
          <Link to="/contact">CONTACT</Link>
          <Link to="/agents" className="active">AGENTS</Link>
          <Link to="/login">LOG IN</Link>
        </div>
      </nav>

      <main className="wrap main-content">
        <h2 className="section-title">Our Agents</h2>
        <p style={{ textAlign: "center", color: "#666", marginBottom: "30px", maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}>
          Meet our team of dedicated real estate professionals serving Oriental Mindoro.
        </p>

        <div className="agents-grid">
          {agents.map((agent) => (
            <Link to={`/agents/${agent.id}`} key={agent.id} className="agent-profile-card agent-card-link">
              <img
                src={getAgentAvatarUrl(agent.name, 80)}
                alt={agent.name}
                className="agent-photo-avatar"
              />
              <h3>{agent.name}</h3>
              <p>{agent.role}</p>
              {agent.name === "Jarabe Ram Felix" && (
                <span className="agent-badge">★ Owner</span>
              )}
            </Link>
          ))}
        </div>

        <section className="property-card" style={{ marginTop: "40px" }}>
          <div className="property-details" style={{ textAlign: "center" }}>
            <h3>Want to Join Our Team?</h3>
            <p style={{ color: "#666", maxWidth: "600px", margin: "0 auto 12px" }}>
              We're always looking for passionate agents. Reach out to us!
            </p>
            <Link to="/contact" className="buy-btn">Contact Us</Link>
          </div>
        </section>
      </main>

      <AyalaFooter />
    </>
  );
};

export default Agents;
