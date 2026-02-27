import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SandCalculator() {
  const [area, setArea] = useState("");
  const [depth, setDepth] = useState("");
  const [areaUnit, setAreaUnit] = useState("sqm");
  const [depthUnit, setDepthUnit] = useState("mm");

  const [result, setResult] = useState<{
    volumeM3: number;
    volumeCft: number;
    weightTons: number;
    weightKg: number;
  } | null>(null);

  const calculate = () => {
    const areaVal = parseFloat(area) || 0;
    const depthVal = parseFloat(depth) || 0;
    if (areaVal <= 0 || depthVal <= 0) return;

    let areaM2 = areaVal;
    if (areaUnit === "sqft") {
      areaM2 = areaVal * 0.0929;
    }

    let depthM = depthVal;
    if (depthUnit === "mm") {
      depthM = depthVal / 1000;
    } else if (depthUnit === "cm") {
      depthM = depthVal / 100;
    } else if (depthUnit === "in") {
      depthM = depthVal * 0.0254;
    } else if (depthUnit === "ft") {
      depthM = depthVal * 0.3048;
    }

    const volumeM3 = areaM2 * depthM;
    const volumeCft = volumeM3 * 35.3147;
    const sandDensity = 1600;
    const weightKg = volumeM3 * sandDensity;
    const weightTons = weightKg / 1000;

    setResult({
      volumeM3,
      volumeCft,
      weightTons,
      weightKg,
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle data-testid="text-title">Sand Calculator</CardTitle>
        <CardDescription>Calculate the volume and weight of sand needed for your project area and depth.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Area</Label>
            <Input
              data-testid="input-area"
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="e.g. 50"
            />
          </div>
          <div className="space-y-2">
            <Label>Area Unit</Label>
            <Select value={areaUnit} onValueChange={setAreaUnit}>
              <SelectTrigger data-testid="select-area-unit">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sqm">Square Meters (m²)</SelectItem>
                <SelectItem value="sqft">Square Feet (sqft)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Depth</Label>
            <Input
              data-testid="input-depth"
              type="number"
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
              placeholder="e.g. 100"
            />
          </div>
          <div className="space-y-2">
            <Label>Depth Unit</Label>
            <Select value={depthUnit} onValueChange={setDepthUnit}>
              <SelectTrigger data-testid="select-depth-unit">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mm">Millimeters (mm)</SelectItem>
                <SelectItem value="cm">Centimeters (cm)</SelectItem>
                <SelectItem value="in">Inches (in)</SelectItem>
                <SelectItem value="ft">Feet (ft)</SelectItem>
                <SelectItem value="m">Meters (m)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button data-testid="button-calculate" className="w-full" onClick={calculate}>
          Calculate Sand
        </Button>

        {result && (
          <div className="mt-6 space-y-4 animate-in fade-in-50">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Volume</p>
                <p data-testid="text-volume-m3" className="text-2xl font-bold text-primary">{result.volumeM3.toFixed(3)} m³</p>
                <p className="text-xs text-muted-foreground">({result.volumeCft.toFixed(2)} cft)</p>
              </div>
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Weight</p>
                <p data-testid="text-weight-tons" className="text-2xl font-bold text-primary">{result.weightTons.toFixed(2)} tons</p>
                <p className="text-xs text-muted-foreground">({result.weightKg.toFixed(0)} kg)</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              *Sand density assumed at 1,600 kg/m³ (dry loose sand). Actual density may vary by 1,500–1,700 kg/m³.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}