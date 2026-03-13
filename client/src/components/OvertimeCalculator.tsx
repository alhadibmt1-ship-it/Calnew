import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function OvertimeCalculator() {
  const [hourlyRate, setHourlyRate] = useState("");
  const [regularHours, setRegularHours] = useState("40");
  const [overtimeHours, setOvertimeHours] = useState("");
  const [overtimeMultiplier, setOvertimeMultiplier] = useState("1.5");
  const [result, setResult] = useState<{ regularPay: number; overtimePay: number; totalPay: number; effectiveRate: number } | null>(null);

  const calculate = () => {
    const hr = parseFloat(hourlyRate);
    const rh = parseFloat(regularHours);
    const oh = parseFloat(overtimeHours) || 0;
    const om = parseFloat(overtimeMultiplier) || 1.5;
    if (hr > 0 && rh >= 0) {
      const regularPay = hr * rh;
      const overtimePay = hr * om * oh;
      const totalPay = regularPay + overtimePay;
      const effectiveRate = (rh + oh) > 0 ? totalPay / (rh + oh) : 0;
      setResult({ regularPay, overtimePay, totalPay, effectiveRate });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-amber-600" data-testid="overtime-calculator">
      <CardHeader>
        <CardTitle>Overtime Calculator</CardTitle>
        <CardDescription>Calculate regular pay, overtime pay, and total weekly earnings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Hourly Rate ($)</Label>
            <Input type="number" placeholder="25" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} data-testid="input-hourly-rate" />
          </div>
          <div className="space-y-2">
            <Label>Regular Hours (per week)</Label>
            <Input type="number" placeholder="40" value={regularHours} onChange={(e) => setRegularHours(e.target.value)} data-testid="input-regular-hours" />
          </div>
          <div className="space-y-2">
            <Label>Overtime Hours</Label>
            <Input type="number" placeholder="10" value={overtimeHours} onChange={(e) => setOvertimeHours(e.target.value)} data-testid="input-overtime-hours" />
          </div>
          <div className="space-y-2">
            <Label>Overtime Multiplier</Label>
            <Input type="number" placeholder="1.5" step="0.1" value={overtimeMultiplier} onChange={(e) => setOvertimeMultiplier(e.target.value)} data-testid="input-multiplier" />
          </div>
        </div>
        <Button onClick={calculate} className="w-full bg-amber-600 hover:bg-amber-700" data-testid="button-calculate">Calculate Pay</Button>
        {result && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 animate-in fade-in" data-testid="result-section">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Regular Pay</p>
              <p className="text-xl font-bold text-green-600" data-testid="text-regular-pay">${result.regularPay.toFixed(2)}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Overtime Pay</p>
              <p className="text-xl font-bold text-amber-600" data-testid="text-overtime-pay">${result.overtimePay.toFixed(2)}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Total Pay</p>
              <p className="text-xl font-bold text-blue-600" data-testid="text-total-pay">${result.totalPay.toFixed(2)}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Effective Rate</p>
              <p className="text-xl font-bold text-purple-600" data-testid="text-effective-rate">${result.effectiveRate.toFixed(2)}/hr</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
