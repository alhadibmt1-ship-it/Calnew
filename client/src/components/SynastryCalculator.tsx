import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RotateCcw } from "lucide-react";
import { SIGNS, SIGN_SYMBOLS, ELEMENTS, ELEMENT_COLORS, getSunLon, getMoonLon, getVenusLon, getMarsLon, degreesToSign, normalizeAngle } from "@/lib/astro-utils";

type SignInfo = { sign: string; symbol: string; signIndex: number };
type PersonData = { sun: SignInfo; moon: SignInfo; venus: SignInfo; mars: SignInfo };

const COMPAT_MATRIX: Record<string, Record<string, number>> = {};
function buildMatrix() {
  const baseComp = [10,6,9,7,10,6,9,7,10,6,9,7]; // Fire/Air high, Earth/Water high among themselves
  SIGNS.forEach((s, i) => {
    COMPAT_MATRIX[s] = {};
    SIGNS.forEach((t, j) => {
      const diff = Math.abs(i - j);
      const d = Math.min(diff, 12 - diff);
      let score: number;
      if (d === 0) score = 10;         // same sign — conjunct
      else if (d === 4 || d === 8) score = 9;  // trine
      else if (d === 2 || d === 10) score = 8; // sextile
      else if (d === 6) score = 6;     // opposition
      else if (d === 3 || d === 9) score = 5;  // square
      else if (d === 1 || d === 11) score = 7; // semi-sextile
      else score = 6;
      // Element bonus
      if (ELEMENTS[s] === ELEMENTS[t]) score = Math.min(10, score + 1);
      COMPAT_MATRIX[s][t] = score;
    });
  });
}
buildMatrix();

const ASPECT_NAMES: Record<number, string> = { 0:"conjunction",4:"trine",8:"trine",2:"sextile",10:"sextile",6:"opposition",3:"square",9:"square" };
const ASPECT_INTERPRETATIONS: Record<string, Record<string, string>> = {
  conjunction: {
    "sun-sun":"Your core identities align — you share life goals and approaches. Powerful bond but may amplify each other's flaws.",
    "sun-moon":"The heart of relationship harmony. One person naturally nurtures the other's ego; this bond feels instinctively right.",
    "venus-mars":"Classic romantic chemistry. Attraction between you is natural, effortless, and often immediate.",
    "moon-moon":"Emotional language matches. You understand each other's feelings without much explanation.",
  },
  trine: {
    "sun-sun":"You flow together easily. Your paths naturally align and you support each other's growth with little friction.",
    "venus-mars":"Smooth romantic connection — passion exists but doesn't overwhelm. Comfortable chemistry.",
    "moon-moon":"Emotional ease defines this bond. You both feel deeply at home with each other's inner world.",
    "sun-moon":"A naturally harmonious and supportive bond. One lifts the other without it feeling one-sided.",
  },
  sextile: {
    "sun-sun":"An encouraging, compatible pairing. You inspire each other's goals without competition.",
    "venus-mars":"Gentle attraction and mutual appreciation. Romance develops naturally and comfortably.",
    "moon-moon":"Emotional sympathy and understanding. You intuitively know how to support each other.",
    "sun-moon":"A positive, supportive connection. There is mutual appreciation and natural care.",
  },
  opposition: {
    "sun-sun":"You are different but complementary. Tension creates growth — if both are willing to see the other's perspective.",
    "venus-mars":"Magnetic attraction combined with friction. Passion is undeniable but so is the potential for conflict.",
    "moon-moon":"Emotional styles differ but fascinate. You learn deeply from each other's different inner worlds.",
    "sun-moon":"Polarity creates both tension and completion. What one lacks, the other provides.",
  },
  square: {
    "sun-sun":"Challenge is built into this pairing. Growth is possible but requires active effort and genuine tolerance.",
    "venus-mars":"Intense chemistry paired with friction. The attraction is real but so are the clashes.",
    "moon-moon":"Emotional triggers exist. You may react to each other in unexpected ways that require patience to navigate.",
    "sun-moon":"Tension between ego and emotion. This pairing requires conscious communication to avoid patterns of hurt.",
  },
};

function getAspect(a: SignInfo, b: SignInfo): { name: string; orb: number } {
  const diff = Math.min(Math.abs(a.signIndex - b.signIndex), 12 - Math.abs(a.signIndex - b.signIndex));
  const name = ASPECT_NAMES[diff] || "inconjunct";
  return { name, orb: diff };
}

function getInterpretation(planet1: string, planet2: string, aspect: string): string {
  const key = [planet1, planet2].sort().join("-");
  return ASPECT_INTERPRETATIONS[aspect]?.[key] || `A ${aspect} between your ${planet1}s creates notable energy between you — worth exploring in depth.`;
}

function scoreToLabel(s: number): { label: string; color: string } {
  if (s >= 85) return { label: "Exceptional", color: "#22c55e" };
  if (s >= 70) return { label: "Strong", color: "#84cc16" };
  if (s >= 55) return { label: "Good", color: "#eab308" };
  if (s >= 40) return { label: "Moderate", color: "#f97316" };
  return { label: "Challenging", color: "#ef4444" };
}

