import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PlywoodCalculator() {
  const [area, setArea] = useState("");
  const [sheetSize, setSheetSize] = useState("32");
  const [wastage, setWastage] = useState("10");
  const [result, setResult] = useState<{
    areaSqFt: number;
    sheetArea: number;
    sheetsNeeded: number;
    sheetsWithWastage: number;
    wastageSheets: number;
  } | null>(null);

  const calculate = () => {
    const a = parseFloat(area);
    const sSize = parseFloat(sheetSize);
    const wPct = parseFloat(wastage);

    if (a > 0 && sSize > 0 && wPct >= 0) {
      const sheetsNeeded = Math.ceil(a / sSize);
      const wastageSheets = Math.ceil(sheetsNeeded * (wPct / 100));
      const sheetsWithWastage = sheetsNeeded + wastageSheets;

      setResult({
        areaSqFt: a,
        sheetArea: sSize,
        sheetsNeeded,
        sheetsWithWastage,
        wastageSheets,
      });
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle data-testid="text-title">Plywood Calculator</CardTitle>
        <CardDescription>Calculate the number of plywood sheets needed to cover an area, with wastage factor.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Area to Cover (sq ft)</Label>
          <Input data-testid="input-area" type="number" value={area} onChange={(e) => setArea(e.target.value)} placeholder="500" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Sheet Size</Label>
            <Select value={sheetSize} onValueChange={setSheetSize}>
              <SelectTrigger data-testid="select-sheet-size">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="32">8 × 4 ft (32 sq ft)</SelectItem>
                <SelectItem value="24">6 × 4 ft (24 sq ft)</SelectItem>
                <SelectItem value="16">4 × 4 ft (16 sq ft)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Wastage Factor (%)</Label>
            <Input data-testid="input-wastage" type="number" value={wastage} onChange={(e) => setWastage(e.target.value)} placeholder="10" min="0" />
          </div>
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full">Calculate Sheets</Button>

        {result && (
          <div className="space-y-4 pt-4 animate-in fade-in-50">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground uppercase">Area</p>
                <p data-testid="text-area" className="text-xl font-bold">{result.areaSqFt} ft²</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground uppercase">Sheets Needed</p>
                <p data-testid="text-sheets-needed" className="text-2xl font-bold text-primary">{result.sheetsNeeded}</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 text-center">
                <p className="text-xs text-muted-foreground uppercase">With Wastage</p>
                <p data-testid="text-sheets-with-wastage" className="text-2xl font-bold text-green-700 dark:text-green-400">{result.sheetsWithWastage}</p>
                <p className="text-xs text-muted-foreground">+{result.wastageSheets} extra</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">Sheet size: {result.sheetArea} ft² per sheet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}