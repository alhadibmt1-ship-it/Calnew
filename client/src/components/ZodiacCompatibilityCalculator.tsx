import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, Heart } from "lucide-react";

const SIGNS = [
  { name: "Aries", symbol: "♈", element: "Fire", quality: "Cardinal", color: "#ef4444" },
  { name: "Taurus", symbol: "♉", element: "Earth", quality: "Fixed", color: "#22c55e" },
  { name: "Gemini", symbol: "♊", element: "Air", quality: "Mutable", color: "#eab308" },
  { name: "Cancer", symbol: "♋", element: "Water", quality: "Cardinal", color: "#06b6d4" },
  { name: "Leo", symbol: "♌", element: "Fire", quality: "Fixed", color: "#f97316" },
  { name: "Virgo", symbol: "♍", element: "Earth", quality: "Mutable", color: "#84cc16" },
  { name: "Libra", symbol: "♎", element: "Air", quality: "Cardinal", color: "#f43f5e" },
  { name: "Scorpio", symbol: "♏", element: "Water", quality: "Fixed", color: "#7c3aed" },
  { name: "Sagittarius", symbol: "♐", element: "Fire", quality: "Mutable", color: "#f97316" },
  { name: "Capricorn", symbol: "♑", element: "Earth", quality: "Cardinal", color: "#6b7280" },
  { name: "Aquarius", symbol: "♒", element: "Air", quality: "Fixed", color: "#3b82f6" },
  { name: "Pisces", symbol: "♓", element: "Water", quality: "Mutable", color: "#8b5cf6" },
];

// Compatibility matrix [score 0-100, description]
const COMPAT: Record<string, Record<string, { score: number; summary: string; love: string; friendship: string; challenge: string }>> = {
  "Aries": {
    "Aries": { score: 75, summary: "Two fiery rams — intense and passionate, though butting heads is common.", love: "High passion, adventurous romance", friendship: "Fun competitive bond", challenge: "Power struggles and ego clashes" },
    "Taurus": { score: 55, summary: "Fire meets Earth — exciting at first but fundamental differences surface over time.", love: "Attraction is there, but clashes on pace of life", friendship: "Can work with mutual respect", challenge: "Taurus is too slow for Aries" },
    "Gemini": { score: 80, summary: "Fire and Air feed each other — lively, exciting, and never boring.", love: "Adventurous and playful romance", friendship: "Best buddies who are always laughing", challenge: "Both can be inconsistent" },
    "Cancer": { score: 50, summary: "Fire and Water — Cancer's sensitivity clashes with Aries' bluntness.", love: "Tender moments exist but wounds happen", friendship: "Challenging; Cancer needs gentleness", challenge: "Aries hurts Cancer without realizing" },
    "Leo": { score: 88, summary: "Two Fire signs — magnetic, electric, and naturally drawn to each other.", love: "Grand romance with fireworks", friendship: "Loyal and enthusiastic allies", challenge: "Both need to be the star" },
    "Virgo": { score: 45, summary: "Fire and Earth — Aries is impulsive; Virgo is analytical. Hard work required.", love: "Opposite approaches to life create friction", friendship: "Mutual respect possible with effort", challenge: "Pace and priorities differ drastically" },
    "Libra": { score: 70, summary: "Opposites attract — dynamic tension and balance between action and harmony.", love: "Romantic chemistry with ongoing negotiation", friendship: "Good, if they compromise", challenge: "Aries rushes; Libra deliberates" },
    "Scorpio": { score: 65, summary: "Intense magnetic pull, but both are strong-willed and possessive.", love: "Deeply passionate but volatile", friendship: "Powerful bond or intense rivalry", challenge: "Control issues on both sides" },
    "Sagittarius": { score: 90, summary: "Two Fire signs who love adventure — a dynamic, enthusiastic match!", love: "Free-spirited romance full of excitement", friendship: "Best adventure partners", challenge: "Commitment can feel like a cage" },
    "Capricorn": { score: 48, summary: "Both cardinal but very different — Aries leaps, Capricorn plans.", love: "Respect but different life tempos", friendship: "Works if roles are clear", challenge: "Aries finds Capricorn too rigid" },
    "Aquarius": { score: 78, summary: "Fire and Air — innovative, free-thinking, and mutually inspiring.", love: "Exciting, unconventional romance", friendship: "Great intellectual companions", challenge: "Both can be self-centered" },
    "Pisces": { score: 55, summary: "Fire and Water — Aries can be too harsh for dreamy Pisces.", love: "Sweet moments, but Aries dominates", friendship: "Works if Aries is protective", challenge: "Communication styles clash" },
  },
};

// Fill in symmetric pairs
const SIGN_NAMES = SIGNS.map(s => s.name);

