import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FactorCalculator() {
  const [number, setNumber] = useState(12);
  const [factors, setFactors] = useState<number[]>([]);
  
  const calculate = () => {
    const res: number[] = [];
    for (let i = 1; i <= Math.sqrt(number); i++) {
      if (number % i === 0) {
        res.push(i);
        if (i !== number / i) {
          res.push(number / i);
        }
      }
    }
    setFactors(res.sort((a, b) => a - b));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Factor Calculator</CardTitle>
        <CardDescription>Find all factors of a given number.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Enter Number</Label>
          <Input type="number" min="1" value={number} onChange={(e) => setNumber(Number(e.target.value))} />
        </div>
        <Button className="w-full" onClick={calculate}>Find Factors</Button>

        {factors.length > 0 && (
          <div className="mt-6 space-y-2">
            <p className="text-sm text-muted-foreground text-center">
              Found {factors.length} factors for {number}:
            </p>
            <div className="p-4 bg-muted rounded-lg flex flex-wrap gap-2 justify-center">
              {factors.map(f => (
                <span key={f} className="inline-flex items-center justify-center w-10 h-10 bg-background rounded-full text-sm font-medium border shadow-sm">
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}