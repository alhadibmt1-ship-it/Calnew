import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RebarWeightCalculator() {
  const [values, setValues] = useState({
    barSize: "4",
    length: "100",
    count: "10",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const sizes = {3:0.376,4:0.668,5:1.043,6:1.502,7:2.044,8:2.670,9:3.400,10:4.303,11:5.313,14:7.650,18:13.600};
      const sz = parseInt(s.barSize)||4; const len = parseFloat(s.length)||0; const n = parseFloat(s.count)||1;
      const wPerFt = sizes[sz] || 0.668; const total = wPerFt * len * n;
      return { "Bar Size": "#"+sz, "Weight per Foot (lbs)": wPerFt.toFixed(3), "Total Length (ft)": (len*n).toFixed(0), "Total Weight (lbs)": total.toFixed(1), "Total Weight (tons)": (total/2000).toFixed(3) };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="rebar-weight-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Rebar Weight Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate the weight of rebar by size and length</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="barSize">Bar Size (#3-#18)</label>
              <Input
                id="barSize"
                data-testid="input-barSize"
                type="number"
                value={values.barSize}
                onChange={(e) => setValues({...values, barSize: e.target.value})}
                placeholder="Bar Size (#3-#18)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="length">Total Length (ft)</label>
              <Input
                id="length"
                data-testid="input-length"
                type="number"
                value={values.length}
                onChange={(e) => setValues({...values, length: e.target.value})}
                placeholder="Total Length (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="count">Number of Bars</label>
              <Input
                id="count"
                data-testid="input-count"
                type="number"
                value={values.count}
                onChange={(e) => setValues({...values, count: e.target.value})}
                placeholder="Number of Bars"
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
