import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function StandardDeviationCalculator() {
  const [input, setInput] = useState("10, 12, 23, 23, 16, 23, 21, 16");
  const [result, setResult] = useState<{
    mean: number, 
    populationSD: number, 
    sampleSD: number,
    count: number,
    sum: number,
    variance: number
  } | null>(null);

  const calculate = () => {
    const numbers = input
      .split(/[\s,]+/)
      .map(Number)
      .filter(n => !isNaN(n));

    if (numbers.length === 0) return;

    const n = numbers.length;
    const sum = numbers.reduce((a, b) => a + b, 0);
    const mean = sum / n;
    
    const squaredDiffs = numbers.map(x => Math.pow(x - mean, 2));
    const sumSquaredDiffs = squaredDiffs.reduce((a, b) => a + b, 0);
    
    const populationVariance = sumSquaredDiffs / n;
    const sampleVariance = sumSquaredDiffs / (n - 1);

    setResult({
      mean,
      sum,
      count: n,
      variance: sampleVariance,
      populationSD: Math.sqrt(populationVariance),
      sampleSD: Math.sqrt(sampleVariance)
    });
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Standard Deviation Calculator</CardTitle>
        <CardDescription>Calculate mean, variance, and standard deviation.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Enter Data Set (comma separated)</Label>
          <Textarea 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="10, 20, 30, 40..."
            className="h-24"
          />
        </div>
        <Button className="w-full" onClick={calculate}>Calculate Statistics</Button>

        {result && (
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground uppercase">Mean (Average)</p>
              <p className="text-xl font-bold">{result.mean.toFixed(4)}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground uppercase">Count (n)</p>
              <p className="text-xl font-bold">{result.count}</p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 rounded-lg col-span-2">
              <p className="text-xs text-muted-foreground uppercase">Sample Standard Deviation (s)</p>
              <p className="text-2xl font-bold text-primary">{result.sampleSD.toFixed(4)}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground uppercase">Population SD (σ)</p>
              <p className="text-lg font-semibold">{result.populationSD.toFixed(4)}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground uppercase">Variance (s²)</p>
              <p className="text-lg font-semibold">{result.variance.toFixed(4)}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}