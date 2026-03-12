import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function WireSizeAWGCalculator() {
  const [values, setValues] = useState({
    amps: "20",
    distance: "50",
    voltage: "120",
    maxDrop: "3",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const amps = parseFloat(s.amps)||0; const dist = parseFloat(s.distance)||0;
      const volts = parseFloat(s.voltage)||120; const maxDrop = parseFloat(s.maxDrop)||3;
      const cmil = (amps * dist * 2 * 10.8) / (volts * maxDrop / 100);
      const gauges = [{awg:14,cmil:4110},{awg:12,cmil:6530},{awg:10,cmil:10380},{awg:8,cmil:16510},{awg:6,cmil:26240},{awg:4,cmil:41740},{awg:2,cmil:66360},{awg:1,cmil:83690}];
      let rec = gauges[gauges.length-1]; for(const g of gauges) { if(g.cmil >= cmil) { rec = g; break; } }
      return { "Required Circular Mils": Math.round(cmil).toLocaleString(), "Recommended AWG": "#"+rec.awg, "Max Amperage": amps+"A", "Voltage Drop": (amps*dist*2*10.8/rec.cmil/volts*100).toFixed(2)+"%" };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="wire-size-a-w-g-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Wire Size AWG Calculator</CardTitle>
        <p className="text-muted-foreground">Determine wire gauge based on amperage and distance</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="amps">Amperage (A)</label>
              <Input
                id="amps"
                data-testid="input-amps"
                type="number"
                value={values.amps}
                onChange={(e) => setValues({...values, amps: e.target.value})}
                placeholder="Amperage (A)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="distance">One-way Distance (ft)</label>
              <Input
                id="distance"
                data-testid="input-distance"
                type="number"
                value={values.distance}
                onChange={(e) => setValues({...values, distance: e.target.value})}
                placeholder="One-way Distance (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="voltage">Voltage (V)</label>
              <Input
                id="voltage"
                data-testid="input-voltage"
                type="number"
                value={values.voltage}
                onChange={(e) => setValues({...values, voltage: e.target.value})}
                placeholder="Voltage (V)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="maxDrop">Max Voltage Drop (%)</label>
              <Input
                id="maxDrop"
                data-testid="input-maxDrop"
                type="number"
                value={values.maxDrop}
                onChange={(e) => setValues({...values, maxDrop: e.target.value})}
                placeholder="Max Voltage Drop (%)"
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
