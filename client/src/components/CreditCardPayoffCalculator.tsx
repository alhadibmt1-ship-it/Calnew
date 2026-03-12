import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CreditCardPayoffCalculator() {
  const [values, setValues] = useState({
    balance: "5000",
    rate: "22",
    payment: "150",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const bal=parseFloat(s.balance)||0;const r=(parseFloat(s.rate)||0)/1200;const pmt=parseFloat(s.payment)||0;
      if(pmt<=bal*r)return{"Error":"Payment too low to pay off debt","Minimum Payment Needed":"$"+(bal*r+10).toFixed(2)};
      let b=bal,m=0,totalInt=0;while(b>0&&m<600){const int=b*r;totalInt+=int;b=b+int-pmt;m++;if(b<0)b=0;}
      return{"Months to Pay Off":m,"Years":( m/12).toFixed(1),"Total Interest":"$"+totalInt.toFixed(0),"Total Paid":"$"+(bal+totalInt).toFixed(0)};
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="credit-card-payoff-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Credit Card Payoff Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="balance">Card Balance ($)</label>
              <Input
                id="balance"
                data-testid="input-balance"
                type="number"
                value={values.balance}
                onChange={(e) => setValues({...values, balance: e.target.value})}
                placeholder="Card Balance ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="rate">APR (%)</label>
              <Input
                id="rate"
                data-testid="input-rate"
                type="number"
                value={values.rate}
                onChange={(e) => setValues({...values, rate: e.target.value})}
                placeholder="APR (%)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="payment">Monthly Payment ($)</label>
              <Input
                id="payment"
                data-testid="input-payment"
                type="number"
                value={values.payment}
                onChange={(e) => setValues({...values, payment: e.target.value})}
                placeholder="Monthly Payment ($)"
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
