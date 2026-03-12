import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BrickWallCalculator() {
  const [values, setValues] = useState({
    length: "20",
    height: "8",
    brickL: "8",
    brickH: "2.25",
    mortar: "0.375",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const area = (parseFloat(s.length)||0) * (parseFloat(s.height)||0);
      const bL = ((parseFloat(s.brickL)||8) + (parseFloat(s.mortar)||0.375)) / 12;
      const bH = ((parseFloat(s.brickH)||2.25) + (parseFloat(s.mortar)||0.375)) / 12;
      const bricksPerSqFt = 1 / (bL * bH); const total = Math.ceil(area * bricksPerSqFt * 1.05);
      return { "Wall Area (sq ft)": area.toFixed(0), "Bricks per sq ft": bricksPerSqFt.toFixed(1), "Total Bricks (5% waste)": total };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="brick-wall-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Brick Wall Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate bricks needed for a wall with mortar</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="length">Wall Length (ft)</label>
              <Input
                id="length"
                data-testid="input-length"
                type="number"
                value={values.length}
                onChange={(e) => setValues({...values, length: e.target.value})}
                placeholder="Wall Length (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="height">Wall Height (ft)</label>
              <Input
                id="height"
                data-testid="input-height"
                type="number"
                value={values.height}
                onChange={(e) => setValues({...values, height: e.target.value})}
                placeholder="Wall Height (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="brickL">Brick Length (inches)</label>
              <Input
                id="brickL"
                data-testid="input-brickL"
                type="number"
                value={values.brickL}
                onChange={(e) => setValues({...values, brickL: e.target.value})}
                placeholder="Brick Length (inches)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="brickH">Brick Height (inches)</label>
              <Input
                id="brickH"
                data-testid="input-brickH"
                type="number"
                value={values.brickH}
                onChange={(e) => setValues({...values, brickH: e.target.value})}
                placeholder="Brick Height (inches)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="mortar">Mortar Joint (inches)</label>
              <Input
                id="mortar"
                data-testid="input-mortar"
                type="number"
                value={values.mortar}
                onChange={(e) => setValues({...values, mortar: e.target.value})}
                placeholder="Mortar Joint (inches)"
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
