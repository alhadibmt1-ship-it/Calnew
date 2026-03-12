import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function WoodBeamSpanCalculator() {
  const [values, setValues] = useState({
    span: "12",
    tributaryW: "6",
    load: "50",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const span = parseFloat(s.span)||0; const trib = parseFloat(s.tributaryW)||0; const load = parseFloat(s.load)||50;
      const totalLoad = load * trib * span; const moment = totalLoad * span / 8;
      let beam = "4x8"; if(span>8) beam="4x10"; if(span>12) beam="4x12"; if(span>16) beam="6x12";
      if(trib>8||load>60) { beam="6x10"; if(span>10) beam="6x12"; }
      return { "Total Load (lbs)": totalLoad.toFixed(0), "Bending Moment (ft-lbs)": moment.toFixed(0), "Recommended Beam": beam, "Span (ft)": span };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="wood-beam-span-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Wood Beam Span Calculator</CardTitle>
        <p className="text-muted-foreground">Estimate wood beam size based on span and load</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="span">Beam Span (ft)</label>
              <Input
                id="span"
                data-testid="input-span"
                type="number"
                value={values.span}
                onChange={(e) => setValues({...values, span: e.target.value})}
                placeholder="Beam Span (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="tributaryW">Tributary Width (ft)</label>
              <Input
                id="tributaryW"
                data-testid="input-tributaryW"
                type="number"
                value={values.tributaryW}
                onChange={(e) => setValues({...values, tributaryW: e.target.value})}
                placeholder="Tributary Width (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="load">Total Load (psf)</label>
              <Input
                id="load"
                data-testid="input-load"
                type="number"
                value={values.load}
                onChange={(e) => setValues({...values, load: e.target.value})}
                placeholder="Total Load (psf)"
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
