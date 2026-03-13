import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SandCalculator() {
  const [area, setArea] = useState("");
  const [depth, setDepth] = useState("");
  const [areaUnit, setAreaUnit] = useState("sqft");
  const [depthUnit, setDepthUnit] = useState("inches");
  const [result, setResult] = useState<{ volumeM3: number; volumeCft: number; weightTons: number; weightKg: number } | null>(null);

  const calculate = () => {
    const a = parseFloat(area);
    const d = parseFloat(depth);
    if (a > 0 && d > 0) {
      let areaM2 = areaUnit === "sqft" ? a * 0.0929 : a;
      let depthM = depthUnit === "inches" ? d * 0.0254 : depthUnit === "cm" ? d / 100 : d;
      const volumeM3 = areaM2 * depthM;
      const volumeCft = volumeM3 * 35.3147;
      const weightKg = volumeM3 * 1600;
      const weightTons = weightKg / 1000;
      setResult({ volumeM3, volumeCft, weightTons, weightKg });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-amber-500" data-testid="sand-calculator">
      <CardHeader>
        <CardTitle>Sand Calculator</CardTitle>
        <CardDescription>Calculate the volume and weight of sand needed for your project.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Area</Label>
            <div className="flex gap-2">
              <Input type="number" placeholder="200" value={area} onChange={(e) => setArea(e.target.value)} className="flex-1" data-testid="input-area" />
              <Select value={areaUnit} onValueChange={setAreaUnit}>
                <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="sqft">sq ft</SelectItem><SelectItem value="sqm">m²</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Depth</Label>
            <div className="flex gap-2">
              <Input type="number" placeholder="3" value={depth} onChange={(e) => setDepth(e.target.value)} className="flex-1" data-testid="input-depth" />
              <Select value={depthUnit} onValueChange={setDepthUnit}>
                <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="inches">in</SelectItem><SelectItem value="cm">cm</SelectItem><SelectItem value="m">m</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <Button onClick={calculate} className="w-full bg-amber-500 hover:bg-amber-600" data-testid="button-calculate">Calculate</Button>
        {result && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 animate-in fade-in" data-testid="result-section">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Volume</p>
              <p className="text-xl font-bold text-amber-600" data-testid="text-volume-m3">{result.volumeM3.toFixed(2)} m³</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Volume</p>
              <p className="text-xl font-bold text-orange-600" data-testid="text-volume-cft">{result.volumeCft.toFixed(1)} cft</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Weight</p>
              <p className="text-xl font-bold text-blue-600" data-testid="text-weight-kg">{result.weightKg.toFixed(0)} kg</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Weight</p>
              <p className="text-xl font-bold text-green-600" data-testid="text-weight-tons">{result.weightTons.toFixed(2)} tons</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
