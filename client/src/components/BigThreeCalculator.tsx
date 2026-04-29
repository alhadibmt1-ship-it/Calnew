import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RotateCcw } from "lucide-react";
import { ELEMENTS, ELEMENT_COLORS, RULING_PLANETS, CITIES, getSunLon, getMoonLon, getAscendant, degreesToSign } from "@/lib/astro-utils";

const SUN_TRAITS: Record<string, string> = {
  Aries:"bold, pioneering, and driven by action",
  Taurus:"steady, sensual, and grounded in security",
  Gemini:"curious, versatile, and intellectually agile",
  Cancer:"nurturing, intuitive, and emotionally deep",
  Leo:"generous, creative, and naturally magnetic",
  Virgo:"analytical, helpful, and detail-oriented",
  Libra:"diplomatic, charming, and beauty-seeking",
  Scorpio:"intense, perceptive, and powerfully transformative",
  Sagittarius:"adventurous, optimistic, and philosophically minded",
  Capricorn:"ambitious, disciplined, and quietly authoritative",
  Aquarius:"original, progressive, and humanitarian",
  Pisces:"empathetic, imaginative, and deeply spiritual",
};
const MOON_TRAITS: Record<string, string> = {
  Aries:"impulsive and action-oriented with emotions",
  Taurus:"comfort-seeking and emotionally stable",
  Gemini:"processes feelings through thought and talk",
  Cancer:"deeply nurturing and emotionally intuitive",
  Leo:"needs appreciation and warm emotional expression",
  Virgo:"analytical about feelings, finds calm in order",
  Libra:"seeks emotional harmony and dislikes conflict",
  Scorpio:"emotionally intense, secretive, and deeply feeling",
  Sagittarius:"needs freedom and finds comfort in adventure",
  Capricorn:"emotionally reserved and privately feeling",
  Aquarius:"intellectualises emotions, values independence",
  Pisces:"empathetic, absorbs others' feelings easily",
};
const RISING_TRAITS: Record<string, string> = {
  Aries:"bold and direct first impression — a natural leader",
  Taurus:"reliable and calm outward energy — steady and grounded",
  Gemini:"quick and expressive — charming and socially fluid",
  Cancer:"warm and perceptive — people feel safe around you",
  Leo:"magnetic and dramatic — you light up every room",
  Virgo:"precise and put-together — quietly competent",
  Libra:"graceful and charming — effortlessly elegant",
  Scorpio:"intense and mysterious — magnetically powerful",
  Sagittarius:"open and enthusiastic — radiates positive energy",
  Capricorn:"composed and authoritative — commands respect",
  Aquarius:"unique and forward-thinking — unmistakably original",
  Pisces:"gentle and dreamy — an ethereal, creative presence",
};

export default function BigThreeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [city, setCity] = useState("");
  const [result, setResult] = useState<null | {
    sun: { sign: string; symbol: string; element: string };
    moon: { sign: string; symbol: string; element: string };
    rising: { sign: string; symbol: string; element: string };
    combined: string;
  }>(null);
  const [error, setError] = useState("");

  function calculate() {
    setError("");
    if (!birthDate || !birthTime || !city) { setError("Please fill in all fields."); return; }
    const cityData = CITIES.find(c => c.name === city);
    if (!cityData) { setError("Please select a city."); return; }
    const [h, m] = birthTime.split(":").map(Number);
    const date = new Date(`${birthDate}T${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:00Z`);
    const lonOffset = cityData.lon / 15;
    const utcDate = new Date(date.getTime() - lonOffset * 3600 * 1000);

    const sunInfo  = degreesToSign(getSunLon(utcDate));
    const moonInfo = degreesToSign(getMoonLon(utcDate));
    const ascInfo  = degreesToSign(getAscendant(utcDate, cityData.lat, cityData.lon));

    const combined = `You present to the world as ${RISING_TRAITS[ascInfo.sign]}, ` +
      `but at your core you are ${SUN_TRAITS[sunInfo.sign]}. ` +
      `Emotionally, you ${MOON_TRAITS[moonInfo.sign]}.`;

    setResult({
      sun:    { sign: sunInfo.sign,  symbol: sunInfo.symbol,  element: ELEMENTS[sunInfo.sign] },
      moon:   { sign: moonInfo.sign, symbol: moonInfo.symbol, element: ELEMENTS[moonInfo.sign] },
      rising: { sign: ascInfo.sign,  symbol: ascInfo.symbol,  element: ELEMENTS[ascInfo.sign] },
      combined,
    });
  }

  function reset() { setBirthDate(""); setBirthTime(""); setCity(""); setResult(null); setError(""); }

  const signCard = (label: string, emoji: string, data: { sign: string; symbol: string; element: string } | undefined, trait: Record<string, string>) => {
    if (!data) return null;
    const color = ELEMENT_COLORS[data.element];
    return (
      <div className="rounded-lg border p-4 text-center" style={{ borderColor: color }}>
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">{emoji} {label}</div>
        <div className="text-3xl mb-1">{data.symbol}</div>
        <div className="text-xl font-bold">{data.sign}</div>
        <div className="text-xs mt-1" style={{ color }}>{data.element}</div>
        <p className="text-xs text-muted-foreground mt-2">{trait[data.sign]}</p>
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sun, Moon &amp; Rising Sign Calculator — Your Big Three</CardTitle>
        <CardDescription>Calculate your three core astrological signs in one place. Needs your birth date, time, and nearest city.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <Label>Birth Date</Label>
            <Input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
          </div>
          <div>
            <Label>Birth Time (local)</Label>
            <Input type="time" value={birthTime} onChange={e => setBirthTime(e.target.value)} />
          </div>
          <div>
            <Label>Nearest City</Label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger><SelectValue placeholder="Select city…" /></SelectTrigger>
              <SelectContent>
                {CITIES.map(c => <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate My Big Three</Button>
          <Button variant="outline" onClick={reset}><RotateCcw className="w-4 h-4 mr-1" />Reset</Button>
        </div>
        {result && (
          <div className="mt-4 space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              {signCard("Sun Sign", "☀️", result.sun, SUN_TRAITS)}
              {signCard("Moon Sign", "🌙", result.moon, MOON_TRAITS)}
              {signCard("Rising Sign", "⬆️", result.rising, RISING_TRAITS)}
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Combined Personality Snapshot</p>
              <p className="text-sm">{result.combined}</p>
            </div>
            <div className="grid gap-2 text-xs sm:grid-cols-3">
              <div className="rounded p-2 bg-yellow-50 border border-yellow-200">
                <p className="font-semibold">☀️ Sun Sign = your core identity</p>
                <p className="text-muted-foreground">Who you are when fully expressed</p>
              </div>
              <div className="rounded p-2 bg-blue-50 border border-blue-200">
                <p className="font-semibold">🌙 Moon Sign = your inner world</p>
                <p className="text-muted-foreground">How you feel and what you need</p>
              </div>
              <div className="rounded p-2 bg-purple-50 border border-purple-200">
                <p className="font-semibold">⬆️ Rising Sign = your outer mask</p>
                <p className="text-muted-foreground">How others first see and experience you</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
