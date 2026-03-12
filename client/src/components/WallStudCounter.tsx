import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function WallStudCounter() {
  const [values, setValues] = useState({
    wallLength: "20",
    spacing: "16",
    corners: "2",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const len = parseFloat(s.wallLength)||0; const sp = (parseFloat(s.spacing)||16)/12; const corners = parseInt(s.corners)||0;
      const studs = Math.ceil(len / sp) + 1 + corners * 2;
      return { "Wall Length (ft)": len, "Spacing": (parseFloat(s.spacing)||16)+'" OC', "Field Studs": Math.ceil(len/sp)+1, "Corner Studs": corners*2, "Total Studs": studs };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="wall-stud-counter">
      <CardHeader>
        <CardTitle className="text-2xl">Wall Stud Counter</CardTitle>
        <p className="text-muted-foreground">Calculate studs needed for wall framing</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="wallLength">Wall Length (ft)</label>
              <Input
                id="wallLength"
                data-testid="input-wallLength"
                type="number"
                value={values.wallLength}
                onChange={(e) => setValues({...values, wallLength: e.target.value})}
                placeholder="Wall Length (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="spacing">Stud Spacing (inches)</label>
              <Input
                id="spacing"
                data-testid="input-spacing"
                type="number"
                value={values.spacing}
                onChange={(e) => setValues({...values, spacing: e.target.value})}
                placeholder="Stud Spacing (inches)"
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
