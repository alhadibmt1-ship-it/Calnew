import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NetProfitCalculator() {
  const [revenue, setRevenue] = useState("");
  const [cogs, setCogs] = useState("");
  const [operatingExpenses, setOperatingExpenses] = useState("");
  const [taxes, setTaxes] = useState("");
  const [result, setResult] = useState<{
    grossProfit: number;
    grossMargin: number;
    operatingProfit: number;
    operatingMargin: number;
    netProfit: number;
    netMargin: number;
  } | null>(null);

  const calculate = () => {
    const r = parseFloat(revenue);
    const c = parseFloat(cogs);
    const op = parseFloat(operatingExpenses) || 0;
    const t = parseFloat(taxes) || 0;

    if (!isNaN(r) && !isNaN(c) && r >= 0 && c >= 0) {
      const grossProfit = r - c;
      const grossMargin = r > 0 ? (grossProfit / r) * 100 : 0;
      const operatingProfit = grossProfit - op;
      const operatingMargin = r > 0 ? (operatingProfit / r) * 100 : 0;
      const netProfit = operatingProfit - t;
      const netMargin = r > 0 ? (netProfit / r) * 100 : 0;

      setResult({
        grossProfit,
        grossMargin,
        operatingProfit,
        operatingMargin,
        netProfit,
        netMargin,
      });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-green-600">
      <CardHeader>
        <CardTitle>Net Profit Calculator</CardTitle>
        <CardDescription>Calculate gross profit, operating profit, net profit, and all margin percentages.</CardDescription>
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
              placeholder="500000"
            />
          </div>
          <div className="space-y-2">
            <Label>Cost of Goods Sold ($)</Label>
            <Input
              data-testid="input-cogs"
              type="number"
              value={cogs}
              onChange={(e) => setCogs(e.target.value)}
              placeholder="200000"
            />
          </div>
          <div className="space-y-2">
            <Label>Operating Expenses ($)</Label>
            <Input
              data-testid="input-operating-expenses"
              type="number"
              value={operatingExpenses}
              onChange={(e) => setOperatingExpenses(e.target.value)}
              placeholder="100000"
            />
          </div>
          <div className="space-y-2">
            <Label>Taxes ($)</Label>
            <Input
              data-testid="input-taxes"
              type="number"
              value={taxes}
              onChange={(e) => setTaxes(e.target.value)}
              placeholder="50000"
            />
          </div>
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full bg-green-600 hover:bg-green-700">
          Calculate Net Profit
        </Button>

        {result && (
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 text-center">
                <p className="text-xs text-muted-foreground uppercase font-medium">Gross Profit</p>
                <p data-testid="text-gross-profit" className="text-2xl font-bold text-green-700 dark:text-green-400">
                  ${result.grossProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Margin: {result.grossMargin.toFixed(2)}%</p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 text-center">
                <p className="text-xs text-muted-foreground uppercase font-medium">Operating Profit</p>
                <p data-testid="text-operating-profit" className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                  ${result.operatingProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Margin: {result.operatingMargin.toFixed(2)}%</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 text-center">
                <p className="text-xs text-muted-foreground uppercase font-medium">Net Profit</p>
                <p data-testid="text-net-profit" className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                  ${result.netProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Margin: {result.netMargin.toFixed(2)}%</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
