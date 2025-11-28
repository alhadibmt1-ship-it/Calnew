import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { differenceInDays, addDays, format } from "date-fns";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function DateCalculator() {
  // Tab 1: Days Between
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [diff, setDiff] = useState<number | null>(null);

  // Tab 2: Add/Subtract Days
  const [startDate, setStartDate] = useState("");
  const [days, setDays] = useState("");
  const [newDate, setNewDate] = useState<string | null>(null);

  const calculateDiff = () => {
    if (date1 && date2) {
      const d1 = new Date(date1);
      const d2 = new Date(date2);
      setDiff(Math.abs(differenceInDays(d1, d2)));
    }
  };

  const calculateNewDate = (op: "add" | "sub") => {
    if (startDate && days) {
      const d = new Date(startDate);
      const amount = parseInt(days);
      const res = addDays(d, op === "add" ? amount : -amount);
      setNewDate(format(res, "PPP"));
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-orange-500">
      <CardHeader>
        <CardTitle>Date Calculator</CardTitle>
        <CardDescription>Calculate duration between dates or add/subtract days.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="diff">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="diff">Days Between</TabsTrigger>
            <TabsTrigger value="add">Add/Subtract</TabsTrigger>
          </TabsList>

          <TabsContent value="diff" className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input type="date" value={date1} onChange={e => setDate1(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input type="date" value={date2} onChange={e => setDate2(e.target.value)} />
              </div>
            </div>
            <Button onClick={calculateDiff} className="w-full">Calculate Duration</Button>
            {diff !== null && (
              <div className="text-center p-4 bg-muted rounded-lg mt-4">
                <p className="text-sm text-muted-foreground">Difference</p>
                <p className="text-3xl font-bold">{diff} days</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="add" className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Days</Label>
                <Input type="number" value={days} onChange={e => setDays(e.target.value)} placeholder="30" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button onClick={() => calculateNewDate("add")} variant="outline">Add Days</Button>
              <Button onClick={() => calculateNewDate("sub")} variant="outline">Subtract Days</Button>
            </div>
            {newDate && (
              <div className="text-center p-4 bg-muted rounded-lg mt-4">
                <p className="text-sm text-muted-foreground">Result Date</p>
                <p className="text-2xl font-bold">{newDate}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}