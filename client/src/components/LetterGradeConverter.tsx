import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const gradeData: Record<string, { gpa: number; percentageMin: number; percentageMax: number; description: string }> = {
  "A+": { gpa: 4.0, percentageMin: 97, percentageMax: 100, description: "Exceptional" },
  "A":  { gpa: 4.0, percentageMin: 93, percentageMax: 96, description: "Excellent" },
  "A-": { gpa: 3.7, percentageMin: 90, percentageMax: 92, description: "Very Good" },
  "B+": { gpa: 3.3, percentageMin: 87, percentageMax: 89, description: "Good" },
  "B":  { gpa: 3.0, percentageMin: 83, percentageMax: 86, description: "Above Average" },
  "B-": { gpa: 2.7, percentageMin: 80, percentageMax: 82, description: "Satisfactory" },
  "C+": { gpa: 2.3, percentageMin: 77, percentageMax: 79, description: "Average" },
  "C":  { gpa: 2.0, percentageMin: 73, percentageMax: 76, description: "Below Average" },
  "C-": { gpa: 1.7, percentageMin: 70, percentageMax: 72, description: "Marginal" },
  "D+": { gpa: 1.3, percentageMin: 67, percentageMax: 69, description: "Poor" },
  "D":  { gpa: 1.0, percentageMin: 63, percentageMax: 66, description: "Below Poor" },
  "D-": { gpa: 0.7, percentageMin: 60, percentageMax: 62, description: "Barely Passing" },
  "F":  { gpa: 0.0, percentageMin: 0, percentageMax: 59, description: "Failing" },
};

const grades = Object.keys(gradeData);

export default function LetterGradeConverter() {
  const [selectedGrade, setSelectedGrade] = useState("A");

  const data = gradeData[selectedGrade];

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Letter Grade Converter</CardTitle>
        <CardDescription>Convert letter grades to GPA (4.0 scale) and percentage equivalents.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Select Letter Grade</Label>
          <Select data-testid="select-grade" value={selectedGrade} onValueChange={setSelectedGrade}>
            <SelectTrigger data-testid="select-trigger-grade">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {grades.map((g) => (
                <SelectItem key={g} value={g} data-testid={`select-item-grade-${g}`}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="p-6 bg-muted rounded-lg space-y-4">
          <div className="text-center space-y-2">
            <p data-testid="text-selected-grade" className="text-5xl font-bold text-primary">
              {selectedGrade}
            </p>
            <p data-testid="text-grade-description" className="text-muted-foreground">
              {data.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="text-center space-y-1">
              <p className="text-xs text-muted-foreground uppercase">GPA Equivalent</p>
              <p data-testid="text-gpa" className="text-3xl font-bold">
                {data.gpa.toFixed(1)}
              </p>
              <p className="text-xs text-muted-foreground">out of 4.0</p>
            </div>
            <div className="text-center space-y-1">
              <p className="text-xs text-muted-foreground uppercase">Percentage Range</p>
              <p data-testid="text-percentage-range" className="text-3xl font-bold">
                {data.percentageMin}–{data.percentageMax}%
              </p>
              <p className="text-xs text-muted-foreground">typical range</p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="text-left p-2 font-medium">Grade</th>
                <th className="text-center p-2 font-medium">GPA</th>
                <th className="text-center p-2 font-medium">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g) => (
                <tr
                  key={g}
                  className={`border-t ${g === selectedGrade ? 'bg-primary/10 font-semibold' : ''}`}
                  data-testid={`row-grade-${g}`}
                >
                  <td className="p-2">{g}</td>
                  <td className="p-2 text-center">{gradeData[g].gpa.toFixed(1)}</td>
                  <td className="p-2 text-center">{gradeData[g].percentageMin}–{gradeData[g].percentageMax}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}