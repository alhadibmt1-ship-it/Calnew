import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CAGRCalculator() {
  const [values, setValues] = useState({
    startVal: "10000",
    endVal: "25000",
    years: "5",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const sv=parseFloat(s.startVal)||0;const ev=parseFloat(s.endVal)||0;const y=parseFloat(s.years)||1;
      const cagr=Math.pow(ev/sv,1/y)-1;const totalReturn=((ev-sv)/sv)*100;
      return{"CAGR":(cagr*100).toFixed(2)+"%","Total Return":totalReturn.toFixed(2)+"%","Starting Value":"$"+sv.toLocaleString(),"Ending Value":"$"+ev.toLocaleString(),"Absolute Gain":"$"+(ev-sv).toLocaleString()};
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="c-a-g-r-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">CAGR Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="startVal">Starting Value ($)</label>
              <Input
                id="startVal"
                data-testid="input-startVal"
                type="number"
                value={values.startVal}
                onChange={(e) => setValues({...values, startVal: e.target.value})}
                placeholder="Starting Value ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="endVal">Ending Value ($)</label>
              <Input
                id="endVal"
                data-testid="input-endVal"
                type="number"
                value={values.endVal}
                onChange={(e) => setValues({...values, endVal: e.target.value})}
                placeholder="Ending Value ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="years">Number of Years</label>
              <Input
                id="years"
                data-testid="input-years"
                type="number"
                value={values.years}
                onChange={(e) => setValues({...values, years: e.target.value})}
                placeholder="Number of Years"
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
