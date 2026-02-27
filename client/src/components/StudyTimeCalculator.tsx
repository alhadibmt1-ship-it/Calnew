import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Subject {
  id: number;
  name: string;
  difficulty: "easy" | "medium" | "hard";
}

export default function StudyTimeCalculator() {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 1, name: "", difficulty: "medium" },
  ]);
  const [hoursPerDay, setHoursPerDay] = useState("");
  const [daysUntilExam, setDaysUntilExam] = useState("");
  const [result, setResult] = useState<{ name: string; hours: number; hoursPerDay: number }[] | null>(null);

  const addSubject = () => {
    setSubjects([...subjects, { id: Date.now(), name: "", difficulty: "medium" }]);
  };

  const removeSubject = (id: number) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter((s) => s.id !== id));
    }
  };

  const updateSubject = (id: number, field: keyof Subject, value: string) => {
    setSubjects(subjects.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const calculate = () => {
    const hours = parseFloat(hoursPerDay);
    const days = parseInt(daysUntilExam);

    if (hours > 0 && days > 0 && subjects.length > 0) {
      const totalAvailableHours = hours * days;

      const difficultyWeights: Record<string, number> = {
        easy: 1,
        medium: 2,
        hard: 3,
      };

      const totalWeight = subjects.reduce((sum, s) => sum + difficultyWeights[s.difficulty], 0);

      const allocation = subjects.map((s) => {
        const weight = difficultyWeights[s.difficulty];
        const subjectHours = Math.round((weight / totalWeight) * totalAvailableHours * 10) / 10;
        const subjectHoursPerDay = Math.round((subjectHours / days) * 10) / 10;
        return {
          name: s.name || `Subject ${subjects.indexOf(s) + 1}`,
          hours: subjectHours,
          hoursPerDay: subjectHoursPerDay,
        };
      });

      setResult(allocation);
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-green-600">
      <CardHeader>
        <CardTitle data-testid="text-title">Study Time Calculator</CardTitle>
        <CardDescription>
          Plan your study hours based on subjects, difficulty levels, and time available before exams.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label className="text-base font-semibold">Subjects</Label>
          {subjects.map((subject, index) => (
            <div key={subject.id} className="flex gap-2 items-end">
              <div className="flex-1 space-y-1">
                {index === 0 && <Label className="text-xs">Name</Label>}
                <Input
                  data-testid={`input-subject-name-${index}`}
                  placeholder={`Subject ${index + 1}`}
                  value={subject.name}
                  onChange={(e) => updateSubject(subject.id, "name", e.target.value)}
                />
              </div>
              <div className="w-32 space-y-1">
                {index === 0 && <Label className="text-xs">Difficulty</Label>}
                <Select
                  value={subject.difficulty}
                  onValueChange={(v) => updateSubject(subject.id, "difficulty", v)}
                >
                  <SelectTrigger data-testid={`select-difficulty-${index}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {subjects.length > 1 && (
                <Button
                  data-testid={`button-remove-subject-${index}`}
                  variant="outline"
                  size="icon"
                  onClick={() => removeSubject(subject.id)}
                  className="shrink-0"
                >
                  ✕
                </Button>
              )}
            </div>
          ))}
          <Button data-testid="button-add-subject" variant="outline" onClick={addSubject} className="w-full">
            + Add Subject
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Hours Available Per Day</Label>
            <Input
              data-testid="input-hours-per-day"
              type="number"
              placeholder="6"
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Days Until Exam</Label>
            <Input
              data-testid="input-days-until-exam"
              type="number"
              placeholder="14"
              value={daysUntilExam}
              onChange={(e) => setDaysUntilExam(e.target.value)}
            />
          </div>
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full bg-green-600 hover:bg-green-700">
          Calculate Study Plan
        </Button>

        {result && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Recommended Study Plan</h3>
            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 space-y-3">
              <div className="text-sm text-muted-foreground mb-2">
                Total available: <span className="font-medium text-foreground">{(parseFloat(hoursPerDay) * parseInt(daysUntilExam)).toFixed(0)} hours</span> over {daysUntilExam} days
              </div>
              {result.map((item, index) => (
                <div key={index} data-testid={`text-subject-result-${index}`} className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg border">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.hoursPerDay} hrs/day</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-green-600">{item.hours} hrs</p>
                    <p className="text-xs text-muted-foreground">total</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!result && (
          <div className="text-center text-muted-foreground py-8">
            Add subjects and enter your available time to get a study plan.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
