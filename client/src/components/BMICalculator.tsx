import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export default function BMICalculator() {
  const [unit, setUnit] = useState<"metric" | "us">("us");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  const calculateBMI = () => {
    let h = 0; // in meters
    let w = 0; // in kg

    if (unit === "metric") {
      h = parseFloat(height) / 100;
      w = parseFloat(weight);
    } else {
      h = (parseFloat(feet) * 12 + parseFloat(inches)) * 0.0254;
      w = parseFloat(weight) * 0.453592;
    }

    if (h > 0 && w > 0) {
      const bmiValue = w / (h * h);
      setBmi(bmiValue);
      
      if (bmiValue < 18.5) setCategory("Underweight");
      else if (bmiValue < 25) setCategory("Normal weight");
      else if (bmiValue < 30) setCategory("Overweight");
      else setCategory("Obese");
    }
  };

  const clearForm = () => {
    setHeight("");
    setWeight("");
    setFeet("");
    setInches("");
    setBmi(null);
    setCategory(null);
  };

  return (
    <Card className="w-full border-t-4 border-t-primary">
      <CardHeader>
        <CardTitle>BMI Calculator</CardTitle>
        <CardDescription>
          Calculate your Body Mass Index (BMI) to find your healthy weight range.
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
              <Input type="number" placeholder="25" className="max-w-[120px]" />
            </div>

            <div className="grid gap-2">
              <Label>Gender</Label>
              <RadioGroup defaultValue="male" className="flex gap-4">
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

            <div className="flex gap-2 pt-4">
              <Button onClick={calculateBMI} className="flex-1 text-base">Calculate</Button>
              <Button onClick={clearForm} variant="outline" className="flex-1">Clear</Button>
            </div>

            {bmi !== null && (
              <div className="mt-6 p-4 bg-muted/50 rounded-lg border animate-in fade-in slide-in-from-top-4">
                <div className="text-center space-y-1">
                  <p className="text-sm text-muted-foreground uppercase tracking-wide font-semibold">Your BMI Result</p>
                  <p className="text-4xl font-bold text-primary">{bmi.toFixed(1)}</p>
                  <p className={cn(
                    "text-lg font-medium",
                    category === "Normal weight" ? "text-green-600" : "text-orange-500"
                  )}>
                    {category}
                  </p>
                </div>
                <div className="mt-4 h-2 w-full bg-slate-200 rounded-full overflow-hidden relative">
                  <div 
                    className="h-full bg-primary transition-all duration-500 ease-out"
                    style={{ width: `${Math.min(Math.max((bmi / 40) * 100, 0), 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Underweight</span>
                  <span>Normal</span>
                  <span>Over</span>
                  <span>Obese</span>
                </div>
              </div>
            )}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}