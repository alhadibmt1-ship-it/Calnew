import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function countSigFigs(numStr: string): number {
  const cleaned = numStr.trim().replace(/^-/, "");
  if (cleaned === "0" || cleaned === "") return 0;

  const withoutLeadingZeros = cleaned.replace(/^0+/, "");

  if (cleaned.includes(".")) {
    const parts = cleaned.split(".");
    if (parseInt(parts[0]) === 0) {
      const afterDecimal = parts[1];
      const significant = afterDecimal.replace(/^0+/, "");
      return significant.length;
    }
    return (parts[0].replace(/^0+/, "") + parts[1]).length;
  }

  const withoutTrailing = withoutLeadingZeros.replace(/0+$/, "");
  return withoutTrailing.length || 1;
}

function roundToSigFigs(num: number, sigFigs: number): string {
  if (num === 0) return "0";
  if (sigFigs <= 0) return "0";

  const d = Math.ceil(Math.log10(Math.abs(num)));
  const power = sigFigs - d;
  const magnitude = Math.pow(10, power);
  const shifted = Math.round(num * magnitude);
  const result = shifted / magnitude;

  if (power > 0) {
    return result.toFixed(power);
  }
  return result.toString();
}

export default function SignificantFiguresCalculator() {
  const [number, setNumber] = useState("");
  const [targetSigFigs, setTargetSigFigs] = useState("");
  const [result, setResult] = useState<{ original: string; sigFigs: number; rounded: string; targetFigs: number } | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);

    if (!number.trim()) {
      setError("Please enter a number.");
      return;
    }

    const num = parseFloat(number);
    if (isNaN(num)) {
      setError("Please enter a valid number.");
      return;
    }

    const sigFigs = countSigFigs(number);
    const target = parseInt(targetSigFigs) || sigFigs;

    if (target < 1) {
      setError("Significant figures must be at least 1.");
      return;
    }

    const rounded = roundToSigFigs(num, target);

    setResult({
      original: number,
      sigFigs,
      rounded,
      targetFigs: target,
    });
  };

  return (
    <Card className="w-full border-t-4 border-t-rose-500">
      <CardHeader>
        <CardTitle>Significant Figures Calculator</CardTitle>
        <CardDescription>
          Count significant figures and round numbers to a specified number of sig figs.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Number</Label>
            <Input data-testid="input-number" type="text" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="0.00450" />
          </div>
          <div className="space-y-2">
            <Label>Round to Sig Figs (optional)</Label>
            <Input data-testid="input-sig-figs" type="number" value={targetSigFigs} onChange={(e) => setTargetSigFigs(e.target.value)} placeholder="3" min="1" />
          </div>
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full bg-rose-600 hover:bg-rose-700">Calculate</Button>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-lg text-center">
            <p className="text-red-600 dark:text-red-400" data-testid="text-error">{error}</p>
          </div>
        )}

        {result && (
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg border border-rose-100 text-center">
              <p className="text-xs text-muted-foreground uppercase">Sig Figs in Original</p>
              <p className="text-3xl font-bold text-rose-600" data-testid="text-sig-figs">{result.sigFigs}</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900/20 rounded-lg border border-slate-100 text-center">
              <p className="text-xs text-muted-foreground uppercase">Rounded to {result.targetFigs} Sig Figs</p>
              <p className="text-3xl font-bold" data-testid="text-rounded">{result.rounded}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}