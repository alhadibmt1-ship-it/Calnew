import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RotateCcw, Star } from "lucide-react";

const CHART: Record<string, number> = {
  A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,I:9,
  J:1,K:2,L:3,M:4,N:5,O:6,P:7,Q:8,R:9,
  S:1,T:2,U:3,V:4,W:5,X:6,Y:7,Z:8,
};

const NUMBER_MEANINGS: Record<number, { color: string; keyword: string; lucky_days: string; lucky_colors: string; lucky_gems: string }> = {
  1: { color: "#ef4444", keyword: "Leadership & Success", lucky_days: "Sunday, Monday", lucky_colors: "Red, Gold, Orange", lucky_gems: "Ruby, Garnet" },
  2: { color: "#3b82f6", keyword: "Partnership & Harmony", lucky_days: "Monday, Friday", lucky_colors: "White, Silver, Light Blue", lucky_gems: "Moonstone, Pearl" },
  3: { color: "#f97316", keyword: "Creativity & Joy", lucky_days: "Tuesday, Thursday", lucky_colors: "Yellow, Orange, Purple", lucky_gems: "Citrine, Amethyst" },
  4: { color: "#84cc16", keyword: "Stability & Hard Work", lucky_days: "Saturday, Sunday", lucky_colors: "Green, Brown, Grey", lucky_gems: "Emerald, Jade" },
  5: { color: "#eab308", keyword: "Freedom & Adventure", lucky_days: "Wednesday, Friday", lucky_colors: "Yellow, Turquoise, Silver", lucky_gems: "Turquoise, Aquamarine" },
  6: { color: "#ec4899", keyword: "Love & Nurturing", lucky_days: "Friday, Wednesday", lucky_colors: "Pink, Rose, Indigo", lucky_gems: "Rose Quartz, Sapphire" },
  7: { color: "#7c3aed", keyword: "Wisdom & Intuition", lucky_days: "Monday, Thursday", lucky_colors: "Purple, Violet, White", lucky_gems: "Amethyst, Labradorite" },
  8: { color: "#6b7280", keyword: "Abundance & Power", lucky_days: "Saturday, Sunday", lucky_colors: "Black, Dark Blue, Brown", lucky_gems: "Obsidian, Black Tourmaline" },
  9: { color: "#10b981", keyword: "Compassion & Wisdom", lucky_days: "Tuesday, Thursday", lucky_colors: "Gold, Red, Violet", lucky_gems: "Red Coral, Bloodstone" },
};

function reduce(n: number): number {
  if (n <= 9) return n;
  return reduce(String(n).split("").reduce((a, b) => a + parseInt(b), 0));
}

function calcLifePath(date: string): number {
  const d = new Date(date);
  const m = d.getMonth() + 1, day = d.getDate(), y = d.getFullYear();
  const total = reduce(m) + reduce(day) + reduce(String(y).split("").reduce((a, b) => a + parseInt(b), 0));
  return reduce(total);
}

function calcNameNum(name: string): number {
  const total = name.toUpperCase().replace(/[^A-Z]/g, "").split("").reduce((a, c) => a + (CHART[c] || 0), 0);
  return reduce(total);
}

function generatePersonalYear(birthDate: string, currentYear: number): number {
  const d = new Date(birthDate);
  const m = d.getMonth() + 1, day = d.getDate();
  const yearSum = String(currentYear).split("").reduce((a, b) => a + parseInt(b), 0);
  return reduce(reduce(m) + reduce(day) + reduce(yearSum));
}

function calcLuckyNumbers(birthDate: string, name: string) {
  const lifePath = calcLifePath(birthDate);
  const nameNum = calcNameNum(name);
  const currentYear = new Date().getFullYear();
  const personalYear = generatePersonalYear(birthDate, currentYear);
  const d = new Date(birthDate);
  const birthdayNum = reduce(d.getDate());
  const combined = reduce(lifePath + nameNum);
  const luckySet = new Set([lifePath, nameNum, personalYear, birthdayNum, combined]);
  const primaryLucky = Array.from(luckySet).slice(0, 5);
  // Extended lucky numbers (multiples and related)
  const extended = new Set<number>();
  for (const n of primaryLucky) {
    for (let mult = n; mult <= 99; mult += n) extended.add(mult);
  }
  const extendedArr = Array.from(extended).filter(n => !primaryLucky.includes(n) && n <= 50).sort((a, b) => a - b).slice(0, 8);
  return { lifePath, nameNum, personalYear, birthdayNum, combined, primaryLucky, extendedArr };
}

