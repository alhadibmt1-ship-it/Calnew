import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface BOQItem { description: string; unit: string; quantity: string; rate: string }

export default function BOQCalculator() {
  const [items, setItems] = useState<BOQItem[]>([{ description: "", unit: "sqft", quantity: "", rate: "" }]);
  const [contingency, setContingency] = useState("5");

  const addItem = () => setItems(prev => [...prev, { description: "", unit: "sqft", quantity: "", rate: "" }]);
  const removeItem = (idx: number) => setItems(prev => prev.filter((_, i) => i !== idx));
  const updateItem = (idx: number, field: keyof BOQItem, value: string) => {
    setItems(prev => prev.map((item, i) => i === idx ? { ...item, [field]: value } : item));
  };

  const lineAmounts = items.map(i => (parseFloat(i.quantity) || 0) * (parseFloat(i.rate) || 0));
  const subtotal = lineAmounts.reduce((s, a) => s + a, 0);
  const contingencyAmt = subtotal * ((parseFloat(contingency) || 0) / 100);
  const total = subtotal + contingencyAmt;

  return (
    <Card className="w-full border-t-4 border-t-indigo-700" data-testid="boq-calculator">
      <CardHeader>
        <CardTitle>BOQ Calculator</CardTitle>
        <CardDescription>Create a Bill of Quantities with automatic totals and contingency.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {items.map((item, i) => (
            <div key={i} className="flex gap-2 items-end">
              <div className="flex-1">
                {i === 0 && <Label className="text-xs">Description</Label>}
                <Input placeholder="Work item" value={item.description} onChange={(e) => updateItem(i, "description", e.target.value)} data-testid={`input-desc-${i}`} />
              </div>
              <div className="w-20">
                {i === 0 && <Label className="text-xs">Unit</Label>}
                <Input placeholder="sqft" value={item.unit} onChange={(e) => updateItem(i, "unit", e.target.value)} data-testid={`input-unit-${i}`} />
              </div>
              <div className="w-20">
                {i === 0 && <Label className="text-xs">Qty</Label>}
                <Input type="number" placeholder="0" value={item.quantity} onChange={(e) => updateItem(i, "quantity", e.target.value)} data-testid={`input-qty-${i}`} />
              </div>
              <div className="w-24">
                {i === 0 && <Label className="text-xs">Rate ($)</Label>}
                <Input type="number" placeholder="0" value={item.rate} onChange={(e) => updateItem(i, "rate", e.target.value)} data-testid={`input-rate-${i}`} />
              </div>
              <div className="w-24 text-right font-medium text-sm pt-2">${lineAmounts[i].toFixed(2)}</div>
              {items.length > 1 && <Button variant="ghost" size="icon" onClick={() => removeItem(i)} className="text-red-500 shrink-0"><Trash2 className="h-4 w-4" /></Button>}
            </div>
          ))}
        </div>
        <Button variant="outline" size="sm" onClick={addItem} data-testid="button-add-item"><Plus className="h-3 w-3 mr-1" />Add Item</Button>
        <div className="space-y-2">
          <Label>Contingency (%)</Label>
          <Input type="number" placeholder="5" value={contingency} onChange={(e) => setContingency(e.target.value)} className="w-32" data-testid="input-contingency" />
        </div>
        <div className="border-t pt-4 space-y-2 text-right" data-testid="result-section">
          <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-medium" data-testid="text-subtotal">${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Contingency ({contingency}%)</span><span className="font-medium" data-testid="text-contingency">${contingencyAmt.toFixed(2)}</span></div>
          <div className="flex justify-between text-lg border-t pt-2"><span className="font-semibold">Total</span><span className="font-bold text-indigo-700" data-testid="text-total">${total.toFixed(2)}</span></div>
        </div>
      </CardContent>
    </Card>
  );
}
