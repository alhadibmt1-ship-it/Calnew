import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function WaterIntakeCalculator() {
  const [weight, setWeight] = useState(70); // kg
  const [activity, setActivity] = useState(30); // minutes
  const [climate, setClimate] = useState("temperate"); // temperate, hot
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    // Basic formula: Weight (kg) * 0.033
    let intake = weight * 0.033;
    
    // Activity adjustment: +0.35 liters for every 30 mins of exercise
    intake += (activity / 30) * 0.35;
    
    // Climate adjustment
    if (climate === "hot") {
      intake += 0.5;
    }

    setResult(intake);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Water Intake Calculator</CardTitle>
        <CardDescription>Estimate your daily hydration needs.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Weight (kg)</Label>
          <Input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} />
        </div>
        <div className="space-y-2">
          <Label>Daily Exercise (minutes)</Label>
          <Input type="number" value={activity} onChange={(e) => setActivity(Number(e.target.value))} />
        </div>
        <div className="space-y-2">
          <Label>Climate</Label>
          <Select value={climate} onValueChange={setClimate}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="temperate">Temperate / Normal</SelectItem>
              <SelectItem value="hot">Hot / Humid</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="w-full" onClick={calculate}>Calculate Intake</Button>

        {result && (
          <div className="mt-6 text-center space-y-2">
             <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-full w-48 h-48 mx-auto flex flex-col justify-center items-center border-4 border-blue-100 dark:border-blue-800">
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{result.toFixed(1)} L</p>
                <p className="text-sm text-muted-foreground">Daily Goal</p>
             </div>
             <p className="text-sm text-muted-foreground">
               (~{Math.round(result * 33.8)} oz or {Math.round(result * 4.2)} cups)
             </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}