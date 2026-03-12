import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FencePostCalculator() {
  const [values, setValues] = useState({
    fenceLen: "100",
    spacing: "8",
    corners: "4",
    gates: "1",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const len = parseFloat(s.fenceLen)||0; const sp = parseFloat(s.spacing)||8;
      const linePosts = Math.ceil(len / sp) + 1; const corners = parseInt(s.corners)||0; const gates = parseInt(s.gates)||0;
      const total = linePosts + corners + gates * 2;
      return { "Line Posts": linePosts, "Corner Posts": corners, "Gate Posts": gates*2, "Total Posts": total };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="fence-post-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Fence Post Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate fence posts needed</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="fenceLen">Fence Length (ft)</label>
              <Input
                id="fenceLen"
                data-testid="input-fenceLen"
                type="number"
                value={values.fenceLen}
                onChange={(e) => setValues({...values, fenceLen: e.target.value})}
                placeholder="Fence Length (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="spacing">Post Spacing (ft)</label>
              <Input
                id="spacing"
                data-testid="input-spacing"
                type="number"
                value={values.spacing}
                onChange={(e) => setValues({...values, spacing: e.target.value})}
                placeholder="Post Spacing (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="corners">Number of Corners</label>
              <Input
                id="corners"
                data-testid="input-corners"
                type="number"
                value={values.corners}
                onChange={(e) => setValues({...values, corners: e.target.value})}
                placeholder="Number of Corners"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="gates">Number of Gates</label>
              <Input
                id="gates"
                data-testid="input-gates"
                type="number"
                value={values.gates}
                onChange={(e) => setValues({...values, gates: e.target.value})}
                placeholder="Number of Gates"
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
