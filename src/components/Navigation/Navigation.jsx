import { useState, useEffect, useRef } from "react";
import { siteConfig } from "../../data/siteConfig";
import "./Navigation.css";

const NAV_LINKS = [
  { label: "Početna",  href: "#home"     },
  { label: "Usluge",   href: "#features" },
  { label: "Meni",     href: "#menu"     },
  { label: "O nama",   href: "#about"    },
  { label: "Galerija", href: "#gallery"  },
  { label: "Kontakt",  href: "#contact"  },
];

function Navigation() {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState("#home");
  const navRef = useRef(null);

  // Scroll → darken navbar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Click outside → close menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && navRef.current && !navRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  const handleLinkClick = (href) => {
    setActive(href);
    setIsOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className={`navigation ${scrolled ? "scrolled" : ""} ${isOpen ? "nav-open" : ""}`}
    >
      {/* LEFT: CTA */}
      <div className="nav-left">
        <a href={`tel:${siteConfig.phone}`} className="cta-btn">
          Pozovi
        </a>
      </div>

      {/* CENTER: logo */}
      <div className="nav-center">
        <img
          src={siteConfig.logo}
          alt={`${siteConfig.name} logo`}
          className="logo-img"
        />
      </div>

      {/* RIGHT: animated burger */}
      <div className="nav-right">
        <button
          className={`burger ${isOpen ? "burger--open" : ""}`}
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? "Zatvori meni" : "Otvori meni"}
          aria-expanded={isOpen}
        >
          <span className="burger__bar burger__bar--top"    />
          <span className="burger__bar burger__bar--mid"    />
          <span className="burger__bar burger__bar--bot"    />
        </button>
      </div>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${isOpen ? "mobile-menu--open" : ""}`}>
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            className={`mobile-menu__link ${active === link.href ? "mobile-menu__link--active" : ""}`}
            style={{ "--i": i }}
            onClick={() => handleLinkClick(link.href)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

export default Navigation;
