import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Box, Circle } from "lucide-react";

export default function ConcreteCalculator() {
  const [type, setType] = useState("slab"); // slab, footing, column
  
  // Slab / Square Footing
  const [length, setLength] = useState(10);
  const [width, setWidth] = useState(10);
  const [thickness, setThickness] = useState(4); // inches

  // Round Column
  const [height, setHeight] = useState(10);
  const [diameter, setDiameter] = useState(12); // inches

  const [quantity, setQuantity] = useState(1);
  
  const [result, setResult] = useState<{
    cubicFeet: number,
    cubicYards: number,
    bags60: number,
    bags80: number
  } | null>(null);

  const calculate = () => {
    let cubicFeet = 0;

    if (type === "slab" || type === "footing") {
      // L x W (ft) x Thickness (in / 12)
      cubicFeet = length * width * (thickness / 12);
    } else if (type === "column") {
      // Pi * r^2 * h
      // r in feet = (diameter / 2) / 12
      const radiusFt = (diameter / 24); 
      cubicFeet = Math.PI * Math.pow(radiusFt, 2) * height;
    }

    cubicFeet *= quantity;
    
    // 1 cubic yard = 27 cubic feet
    const cubicYards = cubicFeet / 27;

    // Premix bags estimation
    // Typically 1 cubic foot of concrete = ~145 lbs
    // 60lb bag = ~0.45 cubic feet
    // 80lb bag = ~0.60 cubic feet
    
    // More precise yields:
    // 80lb bag yields ~0.60 cu ft
    // 60lb bag yields ~0.45 cu ft
    
    const bags80 = Math.ceil(cubicFeet / 0.60);
    const bags60 = Math.ceil(cubicFeet / 0.45);

    setResult({
      cubicFeet,
      cubicYards,
      bags60,
      bags80
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Concrete Calculator</CardTitle>
        <CardDescription>Calculate concrete volume and bags needed for slabs, footings, and columns.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="slab" onValueChange={(v) => { setType(v); setResult(null); }}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="slab" className="flex items-center gap-2"><Box className="h-4 w-4" /> Slab / Patio</TabsTrigger>
            <TabsTrigger value="footing" className="flex items-center gap-2"><Box className="h-4 w-4" /> Square Footing</TabsTrigger>
            <TabsTrigger value="column" className="flex items-center gap-2"><Circle className="h-4 w-4" /> Round Column</TabsTrigger>
          </TabsList>

          <div className="mt-6 space-y-4">
            {(type === "slab" || type === "footing") && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Length (feet)</Label>
                  <Input type="number" value={length} onChange={(e) => setLength(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label>Width (feet)</Label>
                  <Input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label>Thickness (inches)</Label>
                  <Input type="number" value={thickness} onChange={(e) => setThickness(Number(e.target.value))} />
                </div>
              </div>
            )}

            {type === "column" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Height (feet)</Label>
                  <Input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label>Diameter (inches)</Label>
                  <Input type="number" value={diameter} onChange={(e) => setDiameter(Number(e.target.value))} />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>Quantity (How many of these?)</Label>
              <Input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
            </div>

            <Button className="w-full" onClick={calculate}>Calculate Concrete</Button>
          </div>
        </Tabs>

        {result && (
          <div className="mt-8 space-y-6 animate-in fade-in-50">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Total Volume</p>
                <p className="text-2xl font-bold text-primary">{result.cubicYards.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">Cubic Yards</p>
              </div>
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Total Volume</p>
                <p className="text-2xl font-bold text-primary">{result.cubicFeet.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">Cubic Feet</p>
              </div>
            </div>

            <div className="border rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-lg">Pre-Mix Bags Needed</h3>
              <div className="grid grid-cols-2 gap-4">
                 <div className="flex flex-col items-center p-3 border rounded bg-slate-50 dark:bg-slate-900">
                    <span className="text-3xl font-bold text-foreground">{result.bags80}</span>
                    <span className="text-sm text-muted-foreground">80lb Bags</span>
                 </div>
                 <div className="flex flex-col items-center p-3 border rounded bg-slate-50 dark:bg-slate-900">
                    <span className="text-3xl font-bold text-foreground">{result.bags60}</span>
                    <span className="text-sm text-muted-foreground">60lb Bags</span>
                 </div>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">
                *Estimates include typical waste/spillage factors not accounted for here. Always buy 5-10% extra.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}