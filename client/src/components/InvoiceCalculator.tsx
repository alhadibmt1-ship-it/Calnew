import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LineItem {
  id: number;
  description: string;
  qty: string;
  unitPrice: string;
}

let nextId = 1;

export default function InvoiceCalculator() {
  const [items, setItems] = useState<LineItem[]>([{ id: nextId++, description: "", qty: "", unitPrice: "" }]);
  const [taxRate, setTaxRate] = useState("10");

  const addItem = () => setItems([...items, { id: nextId++, description: "", qty: "", unitPrice: "" }]);
  const removeItem = (id: number) => setItems(items.filter((i) => i.id !== id));

  const updateItem = (id: number, field: keyof LineItem, value: string) => {
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  const subtotal = items.reduce((sum, item) => {
    const qty = parseFloat(item.qty) || 0;
    const price = parseFloat(item.unitPrice) || 0;
    return sum + qty * price;
  }, 0);

  const tax = (subtotal * (parseFloat(taxRate) || 0)) / 100;
  const total = subtotal + tax;

  return (
    <Card className="w-full border-t-4 border-t-violet-600">
      <CardHeader>
        <CardTitle>Invoice Calculator</CardTitle>
        <CardDescription>Create line items with quantities and prices to calculate invoice totals with tax.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-base font-semibold">Line Items</Label>
            <Button data-testid="button-add-item" variant="outline" size="sm" onClick={addItem}>+ Add Item</Button>
          </div>
          {items.map((item) => (
            <div key={item.id} className="flex gap-2 items-end">
              <div className="flex-1">
                <Input
                  data-testid={`input-item-desc-${item.id}`}
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => updateItem(item.id, "description", e.target.value)}
                />
              </div>
              <div className="w-20">
                <Input
                  data-testid={`input-item-qty-${item.id}`}
                  type="number"
                  placeholder="Qty"
                  value={item.qty}
                  onChange={(e) => updateItem(item.id, "qty", e.target.value)}
                />
              </div>
              <div className="w-28">
                <Input
                  data-testid={`input-item-price-${item.id}`}
                  type="number"
                  placeholder="Unit Price"
                  value={item.unitPrice}
                  onChange={(e) => updateItem(item.id, "unitPrice", e.target.value)}
                />
              </div>
              <div className="w-24 text-right font-medium text-sm pt-2">
                ${((parseFloat(item.qty) || 0) * (parseFloat(item.unitPrice) || 0)).toFixed(2)}
              </div>
              {items.length > 1 && (
                <Button data-testid={`button-remove-item-${item.id}`} variant="ghost" size="sm" onClick={() => removeItem(item.id)} className="text-red-500">✕</Button>
              )}
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-4 gap-4 items-end">
          <div className="space-y-2">
            <Label>Tax Rate (%)</Label>
            <Input
              data-testid="input-tax-rate"
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              placeholder="10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-lg border text-center">
            <p className="text-xs text-muted-foreground uppercase font-medium">Subtotal</p>
            <p data-testid="text-subtotal" className="text-2xl font-bold text-foreground">
              ${subtotal.toFixed(2)}
            </p>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 text-center">
            <p className="text-xs text-muted-foreground uppercase font-medium">Tax</p>
            <p data-testid="text-tax" className="text-2xl font-bold text-orange-700 dark:text-orange-400">
              ${tax.toFixed(2)}
            </p>
          </div>
          <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg border border-violet-200 text-center">
            <p className="text-xs text-muted-foreground uppercase font-medium">Total</p>
            <p data-testid="text-total" className="text-2xl font-bold text-violet-700 dark:text-violet-400">
              ${total.toFixed(2)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}