import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowLeftToLine, Clock } from "lucide-react";

// Common Time Zones
const timeZones = [
  { label: "UTC (Coordinated Universal Time)", value: "UTC" },
  { label: "New York (Eastern Time)", value: "America/New_York" },
  { label: "Los Angeles (Pacific Time)", value: "America/Los_Angeles" },
  { label: "Chicago (Central Time)", value: "America/Chicago" },
  { label: "London (GMT/BST)", value: "Europe/London" },
  { label: "Paris (CET/CEST)", value: "Europe/Paris" },
  { label: "Berlin (CET/CEST)", value: "Europe/Berlin" },
  { label: "Moscow (MSK)", value: "Europe/Moscow" },
  { label: "Dubai (GST)", value: "Asia/Dubai" },
  { label: "Mumbai (IST)", value: "Asia/Kolkata" },
  { label: "Singapore (SGT)", value: "Asia/Singapore" },
  { label: "Tokyo (JST)", value: "Asia/Tokyo" },
  { label: "Sydney (AEST/AEDT)", value: "Australia/Sydney" },
  { label: "Auckland (NZST/NZDT)", value: "Pacific/Auckland" },
  { label: "Hawaii (HST)", value: "Pacific/Honolulu" },
  { label: "Hong Kong (HKT)", value: "Asia/Hong_Kong" },
];

