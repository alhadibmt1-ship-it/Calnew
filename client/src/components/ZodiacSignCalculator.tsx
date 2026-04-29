import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RotateCcw } from "lucide-react";

const SIGNS = [
  { name: "Capricorn", symbol: "♑", dates: "Dec 22 – Jan 19", element: "Earth", ruling: "Saturn", traits: "Disciplined, ambitious, patient, practical, and responsible. Natural leaders with strong work ethics.", color: "#6b7280" },
  { name: "Aquarius", symbol: "♒", dates: "Jan 20 – Feb 18", element: "Air", ruling: "Uranus", traits: "Innovative, independent, humanitarian, intellectual, and original. Forward-thinking visionaries.", color: "#3b82f6" },
  { name: "Pisces", symbol: "♓", dates: "Feb 19 – Mar 20", element: "Water", ruling: "Neptune", traits: "Compassionate, artistic, intuitive, gentle, and wise. Deeply empathetic dreamers.", color: "#8b5cf6" },
  { name: "Aries", symbol: "♈", dates: "Mar 21 – Apr 19", element: "Fire", ruling: "Mars", traits: "Bold, ambitious, energetic, enthusiastic, and confident. Natural-born leaders who dive headfirst into challenges.", color: "#ef4444" },
  { name: "Taurus", symbol: "♉", dates: "Apr 20 – May 20", element: "Earth", ruling: "Venus", traits: "Reliable, patient, practical, devoted, and responsible. Lovers of beauty, comfort, and stability.", color: "#22c55e" },
  { name: "Gemini", symbol: "♊", dates: "May 21 – Jun 20", element: "Air", ruling: "Mercury", traits: "Adaptable, outgoing, intelligent, curious, and expressive. Quick-witted communicators with dual nature.", color: "#eab308" },
  { name: "Cancer", symbol: "♋", dates: "Jun 21 – Jul 22", element: "Water", ruling: "Moon", traits: "Tenacious, imaginative, loyal, emotional, and sympathetic. Deeply intuitive and sentimental.", color: "#06b6d4" },
  { name: "Leo", symbol: "♌", dates: "Jul 23 – Aug 22", element: "Fire", ruling: "Sun", traits: "Creative, passionate, generous, warm-hearted, and cheerful. Natural performers who love the spotlight.", color: "#f97316" },
  { name: "Virgo", symbol: "♍", dates: "Aug 23 – Sep 22", element: "Earth", ruling: "Mercury", traits: "Loyal, analytical, kind, hardworking, and practical. Detail-oriented perfectionists who love helping others.", color: "#84cc16" },
  { name: "Libra", symbol: "♎", dates: "Sep 23 – Oct 22", element: "Air", ruling: "Venus", traits: "Diplomatic, gracious, fair-minded, social, and cooperative. Natural peacemakers who seek balance and harmony.", color: "#f43f5e" },
  { name: "Scorpio", symbol: "♏", dates: "Oct 23 – Nov 21", element: "Water", ruling: "Pluto", traits: "Resourceful, brave, passionate, stubborn, and a true friend. Mysterious and intensely focused.", color: "#7c3aed" },
  { name: "Sagittarius", symbol: "♐", dates: "Nov 22 – Dec 21", element: "Fire", ruling: "Jupiter", traits: "Generous, idealistic, great sense of humor, and adventurous. Philosophical explorers who love freedom.", color: "#f97316" },
];

const ELEMENT_COLORS: Record<string, string> = {
  Fire: "#ef4444", Earth: "#84cc16", Air: "#3b82f6", Water: "#06b6d4",
};

function getZodiac(month: number, day: number) {
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return SIGNS[0];
  if (month === 1 && day >= 20) return SIGNS[1];
  if (month === 2 && day >= 19) return SIGNS[2];
  if (month === 3 && day >= 21) return SIGNS[3];
  if (month === 4 && day >= 20) return SIGNS[4];
  if (month === 5 && day >= 21) return SIGNS[5];
  if (month === 6 && day >= 21) return SIGNS[6];
  if (month === 7 && day >= 23) return SIGNS[7];
  if (month === 8 && day >= 23) return SIGNS[8];
  if (month === 9 && day >= 23) return SIGNS[9];
  if (month === 10 && day >= 23) return SIGNS[10];
  if (month === 11 && day >= 22) return SIGNS[11];
  // Fallbacks
  if (month === 2) return SIGNS[2];
  if (month === 3) return SIGNS[2];
  if (month === 4) return SIGNS[3];
  if (month === 5) return SIGNS[4];
  if (month === 6) return SIGNS[5];
  if (month === 7) return SIGNS[6];
  if (month === 8) return SIGNS[7];
  if (month === 9) return SIGNS[8];
  if (month === 10) return SIGNS[9];
  if (month === 11) return SIGNS[10];
  return SIGNS[0];
}

