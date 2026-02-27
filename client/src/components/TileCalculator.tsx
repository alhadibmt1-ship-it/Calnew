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
  const [groutWidth, setGroutWidth] = useState("0.125");
  const [wastage, setWastage] = useState("10");
  const [result, setResult] = useState<{
    roomArea: number;
    tileArea: number;
    tilesNeeded: number;
    tilesWithWastage: number;
    wastageAllowance: number;
  } | null>(null);

  const calculate = () => {
    const rL = parseFloat(roomLength);
    const rW = parseFloat(roomWidth);
    const tL = parseFloat(tileLength);
    const tW = parseFloat(tileWidth);
    const gW = parseFloat(groutWidth);
    const wPct = parseFloat(wastage);

    if (rL > 0 && rW > 0 && tL > 0 && tW > 0 && gW >= 0 && wPct >= 0) {
      const roomArea = rL * rW;
      const tileLengthFt = (tL + gW) / 12;
      const tileWidthFt = (tW + gW) / 12;
      const tileArea = tileLengthFt * tileWidthFt;
      const tilesNeeded = Math.ceil(roomArea / tileArea);
      const wastageAllowance = Math.ceil(tilesNeeded * (wPct / 100));
      const tilesWithWastage = tilesNeeded + wastageAllowance;

      setResult({ roomArea, tileArea: tL * tW, tilesNeeded, tilesWithWastage, wastageAllowance });
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle data-testid="text-title">Tile Calculator</CardTitle>
        <CardDescription>Calculate the number of tiles needed for your room, including grout spacing and wastage allowance.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Room Length (feet)</Label>
            <Input data-testid="input-room-length" type="number" value={roomLength} onChange={(e) => setRoomLength(e.target.value)} placeholder="15" />
          </div>
          <div className="space-y-2">
            <Label>Room Width (feet)</Label>
            <Input data-testid="input-room-width" type="number" value={roomWidth} onChange={(e) => setRoomWidth(e.target.value)} placeholder="12" />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Tile Length (inches)</Label>
            <Input data-testid="input-tile-length" type="number" value={tileLength} onChange={(e) => setTileLength(e.target.value)} placeholder="12" />
          </div>
          <div className="space-y-2">
            <Label>Tile Width (inches)</Label>
            <Input data-testid="input-tile-width" type="number" value={tileWidth} onChange={(e) => setTileWidth(e.target.value)} placeholder="12" />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Grout Width (inches)</Label>
            <Input data-testid="input-grout-width" type="number" value={groutWidth} onChange={(e) => setGroutWidth(e.target.value)} placeholder="0.125" step="0.0625" />
          </div>
          <div className="space-y-2">
            <Label>Wastage Allowance (%)</Label>
            <Input data-testid="input-wastage" type="number" value={wastage} onChange={(e) => setWastage(e.target.value)} placeholder="10" />
          </div>
        </div>

        <Button data-testid="button-calculate" onClick={calculate} className="w-full">Calculate Tiles</Button>

        {result && (
          <div className="space-y-4 pt-4 animate-in fade-in-50">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground uppercase">Room Area</p>
                <p data-testid="text-room-area" className="text-2xl font-bold text-primary">{result.roomArea.toFixed(1)} ft²</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground uppercase">Tiles Needed</p>
                <p data-testid="text-tiles-needed" className="text-2xl font-bold text-primary">{result.tilesNeeded}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center col-span-2 sm:col-span-1">
                <p className="text-xs text-muted-foreground uppercase">With Wastage</p>
                <p data-testid="text-tiles-with-wastage" className="text-2xl font-bold text-green-600">{result.tilesWithWastage}</p>
                <p className="text-xs text-muted-foreground">+{result.wastageAllowance} extra tiles</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">Tile size: {tileLength}" × {tileWidth}" | Grout: {groutWidth}"</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}