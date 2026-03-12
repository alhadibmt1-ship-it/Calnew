import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DrywallSheetCalculator() {
  const [values, setValues] = useState({
    length: "15",
    width: "12",
    height: "8",
    ceiling: "1",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const l = parseFloat(s.length)||0; const w = parseFloat(s.width)||0; const h = parseFloat(s.height)||0;
      const wallArea = 2*(l+w)*h; const ceilArea = (parseInt(s.ceiling)||0) ? l*w : 0;
      const totalArea = wallArea + ceilArea; const sheets = Math.ceil(totalArea / 32 * 1.1);
      return { "Wall Area (sq ft)": wallArea.toFixed(0), "Ceiling Area (sq ft)": ceilArea.toFixed(0), "Total Area (sq ft)": totalArea.toFixed(0), "4x8 Sheets (10% waste)": sheets };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="drywall-sheet-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Drywall Sheet Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate drywall sheets needed for walls and ceilings</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="length">Room Length (ft)</label>
              <Input
                id="length"
                data-testid="input-length"
                type="number"
                value={values.length}
                onChange={(e) => setValues({...values, length: e.target.value})}
                placeholder="Room Length (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="width">Room Width (ft)</label>
              <Input
                id="width"
                data-testid="input-width"
                type="number"
                value={values.width}
                onChange={(e) => setValues({...values, width: e.target.value})}
                placeholder="Room Width (ft)"
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
              <label className="block text-sm font-medium mb-1" htmlFor="ceiling">Include Ceiling (1=yes, 0=no)</label>
              <Input
                id="ceiling"
                data-testid="input-ceiling"
                type="number"
                value={values.ceiling}
                onChange={(e) => setValues({...values, ceiling: e.target.value})}
                placeholder="Include Ceiling (1=yes, 0=no)"
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
