import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft } from "lucide-react";

export default function BinaryConverter() {
  const [binary, setBinary] = useState("");
  const [decimal, setDecimal] = useState("");
  const [hex, setHex] = useState("");

  const handleBinary = (val: string) => {
    // Only allow 0 and 1
    if (val && !/^[01]+$/.test(val)) return;
    
    setBinary(val);
    if (val) {
      const dec = parseInt(val, 2);
      setDecimal(dec.toString());
      setHex(dec.toString(16).toUpperCase());
    } else {
      setDecimal("");
      setHex("");
    }
  };

  const handleDecimal = (val: string) => {
    setDecimal(val);
    if (val) {
      const dec = parseInt(val);
      setBinary(dec.toString(2));
      setHex(dec.toString(16).toUpperCase());
    } else {
      setBinary("");
      setHex("");
    }
  };

  const handleHex = (val: string) => {
    // Allow 0-9, A-F
    if (val && !/^[0-9A-Fa-f]+$/.test(val)) return;

    setHex(val.toUpperCase());
    if (val) {
      const dec = parseInt(val, 16);
      setDecimal(dec.toString());
      setBinary(dec.toString(2));
    } else {
      setDecimal("");
      setBinary("");
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-slate-600">
      <CardHeader>
        <CardTitle>Number Base Converter</CardTitle>
        <CardDescription>Convert between Binary, Decimal, and Hexadecimal instantly.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Binary (Base 2)</Label>
          <Input 
            value={binary} 
            onChange={(e) => handleBinary(e.target.value)} 
            placeholder="101010" 
            className="font-mono"
          />
        </div>
        
        <div className="flex justify-center text-muted-foreground">
          <ArrowRightLeft className="h-5 w-5 rotate-90" />
        </div>

        <div className="space-y-2">
          <Label>Decimal (Base 10)</Label>
          <Input 
            type="number"
            value={decimal} 
            onChange={(e) => handleDecimal(e.target.value)} 
            placeholder="42" 
            className="font-mono"
          />
        </div>

        <div className="flex justify-center text-muted-foreground">
          <ArrowRightLeft className="h-5 w-5 rotate-90" />
        </div>

        <div className="space-y-2">
          <Label>Hexadecimal (Base 16)</Label>
          <Input 
            value={hex} 
            onChange={(e) => handleHex(e.target.value)} 
            placeholder="2A" 
            className="font-mono"
          />
        </div>
      </CardContent>
    </Card>
  );
}