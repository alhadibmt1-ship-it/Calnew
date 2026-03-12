import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ConcreteFootingCalculator() {
  const [values, setValues] = useState({
    length: "30",
    width: "18",
    depth: "12",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const vol = (parseFloat(s.length)||0) * ((parseFloat(s.width)||0)/12) * ((parseFloat(s.depth)||0)/12) / 27;
      return { "Concrete Volume (cubic yards)": vol.toFixed(2), "Concrete Volume (cubic feet)": (vol*27).toFixed(2), "80lb Bags Needed": Math.ceil(vol * 45) };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="concrete-footing-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Concrete Footing Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate concrete for footings</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="length">Footing Length (ft)</label>
              <Input
                id="length"
                data-testid="input-length"
                type="number"
                value={values.length}
                onChange={(e) => setValues({...values, length: e.target.value})}
                placeholder="Footing Length (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="width">Footing Width (inches)</label>
              <Input
                id="width"
                data-testid="input-width"
                type="number"
                value={values.width}
                onChange={(e) => setValues({...values, width: e.target.value})}
                placeholder="Footing Width (inches)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="depth">Footing Depth (inches)</label>
              <Input
                id="depth"
                data-testid="input-depth"
                type="number"
                value={values.depth}
                onChange={(e) => setValues({...values, depth: e.target.value})}
                placeholder="Footing Depth (inches)"
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
