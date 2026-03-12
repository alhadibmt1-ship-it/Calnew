import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RefinanceBreakEvenCalculator() {
  const [values, setValues] = useState({
    currentPmt: "1800",
    newPmt: "1550",
    closingCosts: "5000",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const cur=parseFloat(s.currentPmt)||0;const newP=parseFloat(s.newPmt)||0;const costs=parseFloat(s.closingCosts)||0;
      const savings=cur-newP;const months=savings>0?Math.ceil(costs/savings):0;
      return{"Monthly Savings":"$"+savings.toFixed(2),"Break Even Point":months+" months","Break Even":"~"+(months/12).toFixed(1)+" years","5-Year Savings":"$"+(savings*60-costs).toFixed(0),"10-Year Savings":"$"+(savings*120-costs).toFixed(0)};
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="refinance-break-even-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Refinance Break Even Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="currentPmt">Current Payment ($)</label>
              <Input
                id="currentPmt"
                data-testid="input-currentPmt"
                type="number"
                value={values.currentPmt}
                onChange={(e) => setValues({...values, currentPmt: e.target.value})}
                placeholder="Current Payment ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="newPmt">New Payment ($)</label>
              <Input
                id="newPmt"
                data-testid="input-newPmt"
                type="number"
                value={values.newPmt}
                onChange={(e) => setValues({...values, newPmt: e.target.value})}
                placeholder="New Payment ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="closingCosts">Closing Costs ($)</label>
              <Input
                id="closingCosts"
                data-testid="input-closingCosts"
                type="number"
                value={values.closingCosts}
                onChange={(e) => setValues({...values, closingCosts: e.target.value})}
                placeholder="Closing Costs ($)"
              />
            </div>
        </div>
        <Button onClick={handleCalculate} className="w-full" data-testid="button-calculate">Calculate</Button>
        {results && (
          <div className="bg-muted rounded-lg p-4 space-y-2" data-testid="results">
            {Object.entries(results).map(([key, val]) => (
              <div key={key} className="flex justify-between">
                <span className="text-muted-foreground">{key}</span>
                <span className="font-semibold">{val}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
