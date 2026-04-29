import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RotateCcw } from "lucide-react";

const ANIMALS = [
  {
    name: "Rat", emoji: "🐭", years: "1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020",
    element: "Water", yin_yang: "Yang",
    traits: "Quick-witted, resourceful, versatile, kind, and smart. Natural leaders who are excellent in business.",
    strengths: "Adaptable, clever, charming", weaknesses: "Stubborn, picky, devious",
    lucky: { numbers: "2, 3", colors: "Blue, Gold, Green", flowers: "Lily, African Violet" },
    compatible: ["Dragon", "Monkey", "Ox"],
    color: "#3b82f6",
  },
  {
    name: "Ox", emoji: "🐂", years: "1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021",
    element: "Earth", yin_yang: "Yin",
    traits: "Diligent, dependable, strong, and determined. Reliable workers who are trustworthy and patient.",
    strengths: "Honest, hardworking, persistent", weaknesses: "Inflexible, slow to adapt",
    lucky: { numbers: "1, 4", colors: "Blue, Yellow, Green", flowers: "Tulip, Evergreen" },
    compatible: ["Rat", "Snake", "Rooster"],
    color: "#92400e",
  },
  {
    name: "Tiger", emoji: "🐯", years: "1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022",
    element: "Wood", yin_yang: "Yang",
    traits: "Authoritative, emotional, courageous, and intense. Natural risk-takers who are competitive by nature.",
    strengths: "Brave, confident, generous", weaknesses: "Arrogant, impulsive",
    lucky: { numbers: "1, 3, 4", colors: "Blue, Grey, Orange", flowers: "Cineraria" },
    compatible: ["Horse", "Dog", "Pig"],
    color: "#f97316",
  },
  {
    name: "Rabbit", emoji: "🐰", years: "1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023",
    element: "Wood", yin_yang: "Yin",
    traits: "Quiet, elegant, kind, and responsible. Peace-loving and diplomatic, they avoid conflict.",
    strengths: "Gentle, empathetic, artistic", weaknesses: "Overly sensitive, timid",
    lucky: { numbers: "3, 4, 6", colors: "Red, Pink, Purple", flowers: "Snapdragon, Plantain Lily" },
    compatible: ["Goat", "Pig", "Dog"],
    color: "#ec4899",
  },
  {
    name: "Dragon", emoji: "🐉", years: "1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024",
    element: "Earth", yin_yang: "Yang",
    traits: "Energetic, fearless, and warm-hearted. The most vital and powerful sign, natural-born leaders.",
    strengths: "Confident, intelligent, charismatic", weaknesses: "Arrogant, impatient",
    lucky: { numbers: "1, 6, 7", colors: "Gold, Silver, Grayish-white", flowers: "Bleeding-heart Flowers" },
    compatible: ["Rat", "Tiger", "Snake"],
    color: "#7c3aed",
  },
  {
    name: "Snake", emoji: "🐍", years: "1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025",
    element: "Fire", yin_yang: "Yin",
    traits: "Philosophical, organized, intelligent, and intuitive. Elegant and graceful with great wisdom.",
    strengths: "Analytical, wise, discreet", weaknesses: "Jealous, suspicious",
    lucky: { numbers: "2, 8, 9", colors: "Black, Red, Yellow", flowers: "Orchid, Cactus" },
    compatible: ["Dragon", "Rooster", "Ox"],
    color: "#10b981",
  },
  {
    name: "Horse", emoji: "🐴", years: "1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026",
    element: "Fire", yin_yang: "Yang",
    traits: "Animated, active, and energetic. They love being in a crowd and are independent and strong-willed.",
    strengths: "Energetic, independent, warm-hearted", weaknesses: "Impatient, lacks persistence",
    lucky: { numbers: "2, 3, 7", colors: "Yellow, Green", flowers: "Calla Lily, Jasmine" },
    compatible: ["Tiger", "Goat", "Dog"],
    color: "#eab308",
  },
  {
    name: "Goat", emoji: "🐐", years: "1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027",
    element: "Earth", yin_yang: "Yin",
    traits: "Calm, gentle, sympathetic, and creative. They prefer to be in a group and are known for their kindness.",
    strengths: "Creative, thoughtful, kind", weaknesses: "Indecisive, pessimistic",
    lucky: { numbers: "2, 7", colors: "Brown, Red, Purple", flowers: "Carnation, Primrose" },
    compatible: ["Rabbit", "Horse", "Pig"],
    color: "#84cc16",
  },
  {
    name: "Monkey", emoji: "🐵", years: "1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028",
    element: "Metal", yin_yang: "Yang",
    traits: "Witty, intelligent, versatile, lively, and quick-witted. Problem solvers who are full of curiosity.",
    strengths: "Sharp, inventive, amusing", weaknesses: "Vain, selfish",
    lucky: { numbers: "4, 9", colors: "White, Blue, Gold", flowers: "Chrysanthemum" },
    compatible: ["Rat", "Dragon", "Snake"],
    color: "#f59e0b",
  },
  {
    name: "Rooster", emoji: "🐓", years: "1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029",
    element: "Metal", yin_yang: "Yin",
    traits: "Observant, hardworking, courageous, and talented. They are confident and punctual.",
    strengths: "Honest, energetic, loyal", weaknesses: "Vain, self-righteous",
    lucky: { numbers: "5, 7, 8", colors: "Gold, Brown, Yellow", flowers: "Gladiola, Cockscomb" },
    compatible: ["Ox", "Snake", "Dragon"],
    color: "#f97316",
  },
  {
    name: "Dog", emoji: "🐕", years: "1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030",
    element: "Earth", yin_yang: "Yang",
    traits: "Loyal, reliable, kind, and honest. Man's best friend — they are the most likable sign in the zodiac.",
    strengths: "Faithful, courageous, responsible", weaknesses: "Stubborn, sensitive, anxious",
    lucky: { numbers: "3, 4, 9", colors: "Green, Red, Purple", flowers: "Rose, Oncidium Orchid" },
    compatible: ["Tiger", "Rabbit", "Horse"],
    color: "#ef4444",
  },
  {
    name: "Pig", emoji: "🐷", years: "1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031",
    element: "Water", yin_yang: "Yin",
    traits: "Compassionate, generous, diligent, and sincere. They are known for their big hearts and pure souls.",
    strengths: "Honest, optimistic, kind", weaknesses: "Naive, over-trusting",
    lucky: { numbers: "2, 5, 8", colors: "Yellow, Grey, Brown", flowers: "Hydrangea, Marguerite" },
    compatible: ["Tiger", "Rabbit", "Goat"],
    color: "#ec4899",
  },
];