function getCompat(a: string, b: string) {
  if (COMPAT[a]?.[b]) return COMPAT[a][b];
  if (COMPAT[b]?.[a]) return COMPAT[b][a];
  // Fallback based on elements
  const signA = SIGNS.find(s => s.name === a)!;
  const signB = SIGNS.find(s => s.name === b)!;
  const elementPairs: Record<string, Record<string, number>> = {
    Fire: { Fire: 80, Air: 78, Earth: 52, Water: 50 },
    Earth: { Earth: 82, Water: 78, Fire: 52, Air: 55 },
    Air: { Air: 80, Fire: 78, Water: 52, Earth: 55 },
    Water: { Water: 82, Earth: 78, Fire: 50, Air: 52 },
  };
  const score = elementPairs[signA.element]?.[signB.element] ?? 60;
  const summaries: Record<number, { summary: string; love: string; friendship: string; challenge: string }> = {
    82: { summary: "Same element — deep intuitive understanding and natural harmony.", love: "Nurturing and emotionally in sync", friendship: "Comfortable, loyal bond", challenge: "Can get stuck in comfort zones" },
    80: { summary: "Same energy — vibrant, exciting, and mutually motivating.", love: "Passionate and adventurous", friendship: "Energetic and fun companions", challenge: "Competition can arise" },
    78: { summary: "Complementary elements — you energize and support each other.", love: "Balanced and harmonious romance", friendship: "Strong mutual support", challenge: "Occasional misunderstandings" },
    55: { summary: "Different but workable — effort and communication bridge the gap.", love: "Growth through differences", friendship: "Can thrive with mutual respect", challenge: "Different approaches to life" },
    52: { summary: "Challenging combination — significant differences need constant navigation.", love: "Attraction exists but friction is common", friendship: "Requires patience from both", challenge: "Fundamentally different needs" },
    50: { summary: "Opposite energies — either magnetic attraction or constant conflict.", love: "Intense chemistry with tough moments", friendship: "Works with clear boundaries", challenge: "Core values can clash" },
  };
  const closest = Object.keys(summaries).reduce((prev, curr) => Math.abs(parseInt(curr) - score) < Math.abs(parseInt(prev) - score) ? curr : prev);
  return { score, ...summaries[parseInt(closest)] };
}

function ScoreBar({ score }: { score: number }) {
  const color = score >= 80 ? "#22c55e" : score >= 65 ? "#eab308" : score >= 50 ? "#f97316" : "#ef4444";
  const label = score >= 80 ? "Excellent" : score >= 65 ? "Good" : score >= 50 ? "Fair" : "Challenging";
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold" style={{ color }}>{label} — {score}%</span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${score}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

export default function ZodiacCompatibilityCalculator() {
  const [sign1, setSign1] = useState("");
  const [sign2, setSign2] = useState("");
  const [result, setResult] = useState<ReturnType<typeof getCompat> | null>(null);

  const calculate = () => {
    if (!sign1 || !sign2) return;
    setResult(getCompat(sign1, sign2));
  };

  const reset = () => { setSign1(""); setSign2(""); setResult(null); };

  const s1 = SIGNS.find(s => s.name === sign1);
  const s2 = SIGNS.find(s => s.name === sign2);

  return (
    <Card className="w-full border-t-4 border-t-pink-500">
      <CardHeader>
        <CardTitle>Zodiac Compatibility Calculator</CardTitle>
        <CardDescription>Select two zodiac signs to see their love, friendship, and overall compatibility based on astrology.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[{ label: "Your Sign", value: sign1, set: setSign1 }, { label: "Partner's Sign", value: sign2, set: setSign2 }].map(({ label, value, set }) => (
            <div key={label} className="space-y-2">
              <p className="text-sm font-medium text-gray-700">{label}</p>
              <div className="grid grid-cols-4 gap-1.5">
                {SIGNS.map(s => (
                  <button key={s.name} onClick={() => set(s.name)}
                    className="flex flex-col items-center p-1.5 rounded-lg border transition-all hover:scale-105"
                    style={{
                      borderColor: value === s.name ? s.color : "#e5e7eb",
                      background: value === s.name ? `${s.color}15` : "white",
                    }}>
                    <span className="text-lg">{s.symbol}</span>
                    <span className="text-xs text-gray-600 mt-0.5 leading-tight">{s.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate} disabled={!sign1 || !sign2} className="flex items-center gap-2">
            <Heart className="h-4 w-4" /> Check Compatibility
          </Button>
          <Button variant="ghost" size="sm" onClick={reset} className="flex items-center gap-1.5">
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </Button>
        </div>

        {result && s1 && s2 && (
          <div className="rounded-xl border border-pink-200 bg-gradient-to-br from-pink-50 to-white p-5 space-y-4">
            <div className="flex items-center justify-center gap-4">
              <div className="text-center">
                <span className="text-4xl">{s1.symbol}</span>
                <p className="text-sm font-medium mt-1" style={{ color: s1.color }}>{s1.name}</p>
              </div>
              <Heart className="h-8 w-8 text-pink-400 fill-pink-200" />
              <div className="text-center">
                <span className="text-4xl">{s2.symbol}</span>
                <p className="text-sm font-medium mt-1" style={{ color: s2.color }}>{s2.name}</p>
              </div>
            </div>

            <ScoreBar score={result.score} />
            <p className="text-sm text-gray-600 italic">{result.summary}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div className="rounded-lg bg-white p-3 border border-green-100">
                <p className="text-xs font-semibold text-green-700 uppercase mb-1">❤️ Love</p>
                <p className="text-gray-600 text-xs">{result.love}</p>
              </div>
              <div className="rounded-lg bg-white p-3 border border-blue-100">
                <p className="text-xs font-semibold text-blue-700 uppercase mb-1">🤝 Friendship</p>
                <p className="text-gray-600 text-xs">{result.friendship}</p>
              </div>
              <div className="rounded-lg bg-white p-3 border border-orange-100">
                <p className="text-xs font-semibold text-orange-700 uppercase mb-1">⚡ Challenge</p>
                <p className="text-gray-600 text-xs">{result.challenge}</p>
              </div>
            </div>
          </div>
        )}

        {(!sign1 || !sign2) && !result && (
          <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-400">
            Select two signs above to reveal your compatibility.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
