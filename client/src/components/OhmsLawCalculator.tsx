import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function OhmsLawCalculator() {
  const [values, setValues] = useState({
    voltage: "120",
    current: "10",
    resistance: "0",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const v = parseFloat(s.voltage)||0; const i = parseFloat(s.current)||0; const r = parseFloat(s.resistance)||0;
      let rv=v,ri=i,rr=r;
      if(r===0 && v>0 && i>0) rr = v/i;
      else if(v===0 && i>0 && r>0) rv = i*r;
      else if(i===0 && v>0 && r>0) ri = v/r;
      const p = rv * ri;
      return { "Voltage (V)": rv.toFixed(2), "Current (A)": ri.toFixed(2), "Resistance (Ω)": rr.toFixed(2), "Power (W)": p.toFixed(2) };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="ohms-law-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Ohms Law Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate voltage, current, resistance, and power</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="voltage">Voltage (V)</label>
              <Input
                id="voltage"
                data-testid="input-voltage"
                type="number"
                value={values.voltage}
                onChange={(e) => setValues({...values, voltage: e.target.value})}
                placeholder="Voltage (V)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="current">Current (A)</label>
              <Input
                id="current"
                data-testid="input-current"
                type="number"
                value={values.current}
                onChange={(e) => setValues({...values, current: e.target.value})}
                placeholder="Current (A)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="resistance">Resistance (Ω) - leave 0 to calculate</label>
              <Input
                id="resistance"
                data-testid="input-resistance"
                type="number"
                value={values.resistance}
                onChange={(e) => setValues({...values, resistance: e.target.value})}
                placeholder="Resistance (Ω) - leave 0 to calculate"
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
