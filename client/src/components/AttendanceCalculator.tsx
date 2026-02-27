import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AttendanceCalculator() {
  const [totalClasses, setTotalClasses] = useState("");
  const [attendedClasses, setAttendedClasses] = useState("");
  const [targetPercentage, setTargetPercentage] = useState("75");
  const [result, setResult] = useState<{
    currentPercentage: number;
    classesNeeded: number;
    classesCanSkip: number;
  } | null>(null);

  const calculate = () => {
    const total = parseInt(totalClasses) || 0;
    const attended = parseInt(attendedClasses) || 0;
    const target = parseFloat(targetPercentage) || 75;

    if (total <= 0) return;

    const currentPercentage = (attended / total) * 100;

    let classesNeeded = 0;
    if (currentPercentage < target) {
      classesNeeded = Math.ceil((target * total - 100 * attended) / (100 - target));
    }

    let classesCanSkip = 0;
    if (currentPercentage >= target) {
      classesCanSkip = Math.floor((attended * 100 - target * total) / target);
    }

    setResult({ currentPercentage, classesNeeded, classesCanSkip });
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Attendance Calculator</CardTitle>
        <CardDescription>Calculate your attendance percentage, how many classes you need to attend to reach your target, or how many you can skip.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Total Classes</Label>
            <Input
              data-testid="input-total-classes"
              type="number"
              min="0"
              value={totalClasses}
              onChange={(e) => setTotalClasses(e.target.value)}
              placeholder="e.g. 100"
            />
          </div>
          <div className="space-y-2">
            <Label>Classes Attended</Label>
            <Input
              data-testid="input-attended-classes"
              type="number"
              min="0"
              value={attendedClasses}
              onChange={(e) => setAttendedClasses(e.target.value)}
              placeholder="e.g. 70"
            />
          </div>
          <div className="space-y-2">
            <Label>Target Attendance (%)</Label>
            <Input
              data-testid="input-target-percentage"
              type="number"
              min="0"
              max="100"
              value={targetPercentage}
              onChange={(e) => setTargetPercentage(e.target.value)}
              placeholder="75"
            />
          </div>
          <Button data-testid="button-calculate" className="w-full" onClick={calculate}>Calculate Attendance</Button>
        </div>

        {result !== null && (
          <div className="mt-6 p-6 bg-muted rounded-lg space-y-4">
            <div className="text-center space-y-2">
              <p className="text-muted-foreground">Current Attendance</p>
              <p
                data-testid="text-current-percentage"
                className={`text-4xl font-bold ${result.currentPercentage >= parseFloat(targetPercentage) ? 'text-green-600' : 'text-destructive'}`}
              >
                {result.currentPercentage.toFixed(1)}%
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="text-center space-y-1">
                <p className="text-xs text-muted-foreground uppercase">Classes to Attend</p>
                <p data-testid="text-classes-needed" className="text-2xl font-bold text-primary">
                  {result.classesNeeded > 0 ? result.classesNeeded : "0"}
                </p>
                <p className="text-xs text-muted-foreground">to reach {targetPercentage}%</p>
              </div>
              <div className="text-center space-y-1">
                <p className="text-xs text-muted-foreground uppercase">Classes Can Skip</p>
                <p data-testid="text-classes-can-skip" className="text-2xl font-bold text-green-600">
                  {result.classesCanSkip > 0 ? result.classesCanSkip : "0"}
                </p>
                <p className="text-xs text-muted-foreground">and stay above {targetPercentage}%</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}