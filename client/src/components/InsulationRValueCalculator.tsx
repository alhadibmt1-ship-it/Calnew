import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function InsulationRValueCalculator() {
  const [values, setValues] = useState({
    targetR: "30",
    rPerInch: "3.5",
    area: "1000",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const target = parseFloat(s.targetR)||0; const rpi = parseFloat(s.rPerInch)||3.5; const area = parseFloat(s.area)||0;
      const thickness = target / rpi; const batts = Math.ceil(area / 40);
      return { "Thickness Needed (inches)": thickness.toFixed(1), "Target R-Value": target, "R-Value per Inch": rpi, "Area (sq ft)": area, "Batts/Rolls (40 sq ft each)": batts };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="insulation-r-value-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Insulation R Value Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate insulation R-value and thickness needed</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="targetR">Target R-Value</label>
              <Input
                id="targetR"
                data-testid="input-targetR"
                type="number"
                value={values.targetR}
                onChange={(e) => setValues({...values, targetR: e.target.value})}
                placeholder="Target R-Value"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="rPerInch">R-Value per Inch</label>
              <Input
                id="rPerInch"
                data-testid="input-rPerInch"
                type="number"
                value={values.rPerInch}
                onChange={(e) => setValues({...values, rPerInch: e.target.value})}
                placeholder="R-Value per Inch"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="area">Area to Insulate (sq ft)</label>
              <Input
                id="area"
                data-testid="input-area"
                type="number"
                value={values.area}
                onChange={(e) => setValues({...values, area: e.target.value})}
                placeholder="Area to Insulate (sq ft)"
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
