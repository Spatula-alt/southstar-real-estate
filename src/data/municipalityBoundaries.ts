// Municipality metadata for Oriental Mindoro
// Real boundaries are loaded from public/oriental-mindoro.geojson at runtime

export interface MunicipalityMeta {
  id: string;
  name: string;
  geoName: string; // name in the GeoJSON file (uppercase)
  lotCount: number;
  floodRisk: "low" | "medium" | "high";
  wildfireRisk: "low" | "medium" | "high";
}

export const municipalityMeta: MunicipalityMeta[] = [
  { id: "puertogalera", name: "Puerto Galera", geoName: "PUERTO GALERA", lotCount: 8, floodRisk: "low", wildfireRisk: "low" },
  { id: "santeodoro", name: "San Teodoro", geoName: "SAN TEODORO", lotCount: 3, floodRisk: "medium", wildfireRisk: "low" },
  { id: "baco", name: "Baco", geoName: "BACO", lotCount: 4, floodRisk: "medium", wildfireRisk: "medium" },
  { id: "calapan", name: "Calapan City", geoName: "CITY OF CALAPAN", lotCount: 15, floodRisk: "medium", wildfireRisk: "low" },
  { id: "naujan", name: "Naujan", geoName: "NAUJAN", lotCount: 6, floodRisk: "high", wildfireRisk: "low" },
  { id: "victoria", name: "Victoria", geoName: "VICTORIA", lotCount: 5, floodRisk: "medium", wildfireRisk: "medium" },
  { id: "socorro", name: "Socorro", geoName: "SOCORRO", lotCount: 4, floodRisk: "medium", wildfireRisk: "medium" },
  { id: "pola", name: "Pola", geoName: "POLA", lotCount: 3, floodRisk: "low", wildfireRisk: "high" },
  { id: "pinamalayan", name: "Pinamalayan", geoName: "PINAMALAYAN", lotCount: 9, floodRisk: "high", wildfireRisk: "low" },
  { id: "gloria", name: "Gloria", geoName: "GLORIA", lotCount: 7, floodRisk: "medium", wildfireRisk: "medium" },
  { id: "bansud", name: "Bansud", geoName: "BANSUD", lotCount: 6, floodRisk: "medium", wildfireRisk: "high" },
  { id: "bongabong", name: "Bongabong", geoName: "BONGABONG", lotCount: 5, floodRisk: "high", wildfireRisk: "medium" },
  { id: "roxas", name: "Roxas", geoName: "ROXAS", lotCount: 4, floodRisk: "medium", wildfireRisk: "medium" },
  { id: "mansalay", name: "Mansalay", geoName: "MANSALAY", lotCount: 3, floodRisk: "low", wildfireRisk: "high" },
  { id: "bulalacao", name: "Bulalacao", geoName: "BULALACAO", lotCount: 2, floodRisk: "low", wildfireRisk: "high" },
];

// Color helpers
export const getDensityColor = (count: number): string => {
  if (count >= 10) return "#149f42";
  if (count >= 6) return "#4db86a";
  if (count >= 4) return "#f6c600";
  return "#e0a800";
};

export const getFloodColor = (risk: string): string => {
  if (risk === "high") return "rgba(30, 100, 220, 0.45)";
  if (risk === "medium") return "rgba(30, 100, 220, 0.25)";
  return "rgba(30, 100, 220, 0.08)";
};

export const getWildfireColor = (risk: string): string => {
  if (risk === "high") return "rgba(220, 50, 30, 0.45)";
  if (risk === "medium") return "rgba(220, 120, 30, 0.25)";
  return "rgba(220, 120, 30, 0.08)";
};
