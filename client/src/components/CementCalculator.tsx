import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CementCalculator() {
  const [area, setArea] = useState("");
  const [thickness, setThickness] = useState("");
  const [unit, setUnit] = useState("sqft");
  const [mixRatio, setMixRatio] = useState("1:2:4");
  const [result, setResult] = useState<{ cement: number; sand: number; aggregate: number; water: number; volume: number } | null>(null);

  const calculate = () => {
    const a = parseFloat(area);
    const t = parseFloat(thickness);
    if (a > 0 && t > 0) {
      let volumeM3 = unit === "sqft" ? (a * 0.0929) * (t * 0.0254) : (a * (t / 100));
      const dryVolume = volumeM3 * 1.54;
      const ratios: Record<string, [number, number, number]> = {
        "1:1.5:3": [1, 1.5, 3],
        "1:2:4": [1, 2, 4],
        "1:3:6": [1, 3, 6],
        "1:4:8": [1, 4, 8],
      };
      const [c, s, ag] = ratios[mixRatio] || [1, 2, 4];
      const total = c + s + ag;
      const cementM3 = dryVolume * (c / total);
      const cementBags = cementM3 / 0.035;
      const sandM3 = dryVolume * (s / total);
      const aggregateM3 = dryVolume * (ag / total);
      const water = cementBags * 50 * 0.5;
      setResult({ cement: Math.ceil(cementBags), sand: sandM3, aggregate: aggregateM3, water, volume: volumeM3 });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-yellow-700" data-testid="cement-calculator">
      <CardHeader>
        <CardTitle>Cement Calculator</CardTitle>
        <CardDescription>Calculate cement bags, sand, and aggregate needed for your construction project.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Area</Label>
            <div className="flex gap-2">
              <Input type="number" placeholder="500" value={area} onChange={(e) => setArea(e.target.value)} className="flex-1" data-testid="input-area" />
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger className="w-24" data-testid="select-unit"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="sqft">sq ft</SelectItem><SelectItem value="sqm">m²</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Thickness ({unit === "sqft" ? "inches" : "cm"})</Label>
            <Input type="number" placeholder={unit === "sqft" ? "4" : "10"} value={thickness} onChange={(e) => setThickness(e.target.value)} data-testid="input-thickness" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Mix Ratio (Cement:Sand:Aggregate)</Label>
          <Select value={mixRatio} onValueChange={setMixRatio}>
            <SelectTrigger data-testid="select-mix-ratio"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="1:1.5:3">1:1.5:3 (Rich - Structural)</SelectItem>
              <SelectItem value="1:2:4">1:2:4 (Standard)</SelectItem>
              <SelectItem value="1:3:6">1:3:6 (Lean - Foundation)</SelectItem>
              <SelectItem value="1:4:8">1:4:8 (Very Lean)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={calculate} className="w-full bg-yellow-700 hover:bg-yellow-800" data-testid="button-calculate">Calculate Materials</Button>
        {result && (
          <div className="space-y-4 mt-4 animate-in fade-in" data-testid="result-section">
            <div className="bg-muted/30 rounded-lg p-3 text-center"><p className="text-xs text-muted-foreground">Wet Volume: {result.volume.toFixed(3)} m³</p></div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-yellow-50 dark:bg-yellow-950/30 rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Cement</p>
                <p className="text-2xl font-bold text-yellow-700" data-testid="text-cement">{result.cement}</p>
                <p className="text-xs text-muted-foreground">bags (50kg)</p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Sand</p>
                <p className="text-2xl font-bold text-amber-600" data-testid="text-sand">{result.sand.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">m³</p>
              </div>
              <div className="bg-stone-50 dark:bg-stone-950/30 rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Aggregate</p>
                <p className="text-2xl font-bold text-stone-600" data-testid="text-aggregate">{result.aggregate.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">m³</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Water</p>
                <p className="text-2xl font-bold text-blue-600" data-testid="text-water">{Math.round(result.water)}</p>
                <p className="text-xs text-muted-foreground">liters</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
