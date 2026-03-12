import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function StockProfitLossCalculator() {
  const [values, setValues] = useState({
    buyPrice: "50",
    sellPrice: "75",
    shares: "100",
    buyFee: "0",
    sellFee: "0",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const bp=parseFloat(s.buyPrice)||0;const sp=parseFloat(s.sellPrice)||0;const n=parseFloat(s.shares)||0;
      const totalBuy=bp*n+(parseFloat(s.buyFee)||0);const totalSell=sp*n-(parseFloat(s.sellFee)||0);
      const profit=totalSell-totalBuy;const pct=totalBuy>0?(profit/totalBuy)*100:0;
      return{"Total Cost":"$"+totalBuy.toFixed(2),"Total Proceeds":"$"+totalSell.toFixed(2),"Profit/Loss":"$"+profit.toFixed(2),"Return":pct.toFixed(2)+"%","Per Share P/L":"$"+(profit/n).toFixed(2)};
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="stock-profit-loss-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Stock Profit Loss Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="buyPrice">Buy Price per Share ($)</label>
              <Input
                id="buyPrice"
                data-testid="input-buyPrice"
                type="number"
                value={values.buyPrice}
                onChange={(e) => setValues({...values, buyPrice: e.target.value})}
                placeholder="Buy Price per Share ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="sellPrice">Sell Price per Share ($)</label>
              <Input
                id="sellPrice"
                data-testid="input-sellPrice"
                type="number"
                value={values.sellPrice}
                onChange={(e) => setValues({...values, sellPrice: e.target.value})}
                placeholder="Sell Price per Share ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="shares">Number of Shares</label>
              <Input
                id="shares"
                data-testid="input-shares"
                type="number"
                value={values.shares}
                onChange={(e) => setValues({...values, shares: e.target.value})}
                placeholder="Number of Shares"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="buyFee">Buy Commission ($)</label>
              <Input
                id="buyFee"
                data-testid="input-buyFee"
                type="number"
                value={values.buyFee}
                onChange={(e) => setValues({...values, buyFee: e.target.value})}
                placeholder="Buy Commission ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="sellFee">Sell Commission ($)</label>
              <Input
                id="sellFee"
                data-testid="input-sellFee"
                type="number"
                value={values.sellFee}
                onChange={(e) => setValues({...values, sellFee: e.target.value})}
                placeholder="Sell Commission ($)"
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
