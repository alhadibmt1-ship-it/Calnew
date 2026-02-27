import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MaterialItem {
  id: number;
  name: string;
  quantity: string;
  unitPrice: string;
}

export default function MaterialCostEstimator() {
  const [items, setItems] = useState<MaterialItem[]>([
    { id: 1, name: "", quantity: "", unitPrice: "" },
  ]);
  const [markup, setMarkup] = useState("0");
  const [result, setResult] = useState<{
    itemCosts: number[];
    totalMaterialCost: number;
    markupAmount: number;
    grandTotal: number;
  } | null>(null);

  let nextId = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;

  const addItem = () => {
    setItems([...items, { id: nextId, name: "", quantity: "", unitPrice: "" }]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) setItems(items.filter((i) => i.id !== id));
  };

  const updateItem = (id: number, field: keyof MaterialItem, value: string) => {
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  const calculate = () => {
    const mPct = parseFloat(markup) || 0;
    const itemCosts = items.map((i) => {
      const qty = parseFloat(i.quantity) || 0;
      const price = parseFloat(i.unitPrice) || 0;
      return qty * price;
    });
    const totalMaterialCost = itemCosts.reduce((a, b) => a + b, 0);
    const markupAmount = totalMaterialCost * (mPct / 100);
    const grandTotal = totalMaterialCost + markupAmount;

    setResult({ itemCosts, totalMaterialCost, markupAmount, grandTotal });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle data-testid="text-title">Material Cost Estimator</CardTitle>
        <CardDescription>Add materials with quantity and unit price to estimate total material costs, with optional markup.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={item.id} className="grid grid-cols-12 gap-2 items-end border p-3 rounded-lg">
              <div className="col-span-12 sm:col-span-4 space-y-1">
                <Label className="text-xs">Material Name</Label>
                <Input data-testid={`input-name-${index}`} value={item.name} onChange={(e) => updateItem(item.id, "name", e.target.value)} placeholder="Cement bags" />
              </div>
              <div className="col-span-4 sm:col-span-2 space-y-1">
                <Label className="text-xs">Quantity</Label>
                <Input data-testid={`input-quantity-${index}`} type="number" value={item.quantity} onChange={(e) => updateItem(item.id, "quantity", e.target.value)} placeholder="50" />
              </div>
              <div className="col-span-4 sm:col-span-3 space-y-1">
                <Label className="text-xs">Unit Price ($)</Label>
                <Input data-testid={`input-unit-price-${index}`} type="number" value={item.unitPrice} onChange={(e) => updateItem(item.id, "unitPrice", e.target.value)} placeholder="12.50" />
              </div>
              <div className="col-span-3 sm:col-span-2 text-right">
                <p className="text-xs text-muted-foreground">Cost</p>
                <p className="font-medium">${((parseFloat(item.quantity) || 0) * (parseFloat(item.unitPrice) || 0)).toFixed(2)}</p>
              </div>
              <div className="col-span-1 flex justify-end">
                <Button data-testid={`button-remove-${index}`} variant="ghost" size="sm" onClick={() => removeItem(item.id)} disabled={items.length === 1}>✕</Button>
              </div>
            </div>
          ))}
        </div>

        <Button data-testid="button-add-item" variant="outline" onClick={addItem} className="w-full">+ Add Material</Button>

        <div className="space-y-2">
          <Label>Markup (%)</Label>
          <Input data-testid="input-markup" type="number" value={markup} onChange={(e) => setMarkup(e.target.value)} placeholder="0" min="0" />
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full">Calculate Total</Button>

        {result && (
          <div className="space-y-4 pt-4 animate-in fade-in-50">
            <div className="space-y-2 border-t pt-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Material Cost</span>
                <span data-testid="text-material-cost" className="font-medium">${result.totalMaterialCost.toFixed(2)}</span>
              </div>
              {result.markupAmount > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Markup ({markup}%)</span>
                  <span data-testid="text-markup-amount" className="font-medium">${result.markupAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Grand Total</span>
                <span data-testid="text-grand-total" className="text-primary">${result.grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}