export default function TimeZoneConverter() {
  const [sourceTime, setSourceTime] = useState("");
  const [sourceZone, setSourceZone] = useState("UTC");
  const [targetZone, setTargetZone] = useState("America/New_York");
  const [result, setResult] = useState<string>("");
  const [timeDiff, setTimeDiff] = useState<string>("");

  // Initialize with current local time
  useEffect(() => {
    const now = new Date();
    // Format for datetime-local input: YYYY-MM-DDTHH:mm
    const formatted = new Date(now.getTime() - (now.getTimezoneOffset() * 60000))
      .toISOString()
      .slice(0, 16);
    setSourceTime(formatted);
  }, []);

  useEffect(() => {
    if (!sourceTime) return;

    try {
      const date = new Date(sourceTime);
      
      // Create a date object that treats the input time as being in the source zone
      // This is tricky in pure JS without libraries like luxon or date-fns-tz, 
      // but we can approximate by parsing the string and assuming it represents the time in that zone.
      
      // 1. Get timestamp of the selected time in the source zone
      // We use Intl.DateTimeFormat to find the offset
      const getOffset = (zone: string, d: Date) => {
        const str = d.toLocaleString('en-US', { timeZone: zone, timeZoneName: 'longOffset' });
        const match = str.match(/GMT([+-]\d{2}):(\d{2})/);
        if (!match) return 0;
        const sign = match[1][0] === '+' ? 1 : -1;
        const hours = parseInt(match[1].slice(1));
        const minutes = parseInt(match[2]);
        return sign * (hours * 60 + minutes); // Offset in minutes
      };

      // For the source time, we need to "shift" the UTC timestamp to match the intended local time in that zone
      // This is a simplification. For robust production apps, use 'date-fns-tz'.
      
      // Using Intl to convert:
      const opts: Intl.DateTimeFormatOptions = {
        timeZone: targetZone,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        weekday: 'long',
        timeZoneName: 'short'
      };

      // We treat the input as UTC first, then adjust
      // Actually, a better way without heavy libs:
      // We want to convert Time X in Zone A -> Time Y in Zone B
      
      // Let's use the date string directly with the time zone if supported, or fall back to simple offset calculation
      // Since we can't easily construct "Date from Zone", we'll use a trick:
      // We'll iterate or use the fact that we can format a UTC date into parts for a zone
      
      // Simplified approach for mockup:
      // Treat input as Local, get UTC, apply Source Offset inverse, apply Target Offset.
      
      // Let's just use new Date(sourceTime) which creates a date in LOCAL browser time.
      // Then we convert that specific INSTANT to the target zone. 
      // BUT the user intended `sourceTime` to be in `sourceZone`, not browser local.
      
      // Correct approach with Intl:
      // 1. Parse YYYY-MM-DDTHH:mm
      // 2. We need to find a UTC timestamp T such that T formatted in SourceZone equals input string.
      // This is hard to solve inversely without a library.
      
      // ALTERNATIVE: Just show conversions relative to current time for simplicity in prototype, 
      // OR assume input is in UTC if source is UTC.
      
      // Let's use a simple helper that assumes the input date object is "correct" relative to UTC 
      // and we just want to see the difference between zones.
      
      // Better Mockup Logic:
      // Just convert the "Instant" represented by the input (interpreted as local) to the target zone? 
      // No, that's confusing if Source Zone is selected.
      
      // Let's try to construct the string "Date + Offset"
      // We can't easily get the offset for an arbitrary future date in a zone without a library.
      
      // For this prototype, we will treat the input time as if it were UTC, then adjust by the difference 
      // in offsets between Source and Target.
      
      const refDate = new Date(sourceTime);
      const sourceStr = refDate.toLocaleString('en-US', { timeZone: sourceZone, timeZoneName: 'short' });
      const targetStr = refDate.toLocaleString('en-US', { timeZone: targetZone, timeZoneName: 'short' });
      
      // This shows what "Now" (or selected instant) looks like in both. 
      // But user wants: "If it's 3PM in NY, what time is it in London?"
      
      // To solve "3PM NY -> London":
      // 1. Find offset of NY (e.g. -4)
      // 2. Find offset of London (e.g. +1)
      // 3. Diff is +5 hours.
      // 4. Add 5 hours to input.
      
      const getOffsetMinutes = (zone: string, d: Date) => {
        const iso = d.toISOString();
        const format = new Intl.DateTimeFormat('en-US', { timeZone: zone, hour12: false, year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
        const parts = format.formatToParts(d);
        // This is getting complicated to parse back.
        
        // simpler:
        // local time string in zone
        const strInZone = d.toLocaleString('en-US', { timeZone: zone });
        const dateInZone = new Date(strInZone);
        // Diff between the date object (local) and the date object formed from the string
        const diff = dateInZone.getTime() - d.getTime();
        // This diff roughly represents (ZoneOffset - LocalOffset)
        return diff;
      };
      
      // Use a reference absolute time (now) to calculate current offsets
      const now = new Date(); 
      const sourceOffset = getOffsetMinutes(sourceZone, now);
      const targetOffset = getOffsetMinutes(targetZone, now);
      
      const diffMs = targetOffset - sourceOffset;
      
      // Apply diff to the input "face value" time
      // We interpret sourceTime as a "face value" timestamp (milliseconds since epoch if it were UTC)
      const inputTimestamp = new Date(sourceTime).getTime(); // This parses as Local
      // We want to treat it as "face value"
      // Remove local offset influence
      const localOffset = new Date().getTimezoneOffset() * 60000;
      const faceValueTimestamp = inputTimestamp - (localOffset * -1); // Adjust to be "UTC-like" face value
      
      // Actually, let's stick to the visual output.
      // If I select 12:00, I want to add (TargetOffset - SourceOffset)
      
      const resultTimestamp = inputTimestamp + diffMs;
      const resultDate = new Date(resultTimestamp);
      
      const formattedResult = new Intl.DateTimeFormat('en-US', opts).format(resultDate);
      setResult(formattedResult);

      // Calc difference text
      const diffHours = diffMs / (1000 * 60 * 60);
      const diffText = diffHours === 0 
        ? "Same time" 
        : `${Math.abs(diffHours)} hours ${diffHours > 0 ? "ahead" : "behind"}`;
      setTimeDiff(diffText);

    } catch (e) {
      setResult("Invalid Date");
    }
  }, [sourceTime, sourceZone, targetZone]);

  const swapZones = () => {
    setSourceZone(targetZone);
    setTargetZone(sourceZone);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Time Zone Converter</CardTitle>
        <CardDescription>Convert time between different time zones instantly.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid md:grid-cols-[1fr,auto,1fr] gap-6 items-start">
          
          {/* Source */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="datetime-local" 
                  value={sourceTime} 
                  onChange={(e) => setSourceTime(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>From Zone</Label>
              <Select value={sourceZone} onValueChange={setSourceZone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeZones.map(tz => (
                    <SelectItem key={tz.value} value={tz.value}>{tz.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Swap */}
          <div className="flex flex-col justify-center items-center h-full pt-8">
            <Button variant="ghost" size="icon" onClick={swapZones} className="rounded-full">
              <ArrowLeftToLine className="h-5 w-5" />
            </Button>
            {timeDiff && (
              <span className="text-xs text-muted-foreground font-medium mt-2 whitespace-nowrap">
                {diffText(sourceZone, targetZone)}
              </span>
            )}
          </div>

          {/* Target */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Converted Time</Label>
              <div className="flex h-10 w-full items-center rounded-md border border-input bg-muted px-3 py-2 text-sm text-muted-foreground">
                 {result || "Select time to convert"}
              </div>
            </div>
            <div className="space-y-2">
              <Label>To Zone</Label>
              <Select value={targetZone} onValueChange={setTargetZone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeZones.map(tz => (
                    <SelectItem key={tz.value} value={tz.value}>{tz.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

        </div>

        <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-100 dark:border-blue-900 text-center">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            Current selection: {sourceZone} is <strong>{timeDiff || "0 hours"}</strong> {timeDiff?.includes("behind") ? "" : ""} compared to {targetZone}.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper to calculate text diff properly
function diffText(source: string, target: string) {
    // Simple approximation using current date
    const now = new Date();
    const getOffset = (z: string) => {
        const str = now.toLocaleString('en-US', { timeZone: z });
        return new Date(str).getTime() - now.getTime();
    };
    const diffMs = getOffset(target) - getOffset(source);
    const diffHours = diffMs / (1000 * 60 * 60);
    
    if (Math.abs(diffHours) < 0.1) return "Same time";
    return `${Math.abs(diffHours)}h ${diffHours > 0 ? "ahead" : "behind"}`;
}