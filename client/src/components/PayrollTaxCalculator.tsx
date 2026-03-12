import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PayrollTaxCalculator() {
  const [values, setValues] = useState({
    salary: "60000",
    filingStatus: "1",
    allowances: "1",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const sal=parseFloat(s.salary)||0;const ss=Math.min(sal,160200)*0.062;const med=sal*0.0145;
      const addMed=sal>200000?(sal-200000)*0.009:0;const fica=ss+med+addMed;
      const fedTax=sal*0.22;const stateTax=sal*0.05;const net=sal-fica-fedTax-stateTax;
      return{"Gross Annual":"$"+sal.toLocaleString(),"Social Security":"$"+ss.toFixed(0),"Medicare":"$"+(med+addMed).toFixed(0),"Est. Federal Tax":"$"+fedTax.toFixed(0),"Est. State Tax":"$"+stateTax.toFixed(0),"Est. Net Annual":"$"+net.toFixed(0),"Est. Net Monthly":"$"+(net/12).toFixed(0)};
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="payroll-tax-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Payroll Tax Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
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
              <label className="block text-sm font-medium mb-1" htmlFor="filingStatus">Filing Status (1=single,2=married)</label>
              <Input
                id="filingStatus"
                data-testid="input-filingStatus"
                type="number"
                value={values.filingStatus}
                onChange={(e) => setValues({...values, filingStatus: e.target.value})}
                placeholder="Filing Status (1=single,2=married)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="allowances">Allowances</label>
              <Input
                id="allowances"
                data-testid="input-allowances"
                type="number"
                value={values.allowances}
                onChange={(e) => setValues({...values, allowances: e.target.value})}
                placeholder="Allowances"
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
