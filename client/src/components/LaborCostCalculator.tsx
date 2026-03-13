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
  const [result, setResult] = useState<{ regularCost: number; overtimeCost: number; totalCost: number; perWorkerCost: number } | null>(null);

  const calculate = () => {
    const w = parseFloat(workers);
    const dw = parseFloat(dailyWage);
    const d = parseFloat(days);
    if (w > 0 && dw > 0 && d > 0) {
      const regularCost = w * dw * d;
      const oh = parseFloat(overtimeHours) || 0;
      const or_ = parseFloat(overtimeRate) || (dw / 8);
      const overtimeCost = w * oh * or_ * d;
      const totalCost = regularCost + overtimeCost;
      setResult({ regularCost, overtimeCost, totalCost, perWorkerCost: totalCost / w });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-blue-700" data-testid="labor-cost-calculator">
      <CardHeader>
        <CardTitle>Labor Cost Calculator</CardTitle>
        <CardDescription>Calculate total labor costs including regular wages and overtime.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2"><Label>Number of Workers</Label><Input type="number" placeholder="10" value={workers} onChange={(e) => setWorkers(e.target.value)} data-testid="input-workers" /></div>
          <div className="space-y-2"><Label>Daily Wage ($)</Label><Input type="number" placeholder="150" value={dailyWage} onChange={(e) => setDailyWage(e.target.value)} data-testid="input-daily-wage" /></div>
          <div className="space-y-2"><Label>Number of Days</Label><Input type="number" placeholder="30" value={days} onChange={(e) => setDays(e.target.value)} data-testid="input-days" /></div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Overtime Hours/Day</Label><Input type="number" placeholder="0" value={overtimeHours} onChange={(e) => setOvertimeHours(e.target.value)} data-testid="input-ot-hours" /></div>
          <div className="space-y-2"><Label>Overtime Rate ($/hr)</Label><Input type="number" placeholder="Auto" value={overtimeRate} onChange={(e) => setOvertimeRate(e.target.value)} data-testid="input-ot-rate" /></div>
        </div>
        <Button onClick={calculate} className="w-full bg-blue-700 hover:bg-blue-800" data-testid="button-calculate">Calculate</Button>
        {result && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 animate-in fade-in" data-testid="result-section">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Regular Cost</p>
              <p className="text-xl font-bold text-blue-600" data-testid="text-regular">${result.regularCost.toLocaleString()}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Overtime Cost</p>
              <p className="text-xl font-bold text-amber-600" data-testid="text-overtime">${result.overtimeCost.toLocaleString()}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Total Cost</p>
              <p className="text-xl font-bold text-green-600" data-testid="text-total">${result.totalCost.toLocaleString()}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Per Worker</p>
              <p className="text-xl font-bold text-purple-600" data-testid="text-per-worker">${result.perWorkerCost.toLocaleString()}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
