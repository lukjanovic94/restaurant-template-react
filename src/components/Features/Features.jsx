import featuresData from "./featuresData";
import "./Features.css";

function Features() {
  return (
    <section className="features">
      <div className="features-container">
        {featuresData.map((item, index) => (
          <div className="feature-card" key={index}>
            <span className="feature-icon">{item.icon}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
