import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FixedRateMortgageCalculator() {
  const [values, setValues] = useState({
    principal: "300000",
    rate: "6.5",
    term: "30",
    tax: "3600",
    insurance: "1200",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const p=parseFloat(s.principal)||0;const r=(parseFloat(s.rate)||0)/1200;const n=(parseFloat(s.term)||30)*12;
      const pmt=r>0?p*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):p/n;const tax=(parseFloat(s.tax)||0)/12;const ins=(parseFloat(s.insurance)||0)/12;
      return {"Principal & Interest":"$"+pmt.toFixed(2),"Property Tax":"$"+tax.toFixed(2),"Insurance":"$"+ins.toFixed(2),"Total Monthly":"$"+(pmt+tax+ins).toFixed(2),"Total Over Life":"$"+(pmt*n).toFixed(0)};
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="fixed-rate-mortgage-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Fixed Rate Mortgage Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="principal">Loan Amount ($)</label>
              <Input
                id="principal"
                data-testid="input-principal"
                type="number"
                value={values.principal}
                onChange={(e) => setValues({...values, principal: e.target.value})}
                placeholder="Loan Amount ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="rate">Interest Rate (%)</label>
              <Input
                id="rate"
                data-testid="input-rate"
                type="number"
                value={values.rate}
                onChange={(e) => setValues({...values, rate: e.target.value})}
                placeholder="Interest Rate (%)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="term">Loan Term (years)</label>
              <Input
                id="term"
                data-testid="input-term"
                type="number"
                value={values.term}
                onChange={(e) => setValues({...values, term: e.target.value})}
                placeholder="Loan Term (years)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="tax">Annual Property Tax ($)</label>
              <Input
                id="tax"
                data-testid="input-tax"
                type="number"
                value={values.tax}
                onChange={(e) => setValues({...values, tax: e.target.value})}
                placeholder="Annual Property Tax ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="insurance">Annual Insurance ($)</label>
              <Input
                id="insurance"
                data-testid="input-insurance"
                type="number"
                value={values.insurance}
                onChange={(e) => setValues({...values, insurance: e.target.value})}
                placeholder="Annual Insurance ($)"
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
