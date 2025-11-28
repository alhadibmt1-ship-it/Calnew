import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function RandomGenerator() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState("1");
  const [allowDupes, setAllowDupes] = useState(true);
  const [result, setResult] = useState<number[]>([]);

  const generate = () => {
    const mn = parseInt(min);
    const mx = parseInt(max);
    const n = parseInt(count);

    if (isNaN(mn) || isNaN(mx) || isNaN(n) || n < 1) return;
    if (mn > mx) return;

    const nums: number[] = [];
    
    if (!allowDupes && (mx - mn + 1) < n) {
      alert("Range too small for unique numbers");
      return;
    }

    if (!allowDupes) {
      const pool = Array.from({ length: mx - mn + 1 }, (_, i) => i + mn);
      for (let i = 0; i < n; i++) {
        const idx = Math.floor(Math.random() * pool.length);
        nums.push(pool[idx]);
        pool.splice(idx, 1);
      }
    } else {
      for (let i = 0; i < n; i++) {
        nums.push(Math.floor(Math.random() * (mx - mn + 1)) + mn);
      }
    }

    setResult(nums);
  };

  return (
    <Card className="w-full border-t-4 border-t-blue-500">
      <CardHeader>
        <CardTitle>Random Number Generator</CardTitle>
        <CardDescription>Generate random numbers within a specific range.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Min</Label>
            <Input type="number" value={min} onChange={e => setMin(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Max</Label>
            <Input type="number" value={max} onChange={e => setMax(e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 items-end">
          <div className="space-y-2">
            <Label>Quantity</Label>
            <Input type="number" value={count} onChange={e => setCount(e.target.value)} min="1" max="1000" />
          </div>
          <div className="flex items-center space-x-2 h-10">
            <Switch id="dupes" checked={allowDupes} onCheckedChange={setAllowDupes} />
            <Label htmlFor="dupes">Allow Duplicates</Label>
          </div>
        </div>

        <Button onClick={generate} className="w-full">Generate</Button>

        {result.length > 0 && (
          <div className="p-4 bg-muted rounded-lg border min-h-[100px] flex flex-wrap gap-2 justify-center content-start">
            {result.map((n, i) => (
              <span key={i} className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-background border shadow-sm font-bold text-lg animate-in zoom-in duration-300" style={{ animationDelay: `${i * 50}ms` }}>
                {n}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}