import { useState, useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { places } from "@/data/properties";
import "leaflet/dist/leaflet.css";

const municipalityCoords: Record<string, [number, number]> = {
  puertogalera: [13.5000, 120.9500],
  santeodoro: [13.4350, 121.0100],
  baco: [13.3600, 121.0900],
  calapan: [13.4113, 121.1803],
  naujan: [13.3250, 121.3000],
  victoria: [13.1750, 121.2800],
  socorro: [13.0600, 121.4100],
  pola: [13.1450, 121.4700],
  pinamalayan: [13.0050, 121.4900],
  gloria: [12.9700, 121.4800],
  bansud: [12.8700, 121.5100],
  bongabong: [12.7550, 121.4700],
  roxas: [12.5900, 121.5100],
  mansalay: [12.5200, 121.4400],
  bulalacao: [12.3400, 121.3300],
};

const lotCounts: Record<string, number> = {
  puertogalera: 8, santeodoro: 3, baco: 4, calapan: 15, naujan: 6,
  victoria: 5, socorro: 4, pola: 3, pinamalayan: 9, gloria: 7,
  bansud: 6, bongabong: 5, roxas: 4, mansalay: 3, bulalacao: 2,
};

const getColor = (count: number) => {
  if (count >= 8) return "#149f42";
  if (count >= 4) return "#f6c600";
  return "#999";
};

const MapOptions = ({ mapType, setMapType }: { mapType: string; setMapType: (t: string) => void }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "absolute", top: 10, right: 10, zIndex: 1000 }}>
      <button className="map-opt-toggle" onClick={() => setOpen(!open)}>Map Options</button>
      {open && (
        <div className="map-opt-panel">
          <strong>View Mode</strong>
          {["default", "satellite"].map((t) => (
            <label key={t} style={{ display: "flex", gap: 6, alignItems: "center", cursor: "pointer" }}>
              <input type="radio" name="mapType" checked={mapType === t} onChange={() => setMapType(t)} />
              {t === "default" ? "Automatic" : "Satellite"}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const TileSwitch = ({ mapType }: { mapType: string }) => {
  const map = useMap();
  useEffect(() => { map.invalidateSize(); }, [mapType]);
  
  if (mapType === "satellite") {
    return <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" attribution="Tiles &copy; Esri" />;
  }
  return <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>' />;
};

const MunicipalityMap = () => {
  const navigate = useNavigate();
  const [mapType, setMapType] = useState("default");

  return (
    <div style={{ position: "relative" }}>
      <MapOptions mapType={mapType} setMapType={setMapType} />
      <MapContainer
        center={[13.0, 121.3]}
        zoom={9}
        style={{ height: 650, borderRadius: 10, zIndex: 1 }}
        scrollWheelZoom={true}
      >
        <TileSwitch mapType={mapType} />
        {places.map((place) => {
          const coords = municipalityCoords[place.id];
          if (!coords) return null;
          const count = lotCounts[place.id] || 0;
          return (
            <CircleMarker
              key={place.id}
              center={coords}
              radius={12 + count}
              pathOptions={{ fillColor: getColor(count), color: "#fff", weight: 2, fillOpacity: 0.85 }}
              eventHandlers={{ click: () => navigate(`/property?place=${place.id}`) }}
            >
              <Tooltip direction="top" offset={[0, -10]}>
                <strong>{place.name}</strong><br />
                {count} lots · {place.price}
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
      <div className="map-legend">
        <span><span className="legend-dot" style={{ background: "#149f42" }} /> 8+ lots</span>
        <span><span className="legend-dot" style={{ background: "#f6c600" }} /> 4-7 lots</span>
        <span><span className="legend-dot" style={{ background: "#999" }} /> &lt;4 lots</span>
      </div>
    </div>
  );
};

export default MunicipalityMap;
