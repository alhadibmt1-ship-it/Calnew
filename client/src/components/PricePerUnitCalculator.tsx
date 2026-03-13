import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PricePerUnitCalculator() {
  const [totalPrice, setTotalPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [weightPerUnit, setWeightPerUnit] = useState("");
  const [result, setResult] = useState<{ pricePerUnit: number; pricePerKg: number | null } | null>(null);

  const calculate = () => {
    const tp = parseFloat(totalPrice);
    const qty = parseFloat(quantity);
    if (tp > 0 && qty > 0) {
      const ppu = tp / qty;
      const wpu = parseFloat(weightPerUnit);
      const ppkg = wpu > 0 ? ppu / (wpu / 1000) : null;
      setResult({ pricePerUnit: ppu, pricePerKg: ppkg });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-pink-600" data-testid="price-per-unit-calculator">
      <CardHeader>
        <CardTitle>Price Per Unit Calculator</CardTitle>
        <CardDescription>Calculate price per unit and per kg/lb to compare product values.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2"><Label>Total Price ($)</Label><Input type="number" placeholder="12.99" value={totalPrice} onChange={(e) => setTotalPrice(e.target.value)} data-testid="input-total-price" /></div>
          <div className="space-y-2"><Label>Quantity (units)</Label><Input type="number" placeholder="6" value={quantity} onChange={(e) => setQuantity(e.target.value)} data-testid="input-quantity" /></div>
          <div className="space-y-2"><Label>Weight per Unit (g, optional)</Label><Input type="number" placeholder="250" value={weightPerUnit} onChange={(e) => setWeightPerUnit(e.target.value)} data-testid="input-weight" /></div>
        </div>
        <Button onClick={calculate} className="w-full bg-pink-600 hover:bg-pink-700" data-testid="button-calculate">Calculate</Button>
        {result && (
          <div className={`grid ${result.pricePerKg ? "grid-cols-2" : "grid-cols-1"} gap-4 mt-4 animate-in fade-in`} data-testid="result-section">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Price Per Unit</p>
              <p className="text-2xl font-bold text-pink-600" data-testid="text-ppu">${result.pricePerUnit.toFixed(2)}</p>
            </div>
            {result.pricePerKg && (
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Price Per Kg</p>
                <p className="text-2xl font-bold text-blue-600" data-testid="text-ppkg">${result.pricePerKg.toFixed(2)}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
