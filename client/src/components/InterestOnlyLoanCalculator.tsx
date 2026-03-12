import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function InterestOnlyLoanCalculator() {
  const [values, setValues] = useState({
    principal: "300000",
    rate: "6.5",
    ioYears: "10",
    totalYears: "30",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const p=parseFloat(s.principal)||0;const r=(parseFloat(s.rate)||0)/1200;const ioM=(parseFloat(s.ioYears)||10)*12;
      const totalM=(parseFloat(s.totalYears)||30)*12;const amortM=totalM-ioM;
      const ioPmt=p*r;const amortPmt=r>0?p*r*Math.pow(1+r,amortM)/(Math.pow(1+r,amortM)-1):p/amortM;
      return{"Interest-Only Payment":"$"+ioPmt.toFixed(2),"Amortized Payment":"$"+amortPmt.toFixed(2),"Payment Jump":"$"+(amortPmt-ioPmt).toFixed(2),"IO Period Interest":"$"+(ioPmt*ioM).toFixed(0)};
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="interest-only-loan-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Interest Only Loan Calculator</CardTitle>
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
              <label className="block text-sm font-medium mb-1" htmlFor="ioYears">Interest-Only Period (years)</label>
              <Input
                id="ioYears"
                data-testid="input-ioYears"
                type="number"
                value={values.ioYears}
                onChange={(e) => setValues({...values, ioYears: e.target.value})}
                placeholder="Interest-Only Period (years)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="totalYears">Total Loan Term (years)</label>
              <Input
                id="totalYears"
                data-testid="input-totalYears"
                type="number"
                value={values.totalYears}
                onChange={(e) => setValues({...values, totalYears: e.target.value})}
                placeholder="Total Loan Term (years)"
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
