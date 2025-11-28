import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProfitMarginCalculator() {
  const [cost, setCost] = useState("");
  const [revenue, setRevenue] = useState("");
  const [result, setResult] = useState<{
    profit: number;
    margin: number;
    markup: number;
  } | null>(null);

  const calculate = () => {
    const c = parseFloat(cost);
    const r = parseFloat(revenue);

    if (c >= 0 && r >= 0) {
      const profit = r - c;
      const margin = (profit / r) * 100;
      const markup = (profit / c) * 100;

      setResult({
        profit,
        margin: isFinite(margin) ? margin : 0,
        markup: isFinite(markup) ? markup : 0
      });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-green-600">
      <CardHeader>
        <CardTitle>Profit Margin Calculator</CardTitle>
        <CardDescription>Calculate gross profit, margin, and markup percentages.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Cost ($)</Label>
            <Input 
              type="number" 
              value={cost} 
              onChange={(e) => setCost(e.target.value)} 
              placeholder="100" 
            />
          </div>
          <div className="space-y-2">
            <Label>Revenue / Sale Price ($)</Label>
            <Input 
              type="number" 
              value={revenue} 
              onChange={(e) => setRevenue(e.target.value)} 
              placeholder="150" 
            />
          </div>
        </div>

        <Button onClick={calculate} className="w-full bg-green-600 hover:bg-green-700">Calculate Profit</Button>

        {result && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium">Gross Profit</p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                ${result.profit.toFixed(2)}
              </p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium">Profit Margin</p>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                {result.margin.toFixed(2)}%
              </p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium">Markup</p>
              <p className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                {result.markup.toFixed(2)}%
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}