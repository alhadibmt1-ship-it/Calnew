import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DownPaymentCalculator() {
  const [values, setValues] = useState({
    homePrice: "350000",
    downPct: "20",
    savings: "30000",
    monthly: "1000",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const price=parseFloat(s.homePrice)||0;const pct=(parseFloat(s.downPct)||20)/100;const dp=price*pct;
      const savings=parseFloat(s.savings)||0;const monthly=parseFloat(s.monthly)||0;
      const remaining=Math.max(0,dp-savings);const months=monthly>0?Math.ceil(remaining/monthly):0;
      return{"Down Payment Needed":"$"+dp.toLocaleString(),"Current Savings":"$"+savings.toLocaleString(),"Remaining to Save":"$"+remaining.toLocaleString(),"Months to Goal":months,"Years to Goal":(months/12).toFixed(1)};
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="down-payment-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Down Payment Calculator</CardTitle>
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
              <label className="block text-sm font-medium mb-1" htmlFor="savings">Current Savings ($)</label>
              <Input
                id="savings"
                data-testid="input-savings"
                type="number"
                value={values.savings}
                onChange={(e) => setValues({...values, savings: e.target.value})}
                placeholder="Current Savings ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="monthly">Monthly Savings ($)</label>
              <Input
                id="monthly"
                data-testid="input-monthly"
                type="number"
                value={values.monthly}
                onChange={(e) => setValues({...values, monthly: e.target.value})}
                placeholder="Monthly Savings ($)"
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
