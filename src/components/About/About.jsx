import aboutData from "../../data/aboutData";
import "./About.css";

function About() {
  return (
    <section className="about" id="about">
      <div className="about-container">
        <h2>{aboutData.title}</h2>

        {aboutData.text.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

export default About;
