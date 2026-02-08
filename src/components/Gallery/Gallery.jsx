import galleryData from "./galleryData";
import "./Gallery.css";

function Gallery() {
  return (
    <section className="gallery">
      <h2 className="section-title">Ambijent</h2>

      <div className="gallery-grid">
        {galleryData.map((img, index) => (
          <div
            key={index}
            className="gallery-item"
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>
    </section>
  );
}

export default Gallery;
