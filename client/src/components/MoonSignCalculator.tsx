import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RotateCcw } from "lucide-react";

const MOON_SIGNS = [
  { name: "Aries Moon", symbol: "♈", emoji: "🔥", element: "Fire", color: "#ef4444",
    traits: "Emotionally impulsive and direct. You feel things intensely and need action to process emotions. Quick to react but equally quick to forgive.",
    needs: "Freedom, spontaneity, new experiences", shadow: "Impatience and emotional outbursts" },
  { name: "Taurus Moon", symbol: "♉", emoji: "🌿", element: "Earth", color: "#22c55e",
    traits: "Emotionally stable and comfort-seeking. You need security and consistency in your emotional life. Sensory pleasures ground you.",
    needs: "Stability, comfort, physical security", shadow: "Stubbornness and resistance to change" },
  { name: "Gemini Moon", symbol: "♊", emoji: "💨", element: "Air", color: "#eab308",
    traits: "Emotionally curious and communicative. You process feelings through conversation and need mental stimulation. Moods shift quickly.",
    needs: "Variety, communication, intellectual engagement", shadow: "Emotional inconsistency and overthinking" },
  { name: "Cancer Moon", symbol: "♋", emoji: "🌊", element: "Water", color: "#06b6d4",
    traits: "Deeply nurturing and intuitive. You feel emotions profoundly and need a safe, loving home base. Highly empathetic and protective.",
    needs: "Emotional security, family connection, nurturing", shadow: "Moodiness and over-attachment" },
  { name: "Leo Moon", symbol: "♌", emoji: "✨", element: "Fire", color: "#f97316",
    traits: "Emotionally generous and expressive. You need appreciation and shine brightest when loved and admired. Warm-hearted and dramatic.",
    needs: "Recognition, warmth, creative expression", shadow: "Pride and need for validation" },
  { name: "Virgo Moon", symbol: "♍", emoji: "🌱", element: "Earth", color: "#84cc16",
    traits: "Emotionally analytical and helpful. You process feelings through practical action and find comfort in order and routine.",
    needs: "Order, usefulness, clean environments", shadow: "Over-criticism of self and others" },
  { name: "Libra Moon", symbol: "♎", emoji: "⚖️", element: "Air", color: "#f43f5e",
    traits: "Emotionally harmonious and relationship-focused. You feel best when everything is balanced and peaceful. You dislike conflict.",
    needs: "Harmony, partnership, beauty", shadow: "Indecisiveness and people-pleasing" },
  { name: "Scorpio Moon", symbol: "♏", emoji: "🌑", element: "Water", color: "#7c3aed",
    traits: "Emotionally intense and transformative. Your feelings run extremely deep. You need total trust before opening up emotionally.",
    needs: "Depth, privacy, emotional truth", shadow: "Jealousy, possessiveness, emotional control" },
  { name: "Sagittarius Moon", symbol: "♐", emoji: "🏹", element: "Fire", color: "#f59e0b",
    traits: "Emotionally adventurous and philosophical. You need freedom and find comfort in exploration, travel, and big ideas.",
    needs: "Freedom, adventure, meaning", shadow: "Emotional restlessness, commitment-phobia" },
  { name: "Capricorn Moon", symbol: "♑", emoji: "🏔️", element: "Earth", color: "#6b7280",
    traits: "Emotionally reserved and achievement-oriented. You control your feelings and need to feel productive. You feel emotions deeply but privately.",
    needs: "Structure, achievement, respect", shadow: "Emotional repression, coldness" },
  { name: "Aquarius Moon", symbol: "♒", emoji: "⚡", element: "Air", color: "#3b82f6",
    traits: "Emotionally detached and humanitarian. You need intellectual freedom and connect with humanity at large. Emotions are processed rationally.",
    needs: "Independence, community, originality", shadow: "Emotional detachment, aloofness" },
  { name: "Pisces Moon", symbol: "♓", emoji: "🌊", element: "Water", color: "#8b5cf6",
    traits: "Emotionally empathetic and dreamy. You are highly intuitive and absorb the feelings of those around you. You need creative and spiritual outlets.",
    needs: "Creative expression, spiritual connection, solitude", shadow: "Escapism, over-sensitivity, confusion" },
];

// Approximate Moon Sign calculation
// Moon cycle: 27.32158 days to complete zodiac (360°)
// Reference: Jan 1, 2000 00:00 UTC — Moon at ~Scorpio 3° (approx 213°)
const REF_DATE = new Date(Date.UTC(2000, 0, 1));
const MOON_CYCLE_DAYS = 27.32158;
const REF_MOON_DEG = 213;

function getMoonSign(date: Date): typeof MOON_SIGNS[0] {
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysDiff = (date.getTime() - REF_DATE.getTime()) / msPerDay;
  const deg = ((REF_MOON_DEG + (daysDiff / MOON_CYCLE_DAYS) * 360) % 360 + 360) % 360;
  const idx = Math.floor(deg / 30);
  return MOON_SIGNS[idx];
}

export default function MoonSignCalculator() {
  const [date, setDate] = useState("");
  const [result, setResult] = useState<typeof MOON_SIGNS[0] | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    if (!date) { setError("Please enter your birth date."); return; }
    const d = new Date(date);
    if (isNaN(d.getTime())) { setError("Invalid date."); return; }
    setError("");
    setResult(getMoonSign(d));
  };

  const reset = () => { setDate(""); setResult(null); setError(""); };

  return (
    <Card className="w-full border-t-4 border-t-indigo-500">
      <CardHeader>
        <CardTitle>Moon Sign Calculator</CardTitle>
        <CardDescription>Your Moon sign reveals your inner emotional world — how you feel, react, and what you need to feel secure.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-1.5 max-w-xs">
          <Label>Your Birth Date</Label>
          <Input type="date" value={date} onChange={e => setDate(e.target.value)} max={new Date().toISOString().split("T")[0]} />
          <p className="text-xs text-gray-400">Note: This is an approximation. For the most precise result, an exact birth time and location is needed.</p>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex gap-2">
          <Button onClick={calculate}>Find My Moon Sign</Button>
          <Button variant="ghost" size="sm" onClick={reset} className="flex items-center gap-1.5">
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </Button>
        </div>

        {result && (
          <div className="rounded-xl border p-6 space-y-4" style={{ borderColor: result.color, background: `${result.color}10` }}>
            <div className="flex items-center gap-4">
              <span className="text-5xl">{result.emoji}</span>
              <div>
                <h3 className="text-2xl font-bold" style={{ color: result.color }}>{result.name}</h3>
                <p className="text-sm text-gray-500">{result.element} Element</p>
              </div>
            </div>
            <div className="rounded-lg bg-white/70 p-3 text-sm">
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">Your Emotional Nature</p>
              <p className="text-gray-700">{result.traits}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-white/70 p-3">
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">🌟 Emotional Needs</p>
                <p className="text-gray-700">{result.needs}</p>
              </div>
              <div className="rounded-lg bg-white/70 p-3">
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">⚠️ Shadow Side</p>
                <p className="text-gray-700">{result.shadow}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
