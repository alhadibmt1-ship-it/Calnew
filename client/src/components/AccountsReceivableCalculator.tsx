import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AccountsReceivableCalculator() {
  const [creditSales, setCreditSales] = useState("");
  const [beginAR, setBeginAR] = useState("");
  const [endAR, setEndAR] = useState("");
  const [result, setResult] = useState<{ turnover: number; avgAR: number; collectionPeriod: number } | null>(null);

  const calculate = () => {
    const cs = parseFloat(creditSales);
    const bar = parseFloat(beginAR);
    const ear = parseFloat(endAR);
    if (cs > 0 && bar >= 0 && ear >= 0) {
      const avg = (bar + ear) / 2;
      const turnover = avg > 0 ? cs / avg : 0;
      const period = turnover > 0 ? 365 / turnover : 0;
      setResult({ turnover, avgAR: avg, collectionPeriod: period });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-slate-600" data-testid="accounts-receivable-calculator">
      <CardHeader>
        <CardTitle>Accounts Receivable Calculator</CardTitle>
        <CardDescription>Calculate AR turnover ratio and average collection period in days.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2"><Label>Total Credit Sales ($)</Label><Input type="number" placeholder="1000000" value={creditSales} onChange={(e) => setCreditSales(e.target.value)} data-testid="input-credit-sales" /></div>
          <div className="space-y-2"><Label>Beginning AR ($)</Label><Input type="number" placeholder="120000" value={beginAR} onChange={(e) => setBeginAR(e.target.value)} data-testid="input-begin-ar" /></div>
          <div className="space-y-2"><Label>Ending AR ($)</Label><Input type="number" placeholder="100000" value={endAR} onChange={(e) => setEndAR(e.target.value)} data-testid="input-end-ar" /></div>
        </div>
        <Button onClick={calculate} className="w-full bg-slate-600 hover:bg-slate-700" data-testid="button-calculate">Calculate</Button>
        {result && (
          <div className="grid grid-cols-3 gap-4 mt-4 animate-in fade-in" data-testid="result-section">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">AR Turnover</p>
              <p className="text-2xl font-bold text-slate-600" data-testid="text-turnover">{result.turnover.toFixed(2)}x</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Average AR</p>
              <p className="text-2xl font-bold text-blue-600" data-testid="text-avg-ar">${result.avgAR.toLocaleString()}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Collection Period</p>
              <p className="text-2xl font-bold text-orange-600" data-testid="text-period">{Math.round(result.collectionPeriod)} days</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
