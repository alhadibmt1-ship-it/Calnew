import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RoofPitchCalculator() {
  const [values, setValues] = useState({
    rise: "6",
    run: "12",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const rise = parseFloat(s.rise)||0; const run = parseFloat(s.run)||12;
      const pitch = rise / run * 12; const angle = Math.atan(rise/run) * 180 / Math.PI;
      const slope = (rise/run*100);
      return { "Pitch": pitch.toFixed(1)+":12", "Angle (degrees)": angle.toFixed(1), "Slope (%)": slope.toFixed(1), "Rafter Factor": (Math.sqrt(1+(rise/run)*(rise/run))).toFixed(4) };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="roof-pitch-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Roof Pitch Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate roof pitch from rise and run</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="rise">Rise (inches)</label>
              <Input
                id="rise"
                data-testid="input-rise"
                type="number"
                value={values.rise}
                onChange={(e) => setValues({...values, rise: e.target.value})}
                placeholder="Rise (inches)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="run">Run (inches)</label>
              <Input
                id="run"
                data-testid="input-run"
                type="number"
                value={values.run}
                onChange={(e) => setValues({...values, run: e.target.value})}
                placeholder="Run (inches)"
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
