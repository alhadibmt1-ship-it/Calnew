import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RotateCcw } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from "recharts";

const CYCLES = [
  { key: "physical", label: "Physical", period: 23, color: "#ef4444", emoji: "💪", desc: "Controls physical strength, energy, coordination, and overall wellbeing." },
  { key: "emotional", label: "Emotional", period: 28, color: "#3b82f6", emoji: "❤️", desc: "Governs sensitivity, mood, creativity, emotional stability, and intuition." },
  { key: "intellectual", label: "Intellectual", period: 33, color: "#8b5cf6", emoji: "🧠", desc: "Influences analytical thinking, memory, logical reasoning, and mental acuity." },
];

function getPhase(val: number): { label: string; color: string } {
  if (val > 0.5) return { label: "High", color: "#22c55e" };
  if (val >= 0) return { label: "Positive", color: "#84cc16" };
  if (val > -0.5) return { label: "Low", color: "#f97316" };
  return { label: "Critical", color: "#ef4444" };
}

function calcBiorhythm(birthDate: Date, targetDate: Date) {
  const msPerDay = 1000 * 60 * 60 * 24;
  const days = Math.floor((targetDate.getTime() - birthDate.getTime()) / msPerDay);
  return {
    physical: Math.sin((2 * Math.PI * days) / 23),
    emotional: Math.sin((2 * Math.PI * days) / 28),
    intellectual: Math.sin((2 * Math.PI * days) / 33),
  };
}

function buildChartData(birthDate: Date, centerDate: Date, range = 14) {
  const data = [];
  for (let i = -range; i <= range; i++) {
    const d = new Date(centerDate.getTime() + i * 86400000);
    const vals = calcBiorhythm(birthDate, d);
    data.push({
      day: i === 0 ? "Today" : i > 0 ? `+${i}d` : `${i}d`,
      physical: parseFloat((vals.physical * 100).toFixed(1)),
      emotional: parseFloat((vals.emotional * 100).toFixed(1)),
      intellectual: parseFloat((vals.intellectual * 100).toFixed(1)),
      isToday: i === 0,
    });
  }
  return data;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-xs space-y-1">
        <p className="font-semibold text-gray-700 mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} style={{ color: p.color }} className="flex items-center gap-2">
            <span className="font-medium w-24">{p.name}:</span>
            <span className="font-bold">{p.value > 0 ? "+" : ""}{p.value}%</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function BiorhythmCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split("T")[0]);
  const [result, setResult] = useState<ReturnType<typeof calcBiorhythm> | null>(null);
  const [error, setError] = useState("");
  const [showChart, setShowChart] = useState(false);

  const calculate = () => {
    if (!birthDate) { setError("Please enter your birth date."); return; }
    const birth = new Date(birthDate);
    const target = new Date(targetDate || new Date().toISOString().split("T")[0]);
    if (birth >= target) { setError("Birth date must be before the target date."); return; }
    setError("");
    setResult(calcBiorhythm(birth, target));
    setShowChart(true);
  };

  const reset = () => { setBirthDate(""); setTargetDate(new Date().toISOString().split("T")[0]); setResult(null); setShowChart(false); setError(""); };

  const chartData = useMemo(() => {
    if (!birthDate || !targetDate) return [];
    const birth = new Date(birthDate);
    const target = new Date(targetDate);
    if (isNaN(birth.getTime()) || isNaN(target.getTime()) || birth >= target) return [];
    return buildChartData(birth, target);
  }, [birthDate, targetDate, result]);

  return (
    <Card className="w-full border-t-4 border-t-red-500">
      <CardHeader>
        <CardTitle>Biorhythm Calculator</CardTitle>
        <CardDescription>Based on your birthdate, visualize your physical, emotional, and intellectual cycles for any date. Know your peak and critical days.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
          <div className="space-y-1.5">
            <Label>Your Birth Date</Label>
            <Input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} max={new Date().toISOString().split("T")[0]} />
          </div>
          <div className="space-y-1.5">
            <Label>Target Date</Label>
            <Input type="date" value={targetDate} onChange={e => setTargetDate(e.target.value)} />
            <p className="text-xs text-gray-400">Leave as today for your current biorhythm</p>
          </div>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate Biorhythm</Button>
          <Button variant="ghost" size="sm" onClick={reset} className="flex items-center gap-1.5">
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </Button>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {CYCLES.map(c => {
                const val = result[c.key as keyof typeof result];
                const phase = getPhase(val);
                const pct = (val * 100).toFixed(1);
                return (
                  <div key={c.key} className="rounded-xl border p-4 space-y-2" style={{ borderColor: c.color, background: `${c.color}08` }}>
                    <div className="flex items-center gap-2">
                      <span>{c.emoji}</span>
                      <span className="font-semibold text-sm" style={{ color: c.color }}>{c.label}</span>
                      <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: phase.color }}>{phase.label}</span>
                    </div>
                    <div className="text-2xl font-black" style={{ color: c.color }}>{Number(pct) >= 0 ? "+" : ""}{pct}%</div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{
                        width: `${Math.abs(val) * 100}%`,
                        backgroundColor: c.color,
                        marginLeft: val < 0 ? `${(1 - Math.abs(val)) * 100}%` : "0"
                      }} />
                    </div>
                    <p className="text-xs text-gray-500">{c.desc}</p>
                  </div>
                );
              })}
            </div>

            {showChart && chartData.length > 0 && (
              <div className="rounded-xl border border-gray-200 p-4">
                <p className="text-sm font-semibold text-gray-700 mb-4">28-Day Biorhythm Chart (±14 days)</p>
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" tick={{ fontSize: 10 }} interval={3} />
                    <YAxis domain={[-100, 100]} tick={{ fontSize: 10 }} tickFormatter={v => `${v}%`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                    <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="4 4" />
                    {CYCLES.map(c => (
                      <Line key={c.key} type="monotone" dataKey={c.key} name={c.label} stroke={c.color} strokeWidth={2} dot={false}
                        activeDot={{ r: 4, strokeWidth: 0 }} />
                    ))}
                    <ReferenceLine x="Today" stroke="#6366f1" strokeWidth={2} strokeDasharray="4 4" label={{ value: "Today", position: "top", fontSize: 10, fill: "#6366f1" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            <details className="rounded-lg border border-gray-200 overflow-hidden">
              <summary className="cursor-pointer px-4 py-3 bg-gray-50 text-sm font-semibold text-gray-700 hover:bg-gray-100 list-none">How do biorhythms work?</summary>
              <div className="px-4 py-4 text-sm text-gray-600 space-y-2 border-t border-gray-100">
                <p>Biorhythm theory proposes that three internal cycles begin at birth and continue throughout life:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li><strong>Physical (23 days):</strong> Affects strength, energy, endurance, and physical coordination.</li>
                  <li><strong>Emotional (28 days):</strong> Governs mood, creativity, sensitivity, and mental health.</li>
                  <li><strong>Intellectual (33 days):</strong> Influences memory, alertness, decision-making, and logic.</li>
                </ul>
                <p>When a cycle crosses zero (critical days), extra caution is advised. High points are ideal for performance; low points suggest rest.</p>
                <p className="text-xs text-gray-400">Biorhythm theory is for entertainment. It is not scientifically proven.</p>
              </div>
            </details>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
