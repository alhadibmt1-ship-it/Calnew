import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PumpHeadCalculator() {
  const [values, setValues] = useState({
    staticH: "20",
    frictionLoss: "5",
    pressure: "30",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const sh = parseFloat(s.staticH)||0; const fl = parseFloat(s.frictionLoss)||0; const pr = parseFloat(s.pressure)||0;
      const pressureHead = pr * 2.31; const tdh = sh + fl + pressureHead;
      return { "Static Head (ft)": sh, "Friction Loss (ft)": fl, "Pressure Head (ft)": pressureHead.toFixed(1), "Total Dynamic Head (ft)": tdh.toFixed(1) };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="pump-head-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Pump Head Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate total dynamic head for pump sizing</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="staticH">Static Head (ft)</label>
              <Input
                id="staticH"
                data-testid="input-staticH"
                type="number"
                value={values.staticH}
                onChange={(e) => setValues({...values, staticH: e.target.value})}
                placeholder="Static Head (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="frictionLoss">Friction Loss (ft)</label>
              <Input
                id="frictionLoss"
                data-testid="input-frictionLoss"
                type="number"
                value={values.frictionLoss}
                onChange={(e) => setValues({...values, frictionLoss: e.target.value})}
                placeholder="Friction Loss (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="pressure">Discharge Pressure (psi)</label>
              <Input
                id="pressure"
                data-testid="input-pressure"
                type="number"
                value={values.pressure}
                onChange={(e) => setValues({...values, pressure: e.target.value})}
                placeholder="Discharge Pressure (psi)"
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
