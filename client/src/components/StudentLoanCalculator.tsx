import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function StudentLoanCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [gracePeriod, setGracePeriod] = useState("6");
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalCost: number;
    graceInterest: number;
  } | null>(null);

  const calculate = () => {
    const principal = parseFloat(amount);
    const annualRate = parseFloat(rate);
    const termYears = parseFloat(years);
    const graceMonths = parseInt(gracePeriod) || 0;

    if (principal > 0 && annualRate > 0 && termYears > 0) {
      const monthlyRate = annualRate / 100 / 12;
      const graceInterest = principal * monthlyRate * graceMonths;
      const adjustedPrincipal = principal + graceInterest;
      const totalMonths = termYears * 12;

      const emi = (adjustedPrincipal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
      const totalCost = emi * totalMonths;
      const totalInterest = totalCost - principal;

      setResult({
        monthlyPayment: Math.round(emi * 100) / 100,
        totalInterest: Math.round(totalInterest * 100) / 100,
        totalCost: Math.round(totalCost * 100) / 100,
        graceInterest: Math.round(graceInterest * 100) / 100,
      });
    }
  };

  const chartData = result ? [
    { name: "Principal", value: parseFloat(amount), color: "#2563eb" },
    { name: "Total Interest", value: result.totalInterest, color: "#9333ea" },
  ] : [];

  return (
    <Card className="w-full border-t-4 border-t-blue-600">
      <CardHeader>
        <CardTitle data-testid="text-title">Student Loan Calculator</CardTitle>
        <CardDescription>
          Calculate student loan repayment with grace period. See monthly payments, total interest, and total cost.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Loan Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                <Input
                  data-testid="input-loan-amount"
                  type="number"
                  placeholder="30000"
                  className="pl-7"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Interest Rate (%)</Label>
              <Input
                data-testid="input-interest-rate"
                type="number"
                placeholder="5.5"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Loan Term (Years)</Label>
              <Input
                data-testid="input-loan-term"
                type="number"
                placeholder="10"
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Grace Period (Months)</Label>
              <Input
                data-testid="input-grace-period"
                type="number"
                placeholder="6"
                value={gracePeriod}
                onChange={(e) => setGracePeriod(e.target.value)}
              />
            </div>

            <Button data-testid="button-calculate" onClick={calculate} className="w-full bg-blue-600 hover:bg-blue-700">
              Calculate Payment
            </Button>
          </div>

          <div className="flex flex-col justify-center items-center min-h-[300px] bg-slate-50 dark:bg-slate-900 rounded-xl p-4">
            {result ? (
              <>
                <div className="w-full h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-center mt-4">
                  <p className="text-sm text-muted-foreground mb-1">Monthly Payment</p>
                  <p data-testid="text-monthly-payment" className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                    ${result.monthlyPayment.toLocaleString()}
                  </p>
                </div>

                <div className="mt-6 p-4 bg-white dark:bg-slate-800 rounded-lg border shadow-sm text-left w-full">
                  <h4 className="font-semibold mb-2 text-sm">Loan Summary</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>
                      Total Cost: <span data-testid="text-total-cost" className="font-medium text-foreground">${result.totalCost.toLocaleString()}</span>
                    </p>
                    <p>
                      Total Interest: <span data-testid="text-total-interest" className="font-medium text-foreground">${result.totalInterest.toLocaleString()}</span>
                    </p>
                    <p>
                      Grace Period Interest: <span data-testid="text-grace-interest" className="font-medium text-foreground">${result.graceInterest.toLocaleString()}</span>
                    </p>
                    <p>
                      Interest is {((result.totalInterest / result.totalCost) * 100).toFixed(1)}% of the total cost.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 w-full gap-4 mt-6 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                      Principal
                    </span>
                    <span className="font-medium">${parseFloat(amount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                      Interest
                    </span>
                    <span className="font-medium">${result.totalInterest.toLocaleString()}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center text-muted-foreground">
                Enter loan details to see the breakdown
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
