import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function VoltageDropCalculator() {
  const [values, setValues] = useState({
    voltage: "120",
    amps: "20",
    distance: "100",
    wireSize: "12",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const v = parseFloat(s.voltage)||120; const a = parseFloat(s.amps)||0; const d = parseFloat(s.distance)||0;
      const cmils = {14:4110,12:6530,10:10380,8:16510,6:26240,4:41740,2:66360}; const cm = cmils[parseInt(s.wireSize)||12]||6530;
      const drop = (a * d * 2 * 10.8) / cm; const pct = (drop/v)*100;
      return { "Voltage Drop (V)": drop.toFixed(2), "Voltage Drop (%)": pct.toFixed(2), "End Voltage (V)": (v-drop).toFixed(2), "Status": pct<=3?"OK (under 3%)":"Warning (over 3%)" };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="voltage-drop-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Voltage Drop Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate voltage drop in a wire run</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="voltage">Source Voltage (V)</label>
              <Input
                id="voltage"
                data-testid="input-voltage"
                type="number"
                value={values.voltage}
                onChange={(e) => setValues({...values, voltage: e.target.value})}
                placeholder="Source Voltage (V)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="amps">Current (A)</label>
              <Input
                id="amps"
                data-testid="input-amps"
                type="number"
                value={values.amps}
                onChange={(e) => setValues({...values, amps: e.target.value})}
                placeholder="Current (A)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="distance">One-way Distance (ft)</label>
              <Input
                id="distance"
                data-testid="input-distance"
                type="number"
                value={values.distance}
                onChange={(e) => setValues({...values, distance: e.target.value})}
                placeholder="One-way Distance (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="wireSize">Wire Size (AWG)</label>
              <Input
                id="wireSize"
                data-testid="input-wireSize"
                type="number"
                value={values.wireSize}
                onChange={(e) => setValues({...values, wireSize: e.target.value})}
                placeholder="Wire Size (AWG)"
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
