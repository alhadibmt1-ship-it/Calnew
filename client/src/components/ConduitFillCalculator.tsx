import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ConduitFillCalculator() {
  const [values, setValues] = useState({
    conduitSize: "1",
    wireSize: "12",
    wireCount: "3",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const conduitAreas = {0.5:0.122,0.75:0.213,1:0.346,1.25:0.598,1.5:0.814,2:1.316};
      const wireAreas = {14:0.0097,12:0.0133,10:0.0211,8:0.0366,6:0.0507,4:0.0824};
      const cArea = conduitAreas[parseFloat(s.conduitSize)]||0.346; const wArea = wireAreas[parseInt(s.wireSize)]||0.0133;
      const n = parseInt(s.wireCount)||1; const totalWire = wArea * n; const fill = (totalWire/cArea)*100;
      const maxFill = n<=1?53:n<=2?31:40;
      return { "Conduit Area (sq in)": cArea, "Wire Area Each (sq in)": wArea, "Total Wire Area (sq in)": totalWire.toFixed(4), "Fill (%)": fill.toFixed(1), "Max Allowed (%)": maxFill, "Status": fill<=maxFill?"OK":"Over-filled" };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="conduit-fill-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Conduit Fill Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate conduit fill percentage</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="conduitSize">Conduit Size (inches)</label>
              <Input
                id="conduitSize"
                data-testid="input-conduitSize"
                type="number"
                value={values.conduitSize}
                onChange={(e) => setValues({...values, conduitSize: e.target.value})}
                placeholder="Conduit Size (inches)"
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
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="wireCount">Number of Wires</label>
              <Input
                id="wireCount"
                data-testid="input-wireCount"
                type="number"
                value={values.wireCount}
                onChange={(e) => setValues({...values, wireCount: e.target.value})}
                placeholder="Number of Wires"
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
