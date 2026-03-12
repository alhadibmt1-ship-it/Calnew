import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CustomerLifetimeValueCalculator() {
  const [values, setValues] = useState({
    avgPurchase: "50",
    frequency: "4",
    lifespan: "5",
    margin: "30",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const avg=parseFloat(s.avgPurchase)||0;const freq=parseFloat(s.frequency)||0;const life=parseFloat(s.lifespan)||0;
      const margin=(parseFloat(s.margin)||30)/100;const revenue=avg*freq*life;const clv=revenue*margin;
      return{"Annual Revenue per Customer":"$"+(avg*freq).toFixed(0),"Lifetime Revenue":"$"+revenue.toFixed(0),"Customer Lifetime Value":"$"+clv.toFixed(0),"Profit Margin":margin*100+"%"};
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="customer-lifetime-value-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Customer Lifetime Value Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="avgPurchase">Avg Purchase Value ($)</label>
              <Input
                id="avgPurchase"
                data-testid="input-avgPurchase"
                type="number"
                value={values.avgPurchase}
                onChange={(e) => setValues({...values, avgPurchase: e.target.value})}
                placeholder="Avg Purchase Value ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="frequency">Purchases per Year</label>
              <Input
                id="frequency"
                data-testid="input-frequency"
                type="number"
                value={values.frequency}
                onChange={(e) => setValues({...values, frequency: e.target.value})}
                placeholder="Purchases per Year"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="lifespan">Customer Lifespan (years)</label>
              <Input
                id="lifespan"
                data-testid="input-lifespan"
                type="number"
                value={values.lifespan}
                onChange={(e) => setValues({...values, lifespan: e.target.value})}
                placeholder="Customer Lifespan (years)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="margin">Profit Margin (%)</label>
              <Input
                id="margin"
                data-testid="input-margin"
                type="number"
                value={values.margin}
                onChange={(e) => setValues({...values, margin: e.target.value})}
                placeholder="Profit Margin (%)"
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
