import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeftToLine } from "lucide-react";

export default function HexConverter() {
  const [hex, setHex] = useState("");
  const [decimal, setDecimal] = useState("");
  const [mode, setMode] = useState<"hexToDec" | "decToHex">("hexToDec");

  const convert = () => {
    if (mode === "hexToDec") {
      const res = parseInt(hex, 16);
      setDecimal(isNaN(res) ? "Invalid Hex" : res.toString());
    } else {
      const num = parseInt(decimal);
      setHex(isNaN(num) ? "Invalid Decimal" : num.toString(16).toUpperCase());
    }
  };

  const toggleMode = () => {
    setMode(mode === "hexToDec" ? "decToHex" : "hexToDec");
    setHex("");
    setDecimal("");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Hex to Decimal Converter</CardTitle>
        <CardDescription>Convert between Hexadecimal and Decimal number systems.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <Button variant="outline" onClick={toggleMode} className="gap-2">
            <ArrowLeftToLine className="h-4 w-4" />
            Switch Mode ({mode === "hexToDec" ? "Hex → Decimal" : "Decimal → Hex"})
          </Button>
        </div>

        {mode === "hexToDec" ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Hexadecimal</Label>
              <Input 
                value={hex} 
                onChange={(e) => setHex(e.target.value.toUpperCase())} 
                placeholder="e.g. FF or 1A"
              />
            </div>
            <Button className="w-full" onClick={convert}>Convert</Button>
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Decimal Result</p>
              <p className="text-2xl font-bold font-mono">{decimal || "-"}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Decimal</Label>
              <Input 
                type="number"
                value={decimal} 
                onChange={(e) => setDecimal(e.target.value)} 
                placeholder="e.g. 255"
              />
            </div>
            <Button className="w-full" onClick={convert}>Convert</Button>
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Hex Result</p>
              <p className="text-2xl font-bold font-mono">{hex || "-"}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}