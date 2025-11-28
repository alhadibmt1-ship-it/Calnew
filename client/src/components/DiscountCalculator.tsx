import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DiscountCalculator() {
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [result, setResult] = useState<{
    saved: number;
    final: number;
  } | null>(null);

  const calculate = () => {
    const p = parseFloat(price);
    const d = parseFloat(discount);

    if (p > 0 && d >= 0) {
      const saved = (p * d) / 100;
      const final = p - saved;
      setResult({ saved, final });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-blue-600">
      <CardHeader>
        <CardTitle>Discount Calculator</CardTitle>
        <CardDescription>Calculate sale price and savings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Original Price</Label>
            <Input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="100" />
          </div>
          <div className="space-y-2">
            <Label>Discount (%)</Label>
            <Input type="number" value={discount} onChange={e => setDiscount(e.target.value)} placeholder="20" />
          </div>
        </div>
        <Button onClick={calculate} className="w-full">Calculate Savings</Button>

        {result && (
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 text-center">
              <p className="text-sm text-muted-foreground">You Save</p>
              <p className="text-2xl font-bold text-green-600">${result.saved.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 text-center">
              <p className="text-sm text-muted-foreground">Final Price</p>
              <p className="text-2xl font-bold text-blue-600">${result.final.toFixed(2)}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}