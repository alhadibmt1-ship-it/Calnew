import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { differenceInYears, differenceInMonths, differenceInDays, intervalToDuration } from "date-fns";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split("T")[0]);
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalMonths: number;
    totalWeeks: number;
    totalDays: number;
    totalHours: number;
    totalMinutes: number;
  } | null>(null);

  const calculateAge = () => {
    if (!birthDate || !targetDate) return;

    const start = new Date(birthDate);
    const end = new Date(targetDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return;

    const duration = intervalToDuration({ start, end });
    
    // Total calculations
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = differenceInMonths(end, start);
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    setResult({
      years: duration.years || 0,
      months: duration.months || 0,
      days: duration.days || 0,
      totalMonths,
      totalWeeks,
      totalDays,
      totalHours,
      totalMinutes
    });
  };

  return (
    <Card className="w-full border-t-4 border-t-orange-500">
      <CardHeader>
        <CardTitle>Age Calculator</CardTitle>
        <CardDescription>
          Calculate your age in years, months, weeks, days, minutes, and seconds.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Date of Birth</Label>
            <Input 
              type="date" 
              value={birthDate} 
              onChange={(e) => setBirthDate(e.target.value)} 
            />
          </div>
          <div className="space-y-2">
            <Label>Age at Date (Default: Today)</Label>
            <Input 
              type="date" 
              value={targetDate} 
              onChange={(e) => setTargetDate(e.target.value)} 
            />
          </div>
        </div>

        <Button onClick={calculateAge} className="w-full bg-orange-500 hover:bg-orange-600">Calculate Age</Button>

        {result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-top-4">
            <div className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800 text-center">
              <p className="text-sm text-muted-foreground uppercase tracking-wide font-semibold mb-2">Your Age</p>
              <div className="flex justify-center items-baseline gap-4 flex-wrap">
                <div>
                  <span className="text-4xl font-bold text-orange-600 dark:text-orange-400">{result.years}</span>
                  <span className="text-sm text-muted-foreground ml-1">years</span>
                </div>
                <div>
                  <span className="text-4xl font-bold text-orange-600 dark:text-orange-400">{result.months}</span>
                  <span className="text-sm text-muted-foreground ml-1">months</span>
                </div>
                <div>
                  <span className="text-4xl font-bold text-orange-600 dark:text-orange-400">{result.days}</span>
                  <span className="text-sm text-muted-foreground ml-1">days</span>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-muted/30 rounded border flex justify-between">
                <span className="text-muted-foreground">Total Months</span>
                <span className="font-mono font-medium">{result.totalMonths.toLocaleString()}</span>
              </div>
              <div className="p-3 bg-muted/30 rounded border flex justify-between">
                <span className="text-muted-foreground">Total Weeks</span>
                <span className="font-mono font-medium">{result.totalWeeks.toLocaleString()}</span>
              </div>
              <div className="p-3 bg-muted/30 rounded border flex justify-between">
                <span className="text-muted-foreground">Total Days</span>
                <span className="font-mono font-medium">{result.totalDays.toLocaleString()}</span>
              </div>
              <div className="p-3 bg-muted/30 rounded border flex justify-between">
                <span className="text-muted-foreground">Total Hours</span>
                <span className="font-mono font-medium">{result.totalHours.toLocaleString()}</span>
              </div>
              <div className="p-3 bg-muted/30 rounded border flex justify-between">
                <span className="text-muted-foreground">Total Minutes</span>
                <span className="font-mono font-medium">{result.totalMinutes.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}