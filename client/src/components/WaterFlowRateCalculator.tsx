import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function WaterFlowRateCalculator() {
  const [values, setValues] = useState({
    diameter: "2",
    velocity: "5",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const d = (parseFloat(s.diameter)||0) / 12; const v = parseFloat(s.velocity)||0;
      const area = Math.PI * (d/2) * (d/2); const cfs = area * v; const gpm = cfs * 448.831;
      return { "Pipe Area (sq ft)": area.toFixed(4), "Flow Rate (cu ft/s)": cfs.toFixed(3), "Flow Rate (GPM)": gpm.toFixed(1), "Flow Rate (liters/min)": (gpm*3.785).toFixed(1) };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="water-flow-rate-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Water Flow Rate Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate water flow rate in pipes</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="diameter">Pipe Diameter (inches)</label>
              <Input
                id="diameter"
                data-testid="input-diameter"
                type="number"
                value={values.diameter}
                onChange={(e) => setValues({...values, diameter: e.target.value})}
                placeholder="Pipe Diameter (inches)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="velocity">Flow Velocity (ft/s)</label>
              <Input
                id="velocity"
                data-testid="input-velocity"
                type="number"
                value={values.velocity}
                onChange={(e) => setValues({...values, velocity: e.target.value})}
                placeholder="Flow Velocity (ft/s)"
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
