import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CommissionCalculator() {
  const [values, setValues] = useState({
    sales: "100000",
    rate: "5",
    tiers: "80000",
    bonusRate: "8",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const sales=parseFloat(s.sales)||0;const rate=(parseFloat(s.rate)||5)/100;
      const tier=parseFloat(s.tiers)||0;const bonusRate=(parseFloat(s.bonusRate)||0)/100;
      let commission;if(sales<=tier||tier===0){commission=sales*rate;}else{commission=tier*rate+(sales-tier)*bonusRate;}
      return{"Total Sales":"$"+sales.toLocaleString(),"Base Commission":"$"+(Math.min(sales,tier||sales)*rate).toFixed(2),"Bonus Commission":"$"+(sales>tier?(sales-tier)*bonusRate:0).toFixed(2),"Total Commission":"$"+commission.toFixed(2),"Effective Rate":(commission/sales*100).toFixed(2)+"%"};
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="commission-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Commission Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="sales">Total Sales ($)</label>
              <Input
                id="sales"
                data-testid="input-sales"
                type="number"
                value={values.sales}
                onChange={(e) => setValues({...values, sales: e.target.value})}
                placeholder="Total Sales ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="rate">Commission Rate (%)</label>
              <Input
                id="rate"
                data-testid="input-rate"
                type="number"
                value={values.rate}
                onChange={(e) => setValues({...values, rate: e.target.value})}
                placeholder="Commission Rate (%)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="tiers">Bonus Tier Threshold ($)</label>
              <Input
                id="tiers"
                data-testid="input-tiers"
                type="number"
                value={values.tiers}
                onChange={(e) => setValues({...values, tiers: e.target.value})}
                placeholder="Bonus Tier Threshold ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="bonusRate">Bonus Rate Above Tier (%)</label>
              <Input
                id="bonusRate"
                data-testid="input-bonusRate"
                type="number"
                value={values.bonusRate}
                onChange={(e) => setValues({...values, bonusRate: e.target.value})}
                placeholder="Bonus Rate Above Tier (%)"
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
