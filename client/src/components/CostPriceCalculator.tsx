import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CostPriceCalculator() {
  const [costPrice, setCostPrice] = useState("");
  const [percentage, setPercentage] = useState("");
  const [mode, setMode] = useState<"margin" | "markup">("margin");

  const cp = parseFloat(costPrice) || 0;
  const pct = parseFloat(percentage) || 0;

  let sellingPrice = 0, profit = 0, effectiveMargin = 0, effectiveMarkup = 0;
  if (cp > 0 && pct > 0) {
    if (mode === "margin") {
      sellingPrice = cp / (1 - pct / 100);
      profit = sellingPrice - cp;
      effectiveMargin = pct;
      effectiveMarkup = (profit / cp) * 100;
    } else {
      profit = cp * (pct / 100);
      sellingPrice = cp + profit;
      effectiveMarkup = pct;
      effectiveMargin = (profit / sellingPrice) * 100;
    }
  }

  const hasResult = cp > 0 && pct > 0;

  return (
    <Card className="w-full border-t-4 border-t-lime-600" data-testid="cost-price-calculator">
      <CardHeader>
        <CardTitle>Cost Price Calculator</CardTitle>
        <CardDescription>Calculate selling price from cost price using profit margin or markup.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Cost Price ($)</Label>
          <Input type="number" placeholder="50" value={costPrice} onChange={(e) => setCostPrice(e.target.value)} data-testid="input-cost-price" />
        </div>
        <Tabs value={mode} onValueChange={(v) => setMode(v as "margin" | "markup")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="margin">Profit Margin</TabsTrigger>
            <TabsTrigger value="markup">Markup</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="space-y-2">
          <Label>{mode === "margin" ? "Desired Profit Margin (%)" : "Desired Markup (%)"}</Label>
          <Input type="number" placeholder="30" value={percentage} onChange={(e) => setPercentage(e.target.value)} data-testid="input-percentage" />
        </div>
        {hasResult && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t animate-in fade-in" data-testid="result-section">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Selling Price</p>
              <p className="text-xl font-bold text-lime-600" data-testid="text-selling-price">${sellingPrice.toFixed(2)}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Profit</p>
              <p className="text-xl font-bold text-green-600" data-testid="text-profit">${profit.toFixed(2)}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Margin</p>
              <p className="text-xl font-bold text-blue-600" data-testid="text-margin">{effectiveMargin.toFixed(1)}%</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Markup</p>
              <p className="text-xl font-bold text-purple-600" data-testid="text-markup">{effectiveMarkup.toFixed(1)}%</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
