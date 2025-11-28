import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeftToLine } from "lucide-react";

export default function RomanNumeralConverter() {
  const [decimal, setDecimal] = useState<number | "">("");
  const [roman, setRoman] = useState("");
  const [mode, setMode] = useState<"decToRom" | "romToDec">("decToRom");

  const toRoman = (num: number): string => {
    if (num <= 0 || num >= 4000) return "Enter number (1-3999)";
    const lookup: Record<string, number> = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
    let roman = '';
    for (let i in lookup ) {
      while ( num >= lookup[i] ) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
  };

  const fromRoman = (str: string): number | string => {
    const lookup: Record<string, number> = {I:1, V:5, X:10, L:50, C:100, D:500, M:1000};
    let num = 0;
    let s = str.toUpperCase();
    
    // Validation regex for strict roman numerals is complex, doing basic logic check
    if (!/^[IVXLCDM]+$/.test(s)) return "Invalid Characters";

    for (let i = 0; i < s.length; i++) {
      const curr = lookup[s[i]];
      const next = lookup[s[i+1]];
      if (next && curr < next) {
        num -= curr;
      } else {
        num += curr;
      }
    }
    return num;
  };

  const handleConvert = () => {
    if (mode === "decToRom") {
      setRoman(toRoman(Number(decimal)));
    } else {
      const res = fromRoman(roman);
      if (typeof res === 'number') setDecimal(res);
      else alert(res);
    }
  };

  const toggleMode = () => {
    setMode(mode === "decToRom" ? "romToDec" : "decToRom");
    setDecimal("");
    setRoman("");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Roman Numeral Converter</CardTitle>
        <CardDescription>Convert decimal numbers to Roman numerals and vice versa.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <Button variant="outline" onClick={toggleMode} className="gap-2">
            <ArrowLeftToLine className="h-4 w-4" /> 
            Switch Mode ({mode === "decToRom" ? "Decimal → Roman" : "Roman → Decimal"})
          </Button>
        </div>

        {mode === "decToRom" ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Decimal Number (Arabic)</Label>
              <Input 
                type="number" 
                placeholder="e.g. 2024" 
                value={decimal} 
                onChange={(e) => {
                    setDecimal(Number(e.target.value));
                    setRoman(toRoman(Number(e.target.value)));
                }} 
              />
            </div>
            <div className="p-6 bg-muted rounded-lg text-center border-2 border-dashed">
              <p className="text-sm text-muted-foreground mb-2">Roman Numeral</p>
              <p className="text-3xl font-serif font-bold tracking-widest text-primary">{roman || "-"}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Roman Numeral</Label>
              <Input 
                placeholder="e.g. MMXXIV" 
                value={roman} 
                onChange={(e) => {
                    setRoman(e.target.value.toUpperCase());
                    const val = fromRoman(e.target.value);
                    setDecimal(typeof val === 'number' ? val : "");
                }} 
              />
            </div>
            <div className="p-6 bg-muted rounded-lg text-center border-2 border-dashed">
              <p className="text-sm text-muted-foreground mb-2">Decimal Number</p>
              <p className="text-3xl font-mono font-bold text-primary">{decimal || "-"}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}