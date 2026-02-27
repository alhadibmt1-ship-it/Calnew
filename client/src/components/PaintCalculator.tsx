import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PaintCalculator() {
  const [roomLength, setRoomLength] = useState("");
  const [roomWidth, setRoomWidth] = useState("");
  const [roomHeight, setRoomHeight] = useState("9");
  const [numDoors, setNumDoors] = useState("1");
  const [numWindows, setNumWindows] = useState("2");
  const [coats, setCoats] = useState("2");
  const [result, setResult] = useState<{
    totalWallArea: number;
    doorArea: number;
    windowArea: number;
    paintableArea: number;
    litersNeeded: number;
    gallonsNeeded: number;
  } | null>(null);

  const calculate = () => {
    const l = parseFloat(roomLength);
    const w = parseFloat(roomWidth);
    const h = parseFloat(roomHeight);
    const doors = parseInt(numDoors) || 0;
    const windows = parseInt(numWindows) || 0;
    const numCoats = parseInt(coats) || 1;

    if (l > 0 && w > 0 && h > 0) {
      const perimeter = 2 * (l + w);
      const totalWallArea = perimeter * h;
      const doorArea = doors * 21;
      const windowArea = windows * 15;
      const paintableArea = totalWallArea - doorArea - windowArea;
      const coveragePerLiter = 110;
      const litersNeeded = (paintableArea / coveragePerLiter) * numCoats;
      const gallonsNeeded = litersNeeded / 3.785;

      setResult({
        totalWallArea,
        doorArea,
        windowArea,
        paintableArea: Math.max(paintableArea, 0),
        litersNeeded: Math.max(litersNeeded, 0),
        gallonsNeeded: Math.max(gallonsNeeded, 0),
      });
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle data-testid="text-title">Paint Calculator</CardTitle>
        <CardDescription>Estimate how much paint you need for your room based on dimensions and openings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Room Length (feet)</Label>
            <Input data-testid="input-room-length" type="number" value={roomLength} onChange={(e) => setRoomLength(e.target.value)} placeholder="15" />
          </div>
          <div className="space-y-2">
            <Label>Room Width (feet)</Label>
            <Input data-testid="input-room-width" type="number" value={roomWidth} onChange={(e) => setRoomWidth(e.target.value)} placeholder="12" />
          </div>
          <div className="space-y-2">
            <Label>Room Height (feet)</Label>
            <Input data-testid="input-room-height" type="number" value={roomHeight} onChange={(e) => setRoomHeight(e.target.value)} placeholder="9" />
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Number of Doors</Label>
            <Input data-testid="input-doors" type="number" value={numDoors} onChange={(e) => setNumDoors(e.target.value)} placeholder="1" min="0" />
          </div>
          <div className="space-y-2">
            <Label>Number of Windows</Label>
            <Input data-testid="input-windows" type="number" value={numWindows} onChange={(e) => setNumWindows(e.target.value)} placeholder="2" min="0" />
          </div>
          <div className="space-y-2">
            <Label>Number of Coats</Label>
            <Input data-testid="input-coats" type="number" value={coats} onChange={(e) => setCoats(e.target.value)} placeholder="2" min="1" />
          </div>
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full">Calculate Paint</Button>

        {result && (
          <div className="space-y-4 pt-4 animate-in fade-in-50">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground uppercase">Total Wall Area</p>
                <p data-testid="text-total-wall-area" className="text-xl font-bold">{result.totalWallArea.toFixed(1)} ft²</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground uppercase">Paintable Area</p>
                <p data-testid="text-paintable-area" className="text-xl font-bold text-primary">{result.paintableArea.toFixed(1)} ft²</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 text-center">
                <p className="text-xs text-muted-foreground uppercase">Paint Needed</p>
                <p data-testid="text-liters" className="text-2xl font-bold text-green-700 dark:text-green-400">{result.litersNeeded.toFixed(1)} L</p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 text-center">
                <p className="text-xs text-muted-foreground uppercase">Gallons Needed</p>
                <p data-testid="text-gallons" className="text-2xl font-bold text-blue-700 dark:text-blue-400">{result.gallonsNeeded.toFixed(1)} gal</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">Door area: ~21 ft² each | Window area: ~15 ft² each | Coverage: ~110 ft²/liter</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}