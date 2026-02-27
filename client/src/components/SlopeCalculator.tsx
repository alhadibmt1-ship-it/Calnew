import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SlopeCalculator() {
  const [x1, setX1] = useState("");
  const [y1, setY1] = useState("");
  const [x2, setX2] = useState("");
  const [y2, setY2] = useState("");
  const [result, setResult] = useState<{
    slope: number | null;
    yIntercept: number | null;
    distance: number;
    angle: number;
    equation: string;
  } | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);
    const px1 = parseFloat(x1);
    const py1 = parseFloat(y1);
    const px2 = parseFloat(x2);
    const py2 = parseFloat(y2);

    if ([px1, py1, px2, py2].some(isNaN)) {
      setError("Please enter valid numbers for all coordinates.");
      return;
    }

    const dx = px2 - px1;
    const dy = py2 - py1;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (dx === 0) {
      setResult({
        slope: null,
        yIntercept: null,
        distance,
        angle: 90,
        equation: `x = ${px1}`,
      });
      return;
    }

    const slope = dy / dx;
    const yIntercept = py1 - slope * px1;
    const angle = Math.atan(slope) * (180 / Math.PI);
    const sign = yIntercept >= 0 ? "+" : "-";
    const equation = `y = ${slope.toFixed(4)}x ${sign} ${Math.abs(yIntercept).toFixed(4)}`;

    setResult({ slope, yIntercept, distance, angle, equation });
  };

  return (
    <Card className="w-full border-t-4 border-t-cyan-500">
      <CardHeader>
        <CardTitle>Slope Calculator</CardTitle>
        <CardDescription>
          Calculate the slope, distance, angle, and equation of a line between two points.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-900/20 rounded-lg">
            <p className="text-sm font-medium text-center">Point 1 (x₁, y₁)</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label>x₁</Label>
                <Input data-testid="input-x1" type="number" value={x1} onChange={(e) => setX1(e.target.value)} placeholder="1" />
              </div>
              <div className="space-y-1">
                <Label>y₁</Label>
                <Input data-testid="input-y1" type="number" value={y1} onChange={(e) => setY1(e.target.value)} placeholder="2" />
              </div>
            </div>
          </div>
          <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-900/20 rounded-lg">
            <p className="text-sm font-medium text-center">Point 2 (x₂, y₂)</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label>x₂</Label>
                <Input data-testid="input-x2" type="number" value={x2} onChange={(e) => setX2(e.target.value)} placeholder="4" />
              </div>
              <div className="space-y-1">
                <Label>y₂</Label>
                <Input data-testid="input-y2" type="number" value={y2} onChange={(e) => setY2(e.target.value)} placeholder="6" />
              </div>
            </div>
          </div>
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full bg-cyan-600 hover:bg-cyan-700">Calculate</Button>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-lg text-center">
            <p className="text-red-600 dark:text-red-400" data-testid="text-error">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg border border-cyan-100 text-center">
                <p className="text-xs text-muted-foreground uppercase">Slope (m)</p>
                <p className="text-2xl font-bold text-cyan-600" data-testid="text-slope">
                  {result.slope !== null ? result.slope.toFixed(4) : "Undefined"}
                </p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-900/20 rounded-lg border border-slate-100 text-center">
                <p className="text-xs text-muted-foreground uppercase">Distance</p>
                <p className="text-2xl font-bold" data-testid="text-distance">{result.distance.toFixed(4)}</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-900/20 rounded-lg border border-slate-100 text-center">
                <p className="text-xs text-muted-foreground uppercase">Angle</p>
                <p className="text-2xl font-bold" data-testid="text-angle">{result.angle.toFixed(2)}°</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-900/20 rounded-lg border border-slate-100 text-center">
                <p className="text-xs text-muted-foreground uppercase">Y-Intercept</p>
                <p className="text-2xl font-bold" data-testid="text-y-intercept">
                  {result.yIntercept !== null ? result.yIntercept.toFixed(4) : "N/A"}
                </p>
              </div>
            </div>
            <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg border border-cyan-100 text-center">
              <p className="text-xs text-muted-foreground uppercase">Line Equation</p>
              <p className="text-xl font-bold text-cyan-700" data-testid="text-equation">{result.equation}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}