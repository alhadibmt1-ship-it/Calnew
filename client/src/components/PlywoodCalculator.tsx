import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PlywoodCalculator() {
  const [area, setArea] = useState("");
  const [wastage, setWastage] = useState("10");
  const [result, setResult] = useState<{ sheets: number; sheetsWithWastage: number; totalArea: number } | null>(null);

  const calculate = () => {
    const a = parseFloat(area);
    if (a > 0) {
      const sheetArea = 32;
      const sheets = Math.ceil(a / sheetArea);
      const w = parseFloat(wastage) || 10;
      const sheetsWithWastage = Math.ceil(sheets * (1 + w / 100));
      setResult({ sheets, sheetsWithWastage, totalArea: a });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-yellow-600" data-testid="plywood-calculator">
      <CardHeader>
        <CardTitle>Plywood Sheet Calculator</CardTitle>
        <CardDescription>Calculate how many plywood sheets (8×4 ft) you need for your project.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Area to Cover (sq ft)</Label><Input type="number" placeholder="200" value={area} onChange={(e) => setArea(e.target.value)} data-testid="input-area" /></div>
          <div className="space-y-2"><Label>Wastage Factor (%)</Label><Input type="number" placeholder="10" value={wastage} onChange={(e) => setWastage(e.target.value)} data-testid="input-wastage" /></div>
        </div>
        <Button onClick={calculate} className="w-full bg-yellow-600 hover:bg-yellow-700" data-testid="button-calculate">Calculate</Button>
        {result && (
          <div className="grid grid-cols-3 gap-4 mt-4 animate-in fade-in" data-testid="result-section">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Total Area</p>
              <p className="text-xl font-bold text-slate-600" data-testid="text-area">{result.totalArea} sqft</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Sheets (Exact)</p>
              <p className="text-xl font-bold text-yellow-600" data-testid="text-sheets">{result.sheets}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">With Wastage</p>
              <p className="text-xl font-bold text-orange-600" data-testid="text-with-wastage">{result.sheetsWithWastage}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
