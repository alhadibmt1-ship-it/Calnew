import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RotateCcw } from "lucide-react";

// Pythagorean numerology chart
const CHART: Record<string, number> = {
  A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,I:9,
  J:1,K:2,L:3,M:4,N:5,O:6,P:7,Q:8,R:9,
  S:1,T:2,U:3,V:4,W:5,X:6,Y:7,Z:8,
};

const MEANINGS: Record<number, { title: string; color: string; meaning: string; positive: string; negative: string }> = {
  1: { title: "The Pioneer", color: "#ef4444", meaning: "Your name vibrates with leadership, independence, and originality. You are driven, assertive, and born to forge your own path.", positive: "Courageous, independent, creative", negative: "Stubborn, self-centered" },
  2: { title: "The Diplomat", color: "#3b82f6", meaning: "Sensitivity, cooperation, and harmony define your name energy. You excel at bringing people together and creating peace.", positive: "Empathetic, patient, cooperative", negative: "Over-sensitive, indecisive" },
  3: { title: "The Creative", color: "#f97316", meaning: "Joy, creativity, and self-expression radiate from your name. You are naturally charismatic and inspire others with your words.", positive: "Expressive, social, optimistic", negative: "Scattered, superficial" },
  4: { title: "The Organizer", color: "#84cc16", meaning: "Stability, discipline, and hard work are embedded in your name. You are the backbone of any project — reliable and thorough.", positive: "Disciplined, reliable, honest", negative: "Rigid, overly critical" },
  5: { title: "The Free Spirit", color: "#eab308", meaning: "Freedom, adventure, and versatility fill your name. You are magnetic, progressive, and thrive on variety and change.", positive: "Adaptable, resourceful, energetic", negative: "Restless, irresponsible" },
  6: { title: "The Caregiver", color: "#ec4899", meaning: "Love, nurturing, and responsibility are woven into your name. You are deeply caring and devoted to family and community.", positive: "Loving, responsible, supportive", negative: "Perfectionist, controlling" },
  7: { title: "The Mystic", color: "#7c3aed", meaning: "Wisdom, intuition, and spiritual depth characterize your name. You are a seeker of truth and understanding at the deepest level.", positive: "Analytical, intuitive, wise", negative: "Withdrawn, secretive" },
  8: { title: "The Achiever", color: "#6b7280", meaning: "Power, ambition, and material success pulse through your name. You are built for business and leadership at the highest level.", positive: "Ambitious, confident, capable", negative: "Materialistic, controlling" },
  9: { title: "The Humanitarian", color: "#10b981", meaning: "Compassion, idealism, and universal love define your name energy. You are here to serve and elevate all of humanity.", positive: "Generous, compassionate, wise", negative: "Emotionally volatile, resentful" },
  11: { title: "Master Visionary (11)", color: "#a855f7", meaning: "Master number 11 brings heightened intuition, spiritual insight, and visionary power. Your name carries an elevated mission.", positive: "Intuitive, inspiring, spiritual", negative: "Anxious, impractical" },
  22: { title: "Master Builder (22)", color: "#f59e0b", meaning: "Master number 22 is the number of the master builder — capable of manifesting grand visions into reality.", positive: "Visionary, disciplined, powerful", negative: "Overwhelming pressure, perfectionism" },
  33: { title: "Master Teacher (33)", color: "#06b6d4", meaning: "Master number 33 carries the vibration of pure compassion and enlightenment — the rarest and most spiritually powerful.", positive: "Compassionate, healing, inspiring", negative: "Self-sacrifice, martyrdom" },
};

function reduce(n: number): number {
  if (n <= 9 || n === 11 || n === 22 || n === 33) return n;
  const s = String(n).split("").reduce((a, b) => a + parseInt(b), 0);
  return reduce(s);
}

function calcName(name: string): { number: number; breakdown: { char: string; value: number }[] } {
  const clean = name.toUpperCase().replace(/[^A-Z]/g, "");
  const breakdown = clean.split("").map(c => ({ char: c, value: CHART[c] || 0 }));
  const total = breakdown.reduce((a, b) => a + b.value, 0);
  return { number: reduce(total), breakdown };
}

export default function NameNumerologyCalculator() {
  const [name, setName] = useState("");
  const [result, setResult] = useState<{ number: number; breakdown: { char: string; value: number }[] } | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    if (!name.trim()) { setError("Please enter a name."); return; }
    if (!/[a-zA-Z]/.test(name)) { setError("Name must contain at least one letter."); return; }
    setError("");
    setResult(calcName(name));
  };

  const reset = () => { setName(""); setResult(null); setError(""); };

  const meaning = result ? MEANINGS[result.number] : null;

  return (
    <Card className="w-full border-t-4 border-t-amber-500">
      <CardHeader>
        <CardTitle>Name Numerology Calculator</CardTitle>
        <CardDescription>Discover the hidden energy behind your name using the Pythagorean numerology system. Each letter carries a unique vibration.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-1.5 max-w-sm">
          <Label>Your Full Name (or first name)</Label>
          <Input placeholder="e.g. John Smith" value={name} onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === "Enter" && calculate()} />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate Name Number</Button>
          <Button variant="ghost" size="sm" onClick={reset} className="flex items-center gap-1.5">
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </Button>
        </div>

        {result && meaning && (
          <div className="space-y-4">
            <div className="rounded-xl border p-5 space-y-3" style={{ borderColor: meaning.color, background: `${meaning.color}10` }}>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Name Number (Expression Number)</p>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-black" style={{ color: meaning.color }}>{result.number}</span>
                <span className="text-xl font-bold text-gray-700">{meaning.title}</span>
              </div>
              <p className="text-sm text-gray-600">{meaning.meaning}</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg bg-white/80 p-2.5">
                  <p className="text-gray-500 font-semibold mb-0.5">Positive</p>
                  <p className="text-gray-700">{meaning.positive}</p>
                </div>
                <div className="rounded-lg bg-white/80 p-2.5">
                  <p className="text-gray-500 font-semibold mb-0.5">Negative</p>
                  <p className="text-gray-700">{meaning.negative}</p>
                </div>
              </div>
            </div>

            <details className="rounded-lg border border-gray-200 overflow-hidden">
              <summary className="cursor-pointer px-4 py-3 bg-gray-50 text-sm font-semibold text-gray-700 hover:bg-gray-100 list-none">Letter Breakdown (Pythagorean Chart)</summary>
              <div className="px-4 py-3 border-t border-gray-100">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {result.breakdown.map((b, i) => (
                    <div key={i} className="flex flex-col items-center bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-2 min-w-[36px]">
                      <span className="font-bold text-sm" style={{ color: meaning.color }}>{b.char}</span>
                      <span className="text-xs text-gray-500">{b.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">Sum: {result.breakdown.reduce((a, b) => a + b.value, 0)} → Final: <strong style={{ color: meaning.color }}>{result.number}</strong></p>
              </div>
            </details>

            <div className="rounded-lg border border-gray-200 p-4 text-xs">
              <p className="font-semibold text-gray-600 mb-2">Pythagorean Chart Reference</p>
              <div className="grid grid-cols-9 gap-1 text-center">
                {[1,2,3,4,5,6,7,8,9].map(n => (
                  <div key={n}>
                    <div className="font-bold text-gray-700 border-b border-gray-200 pb-0.5 mb-0.5">{n}</div>
                    {Object.entries(CHART).filter(([,v]) => v === n).map(([k]) => <div key={k} className="text-gray-500">{k}</div>)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
