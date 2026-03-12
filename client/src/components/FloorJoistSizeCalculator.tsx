import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FloorJoistSizeCalculator() {
  const [values, setValues] = useState({
    span: "12",
    spacing: "16",
    load: "40",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const span = parseFloat(s.span)||0; const load = parseFloat(s.load)||40;
      let size = "2x6"; if(span>8) size="2x8"; if(span>12) size="2x10"; if(span>16) size="2x12";
      if(load>40) { if(span>6) size="2x8"; if(span>10) size="2x10"; if(span>14) size="2x12"; }
      return { "Span (ft)": span, "Spacing": (parseFloat(s.spacing)||16)+'" OC', "Live Load (psf)": load, "Recommended Joist Size": size };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="floor-joist-size-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Floor Joist Size Calculator</CardTitle>
        <p className="text-muted-foreground">Determine floor joist size based on span</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="span">Span Length (ft)</label>
              <Input
                id="span"
                data-testid="input-span"
                type="number"
                value={values.span}
                onChange={(e) => setValues({...values, span: e.target.value})}
                placeholder="Span Length (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="spacing">Joist Spacing (inches)</label>
              <Input
                id="spacing"
                data-testid="input-spacing"
                type="number"
                value={values.spacing}
                onChange={(e) => setValues({...values, spacing: e.target.value})}
                placeholder="Joist Spacing (inches)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="load">Live Load (psf)</label>
              <Input
                id="load"
                data-testid="input-load"
                type="number"
                value={values.load}
                onChange={(e) => setValues({...values, load: e.target.value})}
                placeholder="Live Load (psf)"
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
