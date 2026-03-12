import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoanComparisonCalculator() {
  const [values, setValues] = useState({
    amount: "250000",
    rate1: "6.0",
    term1: "30",
    rate2: "6.5",
    term2: "15",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const p=parseFloat(s.amount)||0;
      const r1=(parseFloat(s.rate1)||0)/1200;const n1=(parseFloat(s.term1)||30)*12;
      const r2=(parseFloat(s.rate2)||0)/1200;const n2=(parseFloat(s.term2)||15)*12;
      const pmt1=r1>0?p*r1*Math.pow(1+r1,n1)/(Math.pow(1+r1,n1)-1):p/n1;
      const pmt2=r2>0?p*r2*Math.pow(1+r2,n2)/(Math.pow(1+r2,n2)-1):p/n2;
      return{"Loan 1 Payment":"$"+pmt1.toFixed(2),"Loan 1 Total Interest":"$"+(pmt1*n1-p).toFixed(0),"Loan 2 Payment":"$"+pmt2.toFixed(2),"Loan 2 Total Interest":"$"+(pmt2*n2-p).toFixed(0),"Interest Saved (Loan 2)":"$"+(pmt1*n1-pmt2*n2).toFixed(0)};
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="loan-comparison-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Loan Comparison Calculator</CardTitle>
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
              <label className="block text-sm font-medium mb-1" htmlFor="rate1">Loan 1 Rate (%)</label>
              <Input
                id="rate1"
                data-testid="input-rate1"
                type="number"
                value={values.rate1}
                onChange={(e) => setValues({...values, rate1: e.target.value})}
                placeholder="Loan 1 Rate (%)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="term1">Loan 1 Term (years)</label>
              <Input
                id="term1"
                data-testid="input-term1"
                type="number"
                value={values.term1}
                onChange={(e) => setValues({...values, term1: e.target.value})}
                placeholder="Loan 1 Term (years)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="rate2">Loan 2 Rate (%)</label>
              <Input
                id="rate2"
                data-testid="input-rate2"
                type="number"
                value={values.rate2}
                onChange={(e) => setValues({...values, rate2: e.target.value})}
                placeholder="Loan 2 Rate (%)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="term2">Loan 2 Term (years)</label>
              <Input
                id="term2"
                data-testid="input-term2"
                type="number"
                value={values.term2}
                onChange={(e) => setValues({...values, term2: e.target.value})}
                placeholder="Loan 2 Term (years)"
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
