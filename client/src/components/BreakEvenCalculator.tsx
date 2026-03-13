import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = useState("");
  const [variableCost, setVariableCost] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [result, setResult] = useState<{ units: number; revenue: number; contributionMargin: number } | null>(null);

  const calculate = () => {
    const fc = parseFloat(fixedCosts);
    const vc = parseFloat(variableCost);
    const sp = parseFloat(sellingPrice);
    if (fc > 0 && sp > vc && vc >= 0) {
      const cm = sp - vc;
      const units = Math.ceil(fc / cm);
      const revenue = units * sp;
      setResult({ units, revenue, contributionMargin: cm });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-orange-600" data-testid="break-even-calculator">
      <CardHeader>
        <CardTitle>Break-Even Calculator</CardTitle>
        <CardDescription>Find how many units you need to sell to cover your costs.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Total Fixed Costs ($)</Label>
          <Input type="number" placeholder="10000" value={fixedCosts} onChange={(e) => setFixedCosts(e.target.value)} data-testid="input-fixed-costs" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Variable Cost per Unit ($)</Label>
            <Input type="number" placeholder="15" value={variableCost} onChange={(e) => setVariableCost(e.target.value)} data-testid="input-variable-cost" />
          </div>
          <div className="space-y-2">
            <Label>Selling Price per Unit ($)</Label>
            <Input type="number" placeholder="25" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} data-testid="input-selling-price" />
          </div>
        </div>
        <Button onClick={calculate} className="w-full bg-orange-600 hover:bg-orange-700" data-testid="button-calculate">Calculate Break-Even</Button>
        {result && (
          <div className="mt-4 space-y-4 animate-in fade-in" data-testid="result-section">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Break-Even Units</p>
                <p className="text-2xl font-bold text-orange-600" data-testid="text-units">{result.units.toLocaleString()}</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Break-Even Revenue</p>
                <p className="text-2xl font-bold text-blue-600" data-testid="text-revenue">${result.revenue.toLocaleString()}</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Contribution Margin</p>
                <p className="text-2xl font-bold text-green-600" data-testid="text-margin">${result.contributionMargin.toFixed(2)}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center">You need to sell at least <strong>{result.units.toLocaleString()}</strong> units to break even.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
