import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdjustableRateMortgageCalculator() {
  const [values, setValues] = useState({
    principal: "300000",
    initRate: "5.5",
    adjRate: "7.0",
    fixedYears: "5",
    totalYears: "30",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const p=parseFloat(s.principal)||0;const r1=(parseFloat(s.initRate)||0)/1200;const r2=(parseFloat(s.adjRate)||0)/1200;
      const fixedM=(parseFloat(s.fixedYears)||5)*12;const totalM=(parseFloat(s.totalYears)||30)*12;
      const pmt1=r1>0?p*r1*Math.pow(1+r1,totalM)/(Math.pow(1+r1,totalM)-1):p/totalM;
      let bal=p;for(let i=0;i<fixedM;i++){bal=bal*(1+r1)-pmt1;}
      const remM=totalM-fixedM;const pmt2=r2>0?bal*r2*Math.pow(1+r2,remM)/(Math.pow(1+r2,remM)-1):bal/remM;
      return{"Initial Payment":"$"+pmt1.toFixed(2),"Adjusted Payment":"$"+pmt2.toFixed(2),"Payment Increase":"$"+(pmt2-pmt1).toFixed(2),"Balance at Adjustment":"$"+bal.toFixed(0)};
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="adjustable-rate-mortgage-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Adjustable Rate Mortgage Calculator</CardTitle>
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
              <label className="block text-sm font-medium mb-1" htmlFor="initRate">Initial Rate (%)</label>
              <Input
                id="initRate"
                data-testid="input-initRate"
                type="number"
                value={values.initRate}
                onChange={(e) => setValues({...values, initRate: e.target.value})}
                placeholder="Initial Rate (%)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="adjRate">Adjusted Rate (%)</label>
              <Input
                id="adjRate"
                data-testid="input-adjRate"
                type="number"
                value={values.adjRate}
                onChange={(e) => setValues({...values, adjRate: e.target.value})}
                placeholder="Adjusted Rate (%)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="fixedYears">Fixed Period (years)</label>
              <Input
                id="fixedYears"
                data-testid="input-fixedYears"
                type="number"
                value={values.fixedYears}
                onChange={(e) => setValues({...values, fixedYears: e.target.value})}
                placeholder="Fixed Period (years)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="totalYears">Total Term (years)</label>
              <Input
                id="totalYears"
                data-testid="input-totalYears"
                type="number"
                value={values.totalYears}
                onChange={(e) => setValues({...values, totalYears: e.target.value})}
                placeholder="Total Term (years)"
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