export default function SynastryCalculator() {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [name1, setName1] = useState("Person 1");
  const [name2, setName2] = useState("Person 2");
  const [result, setResult] = useState<null | {
    p1: PersonData; p2: PersonData;
    scores: { emotional: number; romantic: number; communication: number; overall: number };
    aspects: { label: string; aspect: string; text: string }[];
  }>(null);
  const [error, setError] = useState("");

  function calculate() {
    setError("");
    if (!date1 || !date2) { setError("Please enter both birth dates."); return; }
    const d1 = new Date(date1 + "T12:00:00Z");
    const d2 = new Date(date2 + "T12:00:00Z");
    const p1: PersonData = {
      sun: degreesToSign(getSunLon(d1)), moon: degreesToSign(getMoonLon(d1)),
      venus: degreesToSign(getVenusLon(d1)), mars: degreesToSign(getMarsLon(d1)),
    };
    const p2: PersonData = {
      sun: degreesToSign(getSunLon(d2)), moon: degreesToSign(getMoonLon(d2)),
      venus: degreesToSign(getVenusLon(d2)), mars: degreesToSign(getMarsLon(d2)),
    };
    const emotional = Math.round((COMPAT_MATRIX[p1.moon.sign][p2.moon.sign] +
      COMPAT_MATRIX[p1.sun.sign][p2.moon.sign] + COMPAT_MATRIX[p2.sun.sign][p1.moon.sign]) / 3 * 10);
    const romantic = Math.round((COMPAT_MATRIX[p1.venus.sign][p2.mars.sign] +
      COMPAT_MATRIX[p2.venus.sign][p1.mars.sign] + COMPAT_MATRIX[p1.venus.sign][p2.venus.sign]) / 3 * 10);
    const communication = Math.round((COMPAT_MATRIX[p1.sun.sign][p2.sun.sign] +
      COMPAT_MATRIX[p1.moon.sign][p2.moon.sign]) / 2 * 10);
    const overall = Math.round((emotional + romantic + communication) / 3);

    const pairs: { planet1: string; planet2: string; a: SignInfo; b: SignInfo }[] = [
      { planet1: "sun", planet2: "sun", a: p1.sun, b: p2.sun },
      { planet1: "moon", planet2: "moon", a: p1.moon, b: p2.moon },
      { planet1: "venus", planet2: "mars", a: p1.venus, b: p2.mars },
      { planet1: "sun", planet2: "moon", a: p1.sun, b: p2.moon },
    ];
    const aspects = pairs.map(({ planet1, planet2, a, b }) => {
      const asp = getAspect(a, b);
      return {
        label: `${name1}'s ${planet1.charAt(0).toUpperCase()+planet1.slice(1)} (${a.symbol} ${a.sign}) — ${name2}'s ${planet2.charAt(0).toUpperCase()+planet2.slice(1)} (${b.symbol} ${b.sign})`,
        aspect: asp.name,
        text: getInterpretation(planet1, planet2, asp.name),
      };
    });
    setResult({ p1, p2, scores: { emotional, romantic, communication, overall }, aspects });
  }

  function reset() { setDate1(""); setDate2(""); setResult(null); setError(""); }

  function ScoreBar({ label, score }: { label: string; score: number }) {
    const { label: sLabel, color } = scoreToLabel(score);
    return (
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>{label}</span><span className="font-semibold" style={{ color }}>{score}% — {sLabel}</span>
        </div>
        <div className="h-2 rounded-full bg-gray-100">
          <div className="h-2 rounded-full transition-all" style={{ width: `${score}%`, background: color }} />
        </div>
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Synastry Chart Calculator</CardTitle>
        <CardDescription>Enter birth dates for two people to compare their planetary placements and discover the core themes of your relationship.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Person 1 Name</Label>
            <Input value={name1} onChange={e => setName1(e.target.value)} placeholder="e.g. Emma" />
            <Label>Person 1 Birth Date</Label>
            <Input type="date" value={date1} onChange={e => setDate1(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Person 2 Name</Label>
            <Input value={name2} onChange={e => setName2(e.target.value)} placeholder="e.g. James" />
            <Label>Person 2 Birth Date</Label>
            <Input type="date" value={date2} onChange={e => setDate2(e.target.value)} />
          </div>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate Synastry</Button>
          <Button variant="outline" onClick={reset}><RotateCcw className="w-4 h-4 mr-1" />Reset</Button>
        </div>
        {result && (
          <div className="mt-4 space-y-5">
            {/* Planet table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm border rounded-lg overflow-hidden">
                <thead><tr className="bg-muted">
                  <th className="p-2 text-left">Planet</th>
                  <th className="p-2 text-center">{name1}</th>
                  <th className="p-2 text-center">{name2}</th>
                </tr></thead>
                <tbody>
                  {(["sun","moon","venus","mars"] as const).map((p, i) => (
                    <tr key={p} className={i%2===0?"bg-white":"bg-gray-50"}>
                      <td className="p-2 font-medium capitalize">{p === "sun" ? "☀️ Sun" : p === "moon" ? "🌙 Moon" : p === "venus" ? "♀ Venus" : "♂ Mars"}</td>
                      <td className="p-2 text-center">{result.p1[p].symbol} {result.p1[p].sign}</td>
                      <td className="p-2 text-center">{result.p2[p].symbol} {result.p2[p].sign}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Scores */}
            <div className="space-y-3">
              <ScoreBar label="💕 Emotional Compatibility" score={result.scores.emotional} />
              <ScoreBar label="🔥 Romantic Chemistry" score={result.scores.romantic} />
              <ScoreBar label="💬 Communication Style" score={result.scores.communication} />
              <div className="pt-2 border-t">
                <ScoreBar label="⭐ Overall Compatibility" score={result.scores.overall} />
              </div>
            </div>
            {/* Aspects */}
            <div className="space-y-2">
              <p className="text-sm font-semibold">Key Planetary Aspects</p>
              {result.aspects.map(a => (
                <div key={a.label} className="rounded-md border p-3">
                  <p className="text-xs font-semibold text-muted-foreground">{a.label}</p>
                  <p className="text-xs text-primary capitalize mb-1">{a.aspect}</p>
                  <p className="text-sm">{a.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
