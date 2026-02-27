import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface BOQItem {
  id: number;
  description: string;
  unit: string;
  quantity: string;
  rate: string;
}

export default function BOQCalculator() {
  const [items, setItems] = useState<BOQItem[]>([
    { id: 1, description: "", unit: "sqft", quantity: "", rate: "" },
  ]);
  const [contingency, setContingency] = useState("5");
  const [result, setResult] = useState<{
    itemAmounts: number[];
    subtotal: number;
    contingencyAmount: number;
    total: number;
  } | null>(null);

  let nextId = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;

  const addItem = () => {
    setItems([...items, { id: nextId, description: "", unit: "sqft", quantity: "", rate: "" }]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) setItems(items.filter((i) => i.id !== id));
  };

  const updateItem = (id: number, field: keyof BOQItem, value: string) => {
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  const calculate = () => {
    const cPct = parseFloat(contingency) || 0;
    const itemAmounts = items.map((i) => {
      const qty = parseFloat(i.quantity) || 0;
      const rate = parseFloat(i.rate) || 0;
      return qty * rate;
    });
    const subtotal = itemAmounts.reduce((a, b) => a + b, 0);
    const contingencyAmount = subtotal * (cPct / 100);
    const total = subtotal + contingencyAmount;

    setResult({ itemAmounts, subtotal, contingencyAmount, total });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle data-testid="text-title">BOQ Calculator</CardTitle>
        <CardDescription>Bill of Quantities — add items with description, unit, quantity, and rate to calculate total project cost.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={item.id} className="grid grid-cols-12 gap-2 items-end border p-3 rounded-lg">
              <div className="col-span-12 sm:col-span-3 space-y-1">
                <Label className="text-xs">Description</Label>
                <Input data-testid={`input-description-${index}`} value={item.description} onChange={(e) => updateItem(item.id, "description", e.target.value)} placeholder="Concrete work" />
              </div>
              <div className="col-span-4 sm:col-span-2 space-y-1">
                <Label className="text-xs">Unit</Label>
                <Input data-testid={`input-unit-${index}`} value={item.unit} onChange={(e) => updateItem(item.id, "unit", e.target.value)} placeholder="sqft" />
              </div>
              <div className="col-span-4 sm:col-span-2 space-y-1">
                <Label className="text-xs">Quantity</Label>
                <Input data-testid={`input-quantity-${index}`} type="number" value={item.quantity} onChange={(e) => updateItem(item.id, "quantity", e.target.value)} placeholder="100" />
              </div>
              <div className="col-span-4 sm:col-span-2 space-y-1">
                <Label className="text-xs">Rate ($)</Label>
                <Input data-testid={`input-rate-${index}`} type="number" value={item.rate} onChange={(e) => updateItem(item.id, "rate", e.target.value)} placeholder="25" />
              </div>
              <div className="col-span-6 sm:col-span-2 text-right">
                <p className="text-xs text-muted-foreground">Amount</p>
                <p className="font-medium">${((parseFloat(item.quantity) || 0) * (parseFloat(item.rate) || 0)).toFixed(2)}</p>
              </div>
              <div className="col-span-6 sm:col-span-1 flex justify-end">
                <Button data-testid={`button-remove-${index}`} variant="ghost" size="sm" onClick={() => removeItem(item.id)} disabled={items.length === 1}>✕</Button>
              </div>
            </div>
          ))}
        </div>

        <Button data-testid="button-add-item" variant="outline" onClick={addItem} className="w-full">+ Add Item</Button>

        <div className="space-y-2">
          <Label>Contingency (%)</Label>
          <Input data-testid="input-contingency" type="number" value={contingency} onChange={(e) => setContingency(e.target.value)} placeholder="5" min="0" />
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full">Calculate BOQ</Button>

        {result && (
          <div className="space-y-4 pt-4 animate-in fade-in-50 border-t">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-2">#</th>
                    <th className="text-left py-2 px-2">Description</th>
                    <th className="text-left py-2 px-2">Unit</th>
                    <th className="text-right py-2 px-2">Qty</th>
                    <th className="text-right py-2 px-2">Rate</th>
                    <th className="text-right py-2 px-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-2 px-2">{idx + 1}</td>
                      <td className="py-2 px-2">{item.description || "—"}</td>
                      <td className="py-2 px-2">{item.unit}</td>
                      <td className="py-2 px-2 text-right">{item.quantity || "0"}</td>
                      <td className="py-2 px-2 text-right">${parseFloat(item.rate || "0").toFixed(2)}</td>
                      <td className="py-2 px-2 text-right font-medium">${result.itemAmounts[idx].toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="space-y-2 border-t pt-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span data-testid="text-subtotal" className="font-medium">${result.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Contingency ({contingency}%)</span>
                <span data-testid="text-contingency" className="font-medium">${result.contingencyAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total</span>
                <span data-testid="text-total" className="text-primary">${result.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}