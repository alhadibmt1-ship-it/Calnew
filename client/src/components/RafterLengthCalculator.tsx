import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RafterLengthCalculator() {
  const [values, setValues] = useState({
    span: "24",
    pitch: "6",
    overhang: "12",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const halfSpan = (parseFloat(s.span)||0) / 2; const pitch = parseFloat(s.pitch)||0;
      const rise = halfSpan * (pitch / 12); const rafter = Math.sqrt(halfSpan*halfSpan + rise*rise);
      const overhang = (parseFloat(s.overhang)||0) / 12;
      const total = rafter + overhang;
      return { "Run (ft)": halfSpan.toFixed(2), "Rise (ft)": rise.toFixed(2), "Rafter Length (ft)": rafter.toFixed(2), "With Overhang (ft)": total.toFixed(2), "Roof Angle (degrees)": (Math.atan(pitch/12)*180/Math.PI).toFixed(1) };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="rafter-length-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Rafter Length Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate rafter length from span and pitch</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="span">Building Span (ft)</label>
              <Input
                id="span"
                data-testid="input-span"
                type="number"
                value={values.span}
                onChange={(e) => setValues({...values, span: e.target.value})}
                placeholder="Building Span (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="pitch">Roof Pitch (rise/12)</label>
              <Input
                id="pitch"
                data-testid="input-pitch"
                type="number"
                value={values.pitch}
                onChange={(e) => setValues({...values, pitch: e.target.value})}
                placeholder="Roof Pitch (rise/12)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="overhang">Overhang (inches)</label>
              <Input
                id="overhang"
                data-testid="input-overhang"
                type="number"
                value={values.overhang}
                onChange={(e) => setValues({...values, overhang: e.target.value})}
                placeholder="Overhang (inches)"
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