export default function LuckyNumberCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [name, setName] = useState("");
  const [result, setResult] = useState<ReturnType<typeof calcLuckyNumbers> | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    if (!birthDate) { setError("Please enter your birth date."); return; }
    if (!name.trim() || !/[a-zA-Z]/.test(name)) { setError("Please enter your name."); return; }
    setError("");
    setResult(calcLuckyNumbers(birthDate, name));
  };

  const reset = () => { setBirthDate(""); setName(""); setResult(null); setError(""); };

  const primaryMeaning = result ? NUMBER_MEANINGS[result.lifePath] : null;

  return (
    <Card className="w-full border-t-4 border-t-yellow-400">
      <CardHeader>
        <CardTitle>Lucky Number Calculator</CardTitle>
        <CardDescription>Discover your personal lucky numbers based on your birth date and name using numerology. Includes your lucky colors, gems, and days.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
          <div className="space-y-1.5">
            <Label>Birth Date</Label>
            <Input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} max={new Date().toISOString().split("T")[0]} />
          </div>
          <div className="space-y-1.5">
            <Label>Your Name</Label>
            <Input placeholder="e.g. Jane Smith" value={name} onChange={e => setName(e.target.value)} />
          </div>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex gap-2">
          <Button onClick={calculate} className="flex items-center gap-2">
            <Star className="h-4 w-4" /> Find My Lucky Numbers
          </Button>
          <Button variant="ghost" size="sm" onClick={reset} className="flex items-center gap-1.5">
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </Button>
        </div>

        {result && primaryMeaning && (
          <div className="space-y-4">
            <div className="rounded-xl border p-5 space-y-4" style={{ borderColor: primaryMeaning.color, background: `${primaryMeaning.color}08` }}>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Your Primary Lucky Numbers</p>
              <div className="flex flex-wrap gap-3">
                {result.primaryLucky.map((n, i) => (
                  <div key={i} className="flex flex-col items-center justify-center w-14 h-14 rounded-full border-2 text-xl font-black"
                    style={{ borderColor: primaryMeaning.color, color: primaryMeaning.color, background: `${primaryMeaning.color}12` }}>
                    {n}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              {[
                { label: "Life Path", value: result.lifePath, note: "Core number" },
                { label: "Name Number", value: result.nameNum, note: "Expression" },
                { label: "Personal Year", value: result.personalYear, note: String(new Date().getFullYear()) },
                { label: "Birthday Number", value: result.birthdayNum, note: "Day energy" },
              ].map(item => (
                <div key={item.label} className="rounded-lg border border-gray-200 p-3 text-center">
                  <p className="text-2xl font-black" style={{ color: primaryMeaning.color }}>{item.value}</p>
                  <p className="text-xs font-semibold text-gray-700">{item.label}</p>
                  <p className="text-xs text-gray-400">{item.note}</p>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-gray-200 p-4 space-y-3">
              <p className="text-sm font-semibold text-gray-700">Your Lucky Profile</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase mb-1">🌈 Lucky Colors</p>
                  <p className="text-gray-700">{primaryMeaning.lucky_colors}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase mb-1">💎 Lucky Gems</p>
                  <p className="text-gray-700">{primaryMeaning.lucky_gems}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase mb-1">📅 Lucky Days</p>
                  <p className="text-gray-700">{primaryMeaning.lucky_days}</p>
                </div>
              </div>
            </div>

            {result.extendedArr.length > 0 && (
              <div className="rounded-lg bg-gray-50 border border-gray-200 p-4">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Additional Lucky Numbers (up to 50)</p>
                <div className="flex flex-wrap gap-2">
                  {result.extendedArr.map(n => (
                    <span key={n} className="inline-block px-2.5 py-1 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-600">{n}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
