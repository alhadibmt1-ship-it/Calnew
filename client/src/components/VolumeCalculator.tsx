import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Box, Circle, Cylinder } from "lucide-react";

export default function VolumeCalculator() {
  const [shape, setShape] = useState("cube");
  const [val1, setVal1] = useState(10); // Length / Radius
  const [val2, setVal2] = useState(10); // Width / Height
  const [val3, setVal3] = useState(10); // Height
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    let v = 0;
    if (shape === "cube") {
      v = Math.pow(val1, 3);
    } else if (shape === "rect") {
      v = val1 * val2 * val3;
    } else if (shape === "cylinder") {
      v = Math.PI * Math.pow(val1, 2) * val2;
    } else if (shape === "sphere") {
      v = (4/3) * Math.PI * Math.pow(val1, 3);
    } else if (shape === "cone") {
      v = (1/3) * Math.PI * Math.pow(val1, 2) * val2;
    }
    setResult(v);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Volume Calculator</CardTitle>
        <CardDescription>Calculate the volume of common 3D shapes.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Select Shape</Label>
          <Select value={shape} onValueChange={setShape}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cube">Cube</SelectItem>
              <SelectItem value="rect">Rectangular Tank / Box</SelectItem>
              <SelectItem value="cylinder">Cylinder</SelectItem>
              <SelectItem value="sphere">Sphere</SelectItem>
              <SelectItem value="cone">Cone</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4">
          {(shape === "cube" || shape === "sphere") && (
            <div className="space-y-2">
              <Label>{shape === "cube" ? "Side Length" : "Radius"}</Label>
              <Input type="number" value={val1} onChange={(e) => setVal1(Number(e.target.value))} />
            </div>
          )}

          {(shape === "cylinder" || shape === "cone") && (
            <>
              <div className="space-y-2">
                <Label>Radius</Label>
                <Input type="number" value={val1} onChange={(e) => setVal1(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Height</Label>
                <Input type="number" value={val2} onChange={(e) => setVal2(Number(e.target.value))} />
              </div>
            </>
          )}

          {shape === "rect" && (
            <>
              <div className="space-y-2">
                <Label>Length</Label>
                <Input type="number" value={val1} onChange={(e) => setVal1(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Width</Label>
                <Input type="number" value={val2} onChange={(e) => setVal2(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Height</Label>
                <Input type="number" value={val3} onChange={(e) => setVal3(Number(e.target.value))} />
              </div>
            </>
          )}
        </div>

        <Button className="w-full" onClick={calculate}>Calculate Volume</Button>

        {result !== null && (
          <div className="p-6 bg-muted rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Volume</p>
            <p className="text-3xl font-bold text-primary">{result.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">cubic units</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}