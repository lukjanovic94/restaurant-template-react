import { siteConfig } from "../../data/siteConfig";
import "./ContactSection.css";
import MapEmbed from "../MapEmbed/MapEmbed";

const ContactSection = () => {
  return (
    <section className="contact-section" id="kontakt">
      <div className="contact-container">
        <h2 className="contact-title">Rezervacije i informacije</h2>
        <p className="contact-subtitle">
          Tu smo za sva pitanja, rezervacije i informacije o našoj ponudi.
        </p>

        <div className="contact-grid">
          {/* LEVA KOLONA */}
          <div className="contact-info">
            <div className="contact-item">
              <h4>📍 Adresa</h4>
              <a
                href={`https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {siteConfig.address}
              </a>
            </div>

            <div className="contact-item">
              <h4>📞 Telefon</h4>
              <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>
            </div>

            <div className="contact-item">
              <h4>✉️ Email</h4>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </div>
            <div className="contact-item">
              <h4>⏰ Radno vreme</h4>
              Ponedeljak – Petak: 10–23h <br />
              Subota – Nedelja: 12–00h
            </div>

            <div className="contact-item">
              <h4>✉️ Email</h4>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </div>
          </div>

          {/* DESNA KOLONA - CTA */}
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

export default ContactSection;
