import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ConcreteMixCalculator() {
  const [volume, setVolume] = useState("");
  const [mixRatio, setMixRatio] = useState("1:2:4");

  const [result, setResult] = useState<{
    cementBags: number;
    sandCft: number;
    aggregateCft: number;
    waterLiters: number;
  } | null>(null);

  const calculate = () => {
    const volumeVal = parseFloat(volume) || 0;
    if (volumeVal <= 0) return;

    const dryVolume = volumeVal * 1.54;

    const ratios: Record<string, [number, number, number]> = {
      "1:1.5:3": [1, 1.5, 3],
      "1:2:4": [1, 2, 4],
      "1:3:6": [1, 3, 6],
    };

    const [c, s, a] = ratios[mixRatio] || [1, 2, 4];
    const totalParts = c + s + a;

    const cementM3 = (c / totalParts) * dryVolume;
    const sandM3 = (s / totalParts) * dryVolume;
    const aggregateM3 = (a / totalParts) * dryVolume;

    const cementBags = Math.ceil(cementM3 / 0.035);
    const sandCft = sandM3 * 35.3147;
    const aggregateCft = aggregateM3 * 35.3147;
    const waterLiters = cementBags * 50 * 0.5;

    setResult({
      cementBags,
      sandCft,
      aggregateCft,
      waterLiters,
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle data-testid="text-title">Concrete Mix Calculator</CardTitle>
        <CardDescription>Calculate exact quantities of cement, sand, aggregate, and water for your concrete mix.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Volume of Concrete Needed (m³)</Label>
            <Input
              data-testid="input-volume"
              type="number"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              placeholder="e.g. 1.5"
            />
          </div>
          <div className="space-y-2">
            <Label>Mix Ratio (Cement : Sand : Aggregate)</Label>
            <Select value={mixRatio} onValueChange={setMixRatio}>
              <SelectTrigger data-testid="select-mix-ratio">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1:1.5:3">1 : 1.5 : 3 (High Strength - M20)</SelectItem>
                <SelectItem value="1:2:4">1 : 2 : 4 (Standard - M15)</SelectItem>
                <SelectItem value="1:3:6">1 : 3 : 6 (Lean Mix - M10)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button data-testid="button-calculate" className="w-full" onClick={calculate}>
          Calculate Mix
        </Button>

        {result && (
          <div className="mt-6 space-y-4 animate-in fade-in-50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                <span data-testid="text-cement-bags" className="text-3xl font-bold text-foreground">{result.cementBags}</span>
                <span className="text-sm text-muted-foreground text-center">Cement Bags</span>
                <span className="text-xs text-muted-foreground">(50 kg each)</span>
              </div>
              <div className="flex flex-col items-center p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                <span data-testid="text-sand-cft" className="text-3xl font-bold text-foreground">{result.sandCft.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground text-center">Sand (cft)</span>
              </div>
              <div className="flex flex-col items-center p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                <span data-testid="text-aggregate-cft" className="text-3xl font-bold text-foreground">{result.aggregateCft.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground text-center">Aggregate (cft)</span>
              </div>
              <div className="flex flex-col items-center p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                <span data-testid="text-water-liters" className="text-3xl font-bold text-foreground">{result.waterLiters.toFixed(0)}</span>
                <span className="text-sm text-muted-foreground text-center">Water (liters)</span>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Mix Ratio: {mixRatio}</h3>
              <p className="text-sm text-muted-foreground">
                For every {mixRatio.split(":")[0]} part of cement, use {mixRatio.split(":")[1]} parts sand and {mixRatio.split(":")[2]} parts aggregate.
                Water-cement ratio assumed at 0.5.
              </p>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              *Dry volume factor of 1.54 applied. Actual requirements may vary based on site conditions.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}