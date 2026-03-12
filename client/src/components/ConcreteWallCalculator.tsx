import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ConcreteWallCalculator() {
  const [values, setValues] = useState({
    length: "20",
    height: "8",
    thickness: "8",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const vol = (parseFloat(s.length)||0) * (parseFloat(s.height)||0) * ((parseFloat(s.thickness)||0)/12) / 27;
      return { "Concrete Volume (cubic yards)": vol.toFixed(2), "Concrete Volume (cubic feet)": (vol*27).toFixed(2), "80lb Bags Needed": Math.ceil(vol * 45) };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="concrete-wall-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Concrete Wall Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate concrete for walls</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="length">Wall Length (ft)</label>
              <Input
                id="length"
                data-testid="input-length"
                type="number"
                value={values.length}
                onChange={(e) => setValues({...values, length: e.target.value})}
                placeholder="Wall Length (ft)"
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
              <label className="block text-sm font-medium mb-1" htmlFor="thickness">Wall Thickness (inches)</label>
              <Input
                id="thickness"
                data-testid="input-thickness"
                type="number"
                value={values.thickness}
                onChange={(e) => setValues({...values, thickness: e.target.value})}
                placeholder="Wall Thickness (inches)"
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
