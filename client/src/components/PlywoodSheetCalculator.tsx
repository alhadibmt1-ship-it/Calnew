import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PlywoodSheetCalculator() {
  const [values, setValues] = useState({
    length: "20",
    width: "15",
    sheetL: "8",
    sheetW: "4",
    waste: "10",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const area = (parseFloat(s.length)||0) * (parseFloat(s.width)||0);
      const sheetArea = (parseFloat(s.sheetL)||8) * (parseFloat(s.sheetW)||4);
      const waste = parseFloat(s.waste)||10;
      const sheets = Math.ceil(area / sheetArea * (1 + waste/100));
      return { "Total Area (sq ft)": area.toFixed(0), "Sheet Size (sq ft)": sheetArea.toFixed(0), "Sheets Needed (with waste)": sheets };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="plywood-sheet-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Plywood Sheet Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate plywood sheets needed to cover an area</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="length">Area Length (ft)</label>
              <Input
                id="length"
                data-testid="input-length"
                type="number"
                value={values.length}
                onChange={(e) => setValues({...values, length: e.target.value})}
                placeholder="Area Length (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="width">Area Width (ft)</label>
              <Input
                id="width"
                data-testid="input-width"
                type="number"
                value={values.width}
                onChange={(e) => setValues({...values, width: e.target.value})}
                placeholder="Area Width (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="sheetL">Sheet Length (ft)</label>
              <Input
                id="sheetL"
                data-testid="input-sheetL"
                type="number"
                value={values.sheetL}
                onChange={(e) => setValues({...values, sheetL: e.target.value})}
                placeholder="Sheet Length (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="sheetW">Sheet Width (ft)</label>
              <Input
                id="sheetW"
                data-testid="input-sheetW"
                type="number"
                value={values.sheetW}
                onChange={(e) => setValues({...values, sheetW: e.target.value})}
                placeholder="Sheet Width (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="waste">Waste Factor (%)</label>
              <Input
                id="waste"
                data-testid="input-waste"
                type="number"
                value={values.waste}
                onChange={(e) => setValues({...values, waste: e.target.value})}
                placeholder="Waste Factor (%)"
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
