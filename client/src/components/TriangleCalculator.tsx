import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TriangleCalculator() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const [c, setC] = useState(5);
  const [result, setResult] = useState<{area: number, perimeter: number, type: string} | null>(null);

  const calculate = () => {
    // Validation
    if (a + b <= c || a + c <= b || b + c <= a) {
      alert("Invalid triangle: The sum of any two sides must be greater than the third.");
      return;
    }

    const perimeter = a + b + c;
    const s = perimeter / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c)); // Heron's formula

    let type = "Scalene";
    if (a === b && b === c) type = "Equilateral";
    else if (a === b || b === c || a === c) type = "Isosceles";

    // Check for Right Triangle (Pythagoras approx)
    const sides = [a, b, c].sort((x, y) => x - y);
    if (Math.abs(Math.pow(sides[0], 2) + Math.pow(sides[1], 2) - Math.pow(sides[2], 2)) < 0.001) {
      type += " Right-Angled";
    }

    setResult({ area, perimeter, type });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Triangle Calculator</CardTitle>
        <CardDescription>Calculate area, perimeter, and type of a triangle from its side lengths.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Side A</Label>
            <Input type="number" value={a} onChange={(e) => setA(Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label>Side B</Label>
            <Input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label>Side C</Label>
            <Input type="number" value={c} onChange={(e) => setC(Number(e.target.value))} />
          </div>
        </div>
        <Button className="w-full" onClick={calculate}>Calculate</Button>

        {result && (
          <div className="mt-6 space-y-4 p-4 bg-muted rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Area</p>
                <p className="text-xl font-bold">{result.area.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Perimeter</p>
                <p className="text-xl font-bold">{result.perimeter.toFixed(2)}</p>
              </div>
            </div>
            <div className="text-center pt-2 border-t border-foreground/10">
              <p className="text-xs text-muted-foreground uppercase">Type</p>
              <p className="text-lg font-semibold text-primary">{result.type} Triangle</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}