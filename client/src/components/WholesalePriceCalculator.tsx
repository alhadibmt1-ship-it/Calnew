import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function WholesalePriceCalculator() {
  const [retailPrice, setRetailPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [result, setResult] = useState<{ wholesalePrice: number; savings: number; bulkTable: { qty: number; price: number; total: number }[] } | null>(null);

  const calculate = () => {
    const rp = parseFloat(retailPrice);
    const d = parseFloat(discount);
    if (rp > 0 && d > 0 && d < 100) {
      const wp = rp * (1 - d / 100);
      const savings = rp - wp;
      const bulkTable = [10, 25, 50, 100, 250, 500, 1000].map(qty => ({
        qty,
        price: wp * (qty >= 500 ? 0.95 : qty >= 100 ? 0.97 : 1),
        total: wp * qty * (qty >= 500 ? 0.95 : qty >= 100 ? 0.97 : 1),
      }));
      setResult({ wholesalePrice: wp, savings, bulkTable });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-fuchsia-600" data-testid="wholesale-price-calculator">
      <CardHeader>
        <CardTitle>Wholesale Price Calculator</CardTitle>
        <CardDescription>Calculate wholesale price from retail price with discount and bulk pricing.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Retail Price ($)</Label><Input type="number" placeholder="49.99" value={retailPrice} onChange={(e) => setRetailPrice(e.target.value)} data-testid="input-retail-price" /></div>
          <div className="space-y-2"><Label>Wholesale Discount (%)</Label><Input type="number" placeholder="40" value={discount} onChange={(e) => setDiscount(e.target.value)} data-testid="input-discount" /></div>
        </div>
        <Button onClick={calculate} className="w-full bg-fuchsia-600 hover:bg-fuchsia-700" data-testid="button-calculate">Calculate</Button>
        {result && (
          <div className="space-y-4 mt-4 animate-in fade-in" data-testid="result-section">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Wholesale Price</p>
                <p className="text-2xl font-bold text-fuchsia-600" data-testid="text-wholesale">${result.wholesalePrice.toFixed(2)}</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Savings Per Unit</p>
                <p className="text-2xl font-bold text-green-600" data-testid="text-savings">${result.savings.toFixed(2)}</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b"><th className="text-left py-2 px-3">Quantity</th><th className="text-right py-2 px-3">Unit Price</th><th className="text-right py-2 px-3">Total</th></tr></thead>
                <tbody>
                  {result.bulkTable.map(row => (
                    <tr key={row.qty} className="border-b last:border-0">
                      <td className="py-2 px-3">{row.qty.toLocaleString()}</td>
                      <td className="py-2 px-3 text-right">${row.price.toFixed(2)}</td>
                      <td className="py-2 px-3 text-right font-medium">${row.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
