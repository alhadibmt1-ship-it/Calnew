import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RootCalculator() {
  const [number, setNumber] = useState(64);
  const [n, setN] = useState(2); // nth root
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    if (n === 0) {
      setResult(null);
      return;
    }
    // nth root of x = x^(1/n)
    // Handle negative bases for odd roots
    let res;
    if (number < 0 && n % 2 !== 0) {
        res = -Math.pow(Math.abs(number), 1 / n);
    } else if (number < 0 && n % 2 === 0) {
        res = NaN; // Complex
    } else {
        res = Math.pow(number, 1 / n);
    }
    setResult(res);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Root Calculator</CardTitle>
        <CardDescription>Calculate the nth root of any number.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-end justify-center gap-2 text-4xl font-serif">
          <div className="flex flex-col items-center mb-4">
            <Input 
              type="number" 
              value={n} 
              onChange={(e) => setN(Number(e.target.value))} 
              className="w-12 h-8 text-sm text-center mb-1"
              placeholder="n"
            />
          </div>
          <span className="text-6xl text-muted-foreground">√</span>
          <div className="border-t-2 border-muted-foreground pt-1 min-w-[80px]">
            <Input 
              type="number" 
              value={number} 
              onChange={(e) => setNumber(Number(e.target.value))} 
              className="text-center text-xl h-12 border-none shadow-none bg-transparent focus-visible:ring-0"
              placeholder="x"
            />
          </div>
        </div>

        <Button className="w-full" onClick={calculate}>Calculate Root</Button>

        {result !== null && (
          <div className="p-6 bg-muted rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Result</p>
            <p className="text-3xl font-bold font-mono text-primary">
              {isNaN(result) ? "Imaginary Number" : result.toFixed(5)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}