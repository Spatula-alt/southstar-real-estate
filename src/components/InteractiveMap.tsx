import { useState } from "react";

const InteractiveMap = () => {
  const [showControls, setShowControls] = useState(false);
  const [mapSrc, setMapSrc] = useState(
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d976286.6196348995!2d120.51865817699824!3d12.869857848047245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bb61471e778851%3A0x94f1306262b234f!2sOriental%20Mindoro!5e1!3m2!1sen!2sph!4v1762053902496!5m2!1sen!2sph"
  );

  const mapTypes = {
    default: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d976286.6196348995!2d120.51865817699824!3d12.869857848047245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bb61471e778851%3A0x94f1306262b234f!2sOriental%20Mindoro!5e1!3m2!1sen!2sph!4v1762053902496!5m2!1sen!2sph",
    satellite: "https://www.google.com/maps?q=Oriental+Mindoro&t=k&z=10&output=embed",
    terrain: "https://www.google.com/maps?q=Oriental+Mindoro&t=p&z=10&output=embed",
    hybrid: "https://www.google.com/maps?q=Oriental+Mindoro&t=h&z=10&output=embed",
  };

  return (
    <section className="map-section">
      <h2 className="m-0 mb-2.5 text-lg text-primary-dark font-semibold">Interactive Google Map</h2>
      <div className="h-[400px] md:h-[650px] rounded-lg overflow-hidden relative bg-gray-200">
        <button
          onClick={() => setShowControls(!showControls)}
          className="absolute top-2.5 right-2.5 z-20 bg-accent text-accent-foreground font-bold border-none py-2 px-3.5 rounded-lg cursor-pointer shadow-lg"
        >
          Map Layers
        </button>

        {showControls && (
          <div className="absolute top-14 right-2.5 bg-white/95 rounded-lg p-2 flex flex-col gap-1.5 shadow-lg z-30">
            {Object.entries(mapTypes).map(([key, value]) => (
              <button
                key={key}
                onClick={() => {
                  setMapSrc(value);
                  setShowControls(false);
                }}
                className="border-none bg-accent text-accent-foreground font-semibold py-1.5 px-2.5 rounded-md cursor-pointer hover:bg-yellow-500 transition-colors capitalize"
              >
                {key}
              </button>
            ))}
          </div>
        )}

        <iframe
          src={mapSrc}
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Oriental Mindoro Map"
        />
      </div>
    </section>
  );
};

export default InteractiveMap;
