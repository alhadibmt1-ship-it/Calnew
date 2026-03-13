import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NetProfitCalculator() {
  const [revenue, setRevenue] = useState("");
  const [cogs, setCogs] = useState("");
  const [opex, setOpex] = useState("");
  const [taxes, setTaxes] = useState("");
  const [result, setResult] = useState<{ grossProfit: number; operatingProfit: number; netProfit: number; grossMargin: number; operatingMargin: number; netMargin: number } | null>(null);

  const calculate = () => {
    const r = parseFloat(revenue);
    const c = parseFloat(cogs) || 0;
    const o = parseFloat(opex) || 0;
    const t = parseFloat(taxes) || 0;
    if (r > 0) {
      const gp = r - c;
      const op = gp - o;
      const np = op - t;
      setResult({
        grossProfit: gp, operatingProfit: op, netProfit: np,
        grossMargin: (gp / r) * 100, operatingMargin: (op / r) * 100, netMargin: (np / r) * 100
      });
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-emerald-600" data-testid="net-profit-calculator">
      <CardHeader>
        <CardTitle>Net Profit Calculator</CardTitle>
        <CardDescription>Calculate gross, operating, and net profit with all margin percentages.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Revenue ($)</Label><Input type="number" placeholder="200000" value={revenue} onChange={(e) => setRevenue(e.target.value)} data-testid="input-revenue" /></div>
          <div className="space-y-2"><Label>Cost of Goods Sold ($)</Label><Input type="number" placeholder="80000" value={cogs} onChange={(e) => setCogs(e.target.value)} data-testid="input-cogs" /></div>
          <div className="space-y-2"><Label>Operating Expenses ($)</Label><Input type="number" placeholder="40000" value={opex} onChange={(e) => setOpex(e.target.value)} data-testid="input-opex" /></div>
          <div className="space-y-2"><Label>Taxes ($)</Label><Input type="number" placeholder="15000" value={taxes} onChange={(e) => setTaxes(e.target.value)} data-testid="input-taxes" /></div>
        </div>
        <Button onClick={calculate} className="w-full bg-emerald-600 hover:bg-emerald-700" data-testid="button-calculate">Calculate</Button>
        {result && (
          <div className="space-y-3 mt-4 animate-in fade-in" data-testid="result-section">
            {[
              { label: "Gross Profit", value: result.grossProfit, margin: result.grossMargin, color: "text-green-600" },
              { label: "Operating Profit", value: result.operatingProfit, margin: result.operatingMargin, color: "text-blue-600" },
              { label: "Net Profit", value: result.netProfit, margin: result.netMargin, color: "text-emerald-600" },
            ].map(row => (
              <div key={row.label} className="flex items-center justify-between bg-muted/50 rounded-lg p-4">
                <span className="text-sm font-medium">{row.label}</span>
                <div className="flex items-center gap-4">
                  <span className={`text-xl font-bold ${row.color}`}>${row.value.toLocaleString()}</span>
                  <span className={`text-sm font-medium px-2 py-0.5 rounded ${row.margin >= 0 ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"}`}>{row.margin.toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
