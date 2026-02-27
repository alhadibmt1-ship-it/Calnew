import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FlowItem {
  id: number;
  description: string;
  amount: string;
}

let nextId = 1;

export default function CashFlowCalculator() {
  const [incomeItems, setIncomeItems] = useState<FlowItem[]>([{ id: nextId++, description: "", amount: "" }]);
  const [expenseItems, setExpenseItems] = useState<FlowItem[]>([{ id: nextId++, description: "", amount: "" }]);

  const addIncome = () => setIncomeItems([...incomeItems, { id: nextId++, description: "", amount: "" }]);
  const addExpense = () => setExpenseItems([...expenseItems, { id: nextId++, description: "", amount: "" }]);

  const removeIncome = (id: number) => setIncomeItems(incomeItems.filter((i) => i.id !== id));
  const removeExpense = (id: number) => setExpenseItems(expenseItems.filter((i) => i.id !== id));

  const updateIncome = (id: number, field: keyof FlowItem, value: string) => {
    setIncomeItems(incomeItems.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };
  const updateExpense = (id: number, field: keyof FlowItem, value: string) => {
    setExpenseItems(expenseItems.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  const totalIncome = incomeItems.reduce((sum, i) => sum + (parseFloat(i.amount) || 0), 0);
  const totalExpenses = expenseItems.reduce((sum, i) => sum + (parseFloat(i.amount) || 0), 0);
  const netCashFlow = totalIncome - totalExpenses;

  return (
    <Card className="w-full border-t-4 border-t-emerald-600">
      <CardHeader>
        <CardTitle>Cash Flow Calculator</CardTitle>
        <CardDescription>Track income and expenses to calculate your net cash flow.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-base font-semibold text-green-700 dark:text-green-400">Income</Label>
              <Button data-testid="button-add-income" variant="outline" size="sm" onClick={addIncome}>+ Add</Button>
            </div>
            {incomeItems.map((item) => (
              <div key={item.id} className="flex gap-2 items-end">
                <div className="flex-1 space-y-1">
                  <Input
                    data-testid={`input-income-desc-${item.id}`}
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => updateIncome(item.id, "description", e.target.value)}
                  />
                </div>
                <div className="w-28 space-y-1">
                  <Input
                    data-testid={`input-income-amount-${item.id}`}
                    type="number"
                    placeholder="0"
                    value={item.amount}
                    onChange={(e) => updateIncome(item.id, "amount", e.target.value)}
                  />
                </div>
                {incomeItems.length > 1 && (
                  <Button data-testid={`button-remove-income-${item.id}`} variant="ghost" size="sm" onClick={() => removeIncome(item.id)} className="text-red-500">✕</Button>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-base font-semibold text-red-700 dark:text-red-400">Expenses</Label>
              <Button data-testid="button-add-expense" variant="outline" size="sm" onClick={addExpense}>+ Add</Button>
            </div>
            {expenseItems.map((item) => (
              <div key={item.id} className="flex gap-2 items-end">
                <div className="flex-1 space-y-1">
                  <Input
                    data-testid={`input-expense-desc-${item.id}`}
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => updateExpense(item.id, "description", e.target.value)}
                  />
                </div>
                <div className="w-28 space-y-1">
                  <Input
                    data-testid={`input-expense-amount-${item.id}`}
                    type="number"
                    placeholder="0"
                    value={item.amount}
                    onChange={(e) => updateExpense(item.id, "amount", e.target.value)}
                  />
                </div>
                {expenseItems.length > 1 && (
                  <Button data-testid={`button-remove-expense-${item.id}`} variant="ghost" size="sm" onClick={() => removeExpense(item.id)} className="text-red-500">✕</Button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 text-center">
            <p className="text-xs text-muted-foreground uppercase font-medium">Total Income</p>
            <p data-testid="text-total-income" className="text-2xl font-bold text-green-700 dark:text-green-400">
              ${totalIncome.toFixed(2)}
            </p>
          </div>
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 text-center">
            <p className="text-xs text-muted-foreground uppercase font-medium">Total Expenses</p>
            <p data-testid="text-total-expenses" className="text-2xl font-bold text-red-700 dark:text-red-400">
              ${totalExpenses.toFixed(2)}
            </p>
          </div>
          <div className={`p-4 rounded-lg border text-center ${netCashFlow >= 0 ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200" : "bg-orange-50 dark:bg-orange-900/20 border-orange-200"}`}>
            <p className="text-xs text-muted-foreground uppercase font-medium">Net Cash Flow</p>
            <p data-testid="text-net-cash-flow" className={`text-2xl font-bold ${netCashFlow >= 0 ? "text-emerald-700 dark:text-emerald-400" : "text-orange-700 dark:text-orange-400"}`}>
              ${netCashFlow.toFixed(2)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}