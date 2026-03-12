import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FencePicketCalculator() {
  const [values, setValues] = useState({
    fenceLen: "100",
    picketW: "3.5",
    gap: "1.5",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const len = (parseFloat(s.fenceLen)||0) * 12;
      const pw = parseFloat(s.picketW)||3.5; const gap = parseFloat(s.gap)||1.5;
      const pickets = Math.ceil(len / (pw + gap));
      return { "Fence Length (ft)": parseFloat(s.fenceLen)||0, "Pickets Needed": pickets, "With 5% Waste": Math.ceil(pickets * 1.05) };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="fence-picket-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Fence Picket Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate fence pickets needed</p>
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
              <label className="block text-sm font-medium mb-1" htmlFor="picketW">Picket Width (inches)</label>
              <Input
                id="picketW"
                data-testid="input-picketW"
                type="number"
                value={values.picketW}
                onChange={(e) => setValues({...values, picketW: e.target.value})}
                placeholder="Picket Width (inches)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="gap">Gap Between Pickets (inches)</label>
              <Input
                id="gap"
                data-testid="input-gap"
                type="number"
                value={values.gap}
                onChange={(e) => setValues({...values, gap: e.target.value})}
                placeholder="Gap Between Pickets (inches)"
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
