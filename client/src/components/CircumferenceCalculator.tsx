import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CircumferenceCalculator() {
  const [inputType, setInputType] = useState("radius");
  const [value, setValue] = useState("");
  const [result, setResult] = useState<{ circumference: number; area: number; diameter: number; radius: number } | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);
    const v = parseFloat(value);

    if (isNaN(v) || v <= 0) {
      setError("Please enter a valid positive number.");
      return;
    }

    let radius: number;
    if (inputType === "radius") {
      radius = v;
    } else if (inputType === "diameter") {
      radius = v / 2;
    } else {
      radius = v / (2 * Math.PI);
    }

    const circumference = 2 * Math.PI * radius;
    const area = Math.PI * radius * radius;
    const diameter = 2 * radius;

    setResult({ circumference, area, diameter, radius });
  };

  return (
    <Card className="w-full border-t-4 border-t-violet-500">
      <CardHeader>
        <CardTitle>Circumference Calculator</CardTitle>
        <CardDescription>
          Calculate circle circumference, area, diameter, and radius.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Known Value</Label>
            <Select value={inputType} onValueChange={(v) => { setInputType(v); setResult(null); }} data-testid="select-input-type">
              <SelectTrigger data-testid="trigger-input-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="radius">Radius</SelectItem>
                <SelectItem value="diameter">Diameter</SelectItem>
                <SelectItem value="circumference">Circumference</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{inputType.charAt(0).toUpperCase() + inputType.slice(1)}</Label>
            <Input data-testid="input-value" type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="5" />
          </div>
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full bg-violet-600 hover:bg-violet-700">Calculate</Button>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-lg text-center">
            <p className="text-red-600 dark:text-red-400" data-testid="text-error">{error}</p>
          </div>
        )}

        {result && (
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg border border-violet-100 text-center">
              <p className="text-xs text-muted-foreground uppercase">Circumference</p>
              <p className="text-xl font-bold text-violet-600" data-testid="text-circumference">{result.circumference.toFixed(4)}</p>
            </div>
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 text-center">
              <p className="text-xs text-muted-foreground uppercase">Area</p>
              <p className="text-xl font-bold text-indigo-600" data-testid="text-area">{result.area.toFixed(4)}</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900/20 rounded-lg border border-slate-100 text-center">
              <p className="text-xs text-muted-foreground uppercase">Diameter</p>
              <p className="text-xl font-bold" data-testid="text-diameter">{result.diameter.toFixed(4)}</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900/20 rounded-lg border border-slate-100 text-center">
              <p className="text-xs text-muted-foreground uppercase">Radius</p>
              <p className="text-xl font-bold" data-testid="text-radius">{result.radius.toFixed(4)}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}