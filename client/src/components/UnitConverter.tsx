import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeftToLine } from "lucide-react";

const conversionRates: Record<string, Record<string, number>> = {
  // Length (Base: Meter)
  length: {
    meter: 1,
    kilometer: 0.001,
    centimeter: 100,
    millimeter: 1000,
    mile: 0.000621371,
    yard: 1.09361,
    foot: 3.28084,
    inch: 39.3701,
  },
  // Weight (Base: Kilogram)
  weight: {
    kilogram: 1,
    gram: 1000,
    milligram: 1000000,
    pound: 2.20462,
    ounce: 35.274,
    ton: 0.001,
  },
  // Volume (Base: Liter)
  volume: {
    liter: 1,
    milliliter: 1000,
    gallon: 0.264172,
    quart: 1.05669,
    pint: 2.11338,
    cup: 4.22675,
    fluid_ounce: 33.814,
  },
  // Time (Base: Second)
  time: {
    second: 1,
    minute: 1/60,
    hour: 1/3600,
    day: 1/86400,
    week: 1/604800,
    year: 1/31536000,
  },
  // Area (Base: Square Meter)
  area: {
    square_meter: 1,
    square_kilometer: 0.000001,
    square_foot: 10.7639,
    square_inch: 1550,
    acre: 0.000247105,
    hectare: 0.0001,
  },
   // Speed (Base: Meter per second)
  speed: {
    meter_per_second: 1,
    kilometer_per_hour: 3.6,
    mile_per_hour: 2.23694,
    knot: 1.94384,
  }
};

type UnitType = "length" | "weight" | "volume" | "time" | "area" | "speed" | "temperature";

export default function UnitConverter({ type = "length" }: { type?: string }) {
  // Normalize type from slug
  const category = (type.split("-")[0] as UnitType) || "length";
  
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [amount, setAmount] = useState("1");
  const [result, setResult] = useState("");

  // Initialize units based on category
  useEffect(() => {
    if (category === "temperature") {
      setFromUnit("celsius");
      setToUnit("fahrenheit");
    } else if (conversionRates[category]) {
      const units = Object.keys(conversionRates[category]);
      setFromUnit(units[0]);
      setToUnit(units[1] || units[0]);
    }
  }, [category]);

  // Calculation effect
  useEffect(() => {
    if (!amount || isNaN(parseFloat(amount))) {
      setResult("");
      return;
    }

    const val = parseFloat(amount);

    if (category === "temperature") {
      let celsius = val;
      // Convert to Celsius first
      if (fromUnit === "fahrenheit") celsius = (val - 32) * 5/9;
      else if (fromUnit === "kelvin") celsius = val - 273.15;

      // Convert from Celsius to target
      let res = celsius;
      if (toUnit === "fahrenheit") res = (celsius * 9/5) + 32;
      else if (toUnit === "kelvin") res = celsius + 273.15;

      setResult(res.toFixed(4));
    } else if (conversionRates[category]) {
      // Standard conversion using base unit
      const rates = conversionRates[category];
      if (rates[fromUnit] && rates[toUnit]) {
        const baseValue = val / rates[fromUnit];
        const targetValue = baseValue * rates[toUnit];
        setResult(targetValue.toFixed(6).replace(/\.?0+$/, ""));
      }
    }
  }, [amount, fromUnit, toUnit, category]);

  const formatUnit = (u: string) => u.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());

  const units = category === "temperature" 
    ? ["celsius", "fahrenheit", "kelvin"] 
    : Object.keys(conversionRates[category] || {});

  return (
    <Card className="w-full border-t-4 border-t-purple-600">
      <CardHeader>
        <CardTitle className="capitalize">{category} Converter</CardTitle>
        <CardDescription>
          Convert between different {category} units instantly.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-[1fr,auto,1fr] gap-4 items-end">
          <div className="space-y-2">
            <Label>From</Label>
            <Input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg"
            />
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {units.map(u => (
                  <SelectItem key={u} value={u}>{formatUnit(u)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center pb-2 text-muted-foreground">
            <ArrowLeftToLine className="h-6 w-6" />
          </div>

          <div className="space-y-2">
            <Label>To</Label>
            <div className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              {result}
            </div>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {units.map(u => (
                  <SelectItem key={u} value={u}>{formatUnit(u)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}