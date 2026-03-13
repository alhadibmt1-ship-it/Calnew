import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProjectCostCalculator() {
  const [materialCost, setMaterialCost] = useState("");
  const [laborCost, setLaborCost] = useState("");
  const [equipmentCost, setEquipmentCost] = useState("");
  const [overheadPct, setOverheadPct] = useState("10");
  const [profitPct, setProfitPct] = useState("15");
  const [result, setResult] = useState<{ directCost: number; overhead: number; subtotal: number; profit: number; totalCost: number } | null>(null);

  const calculate = () => {
    const mc = parseFloat(materialCost) || 0;
    const lc = parseFloat(laborCost) || 0;
    const ec = parseFloat(equipmentCost) || 0;
    const directCost = mc + lc + ec;
    if (directCost > 0) {
      const overhead = directCost * ((parseFloat(overheadPct) || 0) / 100);
      const subtotal = directCost + overhead;
      const profit = subtotal * ((parseFloat(profitPct) || 0) / 100);
      const totalCost = subtotal + profit;
      setResult({ directCost, overhead, subtotal, profit, totalCost });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-cyan-700" data-testid="project-cost-calculator">
      <CardHeader>
        <CardTitle>Project Cost Calculator</CardTitle>
        <CardDescription>Calculate total project cost with material, labor, equipment, overhead, and profit margin.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2"><Label>Material Cost ($)</Label><Input type="number" placeholder="50000" value={materialCost} onChange={(e) => setMaterialCost(e.target.value)} data-testid="input-material" /></div>
          <div className="space-y-2"><Label>Labor Cost ($)</Label><Input type="number" placeholder="30000" value={laborCost} onChange={(e) => setLaborCost(e.target.value)} data-testid="input-labor" /></div>
          <div className="space-y-2"><Label>Equipment Cost ($)</Label><Input type="number" placeholder="10000" value={equipmentCost} onChange={(e) => setEquipmentCost(e.target.value)} data-testid="input-equipment" /></div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Overhead (%)</Label><Input type="number" placeholder="10" value={overheadPct} onChange={(e) => setOverheadPct(e.target.value)} data-testid="input-overhead" /></div>
          <div className="space-y-2"><Label>Profit Margin (%)</Label><Input type="number" placeholder="15" value={profitPct} onChange={(e) => setProfitPct(e.target.value)} data-testid="input-profit" /></div>
        </div>
        <Button onClick={calculate} className="w-full bg-cyan-700 hover:bg-cyan-800" data-testid="button-calculate">Calculate</Button>
        {result && (
          <div className="space-y-2 mt-4 border-t pt-4 animate-in fade-in" data-testid="result-section">
            <div className="flex justify-between"><span className="text-muted-foreground">Direct Cost</span><span className="font-medium">${result.directCost.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Overhead ({overheadPct}%)</span><span className="font-medium">${result.overhead.toLocaleString()}</span></div>
            <div className="flex justify-between border-t pt-2"><span className="text-muted-foreground">Subtotal</span><span className="font-medium">${result.subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Profit ({profitPct}%)</span><span className="font-medium text-green-600">${result.profit.toLocaleString()}</span></div>
            <div className="flex justify-between text-lg border-t pt-2"><span className="font-bold">Total Project Cost</span><span className="font-bold text-cyan-700" data-testid="text-total">${result.totalCost.toLocaleString()}</span></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
