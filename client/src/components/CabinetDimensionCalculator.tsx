import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CabinetDimensionCalculator() {
  const [values, setValues] = useState({
    wallLen: "10",
    cabinetW: "24",
    upperH: "30",
    baseH: "34.5",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const wallIn = (parseFloat(s.wallLen)||0) * 12; const cW = parseFloat(s.cabinetW)||24;
      const numCabs = Math.floor(wallIn / cW);
      const remaining = wallIn - (numCabs * cW);
      return { "Number of Cabinets": numCabs, "Cabinet Width (in)": cW, "Remaining Space (in)": remaining.toFixed(1), "Upper Height (in)": parseFloat(s.upperH)||30, "Base Height (in)": parseFloat(s.baseH)||34.5 };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="cabinet-dimension-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Cabinet Dimension Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate cabinet dimensions and layout</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="wallLen">Wall Length (ft)</label>
              <Input
                id="wallLen"
                data-testid="input-wallLen"
                type="number"
                value={values.wallLen}
                onChange={(e) => setValues({...values, wallLen: e.target.value})}
                placeholder="Wall Length (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="cabinetW">Cabinet Width (inches)</label>
              <Input
                id="cabinetW"
                data-testid="input-cabinetW"
                type="number"
                value={values.cabinetW}
                onChange={(e) => setValues({...values, cabinetW: e.target.value})}
                placeholder="Cabinet Width (inches)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="upperH">Upper Cabinet Height (inches)</label>
              <Input
                id="upperH"
                data-testid="input-upperH"
                type="number"
                value={values.upperH}
                onChange={(e) => setValues({...values, upperH: e.target.value})}
                placeholder="Upper Cabinet Height (inches)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="baseH">Base Cabinet Height (inches)</label>
              <Input
                id="baseH"
                data-testid="input-baseH"
                type="number"
                value={values.baseH}
                onChange={(e) => setValues({...values, baseH: e.target.value})}
                placeholder="Base Cabinet Height (inches)"
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
