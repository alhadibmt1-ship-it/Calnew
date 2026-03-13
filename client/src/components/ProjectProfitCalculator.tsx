import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProjectProfitCalculator() {
  const [revenue, setRevenue] = useState("");
  const [materialCost, setMaterialCost] = useState("");
  const [laborCost, setLaborCost] = useState("");
  const [overheadCost, setOverheadCost] = useState("");
  const [result, setResult] = useState<{ totalCost: number; grossProfit: number; netProfit: number; profitMargin: number } | null>(null);

  const calculate = () => {
    const r = parseFloat(revenue);
    const mc = parseFloat(materialCost) || 0;
    const lc = parseFloat(laborCost) || 0;
    const oc = parseFloat(overheadCost) || 0;
    if (r > 0) {
      const totalCost = mc + lc + oc;
      const grossProfit = r - mc - lc;
      const netProfit = r - totalCost;
      const profitMargin = (netProfit / r) * 100;
      setResult({ totalCost, grossProfit, netProfit, profitMargin });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-green-700" data-testid="project-profit-calculator">
      <CardHeader>
        <CardTitle>Project Profit Calculator</CardTitle>
        <CardDescription>Calculate project profit and margin from revenue and costs.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2"><Label>Project Revenue ($)</Label><Input type="number" placeholder="150000" value={revenue} onChange={(e) => setRevenue(e.target.value)} data-testid="input-revenue" /></div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2"><Label>Material Costs ($)</Label><Input type="number" placeholder="50000" value={materialCost} onChange={(e) => setMaterialCost(e.target.value)} data-testid="input-material" /></div>
          <div className="space-y-2"><Label>Labor Costs ($)</Label><Input type="number" placeholder="30000" value={laborCost} onChange={(e) => setLaborCost(e.target.value)} data-testid="input-labor" /></div>
          <div className="space-y-2"><Label>Overhead Costs ($)</Label><Input type="number" placeholder="15000" value={overheadCost} onChange={(e) => setOverheadCost(e.target.value)} data-testid="input-overhead" /></div>
        </div>
        <Button onClick={calculate} className="w-full bg-green-700 hover:bg-green-800" data-testid="button-calculate">Calculate Profit</Button>
        {result && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 animate-in fade-in" data-testid="result-section">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Total Cost</p>
              <p className="text-xl font-bold text-red-600" data-testid="text-total-cost">${result.totalCost.toLocaleString()}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Gross Profit</p>
              <p className="text-xl font-bold text-blue-600" data-testid="text-gross-profit">${result.grossProfit.toLocaleString()}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Net Profit</p>
              <p className={`text-xl font-bold ${result.netProfit >= 0 ? "text-green-600" : "text-red-600"}`} data-testid="text-net-profit">${result.netProfit.toLocaleString()}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Profit Margin</p>
              <p className={`text-xl font-bold ${result.profitMargin >= 0 ? "text-green-600" : "text-red-600"}`} data-testid="text-margin">{result.profitMargin.toFixed(1)}%</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
