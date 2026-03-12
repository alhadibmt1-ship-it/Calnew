import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BrickLayerCalculator() {
  const [values, setValues] = useState({
    wallH: "8",
    brickH: "2.25",
    mortar: "0.375",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const wallIn = (parseFloat(s.wallH)||0) * 12;
      const courseH = (parseFloat(s.brickH)||2.25) + (parseFloat(s.mortar)||0.375);
      const courses = Math.ceil(wallIn / courseH);
      return { "Wall Height (inches)": wallIn.toFixed(1), "Course Height (inches)": courseH.toFixed(3), "Number of Courses": courses, "Actual Height (inches)": (courses * courseH).toFixed(2) };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="brick-layer-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Brick Layer Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate number of brick courses and layout</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="wallH">Wall Height (ft)</label>
              <Input
                id="wallH"
                data-testid="input-wallH"
                type="number"
                value={values.wallH}
                onChange={(e) => setValues({...values, wallH: e.target.value})}
                placeholder="Wall Height (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="brickH">Brick Height (inches)</label>
              <Input
                id="brickH"
                data-testid="input-brickH"
                type="number"
                value={values.brickH}
                onChange={(e) => setValues({...values, brickH: e.target.value})}
                placeholder="Brick Height (inches)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="mortar">Mortar Joint (inches)</label>
              <Input
                id="mortar"
                data-testid="input-mortar"
                type="number"
                value={values.mortar}
                onChange={(e) => setValues({...values, mortar: e.target.value})}
                placeholder="Mortar Joint (inches)"
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
