import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ConcreteMixCalculator() {
  const [volume, setVolume] = useState("");
  const [volumeUnit, setVolumeUnit] = useState("m3");
  const [mixRatio, setMixRatio] = useState("1:2:4");
  const [result, setResult] = useState<{ cement: number; sand: number; aggregate: number; water: number } | null>(null);

  const calculate = () => {
    let v = parseFloat(volume);
    if (v > 0) {
      if (volumeUnit === "cft") v *= 0.0283168;
      if (volumeUnit === "cuyd") v *= 0.764555;
      const dryVolume = v * 1.54;
      const ratios: Record<string, [number, number, number]> = {
        "1:1.5:3": [1, 1.5, 3], "1:2:4": [1, 2, 4], "1:3:6": [1, 3, 6],
      };
      const [c, s, ag] = ratios[mixRatio] || [1, 2, 4];
      const total = c + s + ag;
      const cementBags = (dryVolume * (c / total)) / 0.035;
      const sandCft = dryVolume * (s / total) * 35.3147;
      const aggCft = dryVolume * (ag / total) * 35.3147;
      const water = cementBags * 50 * 0.5;
      setResult({ cement: Math.ceil(cementBags), sand: sandCft, aggregate: aggCft, water });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-stone-600" data-testid="concrete-mix-calculator">
      <CardHeader>
        <CardTitle>Concrete Mix Calculator</CardTitle>
        <CardDescription>Calculate cement, sand, aggregate, and water for a given volume of concrete.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Volume of Concrete</Label>
            <div className="flex gap-2">
              <Input type="number" placeholder="10" value={volume} onChange={(e) => setVolume(e.target.value)} className="flex-1" data-testid="input-volume" />
              <Select value={volumeUnit} onValueChange={setVolumeUnit}>
                <SelectTrigger className="w-24" data-testid="select-volume-unit"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="m3">m³</SelectItem><SelectItem value="cft">cft</SelectItem><SelectItem value="cuyd">cu yd</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Mix Ratio</Label>
            <Select value={mixRatio} onValueChange={setMixRatio}>
              <SelectTrigger data-testid="select-mix"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1:1.5:3">1:1.5:3 (M20 - Structural)</SelectItem>
                <SelectItem value="1:2:4">1:2:4 (M15 - Standard)</SelectItem>
                <SelectItem value="1:3:6">1:3:6 (M10 - Lean)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={calculate} className="w-full bg-stone-600 hover:bg-stone-700" data-testid="button-calculate">Calculate Mix</Button>
        {result && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 animate-in fade-in" data-testid="result-section">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Cement</p>
              <p className="text-2xl font-bold text-yellow-700" data-testid="text-cement">{result.cement}</p>
              <p className="text-xs text-muted-foreground">bags (50kg)</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Sand</p>
              <p className="text-2xl font-bold text-amber-600" data-testid="text-sand">{result.sand.toFixed(1)}</p>
              <p className="text-xs text-muted-foreground">cft</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Aggregate</p>
              <p className="text-2xl font-bold text-stone-600" data-testid="text-aggregate">{result.aggregate.toFixed(1)}</p>
              <p className="text-xs text-muted-foreground">cft</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Water</p>
              <p className="text-2xl font-bold text-blue-600" data-testid="text-water">{Math.round(result.water)}</p>
              <p className="text-xs text-muted-foreground">liters</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
