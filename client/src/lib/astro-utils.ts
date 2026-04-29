// Shared astronomical calculation utilities
// Uses mean orbital elements for approximate positions (~1-3° accuracy)

export const SIGNS = [
  "Aries","Taurus","Gemini","Cancer","Leo","Virgo",
  "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"
];
export const SIGN_SYMBOLS = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"];
export const SIGN_GLYPHS = ["Ar","Ta","Ge","Cn","Le","Vi","Li","Sc","Sg","Cp","Aq","Pi"];
export const ELEMENTS: Record<string, string> = {
  Aries:"Fire",Taurus:"Earth",Gemini:"Air",Cancer:"Water",
  Leo:"Fire",Virgo:"Earth",Libra:"Air",Scorpio:"Water",
  Sagittarius:"Fire",Capricorn:"Earth",Aquarius:"Air",Pisces:"Water"
};
export const MODALITIES: Record<string, string> = {
  Aries:"Cardinal",Taurus:"Fixed",Gemini:"Mutable",Cancer:"Cardinal",
  Leo:"Fixed",Virgo:"Mutable",Libra:"Cardinal",Scorpio:"Fixed",
  Sagittarius:"Mutable",Capricorn:"Cardinal",Aquarius:"Fixed",Pisces:"Mutable"
};
export const RULING_PLANETS: Record<string, string> = {
  Aries:"Mars",Taurus:"Venus",Gemini:"Mercury",Cancer:"Moon",
  Leo:"Sun",Virgo:"Mercury",Libra:"Venus",Scorpio:"Pluto",
  Sagittarius:"Jupiter",Capricorn:"Saturn",Aquarius:"Uranus",Pisces:"Neptune"
};
export const ELEMENT_COLORS: Record<string, string> = {
  Fire:"#ef4444",Earth:"#84cc16",Air:"#eab308",Water:"#3b82f6"
};

