import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SquareFootageCalculator() {
  const [shape, setShape] = useState("rectangle");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [radius, setRadius] = useState("");
  const [base, setBase] = useState("");
  const [height, setHeight] = useState("");
  const [pricePerSqFt, setPricePerSqFt] = useState("");
  const [result, setResult] = useState<{ sqFt: number; sqM: number; sqYd: number; cost: number | null } | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);
    let area = 0;

    if (shape === "rectangle") {
      const l = parseFloat(length);
      const w = parseFloat(width);
      if (isNaN(l) || isNaN(w) || l <= 0 || w <= 0) {
        setError("Please enter valid positive dimensions.");
        return;
      }
      area = l * w;
    } else if (shape === "circle") {
      const r = parseFloat(radius);
      if (isNaN(r) || r <= 0) {
        setError("Please enter a valid positive radius.");
        return;
      }
      area = Math.PI * r * r;
    } else if (shape === "triangle") {
      const b = parseFloat(base);
      const h = parseFloat(height);
      if (isNaN(b) || isNaN(h) || b <= 0 || h <= 0) {
        setError("Please enter valid positive dimensions.");
        return;
      }
      area = 0.5 * b * h;
    }

    const sqM = area * 0.092903;
    const sqYd = area * 0.111111;
    const price = parseFloat(pricePerSqFt);
    const cost = !isNaN(price) && price > 0 ? area * price : null;

    setResult({ sqFt: area, sqM, sqYd, cost });
  };

  return (
    <Card className="w-full border-t-4 border-t-orange-500">
      <CardHeader>
        <CardTitle>Square Footage Calculator</CardTitle>
        <CardDescription>
          Calculate area in square feet, square meters, and square yards. Optionally estimate costs.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Shape</Label>
          <Select value={shape} onValueChange={(v) => { setShape(v); setResult(null); }} data-testid="select-shape">
            <SelectTrigger data-testid="trigger-shape">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rectangle">Rectangle</SelectItem>
              <SelectItem value="circle">Circle</SelectItem>
              <SelectItem value="triangle">Triangle</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {shape === "rectangle" && (
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Length (ft)</Label>
              <Input data-testid="input-length" type="number" value={length} onChange={(e) => setLength(e.target.value)} placeholder="20" />
            </div>
            <div className="space-y-2">
              <Label>Width (ft)</Label>
              <Input data-testid="input-width" type="number" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="15" />
            </div>
          </div>
        )}

        {shape === "circle" && (
          <div className="space-y-2">
            <Label>Radius (ft)</Label>
            <Input data-testid="input-radius" type="number" value={radius} onChange={(e) => setRadius(e.target.value)} placeholder="10" />
          </div>
        )}

        {shape === "triangle" && (
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Base (ft)</Label>
              <Input data-testid="input-base" type="number" value={base} onChange={(e) => setBase(e.target.value)} placeholder="20" />
            </div>
            <div className="space-y-2">
              <Label>Height (ft)</Label>
              <Input data-testid="input-height" type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="10" />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label>Price per sq ft (optional)</Label>
          <Input data-testid="input-price" type="number" value={pricePerSqFt} onChange={(e) => setPricePerSqFt(e.target.value)} placeholder="5.00" />
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full bg-orange-600 hover:bg-orange-700">Calculate</Button>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-lg text-center">
            <p className="text-red-600 dark:text-red-400" data-testid="text-error">{error}</p>
          </div>
        )}

        {result && (
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 text-center">
              <p className="text-xs text-muted-foreground uppercase">Square Feet</p>
              <p className="text-2xl font-bold text-orange-600" data-testid="text-sq-ft">{result.sqFt.toFixed(2)} ft²</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900/20 rounded-lg border border-slate-100 text-center">
              <p className="text-xs text-muted-foreground uppercase">Square Meters</p>
              <p className="text-2xl font-bold" data-testid="text-sq-m">{result.sqM.toFixed(2)} m²</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900/20 rounded-lg border border-slate-100 text-center">
              <p className="text-xs text-muted-foreground uppercase">Square Yards</p>
              <p className="text-2xl font-bold" data-testid="text-sq-yd">{result.sqYd.toFixed(2)} yd²</p>
            </div>
            {result.cost !== null && (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 text-center">
                <p className="text-xs text-muted-foreground uppercase">Estimated Cost</p>
                <p className="text-2xl font-bold text-green-600" data-testid="text-cost">${result.cost.toFixed(2)}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}