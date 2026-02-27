import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

type Semester = {
  id: number;
  sgpa: string;
  credits: string;
};

export default function CGPACalculator() {
  const [semesters, setSemesters] = useState<Semester[]>([
    { id: 1, sgpa: "8.5", credits: "20" },
    { id: 2, sgpa: "8.0", credits: "22" },
  ]);

  const addSemester = () => {
    setSemesters([...semesters, { id: Date.now(), sgpa: "", credits: "" }]);
  };

  const removeSemester = (id: number) => {
    setSemesters(semesters.filter((s) => s.id !== id));
  };

  const updateSemester = (id: number, field: keyof Semester, value: string) => {
    setSemesters(semesters.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const calculateCGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    semesters.forEach((s) => {
      const sgpa = parseFloat(s.sgpa) || 0;
      const credits = parseFloat(s.credits) || 0;
      totalPoints += sgpa * credits;
      totalCredits += credits;
    });

    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  };

  const cgpa = calculateCGPA();
  const percentage = cgpa * 9.5;
  const fourPointScale = Math.min(cgpa / 2.5, 4.0);

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>CGPA Calculator</CardTitle>
        <CardDescription>Calculate your Cumulative Grade Point Average from semester GPAs and credit hours. Also converts SGPA to percentage.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {semesters.map((semester, index) => (
            <div key={semester.id} className="grid grid-cols-[auto,1fr,1fr,auto] gap-2 items-center">
              <span className="text-sm text-muted-foreground w-8">S{index + 1}</span>
              <div className="space-y-1">
                <Label className="sr-only">SGPA</Label>
                <Input
                  data-testid={`input-sgpa-${index}`}
                  type="number"
                  min="0"
                  max="10"
                  step="0.01"
                  value={semester.sgpa}
                  onChange={(e) => updateSemester(semester.id, "sgpa", e.target.value)}
                  placeholder="SGPA"
                />
              </div>
              <div className="space-y-1">
                <Label className="sr-only">Credits</Label>
                <Input
                  data-testid={`input-credits-${index}`}
                  type="number"
                  min="0"
                  value={semester.credits}
                  onChange={(e) => updateSemester(semester.id, "credits", e.target.value)}
                  placeholder="Credits"
                />
              </div>
              <Button
                data-testid={`button-remove-semester-${index}`}
                variant="ghost"
                size="icon"
                onClick={() => removeSemester(semester.id)}
                disabled={semesters.length <= 1}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>

        <Button data-testid="button-add-semester" variant="outline" onClick={addSemester} className="w-full gap-2">
          <Plus className="h-4 w-4" /> Add Semester
        </Button>

        <div className="p-6 bg-muted rounded-lg space-y-4">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">Cumulative CGPA</p>
            <p data-testid="text-cgpa" className="text-4xl font-bold text-primary">
              {cgpa.toFixed(2)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="text-center space-y-1">
              <p className="text-xs text-muted-foreground uppercase">Percentage</p>
              <p data-testid="text-percentage" className="text-2xl font-bold">
                {percentage.toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground">CGPA × 9.5</p>
            </div>
            <div className="text-center space-y-1">
              <p className="text-xs text-muted-foreground uppercase">4.0 Scale (approx)</p>
              <p data-testid="text-four-point" className="text-2xl font-bold">
                {fourPointScale.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground">CGPA / 2.5</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}