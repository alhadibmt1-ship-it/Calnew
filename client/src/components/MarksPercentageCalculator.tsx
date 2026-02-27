import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function getGrade(percentage: number): string {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B+";
  if (percentage >= 60) return "B";
  if (percentage >= 50) return "C";
  if (percentage >= 40) return "D";
  return "F";
}

function getGradeColor(grade: string): string {
  if (grade === "A+" || grade === "A") return "text-green-600";
  if (grade === "B+" || grade === "B") return "text-blue-600";
  if (grade === "C") return "text-yellow-600";
  if (grade === "D") return "text-orange-600";
  return "text-destructive";
}

export default function MarksPercentageCalculator() {
  const [obtainedMarks, setObtainedMarks] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [result, setResult] = useState<{
    percentage: number;
    grade: string;
    passed: boolean;
  } | null>(null);

  const calculate = () => {
    const obtained = parseFloat(obtainedMarks) || 0;
    const total = parseFloat(totalMarks) || 0;

    if (total <= 0) return;

    const percentage = (obtained / total) * 100;
    const grade = getGrade(percentage);
    const passed = percentage >= 40;

    setResult({ percentage, grade, passed });
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Marks Percentage Calculator</CardTitle>
        <CardDescription>Convert your obtained marks to percentage, see your grade, and check pass/fail status.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Obtained Marks</Label>
            <Input
              data-testid="input-obtained-marks"
              type="number"
              min="0"
              value={obtainedMarks}
              onChange={(e) => setObtainedMarks(e.target.value)}
              placeholder="e.g. 450"
            />
          </div>
          <div className="space-y-2">
            <Label>Total Marks</Label>
            <Input
              data-testid="input-total-marks"
              type="number"
              min="0"
              value={totalMarks}
              onChange={(e) => setTotalMarks(e.target.value)}
              placeholder="e.g. 500"
            />
          </div>
          <Button data-testid="button-calculate" className="w-full" onClick={calculate}>Calculate Percentage</Button>
        </div>

        {result !== null && (
          <div className="mt-6 p-6 bg-muted rounded-lg space-y-4">
            <div className="text-center space-y-2">
              <p className="text-muted-foreground">Your Percentage</p>
              <p data-testid="text-percentage" className="text-4xl font-bold text-primary">
                {result.percentage.toFixed(2)}%
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="text-center space-y-1">
                <p className="text-xs text-muted-foreground uppercase">Grade</p>
                <p data-testid="text-grade" className={`text-3xl font-bold ${getGradeColor(result.grade)}`}>
                  {result.grade}
                </p>
              </div>
              <div className="text-center space-y-1">
                <p className="text-xs text-muted-foreground uppercase">Status</p>
                <p
                  data-testid="text-status"
                  className={`text-3xl font-bold ${result.passed ? 'text-green-600' : 'text-destructive'}`}
                >
                  {result.passed ? "PASS" : "FAIL"}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}