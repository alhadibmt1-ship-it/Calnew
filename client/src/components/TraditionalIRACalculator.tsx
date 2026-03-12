import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TraditionalIRACalculator() {
  const [values, setValues] = useState({
    current: "15000",
    annual: "6500",
    rate: "7",
    years: "25",
    taxRate: "22",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const cur=parseFloat(s.current)||0;const ann=parseFloat(s.annual)||0;const r=(parseFloat(s.rate)||7)/100;const y=parseFloat(s.years)||25;
      const taxRate=(parseFloat(s.taxRate)||22)/100;let bal=cur;for(let i=0;i<y;i++)bal=(bal+ann)*(1+r);
      const afterTax=bal*(1-taxRate);const totalContrib=cur+ann*y;const taxSaved=ann*taxRate*y;
      return{"Pre-Tax Balance":"$"+bal.toFixed(0),"After-Tax Value":"$"+afterTax.toFixed(0),"Total Contributions":"$"+totalContrib.toFixed(0),"Tax Deductions Saved":"$"+taxSaved.toFixed(0)};
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="traditional-i-r-a-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Traditional IRA Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="current">Current Balance ($)</label>
              <Input
                id="current"
                data-testid="input-current"
                type="number"
                value={values.current}
                onChange={(e) => setValues({...values, current: e.target.value})}
                placeholder="Current Balance ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="annual">Annual Contribution ($)</label>
              <Input
                id="annual"
                data-testid="input-annual"
                type="number"
                value={values.annual}
                onChange={(e) => setValues({...values, annual: e.target.value})}
                placeholder="Annual Contribution ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="rate">Annual Return (%)</label>
              <Input
                id="rate"
                data-testid="input-rate"
                type="number"
                value={values.rate}
                onChange={(e) => setValues({...values, rate: e.target.value})}
                placeholder="Annual Return (%)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="years">Years to Retirement</label>
              <Input
                id="years"
                data-testid="input-years"
                type="number"
                value={values.years}
                onChange={(e) => setValues({...values, years: e.target.value})}
                placeholder="Years to Retirement"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="taxRate">Retirement Tax Rate (%)</label>
              <Input
                id="taxRate"
                data-testid="input-taxRate"
                type="number"
                value={values.taxRate}
                onChange={(e) => setValues({...values, taxRate: e.target.value})}
                placeholder="Retirement Tax Rate (%)"
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
