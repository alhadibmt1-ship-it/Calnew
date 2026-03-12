import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PowerFactorCalculator() {
  const [values, setValues] = useState({
    realPower: "1000",
    voltage: "120",
    current: "10",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const p = parseFloat(s.realPower)||0; const v = parseFloat(s.voltage)||0; const i = parseFloat(s.current)||0;
      const apparent = v * i; const pf = apparent > 0 ? p / apparent : 0;
      const reactive = Math.sqrt(Math.max(0, apparent*apparent - p*p));
      return { "Real Power (W)": p, "Apparent Power (VA)": apparent.toFixed(1), "Reactive Power (VAR)": reactive.toFixed(1), "Power Factor": pf.toFixed(3), "Power Factor (%)": (pf*100).toFixed(1) };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="power-factor-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Power Factor Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate power factor and apparent power</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="realPower">Real Power (W)</label>
              <Input
                id="realPower"
                data-testid="input-realPower"
                type="number"
                value={values.realPower}
                onChange={(e) => setValues({...values, realPower: e.target.value})}
                placeholder="Real Power (W)"
              />
            </div>
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
