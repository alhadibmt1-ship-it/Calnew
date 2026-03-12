import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FourOOneKProjectionCalculator() {
  const [values, setValues] = useState({
    current: "50000",
    salary: "80000",
    contribution: "6",
    match: "3",
    rate: "7",
    years: "25",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const cur=parseFloat(s.current)||0;const sal=parseFloat(s.salary)||0;
      const contrib=(parseFloat(s.contribution)||6)/100;const match=Math.min((parseFloat(s.match)||3)/100,contrib);
      const r=(parseFloat(s.rate)||7)/100;const y=parseFloat(s.years)||25;
      const annualContrib=sal*(contrib+match);let bal=cur;for(let i=0;i<y;i++)bal=(bal+annualContrib)*(1+r);
      return{"Projected Balance":"$"+bal.toFixed(0),"Your Contributions":"$"+(sal*contrib*y).toFixed(0),"Employer Match":"$"+(sal*match*y).toFixed(0),"Investment Growth":"$"+(bal-cur-sal*(contrib+match)*y).toFixed(0)};
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="four-o-one-k-projection-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">401k Projection Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="current">Current Balance ($)</label>
              <Input
                id="current"
                data-testid="input-current"
                type="number"
                value={values.current}
                onChange={(e) => setValues({...values, current: e.target.value})}
                placeholder="Current Balance ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="salary">Annual Salary ($)</label>
              <Input
                id="salary"
                data-testid="input-salary"
                type="number"
                value={values.salary}
                onChange={(e) => setValues({...values, salary: e.target.value})}
                placeholder="Annual Salary ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="contribution">Contribution (%)</label>
              <Input
                id="contribution"
                data-testid="input-contribution"
                type="number"
                value={values.contribution}
                onChange={(e) => setValues({...values, contribution: e.target.value})}
                placeholder="Contribution (%)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="match">Employer Match (%)</label>
              <Input
                id="match"
                data-testid="input-match"
                type="number"
                value={values.match}
                onChange={(e) => setValues({...values, match: e.target.value})}
                placeholder="Employer Match (%)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="rate">Annual Return (%)</label>
              <Input
                id="rate"
                data-testid="input-rate"
                type="number"
                value={values.rate}
                onChange={(e) => setValues({...values, rate: e.target.value})}
                placeholder="Annual Return (%)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="years">Years to Retirement</label>
              <Input
                id="years"
                data-testid="input-years"
                type="number"
                value={values.years}
                onChange={(e) => setValues({...values, years: e.target.value})}
                placeholder="Years to Retirement"
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
