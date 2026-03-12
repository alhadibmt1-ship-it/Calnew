import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CompoundInterestMonthlyCalculator() {
  const [values, setValues] = useState({
    principal: "10000",
    rate: "7",
    years: "20",
    monthly: "200",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const p=parseFloat(s.principal)||0;const r=(parseFloat(s.rate)||0)/100;const y=parseFloat(s.years)||0;const m=parseFloat(s.monthly)||0;
      const n=12;const total=p*Math.pow(1+r/n,n*y)+m*((Math.pow(1+r/n,n*y)-1)/(r/n));const totalContrib=p+m*n*y;
      return{"Final Balance":"$"+total.toFixed(2),"Total Contributed":"$"+totalContrib.toFixed(0),"Interest Earned":"$"+(total-totalContrib).toFixed(2),"Growth":((total/totalContrib-1)*100).toFixed(1)+"%"};
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="compound-interest-monthly-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Compound Interest Monthly Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="principal">Principal ($)</label>
              <Input
                id="principal"
                data-testid="input-principal"
                type="number"
                value={values.principal}
                onChange={(e) => setValues({...values, principal: e.target.value})}
                placeholder="Principal ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="rate">Annual Rate (%)</label>
              <Input
                id="rate"
                data-testid="input-rate"
                type="number"
                value={values.rate}
                onChange={(e) => setValues({...values, rate: e.target.value})}
                placeholder="Annual Rate (%)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="years">Years</label>
              <Input
                id="years"
                data-testid="input-years"
                type="number"
                value={values.years}
                onChange={(e) => setValues({...values, years: e.target.value})}
                placeholder="Years"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="monthly">Monthly Contribution ($)</label>
              <Input
                id="monthly"
                data-testid="input-monthly"
                type="number"
                value={values.monthly}
                onChange={(e) => setValues({...values, monthly: e.target.value})}
                placeholder="Monthly Contribution ($)"
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
