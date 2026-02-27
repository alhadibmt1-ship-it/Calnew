import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CementCalculator() {
  const [area, setArea] = useState("");
  const [thickness, setThickness] = useState("");
  const [unit, setUnit] = useState("sqm");
  const [mixRatio, setMixRatio] = useState("1:2:4");

  const [result, setResult] = useState<{
    cementBags: number;
    sandVolumeCft: number;
    aggregateVolumeCft: number;
    totalVolume: number;
  } | null>(null);

  const calculate = () => {
    const areaVal = parseFloat(area) || 0;
    const thicknessVal = parseFloat(thickness) || 0;
    if (areaVal <= 0 || thicknessVal <= 0) return;

    let areaM2 = areaVal;
    if (unit === "sqft") {
      areaM2 = areaVal * 0.0929;
    }

    const thicknessM = thicknessVal / 1000;
    const volumeM3 = areaM2 * thicknessM;
    const dryVolume = volumeM3 * 1.54;

    const ratios: Record<string, [number, number, number]> = {
      "1:2:4": [1, 2, 4],
      "1:1.5:3": [1, 1.5, 3],
      "1:3:6": [1, 3, 6],
      "1:4:8": [1, 4, 8],
    };

    const [c, s, a] = ratios[mixRatio] || [1, 2, 4];
    const totalParts = c + s + a;

    const cementM3 = (c / totalParts) * dryVolume;
    const sandM3 = (s / totalParts) * dryVolume;
    const aggregateM3 = (a / totalParts) * dryVolume;

    const cementBags = Math.ceil(cementM3 / 0.035);
    const sandVolumeCft = sandM3 * 35.3147;
    const aggregateVolumeCft = aggregateM3 * 35.3147;

    setResult({
      cementBags,
      sandVolumeCft,
      aggregateVolumeCft,
      totalVolume: volumeM3,
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle data-testid="text-title">Cement Calculator</CardTitle>
        <CardDescription>Calculate cement bags, sand, and aggregate needed based on area, thickness, and mix ratio.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Area</Label>
            <Input
              data-testid="input-area"
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="e.g. 100"
            />
          </div>
          <div className="space-y-2">
            <Label>Unit</Label>
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger data-testid="select-unit">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sqm">Square Meters (m²)</SelectItem>
                <SelectItem value="sqft">Square Feet (sqft)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Thickness (mm)</Label>
            <Input
              data-testid="input-thickness"
              type="number"
              value={thickness}
              onChange={(e) => setThickness(e.target.value)}
              placeholder="e.g. 150"
            />
          </div>
          <div className="space-y-2">
            <Label>Mix Ratio (Cement : Sand : Aggregate)</Label>
            <Select value={mixRatio} onValueChange={setMixRatio}>
              <SelectTrigger data-testid="select-mix-ratio">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1:1.5:3">1 : 1.5 : 3 (Strong)</SelectItem>
                <SelectItem value="1:2:4">1 : 2 : 4 (Standard)</SelectItem>
                <SelectItem value="1:3:6">1 : 3 : 6 (Lean)</SelectItem>
                <SelectItem value="1:4:8">1 : 4 : 8 (Very Lean)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button data-testid="button-calculate" className="w-full" onClick={calculate}>
          Calculate Materials
        </Button>

        {result && (
          <div className="mt-6 space-y-4 animate-in fade-in-50">
            <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Wet Volume</p>
              <p data-testid="text-total-volume" className="text-2xl font-bold text-primary">{result.totalVolume.toFixed(3)} m³</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                <span data-testid="text-cement-bags" className="text-3xl font-bold text-foreground">{result.cementBags}</span>
                <span className="text-sm text-muted-foreground">Cement Bags</span>
                <span className="text-xs text-muted-foreground">(50 kg each)</span>
              </div>
              <div className="flex flex-col items-center p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                <span data-testid="text-sand-volume" className="text-3xl font-bold text-foreground">{result.sandVolumeCft.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">Sand (cft)</span>
              </div>
              <div className="flex flex-col items-center p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                <span data-testid="text-aggregate-volume" className="text-3xl font-bold text-foreground">{result.aggregateVolumeCft.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">Aggregate (cft)</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              *Dry volume factor of 1.54 applied. Always buy 5-10% extra for wastage.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}