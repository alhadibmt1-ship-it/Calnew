import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ConventionalLoanCalculator() {
  const [values, setValues] = useState({
    homePrice: "400000",
    downPct: "20",
    rate: "6.5",
    term: "30",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const price=parseFloat(s.homePrice)||0;const dp=(parseFloat(s.downPct)||20)/100;const r=(parseFloat(s.rate)||0)/1200;const n=(parseFloat(s.term)||30)*12;
      const loan=price*(1-dp);const pmi=dp<0.2?loan*0.005/12:0;
      const pmt=r>0?loan*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):loan/n;
      return {"Loan Amount":"$"+loan.toLocaleString(),"Monthly P&I":"$"+pmt.toFixed(2),"Monthly PMI":"$"+pmi.toFixed(2),"Total Monthly":"$"+(pmt+pmi).toFixed(2),"Total Interest":"$"+(pmt*n-loan).toFixed(0),"PMI Required":dp<0.2?"Yes":"No"};
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="conventional-loan-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Conventional Loan Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="homePrice">Home Price ($)</label>
              <Input
                id="homePrice"
                data-testid="input-homePrice"
                type="number"
                value={values.homePrice}
                onChange={(e) => setValues({...values, homePrice: e.target.value})}
                placeholder="Home Price ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="downPct">Down Payment (%)</label>
              <Input
                id="downPct"
                data-testid="input-downPct"
                type="number"
                value={values.downPct}
                onChange={(e) => setValues({...values, downPct: e.target.value})}
                placeholder="Down Payment (%)"
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
