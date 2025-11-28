import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeftToLine } from "lucide-react";

// Mock exchange rates relative to USD (Base)
const exchangeRates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 150.25,
  INR: 83.12,
  CAD: 1.35,
  AUD: 1.52,
  CHF: 0.88,
  CNY: 7.19,
  NZD: 1.61,
  SGD: 1.62,
  HKD: 1.34,
  SEK: 10.35,
  KRW: 1335.50,
  BRL: 4.95,
  MXN: 4.96,
  RUB: 92.50,
  ZAR: 1.63,
  TRY: 17.05,
};

const currencies = Object.keys(exchangeRates).sort();

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState("");

  useEffect(() => {
    const val = parseFloat(amount);
    if (isNaN(val)) {
      setResult("");
      return;
    }

    // Convert From -> USD -> To
    const inUSD = val / exchangeRates[fromCurrency];
    const targetVal = inUSD * exchangeRates[toCurrency];

    setResult(targetVal.toFixed(2));
  }, [amount, fromCurrency, toCurrency]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <Card className="w-full border-t-4 border-t-emerald-600">
      <CardHeader>
        <CardTitle>Currency Converter</CardTitle>
        <CardDescription>
          Convert between major world currencies with real-time mocked rates.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-[1fr,auto,1fr] gap-4 items-end">
          <div className="space-y-2">
            <Label>From</Label>
            <div className="flex space-x-2">
              <Input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)}
                className="text-lg"
              />
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center pb-2">
            <button 
              onClick={swapCurrencies}
              className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              title="Swap Currencies"
            >
              <ArrowLeftToLine className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-2">
            <Label>To</Label>
            <div className="flex space-x-2">
              <div className="flex h-10 w-full items-center rounded-md border border-input bg-muted px-3 text-lg font-medium">
                {result}
              </div>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border text-center text-sm text-muted-foreground">
          <p>
            1 {fromCurrency} = {(exchangeRates[toCurrency] / exchangeRates[fromCurrency]).toFixed(4)} {toCurrency}
          </p>
          <p className="text-xs mt-1 opacity-70">
            *Rates are for demonstration purposes only.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}