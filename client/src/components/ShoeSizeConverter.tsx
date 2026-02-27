import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const menSizes = [
  { us: 6, uk: 5.5, eu: 39, cm: 24 },
  { us: 6.5, uk: 6, eu: 39.5, cm: 24.5 },
  { us: 7, uk: 6.5, eu: 40, cm: 25 },
  { us: 7.5, uk: 7, eu: 40.5, cm: 25.5 },
  { us: 8, uk: 7.5, eu: 41, cm: 26 },
  { us: 8.5, uk: 8, eu: 42, cm: 26.5 },
  { us: 9, uk: 8.5, eu: 42.5, cm: 27 },
  { us: 9.5, uk: 9, eu: 43, cm: 27.5 },
  { us: 10, uk: 9.5, eu: 44, cm: 28 },
  { us: 10.5, uk: 10, eu: 44.5, cm: 28.5 },
  { us: 11, uk: 10.5, eu: 45, cm: 29 },
  { us: 11.5, uk: 11, eu: 45.5, cm: 29.5 },
  { us: 12, uk: 11.5, eu: 46, cm: 30 },
  { us: 13, uk: 12.5, eu: 47, cm: 31 },
  { us: 14, uk: 13.5, eu: 48, cm: 32 },
];

const womenSizes = [
  { us: 5, uk: 3, eu: 35.5, cm: 22 },
  { us: 5.5, uk: 3.5, eu: 36, cm: 22.5 },
  { us: 6, uk: 4, eu: 36.5, cm: 23 },
  { us: 6.5, uk: 4.5, eu: 37, cm: 23.5 },
  { us: 7, uk: 5, eu: 37.5, cm: 24 },
  { us: 7.5, uk: 5.5, eu: 38, cm: 24.5 },
  { us: 8, uk: 6, eu: 38.5, cm: 25 },
  { us: 8.5, uk: 6.5, eu: 39, cm: 25.5 },
  { us: 9, uk: 7, eu: 40, cm: 26 },
  { us: 9.5, uk: 7.5, eu: 40.5, cm: 26.5 },
  { us: 10, uk: 8, eu: 41, cm: 27 },
  { us: 10.5, uk: 8.5, eu: 42, cm: 27.5 },
  { us: 11, uk: 9, eu: 42.5, cm: 28 },
  { us: 12, uk: 10, eu: 44, cm: 29 },
];

export default function ShoeSizeConverter() {
  const [gender, setGender] = useState<"men" | "women">("men");
  const [fromSystem, setFromSystem] = useState("us");
  const [sizeValue, setSizeValue] = useState("");
  const [result, setResult] = useState<{ us: number; uk: number; eu: number; cm: number } | null>(null);

  const calculate = () => {
    const val = parseFloat(sizeValue);
    if (isNaN(val)) return;

    const sizes = gender === "men" ? menSizes : womenSizes;
    const key = fromSystem as keyof typeof sizes[0];

    let closest = sizes[0];
    let minDiff = Math.abs(sizes[0][key] - val);

    for (const s of sizes) {
      const diff = Math.abs(s[key] - val);
      if (diff < minDiff) {
        minDiff = diff;
        closest = s;
      }
    }

    setResult(closest);
  };

  return (
    <Card className="w-full border-t-4 border-t-orange-500">
      <CardHeader>
        <CardTitle>Shoe Size Converter</CardTitle>
        <CardDescription>Convert shoe sizes between US, UK, EU, and centimeter systems for men and women.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-2">
          <Label>Gender</Label>
          <RadioGroup value={gender} onValueChange={(v: any) => { setGender(v); setResult(null); }} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="men" id="shoe-men" data-testid="radio-men" />
              <Label htmlFor="shoe-men">Men</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="women" id="shoe-women" data-testid="radio-women" />
              <Label htmlFor="shoe-women">Women</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid gap-2">
          <Label>Convert From</Label>
          <Select value={fromSystem} onValueChange={setFromSystem} data-testid="select-from-system">
            <SelectTrigger data-testid="select-from-system-trigger">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">US Size</SelectItem>
              <SelectItem value="uk">UK Size</SelectItem>
              <SelectItem value="eu">EU Size</SelectItem>
              <SelectItem value="cm">CM (Foot Length)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label>Size</Label>
          <Input data-testid="input-size" type="number" step="0.5" placeholder="Enter size" value={sizeValue} onChange={(e) => setSizeValue(e.target.value)} />
        </div>

        <Button data-testid="button-convert" className="w-full bg-orange-500 hover:bg-orange-600 text-white" onClick={calculate}>Convert</Button>

        {result && (
          <div className="mt-4 animate-in fade-in slide-in-from-top-4">
            <div className="grid grid-cols-4 gap-3">
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-800 text-center">
                <p className="text-xs text-muted-foreground uppercase">US</p>
                <p className="text-xl font-bold text-orange-600 dark:text-orange-400" data-testid="text-us-size">{result.us}</p>
              </div>
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-800 text-center">
                <p className="text-xs text-muted-foreground uppercase">UK</p>
                <p className="text-xl font-bold text-orange-600 dark:text-orange-400" data-testid="text-uk-size">{result.uk}</p>
              </div>
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-800 text-center">
                <p className="text-xs text-muted-foreground uppercase">EU</p>
                <p className="text-xl font-bold text-orange-600 dark:text-orange-400" data-testid="text-eu-size">{result.eu}</p>
              </div>
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-800 text-center">
                <p className="text-xs text-muted-foreground uppercase">CM</p>
                <p className="text-xl font-bold text-orange-600 dark:text-orange-400" data-testid="text-cm-size">{result.cm}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}