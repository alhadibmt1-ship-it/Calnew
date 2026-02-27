import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PricePerUnitCalculator() {
  const [totalPrice, setTotalPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [weightPerUnit, setWeightPerUnit] = useState("");
  const [result, setResult] = useState<{
    pricePerUnit: number;
    pricePerKg: number | null;
  } | null>(null);

  const calculate = () => {
    const tp = parseFloat(totalPrice);
    const q = parseFloat(quantity);
    const w = parseFloat(weightPerUnit);

    if (!isNaN(tp) && !isNaN(q) && tp >= 0 && q > 0) {
      const pricePerUnit = tp / q;
      let pricePerKg: number | null = null;

      if (!isNaN(w) && w > 0) {
        const totalWeight = q * w;
        pricePerKg = tp / (totalWeight / 1000);
      }

      setResult({ pricePerUnit, pricePerKg });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-teal-600">
      <CardHeader>
        <CardTitle>Price Per Unit Calculator</CardTitle>
        <CardDescription>Calculate the price per unit, per kilogram, or per piece from total price and quantity.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Total Price ($)</Label>
            <Input
              data-testid="input-total-price"
              type="number"
              value={totalPrice}
              onChange={(e) => setTotalPrice(e.target.value)}
              placeholder="49.99"
            />
          </div>
          <div className="space-y-2">
            <Label>Quantity (units)</Label>
            <Input
              data-testid="input-quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="12"
            />
          </div>
          <div className="space-y-2">
            <Label>Weight per Unit (g, optional)</Label>
            <Input
              data-testid="input-weight"
              type="number"
              value={weightPerUnit}
              onChange={(e) => setWeightPerUnit(e.target.value)}
              placeholder="250"
            />
          </div>
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full bg-teal-600 hover:bg-teal-700">
          Calculate Price Per Unit
        </Button>

        {result && (
          <div className={`grid grid-cols-1 ${result.pricePerKg !== null ? "sm:grid-cols-2" : ""} gap-4 pt-4`}>
            <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium">Price Per Unit</p>
              <p data-testid="text-price-per-unit" className="text-2xl font-bold text-teal-700 dark:text-teal-400">
                ${result.pricePerUnit.toFixed(4)}
              </p>
            </div>
            {result.pricePerKg !== null && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 text-center">
                <p className="text-xs text-muted-foreground uppercase font-medium">Price Per Kg</p>
                <p data-testid="text-price-per-kg" className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                  ${result.pricePerKg.toFixed(2)}
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
