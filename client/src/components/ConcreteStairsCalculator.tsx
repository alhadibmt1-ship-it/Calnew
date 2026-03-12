import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ConcreteStairsCalculator() {
  const [values, setValues] = useState({
    numSteps: "5",
    riseH: "7",
    treadD: "11",
    stairW: "3",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const n = parseInt(s.numSteps)||1; const rise = (parseFloat(s.riseH)||0)/12; const tread = (parseFloat(s.treadD)||0)/12; const w = parseFloat(s.stairW)||0;
      let vol = 0; for(let i=1;i<=n;i++) vol += rise * tread * w * i; vol = vol / 27;
      return { "Total Steps": n, "Total Rise (ft)": (n*rise).toFixed(2), "Concrete Volume (cubic yards)": vol.toFixed(2), "80lb Bags Needed": Math.ceil(vol * 45) };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="concrete-stairs-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Concrete Stairs Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate concrete for stairs</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="numSteps">Number of Steps</label>
              <Input
                id="numSteps"
                data-testid="input-numSteps"
                type="number"
                value={values.numSteps}
                onChange={(e) => setValues({...values, numSteps: e.target.value})}
                placeholder="Number of Steps"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="riseH">Rise Height (inches)</label>
              <Input
                id="riseH"
                data-testid="input-riseH"
                type="number"
                value={values.riseH}
                onChange={(e) => setValues({...values, riseH: e.target.value})}
                placeholder="Rise Height (inches)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="treadD">Tread Depth (inches)</label>
              <Input
                id="treadD"
                data-testid="input-treadD"
                type="number"
                value={values.treadD}
                onChange={(e) => setValues({...values, treadD: e.target.value})}
                placeholder="Tread Depth (inches)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="stairW">Stair Width (ft)</label>
              <Input
                id="stairW"
                data-testid="input-stairW"
                type="number"
                value={values.stairW}
                onChange={(e) => setValues({...values, stairW: e.target.value})}
                placeholder="Stair Width (ft)"
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
