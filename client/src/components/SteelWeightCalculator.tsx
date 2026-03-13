import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SteelWeightCalculator() {
  const [steelType, setSteelType] = useState("round-bar");
  const [diameter, setDiameter] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [thickness, setThickness] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [result, setResult] = useState<{ weightKg: number; weightTons: number; totalKg: number } | null>(null);

  const calculate = () => {
    const qty = parseFloat(quantity) || 1;
    let weightKg = 0;
    if (steelType === "round-bar") {
      const d = parseFloat(diameter);
      const l = parseFloat(length);
      if (d > 0 && l > 0) weightKg = (d * d / 162.2) * l;
    } else if (steelType === "plate" || steelType === "flat-bar") {
      const w = parseFloat(width);
      const t = parseFloat(thickness);
      const l = parseFloat(length);
      if (w > 0 && t > 0 && l > 0) weightKg = (w / 1000) * (t / 1000) * l * 7850;
    } else if (steelType === "pipe") {
      const od = parseFloat(diameter);
      const t = parseFloat(thickness);
      const l = parseFloat(length);
      if (od > 0 && t > 0 && l > 0) weightKg = ((od - t) * t * 0.02466) * l;
    }
    if (weightKg > 0) {
      setResult({ weightKg, weightTons: weightKg / 1000, totalKg: weightKg * qty });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-zinc-700" data-testid="steel-weight-calculator">
      <CardHeader>
        <CardTitle>Steel Weight Calculator</CardTitle>
        <CardDescription>Calculate the weight of steel bars, plates, and pipes.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Steel Type</Label>
            <Select value={steelType} onValueChange={setSteelType}>
              <SelectTrigger data-testid="select-steel-type"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="round-bar">Round Bar / Rebar</SelectItem>
                <SelectItem value="plate">Plate / Sheet</SelectItem>
                <SelectItem value="flat-bar">Flat Bar</SelectItem>
                <SelectItem value="pipe">Pipe / Tube</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Quantity</Label>
            <Input type="number" placeholder="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} data-testid="input-quantity" />
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {(steelType === "round-bar" || steelType === "pipe") && (
            <div className="space-y-2"><Label>Diameter (mm)</Label><Input type="number" placeholder="12" value={diameter} onChange={(e) => setDiameter(e.target.value)} data-testid="input-diameter" /></div>
          )}
          {(steelType === "plate" || steelType === "flat-bar") && (
            <div className="space-y-2"><Label>Width (mm)</Label><Input type="number" placeholder="200" value={width} onChange={(e) => setWidth(e.target.value)} data-testid="input-width" /></div>
          )}
          {(steelType === "plate" || steelType === "flat-bar" || steelType === "pipe") && (
            <div className="space-y-2"><Label>Thickness (mm)</Label><Input type="number" placeholder="10" value={thickness} onChange={(e) => setThickness(e.target.value)} data-testid="input-thickness" /></div>
          )}
          <div className="space-y-2"><Label>Length (meters)</Label><Input type="number" placeholder="6" value={length} onChange={(e) => setLength(e.target.value)} data-testid="input-length" /></div>
        </div>
        <Button onClick={calculate} className="w-full bg-zinc-700 hover:bg-zinc-800" data-testid="button-calculate">Calculate Weight</Button>
        {result && (
          <div className="grid grid-cols-3 gap-4 mt-4 animate-in fade-in" data-testid="result-section">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Per Piece</p>
              <p className="text-2xl font-bold text-zinc-700 dark:text-zinc-300" data-testid="text-weight-kg">{result.weightKg.toFixed(2)} kg</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Per Piece</p>
              <p className="text-2xl font-bold text-blue-600" data-testid="text-weight-tons">{result.weightTons.toFixed(4)} t</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Total ({quantity})</p>
              <p className="text-2xl font-bold text-green-600" data-testid="text-total-kg">{result.totalKg.toFixed(2)} kg</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
