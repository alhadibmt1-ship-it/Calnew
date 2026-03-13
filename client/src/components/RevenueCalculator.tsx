import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function RevenueCalculator() {
  const [revenues, setRevenues] = useState<string[]>(Array(12).fill(""));
  const [calculated, setCalculated] = useState(false);

  const values = revenues.map(r => parseFloat(r) || 0);
  const total = values.reduce((s, v) => s + v, 0);
  const filledMonths = values.filter(v => v > 0).length;
  const average = filledMonths > 0 ? total / filledMonths : 0;
  const firstNonZero = values.findIndex(v => v > 0);
  const lastNonZero = values.findLastIndex(v => v > 0);
  const growthRate = firstNonZero >= 0 && lastNonZero > firstNonZero && values[firstNonZero] > 0
    ? ((values[lastNonZero] - values[firstNonZero]) / values[firstNonZero]) * 100 : 0;

  const chartData = MONTHS.map((m, i) => ({ name: m, revenue: values[i] }));

  return (
    <Card className="w-full border-t-4 border-t-cyan-600" data-testid="revenue-calculator">
      <CardHeader>
        <CardTitle>Revenue Calculator</CardTitle>
        <CardDescription>Enter monthly revenues to see totals, averages, and growth trends.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {MONTHS.map((month, i) => (
            <div key={month} className="space-y-1">
              <Label className="text-xs">{month}</Label>
              <Input type="number" placeholder="0" value={revenues[i]} onChange={(e) => { const r = [...revenues]; r[i] = e.target.value; setRevenues(r); }} data-testid={`input-${month.toLowerCase()}`} />
            </div>
          ))}
        </div>
        <Button onClick={() => setCalculated(true)} className="w-full bg-cyan-600 hover:bg-cyan-700" data-testid="button-calculate">Analyze Revenue</Button>
        {calculated && (
          <div className="space-y-4 animate-in fade-in" data-testid="result-section">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-cyan-600" data-testid="text-total">${total.toLocaleString()}</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Monthly Average</p>
                <p className="text-2xl font-bold text-blue-600" data-testid="text-average">${Math.round(average).toLocaleString()}</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Growth Rate</p>
                <p className={`text-2xl font-bold ${growthRate >= 0 ? "text-green-600" : "text-red-600"}`} data-testid="text-growth">{growthRate.toFixed(1)}%</p>
              </div>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]} />
                  <Bar dataKey="revenue" fill="#0891b2" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
