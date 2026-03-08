import { Link, useParams } from "react-router-dom";
import southstarLogo from "@/assets/southstar-logo.png";
import AyalaFooter from "@/components/AyalaFooter";
import { agents } from "@/data/agents";
import { getAgentAvatarUrl } from "@/utils/avatarSeed";

const AgentProfile = () => {
  const { id } = useParams<{ id: string }>();
  const agent = agents.find((a) => a.id === id);

  if (!agent) {
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
            <Link to="/">PROPERTIES</Link><Link to="/popular">POPULAR</Link><Link to="/about">ABOUT US</Link>
            <Link to="/contact">CONTACT</Link><Link to="/agents" className="active">AGENTS</Link><Link to="/login">LOG IN</Link>
          </div>
        </nav>
        <main className="wrap main-content" style={{ textAlign: "center", padding: "60px 20px" }}>
          <h2 className="section-title">Agent Not Found</h2>
          <p style={{ color: "#666", marginBottom: 20 }}>The agent you're looking for doesn't exist.</p>
          <Link to="/agents" className="buy-btn">Back to Agents</Link>
        </main>
        <AyalaFooter />
      </>
    );
  }

  return (
    <>
      <header className="site-header">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}><h1>SouthStar Realty</h1></Link>
      </header>
      <nav className="tab-nav">
        <div className="nav-container">
          <Link to="/">PROPERTIES</Link><Link to="/popular">POPULAR</Link><Link to="/about">ABOUT US</Link>
          <Link to="/contact">CONTACT</Link><Link to="/agents" className="active">AGENTS</Link><Link to="/login">LOG IN</Link>
        </div>
      </nav>

      <main className="wrap main-content">
        <div className="agent-detail">
          <div className="agent-detail-header">
            <img
              src={getAgentAvatarUrl(agent.name, 150)}
              alt={agent.name}
              className="agent-detail-photo"
            />
            <div className="agent-detail-info">
              <h2>{agent.name}</h2>
              <p className="agent-detail-role">{agent.role}</p>
              {agent.name === "Jarabe Ram Felix" && (
                <span className="agent-badge" style={{ marginTop: 8 }}>★ Owner</span>
              )}
            </div>
          </div>

          <div className="agent-detail-body">
            <div className="agent-detail-section">
              <h3>Contact Information</h3>
              <div className="agent-contact-list">
                {agent.phone && (
                  <div className="agent-contact-item"><span className="agent-contact-icon">📞</span><span>{agent.phone}</span></div>
                )}
                {agent.email && (
                  <div className="agent-contact-item"><span className="agent-contact-icon">✉️</span><span>{agent.email}</span></div>
                )}
              </div>
            </div>

            {agent.description && (
              <div className="agent-detail-section">
                <h3>About</h3>
                <p className="agent-description">{agent.description}</p>
              </div>
            )}

            {agent.specialties && agent.specialties.length > 0 && (
              <div className="agent-detail-section">
                <h3>Specialties</h3>
                <div className="agent-specialties">
                  {agent.specialties.map((s, i) => (
                    <span key={i} className="agent-specialty-tag">{s}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="agent-detail-section">
              <Link to="/contact" className="buy-btn">Send a Message</Link>
            </div>
          </div>
        </div>

        <Link to="/agents" className="view-btn" style={{ display: "inline-block", marginTop: 24 }}>
          ← Back to All Agents
        </Link>
      </main>

      <AyalaFooter />
    </>
  );
};

export default AgentProfile;
