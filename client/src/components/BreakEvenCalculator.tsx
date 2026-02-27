import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = useState("");
  const [variableCost, setVariableCost] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [result, setResult] = useState<{
    breakEvenUnits: number;
    breakEvenRevenue: number;
    contributionMargin: number;
  } | null>(null);

  const calculate = () => {
    const fc = parseFloat(fixedCosts);
    const vc = parseFloat(variableCost);
    const sp = parseFloat(sellingPrice);

    if (fc > 0 && vc >= 0 && sp > vc) {
      const contributionMargin = sp - vc;
      const breakEvenUnits = fc / contributionMargin;
      const breakEvenRevenue = breakEvenUnits * sp;

      setResult({
        breakEvenUnits: Math.ceil(breakEvenUnits),
        breakEvenRevenue,
        contributionMargin,
      });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-blue-600">
      <CardHeader>
        <CardTitle>Break-Even Calculator</CardTitle>
        <CardDescription>Determine how many units you need to sell to cover all costs.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Fixed Costs ($)</Label>
            <Input
              data-testid="input-fixed-costs"
              type="number"
              value={fixedCosts}
              onChange={(e) => setFixedCosts(e.target.value)}
              placeholder="10000"
            />
          </div>
          <div className="space-y-2">
            <Label>Variable Cost / Unit ($)</Label>
            <Input
              data-testid="input-variable-cost"
              type="number"
              value={variableCost}
              onChange={(e) => setVariableCost(e.target.value)}
              placeholder="25"
            />
          </div>
          <div className="space-y-2">
            <Label>Selling Price / Unit ($)</Label>
            <Input
              data-testid="input-selling-price"
              type="number"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
              placeholder="50"
            />
          </div>
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full bg-blue-600 hover:bg-blue-700">Calculate Break-Even</Button>

        {result && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium">Break-Even Units</p>
              <p data-testid="text-break-even-units" className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                {result.breakEvenUnits.toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium">Break-Even Revenue</p>
              <p data-testid="text-break-even-revenue" className="text-2xl font-bold text-green-700 dark:text-green-400">
                ${result.breakEvenRevenue.toFixed(2)}
              </p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium">Contribution Margin</p>
              <p data-testid="text-contribution-margin" className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                ${result.contributionMargin.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}