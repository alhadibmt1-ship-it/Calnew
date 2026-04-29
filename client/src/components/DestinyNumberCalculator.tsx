import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RotateCcw } from "lucide-react";

const CHART: Record<string, number> = {
  A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,I:9,
  J:1,K:2,L:3,M:4,N:5,O:6,P:7,Q:8,R:9,
  S:1,T:2,U:3,V:4,W:5,X:6,Y:7,Z:8,
};

const DESTINY: Record<number, { title: string; color: string; purpose: string; gifts: string; path: string; affirmation: string }> = {
  1: { title: "Destiny of Leadership", color: "#ef4444", purpose: "You are destined to lead, initiate, and create. Your path calls you to be bold and independent — a pioneer who inspires others.", gifts: "Courage, initiative, originality", path: "Found in positions of authority and new ventures", affirmation: "I lead with confidence and create my own destiny." },
  2: { title: "Destiny of Partnership", color: "#3b82f6", purpose: "Your destiny is to bring peace, cooperation, and healing to relationships. You are a natural mediator whose purpose is found in connection.", gifts: "Empathy, diplomacy, sensitivity", path: "Found in counseling, healing arts, and teamwork", affirmation: "I create harmony and healing through love and understanding." },
  3: { title: "Destiny of Expression", color: "#f97316", purpose: "You are destined to inspire, entertain, and uplift through creative self-expression. The world needs your voice, art, and joy.", gifts: "Creativity, charisma, optimism", path: "Found through arts, writing, speaking, and teaching", affirmation: "I express my truth beautifully and inspire the world." },
  4: { title: "Destiny of Foundation", color: "#84cc16", purpose: "Your destiny is to build lasting, stable structures in the world. You are the bedrock that others rely on — methodical and trustworthy.", gifts: "Discipline, practicality, organization", path: "Found in building systems, institutions, and foundations", affirmation: "I build with purpose and create enduring value." },
  5: { title: "Destiny of Freedom", color: "#eab308", purpose: "You are destined to experience and share freedom, adventure, and transformation. Your path is the great journey of discovery.", gifts: "Adaptability, curiosity, magnetism", path: "Found through travel, teaching, media, and exploration", affirmation: "I embrace change and inspire others to live freely." },
  6: { title: "Destiny of Love & Service", color: "#ec4899", purpose: "Your destiny is to love, nurture, and serve. You are here to create beautiful, harmonious environments and uplift families and communities.", gifts: "Compassion, responsibility, healing", path: "Found in family, healthcare, education, and community", affirmation: "I love unconditionally and create harmony wherever I go." },
  7: { title: "Destiny of Wisdom", color: "#7c3aed", purpose: "You are destined to seek truth, develop wisdom, and share spiritual understanding. Your path is one of deep inner knowing.", gifts: "Intuition, analytical mind, spiritual depth", path: "Found through research, philosophy, and spiritual teaching", affirmation: "I trust my intuition and share wisdom with the world." },
  8: { title: "Destiny of Achievement", color: "#6b7280", purpose: "Your destiny is to achieve mastery in the material world — success, abundance, and power used for the greater good.", gifts: "Business acumen, authority, strategic thinking", path: "Found through leadership, business, and financial mastery", affirmation: "I channel my power wisely to create lasting success." },
  9: { title: "Destiny of Compassion", color: "#10b981", purpose: "You are destined to serve all of humanity. Your path is one of universal love, letting go, and inspiring others through wisdom.", gifts: "Compassion, generosity, global vision", path: "Found through humanitarian work, arts, and healing", affirmation: "I serve humanity with an open heart and release all that no longer serves." },
  11: { title: "Master Destiny: Illumination", color: "#a855f7", purpose: "Your master destiny is to illuminate — to be a light in the darkness for others. You carry divine inspiration to transform the world.", gifts: "Spiritual intuition, inspiration, revelation", path: "Found in spiritual leadership, arts, and healing", affirmation: "I am a channel for divine light and inspire awakening in others." },
  22: { title: "Master Destiny: Manifestation", color: "#f59e0b", purpose: "You carry the master destiny of the architect — to take lofty visions and manifest them into concrete reality on a global scale.", gifts: "Master visionary, builder, global impact", path: "Found in world-changing organizations and movements", affirmation: "I transform vision into reality and build a better world." },
  33: { title: "Master Destiny: Unconditional Love", color: "#06b6d4", purpose: "The rarest destiny — the Master Teacher. You are here to embody and teach unconditional love and compassion on the highest level.", gifts: "Divine compassion, healing, enlightenment", path: "Found as spiritual teachers, healers, and guides", affirmation: "I am an embodiment of love and light for all of humanity." },
};

