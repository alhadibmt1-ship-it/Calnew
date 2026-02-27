import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function HoursCalculator() {
  const [startHours, setStartHours] = useState("");
  const [startMinutes, setStartMinutes] = useState("");
  const [operation, setOperation] = useState<"add" | "subtract">("add");
  const [addHours, setAddHours] = useState("");
  const [addMinutes, setAddMinutes] = useState("");
  const [result, setResult] = useState<{ hours: number; minutes: number; totalMinutes: number; decimal: string } | null>(null);

  const calculate = () => {
    const sh = parseInt(startHours) || 0;
    const sm = parseInt(startMinutes) || 0;
    const ah = parseInt(addHours) || 0;
    const am = parseInt(addMinutes) || 0;

    const startTotalMin = sh * 60 + sm;
    const addTotalMin = ah * 60 + am;

    let resultMin: number;
    if (operation === "add") {
      resultMin = startTotalMin + addTotalMin;
    } else {
      resultMin = startTotalMin - addTotalMin;
    }

    const isNegative = resultMin < 0;
    const absMin = Math.abs(resultMin);
    const rh = Math.floor(absMin / 60);
    const rm = absMin % 60;
    const decimal = (absMin / 60).toFixed(2);

    setResult({
      hours: isNegative ? -rh : rh,
      minutes: rm,
      totalMinutes: resultMin,
      decimal: (isNegative ? "-" : "") + decimal,
    });
  };

  return (
    <Card className="w-full border-t-4 border-t-orange-500">
      <CardHeader>
        <CardTitle>Hours Calculator</CardTitle>
        <CardDescription>Add or subtract hours and minutes. Useful for time tracking and scheduling.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-sm font-semibold mb-2 block">Start Time</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="relative">
              <Input data-testid="input-start-hours" type="number" min="0" placeholder="0" value={startHours} onChange={(e) => setStartHours(e.target.value)} />
              <span className="absolute right-3 top-2.5 text-muted-foreground text-sm">hours</span>
            </div>
            <div className="relative">
              <Input data-testid="input-start-minutes" type="number" min="0" max="59" placeholder="0" value={startMinutes} onChange={(e) => setStartMinutes(e.target.value)} />
              <span className="absolute right-3 top-2.5 text-muted-foreground text-sm">min</span>
            </div>
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Operation</Label>
          <Select value={operation} onValueChange={(v: any) => setOperation(v)} data-testid="select-operation">
            <SelectTrigger data-testid="select-operation-trigger">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="add">Add (+)</SelectItem>
              <SelectItem value="subtract">Subtract (-)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-semibold mb-2 block">Duration</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="relative">
              <Input data-testid="input-add-hours" type="number" min="0" placeholder="0" value={addHours} onChange={(e) => setAddHours(e.target.value)} />
              <span className="absolute right-3 top-2.5 text-muted-foreground text-sm">hours</span>
            </div>
            <div className="relative">
              <Input data-testid="input-add-minutes" type="number" min="0" placeholder="0" value={addMinutes} onChange={(e) => setAddMinutes(e.target.value)} />
              <span className="absolute right-3 top-2.5 text-muted-foreground text-sm">min</span>
            </div>
          </div>
        </div>

        <Button data-testid="button-calculate" className="w-full bg-orange-500 hover:bg-orange-600 text-white" onClick={calculate}>Calculate</Button>

        {result && (
          <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-4">
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-800 text-center">
              <p className="text-sm text-muted-foreground uppercase">Result</p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400" data-testid="text-result">
                {result.hours}h {result.minutes}m
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-muted/30 rounded border text-center">
                <p className="text-xs text-muted-foreground">Total Minutes</p>
                <p className="text-lg font-bold" data-testid="text-total-minutes">{result.totalMinutes}</p>
              </div>
              <div className="p-3 bg-muted/30 rounded border text-center">
                <p className="text-xs text-muted-foreground">Decimal Hours</p>
                <p className="text-lg font-bold" data-testid="text-decimal">{result.decimal}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}