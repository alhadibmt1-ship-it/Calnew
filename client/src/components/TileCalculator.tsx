import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TileCalculator() {
  const [roomLength, setRoomLength] = useState("");
  const [roomWidth, setRoomWidth] = useState("");
  const [tileLength, setTileLength] = useState("12");
  const [tileWidth, setTileWidth] = useState("12");
  const [groutWidth, setGroutWidth] = useState("3");
  const [wastage, setWastage] = useState("10");
  const [result, setResult] = useState<{ roomArea: number; tiles: number; tilesWithWastage: number; boxes: number } | null>(null);

  const calculate = () => {
    const rl = parseFloat(roomLength);
    const rw = parseFloat(roomWidth);
    const tl = parseFloat(tileLength);
    const tw = parseFloat(tileWidth);
    if (rl > 0 && rw > 0 && tl > 0 && tw > 0) {
      const roomAreaSqft = rl * rw;
      const grout = (parseFloat(groutWidth) || 0) / 25.4;
      const tileAreaSqft = ((tl + grout) * (tw + grout)) / 144;
      const tilesNeeded = Math.ceil(roomAreaSqft / tileAreaSqft);
      const w = parseFloat(wastage) || 10;
      const tilesWithWastage = Math.ceil(tilesNeeded * (1 + w / 100));
      const boxes = Math.ceil(tilesWithWastage / 12);
      setResult({ roomArea: roomAreaSqft, tiles: tilesNeeded, tilesWithWastage, boxes });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-teal-600" data-testid="tile-calculator">
      <CardHeader>
        <CardTitle>Tile Calculator</CardTitle>
        <CardDescription>Calculate the number of tiles needed for your floor or wall project.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Room Length (ft)</Label><Input type="number" placeholder="15" value={roomLength} onChange={(e) => setRoomLength(e.target.value)} data-testid="input-room-length" /></div>
          <div className="space-y-2"><Label>Room Width (ft)</Label><Input type="number" placeholder="12" value={roomWidth} onChange={(e) => setRoomWidth(e.target.value)} data-testid="input-room-width" /></div>
        </div>
        <div className="grid sm:grid-cols-4 gap-4">
          <div className="space-y-2"><Label>Tile Length (in)</Label><Input type="number" placeholder="12" value={tileLength} onChange={(e) => setTileLength(e.target.value)} data-testid="input-tile-length" /></div>
          <div className="space-y-2"><Label>Tile Width (in)</Label><Input type="number" placeholder="12" value={tileWidth} onChange={(e) => setTileWidth(e.target.value)} data-testid="input-tile-width" /></div>
          <div className="space-y-2"><Label>Grout Width (mm)</Label><Input type="number" placeholder="3" value={groutWidth} onChange={(e) => setGroutWidth(e.target.value)} data-testid="input-grout" /></div>
          <div className="space-y-2"><Label>Wastage (%)</Label><Input type="number" placeholder="10" value={wastage} onChange={(e) => setWastage(e.target.value)} data-testid="input-wastage" /></div>
        </div>
        <Button onClick={calculate} className="w-full bg-teal-600 hover:bg-teal-700" data-testid="button-calculate">Calculate</Button>
        {result && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 animate-in fade-in" data-testid="result-section">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Room Area</p>
              <p className="text-xl font-bold text-teal-600" data-testid="text-area">{result.roomArea.toFixed(0)} sqft</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Tiles Needed</p>
              <p className="text-xl font-bold text-blue-600" data-testid="text-tiles">{result.tiles}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">With Wastage</p>
              <p className="text-xl font-bold text-orange-600" data-testid="text-with-wastage">{result.tilesWithWastage}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Boxes (~12/box)</p>
              <p className="text-xl font-bold text-green-600" data-testid="text-boxes">{result.boxes}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
