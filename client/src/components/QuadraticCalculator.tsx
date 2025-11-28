import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function QuadraticCalculator() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(-3);
  const [c, setC] = useState(2);
  const [result, setResult] = useState<{x1: string, x2: string, discriminant: number} | null>(null);

  const calculate = () => {
    // ax^2 + bx + c = 0
    // x = (-b ± sqrt(b^2 - 4ac)) / 2a
    
    const disc = (b * b) - (4 * a * c);
    let x1 = "";
    let x2 = "";

    if (disc > 0) {
      const r1 = (-b + Math.sqrt(disc)) / (2 * a);
      const r2 = (-b - Math.sqrt(disc)) / (2 * a);
      x1 = r1.toFixed(4);
      x2 = r2.toFixed(4);
    } else if (disc === 0) {
      const r = -b / (2 * a);
      x1 = r.toFixed(4);
      x2 = r.toFixed(4);
    } else {
      // Complex roots
      const real = (-b / (2 * a)).toFixed(4);
      const imag = (Math.sqrt(Math.abs(disc)) / (2 * a)).toFixed(4);
      x1 = `${real} + ${imag}i`;
      x2 = `${real} - ${imag}i`;
    }

    setResult({ x1, x2, discriminant: disc });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Quadratic Equation Solver</CardTitle>
        <CardDescription>Solve equations in the form ax² + bx + c = 0</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-2 justify-center text-lg font-serif">
          <div className="w-16">
            <Input type="number" value={a} onChange={(e) => setA(Number(e.target.value))} className="text-center" />
          </div>
          <span>x² +</span>
          <div className="w-16">
            <Input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} className="text-center" />
          </div>
          <span>x +</span>
          <div className="w-16">
            <Input type="number" value={c} onChange={(e) => setC(Number(e.target.value))} className="text-center" />
          </div>
          <span>= 0</span>
        </div>

        <Button className="w-full" onClick={calculate}>Solve Equation</Button>

        {result && (
          <div className="space-y-4 p-4 bg-muted rounded-lg">
             <div className="space-y-2">
               <div className="flex justify-between">
                 <span className="text-muted-foreground">Discriminant (Δ):</span>
                 <span className="font-mono">{result.discriminant}</span>
               </div>
               <div className="h-px bg-foreground/10"></div>
               <div className="flex justify-between items-center">
                 <span className="text-muted-foreground">Root 1 (x₁):</span>
                 <span className="font-bold text-lg font-mono text-primary">{result.x1}</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-muted-foreground">Root 2 (x₂):</span>
                 <span className="font-bold text-lg font-mono text-primary">{result.x2}</span>
               </div>
             </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}