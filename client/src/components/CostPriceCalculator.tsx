import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CostPriceCalculator() {
  const [costPrice, setCostPrice] = useState("");
  const [percentage, setPercentage] = useState("");
  const [mode, setMode] = useState<"margin" | "markup">("margin");
  const [result, setResult] = useState<{
    sellingPrice: number;
    profitAmount: number;
    effectiveMargin: number;
    effectiveMarkup: number;
  } | null>(null);

  const calculate = () => {
    const cost = parseFloat(costPrice);
    const pct = parseFloat(percentage);

    if (cost > 0 && pct >= 0) {
      let sellingPrice: number;
      if (mode === "margin") {
        sellingPrice = cost / (1 - pct / 100);
      } else {
        sellingPrice = cost * (1 + pct / 100);
      }

      const profitAmount = sellingPrice - cost;
      const effectiveMargin = (profitAmount / sellingPrice) * 100;
      const effectiveMarkup = (profitAmount / cost) * 100;

      setResult({
        sellingPrice,
        profitAmount,
        effectiveMargin: isFinite(effectiveMargin) ? effectiveMargin : 0,
        effectiveMarkup: isFinite(effectiveMarkup) ? effectiveMarkup : 0,
      });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-cyan-600">
      <CardHeader>
        <CardTitle>Cost Price Calculator</CardTitle>
        <CardDescription>Calculate selling price from cost price using profit margin or markup percentage.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2 mb-2">
          <Button
            data-testid="button-mode-margin"
            variant={mode === "margin" ? "default" : "outline"}
            size="sm"
            onClick={() => setMode("margin")}
          >
            Profit Margin
          </Button>
          <Button
            data-testid="button-mode-markup"
            variant={mode === "markup" ? "default" : "outline"}
            size="sm"
            onClick={() => setMode("markup")}
          >
            Markup
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Cost Price ($)</Label>
            <Input data-testid="input-cost-price" type="number" value={costPrice} onChange={(e) => setCostPrice(e.target.value)} placeholder="100" />
          </div>
          <div className="space-y-2">
            <Label>{mode === "margin" ? "Desired Profit Margin (%)" : "Desired Markup (%)"}</Label>
            <Input data-testid="input-percentage" type="number" value={percentage} onChange={(e) => setPercentage(e.target.value)} placeholder="30" />
          </div>
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full bg-cyan-600 hover:bg-cyan-700">Calculate</Button>

        {result && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg border border-cyan-200 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium">Selling Price</p>
              <p data-testid="text-selling-price" className="text-xl font-bold text-cyan-700 dark:text-cyan-400">
                ${result.sellingPrice.toFixed(2)}
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium">Profit Amount</p>
              <p data-testid="text-profit-amount" className="text-xl font-bold text-green-700 dark:text-green-400">
                ${result.profitAmount.toFixed(2)}
              </p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium">Profit Margin</p>
              <p data-testid="text-effective-margin" className="text-xl font-bold text-blue-700 dark:text-blue-400">
                {result.effectiveMargin.toFixed(2)}%
              </p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium">Markup</p>
              <p data-testid="text-effective-markup" className="text-xl font-bold text-purple-700 dark:text-purple-400">
                {result.effectiveMarkup.toFixed(2)}%
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}