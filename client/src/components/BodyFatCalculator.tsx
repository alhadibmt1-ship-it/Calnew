import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BodyFatCalculator() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState(30);
  const [weight, setWeight] = useState(70); // kg
  const [height, setHeight] = useState(175); // cm
  const [neck, setNeck] = useState(38); // cm
  const [waist, setWaist] = useState(85); // cm
  const [hip, setHip] = useState(95); // cm (only for female)
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    // US Navy Method
    // Male: 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450
    // Female: 495 / (1.29579 - 0.35004 * log10(waist + hip - neck) + 0.22100 * log10(height)) - 450
    
    // Inputs in cm
    let bf = 0;
    if (gender === "male") {
      bf = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    } else {
      bf = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
    }

    setResult(Math.max(2, bf)); // Clamp min
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Body Fat Calculator</CardTitle>
        <CardDescription>Estimate your body fat percentage using the US Navy method.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
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

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Weight (kg)</Label>
            <Input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label>Neck (cm)</Label>
            <Input type="number" value={neck} onChange={(e) => setNeck(Number(e.target.value))} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Waist (cm)</Label>
            <Input type="number" value={waist} onChange={(e) => setWaist(Number(e.target.value))} />
          </div>
          {gender === "female" && (
            <div className="space-y-2">
              <Label>Hip (cm)</Label>
              <Input type="number" value={hip} onChange={(e) => setHip(Number(e.target.value))} />
            </div>
          )}
        </div>

        <Button className="w-full" onClick={calculate}>Calculate Body Fat</Button>

        {result && (
          <div className="mt-6 p-6 bg-muted rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Estimated Body Fat</p>
            <p className="text-4xl font-bold text-primary">{result.toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground mt-2">
              {gender === "male" 
                ? (result < 6 ? "Essential Fat" : result < 14 ? "Athletes" : result < 18 ? "Fitness" : result < 25 ? "Average" : "Obese")
                : (result < 14 ? "Essential Fat" : result < 21 ? "Athletes" : result < 25 ? "Fitness" : result < 32 ? "Average" : "Obese")
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}