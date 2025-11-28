import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function InvestmentCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(5000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(7);
  const [result, setResult] = useState<{
    totalValue: number, 
    totalInterest: number, 
    totalContributed: number,
    yearlyData: any[]
  } | null>(null);

  const calculate = () => {
    let balance = initialInvestment;
    let totalContributed = initialInvestment;
    const yearlyData = [];
    const r = rate / 100 / 12;

    for (let i = 1; i <= years; i++) {
      let interestEarnedYearly = 0;
      for (let m = 0; m < 12; m++) {
        const interest = balance * r;
        balance += interest + monthlyContribution;
        interestEarnedYearly += interest;
        totalContributed += monthlyContribution;
      }
      yearlyData.push({
        year: `Year ${i}`,
        balance: Math.round(balance),
        contributed: Math.round(totalContributed),
        interest: Math.round(balance - totalContributed)
      });
    }

    setResult({
      totalValue: balance,
      totalInterest: balance - totalContributed,
      totalContributed,
      yearlyData
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Investment Calculator</CardTitle>
          <CardDescription>Calculate the future value of your investments.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Starting Amount ($)</Label>
            <Input type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label>Monthly Contribution ($)</Label>
            <Input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label>Investment Period (Years)</Label>
            <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label>Annual Return Rate (%)</Label>
            <Input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
          </div>
          <Button className="w-full" onClick={calculate}>Calculate</Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Projection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold text-primary">${result.totalValue.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Total Interest</p>
                <p className="text-2xl font-bold text-green-600">${result.totalInterest.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
              </div>
            </div>

            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={result.yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                  <Bar dataKey="contributed" stackId="a" fill="#2563EB" name="Principal" />
                  <Bar dataKey="interest" stackId="a" fill="#10B981" name="Interest" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg border">
              <h4 className="font-semibold mb-2">Investment Analysis</h4>
              <p className="text-sm text-muted-foreground">
                In {years} years, your investment will grow to <span className="font-bold text-foreground">${result.totalValue.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>. 
                You will have contributed <span className="font-medium text-foreground">${result.totalContributed.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>, 
                earning a total interest of <span className="font-medium text-green-600">${result.totalInterest.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}