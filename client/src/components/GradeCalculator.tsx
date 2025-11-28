import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function GradeCalculator() {
  const [currentGrade, setCurrentGrade] = useState(85);
  const [targetGrade, setTargetGrade] = useState(90);
  const [finalWeight, setFinalWeight] = useState(30);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    // Formula: (Target - (Current * (1 - Weight/100))) / (Weight/100)
    const w = finalWeight / 100;
    const currentPart = currentGrade * (1 - w);
    const required = (targetGrade - currentPart) / w;
    setResult(required);
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Grade Calculator</CardTitle>
        <CardDescription>Calculate what you need on your final exam to reach your target grade.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Current Grade (%)</Label>
            <Input type="number" value={currentGrade} onChange={(e) => setCurrentGrade(Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label>Target Grade (%)</Label>
            <Input type="number" value={targetGrade} onChange={(e) => setTargetGrade(Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label>Final Exam Weight (%)</Label>
            <Input type="number" value={finalWeight} onChange={(e) => setFinalWeight(Number(e.target.value))} />
          </div>
          <Button className="w-full" onClick={calculate}>Calculate Required Grade</Button>
        </div>

        {result !== null && (
          <div className="mt-6 p-6 bg-muted rounded-lg text-center space-y-2">
            <p className="text-muted-foreground">You need to score at least</p>
            <p className={`text-4xl font-bold ${result > 100 ? 'text-destructive' : 'text-primary'}`}>
              {result.toFixed(1)}%
            </p>
            <p className="text-sm text-muted-foreground">on your final exam.</p>
            {result > 100 && (
              <p className="text-xs text-destructive font-medium mt-2">
                (Tip: You might need extra credit!)
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}