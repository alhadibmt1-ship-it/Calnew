import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FractionCalculator() {
  const [n1, setN1] = useState(1);
  const [d1, setD1] = useState(2);
  const [n2, setN2] = useState(1);
  const [d2, setD2] = useState(3);
  const [op, setOp] = useState("add");
  const [result, setResult] = useState<{n: number, d: number} | null>(null);

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const calculate = () => {
    let resN = 0;
    let resD = 0;

    if (op === "add") {
      resN = n1 * d2 + n2 * d1;
      resD = d1 * d2;
    } else if (op === "sub") {
      resN = n1 * d2 - n2 * d1;
      resD = d1 * d2;
    } else if (op === "mul") {
      resN = n1 * n2;
      resD = d1 * d2;
    } else if (op === "div") {
      resN = n1 * d2;
      resD = d1 * n2;
    }

    if (resD === 0) {
      setResult(null); // Error
      return;
    }

    // Simplify
    const divisor = gcd(Math.abs(resN), Math.abs(resD));
    setResult({
      n: resN / divisor,
      d: resD / divisor
    });
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Fraction Calculator</CardTitle>
        <CardDescription>Add, subtract, multiply, and divide fractions.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4 justify-center">
          {/* Fraction 1 */}
          <div className="flex flex-col gap-2 w-20">
            <Input type="number" value={n1} onChange={(e) => setN1(Number(e.target.value))} className="text-center" />
            <div className="h-0.5 bg-foreground w-full"></div>
            <Input type="number" value={d1} onChange={(e) => setD1(Number(e.target.value))} className="text-center" />
          </div>

          {/* Operator */}
          <Select value={op} onValueChange={setOp}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="add">+</SelectItem>
              <SelectItem value="sub">-</SelectItem>
              <SelectItem value="mul">×</SelectItem>
              <SelectItem value="div">÷</SelectItem>
            </SelectContent>
          </Select>

          {/* Fraction 2 */}
          <div className="flex flex-col gap-2 w-20">
            <Input type="number" value={n2} onChange={(e) => setN2(Number(e.target.value))} className="text-center" />
            <div className="h-0.5 bg-foreground w-full"></div>
            <Input type="number" value={d2} onChange={(e) => setD2(Number(e.target.value))} className="text-center" />
          </div>

          <div className="text-2xl font-bold">=</div>

          {/* Result */}
          {result ? (
            <div className="flex flex-col gap-2 w-20 items-center">
              <div className="text-xl font-bold">{result.n}</div>
              <div className="h-0.5 bg-foreground w-full"></div>
              <div className="text-xl font-bold">{result.d}</div>
            </div>
          ) : (
            <div className="w-20 text-center text-muted-foreground">?</div>
          )}
        </div>

        <Button className="w-full" onClick={calculate}>Calculate</Button>
      </CardContent>
    </Card>
  );
}