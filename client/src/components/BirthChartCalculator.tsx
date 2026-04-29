import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RotateCcw } from "lucide-react";
import {
  SIGNS, SIGN_SYMBOLS, ELEMENTS, ELEMENT_COLORS, RULING_PLANETS, CITIES,
  getSunLon, getMoonLon, getMercuryLon, getVenusLon, getMarsLon,
  getJupiterLon, getSaturnLon, getUranusLon, getNeptuneLon, getPlutoLon,
  getAscendant, getMidheaven, houseNumber, degreesToSign
} from "@/lib/astro-utils";

type PlanetEntry = { name: string; glyph: string; lon: number; sign: string; symbol: string; house: number; color: string };

const PLANET_CONFIG = [
  { name: "Sun",     glyph: "☀", color: "#f59e0b", fn: getSunLon },
  { name: "Moon",    glyph: "☽", color: "#94a3b8", fn: getMoonLon },
  { name: "Mercury", glyph: "☿", color: "#6366f1", fn: getMercuryLon },
  { name: "Venus",   glyph: "♀", color: "#ec4899", fn: getVenusLon },
  { name: "Mars",    glyph: "♂", color: "#ef4444", fn: getMarsLon },
  { name: "Jupiter", glyph: "♃", color: "#f97316", fn: getJupiterLon },
  { name: "Saturn",  glyph: "♄", color: "#78716c", fn: getSaturnLon },
  { name: "Uranus",  glyph: "♅", color: "#22d3ee", fn: getUranusLon },
  { name: "Neptune", glyph: "♆", color: "#818cf8", fn: getNeptuneLon },
  { name: "Pluto",   glyph: "♇", color: "#a855f7", fn: getPlutoLon },
];

const ELEMENT_EMOJI: Record<string, string> = { Fire:"🔥", Earth:"🌿", Air:"💨", Water:"💧" };
const HOUSE_THEMES = ["Self & Identity","Possessions & Values","Communication","Home & Roots","Creativity & Romance","Health & Service","Partnerships","Transformation","Philosophy","Career & Status","Community","Spirituality & Healing"];

