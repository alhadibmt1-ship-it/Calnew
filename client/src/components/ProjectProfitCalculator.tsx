import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProjectProfitCalculator() {
  const [revenue, setRevenue] = useState("");
  const [materialCosts, setMaterialCosts] = useState("");
  const [laborCosts, setLaborCosts] = useState("");
  const [overheadCosts, setOverheadCosts] = useState("");
  const [result, setResult] = useState<{
    totalCosts: number;
    grossProfit: number;
    netProfit: number;
    profitMargin: number;
    grossMargin: number;
  } | null>(null);

  const calculate = () => {
    const rev = parseFloat(revenue) || 0;
    const mat = parseFloat(materialCosts) || 0;
    const lab = parseFloat(laborCosts) || 0;
    const oh = parseFloat(overheadCosts) || 0;

    if (rev > 0) {
      const directCosts = mat + lab;
      const totalCosts = directCosts + oh;
      const grossProfit = rev - directCosts;
      const netProfit = rev - totalCosts;
      const grossMargin = (grossProfit / rev) * 100;
      const profitMargin = (netProfit / rev) * 100;

      setResult({ totalCosts, grossProfit, netProfit, profitMargin, grossMargin });
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle data-testid="text-title">Project Profit Calculator</CardTitle>
        <CardDescription>Analyze project profitability by comparing revenue against material, labor, and overhead costs.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Project Revenue ($)</Label>
          <Input data-testid="input-revenue" type="number" value={revenue} onChange={(e) => setRevenue(e.target.value)} placeholder="150000" />
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Material Costs ($)</Label>
            <Input data-testid="input-material-costs" type="number" value={materialCosts} onChange={(e) => setMaterialCosts(e.target.value)} placeholder="50000" />
          </div>
          <div className="space-y-2">
            <Label>Labor Costs ($)</Label>
            <Input data-testid="input-labor-costs" type="number" value={laborCosts} onChange={(e) => setLaborCosts(e.target.value)} placeholder="40000" />
          </div>
          <div className="space-y-2">
            <Label>Overhead Costs ($)</Label>
            <Input data-testid="input-overhead-costs" type="number" value={overheadCosts} onChange={(e) => setOverheadCosts(e.target.value)} placeholder="15000" />
          </div>
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full">Calculate Profit</Button>

        {result && (
          <div className="space-y-4 pt-4 animate-in fade-in-50">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 text-center">
                <p className="text-xs text-muted-foreground uppercase">Gross Profit</p>
                <p data-testid="text-gross-profit" className="text-xl font-bold text-blue-700 dark:text-blue-400">${result.grossProfit.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                <p className="text-xs text-muted-foreground">{result.grossMargin.toFixed(1)}% margin</p>
              </div>
              <div className={`p-4 rounded-lg border text-center ${result.netProfit >= 0 ? "bg-green-50 dark:bg-green-900/20 border-green-200" : "bg-red-50 dark:bg-red-900/20 border-red-200"}`}>
                <p className="text-xs text-muted-foreground uppercase">Net Profit</p>
                <p data-testid="text-net-profit" className={`text-xl font-bold ${result.netProfit >= 0 ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}>${result.netProfit.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                <p className="text-xs text-muted-foreground">{result.profitMargin.toFixed(1)}% margin</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center col-span-2 sm:col-span-1">
                <p className="text-xs text-muted-foreground uppercase">Total Costs</p>
                <p data-testid="text-total-costs" className="text-xl font-bold">${result.totalCosts.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}