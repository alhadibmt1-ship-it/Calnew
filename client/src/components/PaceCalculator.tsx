import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PaceCalculator() {
  const [mode, setMode] = useState<"pace" | "time" | "distance">("pace");
  const [distance, setDistance] = useState("");
  const [distanceUnit, setDistanceUnit] = useState("miles");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [paceMin, setPaceMin] = useState("");
  const [paceSec, setPaceSec] = useState("");
  const [result, setResult] = useState<{ label: string; value: string; extras?: { label: string; value: string }[] } | null>(null);

  const calculate = () => {
    const dist = parseFloat(distance) || 0;
    const totalTimeSec = (parseInt(hours) || 0) * 3600 + (parseInt(minutes) || 0) * 60 + (parseInt(seconds) || 0);
    const totalPaceSec = (parseInt(paceMin) || 0) * 60 + (parseInt(paceSec) || 0);

    if (mode === "pace") {
      if (dist <= 0 || totalTimeSec <= 0) return;
      const pacePerUnit = totalTimeSec / dist;
      const pm = Math.floor(pacePerUnit / 60);
      const ps = Math.round(pacePerUnit % 60);
      const speedMph = dist / (totalTimeSec / 3600);
      const speedKmh = distanceUnit === "miles" ? speedMph * 1.60934 : speedMph;

      setResult({
        label: `Pace per ${distanceUnit === "miles" ? "mile" : "km"}`,
        value: `${pm}:${ps.toString().padStart(2, "0")} min/${distanceUnit === "miles" ? "mi" : "km"}`,
        extras: [
          { label: "Speed", value: `${speedMph.toFixed(2)} ${distanceUnit === "miles" ? "mph" : "km/h"}` },
        ],
      });
    } else if (mode === "time") {
      if (dist <= 0 || totalPaceSec <= 0) return;
      const totalTime = totalPaceSec * dist;
      const h = Math.floor(totalTime / 3600);
      const m = Math.floor((totalTime % 3600) / 60);
      const s = Math.round(totalTime % 60);
      setResult({
        label: "Total Time",
        value: `${h > 0 ? h + "h " : ""}${m}m ${s}s`,
      });
    } else if (mode === "distance") {
      if (totalTimeSec <= 0 || totalPaceSec <= 0) return;
      const d = totalTimeSec / totalPaceSec;
      setResult({
        label: "Distance",
        value: `${d.toFixed(2)} ${distanceUnit === "miles" ? "miles" : "km"}`,
      });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-orange-500">
      <CardHeader>
        <CardTitle>Pace Calculator</CardTitle>
        <CardDescription>Calculate your running or walking pace, time, or distance.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-2">
          <Label>Calculate</Label>
          <Select value={mode} onValueChange={(v: any) => { setMode(v); setResult(null); }} data-testid="select-mode">
            <SelectTrigger data-testid="select-mode-trigger">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pace">Pace</SelectItem>
              <SelectItem value="time">Time</SelectItem>
              <SelectItem value="distance">Distance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label>Distance Unit</Label>
          <Select value={distanceUnit} onValueChange={setDistanceUnit} data-testid="select-distance-unit">
            <SelectTrigger data-testid="select-distance-unit-trigger">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="miles">Miles</SelectItem>
              <SelectItem value="km">Kilometers</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {mode !== "distance" && (
          <div className="grid gap-2">
            <Label>Distance</Label>
            <Input data-testid="input-distance" type="number" placeholder="e.g. 5" value={distance} onChange={(e) => setDistance(e.target.value)} />
          </div>
        )}

        {mode !== "time" && (
          <div className="grid gap-2">
            <Label>Time</Label>
            <div className="grid grid-cols-3 gap-2">
              <div className="relative">
                <Input data-testid="input-hours" type="number" min="0" placeholder="0" value={hours} onChange={(e) => setHours(e.target.value)} />
                <span className="absolute right-3 top-2.5 text-muted-foreground text-sm">h</span>
              </div>
              <div className="relative">
                <Input data-testid="input-minutes" type="number" min="0" placeholder="0" value={minutes} onChange={(e) => setMinutes(e.target.value)} />
                <span className="absolute right-3 top-2.5 text-muted-foreground text-sm">m</span>
              </div>
              <div className="relative">
                <Input data-testid="input-seconds" type="number" min="0" placeholder="0" value={seconds} onChange={(e) => setSeconds(e.target.value)} />
                <span className="absolute right-3 top-2.5 text-muted-foreground text-sm">s</span>
              </div>
            </div>
          </div>
        )}

        {mode !== "pace" && (
          <div className="grid gap-2">
            <Label>Pace (per {distanceUnit === "miles" ? "mile" : "km"})</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <Input data-testid="input-pace-min" type="number" min="0" placeholder="8" value={paceMin} onChange={(e) => setPaceMin(e.target.value)} />
                <span className="absolute right-3 top-2.5 text-muted-foreground text-sm">min</span>
              </div>
              <div className="relative">
                <Input data-testid="input-pace-sec" type="number" min="0" placeholder="30" value={paceSec} onChange={(e) => setPaceSec(e.target.value)} />
                <span className="absolute right-3 top-2.5 text-muted-foreground text-sm">sec</span>
              </div>
            </div>
          </div>
        )}

        <Button data-testid="button-calculate" className="w-full bg-orange-500 hover:bg-orange-600 text-white" onClick={calculate}>Calculate</Button>

        {result && (
          <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-4">
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-800 text-center">
              <p className="text-sm text-muted-foreground uppercase tracking-wide" data-testid="text-result-label">{result.label}</p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400" data-testid="text-result-value">{result.value}</p>
            </div>
            {result.extras?.map((extra, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-muted/30 rounded border">
                <span className="font-medium">{extra.label}</span>
                <span className="font-bold text-orange-600" data-testid={`text-extra-${i}`}>{extra.value}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}