import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface LineItem { description: string; amount: string }

export default function CashFlowCalculator() {
  const [incomes, setIncomes] = useState<LineItem[]>([{ description: "", amount: "" }]);
  const [expenses, setExpenses] = useState<LineItem[]>([{ description: "", amount: "" }]);

  const addItem = (type: "income" | "expense") => {
    const setter = type === "income" ? setIncomes : setExpenses;
    setter(prev => [...prev, { description: "", amount: "" }]);
  };

  const removeItem = (type: "income" | "expense", idx: number) => {
    const setter = type === "income" ? setIncomes : setExpenses;
    setter(prev => prev.filter((_, i) => i !== idx));
  };

  const updateItem = (type: "income" | "expense", idx: number, field: keyof LineItem, value: string) => {
    const setter = type === "income" ? setIncomes : setExpenses;
    setter(prev => prev.map((item, i) => i === idx ? { ...item, [field]: value } : item));
  };

  const totalIncome = incomes.reduce((sum, i) => sum + (parseFloat(i.amount) || 0), 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
  const netCashFlow = totalIncome - totalExpenses;

  return (
    <Card className="w-full border-t-4 border-t-teal-600" data-testid="cash-flow-calculator">
      <CardHeader>
        <CardTitle>Cash Flow Calculator</CardTitle>
        <CardDescription>Track income and expenses to calculate net cash flow.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <Label className="text-green-600 font-semibold text-base">Income</Label>
            <Button variant="outline" size="sm" onClick={() => addItem("income")} data-testid="button-add-income"><Plus className="h-3 w-3 mr-1" />Add</Button>
          </div>
          <div className="space-y-2">
            {incomes.map((item, i) => (
              <div key={i} className="flex gap-2">
                <Input placeholder="Description" value={item.description} onChange={(e) => updateItem("income", i, "description", e.target.value)} className="flex-1" data-testid={`input-income-desc-${i}`} />
                <Input type="number" placeholder="Amount" value={item.amount} onChange={(e) => updateItem("income", i, "amount", e.target.value)} className="w-32" data-testid={`input-income-amt-${i}`} />
                {incomes.length > 1 && <Button variant="ghost" size="icon" onClick={() => removeItem("income", i)} className="text-red-500"><Trash2 className="h-4 w-4" /></Button>}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-3">
            <Label className="text-red-600 font-semibold text-base">Expenses</Label>
            <Button variant="outline" size="sm" onClick={() => addItem("expense")} data-testid="button-add-expense"><Plus className="h-3 w-3 mr-1" />Add</Button>
          </div>
          <div className="space-y-2">
            {expenses.map((item, i) => (
              <div key={i} className="flex gap-2">
                <Input placeholder="Description" value={item.description} onChange={(e) => updateItem("expense", i, "description", e.target.value)} className="flex-1" data-testid={`input-expense-desc-${i}`} />
                <Input type="number" placeholder="Amount" value={item.amount} onChange={(e) => updateItem("expense", i, "amount", e.target.value)} className="w-32" data-testid={`input-expense-amt-${i}`} />
                {expenses.length > 1 && <Button variant="ghost" size="icon" onClick={() => removeItem("expense", i)} className="text-red-500"><Trash2 className="h-4 w-4" /></Button>}
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-4 border-t" data-testid="result-section">
          <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Total Income</p>
            <p className="text-xl font-bold text-green-600" data-testid="text-total-income">${totalIncome.toLocaleString()}</p>
          </div>
          <div className="bg-red-50 dark:bg-red-950/30 rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Total Expenses</p>
            <p className="text-xl font-bold text-red-600" data-testid="text-total-expenses">${totalExpenses.toLocaleString()}</p>
          </div>
          <div className={`rounded-lg p-4 text-center ${netCashFlow >= 0 ? "bg-blue-50 dark:bg-blue-950/30" : "bg-orange-50 dark:bg-orange-950/30"}`}>
            <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Net Cash Flow</p>
            <p className={`text-xl font-bold ${netCashFlow >= 0 ? "text-blue-600" : "text-orange-600"}`} data-testid="text-net-cash-flow">${netCashFlow.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
