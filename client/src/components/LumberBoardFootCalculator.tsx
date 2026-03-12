import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LumberBoardFootCalculator() {
  const [values, setValues] = useState({
    thickness: "2",
    width: "6",
    length: "8",
    count: "10",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const t = parseFloat(s.thickness)||0; const w = parseFloat(s.width)||0; const l = parseFloat(s.length)||0; const n = parseFloat(s.count)||1;
      const bf = (t * w * l) / 12; const total = bf * n;
      return { "Board Feet per Piece": bf.toFixed(2), "Number of Pieces": n, "Total Board Feet": total.toFixed(2) };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="lumber-board-foot-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Lumber Board Foot Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate board feet of lumber</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="thickness">Thickness (inches)</label>
              <Input
                id="thickness"
                data-testid="input-thickness"
                type="number"
                value={values.thickness}
                onChange={(e) => setValues({...values, thickness: e.target.value})}
                placeholder="Thickness (inches)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="width">Width (inches)</label>
              <Input
                id="width"
                data-testid="input-width"
                type="number"
                value={values.width}
                onChange={(e) => setValues({...values, width: e.target.value})}
                placeholder="Width (inches)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="length">Length (ft)</label>
              <Input
                id="length"
                data-testid="input-length"
                type="number"
                value={values.length}
                onChange={(e) => setValues({...values, length: e.target.value})}
                placeholder="Length (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="count">Number of Pieces</label>
              <Input
                id="count"
                data-testid="input-count"
                type="number"
                value={values.count}
                onChange={(e) => setValues({...values, count: e.target.value})}
                placeholder="Number of Pieces"
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