function getAnimal(year: number) {
  const idx = ((year - 1900) % 12 + 12) % 12;
  return ANIMALS[idx];
}

export default function ChineseZodiacCalculator() {
  const [year, setYear] = useState("");
  const [result, setResult] = useState<typeof ANIMALS[0] | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    const y = parseInt(year);
    if (!y || y < 1900 || y > 2100) { setError("Please enter a valid year between 1900 and 2100."); return; }
    setError("");
    setResult(getAnimal(y));
  };

  const reset = () => { setYear(""); setResult(null); setError(""); };

  return (
    <Card className="w-full border-t-4" style={{ borderTopColor: "#ef4444" }}>
      <CardHeader>
        <CardTitle>Chinese Zodiac Calculator</CardTitle>
        <CardDescription>Enter your birth year to find your Chinese zodiac animal and discover your personality, strengths, and compatible signs.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-1.5 max-w-xs">
          <Label>Birth Year</Label>
          <Input placeholder="e.g. 1990" value={year} onChange={e => setYear(e.target.value)} type="number" min="1900" max="2100" />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex gap-2">
          <Button onClick={calculate}>Find My Animal</Button>
          <Button variant="ghost" size="sm" onClick={reset} className="flex items-center gap-1.5">
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </Button>
        </div>

        {result && (
          <div className="rounded-xl border p-6 space-y-4" style={{ borderColor: result.color, background: `${result.color}10` }}>
            <div className="flex items-center gap-4">
              <span className="text-6xl">{result.emoji}</span>
              <div>
                <h3 className="text-2xl font-bold" style={{ color: result.color }}>Year of the {result.name}</h3>
                <p className="text-sm text-gray-500">{result.element} • {result.yin_yang}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-white/70 p-3">
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">Recent Years</p>
                <p className="font-medium mt-1 text-xs">{result.years}</p>
              </div>
              <div className="rounded-lg bg-white/70 p-3">
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">Compatible With</p>
                <p className="font-medium mt-1">{result.compatible.join(", ")}</p>
              </div>
            </div>
            <div className="rounded-lg bg-white/70 p-3 text-sm">
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">Personality</p>
              <p className="text-gray-700">{result.traits}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="rounded-lg bg-white/70 p-3">
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">Strengths</p>
                <p className="text-gray-700 text-xs">{result.strengths}</p>
              </div>
              <div className="rounded-lg bg-white/70 p-3">
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">Lucky Numbers</p>
                <p className="text-gray-700 font-semibold">{result.lucky.numbers}</p>
              </div>
              <div className="rounded-lg bg-white/70 p-3">
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">Lucky Colors</p>
                <p className="text-gray-700 text-xs">{result.lucky.colors}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {ANIMALS.map(a => (
            <button key={a.name} onClick={() => { setResult(a); setError(""); }}
              className="flex flex-col items-center p-2 rounded-lg border hover:border-gray-400 transition-colors text-center"
              style={{ borderColor: result?.name === a.name ? a.color : undefined, background: result?.name === a.name ? `${a.color}10` : undefined }}>
              <span className="text-2xl">{a.emoji}</span>
              <span className="text-xs mt-1 text-gray-600">{a.name}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
