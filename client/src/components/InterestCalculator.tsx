import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function InterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [result, setResult] = useState<{
    interest: number;
    total: number;
  } | null>(null);

  const calculateSimple = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);

    if (p > 0 && r > 0 && t > 0) {
      const interest = (p * r * t) / 100;
      setResult({
        interest: parseFloat(interest.toFixed(2)),
        total: parseFloat((p + interest).toFixed(2))
      });
    }
  };

  const calculateCompound = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);

    if (p > 0 && r > 0 && t > 0) {
      // A = P(1 + r/100)^t
      const total = p * Math.pow((1 + r / 100), t);
      const interest = total - p;
      setResult({
        interest: parseFloat(interest.toFixed(2)),
        total: parseFloat(total.toFixed(2))
      });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-blue-600">
      <CardHeader>
        <CardTitle>Interest Calculator</CardTitle>
        <CardDescription>
          Calculate Simple and Compound Interest earnings or payments.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="simple" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="simple">Simple Interest</TabsTrigger>
            <TabsTrigger value="compound">Compound Interest</TabsTrigger>
          </TabsList>

          <TabsContent value="simple" className="space-y-6">
            <CalculatorForm 
              principal={principal} setPrincipal={setPrincipal}
              rate={rate} setRate={setRate}
              time={time} setTime={setTime}
              onCalculate={calculateSimple}
              type="Simple"
            />
          </TabsContent>

          <TabsContent value="compound" className="space-y-6">
            <CalculatorForm 
              principal={principal} setPrincipal={setPrincipal}
              rate={rate} setRate={setRate}
              time={time} setTime={setTime}
              onCalculate={calculateCompound}
              type="Compound"
            />
          </TabsContent>
          
          {result && (
            <div className="mt-8 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800 text-center">
                <p className="text-sm text-muted-foreground uppercase">Total Interest</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">${result.interest.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800 text-center">
                <p className="text-sm text-muted-foreground uppercase">Total Amount</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">${result.total.toLocaleString()}</p>
              </div>
            </div>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}

function CalculatorForm({ principal, setPrincipal, rate, setRate, time, setTime, onCalculate, type }: any) {
  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label>Principal Amount ($)</Label>
        <Input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} placeholder="10000" />
      </div>
      <div className="grid gap-2">
        <Label>Annual Interest Rate (%)</Label>
        <Input type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="5" />
      </div>
      <div className="grid gap-2">
        <Label>Time Period (Years)</Label>
        <Input type="number" value={time} onChange={e => setTime(e.target.value)} placeholder="5" />
      </div>
      <Button onClick={onCalculate} className="w-full">Calculate {type} Interest</Button>
    </div>
  );
}