import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Course = {
  id: number;
  name: string;
  credits: number;
  grade: string;
};

const gradePoints: Record<string, number> = {
  "A+": 4.0, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0, "F": 0.0
};

export default function GPACalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: "Course 1", credits: 3, grade: "A" },
    { id: 2, name: "Course 2", credits: 3, grade: "B" },
    { id: 3, name: "Course 3", credits: 3, grade: "B+" },
    { id: 4, name: "Course 4", credits: 3, grade: "A-" },
  ]);

  const addCourse = () => {
    setCourses([...courses, { id: Date.now(), name: `Course ${courses.length + 1}`, credits: 3, grade: "B" }]);
  };

  const removeCourse = (id: number) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const updateCourse = (id: number, field: keyof Course, value: any) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(c => {
      const points = gradePoints[c.grade] || 0;
      totalPoints += points * c.credits;
      totalCredits += c.credits;
    });

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>GPA Calculator</CardTitle>
        <CardDescription>Calculate your semester or cumulative Grade Point Average (4.0 Scale).</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="grid grid-cols-[2fr,1fr,1fr,auto] gap-2 items-center">
              <Input 
                placeholder="Course Name" 
                value={course.name} 
                onChange={(e) => updateCourse(course.id, "name", e.target.value)} 
              />
              <div className="flex items-center gap-2">
                <Label className="sr-only">Credits</Label>
                <Input 
                  type="number" 
                  min="0.5" 
                  step="0.5"
                  value={course.credits} 
                  onChange={(e) => updateCourse(course.id, "credits", parseFloat(e.target.value))} 
                  placeholder="Credits"
                />
              </div>
              <Select value={course.grade} onValueChange={(v) => updateCourse(course.id, "grade", v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(gradePoints).map(g => (
                    <SelectItem key={g} value={g}>{g} ({gradePoints[g]})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="ghost" size="icon" onClick={() => removeCourse(course.id)} disabled={courses.length <= 1}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <Button variant="outline" onClick={addCourse} className="gap-2">
            <Plus className="h-4 w-4" /> Add Course
          </Button>
          
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Cumulative GPA</p>
            <p className="text-4xl font-bold text-primary">{calculateGPA()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}