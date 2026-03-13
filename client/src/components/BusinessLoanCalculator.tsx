import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BusinessLoanCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [term, setTerm] = useState("");
  const [result, setResult] = useState<{ monthly: number; totalInterest: number; totalRepayment: number; schedule: { year: number; principal: number; interest: number; balance: number }[] } | null>(null);

  const calculate = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(term) * 12;
    if (p > 0 && r > 0 && n > 0) {
      const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalRepayment = monthly * n;
      const totalInterest = totalRepayment - p;
      const schedule: { year: number; principal: number; interest: number; balance: number }[] = [];
      let balance = p;
      for (let yr = 1; yr <= Math.min(parseFloat(term), 10); yr++) {
        let yearPrincipal = 0, yearInterest = 0;
        for (let m = 0; m < 12; m++) {
          const intPmt = balance * r;
          const prinPmt = monthly - intPmt;
          yearInterest += intPmt;
          yearPrincipal += prinPmt;
          balance -= prinPmt;
        }
        schedule.push({ year: yr, principal: Math.round(yearPrincipal), interest: Math.round(yearInterest), balance: Math.max(0, Math.round(balance)) });
      }
      setResult({ monthly: Math.round(monthly), totalInterest: Math.round(totalInterest), totalRepayment: Math.round(totalRepayment), schedule });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-indigo-600" data-testid="business-loan-calculator">
      <CardHeader>
        <CardTitle>Business Loan Calculator</CardTitle>
        <CardDescription>Calculate monthly payments and view amortization summary for business loans.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Loan Amount ($)</Label>
            <Input type="number" placeholder="50000" value={amount} onChange={(e) => setAmount(e.target.value)} data-testid="input-amount" />
          </div>
          <div className="space-y-2">
            <Label>Interest Rate (%)</Label>
            <Input type="number" placeholder="8" value={rate} onChange={(e) => setRate(e.target.value)} data-testid="input-rate" />
          </div>
          <div className="space-y-2">
            <Label>Term (Years)</Label>
            <Input type="number" placeholder="5" value={term} onChange={(e) => setTerm(e.target.value)} data-testid="input-term" />
          </div>
        </div>
        <Button onClick={calculate} className="w-full bg-indigo-600 hover:bg-indigo-700" data-testid="button-calculate">Calculate</Button>
        {result && (
          <div className="space-y-4 animate-in fade-in" data-testid="result-section">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Monthly Payment</p>
                <p className="text-2xl font-bold text-indigo-600" data-testid="text-monthly">${result.monthly.toLocaleString()}</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Total Interest</p>
                <p className="text-2xl font-bold text-red-600" data-testid="text-interest">${result.totalInterest.toLocaleString()}</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Total Repayment</p>
                <p className="text-2xl font-bold text-slate-700 dark:text-slate-300" data-testid="text-total">${result.totalRepayment.toLocaleString()}</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b"><th className="text-left py-2 px-3">Year</th><th className="text-right py-2 px-3">Principal</th><th className="text-right py-2 px-3">Interest</th><th className="text-right py-2 px-3">Balance</th></tr></thead>
                <tbody>
                  {result.schedule.map(row => (
                    <tr key={row.year} className="border-b last:border-0">
                      <td className="py-2 px-3">{row.year}</td>
                      <td className="py-2 px-3 text-right">${row.principal.toLocaleString()}</td>
                      <td className="py-2 px-3 text-right">${row.interest.toLocaleString()}</td>
                      <td className="py-2 px-3 text-right font-medium">${row.balance.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
