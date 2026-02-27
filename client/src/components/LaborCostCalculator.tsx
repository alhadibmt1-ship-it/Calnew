import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LaborCostCalculator() {
  const [workers, setWorkers] = useState("");
  const [dailyWage, setDailyWage] = useState("");
  const [days, setDays] = useState("");
  const [overtimeHours, setOvertimeHours] = useState("0");
  const [overtimeRate, setOvertimeRate] = useState("");
  const [result, setResult] = useState<{
    regularCost: number;
    overtimeCost: number;
    totalLaborCost: number;
    perWorkerCost: number;
  } | null>(null);

  const calculate = () => {
    const w = parseInt(workers) || 0;
    const dw = parseFloat(dailyWage) || 0;
    const d = parseInt(days) || 0;
    const otHours = parseFloat(overtimeHours) || 0;
    const otRate = parseFloat(overtimeRate) || 0;

    if (w > 0 && dw > 0 && d > 0) {
      const regularCost = w * dw * d;
      const overtimeCost = w * otHours * otRate * d;
      const totalLaborCost = regularCost + overtimeCost;
      const perWorkerCost = totalLaborCost / w;

      setResult({ regularCost, overtimeCost, totalLaborCost, perWorkerCost });
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle data-testid="text-title">Labor Cost Calculator</CardTitle>
        <CardDescription>Calculate total labor cost including regular wages and overtime for construction projects.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Number of Workers</Label>
            <Input data-testid="input-workers" type="number" value={workers} onChange={(e) => setWorkers(e.target.value)} placeholder="10" min="1" />
          </div>
          <div className="space-y-2">
            <Label>Daily Wage ($)</Label>
            <Input data-testid="input-daily-wage" type="number" value={dailyWage} onChange={(e) => setDailyWage(e.target.value)} placeholder="150" />
          </div>
          <div className="space-y-2">
            <Label>Number of Days</Label>
            <Input data-testid="input-days" type="number" value={days} onChange={(e) => setDays(e.target.value)} placeholder="30" min="1" />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Overtime Hours (per worker/day)</Label>
            <Input data-testid="input-overtime-hours" type="number" value={overtimeHours} onChange={(e) => setOvertimeHours(e.target.value)} placeholder="0" min="0" />
          </div>
          <div className="space-y-2">
            <Label>Overtime Rate ($/hour)</Label>
            <Input data-testid="input-overtime-rate" type="number" value={overtimeRate} onChange={(e) => setOvertimeRate(e.target.value)} placeholder="25" />
          </div>
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full">Calculate Labor Cost</Button>

        {result && (
          <div className="space-y-4 pt-4 animate-in fade-in-50">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground uppercase">Regular Wages</p>
                <p data-testid="text-regular-cost" className="text-xl font-bold">${result.regularCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground uppercase">Overtime Cost</p>
                <p data-testid="text-overtime-cost" className="text-xl font-bold">${result.overtimeCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-xs text-muted-foreground uppercase">Total Labor Cost</p>
                <p data-testid="text-total-labor-cost" className="text-2xl font-bold text-primary">${result.totalLaborCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground uppercase">Per Worker Cost</p>
                <p data-testid="text-per-worker-cost" className="text-xl font-bold">${result.perWorkerCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}