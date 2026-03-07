import { useState, useCallback, useRef, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import { places } from "@/data/properties";
import {
  municipalityMeta,
  getDensityColor,
  getFloodColor,
  getWildfireColor,
} from "@/data/municipalityBoundaries";
import "leaflet/dist/leaflet.css";

// Build a name→meta lookup
const metaByGeoName = new Map(
  municipalityMeta.map((m) => [m.geoName, m])
);

/* ---- Zoom-then-navigate helper ---- */
const ZoomNavigator = ({ target, onDone }: { target: { bounds: L.LatLngBounds; id: string } | null; onDone: () => void }) => {
  const map = useMap();
  const navigatedRef = useRef(false);

  if (target && !navigatedRef.current) {
    navigatedRef.current = true;
    map.flyToBounds(target.bounds, { duration: 1.2, padding: [40, 40] });
    setTimeout(() => {
      onDone();
      navigatedRef.current = false;
    }, 1400);
  }
  return null;
};

/* ---- Layer Toggles Panel ---- */
const LayerToggles = ({
  layers,
  setLayers,
}: {
  layers: { heatmap: boolean; flood: boolean; wildfire: boolean };
  setLayers: React.Dispatch<React.SetStateAction<typeof layers>>;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="map-layer-toggles">
      <button className="map-layer-btn" onClick={() => setOpen(!open)}>
        🗺️ Layers
      </button>
      {open && (
        <div className="map-layer-panel">
          <label>
            <input type="checkbox" checked={layers.heatmap} onChange={() => setLayers((p) => ({ ...p, heatmap: !p.heatmap }))} />
            Property Density
          </label>
          <label>
            <input type="checkbox" checked={layers.flood} onChange={() => setLayers((p) => ({ ...p, flood: !p.flood }))} />
            Flood Risk
          </label>
          <label>
            <input type="checkbox" checked={layers.wildfire} onChange={() => setLayers((p) => ({ ...p, wildfire: !p.wildfire }))} />
            Wildfire Risk
          </label>
        </div>
      )}
    </div>
  );
};

// Enrich GeoJSON features with our metadata
function enrichGeoJSON(raw: GeoJSON.FeatureCollection): GeoJSON.FeatureCollection {
  return {
    type: "FeatureCollection",
    features: raw.features
      .map((f) => {
        const geoName = f.properties?.MUNICIPALI as string;
        const meta = metaByGeoName.get(geoName);
        if (!meta) return null; // skip municipalities not in our list (e.g. Naujan Lake)
        return {
          ...f,
          properties: {
            ...f.properties,
            id: meta.id,
            name: meta.name,
            lotCount: meta.lotCount,
            floodRisk: meta.floodRisk,
            wildfireRisk: meta.wildfireRisk,
          },
        };
      })
      .filter(Boolean) as GeoJSON.Feature[],
  };
}

const MunicipalityMap = () => {
  const navigate = useNavigate();
  const [layers, setLayers] = useState({ heatmap: false, flood: false, wildfire: false });
  const [zoomTarget, setZoomTarget] = useState<{ bounds: L.LatLngBounds; id: string } | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [geojsonData, setGeojsonData] = useState<GeoJSON.FeatureCollection | null>(null);

  useEffect(() => {
    fetch("/oriental-mindoro.geojson")
      .then((r) => r.json())
      .then((raw) => setGeojsonData(enrichGeoJSON(raw)))
      .catch(console.error);
  }, []);

  const handleClick = useCallback(
    (feature: GeoJSON.Feature, layer: L.Layer) => {
      const id = feature.properties?.id;
      if (!id) return;
      const geoLayer = layer as L.Polygon;
      const bounds = geoLayer.getBounds();
      setZoomTarget({ bounds, id });
    },
    []
  );

  const handleNavigate = useCallback(() => {
    if (zoomTarget) {
      navigate(`/property?place=${zoomTarget.id}`);
      setZoomTarget(null);
    }
  }, [zoomTarget, navigate]);

  const mainStyle = useCallback(
    (feature?: GeoJSON.Feature) => {
      if (!feature) return {};
      const id = feature.properties?.id;
      const count = feature.properties?.lotCount || 0;
      const isHovered = hoveredId === id;
      return {
        fillColor: getDensityColor(count),
        color: isHovered ? "#fff" : "rgba(255,255,255,0.6)",
        weight: isHovered ? 3 : 1.5,
        fillOpacity: isHovered ? 0.7 : 0.45,
        dashArray: isHovered ? "" : "4 2",
      };
    },
    [hoveredId]
  );

  const floodStyle = useCallback((feature?: GeoJSON.Feature) => {
    if (!feature) return {};
    return {
      fillColor: getFloodColor(feature.properties?.floodRisk),
      color: "rgba(30,100,220,0.5)",
      weight: 1,
      fillOpacity: 1,
    };
  }, []);

  const wildfireStyle = useCallback((feature?: GeoJSON.Feature) => {
    if (!feature) return {};
    return {
      fillColor: getWildfireColor(feature.properties?.wildfireRisk),
      color: "rgba(220,50,30,0.5)",
      weight: 1,
      fillOpacity: 1,
    };
  }, []);

  const onEachFeature = useCallback(
    (feature: GeoJSON.Feature, layer: L.Layer) => {
      const props = feature.properties;
      if (!props) return;
      const place = places.find((p) => p.id === props.id);

      layer.on({
        mouseover: () => setHoveredId(props.id),
        mouseout: () => setHoveredId(null),
        click: () => handleClick(feature, layer),
      });

      layer.bindTooltip(
        `<strong>${props.name}</strong><br/>${props.lotCount} lots available${place ? `<br/>${place.price}` : ""}`,
        { direction: "top", sticky: true, className: "municipality-tooltip" }
      );
    },
    [handleClick]
  );

  const onEachOverlay = useCallback((_: GeoJSON.Feature, layer: L.Layer) => {
    (layer as any).options.interactive = false;
  }, []);

  if (!geojsonData) {
    return <div style={{ height: 650, display: "flex", alignItems: "center", justifyContent: "center" }}>Loading map…</div>;
  }

  return (
    <div style={{ position: "relative" }}>
      <LayerToggles layers={layers} setLayers={setLayers} />
      <MapContainer
        center={[13.0, 121.3]}
        zoom={9}
        style={{ height: 650, borderRadius: 10, zIndex: 1 }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri"
        />

        <GeoJSON
          key={`main-${hoveredId}`}
          data={geojsonData}
          style={mainStyle}
          onEachFeature={onEachFeature}
        />

        {layers.flood && (
          <GeoJSON
            key="flood"
            data={geojsonData}
            style={floodStyle}
            onEachFeature={onEachOverlay}
          />
        )}

        {layers.wildfire && (
          <GeoJSON
            key="wildfire"
            data={geojsonData}
            style={wildfireStyle}
            onEachFeature={onEachOverlay}
          />
        )}

        {layers.heatmap && (
          <GeoJSON
            key="heatmap"
            data={geojsonData}
            style={(feature) => {
              if (!feature) return {};
              const count = feature.properties?.lotCount || 0;
              const intensity = Math.min(count / 15, 1);
              return {
                fillColor: `rgba(255, ${Math.round(200 - intensity * 180)}, 0, ${0.2 + intensity * 0.5})`,
                color: "transparent",
                weight: 0,
                fillOpacity: 1,
              };
            }}
            onEachFeature={onEachOverlay}
          />
        )}

        <ZoomNavigator target={zoomTarget} onDone={handleNavigate} />
      </MapContainer>

      <div className="map-legend">
        <span><span className="legend-dot" style={{ background: "#149f42" }} /> 10+ lots</span>
        <span><span className="legend-dot" style={{ background: "#4db86a" }} /> 6-9 lots</span>
        <span><span className="legend-dot" style={{ background: "#f6c600" }} /> 4-5 lots</span>
        <span><span className="legend-dot" style={{ background: "#e0a800" }} /> &lt;4 lots</span>
        {layers.flood && <span><span className="legend-dot" style={{ background: "rgba(30,100,220,0.5)" }} /> Flood risk</span>}
        {layers.wildfire && <span><span className="legend-dot" style={{ background: "rgba(220,50,30,0.5)" }} /> Wildfire risk</span>}
      </div>
    </div>
  );
};

export default MunicipalityMap;
