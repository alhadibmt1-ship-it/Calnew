import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function MacroCalculator() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState(25);
  const [weight, setWeight] = useState(70); // kg
  const [height, setHeight] = useState(175); // cm
  const [activity, setActivity] = useState("1.2");
  const [goal, setGoal] = useState("maintain");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    // Mifflin-St Jeor Equation for BMR
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    if (gender === "male") {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    // TDEE
    const tdee = bmr * parseFloat(activity);
    
    // Goal Adjustment
    let targetCalories = tdee;
    if (goal === "cut") targetCalories -= 500;
    if (goal === "bulk") targetCalories += 500;

    // Macro Split (Balanced: 30% P, 35% C, 35% F approx, or standard 40/40/20)
    // Let's use a standard moderate split: 30% Protein, 35% Carb, 35% Fat
    const protein = Math.round((targetCalories * 0.30) / 4);
    const carbs = Math.round((targetCalories * 0.35) / 4);
    const fats = Math.round((targetCalories * 0.35) / 9);

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories: Math.round(targetCalories),
      protein,
      carbs,
      fats
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Macro & TDEE Calculator</CardTitle>
        <CardDescription>Calculate your daily calorie needs and macronutrient split.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup value={gender} onValueChange={setGender} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="m" />
                  <Label htmlFor="m">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="f" />
                  <Label htmlFor="f">Female</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Age</Label>
                <Input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Height (cm)</Label>
                <Input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Weight (kg)</Label>
              <Input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Activity Level</Label>
              <Select value={activity} onValueChange={setActivity}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1.2">Sedentary (Office job)</SelectItem>
                  <SelectItem value="1.375">Light Exercise (1-2 days/wk)</SelectItem>
                  <SelectItem value="1.55">Moderate Exercise (3-5 days/wk)</SelectItem>
                  <SelectItem value="1.725">Heavy Exercise (6-7 days/wk)</SelectItem>
                  <SelectItem value="1.9">Athlete (2x per day)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Goal</Label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cut">Lose Weight (-500 cal)</SelectItem>
                  <SelectItem value="maintain">Maintain Weight</SelectItem>
                  <SelectItem value="bulk">Gain Muscle (+500 cal)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full mt-4" onClick={calculate}>Calculate Macros</Button>
          </div>
        </div>

        {result && (
          <div className="mt-8 pt-6 border-t animate-in fade-in-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Target Calories</p>
                <p className="text-3xl font-bold text-primary">{result.targetCalories}</p>
                <p className="text-xs text-muted-foreground">kcal/day</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">BMR</p>
                <p className="text-xl font-bold">{result.bmr}</p>
                <p className="text-xs text-muted-foreground">kcal</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">TDEE</p>
                <p className="text-xl font-bold">{result.tdee}</p>
                <p className="text-xs text-muted-foreground">kcal</p>
              </div>
            </div>

            <h3 className="font-semibold mb-4 text-center">Daily Macro Targets</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 border border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-900 rounded-lg">
                <p className="font-bold text-red-600 dark:text-red-400">{result.protein}g</p>
                <p className="text-xs text-muted-foreground">Protein</p>
              </div>
              <div className="p-3 border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10 dark:border-yellow-900 rounded-lg">
                <p className="font-bold text-yellow-600 dark:text-yellow-400">{result.carbs}g</p>
                <p className="text-xs text-muted-foreground">Carbs</p>
              </div>
              <div className="p-3 border border-blue-200 bg-blue-50 dark:bg-blue-900/10 dark:border-blue-900 rounded-lg">
                <p className="font-bold text-blue-600 dark:text-blue-400">{result.fats}g</p>
                <p className="text-xs text-muted-foreground">Fats</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}