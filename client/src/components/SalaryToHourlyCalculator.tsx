import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SalaryToHourlyCalculator() {
  const [salary, setSalary] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("52");
  const [result, setResult] = useState<{
    hourly: number;
    daily: number;
    weekly: number;
    biweekly: number;
    monthly: number;
    annual: number;
  } | null>(null);

  const calculate = () => {
    const s = parseFloat(salary);
    const h = parseFloat(hoursPerWeek);
    const w = parseFloat(weeksPerYear);

    if (s > 0 && h > 0 && w > 0) {
      const hourly = s / (h * w);
      setResult({
        hourly,
        daily: hourly * (h / 5),
        weekly: s / w,
        biweekly: (s / w) * 2,
        monthly: s / 12,
        annual: s,
      });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-emerald-600">
      <CardHeader>
        <CardTitle>Salary to Hourly Calculator</CardTitle>
        <CardDescription>
          Convert your annual salary to an hourly rate and see breakdowns by pay period.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Annual Salary ($)</Label>
            <Input
              data-testid="input-salary"
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="50000"
            />
          </div>
          <div className="space-y-2">
            <Label>Hours Per Week</Label>
            <Input
              data-testid="input-hours"
              type="number"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(e.target.value)}
              placeholder="40"
            />
          </div>
          <div className="space-y-2">
            <Label>Weeks Per Year</Label>
            <Input
              data-testid="input-weeks"
              type="number"
              value={weeksPerYear}
              onChange={(e) => setWeeksPerYear(e.target.value)}
              placeholder="52"
            />
          </div>
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full bg-emerald-600 hover:bg-emerald-700">
          Convert Salary
        </Button>

        {result && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <ResultBox label="Hourly" value={result.hourly} highlight />
            <ResultBox label="Daily" value={result.daily} />
            <ResultBox label="Weekly" value={result.weekly} />
            <ResultBox label="Bi-Weekly" value={result.biweekly} />
            <ResultBox label="Monthly" value={result.monthly} />
            <ResultBox label="Annual" value={result.annual} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ResultBox({ label, value, highlight = false }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className={`p-4 rounded-lg border ${highlight ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200" : "bg-muted/30"}`}>
      <p className="text-xs text-muted-foreground uppercase font-medium">{label}</p>
      <p data-testid={`text-${label.toLowerCase()}`} className={`text-xl font-bold ${highlight ? "text-emerald-700 dark:text-emerald-400" : ""}`}>
        ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>
    </div>
  );
}