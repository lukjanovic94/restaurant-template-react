import { useState } from "react";
import { siteConfig } from "../data/siteConfig";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="nav-container">
      <div className="nav-left">
        <h2>{siteConfig.name}</h2>
      </div>

      <div className="nav-right">
        {/* Burger dugme za mobile */}
        <button className="burger" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>

        {/* Dugme za poziv */}
        <a href={`tel:${siteConfig.phone}`} className="cta-btn">
          Pozovi
        </a>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="mobile-menu">
          <a href="#home">Početna</a>
          <a href="#menu">Meni</a>
          <a href="#about">O nama</a>
          <a href="#contact">Kontakt</a>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
