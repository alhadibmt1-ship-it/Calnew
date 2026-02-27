import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ExpenseItem {
  id: number;
  category: string;
  description: string;
  amount: string;
  date: string;
}

const CATEGORIES = ["Food", "Transport", "Utilities", "Rent", "Office", "Marketing", "Salaries", "Other"];

let nextId = 1;

export default function ExpenseCalculator() {
  const [items, setItems] = useState<ExpenseItem[]>([{ id: nextId++, category: "Other", description: "", amount: "", date: "" }]);

  const addItem = () => setItems([...items, { id: nextId++, category: "Other", description: "", amount: "", date: "" }]);
  const removeItem = (id: number) => setItems(items.filter((i) => i.id !== id));

  const updateItem = (id: number, field: keyof ExpenseItem, value: string) => {
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  const totalExpenses = items.reduce((sum, i) => sum + (parseFloat(i.amount) || 0), 0);

  const categoryBreakdown = items.reduce<Record<string, number>>((acc, item) => {
    const amount = parseFloat(item.amount) || 0;
    if (amount > 0) {
      acc[item.category] = (acc[item.category] || 0) + amount;
    }
    return acc;
  }, {});

  return (
    <Card className="w-full border-t-4 border-t-red-600">
      <CardHeader>
        <CardTitle>Expense Calculator</CardTitle>
        <CardDescription>Track expenses by category to see total spending and category breakdown.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-base font-semibold">Expenses</Label>
            <Button data-testid="button-add-expense" variant="outline" size="sm" onClick={addItem}>+ Add Expense</Button>
          </div>
          {items.map((item) => (
            <div key={item.id} className="flex flex-wrap gap-2 items-end">
              <div className="w-32">
                <Select value={item.category} onValueChange={(v) => updateItem(item.id, "category", v)}>
                  <SelectTrigger data-testid={`select-category-${item.id}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 min-w-[120px]">
                <Input
                  data-testid={`input-expense-desc-${item.id}`}
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => updateItem(item.id, "description", e.target.value)}
                />
              </div>
              <div className="w-28">
                <Input
                  data-testid={`input-expense-amount-${item.id}`}
                  type="number"
                  placeholder="Amount"
                  value={item.amount}
                  onChange={(e) => updateItem(item.id, "amount", e.target.value)}
                />
              </div>
              <div className="w-36">
                <Input
                  data-testid={`input-expense-date-${item.id}`}
                  type="date"
                  value={item.date}
                  onChange={(e) => updateItem(item.id, "date", e.target.value)}
                />
              </div>
              {items.length > 1 && (
                <Button data-testid={`button-remove-expense-${item.id}`} variant="ghost" size="sm" onClick={() => removeItem(item.id)} className="text-red-500">✕</Button>
              )}
            </div>
          ))}
        </div>

        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 text-center">
          <p className="text-xs text-muted-foreground uppercase font-medium">Total Expenses</p>
          <p data-testid="text-total-expenses" className="text-3xl font-bold text-red-700 dark:text-red-400">
            ${totalExpenses.toFixed(2)}
          </p>
        </div>

        {Object.keys(categoryBreakdown).length > 0 && (
          <div className="pt-2">
            <h4 className="font-semibold mb-3 text-sm">Breakdown by Category</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(categoryBreakdown)
                .sort((a, b) => b[1] - a[1])
                .map(([cat, amt]) => (
                  <div key={cat} className="p-3 bg-slate-50 dark:bg-slate-900/40 rounded-lg border text-center" data-testid={`text-category-${cat.toLowerCase()}`}>
                    <p className="text-xs text-muted-foreground font-medium">{cat}</p>
                    <p className="text-lg font-bold">${amt.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">{((amt / totalExpenses) * 100).toFixed(1)}%</p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}