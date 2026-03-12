import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DebtToIncomeCalculator() {
  const [values, setValues] = useState({
    income: "6000",
    mortgage: "1500",
    carPayment: "400",
    creditCards: "200",
    otherDebt: "100",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const income=parseFloat(s.income)||0;const totalDebt=(parseFloat(s.mortgage)||0)+(parseFloat(s.carPayment)||0)+(parseFloat(s.creditCards)||0)+(parseFloat(s.otherDebt)||0);
      const dti=income>0?(totalDebt/income)*100:0;
      let status="Excellent";if(dti>20)status="Good";if(dti>36)status="Fair";if(dti>43)status="Poor";if(dti>50)status="Very High";
      return{"Total Monthly Debts":"$"+totalDebt.toFixed(0),"Gross Income":"$"+income.toFixed(0),"DTI Ratio":dti.toFixed(1)+"%","Status":status,"Max for Mortgage":"$"+(income*0.28).toFixed(0)};
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="debt-to-income-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Debt to Income Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="income">Gross Monthly Income ($)</label>
              <Input
                id="income"
                data-testid="input-income"
                type="number"
                value={values.income}
                onChange={(e) => setValues({...values, income: e.target.value})}
                placeholder="Gross Monthly Income ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="mortgage">Mortgage/Rent ($)</label>
              <Input
                id="mortgage"
                data-testid="input-mortgage"
                type="number"
                value={values.mortgage}
                onChange={(e) => setValues({...values, mortgage: e.target.value})}
                placeholder="Mortgage/Rent ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="carPayment">Car Payment ($)</label>
              <Input
                id="carPayment"
                data-testid="input-carPayment"
                type="number"
                value={values.carPayment}
                onChange={(e) => setValues({...values, carPayment: e.target.value})}
                placeholder="Car Payment ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="creditCards">Credit Card Minimums ($)</label>
              <Input
                id="creditCards"
                data-testid="input-creditCards"
                type="number"
                value={values.creditCards}
                onChange={(e) => setValues({...values, creditCards: e.target.value})}
                placeholder="Credit Card Minimums ($)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="otherDebt">Other Debts ($)</label>
              <Input
                id="otherDebt"
                data-testid="input-otherDebt"
                type="number"
                value={values.otherDebt}
                onChange={(e) => setValues({...values, otherDebt: e.target.value})}
                placeholder="Other Debts ($)"
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
