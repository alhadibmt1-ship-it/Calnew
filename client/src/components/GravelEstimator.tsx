import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function GravelEstimator() {
  const [values, setValues] = useState({
    length: "20",
    width: "10",
    depth: "4",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const vol = (parseFloat(s.length)||0) * (parseFloat(s.width)||0) * ((parseFloat(s.depth)||0)/12);
      const cy = vol / 27; const tons = cy * 1.4;
      return { "Area (sq ft)": ((parseFloat(s.length)||0)*(parseFloat(s.width)||0)).toFixed(0), "Volume (cubic feet)": vol.toFixed(1), "Volume (cubic yards)": cy.toFixed(2), "Weight (tons)": tons.toFixed(2) };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="gravel-estimator">
      <CardHeader>
        <CardTitle className="text-2xl">Gravel Estimator</CardTitle>
        <p className="text-muted-foreground">Estimate gravel needed for an area</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="length">Length (ft)</label>
              <Input
                id="length"
                data-testid="input-length"
                type="number"
                value={values.length}
                onChange={(e) => setValues({...values, length: e.target.value})}
                placeholder="Length (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="width">Width (ft)</label>
              <Input
                id="width"
                data-testid="input-width"
                type="number"
                value={values.width}
                onChange={(e) => setValues({...values, width: e.target.value})}
                placeholder="Width (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="depth">Depth (inches)</label>
              <Input
                id="depth"
                data-testid="input-depth"
                type="number"
                value={values.depth}
                onChange={(e) => setValues({...values, depth: e.target.value})}
                placeholder="Depth (inches)"
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
