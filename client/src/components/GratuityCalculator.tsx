import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function GratuityCalculator() {
  const [basicSalary, setBasicSalary] = useState("");
  const [years, setYears] = useState("");
  const [months, setMonths] = useState("");
  const [days, setDays] = useState("");
  const [contractType, setContractType] = useState("unlimited");
  const [resignationType, setResignationType] = useState("termination");
  const [result, setResult] = useState<{
    totalGratuity: number;
    first5Years: number;
    after5Years: number;
    totalYears: number;
  } | null>(null);

  const calculate = () => {
    const salary = parseFloat(basicSalary);
    const y = parseInt(years) || 0;
    const m = parseInt(months) || 0;
    const d = parseInt(days) || 0;

    if (salary <= 0 || (y === 0 && m === 0 && d === 0)) return;

    const totalYears = y + m / 12 + d / 365;

    if (totalYears < 1) {
      setResult({ totalGratuity: 0, first5Years: 0, after5Years: 0, totalYears });
      return;
    }

    const dailySalary = salary / 30;
    let first5 = 0;
    let after5 = 0;

    if (totalYears <= 5) {
      first5 = 21 * dailySalary * totalYears;
    } else {
      first5 = 21 * dailySalary * 5;
      after5 = 30 * dailySalary * (totalYears - 5);
    }

    let totalGratuity = first5 + after5;

    if (resignationType === "resignation" && contractType === "unlimited") {
      if (totalYears < 1) {
        totalGratuity = 0;
      } else if (totalYears < 3) {
        totalGratuity = 0;
      } else if (totalYears < 5) {
        totalGratuity = totalGratuity * (1 / 3);
      } else if (totalYears < 7) {
        totalGratuity = totalGratuity * (2 / 3);
      }
    }

    const maxGratuity = salary * 24;
    totalGratuity = Math.min(totalGratuity, maxGratuity);

    setResult({
      totalGratuity,
      first5Years: first5,
      after5Years: after5,
      totalYears,
    });
  };

  const reset = () => {
    setBasicSalary("");
    setYears("");
    setMonths("");
    setDays("");
    setContractType("unlimited");
    setResignationType("termination");
    setResult(null);
  };

  return (
    <Card className="w-full border-t-4 border-t-emerald-600">
      <CardHeader>
        <CardTitle>Gratuity Calculator</CardTitle>
        <CardDescription>
          Calculate end-of-service gratuity benefits based on UAE labor law.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="salary">Basic Monthly Salary</Label>
            <Input
              id="salary"
              data-testid="input-basic-salary"
              type="number"
              value={basicSalary}
              onChange={(e) => setBasicSalary(e.target.value)}
              placeholder="5000"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="years">Years</Label>
              <Input
                id="years"
                data-testid="input-years"
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                placeholder="5"
                min="0"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="months">Months</Label>
              <Input
                id="months"
                data-testid="input-months"
                type="number"
                value={months}
                onChange={(e) => setMonths(e.target.value)}
                placeholder="0"
                min="0"
                max="11"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="days">Days</Label>
              <Input
                id="days"
                data-testid="input-days"
                type="number"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                placeholder="0"
                min="0"
                max="30"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Contract Type</Label>
            <Select value={contractType} onValueChange={setContractType}>
              <SelectTrigger data-testid="select-contract-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unlimited">Unlimited Contract</SelectItem>
                <SelectItem value="limited">Limited Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Reason for Leaving</Label>
            <Select value={resignationType} onValueChange={setResignationType}>
              <SelectTrigger data-testid="select-resignation-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="termination">Termination by Employer</SelectItem>
                <SelectItem value="resignation">Resignation by Employee</SelectItem>
                <SelectItem value="end-of-contract">End of Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3">
            <Button data-testid="button-calculate" onClick={calculate} className="flex-1">
              Calculate Gratuity
            </Button>
            <Button data-testid="button-reset" variant="outline" onClick={reset}>
              Reset
            </Button>
          </div>
        </div>

        {result && (
          <div className="space-y-4 pt-4 border-t">
            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-6 rounded-xl text-center">
              <p className="text-sm text-muted-foreground mb-1">Total Gratuity</p>
              <p data-testid="text-total-gratuity" className="text-3xl font-bold text-emerald-600">
                {result.totalGratuity.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Service period: {result.totalYears.toFixed(2)} years
              </p>
            </div>

            {result.totalGratuity === 0 && result.totalYears < 1 && (
              <p className="text-sm text-amber-600 text-center">
                Employees with less than 1 year of service are not eligible for gratuity.
              </p>
            )}

            {result.totalGratuity === 0 && result.totalYears >= 1 && result.totalYears < 3 && (
              <p className="text-sm text-amber-600 text-center">
                Employees who resign before completing 3 years on an unlimited contract are not entitled to gratuity.
              </p>
            )}

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">First 5 years (21 days/year)</span>
                <span data-testid="text-first-5-years" className="font-mono">
                  {result.first5Years.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">After 5 years (30 days/year)</span>
                <span data-testid="text-after-5-years" className="font-mono">
                  {result.after5Years.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg text-xs text-muted-foreground space-y-1">
              <p><strong>How it works (UAE Labor Law):</strong></p>
              <p>• First 5 years: 21 days of basic salary per year</p>
              <p>• After 5 years: 30 days of basic salary per year</p>
              <p>• Maximum gratuity cannot exceed 2 years' salary</p>
              <p>• Resignation before 3 years (unlimited contract): No gratuity</p>
              <p>• Resignation 3-5 years: 1/3 of gratuity</p>
              <p>• Resignation 5-7 years: 2/3 of gratuity</p>
              <p>• Resignation after 7 years: Full gratuity</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
