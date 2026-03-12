import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SidingSquareCalculator() {
  const [values, setValues] = useState({
    perimeter: "140",
    height: "9",
    gableArea: "80",
    openings: "120",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const wallArea = (parseFloat(s.perimeter)||0) * (parseFloat(s.height)||0);
      const gable = parseFloat(s.gableArea)||0; const openings = parseFloat(s.openings)||0;
      const netArea = wallArea + gable - openings; const squares = netArea / 100;
      return { "Gross Wall Area (sq ft)": wallArea.toFixed(0), "Plus Gables (sq ft)": gable.toFixed(0), "Minus Openings (sq ft)": openings.toFixed(0), "Net Area (sq ft)": netArea.toFixed(0), "Siding Squares": squares.toFixed(1) };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="siding-square-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Siding Square Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate siding squares needed</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="perimeter">House Perimeter (ft)</label>
              <Input
                id="perimeter"
                data-testid="input-perimeter"
                type="number"
                value={values.perimeter}
                onChange={(e) => setValues({...values, perimeter: e.target.value})}
                placeholder="House Perimeter (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="height">Wall Height (ft)</label>
              <Input
                id="height"
                data-testid="input-height"
                type="number"
                value={values.height}
                onChange={(e) => setValues({...values, height: e.target.value})}
                placeholder="Wall Height (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="gableArea">Gable Area (sq ft)</label>
              <Input
                id="gableArea"
                data-testid="input-gableArea"
                type="number"
                value={values.gableArea}
                onChange={(e) => setValues({...values, gableArea: e.target.value})}
                placeholder="Gable Area (sq ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="openings">Window/Door Area (sq ft)</label>
              <Input
                id="openings"
                data-testid="input-openings"
                type="number"
                value={values.openings}
                onChange={(e) => setValues({...values, openings: e.target.value})}
                placeholder="Window/Door Area (sq ft)"
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
