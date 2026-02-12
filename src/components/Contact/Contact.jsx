import { siteConfig } from "../../data/siteConfig";
import "./Contact.css";
import MapEmbed from "../MapEmbed/MapEmbed";

const Contact = () => {
  return (
    <section className="contact-section" id="kontakt">
      <div className="contact-container">
        <h2 className="contact-title">Rezervacije i informacije</h2>
        <p className="contact-subtitle">
          Tu smo za sva pitanja, rezervacije i informacije o našoj ponudi.
        </p>

        <div className="contact-grid">
          {/* LEFT — info items */}
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-item__left">
                <span className="contact-item__icon">📍</span>
                <h4 className="contact-item__label">Adresa</h4>
              </div>
              <div className="contact-item__value">
                <a
                  href={siteConfig.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {siteConfig.address}
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-item__left">
                <span className="contact-item__icon">📞</span>
                <h4 className="contact-item__label">Telefon</h4>
              </div>
              <div className="contact-item__value">
                <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-item__left">
                <span className="contact-item__icon">✉️</span>
                <h4 className="contact-item__label">Email</h4>
              </div>
              <div className="contact-item__value">
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-item__left">
                <span className="contact-item__icon">⏰</span>
                <h4 className="contact-item__label">Radno vreme</h4>
              </div>
              <div className="contact-item__value">
                <span>Ponedeljak – Petak: 10–23h</span>
                <span>Subota – Nedelja: 12–00h</span>
              </div>
            </div>
          </div>

          {/* RIGHT — CTA card */}
          <div className="contact-cta">
            <p>
              Za rezervacije i sve dodatne informacije, slobodno nas
              kontaktirajte telefonom ili nas posetite u centru grada.
            </p>

            <a href={`tel:${siteConfig.phone}`} className="contact-button">
              Pozovite za rezervaciju
            </a>

            <span className="contact-note">
              Probajte naša Dilemma craft piva 🍺
            </span>
          </div>
        </div>
      </div>

      {/* MAPA */}
      <div className="contact-map">
        <MapEmbed embedSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2827.6430140678576!2d20.638353176581333!3d44.8695617729166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7f788245b905%3A0xd5c4585154cb0176!2sDilema%20gradska%20pivnica!5e0!3m2!1ssr!2srs!4v1770759917688!5m2!1ssr!2srs" />
      </div>
    </section>
  );
};

export default Contact;
