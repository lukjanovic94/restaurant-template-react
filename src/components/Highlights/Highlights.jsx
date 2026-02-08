import highlightsData from "./highlightsData";
import "./Highlights.css";

function Highlights() {
  return (
    <section className="highlights">
      <h2 className="section-title">Preporučujemo</h2>

      <div className="highlights-grid">
        {highlightsData.map((item, index) => (
          <div className="highlight-card" key={index}>
            <div
              className="highlight-image"
              style={{ backgroundImage: `url(${item.image})` }}
            />
            <div className="highlight-content">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Highlights;
