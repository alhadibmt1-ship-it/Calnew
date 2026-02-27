import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function GrossProfitCalculator() {
  const [revenue, setRevenue] = useState("");
  const [cogs, setCogs] = useState("");
  const [result, setResult] = useState<{
    grossProfit: number;
    grossMargin: number;
  } | null>(null);

  const calculate = () => {
    const r = parseFloat(revenue);
    const c = parseFloat(cogs);

    if (!isNaN(r) && !isNaN(c) && r >= 0 && c >= 0) {
      const grossProfit = r - c;
      const grossMargin = r > 0 ? (grossProfit / r) * 100 : 0;
      setResult({ grossProfit, grossMargin });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-green-600">
      <CardHeader>
        <CardTitle>Gross Profit Calculator</CardTitle>
        <CardDescription>Calculate gross profit and gross margin percentage from revenue and cost of goods sold.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Revenue ($)</Label>
            <Input
              data-testid="input-revenue"
              type="number"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              placeholder="100000"
            />
          </div>
          <div className="space-y-2">
            <Label>Cost of Goods Sold ($)</Label>
            <Input
              data-testid="input-cogs"
              type="number"
              value={cogs}
              onChange={(e) => setCogs(e.target.value)}
              placeholder="60000"
            />
          </div>
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full bg-green-600 hover:bg-green-700">
          Calculate Gross Profit
        </Button>

        {result && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium">Gross Profit</p>
              <p data-testid="text-gross-profit" className="text-2xl font-bold text-green-700 dark:text-green-400">
                ${result.grossProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium">Gross Margin</p>
              <p data-testid="text-gross-margin" className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                {result.grossMargin.toFixed(2)}%
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
