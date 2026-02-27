import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PaymentCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [term, setTerm] = useState("");
  const [termUnit, setTermUnit] = useState("years");
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
  } | null>(null);

  const calculate = () => {
    const p = parseFloat(amount);
    const annualRate = parseFloat(rate);
    const r = annualRate / 100 / 12;
    const termValue = parseFloat(term);
    const n = termUnit === "years" ? termValue * 12 : termValue;

    if (p > 0 && r > 0 && n > 0) {
      const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = monthly * n;
      const totalInterest = totalPayment - p;

      setResult({
        monthlyPayment: monthly,
        totalPayment,
        totalInterest,
      });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-blue-600">
      <CardHeader>
        <CardTitle>Payment Calculator</CardTitle>
        <CardDescription>
          Calculate the payment amount for any loan based on principal, interest rate, and term.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Loan Amount ($)</Label>
            <Input
              data-testid="input-amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="25000"
            />
          </div>
          <div className="space-y-2">
            <Label>Annual Interest Rate (%)</Label>
            <Input
              data-testid="input-rate"
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="5.5"
            />
          </div>
          <div className="grid grid-cols-[1fr,auto] gap-2">
            <div className="space-y-2">
              <Label>Loan Term</Label>
              <Input
                data-testid="input-term"
                type="number"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="5"
              />
            </div>
            <div className="space-y-2 w-[120px]">
              <Label>Unit</Label>
              <Select value={termUnit} onValueChange={setTermUnit}>
                <SelectTrigger data-testid="select-term-unit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="years">Years</SelectItem>
                  <SelectItem value="months">Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full bg-blue-600 hover:bg-blue-700">
          Calculate Payment
        </Button>

        {result && (
          <div className="space-y-4 bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase">Monthly Payment</p>
              <p data-testid="text-monthly-payment" className="text-4xl font-bold text-blue-600">
                ${result.monthlyPayment.toFixed(2)}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="space-y-1 text-center">
                <p className="text-xs text-muted-foreground uppercase">Total Payment</p>
                <p data-testid="text-total-payment" className="text-xl font-bold text-foreground">
                  ${result.totalPayment.toFixed(2)}
                </p>
              </div>
              <div className="space-y-1 text-center">
                <p className="text-xs text-muted-foreground uppercase">Total Interest</p>
                <p data-testid="text-total-interest" className="text-xl font-bold text-orange-600">
                  ${result.totalInterest.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}