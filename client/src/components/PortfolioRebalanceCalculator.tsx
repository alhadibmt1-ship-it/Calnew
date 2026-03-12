import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PortfolioRebalanceCalculator() {
  const [values, setValues] = useState({
    total: "100000",
    stocksCur: "70",
    bondsCur: "20",
    cashCur: "10",
    stocksTgt: "60",
    bondsTgt: "30",
    cashTgt: "10",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const total=parseFloat(s.total)||0;
      const sc=(parseFloat(s.stocksCur)||0)/100;const bc=(parseFloat(s.bondsCur)||0)/100;const cc=(parseFloat(s.cashCur)||0)/100;
      const st=(parseFloat(s.stocksTgt)||0)/100;const bt=(parseFloat(s.bondsTgt)||0)/100;const ct=(parseFloat(s.cashTgt)||0)/100;
      const stocksMove=(st-sc)*total;const bondsMove=(bt-bc)*total;const cashMove=(ct-cc)*total;
      return{"Stocks":stocksMove>=0?"Buy $"+stocksMove.toFixed(0):"Sell $"+Math.abs(stocksMove).toFixed(0),
        "Bonds":bondsMove>=0?"Buy $"+bondsMove.toFixed(0):"Sell $"+Math.abs(bondsMove).toFixed(0),
        "Cash":cashMove>=0?"Add $"+cashMove.toFixed(0):"Withdraw $"+Math.abs(cashMove).toFixed(0)};
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="portfolio-rebalance-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Portfolio Rebalance Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="total">Total Portfolio ($)</label>
              <Input
                id="total"
                data-testid="input-total"
                type="number"
                value={values.total}
                onChange={(e) => setValues({...values, total: e.target.value})}
                placeholder="Total Portfolio ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="stocksCur">Current Stocks (%)</label>
              <Input
                id="stocksCur"
                data-testid="input-stocksCur"
                type="number"
                value={values.stocksCur}
                onChange={(e) => setValues({...values, stocksCur: e.target.value})}
                placeholder="Current Stocks (%)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="bondsCur">Current Bonds (%)</label>
              <Input
                id="bondsCur"
                data-testid="input-bondsCur"
                type="number"
                value={values.bondsCur}
                onChange={(e) => setValues({...values, bondsCur: e.target.value})}
                placeholder="Current Bonds (%)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="cashCur">Current Cash (%)</label>
              <Input
                id="cashCur"
                data-testid="input-cashCur"
                type="number"
                value={values.cashCur}
                onChange={(e) => setValues({...values, cashCur: e.target.value})}
                placeholder="Current Cash (%)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="stocksTgt">Target Stocks (%)</label>
              <Input
                id="stocksTgt"
                data-testid="input-stocksTgt"
                type="number"
                value={values.stocksTgt}
                onChange={(e) => setValues({...values, stocksTgt: e.target.value})}
                placeholder="Target Stocks (%)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="bondsTgt">Target Bonds (%)</label>
              <Input
                id="bondsTgt"
                data-testid="input-bondsTgt"
                type="number"
                value={values.bondsTgt}
                onChange={(e) => setValues({...values, bondsTgt: e.target.value})}
                placeholder="Target Bonds (%)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="cashTgt">Target Cash (%)</label>
              <Input
                id="cashTgt"
                data-testid="input-cashTgt"
                type="number"
                value={values.cashTgt}
                onChange={(e) => setValues({...values, cashTgt: e.target.value})}
                placeholder="Target Cash (%)"
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
