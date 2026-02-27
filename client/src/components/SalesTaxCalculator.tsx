import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SalesTaxCalculator() {
  const [price, setPrice] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [result, setResult] = useState<{
    taxAmount: number;
    totalPrice: number;
    preTaxPrice: number;
  } | null>(null);
  const [mode, setMode] = useState<"add" | "extract">("add");

  const calculate = () => {
    const p = parseFloat(price);
    const r = parseFloat(taxRate) / 100;

    if (p > 0 && r >= 0) {
      if (mode === "add") {
        const taxAmount = p * r;
        setResult({
          taxAmount,
          totalPrice: p + taxAmount,
          preTaxPrice: p,
        });
      } else {
        const preTaxPrice = p / (1 + r);
        const taxAmount = p - preTaxPrice;
        setResult({
          taxAmount,
          totalPrice: p,
          preTaxPrice,
        });
      }
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-blue-600">
      <CardHeader>
        <CardTitle>Sales Tax Calculator</CardTitle>
        <CardDescription>
          Calculate sales tax on purchases or extract tax from a total price.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2">
          <Button
            data-testid="button-mode-add"
            variant={mode === "add" ? "default" : "outline"}
            onClick={() => { setMode("add"); setResult(null); }}
            className="flex-1"
          >
            Add Tax to Price
          </Button>
          <Button
            data-testid="button-mode-extract"
            variant={mode === "extract" ? "default" : "outline"}
            onClick={() => { setMode("extract"); setResult(null); }}
            className="flex-1"
          >
            Extract Tax from Total
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{mode === "add" ? "Price Before Tax ($)" : "Total Price ($)"}</Label>
            <Input
              data-testid="input-price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="100.00"
            />
          </div>
          <div className="space-y-2">
            <Label>Tax Rate (%)</Label>
            <Input
              data-testid="input-tax-rate"
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              placeholder="8.25"
            />
          </div>
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full bg-blue-600 hover:bg-blue-700">
          Calculate Sales Tax
        </Button>

        {result && (
          <div className="grid grid-cols-3 gap-4 bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
            <div className="space-y-1 text-center">
              <p className="text-xs text-muted-foreground uppercase">Pre-Tax Price</p>
              <p data-testid="text-pre-tax" className="text-xl font-bold text-foreground">
                ${result.preTaxPrice.toFixed(2)}
              </p>
            </div>
            <div className="space-y-1 text-center">
              <p className="text-xs text-muted-foreground uppercase">Tax Amount</p>
              <p data-testid="text-tax-amount" className="text-xl font-bold text-orange-600">
                ${result.taxAmount.toFixed(2)}
              </p>
            </div>
            <div className="space-y-1 text-center">
              <p className="text-xs text-muted-foreground uppercase">Total Price</p>
              <p data-testid="text-total-price" className="text-2xl font-bold text-blue-600">
                ${result.totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}