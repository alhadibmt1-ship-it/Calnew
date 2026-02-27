import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ElectricityCostCalculator() {
  const [wattage, setWattage] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState("");
  const [daysPerMonth, setDaysPerMonth] = useState("30");
  const [pricePerKwh, setPricePerKwh] = useState("0.12");
  const [result, setResult] = useState<{
    dailyKwh: number;
    monthlyKwh: number;
    yearlyKwh: number;
    dailyCost: number;
    monthlyCost: number;
    yearlyCost: number;
  } | null>(null);

  const calculate = () => {
    const watts = parseFloat(wattage) || 0;
    const hrsDay = parseFloat(hoursPerDay) || 0;
    const days = parseFloat(daysPerMonth) || 30;
    const price = parseFloat(pricePerKwh) || 0;

    if (watts <= 0 || hrsDay <= 0 || price <= 0) return;

    const dailyKwh = (watts * hrsDay) / 1000;
    const monthlyKwh = dailyKwh * days;
    const yearlyKwh = dailyKwh * 365;

    const dailyCost = dailyKwh * price;
    const monthlyCost = monthlyKwh * price;
    const yearlyCost = yearlyKwh * price;

    setResult({
      dailyKwh: parseFloat(dailyKwh.toFixed(3)),
      monthlyKwh: parseFloat(monthlyKwh.toFixed(2)),
      yearlyKwh: parseFloat(yearlyKwh.toFixed(2)),
      dailyCost: parseFloat(dailyCost.toFixed(2)),
      monthlyCost: parseFloat(monthlyCost.toFixed(2)),
      yearlyCost: parseFloat(yearlyCost.toFixed(2)),
    });
  };

  return (
    <Card className="w-full border-t-4 border-t-orange-500">
      <CardHeader>
        <CardTitle>Electricity Cost Calculator</CardTitle>
        <CardDescription>Estimate electricity costs for appliances based on wattage, usage, and electricity rates.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-2">
          <Label>Appliance Wattage</Label>
          <div className="relative">
            <Input data-testid="input-wattage" type="number" placeholder="1000" value={wattage} onChange={(e) => setWattage(e.target.value)} />
            <span className="absolute right-3 top-2.5 text-muted-foreground text-sm">watts</span>
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Hours Used Per Day</Label>
          <div className="relative">
            <Input data-testid="input-hours-per-day" type="number" placeholder="8" value={hoursPerDay} onChange={(e) => setHoursPerDay(e.target.value)} />
            <span className="absolute right-3 top-2.5 text-muted-foreground text-sm">hours</span>
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Days Per Month</Label>
          <Input data-testid="input-days-per-month" type="number" placeholder="30" value={daysPerMonth} onChange={(e) => setDaysPerMonth(e.target.value)} />
        </div>

        <div className="grid gap-2">
          <Label>Electricity Rate</Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">$</span>
            <Input data-testid="input-price-per-kwh" type="number" placeholder="0.12" step="0.01" value={pricePerKwh} onChange={(e) => setPricePerKwh(e.target.value)} className="pl-7" />
            <span className="absolute right-3 top-2.5 text-muted-foreground text-sm">per kWh</span>
          </div>
        </div>

        <Button data-testid="button-calculate" className="w-full bg-orange-500 hover:bg-orange-600 text-white" onClick={calculate}>Calculate Cost</Button>

        {result && (
          <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-800 text-center">
                <p className="text-xs text-muted-foreground uppercase">Daily</p>
                <p className="text-xl font-bold text-orange-600 dark:text-orange-400" data-testid="text-daily-cost">${result.dailyCost.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">{result.dailyKwh} kWh</p>
              </div>
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-800 text-center">
                <p className="text-xs text-muted-foreground uppercase">Monthly</p>
                <p className="text-xl font-bold text-orange-600 dark:text-orange-400" data-testid="text-monthly-cost">${result.monthlyCost.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">{result.monthlyKwh} kWh</p>
              </div>
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-800 text-center">
                <p className="text-xs text-muted-foreground uppercase">Yearly</p>
                <p className="text-xl font-bold text-orange-600 dark:text-orange-400" data-testid="text-yearly-cost">${result.yearlyCost.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">{result.yearlyKwh} kWh</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}