import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NetPromoterScoreCalculator() {
  const [values, setValues] = useState({
    promoters: "60",
    passives: "25",
    detractors: "15",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const p=parseFloat(s.promoters)||0;const pa=parseFloat(s.passives)||0;const d=parseFloat(s.detractors)||0;
      const total=p+pa+d;const pPct=total>0?(p/total)*100:0;const dPct=total>0?(d/total)*100:0;const nps=pPct-dPct;
      let rating="Needs Improvement";if(nps>0)rating="Good";if(nps>30)rating="Great";if(nps>70)rating="Excellent";
      return{"NPS Score":nps.toFixed(0),"Rating":rating,"Promoters":pPct.toFixed(1)+"%","Passives":(total>0?(pa/total)*100:0).toFixed(1)+"%","Detractors":dPct.toFixed(1)+"%","Total Responses":total};
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="net-promoter-score-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Net Promoter Score Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="promoters">Promoters (9-10 rating)</label>
              <Input
                id="promoters"
                data-testid="input-promoters"
                type="number"
                value={values.promoters}
                onChange={(e) => setValues({...values, promoters: e.target.value})}
                placeholder="Promoters (9-10 rating)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="passives">Passives (7-8 rating)</label>
              <Input
                id="passives"
                data-testid="input-passives"
                type="number"
                value={values.passives}
                onChange={(e) => setValues({...values, passives: e.target.value})}
                placeholder="Passives (7-8 rating)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="detractors">Detractors (0-6 rating)</label>
              <Input
                id="detractors"
                data-testid="input-detractors"
                type="number"
                value={values.detractors}
                onChange={(e) => setValues({...values, detractors: e.target.value})}
                placeholder="Detractors (0-6 rating)"
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
