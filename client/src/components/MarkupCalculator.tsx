import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MarkupCalculator() {
  const [cost, setCost] = useState("");
  const [markup, setMarkup] = useState("");
  const [result, setResult] = useState<{ sellingPrice: number; profit: number; profitMargin: number } | null>(null);

  const calculate = () => {
    const c = parseFloat(cost);
    const m = parseFloat(markup);
    if (c > 0 && m >= 0) {
      const profit = c * (m / 100);
      const sellingPrice = c + profit;
      const profitMargin = (profit / sellingPrice) * 100;
      setResult({ sellingPrice, profit, profitMargin });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-emerald-600" data-testid="markup-calculator">
      <CardHeader>
        <CardTitle>Markup Calculator</CardTitle>
        <CardDescription>Calculate selling price and profit from cost and markup percentage.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Cost Price ($)</Label>
            <Input type="number" placeholder="100" value={cost} onChange={(e) => setCost(e.target.value)} data-testid="input-cost" />
          </div>
          <div className="space-y-2">
            <Label>Markup (%)</Label>
            <Input type="number" placeholder="50" value={markup} onChange={(e) => setMarkup(e.target.value)} data-testid="input-markup" />
          </div>
        </div>
        <Button onClick={calculate} className="w-full bg-emerald-600 hover:bg-emerald-700" data-testid="button-calculate">Calculate</Button>
        {result && (
          <div className="grid grid-cols-3 gap-4 mt-4 animate-in fade-in" data-testid="result-section">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Selling Price</p>
              <p className="text-2xl font-bold text-emerald-600" data-testid="text-selling-price">${result.sellingPrice.toFixed(2)}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Profit</p>
              <p className="text-2xl font-bold text-blue-600" data-testid="text-profit">${result.profit.toFixed(2)}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Profit Margin</p>
              <p className="text-2xl font-bold text-purple-600" data-testid="text-margin">{result.profitMargin.toFixed(1)}%</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