function BirthChartWheel({ planets, asc }: { planets: PlanetEntry[]; asc: number }) {
  const cx = 130, cy = 130, outerR = 120, innerR = 90, houseR = 105;
  const toXY = (lon: number, r: number) => {
    const angle = ((lon - asc + 270) % 360) * Math.PI / 180;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };
  const houseLines = Array.from({ length: 12 }, (_, i) => {
    const a = ((i * 30 - asc + 270) % 360) * Math.PI / 180;
    return { x1: cx + innerR * Math.cos(a), y1: cy + innerR * Math.sin(a), x2: cx + outerR * Math.cos(a), y2: cy + outerR * Math.sin(a) };
  });
  const signColors = ["#ef4444","#84cc16","#eab308","#3b82f6","#f97316","#22c55e","#f43f5e","#7c3aed","#f59e0b","#6b7280","#2563eb","#8b5cf6"];
  return (
    <svg viewBox="0 0 260 260" className="w-full max-w-xs mx-auto" aria-label="Birth chart wheel">
      {/* Sign ring */}
      {Array.from({ length: 12 }, (_, i) => {
        const startA = ((i * 30 - asc + 270) % 360) * Math.PI / 180;
        const endA = (((i + 1) * 30 - asc + 270) % 360) * Math.PI / 180;
        const x1 = cx + outerR * Math.cos(startA), y1 = cy + outerR * Math.sin(startA);
        const x2 = cx + outerR * Math.cos(endA), y2 = cy + outerR * Math.sin(endA);
        const mx = cx + (outerR + 8) * Math.cos((startA + endA) / 2), my = cy + (outerR + 8) * Math.sin((startA + endA) / 2);
        return (
          <g key={i}>
            <path d={`M ${x1} ${y1} A ${outerR} ${outerR} 0 0 1 ${x2} ${y2} L ${cx} ${cy}`}
              fill={signColors[i] + "22"} stroke={signColors[i]} strokeWidth="0.5" />
            <text x={mx} y={my} textAnchor="middle" dominantBaseline="middle" fontSize="7" fill={signColors[i]}>{SIGN_SYMBOLS[i]}</text>
          </g>
        );
      })}
      {/* Inner circle */}
      <circle cx={cx} cy={cy} r={innerR} fill="white" stroke="#e5e7eb" strokeWidth="1" />
      {/* House lines */}
      {houseLines.map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#d1d5db" strokeWidth={i === 0 ? 1.5 : 0.5} />
      ))}
      {/* House numbers */}
      {Array.from({ length: 12 }, (_, i) => {
        const midA = (((i + 0.5) * 30 - asc + 270) % 360) * Math.PI / 180;
        return <text key={i} x={cx + (innerR - 10) * Math.cos(midA)} y={cy + (innerR - 10) * Math.sin(midA)}
          textAnchor="middle" dominantBaseline="middle" fontSize="6" fill="#9ca3af">{i + 1}</text>;
      })}
      {/* ASC marker */}
      <text x={cx + outerR - 6} y={cy} textAnchor="middle" dominantBaseline="middle" fontSize="5" fill="#1d4ed8" fontWeight="bold">ASC</text>
      {/* Planets */}
      {planets.map((p, i) => {
        const { x, y } = toXY(p.lon, innerR - 18 - (i % 3) * 5);
        return (
          <g key={p.name}>
            <circle cx={x} cy={y} r={6} fill={p.color + "30"} stroke={p.color} strokeWidth="0.8" />
            <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="7" fill={p.color}>{p.glyph}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function BirthChartCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [city, setCity] = useState("");
  const [result, setResult] = useState<null | {
    planets: PlanetEntry[]; asc: number; ascSign: string; mc: number; mcSign: string;
    dominant: { element: string; count: number }[];
  }>(null);
  const [error, setError] = useState("");

  function calculate() {
    setError("");
    if (!birthDate || !birthTime || !city) { setError("Please fill in all fields."); return; }
    const cityData = CITIES.find(c => c.name === city);
    if (!cityData) return;
    const [h, m] = birthTime.split(":").map(Number);
    const date = new Date(`${birthDate}T${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:00Z`);
    const offset = cityData.lon / 15;
    const utcDate = new Date(date.getTime() - offset * 3600 * 1000);
    const ascLon = getAscendant(utcDate, cityData.lat, cityData.lon);
    const mcLon = getMidheaven(utcDate, cityData.lon);
    const planets: PlanetEntry[] = PLANET_CONFIG.map(pc => {
      const lon = pc.fn(utcDate);
      const { sign, symbol } = degreesToSign(lon);
      return { name: pc.name, glyph: pc.glyph, lon, sign, symbol, house: houseNumber(lon, ascLon), color: pc.color };
    });
    // Element distribution
    const elemCount: Record<string, number> = { Fire: 0, Earth: 0, Air: 0, Water: 0 };
    planets.forEach(p => { elemCount[ELEMENTS[p.sign]] = (elemCount[ELEMENTS[p.sign]] || 0) + 1; });
    const dominant = Object.entries(elemCount).sort((a, b) => b[1] - a[1]).map(([element, count]) => ({ element, count }));
    setResult({
      planets, asc: ascLon, ascSign: degreesToSign(ascLon).sign,
      mc: mcLon, mcSign: degreesToSign(mcLon).sign, dominant
    });
  }

  function reset() { setBirthDate(""); setBirthTime(""); setCity(""); setResult(null); setError(""); }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Free Birth Chart Calculator</CardTitle>
        <CardDescription>Enter your birth date, time, and nearest city to generate your personalised natal chart showing all 10 planets, the Ascendant, and Midheaven.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div><Label>Birth Date</Label><Input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} /></div>
          <div><Label>Birth Time (local)</Label><Input type="time" value={birthTime} onChange={e => setBirthTime(e.target.value)} /></div>
          <div>
            <Label>Nearest City</Label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger><SelectValue placeholder="Select city…" /></SelectTrigger>
              <SelectContent>{CITIES.map(c => <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex gap-2">
          <Button onClick={calculate}>Generate My Birth Chart</Button>
          <Button variant="outline" onClick={reset}><RotateCcw className="w-4 h-4 mr-1" />Reset</Button>
        </div>
        {result && (
          <div className="mt-4 space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <BirthChartWheel planets={result.planets} asc={result.asc} />
                <div className="mt-2 flex justify-center gap-4 text-xs">
                  <span>ASC: {SIGN_SYMBOLS[SIGNS.indexOf(result.ascSign)]} {result.ascSign}</span>
                  <span>MC: {SIGN_SYMBOLS[SIGNS.indexOf(result.mcSign)]} {result.mcSign}</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="bg-muted text-xs">
                    <th className="p-1.5 text-left">Planet</th>
                    <th className="p-1.5 text-left">Sign</th>
                    <th className="p-1.5 text-center">House</th>
                    <th className="p-1.5 text-left text-xs">Theme</th>
                  </tr></thead>
                  <tbody>
                    <tr className="border-b bg-blue-50">
                      <td className="p-1.5 font-medium text-blue-700">⬆ Rising</td>
                      <td className="p-1.5">{SIGN_SYMBOLS[SIGNS.indexOf(result.ascSign)]} {result.ascSign}</td>
                      <td className="p-1.5 text-center">1st</td>
                      <td className="p-1.5 text-xs text-muted-foreground">Outer self</td>
                    </tr>
                    {result.planets.map((p, i) => (
                      <tr key={p.name} className={`border-b ${i % 2 === 0 ? "" : "bg-gray-50"}`}>
                        <td className="p-1.5 font-medium" style={{ color: p.color }}>{p.glyph} {p.name}</td>
                        <td className="p-1.5">{p.symbol} {p.sign}</td>
                        <td className="p-1.5 text-center">{p.house}</td>
                        <td className="p-1.5 text-xs text-muted-foreground">{HOUSE_THEMES[p.house - 1]}</td>
                      </tr>
                    ))}
                    <tr className="bg-green-50">
                      <td className="p-1.5 font-medium text-green-700">MC</td>
                      <td className="p-1.5">{SIGN_SYMBOLS[SIGNS.indexOf(result.mcSign)]} {result.mcSign}</td>
                      <td className="p-1.5 text-center">10th</td>
                      <td className="p-1.5 text-xs text-muted-foreground">Career & Status</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* Element distribution */}
            <div>
              <p className="text-sm font-semibold mb-2">Elemental Balance</p>
              <div className="grid grid-cols-4 gap-2">
                {result.dominant.map(({ element, count }) => (
                  <div key={element} className="rounded-md border p-2 text-center" style={{ borderColor: ELEMENT_COLORS[element] }}>
                    <div className="text-lg">{ELEMENT_EMOJI[element]}</div>
                    <div className="text-xs font-semibold" style={{ color: ELEMENT_COLORS[element] }}>{element}</div>
                    <div className="text-lg font-bold">{count}</div>
                    <div className="text-xs text-muted-foreground">planets</div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">* Positions use mean orbital elements. For precise chart reading, consult a professional astrologer or a Swiss Ephemeris tool.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
