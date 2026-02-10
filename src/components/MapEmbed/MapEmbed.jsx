import "./MapEmbed.css";

const MapEmbed = ({ embedSrc }) => {
  return (
    <div className="map-embed">
      <iframe
        title="Lokacija"
        src={embedSrc}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default MapEmbed;
