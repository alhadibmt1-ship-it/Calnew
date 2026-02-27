import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PercentageIncreaseCalculator() {
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [result, setResult] = useState<{ change: number; difference: number; type: string } | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);
    const from = parseFloat(fromValue);
    const to = parseFloat(toValue);

    if (isNaN(from) || isNaN(to)) {
      setError("Please enter valid numbers.");
      return;
    }
    if (from === 0) {
      setError("Initial value cannot be zero.");
      return;
    }

    const difference = to - from;
    const change = (difference / Math.abs(from)) * 100;
    const type = change > 0 ? "Increase" : change < 0 ? "Decrease" : "No Change";

    setResult({ change, difference, type });
  };

  return (
    <Card className="w-full border-t-4 border-t-emerald-500">
      <CardHeader>
        <CardTitle>Percentage Increase Calculator</CardTitle>
        <CardDescription>
          Calculate the percentage increase or decrease between two values.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Initial Value</Label>
            <Input data-testid="input-from" type="number" value={fromValue} onChange={(e) => setFromValue(e.target.value)} placeholder="100" />
          </div>
          <div className="space-y-2">
            <Label>Final Value</Label>
            <Input data-testid="input-to" type="number" value={toValue} onChange={(e) => setToValue(e.target.value)} placeholder="150" />
          </div>
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full bg-emerald-600 hover:bg-emerald-700">Calculate</Button>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-lg text-center">
            <p className="text-red-600 dark:text-red-400" data-testid="text-error">{error}</p>
          </div>
        )}

        {result && (
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 text-center">
              <p className="text-xs text-muted-foreground uppercase">% Change</p>
              <p className="text-2xl font-bold text-emerald-600" data-testid="text-change">
                {result.change > 0 ? "+" : ""}{result.change.toFixed(2)}%
              </p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900/20 rounded-lg border border-slate-100 text-center">
              <p className="text-xs text-muted-foreground uppercase">Difference</p>
              <p className="text-2xl font-bold" data-testid="text-difference">
                {result.difference > 0 ? "+" : ""}{result.difference.toFixed(2)}
              </p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 text-center">
              <p className="text-xs text-muted-foreground uppercase">Type</p>
              <p className="text-2xl font-bold text-blue-600" data-testid="text-type">{result.type}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}