import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BrickCalculator() {
  const [wallLength, setWallLength] = useState("");
  const [wallHeight, setWallHeight] = useState("");
  const [unit, setUnit] = useState("ft");
  const [brickSize, setBrickSize] = useState("standard");
  const [mortarThickness, setMortarThickness] = useState("10");
  const [wastage, setWastage] = useState("5");
  const [result, setResult] = useState<{ bricks: number; mortarVolume: number; wallArea: number } | null>(null);

  const calculate = () => {
    const l = parseFloat(wallLength);
    const h = parseFloat(wallHeight);
    if (l > 0 && h > 0) {
      const toM = unit === "ft" ? 0.3048 : 1;
      const lM = l * toM;
      const hM = h * toM;
      const wallArea = lM * hM;
      const sizes: Record<string, [number, number, number]> = {
        standard: [0.19, 0.09, 0.09],
        modular: [0.19, 0.09, 0.057],
        queen: [0.203, 0.076, 0.07],
      };
      const [bL, bW, bH] = sizes[brickSize] || sizes.standard;
      const mt = parseFloat(mortarThickness) / 1000;
      const bricksPerM2 = 1 / ((bL + mt) * (bH + mt));
      const rawBricks = Math.ceil(wallArea * bricksPerM2);
      const wPct = parseFloat(wastage) || 5;
      const totalBricks = Math.ceil(rawBricks * (1 + wPct / 100));
      const mortarVolume = wallArea * bW - (rawBricks * bL * bW * bH);
      setResult({ bricks: totalBricks, mortarVolume: Math.max(0, mortarVolume), wallArea });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-red-700" data-testid="brick-calculator">
      <CardHeader>
        <CardTitle>Brick Calculator</CardTitle>
        <CardDescription>Calculate the number of bricks and mortar volume for your wall.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Wall Length</Label>
            <div className="flex gap-2">
              <Input type="number" placeholder="20" value={wallLength} onChange={(e) => setWallLength(e.target.value)} className="flex-1" data-testid="input-length" />
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger className="w-20"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="ft">ft</SelectItem><SelectItem value="m">m</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Wall Height ({unit})</Label>
            <Input type="number" placeholder="10" value={wallHeight} onChange={(e) => setWallHeight(e.target.value)} data-testid="input-height" />
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Brick Size</Label>
            <Select value={brickSize} onValueChange={setBrickSize}>
              <SelectTrigger data-testid="select-brick-size"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard (190×90×90mm)</SelectItem>
                <SelectItem value="modular">Modular (190×90×57mm)</SelectItem>
                <SelectItem value="queen">Queen (203×76×70mm)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2"><Label>Mortar Thickness (mm)</Label><Input type="number" placeholder="10" value={mortarThickness} onChange={(e) => setMortarThickness(e.target.value)} data-testid="input-mortar" /></div>
          <div className="space-y-2"><Label>Wastage (%)</Label><Input type="number" placeholder="5" value={wastage} onChange={(e) => setWastage(e.target.value)} data-testid="input-wastage" /></div>
        </div>
        <Button onClick={calculate} className="w-full bg-red-700 hover:bg-red-800" data-testid="button-calculate">Calculate</Button>
        {result && (
          <div className="grid grid-cols-3 gap-4 mt-4 animate-in fade-in" data-testid="result-section">
            <div className="bg-red-50 dark:bg-red-950/30 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Bricks Needed</p>
              <p className="text-2xl font-bold text-red-700" data-testid="text-bricks">{result.bricks.toLocaleString()}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Mortar Volume</p>
              <p className="text-2xl font-bold text-amber-600" data-testid="text-mortar">{result.mortarVolume.toFixed(2)} m³</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Wall Area</p>
              <p className="text-2xl font-bold text-blue-600" data-testid="text-area">{result.wallArea.toFixed(1)} m²</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
