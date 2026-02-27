import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ROICalculator() {
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [returnAmount, setReturnAmount] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<{
    roi: number;
    netProfit: number;
    annualizedROI: number;
  } | null>(null);

  const calculate = () => {
    const investment = parseFloat(investmentAmount);
    const returnVal = parseFloat(returnAmount);
    const period = parseFloat(years) || 1;

    if (investment > 0 && returnVal >= 0) {
      const netProfit = returnVal - investment;
      const roi = (netProfit / investment) * 100;
      const annualizedROI = (Math.pow(returnVal / investment, 1 / period) - 1) * 100;

      setResult({
        roi,
        netProfit,
        annualizedROI: isFinite(annualizedROI) ? annualizedROI : 0,
      });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-indigo-600">
      <CardHeader>
        <CardTitle>ROI Calculator</CardTitle>
        <CardDescription>Calculate Return on Investment and annualized ROI for your investments.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Investment Amount ($)</Label>
            <Input
              data-testid="input-investment-amount"
              type="number"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
              placeholder="10000"
            />
          </div>
          <div className="space-y-2">
            <Label>Return Amount ($)</Label>
            <Input
              data-testid="input-return-amount"
              type="number"
              value={returnAmount}
              onChange={(e) => setReturnAmount(e.target.value)}
              placeholder="15000"
            />
          </div>
          <div className="space-y-2">
            <Label>Investment Period (Years)</Label>
            <Input
              data-testid="input-years"
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="3"
            />
          </div>
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full bg-indigo-600 hover:bg-indigo-700">Calculate ROI</Button>

        {result && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium">ROI</p>
              <p data-testid="text-roi" className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">
                {result.roi.toFixed(2)}%
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium">Net Profit</p>
              <p data-testid="text-net-profit" className="text-2xl font-bold text-green-700 dark:text-green-400">
                ${result.netProfit.toFixed(2)}
              </p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium">Annualized ROI</p>
              <p data-testid="text-annualized-roi" className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                {result.annualizedROI.toFixed(2)}%
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}