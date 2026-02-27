import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addDays, differenceInDays, differenceInWeeks, format } from "date-fns";

export default function DueDateCalculator() {
  const [method, setMethod] = useState<"lmp" | "conception" | "ivf">("lmp");
  const [date, setDate] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [result, setResult] = useState<{
    dueDate: Date;
    conceptionDate: Date;
    currentWeek: number;
    currentDay: number;
    trimester: string;
    daysRemaining: number;
  } | null>(null);

  const calculate = () => {
    if (!date) return;
    const inputDate = new Date(date);
    const cycleAdj = (parseInt(cycleLength) || 28) - 28;

    let lmpDate: Date;
    if (method === "lmp") {
      lmpDate = inputDate;
    } else if (method === "conception") {
      lmpDate = addDays(inputDate, -(14 + cycleAdj));
    } else {
      lmpDate = addDays(inputDate, -(14 + cycleAdj + 3));
    }

    const dueDate = addDays(lmpDate, 280 + cycleAdj);
    const conceptionDate = addDays(lmpDate, 14 + cycleAdj);
    const now = new Date();
    const daysSinceLMP = differenceInDays(now, lmpDate);
    const currentWeek = Math.floor(daysSinceLMP / 7);
    const currentDay = daysSinceLMP % 7;
    const daysRemaining = Math.max(0, differenceInDays(dueDate, now));

    let trimester = "1st Trimester (Weeks 1-12)";
    if (currentWeek >= 13 && currentWeek < 27) trimester = "2nd Trimester (Weeks 13-26)";
    else if (currentWeek >= 27) trimester = "3rd Trimester (Weeks 27-40)";

    setResult({ dueDate, conceptionDate, currentWeek, currentDay, trimester, daysRemaining });
  };

  return (
    <Card className="w-full border-t-4 border-t-orange-500">
      <CardHeader>
        <CardTitle>Due Date Calculator</CardTitle>
        <CardDescription>Estimate your pregnancy due date based on LMP, conception date, or IVF transfer date.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-2">
          <Label>Calculation Method</Label>
          <Select value={method} onValueChange={(v: any) => { setMethod(v); setResult(null); }} data-testid="select-method">
            <SelectTrigger data-testid="select-method-trigger">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lmp">Last Menstrual Period (LMP)</SelectItem>
              <SelectItem value="conception">Conception Date</SelectItem>
              <SelectItem value="ivf">IVF Transfer Date</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label>{method === "lmp" ? "First Day of Last Period" : method === "conception" ? "Conception Date" : "IVF Transfer Date"}</Label>
          <Input data-testid="input-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        {method === "lmp" && (
          <div className="grid gap-2">
            <Label>Average Cycle Length (days)</Label>
            <Input data-testid="input-cycle-length" type="number" value={cycleLength} onChange={(e) => setCycleLength(e.target.value)} />
          </div>
        )}

        <Button data-testid="button-calculate" className="w-full bg-orange-500 hover:bg-orange-600 text-white" onClick={calculate}>Calculate Due Date</Button>

        {result && (
          <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-4">
            <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg border border-pink-100 dark:border-pink-900 text-center">
              <p className="text-sm text-muted-foreground">Estimated Due Date</p>
              <p className="text-3xl font-bold text-pink-600 dark:text-pink-400" data-testid="text-due-date">{format(result.dueDate, "MMMM d, yyyy")}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-muted/30 rounded border text-center">
                <p className="text-xs text-muted-foreground">Current Week</p>
                <p className="text-xl font-bold" data-testid="text-current-week">{result.currentWeek}w {result.currentDay}d</p>
              </div>
              <div className="p-3 bg-muted/30 rounded border text-center">
                <p className="text-xs text-muted-foreground">Days Remaining</p>
                <p className="text-xl font-bold" data-testid="text-days-remaining">{result.daysRemaining}</p>
              </div>
              <div className="p-3 bg-muted/30 rounded border text-center">
                <p className="text-xs text-muted-foreground">Likely Conception</p>
                <p className="font-semibold" data-testid="text-conception-date">{format(result.conceptionDate, "MMM d, yyyy")}</p>
              </div>
              <div className="p-3 bg-muted/30 rounded border text-center">
                <p className="text-xs text-muted-foreground">Trimester</p>
                <p className="font-semibold" data-testid="text-trimester">{result.trimester}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}