import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addDays, format } from "date-fns";

export default function PregnancyCalculator() {
  const [lmp, setLmp] = useState("");
  const [cycleLength, setCycleLength] = useState(28);
  const [result, setResult] = useState<{dueDate: Date, conceptionDate: Date, trimester: string} | null>(null);

  const calculate = () => {
    if (!lmp) return;
    const lmpDate = new Date(lmp);
    
    // Naegele's rule: LMP + 7 days - 3 months + 1 year (approx 280 days)
    // Adjusted for cycle length: + (CycleLength - 28)
    
    const cycleAdj = cycleLength - 28;
    const dueDate = addDays(lmpDate, 280 + cycleAdj);
    const conceptionDate = addDays(lmpDate, 14 + cycleAdj);
    
    // Determine trimester
    // 1st: 0-13 weeks
    // 2nd: 14-26 weeks
    // 3rd: 27-40 weeks
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - lmpDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    
    let trimester = "1st Trimester";
    if (weeks >= 14) trimester = "2nd Trimester";
    if (weeks >= 27) trimester = "3rd Trimester";

    setResult({ dueDate, conceptionDate, trimester });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Pregnancy Due Date Calculator</CardTitle>
        <CardDescription>Calculate your estimated due date based on your last menstrual period.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>First Day of Last Period (LMP)</Label>
          <Input type="date" value={lmp} onChange={(e) => setLmp(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Average Cycle Length (days)</Label>
          <Input type="number" value={cycleLength} onChange={(e) => setCycleLength(Number(e.target.value))} />
        </div>
        <Button className="w-full" onClick={calculate}>Calculate Due Date</Button>

        {result && (
          <div className="mt-6 space-y-4 text-center">
            <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg border border-pink-100 dark:border-pink-900">
              <p className="text-sm text-muted-foreground">Estimated Due Date</p>
              <p className="text-3xl font-bold text-pink-600 dark:text-pink-400">{format(result.dueDate, "MMMM d, yyyy")}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-2 bg-muted rounded">
                <p className="text-muted-foreground">Likely Conception</p>
                <p className="font-semibold">{format(result.conceptionDate, "MMM d, yyyy")}</p>
              </div>
              <div className="p-2 bg-muted rounded">
                <p className="text-muted-foreground">Current Stage</p>
                <p className="font-semibold">{result.trimester}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}