function reduce(n: number): number {
  if (n <= 9 || n === 11 || n === 22 || n === 33) return n;
  return reduce(String(n).split("").reduce((a, b) => a + parseInt(b), 0));
}

function calcDestiny(fullName: string) {
  const words = fullName.trim().split(/\s+/);
  const wordBreakdowns = words.map(w => {
    const letters = w.toUpperCase().replace(/[^A-Z]/g, "").split("").map(c => ({ char: c, value: CHART[c] || 0 }));
    const sum = letters.reduce((a, b) => a + b.value, 0);
    return { word: w, letters, sum, reduced: reduce(sum) };
  });
  const totalSum = wordBreakdowns.reduce((a, b) => a + b.reduced, 0);
  return { number: reduce(totalSum), wordBreakdowns, totalSum };
}

export default function DestinyNumberCalculator() {
  const [name, setName] = useState("");
  const [result, setResult] = useState<ReturnType<typeof calcDestiny> | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    if (!name.trim() || !name.trim().includes(" ")) { setError("Please enter your full name (first and last name at minimum)."); return; }
    if (!/[a-zA-Z]/.test(name)) { setError("Name must contain letters."); return; }
    setError("");
    setResult(calcDestiny(name));
  };

  const reset = () => { setName(""); setResult(null); setError(""); };
  const meaning = result ? DESTINY[result.number] : null;

  return (
    <Card className="w-full border-t-4 border-t-purple-600">
      <CardHeader>
        <CardTitle>Destiny Number Calculator</CardTitle>
        <CardDescription>Your Destiny Number (Expression Number) is calculated from your full birth name and reveals your life's ultimate purpose and natural gifts.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-1.5 max-w-sm">
          <Label>Your Full Birth Name</Label>
          <Input placeholder="e.g. Jane Marie Smith" value={name} onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === "Enter" && calculate()} />
          <p className="text-xs text-gray-400">Use your complete birth name (as on your birth certificate) for the most accurate result.</p>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate Destiny Number</Button>
          <Button variant="ghost" size="sm" onClick={reset} className="flex items-center gap-1.5">
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </Button>
        </div>

        {result && meaning && (
          <div className="space-y-4">
            <div className="rounded-xl border p-6 space-y-3" style={{ borderColor: meaning.color, background: `${meaning.color}10` }}>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Your Destiny Number</p>
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-6xl font-black" style={{ color: meaning.color }}>{result.number}</span>
                <span className="text-xl font-bold text-gray-700">{meaning.title}</span>
              </div>
              <p className="text-sm text-gray-700">{meaning.purpose}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div className="rounded-lg bg-white/80 p-3">
                  <p className="text-gray-500 text-xs font-semibold uppercase mb-1">🎁 Natural Gifts</p>
                  <p className="text-gray-700">{meaning.gifts}</p>
                </div>
                <div className="rounded-lg bg-white/80 p-3">
                  <p className="text-gray-500 text-xs font-semibold uppercase mb-1">🛤️ Your Path</p>
                  <p className="text-gray-700">{meaning.path}</p>
                </div>
              </div>
              <div className="rounded-lg bg-white/80 p-3 text-sm italic" style={{ borderLeft: `3px solid ${meaning.color}` }}>
                <p className="text-gray-600">"{meaning.affirmation}"</p>
              </div>
            </div>

            <details className="rounded-lg border border-gray-200 overflow-hidden">
              <summary className="cursor-pointer px-4 py-3 bg-gray-50 text-sm font-semibold text-gray-700 hover:bg-gray-100 list-none">Step-by-step Calculation</summary>
              <div className="px-4 py-3 border-t border-gray-100 space-y-3 text-sm">
                {result.wordBreakdowns.map((wb, i) => (
                  <div key={i}>
                    <p className="font-medium text-gray-700 mb-1">{wb.word}</p>
                    <div className="flex flex-wrap gap-1 mb-1">
                      {wb.letters.map((l, j) => (
                        <span key={j} className="inline-flex flex-col items-center bg-gray-50 border rounded px-1.5 py-1 text-xs">
                          <span className="font-bold">{l.char}</span>
                          <span className="text-gray-500">{l.value}</span>
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-500 text-xs">Sum: {wb.sum} → {wb.reduced}</p>
                  </div>
                ))}
                <p className="font-medium text-gray-700">
                  Final: {result.wordBreakdowns.map(w => w.reduced).join(" + ")} = {result.totalSum} → <strong style={{ color: meaning.color }}>{result.number}</strong>
                </p>
              </div>
            </details>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
