import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ROICalculator() {
  const [investment, setInvestment] = useState("");
  const [returnAmt, setReturnAmt] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<{ roi: number; annualizedROI: number; netProfit: number } | null>(null);

  const calculate = () => {
    const inv = parseFloat(investment);
    const ret = parseFloat(returnAmt);
    const y = parseFloat(years) || 1;
    if (inv > 0 && ret >= 0) {
      const netProfit = ret - inv;
      const roi = (netProfit / inv) * 100;
      const annualizedROI = (Math.pow(ret / inv, 1 / y) - 1) * 100;
      setResult({ roi, annualizedROI, netProfit });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-violet-600" data-testid="roi-calculator">
      <CardHeader>
        <CardTitle>ROI Calculator</CardTitle>
        <CardDescription>Calculate return on investment and annualized ROI.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Investment Amount ($)</Label>
            <Input type="number" placeholder="10000" value={investment} onChange={(e) => setInvestment(e.target.value)} data-testid="input-investment" />
          </div>
          <div className="space-y-2">
            <Label>Return Amount ($)</Label>
            <Input type="number" placeholder="15000" value={returnAmt} onChange={(e) => setReturnAmt(e.target.value)} data-testid="input-return" />
          </div>
          <div className="space-y-2">
            <Label>Time Period (Years)</Label>
            <Input type="number" placeholder="3" value={years} onChange={(e) => setYears(e.target.value)} data-testid="input-years" />
          </div>
        </div>
        <Button onClick={calculate} className="w-full bg-violet-600 hover:bg-violet-700" data-testid="button-calculate">Calculate ROI</Button>
        {result && (
          <div className="grid grid-cols-3 gap-4 mt-4 animate-in fade-in" data-testid="result-section">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Total ROI</p>
              <p className={`text-2xl font-bold ${result.roi >= 0 ? "text-green-600" : "text-red-600"}`} data-testid="text-roi">{result.roi.toFixed(1)}%</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Annualized ROI</p>
              <p className={`text-2xl font-bold ${result.annualizedROI >= 0 ? "text-green-600" : "text-red-600"}`} data-testid="text-annual-roi">{result.annualizedROI.toFixed(1)}%</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Net Profit</p>
              <p className={`text-2xl font-bold ${result.netProfit >= 0 ? "text-green-600" : "text-red-600"}`} data-testid="text-net-profit">${result.netProfit.toLocaleString()}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
