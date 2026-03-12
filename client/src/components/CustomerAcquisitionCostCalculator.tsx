import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CustomerAcquisitionCostCalculator() {
  const [values, setValues] = useState({
    marketingCost: "50000",
    salesCost: "30000",
    customers: "200",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const mkt=parseFloat(s.marketingCost)||0;const sales=parseFloat(s.salesCost)||0;const cust=parseFloat(s.customers)||1;
      const cac=(mkt+sales)/cust;
      return{"Total Acquisition Spend":"$"+(mkt+sales).toLocaleString(),"New Customers":cust,"CAC per Customer":"$"+cac.toFixed(2),"Marketing Cost":"$"+mkt.toLocaleString(),"Sales Cost":"$"+sales.toLocaleString()};
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="customer-acquisition-cost-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Customer Acquisition Cost Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="marketingCost">Total Marketing Cost ($)</label>
              <Input
                id="marketingCost"
                data-testid="input-marketingCost"
                type="number"
                value={values.marketingCost}
                onChange={(e) => setValues({...values, marketingCost: e.target.value})}
                placeholder="Total Marketing Cost ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="salesCost">Total Sales Cost ($)</label>
              <Input
                id="salesCost"
                data-testid="input-salesCost"
                type="number"
                value={values.salesCost}
                onChange={(e) => setValues({...values, salesCost: e.target.value})}
                placeholder="Total Sales Cost ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="customers">New Customers Acquired</label>
              <Input
                id="customers"
                data-testid="input-customers"
                type="number"
                value={values.customers}
                onChange={(e) => setValues({...values, customers: e.target.value})}
                placeholder="New Customers Acquired"
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
