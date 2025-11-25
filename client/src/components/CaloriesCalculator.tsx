import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CaloriesCalculator() {
  const [unit, setUnit] = useState<"metric" | "us">("us");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [activity, setActivity] = useState("1.2");
  const [result, setResult] = useState<{
    maintenance: number;
    mildLoss: number;
    loss: number;
    extremeLoss: number;
  } | null>(null);

  const calculateCalories = () => {
    let h = 0; // cm
    let w = 0; // kg

    if (unit === "metric") {
      h = parseFloat(height);
      w = parseFloat(weight);
    } else {
      h = (parseFloat(feet) * 12 + parseFloat(inches)) * 2.54;
      w = parseFloat(weight) * 0.453592;
    }

    const a = parseFloat(age);

    if (h > 0 && w > 0 && a > 0) {
      // Mifflin-St Jeor Equation
      let bmr = 10 * w + 6.25 * h - 5 * a;
      if (gender === "male") {
        bmr += 5;
      } else {
        bmr -= 161;
      }

      const tdee = bmr * parseFloat(activity);

      setResult({
        maintenance: Math.round(tdee),
        mildLoss: Math.round(tdee * 0.9), // -10%
        loss: Math.round(tdee * 0.79),    // -21% (~0.5kg/week)
        extremeLoss: Math.round(tdee * 0.59) // -41% (~1kg/week)
      });
    }
  };

  const clearForm = () => {
    setAge("");
    setHeight("");
    setWeight("");
    setFeet("");
    setInches("");
    setResult(null);
  };

  return (
    <Card className="w-full border-t-4 border-t-orange-500">
      <CardHeader>
        <CardTitle>Calorie Calculator</CardTitle>
        <CardDescription>
          Estimate the number of calories you need to eat daily to maintain, lose, or gain weight.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="us" onValueChange={(v) => {
          setUnit(v as "metric" | "us");
          clearForm();
        }}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="us">US Units</TabsTrigger>
            <TabsTrigger value="metric">Metric Units</TabsTrigger>
          </TabsList>

          <div className="space-y-4">
            <div className="grid gap-2">
              <Label>Age</Label>
              <Input 
                type="number" 
                placeholder="25" 
                className="max-w-[120px]"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label>Gender</Label>
              <RadioGroup defaultValue="male" onValueChange={setGender} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="c-male" />
                  <Label htmlFor="c-male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="c-female" />
                  <Label htmlFor="c-female">Female</Label>
                </div>
              </RadioGroup>
            </div>

            {unit === "us" ? (
              <div className="grid gap-2">
                <Label>Height</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input 
                      type="number" 
                      placeholder="5" 
                      value={feet}
                      onChange={(e) => setFeet(e.target.value)}
                    />
                    <span className="absolute right-3 top-2.5 text-muted-foreground text-sm">ft</span>
                  </div>
                  <div className="relative flex-1">
                    <Input 
                      type="number" 
                      placeholder="10" 
                      value={inches}
                      onChange={(e) => setInches(e.target.value)}
                    />
                    <span className="absolute right-3 top-2.5 text-muted-foreground text-sm">in</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid gap-2">
                <Label>Height</Label>
                <div className="relative">
                  <Input 
                    type="number" 
                    placeholder="180" 
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                  <span className="absolute right-3 top-2.5 text-muted-foreground text-sm">cm</span>
                </div>
              </div>
            )}

            <div className="grid gap-2">
              <Label>Weight</Label>
              <div className="relative">
                <Input 
                  type="number" 
                  placeholder={unit === "us" ? "160" : "75"} 
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
                <span className="absolute right-3 top-2.5 text-muted-foreground text-sm">
                  {unit === "us" ? "lbs" : "kg"}
                </span>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Activity Level</Label>
              <Select value={activity} onValueChange={setActivity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1.2">Sedentary (little or no exercise)</SelectItem>
                  <SelectItem value="1.375">Lightly active (exercise 1-3 days/week)</SelectItem>
                  <SelectItem value="1.55">Moderately active (exercise 4-5 days/week)</SelectItem>
                  <SelectItem value="1.725">Active (exercise 6-7 days/week)</SelectItem>
                  <SelectItem value="1.9">Very active (hard exercise 6-7 days/week)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={calculateCalories} className="flex-1 text-base bg-orange-500 hover:bg-orange-600 text-white">Calculate</Button>
              <Button onClick={clearForm} variant="outline" className="flex-1">Clear</Button>
            </div>

            {result && (
              <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-top-4">
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-800">
                  <p className="text-sm text-muted-foreground uppercase tracking-wide font-semibold text-center mb-1">Maintenance Calories</p>
                  <p className="text-4xl font-bold text-orange-600 dark:text-orange-400 text-center">{result.maintenance} <span className="text-lg font-medium text-muted-foreground">kcal/day</span></p>
                </div>

                <div className="grid gap-3">
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded border">
                    <span className="font-medium">Mild Weight Loss <span className="text-xs text-muted-foreground font-normal block">(0.25 kg/week)</span></span>
                    <span className="font-bold text-green-600">{result.mildLoss}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded border">
                    <span className="font-medium">Weight Loss <span className="text-xs text-muted-foreground font-normal block">(0.5 kg/week)</span></span>
                    <span className="font-bold text-green-600">{result.loss}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded border">
                    <span className="font-medium">Extreme Weight Loss <span className="text-xs text-muted-foreground font-normal block">(1 kg/week)</span></span>
                    <span className="font-bold text-green-600">{result.extremeLoss}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}