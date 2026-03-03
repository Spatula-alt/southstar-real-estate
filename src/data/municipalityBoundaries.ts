// Approximate GeoJSON polygon boundaries for Oriental Mindoro municipalities
// These are simplified boundaries for visualization purposes

export interface MunicipalityGeoData {
  id: string;
  name: string;
  lotCount: number;
  coordinates: [number, number][][]; // GeoJSON polygon coords [lng, lat]
  center: [number, number]; // [lat, lng] for Leaflet
  floodRisk: "low" | "medium" | "high";
  wildfireRisk: "low" | "medium" | "high";
}

export const municipalityBoundaries: MunicipalityGeoData[] = [
  {
    id: "puertogalera",
    name: "Puerto Galera",
    lotCount: 8,
    center: [13.5000, 120.9500],
    floodRisk: "low",
    wildfireRisk: "low",
    coordinates: [[
      [120.89, 13.54], [120.92, 13.56], [120.96, 13.55],
      [121.00, 13.53], [121.01, 13.50], [120.99, 13.47],
      [120.95, 13.46], [120.91, 13.47], [120.89, 13.50], [120.89, 13.54],
    ]],
  },
  {
    id: "santeodoro",
    name: "San Teodoro",
    lotCount: 3,
    center: [13.4350, 121.0100],
    floodRisk: "medium",
    wildfireRisk: "low",
    coordinates: [[
      [120.98, 13.48], [121.01, 13.50], [121.05, 13.48],
      [121.06, 13.44], [121.03, 13.41], [120.99, 13.42],
      [120.97, 13.45], [120.98, 13.48],
    ]],
  },
  {
    id: "baco",
    name: "Baco",
    lotCount: 4,
    center: [13.3600, 121.0900],
    floodRisk: "medium",
    wildfireRisk: "medium",
    coordinates: [[
      [121.04, 13.42], [121.08, 13.43], [121.12, 13.40],
      [121.13, 13.36], [121.10, 13.33], [121.06, 13.33],
      [121.03, 13.36], [121.03, 13.40], [121.04, 13.42],
    ]],
  },
  {
    id: "calapan",
    name: "Calapan City",
    lotCount: 15,
    center: [13.4113, 121.1803],
    floodRisk: "medium",
    wildfireRisk: "low",
    coordinates: [[
      [121.13, 13.46], [121.17, 13.47], [121.22, 13.45],
      [121.24, 13.42], [121.23, 13.38], [121.19, 13.36],
      [121.14, 13.37], [121.12, 13.40], [121.12, 13.44], [121.13, 13.46],
    ]],
  },
  {
    id: "naujan",
    name: "Naujan",
    lotCount: 6,
    center: [13.3250, 121.3000],
    floodRisk: "high",
    wildfireRisk: "low",
    coordinates: [[
      [121.22, 13.40], [121.28, 13.42], [121.35, 13.40],
      [121.38, 13.35], [121.36, 13.28], [121.30, 13.25],
      [121.24, 13.27], [121.21, 13.32], [121.21, 13.37], [121.22, 13.40],
    ]],
  },
  {
    id: "victoria",
    name: "Victoria",
    lotCount: 5,
    center: [13.1750, 121.2800],
    floodRisk: "medium",
    wildfireRisk: "medium",
    coordinates: [[
      [121.22, 13.24], [121.26, 13.25], [121.32, 13.23],
      [121.34, 13.19], [121.32, 13.14], [121.27, 13.13],
      [121.23, 13.15], [121.21, 13.19], [121.22, 13.24],
    ]],
  },
  {
    id: "socorro",
    name: "Socorro",
    lotCount: 4,
    center: [13.0600, 121.4100],
    floodRisk: "medium",
    wildfireRisk: "medium",
    coordinates: [[
      [121.36, 13.12], [121.40, 13.13], [121.44, 13.10],
      [121.45, 13.05], [121.43, 13.01], [121.38, 13.00],
      [121.35, 13.03], [121.35, 13.08], [121.36, 13.12],
    ]],
  },
  {
    id: "pola",
    name: "Pola",
    lotCount: 3,
    center: [13.1450, 121.4700],
    floodRisk: "low",
    wildfireRisk: "high",
    coordinates: [[
      [121.42, 13.20], [121.46, 13.21], [121.50, 13.19],
      [121.52, 13.15], [121.50, 13.11], [121.46, 13.10],
      [121.42, 13.12], [121.41, 13.16], [121.42, 13.20],
    ]],
  },
  {
    id: "pinamalayan",
    name: "Pinamalayan",
    lotCount: 9,
    center: [13.0050, 121.4900],
    floodRisk: "high",
    wildfireRisk: "low",
    coordinates: [[
      [121.44, 13.06], [121.48, 13.08], [121.53, 13.05],
      [121.55, 13.00], [121.53, 12.96], [121.48, 12.95],
      [121.44, 12.97], [121.43, 13.02], [121.44, 13.06],
    ]],
  },
  {
    id: "gloria",
    name: "Gloria",
    lotCount: 7,
    center: [12.9700, 121.4800],
    floodRisk: "medium",
    wildfireRisk: "medium",
    coordinates: [[
      [121.43, 13.01], [121.47, 13.02], [121.51, 13.00],
      [121.53, 12.96], [121.51, 12.93], [121.47, 12.92],
      [121.43, 12.94], [121.42, 12.98], [121.43, 13.01],
    ]],
  },
  {
    id: "bansud",
    name: "Bansud",
    lotCount: 6,
    center: [12.8700, 121.5100],
    floodRisk: "medium",
    wildfireRisk: "high",
    coordinates: [[
      [121.47, 12.92], [121.50, 12.93], [121.54, 12.91],
      [121.56, 12.87], [121.54, 12.84], [121.50, 12.83],
      [121.47, 12.85], [121.46, 12.89], [121.47, 12.92],
    ]],
  },
  {
    id: "bongabong",
    name: "Bongabong",
    lotCount: 5,
    center: [12.7550, 121.4700],
    floodRisk: "high",
    wildfireRisk: "medium",
    coordinates: [[
      [121.42, 12.81], [121.46, 12.82], [121.50, 12.80],
      [121.52, 12.76], [121.50, 12.72], [121.46, 12.71],
      [121.42, 12.73], [121.41, 12.77], [121.42, 12.81],
    ]],
  },
  {
    id: "roxas",
    name: "Roxas",
    lotCount: 4,
    center: [12.5900, 121.5100],
    floodRisk: "medium",
    wildfireRisk: "medium",
    coordinates: [[
      [121.46, 12.64], [121.50, 12.65], [121.54, 12.63],
      [121.56, 12.59], [121.54, 12.55], [121.50, 12.54],
      [121.46, 12.56], [121.45, 12.60], [121.46, 12.64],
    ]],
  },
  {
    id: "mansalay",
    name: "Mansalay",
    lotCount: 3,
    center: [12.5200, 121.4400],
    floodRisk: "low",
    wildfireRisk: "high",
    coordinates: [[
      [121.39, 12.57], [121.43, 12.58], [121.47, 12.56],
      [121.49, 12.52], [121.47, 12.48], [121.43, 12.47],
      [121.39, 12.49], [121.38, 12.53], [121.39, 12.57],
    ]],
  },
  {
    id: "bulalacao",
    name: "Bulalacao",
    lotCount: 2,
    center: [12.3400, 121.3300],
    floodRisk: "low",
    wildfireRisk: "high",
    coordinates: [[
      [121.28, 12.39], [121.32, 12.40], [121.36, 12.38],
      [121.38, 12.34], [121.36, 12.30], [121.32, 12.29],
      [121.28, 12.31], [121.27, 12.35], [121.28, 12.39],
    ]],
  },
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
