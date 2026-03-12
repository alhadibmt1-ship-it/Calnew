import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PipeVolumeCalculator() {
  const [values, setValues] = useState({
    diameter: "4",
    length: "100",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const d = (parseFloat(s.diameter)||0) / 12; const l = parseFloat(s.length)||0;
      const r = d / 2; const vol = Math.PI * r * r * l;
      const gallons = vol * 7.48052;
      return { "Volume (cubic feet)": vol.toFixed(3), "Volume (gallons)": gallons.toFixed(2), "Volume (liters)": (gallons*3.785).toFixed(2) };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="pipe-volume-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Pipe Volume Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate the volume of a pipe</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="diameter">Inner Diameter (inches)</label>
              <Input
                id="diameter"
                data-testid="input-diameter"
                type="number"
                value={values.diameter}
                onChange={(e) => setValues({...values, diameter: e.target.value})}
                placeholder="Inner Diameter (inches)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="length">Pipe Length (ft)</label>
              <Input
                id="length"
                data-testid="input-length"
                type="number"
                value={values.length}
                onChange={(e) => setValues({...values, length: e.target.value})}
                placeholder="Pipe Length (ft)"
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
