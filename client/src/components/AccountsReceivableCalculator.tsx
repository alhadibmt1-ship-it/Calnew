import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AccountsReceivableCalculator() {
  const [creditSales, setCreditSales] = useState("");
  const [beginningAR, setBeginningAR] = useState("");
  const [endingAR, setEndingAR] = useState("");
  const [result, setResult] = useState<{
    averageAR: number;
    arTurnover: number;
    avgCollectionPeriod: number;
  } | null>(null);

  const calculate = () => {
    const cs = parseFloat(creditSales);
    const bar = parseFloat(beginningAR);
    const ear = parseFloat(endingAR);

    if (!isNaN(cs) && !isNaN(bar) && !isNaN(ear) && cs >= 0 && bar >= 0 && ear >= 0) {
      const averageAR = (bar + ear) / 2;
      const arTurnover = averageAR > 0 ? cs / averageAR : 0;
      const avgCollectionPeriod = arTurnover > 0 ? 365 / arTurnover : 0;

      setResult({ averageAR, arTurnover, avgCollectionPeriod });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-violet-600">
      <CardHeader>
        <CardTitle>Accounts Receivable Calculator</CardTitle>
        <CardDescription>Calculate AR turnover ratio and average collection period from credit sales and receivables data.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Total Credit Sales ($)</Label>
            <Input
              data-testid="input-credit-sales"
              type="number"
              value={creditSales}
              onChange={(e) => setCreditSales(e.target.value)}
              placeholder="1000000"
            />
          </div>
          <div className="space-y-2">
            <Label>Beginning AR ($)</Label>
            <Input
              data-testid="input-beginning-ar"
              type="number"
              value={beginningAR}
              onChange={(e) => setBeginningAR(e.target.value)}
              placeholder="80000"
            />
          </div>
          <div className="space-y-2">
            <Label>Ending AR ($)</Label>
            <Input
              data-testid="input-ending-ar"
              type="number"
              value={endingAR}
              onChange={(e) => setEndingAR(e.target.value)}
              placeholder="120000"
            />
          </div>
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full bg-violet-600 hover:bg-violet-700">
          Calculate AR Turnover
        </Button>

        {result && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg border border-violet-200 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium">AR Turnover</p>
              <p data-testid="text-ar-turnover" className="text-2xl font-bold text-violet-700 dark:text-violet-400">
                {result.arTurnover.toFixed(2)}x
              </p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium">Avg Collection Period</p>
              <p data-testid="text-collection-period" className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                {result.avgCollectionPeriod.toFixed(1)} days
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium">Average AR</p>
              <p data-testid="text-average-ar" className="text-2xl font-bold text-green-700 dark:text-green-400">
                ${result.averageAR.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
