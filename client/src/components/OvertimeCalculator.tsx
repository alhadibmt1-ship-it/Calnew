import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function OvertimeCalculator() {
  const [hourlyRate, setHourlyRate] = useState("");
  const [regularHours, setRegularHours] = useState("");
  const [overtimeHours, setOvertimeHours] = useState("");
  const [overtimeMultiplier, setOvertimeMultiplier] = useState("1.5");
  const [result, setResult] = useState<{
    regularPay: number;
    overtimePay: number;
    totalPay: number;
    effectiveRate: number;
  } | null>(null);

  const calculate = () => {
    const rate = parseFloat(hourlyRate);
    const regHrs = parseFloat(regularHours);
    const otHrs = parseFloat(overtimeHours) || 0;
    const multiplier = parseFloat(overtimeMultiplier) || 1.5;

    if (rate > 0 && regHrs >= 0) {
      const regularPay = rate * regHrs;
      const overtimePay = rate * multiplier * otHrs;
      const totalPay = regularPay + overtimePay;
      const totalHours = regHrs + otHrs;
      const effectiveRate = totalHours > 0 ? totalPay / totalHours : 0;

      setResult({ regularPay, overtimePay, totalPay, effectiveRate });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-amber-600">
      <CardHeader>
        <CardTitle>Overtime Calculator</CardTitle>
        <CardDescription>Calculate regular pay, overtime pay, and total compensation.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Hourly Rate ($)</Label>
            <Input data-testid="input-hourly-rate" type="number" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} placeholder="25" />
          </div>
          <div className="space-y-2">
            <Label>Regular Hours</Label>
            <Input data-testid="input-regular-hours" type="number" value={regularHours} onChange={(e) => setRegularHours(e.target.value)} placeholder="40" />
          </div>
          <div className="space-y-2">
            <Label>Overtime Hours</Label>
            <Input data-testid="input-overtime-hours" type="number" value={overtimeHours} onChange={(e) => setOvertimeHours(e.target.value)} placeholder="10" />
          </div>
          <div className="space-y-2">
            <Label>Overtime Multiplier</Label>
            <Input data-testid="input-overtime-multiplier" type="number" value={overtimeMultiplier} onChange={(e) => setOvertimeMultiplier(e.target.value)} placeholder="1.5" step="0.1" />
          </div>
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full bg-amber-600 hover:bg-amber-700">Calculate Pay</Button>

        {result && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-lg border text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium">Regular Pay</p>
              <p data-testid="text-regular-pay" className="text-xl font-bold text-foreground">
                ${result.regularPay.toFixed(2)}
              </p>
            </div>
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium">Overtime Pay</p>
              <p data-testid="text-overtime-pay" className="text-xl font-bold text-amber-700 dark:text-amber-400">
                ${result.overtimePay.toFixed(2)}
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium">Total Pay</p>
              <p data-testid="text-total-pay" className="text-xl font-bold text-green-700 dark:text-green-400">
                ${result.totalPay.toFixed(2)}
              </p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium">Effective Rate</p>
              <p data-testid="text-effective-rate" className="text-xl font-bold text-blue-700 dark:text-blue-400">
                ${result.effectiveRate.toFixed(2)}/hr
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}