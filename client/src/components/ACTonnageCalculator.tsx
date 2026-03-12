import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ACTonnageCalculator() {
  const [values, setValues] = useState({
    sqft: "1500",
    ceilingH: "8",
    climate: "2",
    windows: "100",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const area = parseFloat(s.sqft)||0; const climF = {1:0.85,2:1.0,3:1.2}[parseInt(s.climate)||2]||1;
      const winF = 1 + (parseFloat(s.windows)||0) * 0.001;
      const btu = area * 25 * climF * winF; const tons = btu / 12000;
      return { "Cooling BTU": Math.round(btu).toLocaleString(), "AC Tonnage": tons.toFixed(1), "Recommended Unit": Math.ceil(tons*2)/2 + " ton" };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="a-c-tonnage-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">AC Tonnage Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate AC tonnage needed for cooling</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="sqft">Area (sq ft)</label>
              <Input
                id="sqft"
                data-testid="input-sqft"
                type="number"
                value={values.sqft}
                onChange={(e) => setValues({...values, sqft: e.target.value})}
                placeholder="Area (sq ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="ceilingH">Ceiling Height (ft)</label>
              <Input
                id="ceilingH"
                data-testid="input-ceilingH"
                type="number"
                value={values.ceilingH}
                onChange={(e) => setValues({...values, ceilingH: e.target.value})}
                placeholder="Ceiling Height (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="climate">Climate (1=mild,2=mod,3=hot)</label>
              <Input
                id="climate"
                data-testid="input-climate"
                type="number"
                value={values.climate}
                onChange={(e) => setValues({...values, climate: e.target.value})}
                placeholder="Climate (1=mild,2=mod,3=hot)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="windows">Window Area (sq ft)</label>
              <Input
                id="windows"
                data-testid="input-windows"
                type="number"
                value={values.windows}
                onChange={(e) => setValues({...values, windows: e.target.value})}
                placeholder="Window Area (sq ft)"
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
