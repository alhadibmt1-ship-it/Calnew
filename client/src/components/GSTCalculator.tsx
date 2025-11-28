import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function GSTCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("18");
  const [type, setType] = useState("exclusive"); // exclusive (add tax) or inclusive (remove tax)
  const [result, setResult] = useState<{
    netAmount: number;
    gstAmount: number;
    totalAmount: number;
  } | null>(null);

  const calculate = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate);

    if (p > 0 && r >= 0) {
      let net = 0;
      let gst = 0;
      let total = 0;

      if (type === "exclusive") {
        // Add Tax
        net = p;
        gst = (p * r) / 100;
        total = p + gst;
      } else {
        // Remove Tax
        total = p;
        gst = p - (p * (100 / (100 + r)));
        net = total - gst;
      }

      setResult({
        netAmount: net,
        gstAmount: gst,
        totalAmount: total
      });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-blue-600">
      <CardHeader>
        <CardTitle>GST/VAT Calculator</CardTitle>
        <CardDescription>Calculate tax inclusive or exclusive amounts.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label>Amount</Label>
            <Input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="1000" />
          </div>
          
          <div className="grid gap-2">
            <Label>Tax Rate (%)</Label>
            <div className="flex gap-2">
              {[5, 12, 18, 28].map((r) => (
                <Button 
                  key={r} 
                  variant={rate === r.toString() ? "default" : "outline"} 
                  onClick={() => setRate(r.toString())}
                  className="flex-1"
                >
                  {r}%
                </Button>
              ))}
              <Input 
                type="number" 
                value={rate} 
                onChange={e => setRate(e.target.value)} 
                className="w-20" 
                placeholder="Custom"
              />
            </div>
          </div>

          <RadioGroup value={type} onValueChange={setType} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="exclusive" id="exclusive" />
              <Label htmlFor="exclusive">Add GST (Exclusive)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="inclusive" id="inclusive" />
              <Label htmlFor="inclusive">Remove GST (Inclusive)</Label>
            </div>
          </RadioGroup>

          <Button onClick={calculate} className="w-full">Calculate</Button>
        </div>

        {result && (
          <div className="space-y-3 pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Net Amount</span>
              <span className="font-mono font-medium">${result.netAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">GST Amount ({rate}%)</span>
              <span className="font-mono font-medium text-red-500">${result.gstAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total Amount</span>
              <span className="text-blue-600">${result.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}