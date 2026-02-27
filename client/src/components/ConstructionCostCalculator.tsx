import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ConstructionCostCalculator() {
  const [area, setArea] = useState("");
  const [quality, setQuality] = useState("standard");
  const [locationFactor, setLocationFactor] = useState("1.0");
  const [result, setResult] = useState<{
    totalCost: number;
    costPerSqft: number;
    materialCost: number;
    laborCost: number;
    overheadCost: number;
  } | null>(null);

  const qualityRates: Record<string, { rate: number; materialPct: number; laborPct: number; overheadPct: number }> = {
    economy: { rate: 80, materialPct: 0.55, laborPct: 0.35, overheadPct: 0.10 },
    standard: { rate: 130, materialPct: 0.50, laborPct: 0.35, overheadPct: 0.15 },
    premium: { rate: 200, materialPct: 0.45, laborPct: 0.35, overheadPct: 0.20 },
    luxury: { rate: 300, materialPct: 0.40, laborPct: 0.35, overheadPct: 0.25 },
  };

  const calculate = () => {
    const a = parseFloat(area);
    const lf = parseFloat(locationFactor);

    if (a > 0 && lf > 0) {
      const q = qualityRates[quality];
      const costPerSqft = q.rate * lf;
      const totalCost = a * costPerSqft;
      const materialCost = totalCost * q.materialPct;
      const laborCost = totalCost * q.laborPct;
      const overheadCost = totalCost * q.overheadPct;

      setResult({ totalCost, costPerSqft, materialCost, laborCost, overheadCost });
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle data-testid="text-title">Construction Cost Calculator</CardTitle>
        <CardDescription>Estimate total construction cost based on built-up area, quality level, and location.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Built-Up Area (sq ft)</Label>
          <Input data-testid="input-area" type="number" value={area} onChange={(e) => setArea(e.target.value)} placeholder="1500" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Construction Quality</Label>
            <Select value={quality} onValueChange={setQuality}>
              <SelectTrigger data-testid="select-quality">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="economy">Economy (~$80/sqft)</SelectItem>
                <SelectItem value="standard">Standard (~$130/sqft)</SelectItem>
                <SelectItem value="premium">Premium (~$200/sqft)</SelectItem>
                <SelectItem value="luxury">Luxury (~$300/sqft)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Location Factor</Label>
            <Input data-testid="input-location-factor" type="number" value={locationFactor} onChange={(e) => setLocationFactor(e.target.value)} placeholder="1.0" step="0.1" min="0.5" max="3.0" />
            <p className="text-xs text-muted-foreground">1.0 = average, 1.3 = high-cost area, 0.8 = low-cost area</p>
          </div>
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full">Estimate Cost</Button>

        {result && (
          <div className="space-y-4 pt-4 animate-in fade-in-50">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-xs text-muted-foreground uppercase">Total Estimated Cost</p>
                <p data-testid="text-total-cost" className="text-2xl font-bold text-primary">${result.totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground uppercase">Cost Per Sq Ft</p>
                <p data-testid="text-cost-per-sqft" className="text-2xl font-bold">${result.costPerSqft.toFixed(2)}</p>
              </div>
            </div>
            <div className="border rounded-lg p-4 space-y-3">
              <h3 className="font-semibold">Cost Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Materials</span>
                  <span data-testid="text-material-cost" className="font-medium">${result.materialCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Labor</span>
                  <span data-testid="text-labor-cost" className="font-medium">${result.laborCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Overhead & Permits</span>
                  <span data-testid="text-overhead-cost" className="font-medium">${result.overheadCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">*These are rough estimates. Actual costs vary by region, materials, and project specifics.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}