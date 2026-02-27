import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export default function AmortizationCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [schedule, setSchedule] = useState<AmortizationRow[]>([]);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  const calculate = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;

    if (p > 0 && r > 0 && n > 0) {
      const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setMonthlyPayment(monthly);

      const rows: AmortizationRow[] = [];
      let balance = p;

      for (let i = 1; i <= n; i++) {
        const interestPayment = balance * r;
        const principalPayment = monthly - interestPayment;
        balance -= principalPayment;

        rows.push({
          month: i,
          payment: monthly,
          principal: principalPayment,
          interest: interestPayment,
          balance: Math.max(0, balance),
        });
      }

      setSchedule(rows);
    }
  };

  const totalInterest = schedule.reduce((sum, row) => sum + row.interest, 0);
  const totalPayment = schedule.reduce((sum, row) => sum + row.payment, 0);

  return (
    <Card className="w-full border-t-4 border-t-blue-600">
      <CardHeader>
        <CardTitle>Amortization Calculator</CardTitle>
        <CardDescription>
          Generate a full amortization schedule showing principal and interest breakdown for each payment.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Loan Amount ($)</Label>
            <Input
              data-testid="input-amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="200000"
            />
          </div>
          <div className="space-y-2">
            <Label>Interest Rate (%)</Label>
            <Input
              data-testid="input-rate"
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="6.5"
            />
          </div>
          <div className="space-y-2">
            <Label>Loan Term (Years)</Label>
            <Input
              data-testid="input-years"
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="30"
            />
          </div>
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full bg-blue-600 hover:bg-blue-700">
          Generate Amortization Schedule
        </Button>

        {schedule.length > 0 && (
          <>
            <div className="grid grid-cols-3 gap-4 bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
              <div className="space-y-1 text-center">
                <p className="text-xs text-muted-foreground uppercase">Monthly Payment</p>
                <p data-testid="text-monthly-payment" className="text-2xl font-bold text-blue-600">
                  ${monthlyPayment.toFixed(2)}
                </p>
              </div>
              <div className="space-y-1 text-center">
                <p className="text-xs text-muted-foreground uppercase">Total Interest</p>
                <p data-testid="text-total-interest" className="text-2xl font-bold text-orange-600">
                  ${totalInterest.toFixed(2)}
                </p>
              </div>
              <div className="space-y-1 text-center">
                <p className="text-xs text-muted-foreground uppercase">Total Payment</p>
                <p data-testid="text-total-payment" className="text-2xl font-bold text-foreground">
                  ${totalPayment.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="max-h-[400px] overflow-auto border rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 sticky top-0">
                  <tr>
                    <th className="p-2 text-left">Month</th>
                    <th className="p-2 text-right">Payment</th>
                    <th className="p-2 text-right">Principal</th>
                    <th className="p-2 text-right">Interest</th>
                    <th className="p-2 text-right">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((row) => (
                    <tr key={row.month} className="border-t" data-testid={`row-schedule-${row.month}`}>
                      <td className="p-2">{row.month}</td>
                      <td className="p-2 text-right">${row.payment.toFixed(2)}</td>
                      <td className="p-2 text-right">${row.principal.toFixed(2)}</td>
                      <td className="p-2 text-right">${row.interest.toFixed(2)}</td>
                      <td className="p-2 text-right">${row.balance.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}