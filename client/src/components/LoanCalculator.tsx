import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function LoanCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalPayment: number;
  } | null>(null);

  const calculateLoan = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;

    if (p > 0 && r > 0 && n > 0) {
      // EMI Formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
      const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = emi * n;
      const totalInterest = totalPayment - p;

      setResult({
        monthlyPayment: Math.round(emi),
        totalInterest: Math.round(totalInterest),
        totalPayment: Math.round(totalPayment)
      });
    }
  };

  const chartData = result ? [
    { name: "Principal Amount", value: parseFloat(amount), color: "#2563eb" }, // blue-600
    { name: "Total Interest", value: result.totalInterest, color: "#9333ea" }  // purple-600
  ] : [];

  return (
    <Card className="w-full border-t-4 border-t-blue-600">
      <CardHeader>
        <CardTitle>Loan EMI Calculator</CardTitle>
        <CardDescription>
          Calculate your monthly loan payments (EMI) for home loans, car loans, or personal loans.
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
                  type="number" 
                  placeholder="100000" 
                  className="pl-7"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Interest Rate (%)</Label>
              <Input 
                type="number" 
                placeholder="5.5" 
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Loan Term (Years)</Label>
              <Input 
                type="number" 
                placeholder="10" 
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
            </div>

            <Button onClick={calculateLoan} className="w-full bg-blue-600 hover:bg-blue-700">Calculate Payment</Button>
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
                  <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">${result.monthlyPayment.toLocaleString()}</p>
                </div>
                
                <div className="mt-6 p-4 bg-white dark:bg-slate-800 rounded-lg border shadow-sm text-left">
                  <h4 className="font-semibold mb-2 text-sm">Loan Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    You will pay a total of <span className="font-medium text-foreground">${result.totalPayment.toLocaleString()}</span> over {years} years. 
                    This includes <span className="font-medium text-foreground">${result.totalInterest.toLocaleString()}</span> in interest, which is 
                    {((result.totalInterest / result.totalPayment) * 100).toFixed(1)}% of the total cost.
                  </p>
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