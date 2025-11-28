import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { intervalToDuration } from "date-fns";

export default function AgeGapCalculator() {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    if (!date1 || !date2) return;
    
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    
    const start = d1 < d2 ? d1 : d2;
    const end = d1 < d2 ? d2 : d1;
    
    const duration = intervalToDuration({ start, end });
    
    setResult(`${duration.years} years, ${duration.months} months, and ${duration.days} days`);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Age Gap Calculator</CardTitle>
        <CardDescription>Calculate the age difference between two people.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Person 1 Birth Date</Label>
          <Input type="date" value={date1} onChange={(e) => setDate1(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Person 2 Birth Date</Label>
          <Input type="date" value={date2} onChange={(e) => setDate2(e.target.value)} />
        </div>
        <Button className="w-full" onClick={calculate}>Calculate Gap</Button>
        
        {result && (
          <div className="mt-4 p-4 bg-muted rounded-lg text-center">
            <p className="text-sm text-muted-foreground">The age difference is</p>
            <p className="text-xl font-bold text-primary">{result}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}