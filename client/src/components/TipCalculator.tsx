import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export default function TipCalculator() {
  const [bill, setBill] = useState("");
  const [tipPercent, setTipPercent] = useState(15);
  const [people, setPeople] = useState("1");

  const billAmount = parseFloat(bill) || 0;
  const peopleCount = parseInt(people) || 1;
  
  const tipAmount = (billAmount * tipPercent) / 100;
  const totalAmount = billAmount + tipAmount;
  const totalPerPerson = totalAmount / peopleCount;
  const tipPerPerson = tipAmount / peopleCount;

  return (
    <Card className="w-full border-t-4 border-t-orange-500">
      <CardHeader>
        <CardTitle>Tip Calculator</CardTitle>
        <CardDescription>
          Calculate tip amounts and split bills easily between friends.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-6">
          <div className="grid gap-2">
            <Label>Bill Amount ($)</Label>
            <Input 
              type="number" 
              value={bill} 
              onChange={(e) => setBill(e.target.value)} 
              placeholder="100.00"
              className="text-lg"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>Tip Percentage</Label>
              <span className="font-bold text-orange-600">{tipPercent}%</span>
            </div>
            <Slider 
              value={[tipPercent]} 
              onValueChange={(v) => setTipPercent(v[0])} 
              max={50} 
              step={1}
              className="py-4"
            />
            <div className="flex justify-between gap-2">
              {[10, 15, 18, 20, 25].map((pct) => (
                <Button 
                  key={pct} 
                  variant={tipPercent === pct ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTipPercent(pct)}
                  className="flex-1"
                >
                  {pct}%
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Number of People</Label>
            <Input 
              type="number" 
              value={people} 
              onChange={(e) => setPeople(e.target.value)} 
              placeholder="1"
              min="1"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase">Tip Amount</p>
            <p className="text-2xl font-bold text-orange-600">${tipAmount.toFixed(2)}</p>
            {peopleCount > 1 && (
              <p className="text-xs text-muted-foreground">(${tipPerPerson.toFixed(2)} / person)</p>
            )}
          </div>
          <div className="space-y-1 text-right">
            <p className="text-xs text-muted-foreground uppercase">Total Bill</p>
            <p className="text-2xl font-bold text-foreground">${totalAmount.toFixed(2)}</p>
            {peopleCount > 1 && (
              <p className="text-xs text-muted-foreground">(${totalPerPerson.toFixed(2)} / person)</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}