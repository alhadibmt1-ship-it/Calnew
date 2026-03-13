import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface LineItem { description: string; qty: string; unitPrice: string }

export default function InvoiceCalculator() {
  const [items, setItems] = useState<LineItem[]>([{ description: "", qty: "1", unitPrice: "" }]);
  const [taxRate, setTaxRate] = useState("0");

  const addItem = () => setItems(prev => [...prev, { description: "", qty: "1", unitPrice: "" }]);
  const removeItem = (idx: number) => setItems(prev => prev.filter((_, i) => i !== idx));
  const updateItem = (idx: number, field: keyof LineItem, value: string) => {
    setItems(prev => prev.map((item, i) => i === idx ? { ...item, [field]: value } : item));
  };

  const lineAmounts = items.map(i => (parseFloat(i.qty) || 0) * (parseFloat(i.unitPrice) || 0));
  const subtotal = lineAmounts.reduce((s, a) => s + a, 0);
  const tax = subtotal * (parseFloat(taxRate) || 0) / 100;
  const total = subtotal + tax;

  return (
    <Card className="w-full border-t-4 border-t-sky-600" data-testid="invoice-calculator">
      <CardHeader>
        <CardTitle>Invoice Calculator</CardTitle>
        <CardDescription>Create line items and calculate subtotal, tax, and total for invoices.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {items.map((item, i) => (
            <div key={i} className="flex gap-2 items-end">
              <div className="flex-1">
                {i === 0 && <Label className="text-xs">Description</Label>}
                <Input placeholder="Item description" value={item.description} onChange={(e) => updateItem(i, "description", e.target.value)} data-testid={`input-desc-${i}`} />
              </div>
              <div className="w-20">
                {i === 0 && <Label className="text-xs">Qty</Label>}
                <Input type="number" placeholder="1" value={item.qty} onChange={(e) => updateItem(i, "qty", e.target.value)} data-testid={`input-qty-${i}`} />
              </div>
              <div className="w-28">
                {i === 0 && <Label className="text-xs">Unit Price</Label>}
                <Input type="number" placeholder="0.00" value={item.unitPrice} onChange={(e) => updateItem(i, "unitPrice", e.target.value)} data-testid={`input-price-${i}`} />
              </div>
              <div className="w-24 text-right font-medium text-sm pt-2">${lineAmounts[i].toFixed(2)}</div>
              {items.length > 1 && <Button variant="ghost" size="icon" onClick={() => removeItem(i)} className="text-red-500 shrink-0"><Trash2 className="h-4 w-4" /></Button>}
            </div>
          ))}
        </div>
        <Button variant="outline" size="sm" onClick={addItem} data-testid="button-add-item"><Plus className="h-3 w-3 mr-1" />Add Line Item</Button>
        <div className="space-y-2">
          <Label>Tax Rate (%)</Label>
          <Input type="number" placeholder="10" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} className="w-32" data-testid="input-tax-rate" />
        </div>
        <div className="border-t pt-4 space-y-2 text-right" data-testid="result-section">
          <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-medium" data-testid="text-subtotal">${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Tax ({taxRate}%)</span><span className="font-medium" data-testid="text-tax">${tax.toFixed(2)}</span></div>
          <div className="flex justify-between text-lg border-t pt-2"><span className="font-semibold">Total</span><span className="font-bold text-sky-600" data-testid="text-total">${total.toFixed(2)}</span></div>
        </div>
      </CardContent>
    </Card>
  );
}
