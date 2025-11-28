import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";

export default function PercentageCalculator() {
  // Tab 1: What is X% of Y?
  const [val1, setVal1] = useState("");
  const [total1, setTotal1] = useState("");
  const [res1, setRes1] = useState<string | null>(null);

  // Tab 2: X is what % of Y?
  const [val2, setVal2] = useState("");
  const [total2, setTotal2] = useState("");
  const [res2, setRes2] = useState<string | null>(null);

  // Tab 3: Percentage Increase/Decrease
  const [val3, setVal3] = useState("");
  const [total3, setTotal3] = useState("");
  const [res3, setRes3] = useState<string | null>(null);

  const calc1 = () => {
    const p = parseFloat(val1);
    const t = parseFloat(total1);
    if (!isNaN(p) && !isNaN(t)) {
      setRes1(((p / 100) * t).toFixed(2));
    }
  };

  const calc2 = () => {
    const p = parseFloat(val2);
    const t = parseFloat(total2);
    if (!isNaN(p) && !isNaN(t) && t !== 0) {
      setRes2(((p / t) * 100).toFixed(2) + "%");
    }
  };

  const calc3 = () => {
    const from = parseFloat(val3);
    const to = parseFloat(total3);
    if (!isNaN(from) && !isNaN(to) && from !== 0) {
      const diff = to - from;
      const p = (diff / from) * 100;
      setRes3((p > 0 ? "+" : "") + p.toFixed(2) + "%");
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-green-600">
      <CardHeader>
        <CardTitle>Percentage Calculator</CardTitle>
        <CardDescription>
          Compute percentages, percentage change, and reverse percentages easily.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="basic">Percentage Of</TabsTrigger>
            <TabsTrigger value="what-percent">What % Is</TabsTrigger>
            <TabsTrigger value="change">% Change</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="flex flex-col md:flex-row items-center gap-4 text-lg">
              <div className="flex items-center gap-2 w-full">
                <span className="font-medium whitespace-nowrap">What is</span>
                <Input 
                  type="number" 
                  placeholder="15" 
                  value={val1}
                  onChange={(e) => setVal1(e.target.value)}
                  className="text-center font-bold"
                />
                <span className="font-medium">%</span>
              </div>
              <div className="flex items-center gap-2 w-full">
                <span className="font-medium whitespace-nowrap">of</span>
                <Input 
                  type="number" 
                  placeholder="200" 
                  value={total1}
                  onChange={(e) => setTotal1(e.target.value)}
                  className="text-center font-bold"
                />
              </div>
            </div>
            <Button onClick={calc1} className="w-full bg-green-600 hover:bg-green-700">Calculate</Button>
            {res1 && (
              <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-lg text-center">
                <p className="text-muted-foreground mb-1">Result</p>
                <p className="text-4xl font-bold text-green-700 dark:text-green-400">{res1}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="what-percent" className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
             <div className="flex flex-col md:flex-row items-center gap-4 text-lg">
              <div className="flex items-center gap-2 w-full">
                <Input 
                  type="number" 
                  placeholder="25" 
                  value={val2}
                  onChange={(e) => setVal2(e.target.value)}
                  className="text-center font-bold"
                />
                <span className="font-medium whitespace-nowrap">is what %</span>
              </div>
              <div className="flex items-center gap-2 w-full">
                <span className="font-medium whitespace-nowrap">of</span>
                <Input 
                  type="number" 
                  placeholder="100" 
                  value={total2}
                  onChange={(e) => setTotal2(e.target.value)}
                  className="text-center font-bold"
                />
              </div>
            </div>
            <Button onClick={calc2} className="w-full bg-green-600 hover:bg-green-700">Calculate</Button>
            {res2 && (
              <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-lg text-center">
                <p className="text-muted-foreground mb-1">Result</p>
                <p className="text-4xl font-bold text-green-700 dark:text-green-400">{res2}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="change" className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="flex flex-col md:flex-row items-center gap-4 text-lg">
              <div className="flex items-center gap-2 w-full">
                <span className="font-medium whitespace-nowrap">From</span>
                <Input 
                  type="number" 
                  placeholder="100" 
                  value={val3}
                  onChange={(e) => setVal3(e.target.value)}
                  className="text-center font-bold"
                />
              </div>
              <div className="flex items-center gap-2 w-full">
                <span className="font-medium whitespace-nowrap">to</span>
                <Input 
                  type="number" 
                  placeholder="150" 
                  value={total3}
                  onChange={(e) => setTotal3(e.target.value)}
                  className="text-center font-bold"
                />
              </div>
            </div>
            <Button onClick={calc3} className="w-full bg-green-600 hover:bg-green-700">Calculate Change</Button>
            {res3 && (
              <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-lg text-center">
                <p className="text-muted-foreground mb-1">Result</p>
                <p className="text-4xl font-bold text-green-700 dark:text-green-400">{res3}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {parseFloat(res3) > 0 ? "Increase" : "Decrease"}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}