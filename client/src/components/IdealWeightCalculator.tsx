import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function IdealWeightCalculator() {
  const [unit, setUnit] = useState("metric");
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState(""); // cm or ft
  const [heightInches, setHeightInches] = useState(""); // inches
  const [result, setResult] = useState<{
    robinson: number;
    miller: number;
    devine: number;
    hamwi: number;
  } | null>(null);

  const calculate = () => {
    let h = parseFloat(height);
    if (!h) return;

    let heightInInches = 0;

    if (unit === "metric") {
      // Convert cm to inches for formulas
      heightInInches = h / 2.54;
    } else {
      heightInInches = (h * 12) + (parseFloat(heightInches) || 0);
    }

    // Base height is 5ft (60 inches)
    const baseHeight = 60;
    const inchesOver5ft = Math.max(0, heightInInches - baseHeight);

    let robinson = 0;
    let miller = 0;
    let devine = 0;
    let hamwi = 0;

    if (gender === "male") {
      robinson = 52 + (1.9 * inchesOver5ft);
      miller = 56.2 + (1.41 * inchesOver5ft);
      devine = 50 + (2.3 * inchesOver5ft);
      hamwi = 48 + (2.7 * inchesOver5ft);
    } else {
      robinson = 49 + (1.7 * inchesOver5ft);
      miller = 53.1 + (1.36 * inchesOver5ft);
      devine = 45.5 + (2.3 * inchesOver5ft);
      hamwi = 45.5 + (2.2 * inchesOver5ft);
    }

    setResult({
      robinson,
      miller,
      devine,
      hamwi
    });
  };

  const formatWeight = (kg: number) => {
    if (unit === "imperial") {
      return `${(kg * 2.20462).toFixed(1)} lbs`;
    }
    return `${kg.toFixed(1)} kg`;
  };

  return (
    <Card className="w-full border-t-4 border-t-pink-500">
      <CardHeader>
        <CardTitle>Ideal Weight Calculator</CardTitle>
        <CardDescription>Calculate your ideal weight using 4 popular medical formulas.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center pb-2">
          <Tabs value={unit} onValueChange={setUnit} className="w-[200px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="metric">Metric</TabsTrigger>
              <TabsTrigger value="imperial">Imperial</TabsTrigger>
            </TabsList>
          </Tabs>
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

          <div className="space-y-2">
            <Label>Height</Label>
            {unit === "metric" ? (
              <div className="relative">
                <Input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="175" />
                <span className="absolute right-3 top-2.5 text-muted-foreground text-sm">cm</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="5" />
                  <span className="absolute right-3 top-2.5 text-muted-foreground text-sm">ft</span>
                </div>
                <div className="relative">
                  <Input type="number" value={heightInches} onChange={e => setHeightInches(e.target.value)} placeholder="9" />
                  <span className="absolute right-3 top-2.5 text-muted-foreground text-sm">in</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <Button onClick={calculate} className="w-full bg-pink-600 hover:bg-pink-700">Calculate Ideal Weight</Button>

        {result && (
          <div className="grid sm:grid-cols-2 gap-4 pt-4">
            <ResultBox label="Robinson Formula (1983)" value={formatWeight(result.robinson)} />
            <ResultBox label="Miller Formula (1983)" value={formatWeight(result.miller)} />
            <ResultBox label="Devine Formula (1974)" value={formatWeight(result.devine)} highlight />
            <ResultBox label="Hamwi Formula (1964)" value={formatWeight(result.hamwi)} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ResultBox({ label, value, highlight = false }: { label: string, value: string, highlight?: boolean }) {
  return (
    <div className={`p-4 rounded-lg border ${highlight ? 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 shadow-sm' : 'bg-muted/30'}`}>
      <p className="text-xs text-muted-foreground uppercase font-medium mb-1">{label}</p>
      <p className={`text-xl font-bold ${highlight ? 'text-pink-700 dark:text-pink-400' : ''}`}>
        {value}
      </p>
    </div>
  );
}