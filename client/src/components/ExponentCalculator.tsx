import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ExponentCalculator() {
  const [base, setBase] = useState("");
  const [exponent, setExponent] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);
    const b = parseFloat(base);
    const e = parseFloat(exponent);

    if (isNaN(b) || isNaN(e)) {
      setError("Please enter valid numbers.");
      return;
    }

    if (b === 0 && e < 0) {
      setError("Cannot raise 0 to a negative power.");
      return;
    }

    const val = Math.pow(b, e);

    if (!isFinite(val)) {
      setError("Result is too large or undefined.");
      return;
    }

    setResult(val);
  };

  return (
    <Card className="w-full border-t-4 border-t-amber-500">
      <CardHeader>
        <CardTitle>Exponent Calculator</CardTitle>
        <CardDescription>
          Calculate the result of a base raised to any power (bⁿ).
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Base (b)</Label>
            <Input data-testid="input-base" type="number" value={base} onChange={(e) => setBase(e.target.value)} placeholder="2" />
          </div>
          <div className="space-y-2">
            <Label>Exponent (n)</Label>
            <Input data-testid="input-exponent" type="number" value={exponent} onChange={(e) => setExponent(e.target.value)} placeholder="10" />
          </div>
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full bg-amber-600 hover:bg-amber-700">Calculate</Button>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-lg text-center">
            <p className="text-red-600 dark:text-red-400" data-testid="text-error">{error}</p>
          </div>
        )}

        {result !== null && (
          <div className="p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 rounded-lg text-center">
            <p className="text-xs text-muted-foreground uppercase">
              {base}<sup>{exponent}</sup> =
            </p>
            <p className="text-4xl font-bold text-amber-600" data-testid="text-result">
              {Math.abs(result) < 1e15 ? result.toLocaleString(undefined, { maximumFractionDigits: 10 }) : result.toExponential(6)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}