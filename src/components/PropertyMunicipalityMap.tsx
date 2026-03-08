import { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import { municipalityMeta } from "@/data/municipalityBoundaries";
import "leaflet/dist/leaflet.css";

const MUNICIPALITIES_WITH_PROPERTIES = new Set([
  "calapan", "pinamalayan", "gloria", "bansud", "bongabong"
]);

const metaByGeoName = new Map(
  municipalityMeta.map((m) => [m.geoName, m])
);

function enrichGeoJSON(raw: GeoJSON.FeatureCollection): GeoJSON.FeatureCollection {
  const grouped = new Map<string, GeoJSON.Feature[]>();
  for (const f of raw.features) {
    const geoName = f.properties?.MUNICIPALI as string;
    const meta = metaByGeoName.get(geoName);
    if (!meta) continue;
    if (!grouped.has(meta.id)) grouped.set(meta.id, []);
    grouped.get(meta.id)!.push(f);
  }

  const features: GeoJSON.Feature[] = [];
  for (const [id, group] of grouped) {
    const meta = municipalityMeta.find((m) => m.id === id)!;
    if (group.length === 1) {
      features.push({
        ...group[0],
        properties: { id: meta.id, name: meta.name, lotCount: meta.lotCount },
      });
    } else {
      const polygons: GeoJSON.Position[][][] = [];
      for (const f of group) {
        if (f.geometry.type === "Polygon") {
          polygons.push((f.geometry as GeoJSON.Polygon).coordinates);
        } else if (f.geometry.type === "MultiPolygon") {
          polygons.push(...(f.geometry as GeoJSON.MultiPolygon).coordinates);
        }
      }
      features.push({
        type: "Feature",
        properties: { id: meta.id, name: meta.name, lotCount: meta.lotCount },
        geometry: { type: "MultiPolygon", coordinates: polygons },
      });
    }
  }
  return { type: "FeatureCollection", features };
}

/* Auto-fit bounds to the highlighted municipality */
const FitBounds = ({ geojsonData, placeId }: { geojsonData: GeoJSON.FeatureCollection; placeId: string }) => {
  const map = useMap();

  useEffect(() => {
    const feature = geojsonData.features.find((f) => f.properties?.id === placeId);
    if (feature) {
      const layer = L.geoJSON(feature);
      const bounds = layer.getBounds();
      map.fitBounds(bounds, { padding: [30, 30], maxZoom: 12 });
    }
  }, [map, geojsonData, placeId]);

  return null;
};

interface Props {
  placeId: string;
}

const PropertyMunicipalityMap = ({ placeId }: Props) => {
  const [geojsonData, setGeojsonData] = useState<GeoJSON.FeatureCollection | null>(null);

  useEffect(() => {
    fetch("/oriental-mindoro.geojson")
      .then((r) => r.json())
      .then((raw) => setGeojsonData(enrichGeoJSON(raw)))
      .catch(console.error);
  }, []);

  const hasProperties = MUNICIPALITIES_WITH_PROPERTIES.has(placeId);
  const meta = municipalityMeta.find((m) => m.id === placeId);

  const style = useCallback(
    (feature?: GeoJSON.Feature) => {
      if (!feature) return {};
      const id = feature.properties?.id;
      const isTarget = id === placeId;
      const hasProps = MUNICIPALITIES_WITH_PROPERTIES.has(id);

      if (isTarget) {
        return {
          fillColor: hasProps ? "rgba(20, 159, 66, 0.65)" : "rgba(200, 180, 40, 0.6)",
          color: "#fff",
          weight: 2.5,
          fillOpacity: hasProps ? 0.65 : 0.6,
        };
      }
      return {
        fillColor: hasProps ? "rgba(20, 159, 66, 0.25)" : "rgba(200, 180, 40, 0.2)",
        color: "rgba(255,255,255,0.4)",
        weight: 1,
        fillOpacity: hasProps ? 0.25 : 0.2,
      };
    },
    [placeId]
  );

  const onEachFeature = useCallback(
    (feature: GeoJSON.Feature, layer: L.Layer) => {
      const props = feature.properties;
      if (!props) return;
      const hasProps = MUNICIPALITIES_WITH_PROPERTIES.has(props.id);
      layer.bindTooltip(
        `<strong>${props.name}</strong><br/>${hasProps ? `${props.lotCount} lots available` : "No properties yet"}`,
        { direction: "top", sticky: true, className: "municipality-tooltip" }
      );
    },
    []
  );

  if (!geojsonData) {
    return <div style={{ height: 400, display: "flex", alignItems: "center", justifyContent: "center" }}>Loading map…</div>;
  }

  return (
    <div style={{ position: "relative" }}>
      <MapContainer
        center={[13.0, 121.3]}
        zoom={10}
        style={{ height: 400, borderRadius: 10, zIndex: 1 }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri"
        />
        <GeoJSON data={geojsonData} style={style} onEachFeature={onEachFeature} />
        <FitBounds geojsonData={geojsonData} placeId={placeId} />
      </MapContainer>

      {/* Status badge */}
      {!hasProperties && (
        <div style={{
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 10,
          background: "rgba(200, 170, 30, 0.92)",
          color: "#fff",
          padding: "8px 16px",
          borderRadius: 8,
          fontWeight: 700,
          fontSize: 14,
          boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}>
          ⚠️ No properties available yet in {meta?.name || "this area"}
        </div>
      )}

      {hasProperties && (
        <div style={{
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 10,
          background: "rgba(20, 140, 60, 0.92)",
          color: "#fff",
          padding: "8px 16px",
          borderRadius: 8,
          fontWeight: 700,
          fontSize: 14,
          boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}>
          ✅ {meta?.lotCount} lots available
        </div>
      )}

      <div className="map-legend" style={{ marginTop: 8 }}>
        <span><span className="legend-dot" style={{ background: "rgba(20, 159, 66, 0.7)" }} /> Has Properties</span>
        <span><span className="legend-dot" style={{ background: "rgba(200, 180, 40, 0.65)" }} /> No Properties Yet</span>
      </div>
    </div>
  );
};

export default PropertyMunicipalityMap;
