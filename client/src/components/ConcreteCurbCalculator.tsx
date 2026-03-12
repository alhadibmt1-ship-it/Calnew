import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ConcreteCurbCalculator() {
  const [values, setValues] = useState({
    length: "50",
    height: "6",
    width: "6",
    gutterW: "12",
    gutterD: "2",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const curbVol = (parseFloat(s.length)||0) * ((parseFloat(s.height)||0)/12) * ((parseFloat(s.width)||0)/12);
      const gutterVol = (parseFloat(s.length)||0) * ((parseFloat(s.gutterD)||0)/12) * ((parseFloat(s.gutterW)||0)/12);
      const total = (curbVol + gutterVol) / 27;
      return { "Curb Volume (cu ft)": curbVol.toFixed(2), "Gutter Volume (cu ft)": gutterVol.toFixed(2), "Total Concrete (cubic yards)": total.toFixed(2) };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="concrete-curb-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Concrete Curb Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate concrete for curbs and gutters</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="length">Curb Length (ft)</label>
              <Input
                id="length"
                data-testid="input-length"
                type="number"
                value={values.length}
                onChange={(e) => setValues({...values, length: e.target.value})}
                placeholder="Curb Length (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="height">Curb Height (inches)</label>
              <Input
                id="height"
                data-testid="input-height"
                type="number"
                value={values.height}
                onChange={(e) => setValues({...values, height: e.target.value})}
                placeholder="Curb Height (inches)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="width">Curb Width (inches)</label>
              <Input
                id="width"
                data-testid="input-width"
                type="number"
                value={values.width}
                onChange={(e) => setValues({...values, width: e.target.value})}
                placeholder="Curb Width (inches)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="gutterW">Gutter Width (inches)</label>
              <Input
                id="gutterW"
                data-testid="input-gutterW"
                type="number"
                value={values.gutterW}
                onChange={(e) => setValues({...values, gutterW: e.target.value})}
                placeholder="Gutter Width (inches)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="gutterD">Gutter Depth (inches)</label>
              <Input
                id="gutterD"
                data-testid="input-gutterD"
                type="number"
                value={values.gutterD}
                onChange={(e) => setValues({...values, gutterD: e.target.value})}
                placeholder="Gutter Depth (inches)"
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