const COMPATIBLE: Record<string, string[]> = {
  "Aries": ["Leo", "Sagittarius", "Gemini", "Aquarius"],
  "Taurus": ["Virgo", "Capricorn", "Cancer", "Pisces"],
  "Gemini": ["Libra", "Aquarius", "Aries", "Leo"],
  "Cancer": ["Scorpio", "Pisces", "Taurus", "Virgo"],
  "Leo": ["Aries", "Sagittarius", "Gemini", "Libra"],
  "Virgo": ["Taurus", "Capricorn", "Cancer", "Scorpio"],
  "Libra": ["Gemini", "Aquarius", "Leo", "Sagittarius"],
  "Scorpio": ["Cancer", "Pisces", "Virgo", "Capricorn"],
  "Sagittarius": ["Aries", "Leo", "Libra", "Aquarius"],
  "Capricorn": ["Taurus", "Virgo", "Scorpio", "Pisces"],
  "Aquarius": ["Gemini", "Libra", "Aries", "Sagittarius"],
  "Pisces": ["Cancer", "Scorpio", "Taurus", "Capricorn"],
};

export default function ZodiacSignCalculator() {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [result, setResult] = useState<typeof SIGNS[0] | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    const m = parseInt(month), d = parseInt(day);
    if (!m || !d || m < 1 || m > 12 || d < 1 || d > 31) {
      setError("Please enter a valid month (1–12) and day."); return;
    }
    setError("");
    setResult(getZodiac(m, d));
  };

  const reset = () => { setMonth(""); setDay(""); setResult(null); setError(""); };

  return (
    <Card className="w-full border-t-4" style={{ borderTopColor: "#f97316" }}>
      <CardHeader>
        <CardTitle>Zodiac Sign Calculator</CardTitle>
        <CardDescription>Enter your birth date to discover your Sun sign, element, ruling planet, and personality traits.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4 max-w-sm">
          <div className="space-y-1.5">
            <Label>Month (1–12)</Label>
            <Input placeholder="e.g. 3" value={month} onChange={e => setMonth(e.target.value)} type="number" min="1" max="12" />
          </div>
          <div className="space-y-1.5">
            <Label>Day (1–31)</Label>
            <Input placeholder="e.g. 15" value={day} onChange={e => setDay(e.target.value)} type="number" min="1" max="31" />
          </div>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex gap-2">
          <Button onClick={calculate}>Find My Sign</Button>
          <Button variant="ghost" size="sm" onClick={reset} className="flex items-center gap-1.5">
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </Button>
        </div>

        {result && (
          <div className="rounded-xl border p-6 space-y-4" style={{ borderColor: result.color, background: `${result.color}10` }}>
            <div className="flex items-center gap-4">
              <span className="text-6xl">{result.symbol}</span>
              <div>
                <h3 className="text-2xl font-bold" style={{ color: result.color }}>{result.name}</h3>
                <p className="text-sm text-gray-500">{result.dates}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-white/70 p-3">
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">Element</p>
                <p className="font-semibold mt-1" style={{ color: ELEMENT_COLORS[result.element] }}>🔥 {result.element}</p>
              </div>
              <div className="rounded-lg bg-white/70 p-3">
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">Ruling Planet</p>
                <p className="font-semibold mt-1">🪐 {result.ruling}</p>
              </div>
            </div>
            <div className="rounded-lg bg-white/70 p-3 text-sm">
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">Personality Traits</p>
              <p className="text-gray-700">{result.traits}</p>
            </div>
            <div className="rounded-lg bg-white/70 p-3 text-sm">
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-2">Most Compatible With</p>
              <div className="flex flex-wrap gap-2">
                {COMPATIBLE[result.name]?.map(s => {
                  const sign = SIGNS.find(x => x.name === s);
                  return (
                    <span key={s} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-white border" style={{ borderColor: sign?.color, color: sign?.color }}>
                      {sign?.symbol} {s}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {SIGNS.map(s => (
            <button key={s.name} onClick={() => { setResult(s); setError(""); }}
              className="flex flex-col items-center p-2 rounded-lg border hover:border-gray-400 transition-colors text-center cursor-pointer"
              style={{ borderColor: result?.name === s.name ? s.color : undefined, background: result?.name === s.name ? `${s.color}10` : undefined }}>
              <span className="text-2xl">{s.symbol}</span>
              <span className="text-xs mt-1 text-gray-600">{s.name}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
