import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CryptoROICalculator() {
  const [values, setValues] = useState({
    buyPrice: "1000",
    sellPrice: "2500",
    amount: "5000",
    fees: "50",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const bp=parseFloat(s.buyPrice)||1;const sp=parseFloat(s.sellPrice)||0;const amt=parseFloat(s.amount)||0;const fees=parseFloat(s.fees)||0;
      const coins=amt/bp;const currentVal=coins*sp;const profit=currentVal-amt-fees;const roi=(profit/(amt+fees))*100;
      return{"Coins/Tokens":coins.toFixed(6),"Current Value":"$"+currentVal.toFixed(2),"Profit/Loss":"$"+profit.toFixed(2),"ROI":roi.toFixed(2)+"%","Break-Even Price":"$"+((amt+fees)/coins).toFixed(2)};
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="crypto-r-o-i-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Crypto ROI Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="buyPrice">Buy Price ($)</label>
              <Input
                id="buyPrice"
                data-testid="input-buyPrice"
                type="number"
                value={values.buyPrice}
                onChange={(e) => setValues({...values, buyPrice: e.target.value})}
                placeholder="Buy Price ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="sellPrice">Current/Sell Price ($)</label>
              <Input
                id="sellPrice"
                data-testid="input-sellPrice"
                type="number"
                value={values.sellPrice}
                onChange={(e) => setValues({...values, sellPrice: e.target.value})}
                placeholder="Current/Sell Price ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="amount">Amount Invested ($)</label>
              <Input
                id="amount"
                data-testid="input-amount"
                type="number"
                value={values.amount}
                onChange={(e) => setValues({...values, amount: e.target.value})}
                placeholder="Amount Invested ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="fees">Total Fees ($)</label>
              <Input
                id="fees"
                data-testid="input-fees"
                type="number"
                value={values.fees}
                onChange={(e) => setValues({...values, fees: e.target.value})}
                placeholder="Total Fees ($)"
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
