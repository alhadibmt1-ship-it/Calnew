import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RVLoanCalculator() {
  const [values, setValues] = useState({
    price: "80000",
    downPmt: "15000",
    rate: "7.0",
    term: "15",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const loan=(parseFloat(s.price)||0)-(parseFloat(s.downPmt)||0);const r=(parseFloat(s.rate)||0)/1200;const n=(parseFloat(s.term)||15)*12;
      const pmt=r>0?loan*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):loan/n;
      return{"Loan Amount":"$"+loan.toLocaleString(),"Monthly Payment":"$"+pmt.toFixed(2),"Total Interest":"$"+(pmt*n-loan).toFixed(0),"Total Cost":"$"+(pmt*n).toFixed(0)};
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="r-v-loan-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">RV Loan Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="price">RV Price ($)</label>
              <Input
                id="price"
                data-testid="input-price"
                type="number"
                value={values.price}
                onChange={(e) => setValues({...values, price: e.target.value})}
                placeholder="RV Price ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="downPmt">Down Payment ($)</label>
              <Input
                id="downPmt"
                data-testid="input-downPmt"
                type="number"
                value={values.downPmt}
                onChange={(e) => setValues({...values, downPmt: e.target.value})}
                placeholder="Down Payment ($)"
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
