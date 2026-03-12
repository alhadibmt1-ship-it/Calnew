import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function HorizontalTankCapacityCalculator() {
  const [values, setValues] = useState({
    diameter: "4",
    length: "8",
    fillLevel: "100",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const d = parseFloat(s.diameter)||0; const l = parseFloat(s.length)||0; const fill = (parseFloat(s.fillLevel)||100)/100;
      const vol = Math.PI * (d/2)*(d/2) * l; const gallons = vol * 7.48052; const filled = gallons * fill;
      return { "Total Volume (cu ft)": vol.toFixed(2), "Total Capacity (gallons)": gallons.toFixed(0), "Filled Amount (gallons)": filled.toFixed(0) };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="horizontal-tank-capacity-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Horizontal Tank Capacity Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate horizontal cylindrical tank capacity</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="diameter">Tank Diameter (ft)</label>
              <Input
                id="diameter"
                data-testid="input-diameter"
                type="number"
                value={values.diameter}
                onChange={(e) => setValues({...values, diameter: e.target.value})}
                placeholder="Tank Diameter (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="length">Tank Length (ft)</label>
              <Input
                id="length"
                data-testid="input-length"
                type="number"
                value={values.length}
                onChange={(e) => setValues({...values, length: e.target.value})}
                placeholder="Tank Length (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="fillLevel">Fill Level (%)</label>
              <Input
                id="fillLevel"
                data-testid="input-fillLevel"
                type="number"
                value={values.fillLevel}
                onChange={(e) => setValues({...values, fillLevel: e.target.value})}
                placeholder="Fill Level (%)"
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
