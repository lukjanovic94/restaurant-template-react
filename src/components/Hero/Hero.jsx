import { useEffect, useState } from "react";
import heroImages from "./heroImages";
import "./Hero.css";

function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 7000); // 7 sekundi

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      {heroImages.map((img, index) => (
        <div
          key={index}
          className={`hero-slide ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      <div className="hero-content">
        <h1>Ukus koji se pamti</h1>
        <p>Sveže, domaće i sa ljubavlju</p>
      </div>
    </section>
  );
}

export default Hero;
