import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

export default function SavingGoalCalculator() {
  const [goalAmount, setGoalAmount] = useState(10000);
  const [currentSavings, setCurrentSavings] = useState(1000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [interestRate, setInterestRate] = useState(5);
  const [result, setResult] = useState<{months: number, years: number, totalInterest: number} | null>(null);

  const calculate = () => {
    let balance = currentSavings;
    let months = 0;
    const monthlyRate = interestRate / 100 / 12;
    
    // Avoid infinite loops if contribution is 0 and interest is 0
    if (monthlyContribution <= 0 && balance < goalAmount && monthlyRate <= 0) {
        setResult(null);
        return;
    }

    while (balance < goalAmount && months < 1200) { // 100 years cap
      const interest = balance * monthlyRate;
      balance += monthlyContribution + interest;
      months++;
    }

    const totalContributed = currentSavings + (monthlyContribution * months);
    const totalInterest = goalAmount - totalContributed;

    setResult({
      months,
      years: Number((months / 12).toFixed(1)),
      totalInterest: totalInterest > 0 ? totalInterest : 0
    });
  };

  const data = result ? [
    { name: "Principal", value: goalAmount - result.totalInterest, color: "#2563EB" },
    { name: "Interest", value: result.totalInterest, color: "#10B981" },
  ] : [];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Saving Goal Calculator</CardTitle>
          <CardDescription>Calculate how long it will take to reach your savings goal.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Savings Goal ($)</Label>
            <Input type="number" value={goalAmount} onChange={(e) => setGoalAmount(Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label>Current Savings ($)</Label>
            <Input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label>Monthly Contribution ($)</Label>
            <Input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label>Annual Interest Rate (%)</Label>
            <Input type="number" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
          </div>
          <Button className="w-full" onClick={calculate}>Calculate</Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-muted-foreground">You will reach your goal in</p>
              <p className="text-4xl font-bold text-primary">{result.years} Years</p>
              <p className="text-sm text-muted-foreground">({result.months} months)</p>
            </div>

            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}