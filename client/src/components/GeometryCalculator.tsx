import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function GeometryCalculator() {
  const [shape, setShape] = useState("circle");
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ area?: number; volume?: number; perimeter?: number } | null>(null);

  const shapes = {
    circle: { name: "Circle", inputs: ["Radius"] },
    rectangle: { name: "Rectangle", inputs: ["Length", "Width"] },
    triangle: { name: "Triangle", inputs: ["Base", "Height"] },
    sphere: { name: "Sphere", inputs: ["Radius"] },
    cylinder: { name: "Cylinder", inputs: ["Radius", "Height"] },
    cube: { name: "Cube", inputs: ["Side"] },
  };

  const handleCalculate = () => {
    const vals = Object.keys(inputs).reduce((acc, key) => {
      acc[key] = parseFloat(inputs[key] || "0");
      return acc;
    }, {} as Record<string, number>);

    let res: { area?: number; volume?: number; perimeter?: number } = {};

    switch(shape) {
      case "circle":
        res.area = Math.PI * vals.Radius ** 2;
        res.perimeter = 2 * Math.PI * vals.Radius;
        break;
      case "rectangle":
        res.area = vals.Length * vals.Width;
        res.perimeter = 2 * (vals.Length + vals.Width);
        break;
      case "triangle":
        res.area = 0.5 * vals.Base * vals.Height;
        break;
      case "sphere":
        res.area = 4 * Math.PI * vals.Radius ** 2;
        res.volume = (4/3) * Math.PI * vals.Radius ** 3;
        break;
      case "cylinder":
        res.area = 2 * Math.PI * vals.Radius * (vals.Radius + vals.Height);
        res.volume = Math.PI * vals.Radius ** 2 * vals.Height;
        break;
      case "cube":
        res.area = 6 * vals.Side ** 2;
        res.volume = vals.Side ** 3;
        break;
    }

    setResult(res);
  };

  return (
    <Card className="w-full border-t-4 border-t-indigo-500">
      <CardHeader>
        <CardTitle>Geometry Calculator</CardTitle>
        <CardDescription>Calculate Area, Perimeter, and Volume for common shapes.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Select Shape</Label>
          <Select value={shape} onValueChange={(v) => { setShape(v); setInputs({}); setResult(null); }}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(shapes).map(([key, val]) => (
                <SelectItem key={key} value={key}>{val.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {shapes[shape as keyof typeof shapes].inputs.map((label) => (
            <div key={label} className="space-y-2">
              <Label>{label}</Label>
              <Input 
                type="number" 
                value={inputs[label] || ""} 
                onChange={(e) => setInputs({ ...inputs, [label]: e.target.value })} 
                placeholder={`Enter ${label}`}
              />
            </div>
          ))}
        </div>

        <Button onClick={handleCalculate} className="w-full bg-indigo-600 hover:bg-indigo-700">Calculate</Button>

        {result && (
          <div className="grid grid-cols-2 gap-4 pt-4">
            {result.area !== undefined && (
              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 text-center">
                <p className="text-xs text-muted-foreground uppercase">Area / Surface</p>
                <p className="text-xl font-bold text-indigo-600">{result.area.toFixed(2)}</p>
              </div>
            )}
            {result.perimeter !== undefined && (
              <div className="p-4 bg-slate-50 dark:bg-slate-900/20 rounded-lg border border-slate-100 text-center">
                <p className="text-xs text-muted-foreground uppercase">Perimeter</p>
                <p className="text-xl font-bold">{result.perimeter.toFixed(2)}</p>
              </div>
            )}
            {result.volume !== undefined && (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 text-center">
                <p className="text-xs text-muted-foreground uppercase">Volume</p>
                <p className="text-xl font-bold text-emerald-600">{result.volume.toFixed(2)}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}