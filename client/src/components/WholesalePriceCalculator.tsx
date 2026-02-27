import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function WholesalePriceCalculator() {
  const [retailPrice, setRetailPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [result, setResult] = useState<{
    wholesalePrice: number;
    savingsPerUnit: number;
    bulkPricing: { qty: number; totalRetail: number; totalWholesale: number; totalSavings: number }[];
  } | null>(null);

  const calculate = () => {
    const rp = parseFloat(retailPrice);
    const dp = parseFloat(discountPercent);

    if (!isNaN(rp) && !isNaN(dp) && rp >= 0 && dp >= 0 && dp <= 100) {
      const wholesalePrice = rp * (1 - dp / 100);
      const savingsPerUnit = rp - wholesalePrice;

      const bulkQuantities = [10, 25, 50, 100, 250, 500];
      const bulkPricing = bulkQuantities.map((qty) => ({
        qty,
        totalRetail: rp * qty,
        totalWholesale: wholesalePrice * qty,
        totalSavings: savingsPerUnit * qty,
      }));

      setResult({ wholesalePrice, savingsPerUnit, bulkPricing });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-amber-600">
      <CardHeader>
        <CardTitle>Wholesale Price Calculator</CardTitle>
        <CardDescription>Calculate wholesale pricing, savings per unit, and bulk pricing table from retail price and discount.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Retail Price ($)</Label>
            <Input
              data-testid="input-retail-price"
              type="number"
              value={retailPrice}
              onChange={(e) => setRetailPrice(e.target.value)}
              placeholder="29.99"
            />
          </div>
          <div className="space-y-2">
            <Label>Wholesale Discount (%)</Label>
            <Input
              data-testid="input-discount"
              type="number"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(e.target.value)}
              placeholder="40"
            />
          </div>
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full bg-amber-600 hover:bg-amber-700">
          Calculate Wholesale Price
        </Button>

        {result && (
          <div className="space-y-6 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 text-center">
                <p className="text-xs text-muted-foreground uppercase font-medium">Wholesale Price</p>
                <p data-testid="text-wholesale-price" className="text-2xl font-bold text-amber-700 dark:text-amber-400">
                  ${result.wholesalePrice.toFixed(2)}
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 text-center">
                <p className="text-xs text-muted-foreground uppercase font-medium">Savings Per Unit</p>
                <p data-testid="text-savings" className="text-2xl font-bold text-green-700 dark:text-green-400">
                  ${result.savingsPerUnit.toFixed(2)}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3">Bulk Pricing Table</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">Quantity</th>
                      <th className="text-right py-2 px-3 font-medium text-muted-foreground">Retail Total</th>
                      <th className="text-right py-2 px-3 font-medium text-muted-foreground">Wholesale Total</th>
                      <th className="text-right py-2 px-3 font-medium text-muted-foreground">Total Savings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.bulkPricing.map((row) => (
                      <tr key={row.qty} data-testid={`row-bulk-${row.qty}`} className="border-b last:border-0">
                        <td className="py-2 px-3 font-medium">{row.qty} units</td>
                        <td className="py-2 px-3 text-right">${row.totalRetail.toFixed(2)}</td>
                        <td className="py-2 px-3 text-right text-amber-700 dark:text-amber-400 font-medium">${row.totalWholesale.toFixed(2)}</td>
                        <td className="py-2 px-3 text-right text-green-700 dark:text-green-400 font-medium">${row.totalSavings.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
