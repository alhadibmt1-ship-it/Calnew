import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RatioCalculator() {
  const [a, setA] = useState<number | "">("");
  const [b, setB] = useState<number | "">("");
  const [c, setC] = useState<number | "">("");
  const [d, setD] = useState<number | "">("");

  const solve = () => {
    // A : B = C : D
    // Solve for the empty one
    const valA = Number(a);
    const valB = Number(b);
    const valC = Number(c);
    const valD = Number(d);

    if (a === "") { // A = (B * C) / D
      setA((valB * valC) / valD);
    } else if (b === "") { // B = (A * D) / C
      setB((valA * valD) / valC);
    } else if (c === "") { // C = (A * D) / B
      setC((valA * valD) / valB);
    } else if (d === "") { // D = (B * C) / A
      setD((valB * valC) / valA);
    }
  };

  const reset = () => {
    setA(""); setB(""); setC(""); setD("");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Ratio Calculator</CardTitle>
        <CardDescription>Solve for the missing value in a proportion (A:B = C:D).</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center gap-4 text-2xl font-bold">
          <div className="flex flex-col gap-2 w-20">
            <Input 
              type="number" 
              value={a} 
              onChange={(e) => setA(e.target.value === "" ? "" : Number(e.target.value))} 
              placeholder="A"
              className="text-center" 
            />
          </div>
          <span>:</span>
          <div className="flex flex-col gap-2 w-20">
            <Input 
              type="number" 
              value={b} 
              onChange={(e) => setB(e.target.value === "" ? "" : Number(e.target.value))} 
              placeholder="B"
              className="text-center" 
            />
          </div>
          <span>=</span>
          <div className="flex flex-col gap-2 w-20">
            <Input 
              type="number" 
              value={c} 
              onChange={(e) => setC(e.target.value === "" ? "" : Number(e.target.value))} 
              placeholder="C"
              className="text-center" 
            />
          </div>
          <span>:</span>
          <div className="flex flex-col gap-2 w-20">
            <Input 
              type="number" 
              value={d} 
              onChange={(e) => setD(e.target.value === "" ? "" : Number(e.target.value))} 
              placeholder="D"
              className="text-center" 
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={reset}>Clear</Button>
          <Button onClick={solve}>Solve Missing</Button>
        </div>
        
        <p className="text-xs text-center text-muted-foreground">
          Leave exactly one field empty to calculate its value.
        </p>
      </CardContent>
    </Card>
  );
}