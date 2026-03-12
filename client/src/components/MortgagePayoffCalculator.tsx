import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MortgagePayoffCalculator() {
  const [values, setValues] = useState({
    balance: "250000",
    rate: "6.5",
    payment: "1580",
    extra: "200",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const bal=parseFloat(s.balance)||0;const r=(parseFloat(s.rate)||0)/1200;const pmt=parseFloat(s.payment)||0;const extra=parseFloat(s.extra)||0;
      let b1=bal,m1=0;while(b1>0&&m1<600){b1=b1*(1+r)-pmt;m1++;if(b1<0)b1=0;}
      let b2=bal,m2=0;while(b2>0&&m2<600){b2=b2*(1+r)-(pmt+extra);m2++;if(b2<0)b2=0;}
      return{"Original Payoff":Math.floor(m1/12)+"y "+m1%12+"m","With Extra":Math.floor(m2/12)+"y "+m2%12+"m","Time Saved":(m1-m2)+" months","Interest Saved":"$"+(pmt*m1-(pmt+extra)*m2).toFixed(0)};
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="mortgage-payoff-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Mortgage Payoff Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="balance">Current Balance ($)</label>
              <Input
                id="balance"
                data-testid="input-balance"
                type="number"
                value={values.balance}
                onChange={(e) => setValues({...values, balance: e.target.value})}
                placeholder="Current Balance ($)"
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
              <label className="block text-sm font-medium mb-1" htmlFor="payment">Current Payment ($)</label>
              <Input
                id="payment"
                data-testid="input-payment"
                type="number"
                value={values.payment}
                onChange={(e) => setValues({...values, payment: e.target.value})}
                placeholder="Current Payment ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="extra">Extra Monthly Payment ($)</label>
              <Input
                id="extra"
                data-testid="input-extra"
                type="number"
                value={values.extra}
                onChange={(e) => setValues({...values, extra: e.target.value})}
                placeholder="Extra Monthly Payment ($)"
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
