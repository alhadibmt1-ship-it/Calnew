import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PythagoreanCalculator() {
  const [solveFor, setSolveFor] = useState("c");
  const [valueA, setValueA] = useState("");
  const [valueB, setValueB] = useState("");
  const [valueC, setValueC] = useState("");
  const [result, setResult] = useState<{ missing: string; value: number } | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);
    const a = parseFloat(valueA);
    const b = parseFloat(valueB);
    const c = parseFloat(valueC);

    if (solveFor === "c") {
      if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
        setError("Please enter valid positive numbers for sides A and B.");
        return;
      }
      const val = Math.sqrt(a * a + b * b);
      setResult({ missing: "c (Hypotenuse)", value: val });
    } else if (solveFor === "a") {
      if (isNaN(b) || isNaN(c) || b <= 0 || c <= 0) {
        setError("Please enter valid positive numbers for sides B and C.");
        return;
      }
      if (c <= b) {
        setError("Hypotenuse (C) must be greater than side B.");
        return;
      }
      const val = Math.sqrt(c * c - b * b);
      setResult({ missing: "a", value: val });
    } else {
      if (isNaN(a) || isNaN(c) || a <= 0 || c <= 0) {
        setError("Please enter valid positive numbers for sides A and C.");
        return;
      }
      if (c <= a) {
        setError("Hypotenuse (C) must be greater than side A.");
        return;
      }
      const val = Math.sqrt(c * c - a * a);
      setResult({ missing: "b", value: val });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-blue-500">
      <CardHeader>
        <CardTitle>Pythagorean Theorem Calculator</CardTitle>
        <CardDescription>
          Find the missing side of a right triangle using a² + b² = c².
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Solve For</Label>
          <Select value={solveFor} onValueChange={(v) => { setSolveFor(v); setResult(null); setError(""); }} data-testid="select-solve-for">
            <SelectTrigger data-testid="trigger-solve-for">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="c">c (Hypotenuse)</SelectItem>
              <SelectItem value="a">a (Side)</SelectItem>
              <SelectItem value="b">b (Side)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {solveFor !== "a" && (
            <div className="space-y-2">
              <Label>Side a</Label>
              <Input data-testid="input-side-a" type="number" value={valueA} onChange={(e) => setValueA(e.target.value)} placeholder="3" />
            </div>
          )}
          {solveFor !== "b" && (
            <div className="space-y-2">
              <Label>Side b</Label>
              <Input data-testid="input-side-b" type="number" value={valueB} onChange={(e) => setValueB(e.target.value)} placeholder="4" />
            </div>
          )}
          {solveFor !== "c" && (
            <div className="space-y-2">
              <Label>Side c (Hypotenuse)</Label>
              <Input data-testid="input-side-c" type="number" value={valueC} onChange={(e) => setValueC(e.target.value)} placeholder="5" />
            </div>
          )}
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full bg-blue-600 hover:bg-blue-700">Calculate</Button>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-lg text-center">
            <p className="text-red-600 dark:text-red-400" data-testid="text-error">{error}</p>
          </div>
        )}

        {result && (
          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 rounded-lg text-center">
            <p className="text-xs text-muted-foreground uppercase">Missing Side ({result.missing})</p>
            <p className="text-4xl font-bold text-blue-600" data-testid="text-result">{result.value.toFixed(4)}</p>
            <p className="text-sm text-muted-foreground mt-2">
              a² + b² = c²
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}