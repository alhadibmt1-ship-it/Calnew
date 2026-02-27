import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function RevenueCalculator() {
  const [revenues, setRevenues] = useState<string[]>(Array(12).fill(""));

  const updateRevenue = (index: number, value: string) => {
    const updated = [...revenues];
    updated[index] = value;
    setRevenues(updated);
  };

  const values = revenues.map((r) => parseFloat(r) || 0);
  const filledValues = values.filter((v) => v > 0);
  const totalRevenue = values.reduce((sum, v) => sum + v, 0);
  const averageRevenue = filledValues.length > 0 ? totalRevenue / filledValues.length : 0;

  let growthRate = 0;
  if (filledValues.length >= 2) {
    const firstNonZeroIdx = values.findIndex((v) => v > 0);
    let lastNonZeroIdx = -1;
    for (let i = values.length - 1; i >= 0; i--) {
      if (values[i] > 0) { lastNonZeroIdx = i; break; }
    }
    if (firstNonZeroIdx !== lastNonZeroIdx && values[firstNonZeroIdx] > 0) {
      growthRate = ((values[lastNonZeroIdx] - values[firstNonZeroIdx]) / values[firstNonZeroIdx]) * 100;
    }
  }

  const maxValue = Math.max(...values, 1);

  return (
    <Card className="w-full border-t-4 border-t-teal-600">
      <CardHeader>
        <CardTitle>Revenue Calculator</CardTitle>
        <CardDescription>Enter monthly revenues to see total, average, and growth rate with a visual chart.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {MONTHS.map((month, idx) => (
            <div key={month} className="space-y-1">
              <Label className="text-xs">{month}</Label>
              <Input
                data-testid={`input-revenue-${month.toLowerCase()}`}
                type="number"
                value={revenues[idx]}
                onChange={(e) => updateRevenue(idx, e.target.value)}
                placeholder="0"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 text-center">
            <p className="text-xs text-muted-foreground uppercase font-medium">Total Revenue</p>
            <p data-testid="text-total-revenue" className="text-2xl font-bold text-teal-700 dark:text-teal-400">
              ${totalRevenue.toFixed(2)}
            </p>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 text-center">
            <p className="text-xs text-muted-foreground uppercase font-medium">Average Monthly</p>
            <p data-testid="text-average-revenue" className="text-2xl font-bold text-blue-700 dark:text-blue-400">
              ${averageRevenue.toFixed(2)}
            </p>
          </div>
          <div className={`p-4 rounded-lg border text-center ${growthRate >= 0 ? "bg-green-50 dark:bg-green-900/20 border-green-200" : "bg-red-50 dark:bg-red-900/20 border-red-200"}`}>
            <p className="text-xs text-muted-foreground uppercase font-medium">Growth Rate</p>
            <p data-testid="text-growth-rate" className={`text-2xl font-bold ${growthRate >= 0 ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}>
              {growthRate.toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="pt-2">
          <h4 className="font-semibold mb-3 text-sm">Monthly Revenue Chart</h4>
          <div className="flex items-end gap-1 h-40">
            {values.map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full">
                <div
                  className="w-full bg-teal-500 dark:bg-teal-400 rounded-t-sm min-h-[2px]"
                  style={{ height: `${(val / maxValue) * 100}%` }}
                  data-testid={`bar-revenue-${MONTHS[idx].toLowerCase()}`}
                />
                <span className="text-[10px] text-muted-foreground mt-1">{MONTHS[idx]}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}