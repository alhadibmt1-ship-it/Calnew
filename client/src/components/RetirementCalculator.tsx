import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(25000);
  const [monthlySaving, setMonthlySaving] = useState(1000);
  const [rate, setRate] = useState(6);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const yearsToGrow = retirementAge - currentAge;
    const r = rate / 100 / 12;
    const months = yearsToGrow * 12;
    
    // Future value of current savings
    const fvSavings = currentSavings * Math.pow(1 + r, months);
    
    // Future value of monthly contributions
    const fvContributions = monthlySaving * (Math.pow(1 + r, months) - 1) / r;
    
    setResult(fvSavings + fvContributions);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Retirement Calculator</CardTitle>
          <CardDescription>Estimate how much you will have saved by retirement.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Current Age</Label>
              <Input type="number" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Retirement Age</Label>
              <Input type="number" value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value))} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Current Savings ($)</Label>
            <Input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label>Monthly Saving ($)</Label>
            <Input type="number" value={monthlySaving} onChange={(e) => setMonthlySaving(Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label>Annual Return (%)</Label>
            <Input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
          </div>
          <Button className="w-full" onClick={calculate}>Calculate Corpus</Button>
        </CardContent>
      </Card>

      {result !== null && (
        <Card className="flex flex-col justify-center">
          <CardContent className="text-center py-12 space-y-4">
            <p className="text-muted-foreground">At age {retirementAge}, you could have</p>
            <h2 className="text-5xl font-bold text-primary tracking-tight">
              ${result.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </h2>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Based on a {rate}% annual return compounded monthly over {retirementAge - currentAge} years.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}