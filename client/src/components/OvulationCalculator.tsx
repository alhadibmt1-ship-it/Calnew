import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addDays, format } from "date-fns";

export default function OvulationCalculator() {
  const [lmp, setLmp] = useState("");
  const [cycleLength, setCycleLength] = useState(28);
  const [result, setResult] = useState<{fertileStart: Date, fertileEnd: Date, ovulationDate: Date} | null>(null);

  const calculate = () => {
    if (!lmp) return;
    const lmpDate = new Date(lmp);
    
    // Ovulation typically happens 14 days BEFORE the NEXT period.
    // Next period = LMP + CycleLength
    // Ovulation = LMP + CycleLength - 14
    
    const ovulationDay = cycleLength - 14;
    const ovulationDate = addDays(lmpDate, ovulationDay);
    
    // Fertile window: 5 days before ovulation + ovulation day (approx 6 days)
    const fertileStart = addDays(ovulationDate, -5);
    const fertileEnd = addDays(ovulationDate, 1); // Day after ovulation

    setResult({ fertileStart, fertileEnd, ovulationDate });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Ovulation Calculator</CardTitle>
        <CardDescription>Find your most fertile days to increase chances of conception.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>First Day of Last Period</Label>
          <Input type="date" value={lmp} onChange={(e) => setLmp(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Average Cycle Length (days)</Label>
          <Input type="number" value={cycleLength} onChange={(e) => setCycleLength(Number(e.target.value))} />
        </div>
        <Button className="w-full" onClick={calculate}>Calculate Fertile Window</Button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-900">
              <p className="text-sm text-muted-foreground">Most Fertile Date</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {format(result.ovulationDate, "MMMM d, yyyy")}
              </p>
              <p className="text-xs text-muted-foreground mt-1">(Ovulation Day)</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-center">High Fertility Window</p>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span>{format(result.fertileStart, "MMM d")}</span>
                <span className="text-muted-foreground text-xs">to</span>
                <span>{format(result.fertileEnd, "MMM d")}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}