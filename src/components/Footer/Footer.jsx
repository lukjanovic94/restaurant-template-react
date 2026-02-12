import { siteConfig } from "../../data/siteConfig";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="contact">
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section footer-brand">
            <span className="brand-name">{siteConfig.name}</span>
            <p className="brand-description">{siteConfig.tagline}</p>
            <div className="social-links">
              {siteConfig.social.instagram && (
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Instagram"
                >
                  📷
                </a>
              )}
              {siteConfig.social.facebook && (
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Facebook"
                >
                  📘
                </a>
              )}
            </div>
          </div>

          {/* Contact Section */}
          <div className="footer-section">
            <h3>Kontakt</h3>
            <div className="contact-info-footer">
              <div className="contact-item_footer">
                <span className="contact-icon">📍</span>
                <span>{siteConfig.address}</span>
              </div>
              <div className="contact-item_footer">
                <span className="contact-icon">📞</span>
                <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>
              </div>
              <div className="contact-item_footer">
                <span className="contact-icon">✉️</span>
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="footer-section">
            <h3>Linkovi</h3>
            <div className="quick-links">
              <a href="#hero">Početna</a>
              <a href="#features">Usluge</a>
              <a href="#highlights">Preporuke</a>
              <a href="#about">O nama</a>
              <a href="#gallery">Galerija</a>
            </div>
          </div>

          {/* Hours Section */}
          <div className="footer-section">
            <h3>Radno vreme</h3>
            <p style={{ marginBottom: "0.5rem" }}>{siteConfig.hours}</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>
            &copy; {currentYear} {siteConfig.name}. Sva prava zadržana.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
