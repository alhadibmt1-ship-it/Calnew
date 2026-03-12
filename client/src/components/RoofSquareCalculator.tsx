import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RoofSquareCalculator() {
  const [values, setValues] = useState({
    length: "40",
    width: "25",
    pitch: "6",
    waste: "10",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const area = (parseFloat(s.length)||0) * (parseFloat(s.width)||0);
      const pitch = parseFloat(s.pitch)||0; const factor = Math.sqrt(1 + (pitch/12)*(pitch/12));
      const actualArea = area * factor; const waste = parseFloat(s.waste)||10;
      const totalArea = actualArea * (1 + waste/100); const squares = totalArea / 100;
      return { "Flat Area (sq ft)": area.toFixed(0), "Pitch Factor": factor.toFixed(3), "Actual Roof Area (sq ft)": actualArea.toFixed(0), "With Waste (sq ft)": totalArea.toFixed(0), "Roofing Squares": squares.toFixed(1), "Shingle Bundles (3/sq)": Math.ceil(squares*3) };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="roof-square-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Roof Square Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate roofing squares needed</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="length">Roof Length (ft)</label>
              <Input
                id="length"
                data-testid="input-length"
                type="number"
                value={values.length}
                onChange={(e) => setValues({...values, length: e.target.value})}
                placeholder="Roof Length (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="width">Roof Width (ft)</label>
              <Input
                id="width"
                data-testid="input-width"
                type="number"
                value={values.width}
                onChange={(e) => setValues({...values, width: e.target.value})}
                placeholder="Roof Width (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="pitch">Roof Pitch (rise/12)</label>
              <Input
                id="pitch"
                data-testid="input-pitch"
                type="number"
                value={values.pitch}
                onChange={(e) => setValues({...values, pitch: e.target.value})}
                placeholder="Roof Pitch (rise/12)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="waste">Waste Factor (%)</label>
              <Input
                id="waste"
                data-testid="input-waste"
                type="number"
                value={values.waste}
                onChange={(e) => setValues({...values, waste: e.target.value})}
                placeholder="Waste Factor (%)"
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
