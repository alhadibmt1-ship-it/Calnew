import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SolarPanelArrayCalculator() {
  const [values, setValues] = useState({
    dailyKwh: "30",
    sunHours: "5",
    panelW: "400",
    efficiency: "80",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const daily = parseFloat(s.dailyKwh)||0; const sun = parseFloat(s.sunHours)||0; const pw = parseFloat(s.panelW)||400;
      const eff = (parseFloat(s.efficiency)||80)/100; const systemKw = daily / (sun * eff);
      const panels = Math.ceil(systemKw * 1000 / pw);
      return { "System Size (kW)": systemKw.toFixed(2), "Number of Panels": panels, "Array Output (kWh/day)": (panels*pw*sun*eff/1000).toFixed(1), "Annual Output (kWh)": (panels*pw*sun*eff/1000*365).toFixed(0) };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="solar-panel-array-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Solar Panel Array Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate solar panel array size and output</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="dailyKwh">Daily Energy Need (kWh)</label>
              <Input
                id="dailyKwh"
                data-testid="input-dailyKwh"
                type="number"
                value={values.dailyKwh}
                onChange={(e) => setValues({...values, dailyKwh: e.target.value})}
                placeholder="Daily Energy Need (kWh)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="sunHours">Peak Sun Hours</label>
              <Input
                id="sunHours"
                data-testid="input-sunHours"
                type="number"
                value={values.sunHours}
                onChange={(e) => setValues({...values, sunHours: e.target.value})}
                placeholder="Peak Sun Hours"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="panelW">Panel Wattage (W)</label>
              <Input
                id="panelW"
                data-testid="input-panelW"
                type="number"
                value={values.panelW}
                onChange={(e) => setValues({...values, panelW: e.target.value})}
                placeholder="Panel Wattage (W)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="efficiency">System Efficiency (%)</label>
              <Input
                id="efficiency"
                data-testid="input-efficiency"
                type="number"
                value={values.efficiency}
                onChange={(e) => setValues({...values, efficiency: e.target.value})}
                placeholder="System Efficiency (%)"
              />
            </div>
        </div>
        <Button onClick={handleCalculate} className="w-full" data-testid="button-calculate">Calculate</Button>
        {results && (
          <div className="bg-muted rounded-lg p-4 space-y-2" data-testid="results">
            {Object.entries(results).map(([key, val]) => (
              <div key={key} className="flex justify-between">
                <span className="text-muted-foreground">{key}</span>
                <span className="font-semibold">{val}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
