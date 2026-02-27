import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MarkupCalculator() {
  const [costPrice, setCostPrice] = useState("");
  const [markupPercent, setMarkupPercent] = useState("");
  const [result, setResult] = useState<{
    sellingPrice: number;
    profit: number;
    profitMargin: number;
  } | null>(null);

  const calculate = () => {
    const cost = parseFloat(costPrice);
    const markup = parseFloat(markupPercent);

    if (cost > 0 && markup >= 0) {
      const profit = (cost * markup) / 100;
      const sellingPrice = cost + profit;
      const profitMargin = (profit / sellingPrice) * 100;

      setResult({
        sellingPrice,
        profit,
        profitMargin: isFinite(profitMargin) ? profitMargin : 0,
      });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-green-600">
      <CardHeader>
        <CardTitle>Markup Calculator</CardTitle>
        <CardDescription>Calculate selling price and profit based on cost price and markup percentage.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Cost Price ($)</Label>
            <Input
              data-testid="input-cost-price"
              type="number"
              value={costPrice}
              onChange={(e) => setCostPrice(e.target.value)}
              placeholder="100"
            />
          </div>
          <div className="space-y-2">
            <Label>Markup (%)</Label>
            <Input
              data-testid="input-markup-percent"
              type="number"
              value={markupPercent}
              onChange={(e) => setMarkupPercent(e.target.value)}
              placeholder="50"
            />
          </div>
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full bg-green-600 hover:bg-green-700">Calculate</Button>

        {result && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium">Selling Price</p>
              <p data-testid="text-selling-price" className="text-2xl font-bold text-green-700 dark:text-green-400">
                ${result.sellingPrice.toFixed(2)}
              </p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium">Profit</p>
              <p data-testid="text-profit" className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                ${result.profit.toFixed(2)}
              </p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium">Profit Margin</p>
              <p data-testid="text-profit-margin" className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                {result.profitMargin.toFixed(2)}%
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}