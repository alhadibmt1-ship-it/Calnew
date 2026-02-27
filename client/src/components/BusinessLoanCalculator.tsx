import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BusinessLoanCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [term, setTerm] = useState("");
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalRepayment: number;
    schedule: { year: number; principal: number; interest: number; balance: number }[];
  } | null>(null);

  const calculate = () => {
    const p = parseFloat(amount);
    const annualRate = parseFloat(rate);
    const years = parseFloat(term);

    if (p > 0 && annualRate > 0 && years > 0) {
      const r = annualRate / 100 / 12;
      const n = years * 12;
      const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalRepayment = emi * n;
      const totalInterest = totalRepayment - p;

      const schedule: { year: number; principal: number; interest: number; balance: number }[] = [];
      let balance = p;
      for (let yr = 1; yr <= years; yr++) {
        let yearPrincipal = 0;
        let yearInterest = 0;
        for (let m = 0; m < 12; m++) {
          const intPayment = balance * r;
          const prinPayment = emi - intPayment;
          yearInterest += intPayment;
          yearPrincipal += prinPayment;
          balance -= prinPayment;
        }
        schedule.push({
          year: yr,
          principal: yearPrincipal,
          interest: yearInterest,
          balance: Math.max(0, balance),
        });
      }

      setResult({ monthlyPayment: emi, totalInterest, totalRepayment, schedule });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-blue-600">
      <CardHeader>
        <CardTitle>Business Loan Calculator</CardTitle>
        <CardDescription>Calculate monthly payments, total interest, and view an amortization summary for business loans.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Loan Amount ($)</Label>
            <Input data-testid="input-loan-amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="50000" />
          </div>
          <div className="space-y-2">
            <Label>Annual Interest Rate (%)</Label>
            <Input data-testid="input-interest-rate" type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="7.5" />
          </div>
          <div className="space-y-2">
            <Label>Loan Term (Years)</Label>
            <Input data-testid="input-loan-term" type="number" value={term} onChange={(e) => setTerm(e.target.value)} placeholder="5" />
          </div>
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full bg-blue-600 hover:bg-blue-700">Calculate</Button>

        {result && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 text-center">
                <p className="text-xs text-muted-foreground uppercase font-medium">Monthly Payment</p>
                <p data-testid="text-monthly-payment" className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                  ${result.monthlyPayment.toFixed(2)}
                </p>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 text-center">
                <p className="text-xs text-muted-foreground uppercase font-medium">Total Interest</p>
                <p data-testid="text-total-interest" className="text-2xl font-bold text-red-700 dark:text-red-400">
                  ${result.totalInterest.toFixed(2)}
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 text-center">
                <p className="text-xs text-muted-foreground uppercase font-medium">Total Repayment</p>
                <p data-testid="text-total-repayment" className="text-2xl font-bold text-green-700 dark:text-green-400">
                  ${result.totalRepayment.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="pt-4">
              <h4 className="font-semibold mb-3 text-sm">Amortization Summary</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-2">Year</th>
                      <th className="text-right py-2 px-2">Principal</th>
                      <th className="text-right py-2 px-2">Interest</th>
                      <th className="text-right py-2 px-2">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.schedule.map((row) => (
                      <tr key={row.year} className="border-b" data-testid={`row-schedule-${row.year}`}>
                        <td className="py-2 px-2">{row.year}</td>
                        <td className="text-right py-2 px-2">${row.principal.toFixed(2)}</td>
                        <td className="text-right py-2 px-2">${row.interest.toFixed(2)}</td>
                        <td className="text-right py-2 px-2">${row.balance.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}