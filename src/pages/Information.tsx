import { Link } from "react-router-dom";
import AyalaFooter from "@/components/AyalaFooter";
import southstarLogo from "@/assets/southstar-logo.png";

const Information = () => {
  return (
    <>
      {/* Header */}
      <header className="site-header">
        <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "12px" }}>
          <img src={southstarLogo} alt="SouthStar Realty logo" className="header-logo" />
          <h1>SouthStar Realty</h1>
        </Link>
      </header>

      {/* Navigation */}
      <nav className="tab-nav">
        <div className="nav-container">
          <Link to="/">PROPERTIES</Link>
          <Link to="/popular">POPULAR</Link>
          <Link to="/about">ABOUT US</Link>
          <Link to="/contact">CONTACT</Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="wrap main-content">
        {/* Terms of Use */}
        <section className="info-section">
          <h2 className="section-title" style={{ textAlign: "left" }}>Terms of Use</h2>
          <div className="info-content">
            <p>Welcome to SouthStar Realty. By accessing or using our website, you agree to these Terms of Service and to our Privacy Notice.</p>
            <h4>Use of Website</h4>
            <p>You may use our Website only in compliance with applicable law. You agree not to use the Website to post false information, infringe rights, or engage in unlawful activity.</p>
            <h4>Accounts & Security</h4>
            <p>Some features may require creating an account. Provide accurate information and keep your password secure. You are responsible for activity under your account.</p>
            <h4>Limitation of Liability</h4>
            <p>Our Website and Services are provided "as is." We do not guarantee uninterrupted or error-free operation. Information and listings should be independently verified.</p>
          </div>
        </section>

        {/* Privacy Notice */}
        <section className="info-section">
          <h2 className="section-title" style={{ textAlign: "left" }}>Privacy Notice</h2>
          <div className="info-content">
            <p>We collect personal information you provide (name, contact details, property preferences) and technical information automatically.</p>
            <h4>How We Use Your Information</h4>
            <ul>
              <li>Provide and maintain Services</li>
              <li>Respond to inquiries and schedule viewings</li>
              <li>Improve the Website and user experience</li>
              <li>Send transactional messages</li>
            </ul>
            <h4>Data Protection</h4>
            <p>We retain personal data for as long as necessary to provide Services. You may request access, correction, or deletion by contacting us.</p>
          </div>
        </section>

        {/* Services */}
        <section className="info-section">
          <h2 className="section-title" style={{ textAlign: "left" }}>Services</h2>
          <div className="info-content">
            <p>SouthStar Realty offers comprehensive real estate services across Oriental Mindoro:</p>
            <ul>
              <li><strong>Property Consultation</strong> - Expert guidance on property selection</li>
              <li><strong>Land Title Verification</strong> - Ensuring clean and legitimate titles</li>
              <li><strong>Documentation Assistance</strong> - Help with all paperwork</li>
              <li><strong>Investment Advisory</strong> - Strategic advice for property investments</li>
              <li><strong>Property Viewing</strong> - Scheduled site visits and tours</li>
            </ul>
          </div>
        </section>

        {/* Hospitality */}
        <section className="info-section">
          <h2 className="section-title" style={{ textAlign: "left" }}>Hospitality</h2>
          <div className="info-content">
            <p>Oriental Mindoro offers excellent hospitality options for visitors and potential property buyers:</p>
            <ul>
              <li><strong>Puerto Galera</strong> - World-renowned beach destination with resorts</li>
              <li><strong>Calapan City</strong> - Provincial capital with hotels and accommodations</li>
              <li><strong>Local Stays</strong> - Authentic Filipino hospitality experiences</li>
            </ul>
            <p>Contact us for recommendations on where to stay during your property viewing visits.</p>
          </div>
        </section>

        {/* News Articles */}
        <section className="info-section">
          <h2 className="section-title" style={{ textAlign: "left" }}>News & Updates</h2>
          <div className="info-content">
            <article className="news-item">
              <h4>SouthStar Realty Expands to More Municipalities</h4>
              <p className="news-date">January 2026</p>
              <p>We now serve all 15 municipalities and cities of Oriental Mindoro with comprehensive property solutions.</p>
            </article>
            <article className="news-item">
              <h4>New Payment Options Available</h4>
              <p className="news-date">December 2025</p>
              <p>Flexible installment plans and Pag-IBIG financing now available for qualified buyers.</p>
            </article>
            <article className="news-item">
              <h4>Oriental Mindoro Real Estate Market Growing</h4>
              <p className="news-date">November 2025</p>
              <p>Property values continue to rise as more investors discover Oriental Mindoro's potential.</p>
            </article>
          </div>
        </section>
      </main>

      <AyalaFooter />
    </>
  );
};

export default Information;
