import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function StairStringerCalculator() {
  const [values, setValues] = useState({
    totalRise: "96",
    riserH: "7.5",
    treadD: "10",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const totalRise = parseFloat(s.totalRise)||0; const riserH = parseFloat(s.riserH)||7.5; const treadD = parseFloat(s.treadD)||10;
      const steps = Math.round(totalRise / riserH); const actualRiser = totalRise / steps;
      const totalRun = (steps - 1) * treadD; const stringerLen = Math.sqrt(totalRise*totalRise + totalRun*totalRun) / 12;
      return { "Number of Risers": steps, "Actual Riser Height (in)": actualRiser.toFixed(3), "Number of Treads": steps-1, "Total Run (inches)": totalRun.toFixed(1), "Stringer Length (ft)": stringerLen.toFixed(2) };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="stair-stringer-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Stair Stringer Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate stair stringer dimensions</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="totalRise">Total Rise (inches)</label>
              <Input
                id="totalRise"
                data-testid="input-totalRise"
                type="number"
                value={values.totalRise}
                onChange={(e) => setValues({...values, totalRise: e.target.value})}
                placeholder="Total Rise (inches)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="riserH">Desired Riser Height (inches)</label>
              <Input
                id="riserH"
                data-testid="input-riserH"
                type="number"
                value={values.riserH}
                onChange={(e) => setValues({...values, riserH: e.target.value})}
                placeholder="Desired Riser Height (inches)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="treadD">Tread Depth (inches)</label>
              <Input
                id="treadD"
                data-testid="input-treadD"
                type="number"
                value={values.treadD}
                onChange={(e) => setValues({...values, treadD: e.target.value})}
                placeholder="Tread Depth (inches)"
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
