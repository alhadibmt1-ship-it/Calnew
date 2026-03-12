import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PersonalLoanCalculator() {
  const [values, setValues] = useState({
    amount: "15000",
    rate: "9.0",
    term: "36",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const p=parseFloat(s.amount)||0;const r=(parseFloat(s.rate)||0)/1200;const n=parseFloat(s.term)||36;
      const pmt=r>0?p*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):p/n;
      return{"Monthly Payment":"$"+pmt.toFixed(2),"Total Interest":"$"+(pmt*n-p).toFixed(0),"Total Repayment":"$"+(pmt*n).toFixed(0),"Effective Cost":((pmt*n-p)/p*100).toFixed(1)+"%"};
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="personal-loan-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Personal Loan Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="amount">Loan Amount ($)</label>
              <Input
                id="amount"
                data-testid="input-amount"
                type="number"
                value={values.amount}
                onChange={(e) => setValues({...values, amount: e.target.value})}
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
              <label className="block text-sm font-medium mb-1" htmlFor="term">Loan Term (months)</label>
              <Input
                id="term"
                data-testid="input-term"
                type="number"
                value={values.term}
                onChange={(e) => setValues({...values, term: e.target.value})}
                placeholder="Loan Term (months)"
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
