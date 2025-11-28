import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function ColorPicker() {
  const [color, setColor] = useState("#2563EB");
  const [rgb, setRgb] = useState("rgb(37, 99, 235)");
  const [hsl, setHsl] = useState("hsl(221, 83%, 53%)");

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0; 
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value;
    setColor(hex);
    
    const { r, g, b } = hexToRgb(hex);
    setRgb(`rgb(${r}, ${g}, ${b})`);
    
    const { h, s, l } = rgbToHsl(r, g, b);
    setHsl(`hsl(${h}, ${s}%, ${l}%)`);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Color Picker Tool</CardTitle>
        <CardDescription>Get Hex, RGB, and HSL values from a color picker.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-muted shadow-inner">
            <Input 
              type="color" 
              value={color} 
              onChange={handleColorChange}
              className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] p-0 m-0 cursor-pointer opacity-0" 
            />
            <div 
              className="w-full h-full" 
              style={{ backgroundColor: color }} 
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>HEX</Label>
            <div className="flex gap-2">
              <Input value={color} readOnly className="font-mono" />
              <div className="w-10 h-10 rounded border" style={{ backgroundColor: color }}></div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>RGB</Label>
            <Input value={rgb} readOnly className="font-mono" />
          </div>
          <div className="space-y-2">
            <Label>HSL</Label>
            <Input value={hsl} readOnly className="font-mono" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}