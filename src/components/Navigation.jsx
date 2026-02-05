import { useState } from "react";
import { siteConfig } from "../data/siteConfig";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="nav-container">
      {/* LEVI DEO: CTA */}
      <div className="nav-left">
        <a href={`tel:${siteConfig.phone}`} className="cta-btn">
          Pozovi
        </a>
      </div>
      {/* SREDNJI DEO: logo / ime restorana */}
      <div className="nav-center">
        <h1 className="logo">{siteConfig.name}</h1>
      </div>
      {/* DESNI DEO: burger */}
      <div className="nav-right">
        <button
          className="burger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open Menu"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="mobile-menu">
          <a href="#home" onClick={() => setIsOpen(false)}>
            Početna
          </a>
          <a href="#menu" onClick={() => setIsOpen(false)}>
            Meni
          </a>
          <a href="#about" onClick={() => setIsOpen(false)}>
            O nama
          </a>
          <a href="#contact" onClick={() => setIsOpen(false)}>
            Kontakt
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
