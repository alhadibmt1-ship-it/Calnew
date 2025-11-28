import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SalaryCalculator() {
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("year");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");

  const calculate = () => {
    const val = parseFloat(amount);
    const hours = parseFloat(hoursPerWeek);
    if (isNaN(val) || isNaN(hours)) return null;

    let annual = 0;
    switch(period) {
      case "year": annual = val; break;
      case "month": annual = val * 12; break;
      case "week": annual = val * 52; break;
      case "day": annual = val * 52 * 5; break;
      case "hour": annual = val * 52 * hours; break;
    }

    return {
      annual: annual,
      monthly: annual / 12,
      biweekly: annual / 26,
      weekly: annual / 52,
      daily: annual / (52 * 5),
      hourly: annual / (52 * hours)
    };
  };

  const result = calculate();

  return (
    <Card className="w-full border-t-4 border-t-emerald-600">
      <CardHeader>
        <CardTitle>Salary Paycheck Calculator</CardTitle>
        <CardDescription>Convert your salary between hourly, monthly, and annual rates.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-[1fr,auto] gap-4 items-end">
          <div className="space-y-2">
            <Label>Salary Amount</Label>
            <Input 
              type="number" 
              value={amount} 
              onChange={e => setAmount(e.target.value)} 
              placeholder="50000" 
              className="text-lg"
            />
          </div>
          <div className="space-y-2 w-full sm:w-[180px]">
            <Label>Per</Label>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="year">Year</SelectItem>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="hour">Hour</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Hours per Week</Label>
          <Input type="number" value={hoursPerWeek} onChange={e => setHoursPerWeek(e.target.value)} />
        </div>

        {result && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <ResultBox label="Annual" value={result.annual} highlight />
            <ResultBox label="Monthly" value={result.monthly} />
            <ResultBox label="Bi-Weekly" value={result.biweekly} />
            <ResultBox label="Weekly" value={result.weekly} />
            <ResultBox label="Daily" value={result.daily} />
            <ResultBox label="Hourly" value={result.hourly} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ResultBox({ label, value, highlight = false }: { label: string, value: number, highlight?: boolean }) {
  return (
    <div className={`p-4 rounded-lg border ${highlight ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200' : 'bg-muted/30'}`}>
      <p className="text-xs text-muted-foreground uppercase font-medium">{label}</p>
      <p className={`text-xl font-bold ${highlight ? 'text-emerald-700 dark:text-emerald-400' : ''}`}>
        ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>
    </div>
  );
}