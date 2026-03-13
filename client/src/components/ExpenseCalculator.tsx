import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";

const CATEGORIES = ["Food & Dining", "Transportation", "Housing", "Utilities", "Entertainment", "Shopping", "Healthcare", "Education", "Travel", "Other"];

interface Expense { category: string; description: string; amount: string }

export default function ExpenseCalculator() {
  const [expenses, setExpenses] = useState<Expense[]>([{ category: "Food & Dining", description: "", amount: "" }]);

  const addExpense = () => setExpenses(prev => [...prev, { category: "Other", description: "", amount: "" }]);
  const removeExpense = (idx: number) => setExpenses(prev => prev.filter((_, i) => i !== idx));
  const updateExpense = (idx: number, field: keyof Expense, value: string) => {
    setExpenses(prev => prev.map((e, i) => i === idx ? { ...e, [field]: value } : e));
  };

  const total = expenses.reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);
  const byCategory = CATEGORIES.map(cat => ({
    category: cat,
    total: expenses.filter(e => e.category === cat).reduce((s, e) => s + (parseFloat(e.amount) || 0), 0)
  })).filter(c => c.total > 0).sort((a, b) => b.total - a.total);

  return (
    <Card className="w-full border-t-4 border-t-rose-600" data-testid="expense-calculator">
      <CardHeader>
        <CardTitle>Expense Calculator</CardTitle>
        <CardDescription>Track expenses by category and see your spending breakdown.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {expenses.map((exp, i) => (
            <div key={i} className="flex gap-2 items-end">
              <div className="w-40">
                {i === 0 && <Label className="text-xs">Category</Label>}
                <Select value={exp.category} onValueChange={(v) => updateExpense(i, "category", v)}>
                  <SelectTrigger data-testid={`select-category-${i}`}><SelectValue /></SelectTrigger>
                  <SelectContent>{CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                {i === 0 && <Label className="text-xs">Description</Label>}
                <Input placeholder="Description" value={exp.description} onChange={(e) => updateExpense(i, "description", e.target.value)} data-testid={`input-desc-${i}`} />
              </div>
              <div className="w-28">
                {i === 0 && <Label className="text-xs">Amount</Label>}
                <Input type="number" placeholder="0.00" value={exp.amount} onChange={(e) => updateExpense(i, "amount", e.target.value)} data-testid={`input-amount-${i}`} />
              </div>
              {expenses.length > 1 && <Button variant="ghost" size="icon" onClick={() => removeExpense(i)} className="text-red-500 shrink-0"><Trash2 className="h-4 w-4" /></Button>}
            </div>
          ))}
        </div>
        <Button variant="outline" size="sm" onClick={addExpense} data-testid="button-add-expense"><Plus className="h-3 w-3 mr-1" />Add Expense</Button>
        <div className="border-t pt-4" data-testid="result-section">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total Expenses</span>
            <span className="text-2xl font-bold text-rose-600" data-testid="text-total">${total.toFixed(2)}</span>
          </div>
          {byCategory.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground uppercase">Breakdown by Category</p>
              {byCategory.map(c => (
                <div key={c.category} className="flex justify-between items-center">
                  <span className="text-sm">{c.category}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden"><div className="h-full bg-rose-500 rounded-full" style={{ width: `${(c.total / total) * 100}%` }} /></div>
                    <span className="text-sm font-medium w-20 text-right">${c.total.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
