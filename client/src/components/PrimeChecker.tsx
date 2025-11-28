import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PrimeChecker() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<{ isPrime: boolean; factors?: number[]; nextPrime?: number } | null>(null);

  const checkPrime = () => {
    const n = parseInt(number);
    if (isNaN(n)) return;

    if (n < 2) {
      setResult({ isPrime: false, nextPrime: 2 });
      return;
    }

    let isPrime = true;
    const factors = [1];
    const limit = Math.sqrt(n);

    for (let i = 2; i <= limit; i++) {
      if (n % i === 0) {
        isPrime = false;
        factors.push(i);
        if (i !== n/i) factors.push(n/i);
      }
    }
    factors.push(n);
    factors.sort((a, b) => a - b);

    if (isPrime) {
      setResult({ isPrime: true });
    } else {
      // Find next prime
      let next = n + 1;
      while (true) {
        let nextIsPrime = true;
        for (let i = 2; i <= Math.sqrt(next); i++) {
          if (next % i === 0) {
            nextIsPrime = false;
            break;
          }
        }
        if (nextIsPrime) {
          setResult({ isPrime: false, factors, nextPrime: next });
          break;
        }
        next++;
      }
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-blue-600">
      <CardHeader>
        <CardTitle>Prime Number Checker</CardTitle>
        <CardDescription>Check if a number is prime and find factors.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-4">
          <Input 
            type="number" 
            value={number} 
            onChange={(e) => setNumber(e.target.value)} 
            placeholder="Enter a number..." 
            className="text-lg"
            onKeyDown={(e) => e.key === "Enter" && checkPrime()}
          />
          <Button onClick={checkPrime} size="lg">Check</Button>
        </div>

        {result && (
          <div className={`p-6 rounded-xl border text-center animate-in zoom-in-95 ${result.isPrime ? 'bg-green-50 border-green-200 dark:bg-green-900/20' : 'bg-orange-50 border-orange-200 dark:bg-orange-900/20'}`}>
            <p className="text-sm uppercase font-medium text-muted-foreground mb-2">Result</p>
            <h3 className={`text-3xl font-bold mb-2 ${result.isPrime ? 'text-green-700 dark:text-green-400' : 'text-orange-700 dark:text-orange-400'}`}>
              {result.isPrime ? "It's a Prime Number!" : "Not a Prime Number"}
            </h3>
            
            {!result.isPrime && (
              <div className="space-y-4 mt-4">
                <div>
                  <p className="text-sm font-medium mb-2">Factors:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {result.factors?.slice(0, 10).map(f => (
                      <span key={f} className="px-2 py-1 bg-background rounded border text-xs font-mono">{f}</span>
                    ))}
                    {(result.factors?.length || 0) > 10 && <span className="text-xs text-muted-foreground">...and more</span>}
                  </div>
                </div>
                <div className="pt-2 border-t border-orange-200/50 dark:border-orange-800/50">
                  <p className="text-sm">Next closest prime is <strong>{result.nextPrime}</strong></p>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}