import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LogarithmCalculator() {
  const [number, setNumber] = useState(100);
  const [base, setBase] = useState(10);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    if (number <= 0 || base <= 0 || base === 1) {
      setResult(null);
      return;
    }
    // log_b(x) = log(x) / log(b)
    const res = Math.log(number) / Math.log(base);
    setResult(res);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Logarithm Calculator</CardTitle>
        <CardDescription>Calculate logarithms with any base.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-[2fr,1fr] gap-4">
          <div className="space-y-2">
            <Label>Number (x)</Label>
            <Input type="number" value={number} onChange={(e) => setNumber(Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label>Base (b)</Label>
            <Input type="number" value={base} onChange={(e) => setBase(Number(e.target.value))} />
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 text-xl font-serif text-muted-foreground">
          log<sub>{base}</sub>({number}) = ?
        </div>

        <Button className="w-full" onClick={calculate}>Calculate Log</Button>

        {result !== null && (
          <div className="p-6 bg-muted rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Result</p>
            <p className="text-3xl font-bold font-mono text-primary">{result.toFixed(5)}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}