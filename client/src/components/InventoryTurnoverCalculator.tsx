import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function InventoryTurnoverCalculator() {
  const [cogs, setCogs] = useState("");
  const [beginInv, setBeginInv] = useState("");
  const [endInv, setEndInv] = useState("");
  const [result, setResult] = useState<{ turnoverRatio: number; avgInventory: number; daysToSell: number } | null>(null);

  const calculate = () => {
    const c = parseFloat(cogs);
    const bi = parseFloat(beginInv);
    const ei = parseFloat(endInv);
    if (c > 0 && bi >= 0 && ei >= 0) {
      const avg = (bi + ei) / 2;
      const ratio = avg > 0 ? c / avg : 0;
      const days = ratio > 0 ? 365 / ratio : 0;
      setResult({ turnoverRatio: ratio, avgInventory: avg, daysToSell: days });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-orange-500" data-testid="inventory-turnover-calculator">
      <CardHeader>
        <CardTitle>Inventory Turnover Calculator</CardTitle>
        <CardDescription>Calculate inventory turnover ratio, average inventory, and days to sell.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2"><Label>Cost of Goods Sold ($)</Label><Input type="number" placeholder="500000" value={cogs} onChange={(e) => setCogs(e.target.value)} data-testid="input-cogs" /></div>
          <div className="space-y-2"><Label>Beginning Inventory ($)</Label><Input type="number" placeholder="100000" value={beginInv} onChange={(e) => setBeginInv(e.target.value)} data-testid="input-begin-inv" /></div>
          <div className="space-y-2"><Label>Ending Inventory ($)</Label><Input type="number" placeholder="80000" value={endInv} onChange={(e) => setEndInv(e.target.value)} data-testid="input-end-inv" /></div>
        </div>
        <Button onClick={calculate} className="w-full bg-orange-500 hover:bg-orange-600" data-testid="button-calculate">Calculate</Button>
        {result && (
          <div className="grid grid-cols-3 gap-4 mt-4 animate-in fade-in" data-testid="result-section">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Turnover Ratio</p>
              <p className="text-2xl font-bold text-orange-500" data-testid="text-ratio">{result.turnoverRatio.toFixed(2)}x</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Avg Inventory</p>
              <p className="text-2xl font-bold text-blue-600" data-testid="text-avg-inv">${result.avgInventory.toLocaleString()}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Days to Sell</p>
              <p className="text-2xl font-bold text-purple-600" data-testid="text-days">{Math.round(result.daysToSell)} days</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
