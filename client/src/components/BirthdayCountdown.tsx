import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, addYears, isBefore, setYear } from "date-fns";

export default function BirthdayCountdown() {
  const [birthDate, setBirthDate] = useState("");
  const [countdown, setCountdown] = useState<{days: number, hours: number, minutes: number, seconds: number} | null>(null);

  useEffect(() => {
    if (!birthDate) return;
    
    const calculateTime = () => {
      const now = new Date();
      const birth = new Date(birthDate);
      // Set birth year to current year to check if it passed
      let nextBirthday = setYear(birth, now.getFullYear());
      
      // If birthday has passed this year, or is today (checking simplisticly by time), move to next year
      // Actually strict comparison:
      if (isBefore(nextBirthday, now) && nextBirthday.getDate() !== now.getDate()) {
        nextBirthday = addYears(nextBirthday, 1);
      } else if (isBefore(nextBirthday, now)) {
         // It was earlier today? Or same day? 
         // If same day, let's show 0 or happy birthday message.
         // For simplicity, if same day logic:
         if (now.getDate() === birth.getDate() && now.getMonth() === birth.getMonth()) {
             setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
             return;
         }
         nextBirthday = addYears(nextBirthday, 1);
      }
      
      const days = differenceInDays(nextBirthday, now);
      const hours = differenceInHours(nextBirthday, now) % 24;
      const minutes = differenceInMinutes(nextBirthday, now) % 60;
      const seconds = differenceInSeconds(nextBirthday, now) % 60;
      
      setCountdown({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [birthDate]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Birthday Countdown</CardTitle>
        <CardDescription>Count down the days until your next birthday.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Enter Birth Date</Label>
          <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        </div>
        
        {countdown && (
          <div className="mt-6 grid grid-cols-4 gap-2 text-center">
            <div className="bg-muted p-2 rounded">
              <div className="text-2xl font-bold text-primary">{countdown.days}</div>
              <div className="text-xs text-muted-foreground">Days</div>
            </div>
            <div className="bg-muted p-2 rounded">
              <div className="text-2xl font-bold text-primary">{countdown.hours}</div>
              <div className="text-xs text-muted-foreground">Hours</div>
            </div>
            <div className="bg-muted p-2 rounded">
              <div className="text-2xl font-bold text-primary">{countdown.minutes}</div>
              <div className="text-xs text-muted-foreground">Mins</div>
            </div>
            <div className="bg-muted p-2 rounded">
              <div className="text-2xl font-bold text-primary">{countdown.seconds}</div>
              <div className="text-xs text-muted-foreground">Secs</div>
            </div>
          </div>
        )}
         {!birthDate && (
            <div className="text-center text-muted-foreground py-8">
                Enter your birth date to start the countdown!
            </div>
         )}
      </CardContent>
    </Card>
  );
}