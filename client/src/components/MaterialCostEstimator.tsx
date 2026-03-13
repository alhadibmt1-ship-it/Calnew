import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface Material { name: string; quantity: string; unitPrice: string }

export default function MaterialCostEstimator() {
  const [materials, setMaterials] = useState<Material[]>([{ name: "", quantity: "", unitPrice: "" }]);
  const [markupPct, setMarkupPct] = useState("0");

  const addMaterial = () => setMaterials(prev => [...prev, { name: "", quantity: "", unitPrice: "" }]);
  const removeMaterial = (idx: number) => setMaterials(prev => prev.filter((_, i) => i !== idx));
  const updateMaterial = (idx: number, field: keyof Material, value: string) => {
    setMaterials(prev => prev.map((m, i) => i === idx ? { ...m, [field]: value } : m));
  };

  const lineAmounts = materials.map(m => (parseFloat(m.quantity) || 0) * (parseFloat(m.unitPrice) || 0));
  const subtotal = lineAmounts.reduce((s, a) => s + a, 0);
  const markup = subtotal * ((parseFloat(markupPct) || 0) / 100);
  const total = subtotal + markup;

  return (
    <Card className="w-full border-t-4 border-t-emerald-700" data-testid="material-cost-estimator">
      <CardHeader>
        <CardTitle>Material Cost Estimator</CardTitle>
        <CardDescription>List materials with quantities and prices to estimate total material cost.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {materials.map((mat, i) => (
            <div key={i} className="flex gap-2 items-end">
              <div className="flex-1">
                {i === 0 && <Label className="text-xs">Material</Label>}
                <Input placeholder="Material name" value={mat.name} onChange={(e) => updateMaterial(i, "name", e.target.value)} data-testid={`input-name-${i}`} />
              </div>
              <div className="w-24">
                {i === 0 && <Label className="text-xs">Qty</Label>}
                <Input type="number" placeholder="0" value={mat.quantity} onChange={(e) => updateMaterial(i, "quantity", e.target.value)} data-testid={`input-qty-${i}`} />
              </div>
              <div className="w-28">
                {i === 0 && <Label className="text-xs">Unit Price ($)</Label>}
                <Input type="number" placeholder="0" value={mat.unitPrice} onChange={(e) => updateMaterial(i, "unitPrice", e.target.value)} data-testid={`input-price-${i}`} />
              </div>
              <div className="w-24 text-right font-medium text-sm pt-2">${lineAmounts[i].toFixed(2)}</div>
              {materials.length > 1 && <Button variant="ghost" size="icon" onClick={() => removeMaterial(i)} className="text-red-500 shrink-0"><Trash2 className="h-4 w-4" /></Button>}
            </div>
          ))}
        </div>
        <Button variant="outline" size="sm" onClick={addMaterial} data-testid="button-add-material"><Plus className="h-3 w-3 mr-1" />Add Material</Button>
        <div className="space-y-2">
          <Label>Markup (%)</Label>
          <Input type="number" placeholder="0" value={markupPct} onChange={(e) => setMarkupPct(e.target.value)} className="w-32" data-testid="input-markup" />
        </div>
        <div className="border-t pt-4 space-y-2 text-right" data-testid="result-section">
          <div className="flex justify-between"><span className="text-muted-foreground">Material Subtotal</span><span className="font-medium" data-testid="text-subtotal">${subtotal.toFixed(2)}</span></div>
          {parseFloat(markupPct) > 0 && <div className="flex justify-between"><span className="text-muted-foreground">Markup ({markupPct}%)</span><span className="font-medium" data-testid="text-markup">${markup.toFixed(2)}</span></div>}
          <div className="flex justify-between text-lg border-t pt-2"><span className="font-semibold">Total</span><span className="font-bold text-emerald-700" data-testid="text-total">${total.toFixed(2)}</span></div>
        </div>
      </CardContent>
    </Card>
  );
}
