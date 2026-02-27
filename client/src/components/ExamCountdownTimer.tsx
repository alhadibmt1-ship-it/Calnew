import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Exam {
  id: number;
  name: string;
  date: string;
}

interface CountdownResult {
  name: string;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export default function ExamCountdownTimer() {
  const [exams, setExams] = useState<Exam[]>([{ id: 1, name: "", date: "" }]);
  const [countdowns, setCountdowns] = useState<CountdownResult[]>([]);

  const addExam = () => {
    setExams([...exams, { id: Date.now(), name: "", date: "" }]);
  };

  const removeExam = (id: number) => {
    if (exams.length > 1) {
      setExams(exams.filter((e) => e.id !== id));
    }
  };

  const updateExam = (id: number, field: keyof Exam, value: string) => {
    setExams(exams.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  useEffect(() => {
    const validExams = exams.filter((e) => e.date);
    if (validExams.length === 0) {
      setCountdowns([]);
      return;
    }

    const calculateCountdowns = () => {
      const now = new Date();
      const results: CountdownResult[] = validExams.map((exam) => {
        const examDate = new Date(exam.date + "T00:00:00");
        const diff = examDate.getTime() - now.getTime();
        const isPast = diff < 0;
        const absDiff = Math.abs(diff);

        const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((absDiff % (1000 * 60)) / 1000);

        return {
          name: exam.name || "Unnamed Exam",
          days,
          hours,
          minutes,
          seconds,
          isPast,
        };
      });
      setCountdowns(results);
    };

    calculateCountdowns();
    const interval = setInterval(calculateCountdowns, 1000);
    return () => clearInterval(interval);
  }, [exams]);

  return (
    <Card className="w-full border-t-4 border-t-red-500">
      <CardHeader>
        <CardTitle data-testid="text-title">Exam Countdown Timer</CardTitle>
        <CardDescription>
          Set your exam dates and see a live countdown with days, hours, minutes, and seconds remaining.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label className="text-base font-semibold">Your Exams</Label>
          {exams.map((exam, index) => (
            <div key={exam.id} className="flex gap-2 items-end">
              <div className="flex-1 space-y-1">
                {index === 0 && <Label className="text-xs">Exam Name</Label>}
                <Input
                  data-testid={`input-exam-name-${index}`}
                  placeholder={`Exam ${index + 1}`}
                  value={exam.name}
                  onChange={(e) => updateExam(exam.id, "name", e.target.value)}
                />
              </div>
              <div className="w-44 space-y-1">
                {index === 0 && <Label className="text-xs">Date</Label>}
                <Input
                  data-testid={`input-exam-date-${index}`}
                  type="date"
                  value={exam.date}
                  onChange={(e) => updateExam(exam.id, "date", e.target.value)}
                />
              </div>
              {exams.length > 1 && (
                <Button
                  data-testid={`button-remove-exam-${index}`}
                  variant="outline"
                  size="icon"
                  onClick={() => removeExam(exam.id)}
                  className="shrink-0"
                >
                  ✕
                </Button>
              )}
            </div>
          ))}
          <Button data-testid="button-add-exam" variant="outline" onClick={addExam} className="w-full">
            + Add Exam
          </Button>
        </div>

        {countdowns.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Countdowns</h3>
            {countdowns.map((cd, index) => (
              <div
                key={index}
                data-testid={`text-countdown-${index}`}
                className={`p-4 rounded-xl ${cd.isPast ? "bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800" : "bg-slate-50 dark:bg-slate-900"}`}
              >
                <p className="font-medium mb-3">
                  {cd.name}
                  {cd.isPast && <span className="text-red-500 text-sm ml-2">(Passed)</span>}
                </p>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-white dark:bg-slate-800 p-2 rounded-lg border">
                    <div className={`text-2xl font-bold ${cd.isPast ? "text-red-500" : "text-red-600"}`}>{cd.days}</div>
                    <div className="text-xs text-muted-foreground">Days</div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-2 rounded-lg border">
                    <div className={`text-2xl font-bold ${cd.isPast ? "text-red-500" : "text-red-600"}`}>{cd.hours}</div>
                    <div className="text-xs text-muted-foreground">Hours</div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-2 rounded-lg border">
                    <div className={`text-2xl font-bold ${cd.isPast ? "text-red-500" : "text-red-600"}`}>{cd.minutes}</div>
                    <div className="text-xs text-muted-foreground">Mins</div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-2 rounded-lg border">
                    <div className={`text-2xl font-bold ${cd.isPast ? "text-red-500" : "text-red-600"}`}>{cd.seconds}</div>
                    <div className="text-xs text-muted-foreground">Secs</div>
                  </div>
                </div>
                {!cd.isPast && cd.days > 0 && (
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    {cd.days <= 7 ? "⚠️ Less than a week left!" : cd.days <= 30 ? "📚 Time to start preparing!" : "✅ You have plenty of time."}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {countdowns.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            Add exam names and dates to start the countdown!
          </div>
        )}
      </CardContent>
    </Card>
  );
}
