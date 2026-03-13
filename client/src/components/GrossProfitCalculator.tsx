import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function GrossProfitCalculator() {
  const [revenue, setRevenue] = useState("");
  const [cogs, setCogs] = useState("");
  const [result, setResult] = useState<{ grossProfit: number; grossMargin: number } | null>(null);

  const calculate = () => {
    const r = parseFloat(revenue);
    const c = parseFloat(cogs);
    if (r > 0 && c >= 0) {
      const gp = r - c;
      const gm = (gp / r) * 100;
      setResult({ grossProfit: gp, grossMargin: gm });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-green-600" data-testid="gross-profit-calculator">
      <CardHeader>
        <CardTitle>Gross Profit Calculator</CardTitle>
        <CardDescription>Calculate gross profit and gross margin from revenue and cost of goods sold.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Revenue ($)</Label>
            <Input type="number" placeholder="100000" value={revenue} onChange={(e) => setRevenue(e.target.value)} data-testid="input-revenue" />
          </div>
          <div className="space-y-2">
            <Label>Cost of Goods Sold ($)</Label>
            <Input type="number" placeholder="60000" value={cogs} onChange={(e) => setCogs(e.target.value)} data-testid="input-cogs" />
          </div>
        </div>
        <Button onClick={calculate} className="w-full bg-green-600 hover:bg-green-700" data-testid="button-calculate">Calculate</Button>
        {result && (
          <div className="grid grid-cols-2 gap-4 mt-4 animate-in fade-in" data-testid="result-section">
            <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Gross Profit</p>
              <p className="text-2xl font-bold text-green-600" data-testid="text-gross-profit">${result.grossProfit.toLocaleString()}</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Gross Margin</p>
              <p className="text-2xl font-bold text-blue-600" data-testid="text-gross-margin">{result.grossMargin.toFixed(1)}%</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
