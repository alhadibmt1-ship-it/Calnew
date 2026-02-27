import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function InflationCalculator() {
  const [amount, setAmount] = useState("");
  const [inflationRate, setInflationRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<{
    futureValue: number;
    purchasingPower: number;
    totalInflation: number;
  } | null>(null);

  const calculate = () => {
    const a = parseFloat(amount);
    const r = parseFloat(inflationRate) / 100;
    const y = parseFloat(years);

    if (a > 0 && r > 0 && y > 0) {
      const futureValue = a * Math.pow(1 + r, y);
      const purchasingPower = a / Math.pow(1 + r, y);
      const totalInflation = ((futureValue - a) / a) * 100;

      setResult({
        futureValue,
        purchasingPower,
        totalInflation,
      });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-blue-600">
      <CardHeader>
        <CardTitle>Inflation Calculator</CardTitle>
        <CardDescription>
          Calculate how inflation affects your money's purchasing power over time.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Current Amount ($)</Label>
            <Input
              data-testid="input-amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="10000"
            />
          </div>
          <div className="space-y-2">
            <Label>Inflation Rate (%)</Label>
            <Input
              data-testid="input-inflation-rate"
              type="number"
              value={inflationRate}
              onChange={(e) => setInflationRate(e.target.value)}
              placeholder="3"
            />
          </div>
          <div className="space-y-2">
            <Label>Years</Label>
            <Input
              data-testid="input-years"
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="10"
            />
          </div>
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full bg-blue-600 hover:bg-blue-700">
          Calculate Inflation Impact
        </Button>

        {result && (
          <div className="space-y-4 bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase">Future Cost of Goods</p>
                <p data-testid="text-future-value" className="text-2xl font-bold text-red-600">
                  ${result.futureValue.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">
                  What costs ${parseFloat(amount).toFixed(2)} today will cost this in {years} years
                </p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-xs text-muted-foreground uppercase">Purchasing Power</p>
                <p data-testid="text-purchasing-power" className="text-2xl font-bold text-blue-600">
                  ${result.purchasingPower.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">
                  What ${parseFloat(amount).toFixed(2)} will be worth in {years} years
                </p>
              </div>
            </div>
            <div className="text-center pt-4 border-t">
              <p className="text-xs text-muted-foreground uppercase">Total Inflation Over {years} Years</p>
              <p data-testid="text-total-inflation" className="text-xl font-bold text-orange-600">
                {result.totalInflation.toFixed(1)}%
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}