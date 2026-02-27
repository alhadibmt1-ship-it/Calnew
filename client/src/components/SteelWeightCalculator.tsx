import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SteelWeightCalculator() {
  const [steelType, setSteelType] = useState("bar");
  const [diameter, setDiameter] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [thickness, setThickness] = useState("");
  const [outerDiameter, setOuterDiameter] = useState("");
  const [wallThickness, setWallThickness] = useState("");
  const [quantity, setQuantity] = useState("1");

  const [result, setResult] = useState<{
    weightKg: number;
    weightTons: number;
    totalWeightKg: number;
    totalWeightTons: number;
  } | null>(null);

  const calculate = () => {
    const qty = parseInt(quantity) || 1;
    const steelDensity = 7850;
    let weightKg = 0;

    if (steelType === "bar") {
      const d = parseFloat(diameter) || 0;
      const l = parseFloat(length) || 0;
      if (d <= 0 || l <= 0) return;
      weightKg = (d * d / 162.2) * l;
    } else if (steelType === "plate") {
      const l = parseFloat(length) || 0;
      const w = parseFloat(width) || 0;
      const t = parseFloat(thickness) || 0;
      if (l <= 0 || w <= 0 || t <= 0) return;
      const volumeM3 = (l / 1000) * (w / 1000) * (t / 1000);
      weightKg = volumeM3 * steelDensity;
    } else if (steelType === "pipe") {
      const od = parseFloat(outerDiameter) || 0;
      const wt = parseFloat(wallThickness) || 0;
      const l = parseFloat(length) || 0;
      if (od <= 0 || wt <= 0 || l <= 0) return;
      const id = od - 2 * wt;
      const volumeM3 = (Math.PI / 4) * ((od / 1000) ** 2 - (id / 1000) ** 2) * (l / 1000);
      weightKg = volumeM3 * steelDensity;
    } else if (steelType === "angle") {
      return;
    }

    setResult({
      weightKg,
      weightTons: weightKg / 1000,
      totalWeightKg: weightKg * qty,
      totalWeightTons: (weightKg * qty) / 1000,
    });
  };

  const calculateAngle = () => {
    const legA = parseFloat(length) || 0;
    const legB = parseFloat(width) || 0;
    const thk = parseFloat(thickness) || 0;
    const barLen = parseFloat(outerDiameter) || 0;
    const qty = parseInt(quantity) || 1;
    if (legA <= 0 || legB <= 0 || thk <= 0 || barLen <= 0) return;
    const areaMm2 = (legA + legB - thk) * thk;
    const volumeMm3 = areaMm2 * barLen * 1000;
    const volumeM3 = volumeMm3 / 1e9;
    const weightKg = volumeM3 * 7850;

    setResult({
      weightKg,
      weightTons: weightKg / 1000,
      totalWeightKg: weightKg * qty,
      totalWeightTons: (weightKg * qty) / 1000,
    });
  };

  const handleCalculate = () => {
    if (steelType === "angle") {
      calculateAngle();
    } else {
      calculate();
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle data-testid="text-title">Steel Weight Calculator</CardTitle>
        <CardDescription>Calculate the weight of steel bars, plates, pipes, and angles.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Steel Type</Label>
          <Select value={steelType} onValueChange={(v) => { setSteelType(v); setResult(null); }}>
            <SelectTrigger data-testid="select-steel-type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bar">Round Bar / Rebar</SelectItem>
              <SelectItem value="plate">Steel Plate / Sheet</SelectItem>
              <SelectItem value="pipe">Steel Pipe / Tube</SelectItem>
              <SelectItem value="angle">Angle Iron</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {steelType === "bar" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Diameter (mm)</Label>
              <Input data-testid="input-diameter" type="number" value={diameter} onChange={(e) => setDiameter(e.target.value)} placeholder="e.g. 12" />
            </div>
            <div className="space-y-2">
              <Label>Length (meters)</Label>
              <Input data-testid="input-length" type="number" value={length} onChange={(e) => setLength(e.target.value)} placeholder="e.g. 12" />
            </div>
          </div>
        )}

        {steelType === "plate" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Length (mm)</Label>
              <Input data-testid="input-length" type="number" value={length} onChange={(e) => setLength(e.target.value)} placeholder="e.g. 2000" />
            </div>
            <div className="space-y-2">
              <Label>Width (mm)</Label>
              <Input data-testid="input-width" type="number" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="e.g. 1000" />
            </div>
            <div className="space-y-2">
              <Label>Thickness (mm)</Label>
              <Input data-testid="input-thickness" type="number" value={thickness} onChange={(e) => setThickness(e.target.value)} placeholder="e.g. 10" />
            </div>
          </div>
        )}

        {steelType === "pipe" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Outer Diameter (mm)</Label>
              <Input data-testid="input-outer-diameter" type="number" value={outerDiameter} onChange={(e) => setOuterDiameter(e.target.value)} placeholder="e.g. 60" />
            </div>
            <div className="space-y-2">
              <Label>Wall Thickness (mm)</Label>
              <Input data-testid="input-wall-thickness" type="number" value={wallThickness} onChange={(e) => setWallThickness(e.target.value)} placeholder="e.g. 3" />
            </div>
            <div className="space-y-2">
              <Label>Length (mm)</Label>
              <Input data-testid="input-length" type="number" value={length} onChange={(e) => setLength(e.target.value)} placeholder="e.g. 6000" />
            </div>
          </div>
        )}

        {steelType === "angle" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Leg A (mm)</Label>
              <Input data-testid="input-leg-a" type="number" value={length} onChange={(e) => setLength(e.target.value)} placeholder="e.g. 50" />
            </div>
            <div className="space-y-2">
              <Label>Leg B (mm)</Label>
              <Input data-testid="input-leg-b" type="number" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="e.g. 50" />
            </div>
            <div className="space-y-2">
              <Label>Thickness (mm)</Label>
              <Input data-testid="input-thickness" type="number" value={thickness} onChange={(e) => setThickness(e.target.value)} placeholder="e.g. 5" />
            </div>
            <div className="space-y-2">
              <Label>Length (meters)</Label>
              <Input data-testid="input-angle-length" type="number" value={outerDiameter} onChange={(e) => setOuterDiameter(e.target.value)} placeholder="e.g. 6" />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label>Quantity</Label>
          <Input data-testid="input-quantity" type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="1" />
        </div>

        <Button data-testid="button-calculate" className="w-full" onClick={handleCalculate}>
          Calculate Weight
        </Button>

        {result && (
          <div className="mt-6 space-y-4 animate-in fade-in-50">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Weight per Piece</p>
                <p data-testid="text-weight-kg" className="text-2xl font-bold text-primary">{result.weightKg.toFixed(2)} kg</p>
                <p className="text-xs text-muted-foreground">({result.weightTons.toFixed(4)} tons)</p>
              </div>
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Total Weight</p>
                <p data-testid="text-total-weight-kg" className="text-2xl font-bold text-primary">{result.totalWeightKg.toFixed(2)} kg</p>
                <p className="text-xs text-muted-foreground">({result.totalWeightTons.toFixed(4)} tons)</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              *Steel density: 7,850 kg/m³. For bars, formula: D²/162.2 × Length (m).
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}