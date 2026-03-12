import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BalloonPaymentCalculator() {
  const [values, setValues] = useState({
    principal: "200000",
    rate: "6.0",
    amortYears: "30",
    balloonYears: "7",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const p=parseFloat(s.principal)||0;const r=(parseFloat(s.rate)||0)/1200;const n=(parseFloat(s.amortYears)||30)*12;
      const bM=(parseFloat(s.balloonYears)||7)*12;
      const pmt=r>0?p*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):p/n;
      let bal=p;for(let i=0;i<bM;i++)bal=bal*(1+r)-pmt;
      return{"Monthly Payment":"$"+pmt.toFixed(2),"Balloon Payment":"$"+bal.toFixed(0),"Total Payments Before Balloon":"$"+(pmt*bM).toFixed(0),"Interest Paid":"$"+(pmt*bM-(p-bal)).toFixed(0)};
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="balloon-payment-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Balloon Payment Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="principal">Loan Amount ($)</label>
              <Input
                id="principal"
                data-testid="input-principal"
                type="number"
                value={values.principal}
                onChange={(e) => setValues({...values, principal: e.target.value})}
                placeholder="Loan Amount ($)"
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
              <label className="block text-sm font-medium mb-1" htmlFor="amortYears">Amortization (years)</label>
              <Input
                id="amortYears"
                data-testid="input-amortYears"
                type="number"
                value={values.amortYears}
                onChange={(e) => setValues({...values, amortYears: e.target.value})}
                placeholder="Amortization (years)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="balloonYears">Balloon Due (years)</label>
              <Input
                id="balloonYears"
                data-testid="input-balloonYears"
                type="number"
                value={values.balloonYears}
                onChange={(e) => setValues({...values, balloonYears: e.target.value})}
                placeholder="Balloon Due (years)"
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
