import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BrickCalculator() {
  const [wallLength, setWallLength] = useState("");
  const [wallHeight, setWallHeight] = useState("");
  const [wallUnit, setWallUnit] = useState("ft");
  const [brickSize, setBrickSize] = useState("standard");
  const [mortarThickness, setMortarThickness] = useState("10");

  const [result, setResult] = useState<{
    wallArea: number;
    bricksNeeded: number;
    mortarVolumeM3: number;
    cementBags: number;
  } | null>(null);

  const brickSizes: Record<string, { l: number; h: number; w: number; label: string }> = {
    standard: { l: 230, h: 75, w: 110, label: "Standard (230×110×75 mm)" },
    modular: { l: 190, h: 90, w: 90, label: "Modular (190×90×90 mm)" },
    queen: { l: 230, h: 75, w: 80, label: "Queen (230×80×75 mm)" },
    king: { l: 300, h: 100, w: 150, label: "King (300×150×100 mm)" },
  };

  const calculate = () => {
    const lengthVal = parseFloat(wallLength) || 0;
    const heightVal = parseFloat(wallHeight) || 0;
    if (lengthVal <= 0 || heightVal <= 0) return;

    let lengthM = lengthVal;
    let heightM = heightVal;
    if (wallUnit === "ft") {
      lengthM = lengthVal * 0.3048;
      heightM = heightVal * 0.3048;
    }

    const wallAreaM2 = lengthM * heightM;
    const brick = brickSizes[brickSize];
    const mortar = parseFloat(mortarThickness) || 10;

    const brickWithMortarL = (brick.l + mortar) / 1000;
    const brickWithMortarH = (brick.h + mortar) / 1000;

    const bricksPerM2 = 1 / (brickWithMortarL * brickWithMortarH);
    const bricksNeeded = Math.ceil(wallAreaM2 * bricksPerM2 * 1.05);

    const mortarPerBrickM3 =
      ((brick.l + mortar) * (brick.h + mortar) * (brick.w + mortar) -
        brick.l * brick.h * brick.w) /
      1e9;
    const totalMortarM3 = mortarPerBrickM3 * bricksNeeded * 1.25;

    const cementBags = Math.ceil((totalMortarM3 * 1.54 * (1 / 7)) / 0.035);

    setResult({
      wallArea: wallAreaM2,
      bricksNeeded,
      mortarVolumeM3: totalMortarM3,
      cementBags,
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle data-testid="text-title">Brick Calculator</CardTitle>
        <CardDescription>Calculate the number of bricks and mortar needed for your wall.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Wall Length</Label>
            <Input
              data-testid="input-wall-length"
              type="number"
              value={wallLength}
              onChange={(e) => setWallLength(e.target.value)}
              placeholder="e.g. 20"
            />
          </div>
          <div className="space-y-2">
            <Label>Wall Height</Label>
            <Input
              data-testid="input-wall-height"
              type="number"
              value={wallHeight}
              onChange={(e) => setWallHeight(e.target.value)}
              placeholder="e.g. 10"
            />
          </div>
          <div className="space-y-2">
            <Label>Unit</Label>
            <Select value={wallUnit} onValueChange={setWallUnit}>
              <SelectTrigger data-testid="select-wall-unit">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ft">Feet</SelectItem>
                <SelectItem value="m">Meters</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Brick Size</Label>
            <Select value={brickSize} onValueChange={setBrickSize}>
              <SelectTrigger data-testid="select-brick-size">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(brickSizes).map(([key, val]) => (
                  <SelectItem key={key} value={key}>{val.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Mortar Thickness (mm)</Label>
            <Input
              data-testid="input-mortar-thickness"
              type="number"
              value={mortarThickness}
              onChange={(e) => setMortarThickness(e.target.value)}
              placeholder="10"
            />
          </div>
        </div>

        <Button data-testid="button-calculate" className="w-full" onClick={calculate}>
          Calculate Bricks
        </Button>

        {result && (
          <div className="mt-6 space-y-4 animate-in fade-in-50">
            <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Wall Area</p>
              <p data-testid="text-wall-area" className="text-2xl font-bold text-primary">{result.wallArea.toFixed(2)} m²</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                <span data-testid="text-bricks-needed" className="text-3xl font-bold text-foreground">{result.bricksNeeded.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground text-center">Bricks Needed</span>
              </div>
              <div className="flex flex-col items-center p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                <span data-testid="text-mortar-volume" className="text-3xl font-bold text-foreground">{result.mortarVolumeM3.toFixed(3)}</span>
                <span className="text-sm text-muted-foreground text-center">Mortar (m³)</span>
              </div>
              <div className="flex flex-col items-center p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                <span data-testid="text-cement-bags" className="text-3xl font-bold text-foreground">{result.cementBags}</span>
                <span className="text-sm text-muted-foreground text-center">Cement Bags</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              *Includes 5% wastage for bricks. Mortar calculated with 1:6 cement-sand ratio. Deduct openings (doors/windows) from wall area.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}