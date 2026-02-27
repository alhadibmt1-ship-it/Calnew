import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ScientificNotationCalculator() {
  const [decimalInput, setDecimalInput] = useState("");
  const [coefficient, setCoefficient] = useState("");
  const [exponent, setExponent] = useState("");
  const [toSciResult, setToSciResult] = useState<{ coefficient: number; exponent: number; notation: string } | null>(null);
  const [toDecResult, setToDecResult] = useState<string | null>(null);
  const [error, setError] = useState("");

  const convertToScientific = () => {
    setError("");
    setToSciResult(null);
    const num = parseFloat(decimalInput);

    if (isNaN(num)) {
      setError("Please enter a valid number.");
      return;
    }

    if (num === 0) {
      setToSciResult({ coefficient: 0, exponent: 0, notation: "0 × 10⁰" });
      return;
    }

    const exp = Math.floor(Math.log10(Math.abs(num)));
    const coeff = num / Math.pow(10, exp);
    const superscript = exp.toString().split("").map(c => {
      const map: Record<string, string> = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "-": "⁻" };
      return map[c] || c;
    }).join("");

    setToSciResult({
      coefficient: coeff,
      exponent: exp,
      notation: `${coeff.toFixed(6).replace(/\.?0+$/, "")} × 10${superscript}`,
    });
  };

  const convertToDecimal = () => {
    setError("");
    setToDecResult(null);
    const c = parseFloat(coefficient);
    const e = parseInt(exponent);

    if (isNaN(c) || isNaN(e)) {
      setError("Please enter valid numbers.");
      return;
    }

    const result = c * Math.pow(10, e);
    setToDecResult(result.toLocaleString(undefined, { maximumFractionDigits: 20 }));
  };

  return (
    <Card className="w-full border-t-4 border-t-teal-500">
      <CardHeader>
        <CardTitle>Scientific Notation Calculator</CardTitle>
        <CardDescription>
          Convert between decimal numbers and scientific notation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="to-scientific" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="to-scientific" data-testid="tab-to-scientific">To Scientific</TabsTrigger>
            <TabsTrigger value="to-decimal" data-testid="tab-to-decimal">To Decimal</TabsTrigger>
          </TabsList>

          <TabsContent value="to-scientific" className="space-y-6">
            <div className="space-y-2">
              <Label>Decimal Number</Label>
              <Input data-testid="input-decimal" type="number" value={decimalInput} onChange={(e) => setDecimalInput(e.target.value)} placeholder="0.00045" />
            </div>
            <Button data-testid="button-to-scientific" onClick={convertToScientific} className="w-full bg-teal-600 hover:bg-teal-700">Convert</Button>
            {toSciResult && (
              <div className="p-6 bg-teal-50 dark:bg-teal-900/20 border border-teal-100 rounded-lg text-center">
                <p className="text-xs text-muted-foreground uppercase">Scientific Notation</p>
                <p className="text-3xl font-bold text-teal-600" data-testid="text-scientific">{toSciResult.notation}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Coefficient: {toSciResult.coefficient.toFixed(6).replace(/\.?0+$/, "")} | Exponent: {toSciResult.exponent}
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="to-decimal" className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Coefficient</Label>
                <Input data-testid="input-coefficient" type="number" value={coefficient} onChange={(e) => setCoefficient(e.target.value)} placeholder="4.5" />
              </div>
              <div className="space-y-2">
                <Label>Exponent (power of 10)</Label>
                <Input data-testid="input-exponent" type="number" value={exponent} onChange={(e) => setExponent(e.target.value)} placeholder="-4" />
              </div>
            </div>
            <Button data-testid="button-to-decimal" onClick={convertToDecimal} className="w-full bg-teal-600 hover:bg-teal-700">Convert</Button>
            {toDecResult && (
              <div className="p-6 bg-teal-50 dark:bg-teal-900/20 border border-teal-100 rounded-lg text-center">
                <p className="text-xs text-muted-foreground uppercase">Decimal Number</p>
                <p className="text-3xl font-bold text-teal-600" data-testid="text-decimal">{toDecResult}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {error && (
          <div className="p-4 mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-lg text-center">
            <p className="text-red-600 dark:text-red-400" data-testid="text-error">{error}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}