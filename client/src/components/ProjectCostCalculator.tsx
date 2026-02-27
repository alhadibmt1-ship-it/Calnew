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
  const [profitMarginPct, setProfitMarginPct] = useState("15");
  const [result, setResult] = useState<{
    directCosts: number;
    overheadAmount: number;
    subtotal: number;
    profitAmount: number;
    totalProjectCost: number;
  } | null>(null);

  const calculate = () => {
    const mat = parseFloat(materialCost) || 0;
    const lab = parseFloat(laborCost) || 0;
    const eq = parseFloat(equipmentCost) || 0;
    const ohPct = parseFloat(overheadPct) || 0;
    const pmPct = parseFloat(profitMarginPct) || 0;

    const directCosts = mat + lab + eq;
    const overheadAmount = directCosts * (ohPct / 100);
    const subtotal = directCosts + overheadAmount;
    const profitAmount = subtotal * (pmPct / 100);
    const totalProjectCost = subtotal + profitAmount;

    setResult({ directCosts, overheadAmount, subtotal, profitAmount, totalProjectCost });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle data-testid="text-title">Project Cost Calculator</CardTitle>
        <CardDescription>Calculate total project cost including materials, labor, equipment, overhead, and profit margin.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Material Cost ($)</Label>
            <Input data-testid="input-material-cost" type="number" value={materialCost} onChange={(e) => setMaterialCost(e.target.value)} placeholder="50000" />
          </div>
          <div className="space-y-2">
            <Label>Labor Cost ($)</Label>
            <Input data-testid="input-labor-cost" type="number" value={laborCost} onChange={(e) => setLaborCost(e.target.value)} placeholder="30000" />
          </div>
          <div className="space-y-2">
            <Label>Equipment Cost ($)</Label>
            <Input data-testid="input-equipment-cost" type="number" value={equipmentCost} onChange={(e) => setEquipmentCost(e.target.value)} placeholder="10000" />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Overhead (%)</Label>
            <Input data-testid="input-overhead" type="number" value={overheadPct} onChange={(e) => setOverheadPct(e.target.value)} placeholder="10" min="0" />
          </div>
          <div className="space-y-2">
            <Label>Profit Margin (%)</Label>
            <Input data-testid="input-profit-margin" type="number" value={profitMarginPct} onChange={(e) => setProfitMarginPct(e.target.value)} placeholder="15" min="0" />
          </div>
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full">Calculate Project Cost</Button>

        {result && (
          <div className="space-y-4 pt-4 animate-in fade-in-50">
            <div className="border rounded-lg p-4 space-y-3">
              <h3 className="font-semibold">Cost Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Materials</span>
                  <span className="font-medium">${(parseFloat(materialCost) || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Labor</span>
                  <span className="font-medium">${(parseFloat(laborCost) || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Equipment</span>
                  <span className="font-medium">${(parseFloat(equipmentCost) || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-muted-foreground">Direct Costs</span>
                  <span data-testid="text-direct-costs" className="font-medium">${result.directCosts.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Overhead ({overheadPct}%)</span>
                  <span data-testid="text-overhead" className="font-medium">${result.overheadAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Profit ({profitMarginPct}%)</span>
                  <span data-testid="text-profit" className="font-medium">${result.profitAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-xs text-muted-foreground uppercase">Total Project Cost</p>
              <p data-testid="text-total-project-cost" className="text-3xl font-bold text-primary">${result.totalProjectCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}