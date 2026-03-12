import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RentVsBuyCalculator() {
  const [values, setValues] = useState({
    rent: "1800",
    homePrice: "350000",
    downPct: "20",
    rate: "6.5",
    years: "7",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const rent=parseFloat(s.rent)||0;const price=parseFloat(s.homePrice)||0;const dp=(parseFloat(s.downPct)||20)/100;
      const r=(parseFloat(s.rate)||0)/1200;const n=30*12;const loan=price*(1-dp);const yrs=parseFloat(s.years)||7;
      const pmt=r>0?loan*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):loan/n;
      const totalRent=rent*yrs*12*1.03;const totalBuy=pmt*yrs*12;const appreciation=price*Math.pow(1.03,yrs)-price;
      return{"Total Rent Cost":"$"+totalRent.toFixed(0),"Total Mortgage Cost":"$"+totalBuy.toFixed(0),"Home Appreciation":"$"+appreciation.toFixed(0),"Monthly Mortgage":"$"+pmt.toFixed(2),"Net Buy Advantage":"$"+(totalRent-totalBuy+appreciation).toFixed(0)};
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="rent-vs-buy-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Rent vs Buy Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="rent">Monthly Rent ($)</label>
              <Input
                id="rent"
                data-testid="input-rent"
                type="number"
                value={values.rent}
                onChange={(e) => setValues({...values, rent: e.target.value})}
                placeholder="Monthly Rent ($)"
              />
            </div>
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
              <label className="block text-sm font-medium mb-1" htmlFor="rate">Mortgage Rate (%)</label>
              <Input
                id="rate"
                data-testid="input-rate"
                type="number"
                value={values.rate}
                onChange={(e) => setValues({...values, rate: e.target.value})}
                placeholder="Mortgage Rate (%)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="years">Time Horizon (years)</label>
              <Input
                id="years"
                data-testid="input-years"
                type="number"
                value={values.years}
                onChange={(e) => setValues({...values, years: e.target.value})}
                placeholder="Time Horizon (years)"
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
