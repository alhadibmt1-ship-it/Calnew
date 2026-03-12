import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DividendReinvestmentCalculator() {
  const [values, setValues] = useState({
    investment: "10000",
    sharePrice: "50",
    dividend: "2",
    growth: "5",
    years: "20",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      let shares=(parseFloat(s.investment)||0)/(parseFloat(s.sharePrice)||50);const price=parseFloat(s.sharePrice)||50;
      let div=parseFloat(s.dividend)||2;const growth=(parseFloat(s.growth)||5)/100;const y=parseFloat(s.years)||20;
      let totalDiv=0;for(let i=0;i<y;i++){const annDiv=shares*div;totalDiv+=annDiv;shares+=annDiv/price;div*=(1+growth);}
      return{"Final Shares":shares.toFixed(2),"Final Value":"$"+(shares*price).toFixed(0),"Total Dividends Reinvested":"$"+totalDiv.toFixed(0),"Final Annual Dividend":"$"+(shares*div).toFixed(0)};
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="dividend-reinvestment-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Dividend Reinvestment Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="investment">Initial Investment ($)</label>
              <Input
                id="investment"
                data-testid="input-investment"
                type="number"
                value={values.investment}
                onChange={(e) => setValues({...values, investment: e.target.value})}
                placeholder="Initial Investment ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="sharePrice">Share Price ($)</label>
              <Input
                id="sharePrice"
                data-testid="input-sharePrice"
                type="number"
                value={values.sharePrice}
                onChange={(e) => setValues({...values, sharePrice: e.target.value})}
                placeholder="Share Price ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="dividend">Annual Dividend per Share ($)</label>
              <Input
                id="dividend"
                data-testid="input-dividend"
                type="number"
                value={values.dividend}
                onChange={(e) => setValues({...values, dividend: e.target.value})}
                placeholder="Annual Dividend per Share ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="growth">Dividend Growth Rate (%)</label>
              <Input
                id="growth"
                data-testid="input-growth"
                type="number"
                value={values.growth}
                onChange={(e) => setValues({...values, growth: e.target.value})}
                placeholder="Dividend Growth Rate (%)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="years">Years</label>
              <Input
                id="years"
                data-testid="input-years"
                type="number"
                value={values.years}
                onChange={(e) => setValues({...values, years: e.target.value})}
                placeholder="Years"
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
