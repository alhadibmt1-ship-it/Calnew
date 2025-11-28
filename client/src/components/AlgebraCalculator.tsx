import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function AlgebraCalculator() {
  // Linear Equation: ax + b = c
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [linearResult, setLinearResult] = useState<string | null>(null);

  // Quadratic Equation: ax² + bx + c = 0
  const [qa, setQa] = useState("");
  const [qb, setQb] = useState("");
  const [qc, setQc] = useState("");
  const [quadraticResult, setQuadraticResult] = useState<string | null>(null);

  const solveLinear = () => {
    const va = parseFloat(a);
    const vb = parseFloat(b);
    const vc = parseFloat(c);

    if (va === 0) {
      setLinearResult("Invalid equation (a cannot be 0)");
      return;
    }

    // ax + b = c  =>  ax = c - b  =>  x = (c - b) / a
    const x = (vc - vb) / va;
    setLinearResult(`x = ${x}`);
  };

  const solveQuadratic = () => {
    const va = parseFloat(qa);
    const vb = parseFloat(qb);
    const vc = parseFloat(qc);

    if (va === 0) {
      setQuadraticResult("Not a quadratic equation (a cannot be 0)");
      return;
    }

    const discriminant = vb * vb - 4 * va * vc;

    if (discriminant > 0) {
      const x1 = (-vb + Math.sqrt(discriminant)) / (2 * va);
      const x2 = (-vb - Math.sqrt(discriminant)) / (2 * va);
      setQuadraticResult(`x₁ = ${x1.toFixed(4)}, x₂ = ${x2.toFixed(4)}`);
    } else if (discriminant === 0) {
      const x = -vb / (2 * va);
      setQuadraticResult(`x = ${x.toFixed(4)}`);
    } else {
      const real = (-vb / (2 * va)).toFixed(4);
      const imag = (Math.sqrt(-discriminant) / (2 * va)).toFixed(4);
      setQuadraticResult(`x₁ = ${real} + ${imag}i, x₂ = ${real} - ${imag}i`);
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-blue-600">
      <CardHeader>
        <CardTitle>Algebra Solver</CardTitle>
        <CardDescription>Solve Linear and Quadratic equations instantly.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="linear">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="linear">Linear Equation</TabsTrigger>
            <TabsTrigger value="quadratic">Quadratic Equation</TabsTrigger>
          </TabsList>

          <TabsContent value="linear" className="space-y-6">
            <div className="p-4 bg-muted/50 rounded-lg text-center font-mono text-lg mb-4">
              ax + b = c
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>a</Label>
                <Input type="number" value={a} onChange={e => setA(e.target.value)} placeholder="2" />
              </div>
              <div className="space-y-2">
                <Label>b</Label>
                <Input type="number" value={b} onChange={e => setB(e.target.value)} placeholder="5" />
              </div>
              <div className="space-y-2">
                <Label>c</Label>
                <Input type="number" value={c} onChange={e => setC(e.target.value)} placeholder="15" />
              </div>
            </div>
            <Button onClick={solveLinear} className="w-full">Solve for x</Button>
            {linearResult && (
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 rounded-lg text-center">
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{linearResult}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="quadratic" className="space-y-6">
            <div className="p-4 bg-muted/50 rounded-lg text-center font-mono text-lg mb-4">
              ax² + bx + c = 0
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>a</Label>
                <Input type="number" value={qa} onChange={e => setQa(e.target.value)} placeholder="1" />
              </div>
              <div className="space-y-2">
                <Label>b</Label>
                <Input type="number" value={qb} onChange={e => setQb(e.target.value)} placeholder="-3" />
              </div>
              <div className="space-y-2">
                <Label>c</Label>
                <Input type="number" value={qc} onChange={e => setQc(e.target.value)} placeholder="2" />
              </div>
            </div>
            <Button onClick={solveQuadratic} className="w-full">Solve for x</Button>
            {quadraticResult && (
              <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-100 rounded-lg text-center">
                <p className="text-xl font-bold text-purple-700 dark:text-purple-300">{quadraticResult}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}