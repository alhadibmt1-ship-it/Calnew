import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TaxCalculator() {
  const [income, setIncome] = useState(60000);
  const [result, setResult] = useState<{tax: number, rate: number, takeHome: number} | null>(null);

  // Simple progressive tax brackets (Demo purposes - loosely based on typical systems)
  const calculate = () => {
    let tax = 0;
    const incomeVal = income;
    
    if (incomeVal <= 10000) {
      tax = 0;
    } else if (incomeVal <= 40000) {
      tax = (incomeVal - 10000) * 0.12;
    } else if (incomeVal <= 85000) {
      tax = 3600 + (incomeVal - 40000) * 0.22;
    } else if (incomeVal <= 160000) {
      tax = 13500 + (incomeVal - 85000) * 0.24;
    } else {
      tax = 31500 + (incomeVal - 160000) * 0.32;
    }

    setResult({
      tax,
      rate: (tax / incomeVal) * 100,
      takeHome: incomeVal - tax
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Simple Tax Estimator</CardTitle>
          <CardDescription>Estimate your annual income tax liability.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Annual Gross Income ($)</Label>
            <Input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} />
          </div>
          <Button className="w-full" onClick={calculate}>Calculate Tax</Button>
          <p className="text-xs text-muted-foreground mt-4">
            *This is a simplified estimator for demonstration. Actual tax liability depends on specific country, deductions, and filing status.
          </p>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Tax Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-muted-foreground">Estimated Tax</span>
                <span className="font-bold text-red-500">-${result.tax.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-muted-foreground">Effective Rate</span>
                <span className="font-medium">{result.rate.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-medium">Net Income</span>
                <span className="text-2xl font-bold text-primary">${result.takeHome.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
              </div>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">Monthly Breakdown</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Gross: ${(income / 12).toFixed(0)}</div>
                <div>Net: ${(result.takeHome / 12).toFixed(0)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}