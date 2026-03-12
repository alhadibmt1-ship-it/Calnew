import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AirDuctSizeCalculator() {
  const [values, setValues] = useState({
    cfm: "400",
    velocity: "600",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const cfm = parseFloat(s.cfm)||0; const vel = parseFloat(s.velocity)||600;
      const areaSqIn = (cfm / vel) * 144; const diam = Math.sqrt(areaSqIn * 4 / Math.PI);
      const roundDuct = Math.ceil(diam); const rectW = Math.ceil(Math.sqrt(areaSqIn));
      return { "Required Area (sq in)": areaSqIn.toFixed(1), "Round Duct Diameter (in)": roundDuct, "Square Duct Size (in)": rectW+"x"+rectW, "CFM": cfm, "Velocity (ft/min)": vel };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="air-duct-size-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Air Duct Size Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate duct size from CFM and velocity</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="cfm">Air Flow (CFM)</label>
              <Input
                id="cfm"
                data-testid="input-cfm"
                type="number"
                value={values.cfm}
                onChange={(e) => setValues({...values, cfm: e.target.value})}
                placeholder="Air Flow (CFM)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="velocity">Air Velocity (ft/min)</label>
              <Input
                id="velocity"
                data-testid="input-velocity"
                type="number"
                value={values.velocity}
                onChange={(e) => setValues({...values, velocity: e.target.value})}
                placeholder="Air Velocity (ft/min)"
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
