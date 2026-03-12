import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EarlyMortgagePayoffCalculator() {
  const [values, setValues] = useState({
    balance: "200000",
    rate: "6.0",
    remainYears: "25",
    extra: "300",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const bal=parseFloat(s.balance)||0;const r=(parseFloat(s.rate)||0)/1200;const n=(parseFloat(s.remainYears)||25)*12;
      const pmt=r>0?bal*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):bal/n;
      let b=bal,m=0;while(b>0&&m<600){b=b*(1+r)-(pmt+(parseFloat(s.extra)||0));m++;if(b<0)b=0;}
      const origTotal=pmt*n;const newTotal=(pmt+(parseFloat(s.extra)||0))*m;
      return{"Current Payment":"$"+pmt.toFixed(2),"Original Total Cost":"$"+origTotal.toFixed(0),"New Total Cost":"$"+newTotal.toFixed(0),"Interest Saved":"$"+(origTotal-newTotal).toFixed(0),"New Payoff":Math.floor(m/12)+"y "+m%12+"m","Time Saved":(n-m)+" months"};
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="early-mortgage-payoff-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Early Mortgage Payoff Savings Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="balance">Remaining Balance ($)</label>
              <Input
                id="balance"
                data-testid="input-balance"
                type="number"
                value={values.balance}
                onChange={(e) => setValues({...values, balance: e.target.value})}
                placeholder="Remaining Balance ($)"
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
              <label className="block text-sm font-medium mb-1" htmlFor="remainYears">Remaining Years</label>
              <Input
                id="remainYears"
                data-testid="input-remainYears"
                type="number"
                value={values.remainYears}
                onChange={(e) => setValues({...values, remainYears: e.target.value})}
                placeholder="Remaining Years"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="extra">Extra Monthly ($)</label>
              <Input
                id="extra"
                data-testid="input-extra"
                type="number"
                value={values.extra}
                onChange={(e) => setValues({...values, extra: e.target.value})}
                placeholder="Extra Monthly ($)"
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
