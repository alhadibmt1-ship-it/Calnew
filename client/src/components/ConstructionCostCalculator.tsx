import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const QUALITY_RATES: Record<string, { rate: number; label: string }> = {
  economy: { rate: 80, label: "Economy ($80/sqft)" },
  standard: { rate: 130, label: "Standard ($130/sqft)" },
  premium: { rate: 200, label: "Premium ($200/sqft)" },
  luxury: { rate: 300, label: "Luxury ($300/sqft)" },
};

export default function ConstructionCostCalculator() {
  const [area, setArea] = useState("");
  const [quality, setQuality] = useState("standard");
  const [locationFactor, setLocationFactor] = useState("1.0");
  const [result, setResult] = useState<{ totalCost: number; costPerSqft: number; structure: number; finishing: number; electrical: number; plumbing: number } | null>(null);

  const calculate = () => {
    const a = parseFloat(area);
    const lf = parseFloat(locationFactor) || 1.0;
    if (a > 0) {
      const rate = QUALITY_RATES[quality]?.rate || 130;
      const totalCost = a * rate * lf;
      setResult({
        totalCost,
        costPerSqft: rate * lf,
        structure: totalCost * 0.40,
        finishing: totalCost * 0.30,
        electrical: totalCost * 0.15,
        plumbing: totalCost * 0.15,
      });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-orange-700" data-testid="construction-cost-calculator">
      <CardHeader>
        <CardTitle>Construction Cost Calculator</CardTitle>
        <CardDescription>Estimate total construction cost based on area, quality, and location.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2"><Label>Built-up Area (sq ft)</Label><Input type="number" placeholder="1500" value={area} onChange={(e) => setArea(e.target.value)} data-testid="input-area" /></div>
          <div className="space-y-2">
            <Label>Construction Quality</Label>
            <Select value={quality} onValueChange={setQuality}>
              <SelectTrigger data-testid="select-quality"><SelectValue /></SelectTrigger>
              <SelectContent>{Object.entries(QUALITY_RATES).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2"><Label>Location Factor</Label><Input type="number" step="0.1" placeholder="1.0" value={locationFactor} onChange={(e) => setLocationFactor(e.target.value)} data-testid="input-location" /></div>
        </div>
        <Button onClick={calculate} className="w-full bg-orange-700 hover:bg-orange-800" data-testid="button-calculate">Estimate Cost</Button>
        {result && (
          <div className="space-y-4 mt-4 animate-in fade-in" data-testid="result-section">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-orange-50 dark:bg-orange-950/30 rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Total Estimated Cost</p>
                <p className="text-2xl font-bold text-orange-700" data-testid="text-total">${result.totalCost.toLocaleString()}</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Cost Per Sq Ft</p>
                <p className="text-2xl font-bold text-blue-600" data-testid="text-per-sqft">${result.costPerSqft.toFixed(0)}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground uppercase">Cost Breakdown</p>
              {[
                { label: "Structure (40%)", value: result.structure, color: "bg-orange-500" },
                { label: "Finishing (30%)", value: result.finishing, color: "bg-blue-500" },
                { label: "Electrical (15%)", value: result.electrical, color: "bg-yellow-500" },
                { label: "Plumbing (15%)", value: result.plumbing, color: "bg-teal-500" },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><div className={`w-3 h-3 rounded-full ${item.color}`} /><span className="text-sm">{item.label}</span></div>
                  <span className="text-sm font-medium">${item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
