import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CinderBlockWallCalculator() {
  const [values, setValues] = useState({
    length: "30",
    height: "8",
    blockL: "16",
    blockH: "8",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const area = (parseFloat(s.length)||0) * (parseFloat(s.height)||0);
      const blockArea = ((parseFloat(s.blockL)||16)/12) * ((parseFloat(s.blockH)||8)/12);
      const blocks = Math.ceil(area / blockArea * 1.05);
      return { "Wall Area (sq ft)": area.toFixed(0), "Blocks per sq ft": (1/blockArea).toFixed(1), "Total Blocks (5% waste)": blocks };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="cinder-block-wall-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Cinder Block Wall Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate cinder blocks for a wall</p>
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
              <label className="block text-sm font-medium mb-1" htmlFor="blockL">Block Length (inches)</label>
              <Input
                id="blockL"
                data-testid="input-blockL"
                type="number"
                value={values.blockL}
                onChange={(e) => setValues({...values, blockL: e.target.value})}
                placeholder="Block Length (inches)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="blockH">Block Height (inches)</label>
              <Input
                id="blockH"
                data-testid="input-blockH"
                type="number"
                value={values.blockH}
                onChange={(e) => setValues({...values, blockH: e.target.value})}
                placeholder="Block Height (inches)"
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
