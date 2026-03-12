import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function HouseAffordabilityCalculator() {
  const [values, setValues] = useState({
    income: "80000",
    debt: "500",
    downPmt: "40000",
    rate: "6.5",
    term: "30",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const income=parseFloat(s.income)||0;const monthlyIncome=income/12;const debt=parseFloat(s.debt)||0;
      const maxPayment=monthlyIncome*0.28;const maxTotal=monthlyIncome*0.36-debt;const payment=Math.min(maxPayment,maxTotal);
      const r=(parseFloat(s.rate)||0)/1200;const n=(parseFloat(s.term)||30)*12;const dp=parseFloat(s.downPmt)||0;
      const loanAmt=r>0?payment*(Math.pow(1+r,n)-1)/(r*Math.pow(1+r,n)):payment*n;
      return{"Max Monthly Payment":"$"+payment.toFixed(0),"Max Loan Amount":"$"+loanAmt.toFixed(0),"Max Home Price":"$"+(loanAmt+dp).toFixed(0),"Down Payment":"$"+dp.toLocaleString(),"DTI Ratio":(((payment+debt)/monthlyIncome)*100).toFixed(1)+"%"};
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="house-affordability-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">House Affordability Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="income">Annual Income ($)</label>
              <Input
                id="income"
                data-testid="input-income"
                type="number"
                value={values.income}
                onChange={(e) => setValues({...values, income: e.target.value})}
                placeholder="Annual Income ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="debt">Monthly Debts ($)</label>
              <Input
                id="debt"
                data-testid="input-debt"
                type="number"
                value={values.debt}
                onChange={(e) => setValues({...values, debt: e.target.value})}
                placeholder="Monthly Debts ($)"
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
