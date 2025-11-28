import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addMinutes, subMinutes, format } from "date-fns";

export default function SleepCalculator() {
  const [time, setTime] = useState("07:00");
  const [mode, setMode] = useState("wake"); // wake = I want to wake up at... | sleep = I am going to sleep at...
  const [results, setResults] = useState<Date[]>([]);

  const calculate = () => {
    const [h, m] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(h, m, 0);
    
    // Sleep cycles are approx 90 minutes.
    // Average person takes 15 mins to fall asleep.
    
    const cycles = [4, 5, 6]; // 6h, 7.5h, 9h
    const times: Date[] = [];

    if (mode === "wake") {
      // Calculate backward from wake time
      // Wake time - (Cycle * 90) - 15 mins
      cycles.reverse().forEach(c => {
        const sleepTime = subMinutes(date, (c * 90) + 15);
        times.push(sleepTime);
      });
    } else {
      // Calculate forward from sleep time
      // Sleep time + 15 mins + (Cycle * 90)
      cycles.forEach(c => {
        const wakeTime = addMinutes(date, 15 + (c * 90));
        times.push(wakeTime);
      });
    }
    setResults(times);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sleep Calculator</CardTitle>
        <CardDescription>Calculate optimal bedtimes or wake-up times based on sleep cycles.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>I want to...</Label>
            <Select value={mode} onValueChange={setMode}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wake">Wake up at</SelectItem>
                <SelectItem value="sleep">Go to sleep at</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Time</Label>
            <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
          <Button className="w-full" onClick={calculate}>Calculate Times</Button>
        </div>

        {results.length > 0 && (
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-medium text-center text-muted-foreground">
              {mode === "wake" ? "You should go to bed at:" : "You should wake up at:"}
            </h3>
            <div className="grid gap-3">
              {results.map((t, i) => (
                <div key={i} className={`p-4 rounded-lg flex justify-between items-center ${i === 2 ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-muted'}`}>
                  <span className="text-2xl font-bold">{format(t, "hh:mm a")}</span>
                  <span className="text-xs font-medium opacity-80">
                    {i === 0 ? "6 Cycles (9h)" : i === 1 ? "5 Cycles (7.5h)" : "4 Cycles (6h)"}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-center text-muted-foreground">
              *Includes average 15 min to fall asleep.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}