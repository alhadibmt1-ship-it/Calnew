import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FuelCostCalculator() {
  const [distance, setDistance] = useState("");
  const [distanceUnit, setDistanceUnit] = useState("miles");
  const [fuelEfficiency, setFuelEfficiency] = useState("");
  const [efficiencyUnit, setEfficiencyUnit] = useState("mpg");
  const [fuelPrice, setFuelPrice] = useState("");
  const [priceUnit, setPriceUnit] = useState("gallon");
  const [result, setResult] = useState<{
    fuelNeeded: number;
    totalCost: number;
    costPerMile: number;
  } | null>(null);

  const calculate = () => {
    const dist = parseFloat(distance) || 0;
    const eff = parseFloat(fuelEfficiency) || 0;
    const price = parseFloat(fuelPrice) || 0;

    if (dist <= 0 || eff <= 0 || price <= 0) return;

    let distMiles = dist;
    if (distanceUnit === "km") distMiles = dist * 0.621371;

    let fuelGallons: number;
    if (efficiencyUnit === "mpg") {
      fuelGallons = distMiles / eff;
    } else if (efficiencyUnit === "kml") {
      const distKm = distanceUnit === "km" ? dist : dist * 1.60934;
      const liters = distKm / eff;
      fuelGallons = liters / 3.78541;
    } else {
      const distKm = distanceUnit === "km" ? dist : dist * 1.60934;
      const liters = (eff / 100) * distKm;
      fuelGallons = liters / 3.78541;
    }

    let fuelForPrice = fuelGallons;
    if (priceUnit === "liter") {
      fuelForPrice = fuelGallons * 3.78541;
    }

    const totalCost = fuelForPrice * price;
    const costPerMile = totalCost / distMiles;

    setResult({
      fuelNeeded: parseFloat(fuelForPrice.toFixed(2)),
      totalCost: parseFloat(totalCost.toFixed(2)),
      costPerMile: parseFloat(costPerMile.toFixed(4)),
    });
  };

  return (
    <Card className="w-full border-t-4 border-t-orange-500">
      <CardHeader>
        <CardTitle>Fuel Cost Calculator</CardTitle>
        <CardDescription>Estimate fuel costs for your trip based on distance, fuel efficiency, and gas prices.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-2">
          <Label>Trip Distance</Label>
          <div className="flex gap-2">
            <Input data-testid="input-distance" type="number" placeholder="100" value={distance} onChange={(e) => setDistance(e.target.value)} className="flex-1" />
            <Select value={distanceUnit} onValueChange={setDistanceUnit} data-testid="select-distance-unit">
              <SelectTrigger className="w-[100px]" data-testid="select-distance-unit-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="miles">Miles</SelectItem>
                <SelectItem value="km">Km</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Fuel Efficiency</Label>
          <div className="flex gap-2">
            <Input data-testid="input-fuel-efficiency" type="number" placeholder="25" value={fuelEfficiency} onChange={(e) => setFuelEfficiency(e.target.value)} className="flex-1" />
            <Select value={efficiencyUnit} onValueChange={setEfficiencyUnit} data-testid="select-efficiency-unit">
              <SelectTrigger className="w-[120px]" data-testid="select-efficiency-unit-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mpg">MPG</SelectItem>
                <SelectItem value="kml">km/L</SelectItem>
                <SelectItem value="l100km">L/100km</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Fuel Price</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">$</span>
              <Input data-testid="input-fuel-price" type="number" placeholder="3.50" value={fuelPrice} onChange={(e) => setFuelPrice(e.target.value)} className="pl-7" />
            </div>
            <Select value={priceUnit} onValueChange={setPriceUnit} data-testid="select-price-unit">
              <SelectTrigger className="w-[120px]" data-testid="select-price-unit-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gallon">per gallon</SelectItem>
                <SelectItem value="liter">per liter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button data-testid="button-calculate" className="w-full bg-orange-500 hover:bg-orange-600 text-white" onClick={calculate}>Calculate Fuel Cost</Button>

        {result && (
          <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-4">
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-800 text-center">
              <p className="text-sm text-muted-foreground uppercase">Total Fuel Cost</p>
              <p className="text-4xl font-bold text-orange-600 dark:text-orange-400" data-testid="text-total-cost">${result.totalCost.toFixed(2)}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-muted/30 rounded border text-center">
                <p className="text-xs text-muted-foreground">Fuel Needed</p>
                <p className="text-lg font-bold" data-testid="text-fuel-needed">{result.fuelNeeded} {priceUnit === "liter" ? "L" : "gal"}</p>
              </div>
              <div className="p-3 bg-muted/30 rounded border text-center">
                <p className="text-xs text-muted-foreground">Cost per Mile</p>
                <p className="text-lg font-bold" data-testid="text-cost-per-mile">${result.costPerMile.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}