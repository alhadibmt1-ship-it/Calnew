import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TrimLengthCalculator() {
  const [values, setValues] = useState({
    perimeter: "52",
    doors: "2",
    doorH: "7",
    windows: "3",
    windowPerim: "12",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const perim = parseFloat(s.perimeter)||0; const doors = parseInt(s.doors)||0;
      const doorH = parseFloat(s.doorH)||7; const wins = parseInt(s.windows)||0; const winP = parseFloat(s.windowPerim)||12;
      const baseboard = perim - (doors * 3); const doorTrim = doors * (2*doorH + 3);
      const windowTrim = wins * winP; const total = baseboard + doorTrim + windowTrim;
      return { "Baseboard (ft)": baseboard.toFixed(0), "Door Trim (ft)": doorTrim.toFixed(0), "Window Trim (ft)": windowTrim.toFixed(0), "Total Trim (ft)": total.toFixed(0), "8ft Pieces": Math.ceil(total/8) };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="trim-length-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Trim Length Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate trim and molding lengths needed</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="perimeter">Room Perimeter (ft)</label>
              <Input
                id="perimeter"
                data-testid="input-perimeter"
                type="number"
                value={values.perimeter}
                onChange={(e) => setValues({...values, perimeter: e.target.value})}
                placeholder="Room Perimeter (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="doors">Number of Doors</label>
              <Input
                id="doors"
                data-testid="input-doors"
                type="number"
                value={values.doors}
                onChange={(e) => setValues({...values, doors: e.target.value})}
                placeholder="Number of Doors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="doorH">Door Height (ft)</label>
              <Input
                id="doorH"
                data-testid="input-doorH"
                type="number"
                value={values.doorH}
                onChange={(e) => setValues({...values, doorH: e.target.value})}
                placeholder="Door Height (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="windows">Number of Windows</label>
              <Input
                id="windows"
                data-testid="input-windows"
                type="number"
                value={values.windows}
                onChange={(e) => setValues({...values, windows: e.target.value})}
                placeholder="Number of Windows"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="windowPerim">Window Perimeter (ft)</label>
              <Input
                id="windowPerim"
                data-testid="input-windowPerim"
                type="number"
                value={values.windowPerim}
                onChange={(e) => setValues({...values, windowPerim: e.target.value})}
                placeholder="Window Perimeter (ft)"
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
