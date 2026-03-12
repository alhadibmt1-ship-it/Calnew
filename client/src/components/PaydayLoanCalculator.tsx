import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PaydayLoanCalculator() {
  const [values, setValues] = useState({
    amount: "500",
    fee: "15",
    term: "14",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const amt=parseFloat(s.amount)||0;const fee=(parseFloat(s.fee)||15)/100;const days=parseFloat(s.term)||14;
      const totalFee=amt*fee;const repay=amt+totalFee;const apr=fee/days*365*100;
      return{"Loan Amount":"$"+amt,"Fee":"$"+totalFee.toFixed(2),"Total Repayment":"$"+repay.toFixed(2),"Effective APR":apr.toFixed(0)+"%","Cost per Dollar Borrowed":"$"+(totalFee/amt).toFixed(2)};
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="payday-loan-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Payday Loan Calculator</CardTitle>
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
              <label className="block text-sm font-medium mb-1" htmlFor="fee">Fee per $100</label>
              <Input
                id="fee"
                data-testid="input-fee"
                type="number"
                value={values.fee}
                onChange={(e) => setValues({...values, fee: e.target.value})}
                placeholder="Fee per $100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="term">Loan Term (days)</label>
              <Input
                id="term"
                data-testid="input-term"
                type="number"
                value={values.term}
                onChange={(e) => setValues({...values, term: e.target.value})}
                placeholder="Loan Term (days)"
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