export function normalizeAngle(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

export function degreesToSign(degrees: number): {
  sign: string; symbol: string; signIndex: number; degreesInSign: number
} {
  const n = normalizeAngle(degrees);
  const signIndex = Math.floor(n / 30);
  return { sign: SIGNS[signIndex], symbol: SIGN_SYMBOLS[signIndex], signIndex, degreesInSign: n - signIndex * 30 };
}

export function dateToJD(date: Date): number {
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth() + 1;
  const d = date.getUTCDate() + date.getUTCHours()/24 + date.getUTCMinutes()/1440;
  const a = Math.floor((14 - m) / 12);
  const yr = y + 4800 - a;
  const mo = m + 12 * a - 3;
  return d + Math.floor((153*mo+2)/5) + 365*yr + Math.floor(yr/4) - Math.floor(yr/100) + Math.floor(yr/400) - 32045;
}

export function daysFromJ2000(date: Date): number {
  return dateToJD(date) - 2451545.0;
}

// Sun longitude
export function getSunLon(date: Date): number {
  const d = daysFromJ2000(date);
  const L = normalizeAngle(280.46646 + 0.9856474 * d);
  const M = normalizeAngle(357.52911 + 0.9856003 * d);
  const Mr = M * Math.PI / 180;
  const C = 1.914602 * Math.sin(Mr) + 0.019993 * Math.sin(2*Mr) + 0.000289 * Math.sin(3*Mr);
  return normalizeAngle(L + C);
}

// Moon longitude (includes main perturbations)
export function getMoonLon(date: Date): number {
  const d = daysFromJ2000(date);
  const L = normalizeAngle(218.316 + 13.176396 * d);
  const M = normalizeAngle(134.963 + 13.064993 * d);
  const D = normalizeAngle(297.854 + 12.190749 * d);
  const F = normalizeAngle(93.272  + 13.229350 * d);
  const Mr = M * Math.PI/180, Dr = D * Math.PI/180, Fr = F * Math.PI/180;
  return normalizeAngle(L
    + 6.289 * Math.sin(Mr)
    - 1.274 * Math.sin(2*Dr - Mr)
    + 0.658 * Math.sin(2*Dr)
    - 0.214 * Math.sin(2*Mr)
    - 0.110 * Math.sin(Dr));
}

// Mercury
export function getMercuryLon(date: Date): number {
  const d = daysFromJ2000(date);
  const M = normalizeAngle(174.795 + 4.09233 * d);
  const Mr = M * Math.PI/180;
  return normalizeAngle(252.250 + 4.09233*d + 23.440*Math.sin(Mr) + 2.996*Math.sin(2*Mr));
}

// Venus
export function getVenusLon(date: Date): number {
  const d = daysFromJ2000(date);
  const M = normalizeAngle(50.416 + 1.60213 * d);
  const Mr = M * Math.PI/180;
  return normalizeAngle(181.979 + 1.60213*d + 0.7758*Math.sin(Mr) + 0.0033*Math.sin(2*Mr));
}

// Mars
export function getMarsLon(date: Date): number {
  const d = daysFromJ2000(date);
  const M = normalizeAngle(19.387 + 0.52403 * d);
  const Mr = M * Math.PI/180;
  return normalizeAngle(355.433 + 0.52403*d + 10.691*Math.sin(Mr) + 0.623*Math.sin(2*Mr));
}

// Jupiter
export function getJupiterLon(date: Date): number {
  const d = daysFromJ2000(date);
  const M = normalizeAngle(20.020 + 0.08309 * d);
  const Mr = M * Math.PI/180;
  return normalizeAngle(34.351 + 0.08309*d + 5.555*Math.sin(Mr) + 0.168*Math.sin(2*Mr));
}

// Saturn
export function getSaturnLon(date: Date): number {
  const d = daysFromJ2000(date);
  const M = normalizeAngle(317.021 + 0.03346 * d);
  const Mr = M * Math.PI/180;
  return normalizeAngle(50.077 + 0.03346*d + 6.406*Math.sin(Mr) + 0.169*Math.sin(2*Mr));
}

// Uranus
export function getUranusLon(date: Date): number {
  const d = daysFromJ2000(date);
  const M = normalizeAngle(142.955 + 0.01172 * d);
  const Mr = M * Math.PI/180;
  return normalizeAngle(314.055 + 0.01172*d + 5.388*Math.sin(Mr));
}

// Neptune
export function getNeptuneLon(date: Date): number {
  const d = daysFromJ2000(date);
  const M = normalizeAngle(267.769 + 0.00598 * d);
  const Mr = M * Math.PI/180;
  return normalizeAngle(304.349 + 0.00598*d + 1.778*Math.sin(Mr));
}

// Pluto (rough)
export function getPlutoLon(date: Date): number {
  const d = daysFromJ2000(date);
  return normalizeAngle(238.959 + 0.003964 * d);
}

// Mean North Node (retrograde ~18.613 yr)
export function getNorthNodeLon(date: Date): number {
  const d = daysFromJ2000(date);
  return normalizeAngle(125.0445 - 0.0529539 * d);
}

// Chiron (~50.42 yr period, position at J2000 ≈ 251°)
export function getChironLon(date: Date): number {
  const d = daysFromJ2000(date);
  return normalizeAngle(251.0 + 0.01956 * d);
}

// Black Moon Lilith / Mean Apogee (~8.85 yr)
export function getLilithLon(date: Date): number {
  const d = daysFromJ2000(date);
  return normalizeAngle(83.35 + 0.11140 * d);
}

// Ascendant — requires UTC datetime + geographic lat/lon
export function getAscendant(date: Date, latDeg: number, lonDeg: number): number {
  const d = daysFromJ2000(date);
  const GMST = normalizeAngle(100.4606 + 0.9856473 * d);
  const LST = normalizeAngle(GMST + lonDeg);
  const eps = (23.439 - 0.0000004 * d) * Math.PI / 180;
  const lat = latDeg * Math.PI / 180;
  const LSTr = LST * Math.PI / 180;
  const tanASC = Math.cos(LSTr) / (-(Math.sin(eps) * Math.tan(lat)) - Math.cos(eps) * Math.sin(LSTr));
  let ASC = Math.atan(tanASC) * 180 / Math.PI;
  if (Math.cos(LSTr) < 0) ASC += 180; else ASC += 360;
  return normalizeAngle(ASC);
}

// Midheaven (MC)
export function getMidheaven(date: Date, lonDeg: number): number {
  const d = daysFromJ2000(date);
  const GMST = normalizeAngle(100.4606 + 0.9856473 * d);
  const LST = normalizeAngle(GMST + lonDeg);
  const eps = (23.439 - 0.0000004 * d) * Math.PI / 180;
  const LSTr = LST * Math.PI / 180;
  const tanMC = Math.sin(LSTr) / (Math.cos(eps) * Math.cos(LSTr));
  let MC = Math.atan(tanMC) * 180 / Math.PI;
  if (Math.cos(LSTr) < 0) MC += 180;
  return normalizeAngle(MC);
}

// Part of Fortune: day = ASC + Moon - Sun; night = ASC + Sun - Moon
export function getPartOfFortune(asc: number, sun: number, moon: number, isDayChart: boolean): number {
  return isDayChart ? normalizeAngle(asc + moon - sun) : normalizeAngle(asc + sun - moon);
}

// Approximate Vertex (simplified — 90° from MC in E quadrant)
export function getVertex(mc: number, lat: number): number {
  const shift = lat > 0 ? 90 : -90;
  return normalizeAngle(mc + shift + 15);
}

// House number (equal house system from ASC)
export function houseNumber(planetLon: number, ascLon: number): number {
  return Math.floor(normalizeAngle(planetLon - ascLon) / 30) + 1;
}

export function isDayChart(sunLon: number, ascLon: number): boolean {
  return normalizeAngle(sunLon - ascLon) >= 180;
}

// Major world cities
export const CITIES = [
  { name: "New York, USA",              lat: 40.71, lon: -74.01 },
  { name: "Los Angeles, USA",           lat: 34.05, lon: -118.24 },
  { name: "Chicago, USA",               lat: 41.88, lon: -87.63 },
  { name: "London, UK",                 lat: 51.51, lon: -0.13 },
  { name: "Paris, France",              lat: 48.85, lon:  2.35 },
  { name: "Berlin, Germany",            lat: 52.52, lon: 13.41 },
  { name: "Rome, Italy",                lat: 41.90, lon: 12.50 },
  { name: "Madrid, Spain",              lat: 40.42, lon: -3.70 },
  { name: "Amsterdam, Netherlands",     lat: 52.37, lon:  4.90 },
  { name: "Stockholm, Sweden",          lat: 59.33, lon: 18.07 },
  { name: "Moscow, Russia",             lat: 55.75, lon: 37.62 },
  { name: "Istanbul, Turkey",           lat: 41.01, lon: 28.95 },
  { name: "Athens, Greece",             lat: 37.98, lon: 23.73 },
  { name: "Cairo, Egypt",               lat: 30.04, lon: 31.24 },
  { name: "Dubai, UAE",                 lat: 25.20, lon: 55.27 },
  { name: "Mumbai, India",              lat: 19.08, lon: 72.88 },
  { name: "Delhi, India",               lat: 28.61, lon: 77.21 },
  { name: "Kolkata, India",             lat: 22.57, lon: 88.36 },
  { name: "Bangalore, India",           lat: 12.97, lon: 77.59 },
  { name: "Beijing, China",             lat: 39.91, lon: 116.39 },
  { name: "Shanghai, China",            lat: 31.23, lon: 121.47 },
  { name: "Tokyo, Japan",               lat: 35.69, lon: 139.69 },
  { name: "Seoul, South Korea",         lat: 37.57, lon: 126.98 },
  { name: "Bangkok, Thailand",          lat: 13.75, lon: 100.52 },
  { name: "Singapore",                  lat:  1.35, lon: 103.82 },
  { name: "Jakarta, Indonesia",         lat: -6.21, lon: 106.85 },
  { name: "Sydney, Australia",          lat: -33.87, lon: 151.21 },
  { name: "Melbourne, Australia",       lat: -37.81, lon: 144.96 },
  { name: "Toronto, Canada",            lat: 43.65, lon: -79.38 },
  { name: "Vancouver, Canada",          lat: 49.25, lon: -123.12 },
  { name: "Mexico City, Mexico",        lat: 19.43, lon: -99.13 },
  { name: "São Paulo, Brazil",          lat: -23.55, lon: -46.63 },
  { name: "Buenos Aires, Argentina",    lat: -34.60, lon: -58.38 },
  { name: "Bogotá, Colombia",           lat:  4.71, lon: -74.07 },
  { name: "Lagos, Nigeria",             lat:  6.52, lon:  3.38 },
  { name: "Nairobi, Kenya",             lat: -1.29, lon: 36.82 },
  { name: "Johannesburg, South Africa", lat: -26.20, lon: 28.04 },
];
