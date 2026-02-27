import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function InterestRateCalculator() {
  const [principal, setPrincipal] = useState("");
  const [futureValue, setFutureValue] = useState("");
  const [years, setYears] = useState("");
  const [compounding, setCompounding] = useState("1");
  const [result, setResult] = useState<{
    rate: number;
    totalInterest: number;
  } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const fv = parseFloat(futureValue);
    const t = parseFloat(years);
    const n = parseFloat(compounding);

    if (p > 0 && fv > p && t > 0 && n > 0) {
      const rate = n * (Math.pow(fv / p, 1 / (n * t)) - 1) * 100;
      setResult({
        rate,
        totalInterest: fv - p,
      });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-blue-600">
      <CardHeader>
        <CardTitle>Interest Rate Calculator</CardTitle>
        <CardDescription>
          Find the required interest rate to grow your investment from a present value to a future value.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Present Value ($)</Label>
            <Input
              data-testid="input-principal"
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="10000"
            />
          </div>
          <div className="space-y-2">
            <Label>Future Value ($)</Label>
            <Input
              data-testid="input-future-value"
              type="number"
              value={futureValue}
              onChange={(e) => setFutureValue(e.target.value)}
              placeholder="15000"
            />
          </div>
          <div className="space-y-2">
            <Label>Time Period (Years)</Label>
            <Input
              data-testid="input-years"
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="5"
            />
          </div>
          <div className="space-y-2">
            <Label>Compounding Per Year</Label>
            <Input
              data-testid="input-compounding"
              type="number"
              value={compounding}
              onChange={(e) => setCompounding(e.target.value)}
              placeholder="1"
              min="1"
            />
          </div>
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full bg-blue-600 hover:bg-blue-700">
          Calculate Interest Rate
        </Button>

        {result && (
          <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
            <div className="space-y-1 text-center">
              <p className="text-xs text-muted-foreground uppercase">Required Interest Rate</p>
              <p data-testid="text-rate" className="text-3xl font-bold text-blue-600">
                {result.rate.toFixed(2)}%
              </p>
            </div>
            <div className="space-y-1 text-center">
              <p className="text-xs text-muted-foreground uppercase">Total Interest Earned</p>
              <p data-testid="text-total-interest" className="text-3xl font-bold text-green-600">
                ${result.totalInterest.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}