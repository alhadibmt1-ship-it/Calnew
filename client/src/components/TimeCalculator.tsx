import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { add, sub, format } from "date-fns";

export default function TimeCalculator() {
  const [baseTime, setBaseTime] = useState("12:00");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [operation, setOperation] = useState<"add" | "subtract">("add");
  const [result, setResult] = useState("");

  const calculate = () => {
    const [h, m] = baseTime.split(':').map(Number);
    const date = new Date();
    date.setHours(h, m, 0);

    const duration = { hours, minutes };
    
    let newDate;
    if (operation === "add") {
      newDate = add(date, duration);
    } else {
      newDate = sub(date, duration);
    }

    setResult(format(newDate, "hh:mm a"));
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Time Calculator</CardTitle>
        <CardDescription>Add or subtract hours and minutes from a specific time.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Start Time</Label>
          <Input type="time" value={baseTime} onChange={(e) => setBaseTime(e.target.value)} />
        </div>

        <div className="grid grid-cols-[1fr,1fr,1fr] gap-4">
          <div className="space-y-2">
            <Label>Operation</Label>
            <Select value={operation} onValueChange={(v: any) => setOperation(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="add">Add (+)</SelectItem>
                <SelectItem value="subtract">Subtract (-)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Hours</Label>
            <Input type="number" min="0" value={hours} onChange={(e) => setHours(Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label>Minutes</Label>
            <Input type="number" min="0" value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} />
          </div>
        </div>

        <Button className="w-full" onClick={calculate}>Calculate Time</Button>

        {result && (
          <div className="p-4 bg-muted rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Result Time</p>
            <p className="text-3xl font-bold text-primary">{result}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}