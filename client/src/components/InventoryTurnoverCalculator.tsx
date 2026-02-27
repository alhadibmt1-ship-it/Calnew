import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function InventoryTurnoverCalculator() {
  const [cogs, setCogs] = useState("");
  const [beginningInventory, setBeginningInventory] = useState("");
  const [endingInventory, setEndingInventory] = useState("");
  const [result, setResult] = useState<{
    averageInventory: number;
    turnoverRatio: number;
    daysToSell: number;
  } | null>(null);

  const calculate = () => {
    const c = parseFloat(cogs);
    const bi = parseFloat(beginningInventory);
    const ei = parseFloat(endingInventory);

    if (!isNaN(c) && !isNaN(bi) && !isNaN(ei) && c >= 0 && bi >= 0 && ei >= 0) {
      const averageInventory = (bi + ei) / 2;
      const turnoverRatio = averageInventory > 0 ? c / averageInventory : 0;
      const daysToSell = turnoverRatio > 0 ? 365 / turnoverRatio : 0;

      setResult({ averageInventory, turnoverRatio, daysToSell });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-indigo-600">
      <CardHeader>
        <CardTitle>Inventory Turnover Calculator</CardTitle>
        <CardDescription>Calculate inventory turnover ratio, average inventory, and days to sell inventory.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Cost of Goods Sold ($)</Label>
            <Input
              data-testid="input-cogs"
              type="number"
              value={cogs}
              onChange={(e) => setCogs(e.target.value)}
              placeholder="500000"
            />
          </div>
          <div className="space-y-2">
            <Label>Beginning Inventory ($)</Label>
            <Input
              data-testid="input-beginning-inventory"
              type="number"
              value={beginningInventory}
              onChange={(e) => setBeginningInventory(e.target.value)}
              placeholder="80000"
            />
          </div>
          <div className="space-y-2">
            <Label>Ending Inventory ($)</Label>
            <Input
              data-testid="input-ending-inventory"
              type="number"
              value={endingInventory}
              onChange={(e) => setEndingInventory(e.target.value)}
              placeholder="100000"
            />
          </div>
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full bg-indigo-600 hover:bg-indigo-700">
          Calculate Turnover
        </Button>

        {result && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium">Turnover Ratio</p>
              <p data-testid="text-turnover-ratio" className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">
                {result.turnoverRatio.toFixed(2)}x
              </p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium">Average Inventory</p>
              <p data-testid="text-average-inventory" className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                ${result.averageInventory.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium">Days to Sell</p>
              <p data-testid="text-days-to-sell" className="text-2xl font-bold text-green-700 dark:text-green-400">
                {result.daysToSell.toFixed(1)} days
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
