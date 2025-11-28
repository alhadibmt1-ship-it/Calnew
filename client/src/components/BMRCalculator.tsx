import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BMRCalculator() {
  const [unit, setUnit] = useState("metric");
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState(""); // cm or ft
  const [heightInches, setHeightInches] = useState(""); // inches (only for imperial)
  const [weight, setWeight] = useState(""); // kg or lbs
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const a = parseFloat(age);
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (!a || !h || !w) return;

    let weightKg = w;
    let heightCm = h;

    if (unit === "imperial") {
      weightKg = w * 0.453592;
      const hInch = parseFloat(heightInches) || 0;
      heightCm = ((h * 12) + hInch) * 2.54;
    }

    // Mifflin-St Jeor Equation
    let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * a);
    
    if (gender === "male") {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    setResult(Math.round(bmr));
  };

  return (
    <Card className="w-full border-t-4 border-t-rose-500">
      <CardHeader>
        <CardTitle>BMR Calculator</CardTitle>
        <CardDescription>Calculate your Basal Metabolic Rate (calories burned at rest).</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center pb-4">
          <TabsToggle value={unit} onChange={setUnit} options={[
            { value: "metric", label: "Metric (kg/cm)" },
            { value: "imperial", label: "Imperial (lbs/ft)" }
          ]} />
        </div>

        <div className="grid gap-6">
          <div className="space-y-3">
            <Label>Gender</Label>
            <RadioGroup value={gender} onValueChange={setGender} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Age (years)</Label>
              <Input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="25" />
            </div>
            <div className="space-y-2">
              <Label>Weight ({unit === "metric" ? "kg" : "lbs"})</Label>
              <Input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder={unit === "metric" ? "70" : "154"} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Height</Label>
            {unit === "metric" ? (
              <Input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="170" />
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <Input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="Feet" />
                <Input type="number" value={heightInches} onChange={e => setHeightInches(e.target.value)} placeholder="Inches" />
              </div>
            )}
          </div>
        </div>

        <Button onClick={calculate} className="w-full bg-rose-600 hover:bg-rose-700">Calculate BMR</Button>

        {result && (
          <div className="mt-6 p-6 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 rounded-xl text-center">
            <p className="text-sm text-muted-foreground uppercase font-medium mb-2">Your BMR</p>
            <p className="text-4xl font-bold text-rose-600 dark:text-rose-400">
              {result.toLocaleString()} <span className="text-lg text-muted-foreground font-normal">Calories/day</span>
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              This is the number of calories your body burns while at complete rest.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function TabsToggle({ value, onChange, options }: any) {
  return (
    <div className="inline-flex bg-muted p-1 rounded-lg">
      {options.map((opt: any) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
            value === opt.value 
              ? "bg-background text-foreground shadow-sm" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}