import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AutoLoanCalculator() {
  const [price, setPrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [rate, setRate] = useState("");
  const [term, setTerm] = useState("");
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalPayment: number;
    loanAmount: number;
  } | null>(null);

  const calculate = () => {
    const p = parseFloat(price) - (parseFloat(downPayment) || 0);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(term);

    if (p > 0 && r > 0 && n > 0) {
      const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = monthly * n;
      const totalInterest = totalPayment - p;

      setResult({
        monthlyPayment: monthly,
        totalInterest,
        totalPayment,
        loanAmount: p,
      });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-blue-600">
      <CardHeader>
        <CardTitle>Auto Loan Calculator</CardTitle>
        <CardDescription>
          Calculate your monthly car payment, total interest, and loan cost.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Vehicle Price ($)</Label>
            <Input
              data-testid="input-price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="30000"
            />
          </div>
          <div className="space-y-2">
            <Label>Down Payment ($)</Label>
            <Input
              data-testid="input-down-payment"
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              placeholder="5000"
            />
          </div>
          <div className="space-y-2">
            <Label>Interest Rate (%)</Label>
            <Input
              data-testid="input-rate"
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="5.5"
            />
          </div>
          <div className="space-y-2">
            <Label>Loan Term (Months)</Label>
            <Input
              data-testid="input-term"
              type="number"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="60"
            />
          </div>
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full bg-blue-600 hover:bg-blue-700">
          Calculate Auto Loan
        </Button>

        {result && (
          <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase">Monthly Payment</p>
              <p data-testid="text-monthly-payment" className="text-2xl font-bold text-blue-600">
                ${result.monthlyPayment.toFixed(2)}
              </p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-xs text-muted-foreground uppercase">Loan Amount</p>
              <p data-testid="text-loan-amount" className="text-2xl font-bold text-foreground">
                ${result.loanAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase">Total Interest</p>
              <p data-testid="text-total-interest" className="text-xl font-semibold text-orange-600">
                ${result.totalInterest.toFixed(2)}
              </p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-xs text-muted-foreground uppercase">Total Cost</p>
              <p data-testid="text-total-payment" className="text-xl font-semibold text-foreground">
                ${result.totalPayment.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}