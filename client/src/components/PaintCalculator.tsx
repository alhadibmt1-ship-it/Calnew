import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PaintCalculator() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [doors, setDoors] = useState("1");
  const [windows, setWindows] = useState("2");
  const [coats, setCoats] = useState("2");
  const [result, setResult] = useState<{ totalArea: number; paintableArea: number; liters: number; gallons: number } | null>(null);

  const calculate = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);
    if (l > 0 && w > 0 && h > 0) {
      const wallArea = 2 * (l + w) * h;
      const doorArea = (parseFloat(doors) || 0) * 21;
      const windowArea = (parseFloat(windows) || 0) * 15;
      const paintableArea = wallArea - doorArea - windowArea;
      const c = parseFloat(coats) || 2;
      const liters = (paintableArea * c) / 350;
      const gallons = liters / 3.785;
      setResult({ totalArea: wallArea, paintableArea: Math.max(0, paintableArea), liters, gallons });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-purple-600" data-testid="paint-calculator">
      <CardHeader>
        <CardTitle>Paint Calculator</CardTitle>
        <CardDescription>Calculate how much paint you need for your room walls.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2"><Label>Room Length (ft)</Label><Input type="number" placeholder="15" value={length} onChange={(e) => setLength(e.target.value)} data-testid="input-length" /></div>
          <div className="space-y-2"><Label>Room Width (ft)</Label><Input type="number" placeholder="12" value={width} onChange={(e) => setWidth(e.target.value)} data-testid="input-width" /></div>
          <div className="space-y-2"><Label>Wall Height (ft)</Label><Input type="number" placeholder="10" value={height} onChange={(e) => setHeight(e.target.value)} data-testid="input-height" /></div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2"><Label>Number of Doors</Label><Input type="number" placeholder="1" value={doors} onChange={(e) => setDoors(e.target.value)} data-testid="input-doors" /></div>
          <div className="space-y-2"><Label>Number of Windows</Label><Input type="number" placeholder="2" value={windows} onChange={(e) => setWindows(e.target.value)} data-testid="input-windows" /></div>
          <div className="space-y-2"><Label>Number of Coats</Label><Input type="number" placeholder="2" value={coats} onChange={(e) => setCoats(e.target.value)} data-testid="input-coats" /></div>
        </div>
        <Button onClick={calculate} className="w-full bg-purple-600 hover:bg-purple-700" data-testid="button-calculate">Calculate Paint</Button>
        {result && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 animate-in fade-in" data-testid="result-section">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Total Wall Area</p>
              <p className="text-xl font-bold text-slate-600" data-testid="text-total-area">{result.totalArea.toFixed(0)} sqft</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Paintable Area</p>
              <p className="text-xl font-bold text-purple-600" data-testid="text-paintable">{result.paintableArea.toFixed(0)} sqft</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Paint Needed</p>
              <p className="text-xl font-bold text-blue-600" data-testid="text-liters">{result.liters.toFixed(1)} L</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Gallons</p>
              <p className="text-xl font-bold text-green-600" data-testid="text-gallons">{result.gallons.toFixed(1)} gal</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
