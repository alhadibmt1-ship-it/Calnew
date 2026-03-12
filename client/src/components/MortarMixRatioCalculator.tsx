import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MortarMixRatioCalculator() {
  const [values, setValues] = useState({
    volume: "10",
    cement: "1",
    sand: "3",
    lime: "0",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const vol = parseFloat(s.volume)||0; const c = parseFloat(s.cement)||1; const sa = parseFloat(s.sand)||3; const l = parseFloat(s.lime)||0;
      const total = c + sa + l; const cVol = vol*(c/total); const sVol = vol*(sa/total); const lVol = vol*(l/total);
      return { "Cement Volume (cu ft)": cVol.toFixed(2), "Cement Bags (94lb)": Math.ceil(cVol * 94 / 94), "Sand Volume (cu ft)": sVol.toFixed(2), "Lime Volume (cu ft)": lVol.toFixed(2), "Mix Ratio": c+":"+sa+(l?":"+l:"") };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="mortar-mix-ratio-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Mortar Mix Ratio Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate mortar mix quantities by ratio</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="volume">Mortar Volume Needed (cu ft)</label>
              <Input
                id="volume"
                data-testid="input-volume"
                type="number"
                value={values.volume}
                onChange={(e) => setValues({...values, volume: e.target.value})}
                placeholder="Mortar Volume Needed (cu ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="cement">Cement Parts</label>
              <Input
                id="cement"
                data-testid="input-cement"
                type="number"
                value={values.cement}
                onChange={(e) => setValues({...values, cement: e.target.value})}
                placeholder="Cement Parts"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="sand">Sand Parts</label>
              <Input
                id="sand"
                data-testid="input-sand"
                type="number"
                value={values.sand}
                onChange={(e) => setValues({...values, sand: e.target.value})}
                placeholder="Sand Parts"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="lime">Lime Parts (0 if none)</label>
              <Input
                id="lime"
                data-testid="input-lime"
                type="number"
                value={values.lime}
                onChange={(e) => setValues({...values, lime: e.target.value})}
                placeholder="Lime Parts (0 if none)"
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
