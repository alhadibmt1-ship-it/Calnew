import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BTUHeatLoadCalculator() {
  const [values, setValues] = useState({
    sqft: "1500",
    ceilingH: "8",
    insulation: "2",
    climate: "2",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const area = parseFloat(s.sqft)||0; const h = parseFloat(s.ceilingH)||8;
      const insF = {1:1.3,2:1.0,3:0.8}[parseInt(s.insulation)||2]||1; const climF = {1:0.8,2:1.0,3:1.3}[parseInt(s.climate)||2]||1;
      const btu = area * h * 4.5 * insF * climF;
      return { "Area (sq ft)": area, "Volume (cu ft)": (area*h).toFixed(0), "BTU Required": Math.round(btu).toLocaleString(), "Tons of Heating": (btu/12000).toFixed(1) };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="b-t-u-heat-load-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">BTU Heat Load Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate heating BTU requirements</p>
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
              <label className="block text-sm font-medium mb-1" htmlFor="insulation">Insulation (1=poor,2=avg,3=good)</label>
              <Input
                id="insulation"
                data-testid="input-insulation"
                type="number"
                value={values.insulation}
                onChange={(e) => setValues({...values, insulation: e.target.value})}
                placeholder="Insulation (1=poor,2=avg,3=good)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="climate">Climate Zone (1=mild,2=mod,3=cold)</label>
              <Input
                id="climate"
                data-testid="input-climate"
                type="number"
                value={values.climate}
                onChange={(e) => setValues({...values, climate: e.target.value})}
                placeholder="Climate Zone (1=mild,2=mod,3=cold)"
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
