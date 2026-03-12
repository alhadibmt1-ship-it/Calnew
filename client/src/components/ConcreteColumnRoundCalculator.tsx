import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ConcreteColumnRoundCalculator() {
  const [values, setValues] = useState({
    diameter: "12",
    height: "10",
    count: "4",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const r = ((parseFloat(s.diameter)||0)/12)/2; const h = parseFloat(s.height)||0; const n = parseFloat(s.count)||1;
      const vol = Math.PI * r * r * h * n / 27;
      return { "Volume per Column (cu ft)": (Math.PI*r*r*h).toFixed(2), "Total Concrete (cubic yards)": vol.toFixed(2), "80lb Bags Needed": Math.ceil(vol * 45) };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="concrete-column-round-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Concrete Column Round Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate concrete for round columns</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="diameter">Diameter (inches)</label>
              <Input
                id="diameter"
                data-testid="input-diameter"
                type="number"
                value={values.diameter}
                onChange={(e) => setValues({...values, diameter: e.target.value})}
                placeholder="Diameter (inches)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="height">Column Height (ft)</label>
              <Input
                id="height"
                data-testid="input-height"
                type="number"
                value={values.height}
                onChange={(e) => setValues({...values, height: e.target.value})}
                placeholder="Column Height (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="count">Number of Columns</label>
              <Input
                id="count"
                data-testid="input-count"
                type="number"
                value={values.count}
                onChange={(e) => setValues({...values, count: e.target.value})}
                placeholder="Number of Columns"
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
