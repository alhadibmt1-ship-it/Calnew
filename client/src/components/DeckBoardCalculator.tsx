import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DeckBoardCalculator() {
  const [values, setValues] = useState({
    deckL: "16",
    deckW: "12",
    boardW: "5.5",
    gap: "0.125",
  });
  const [results, setResults] = useState<Record<string, string | number> | null>(null);

  const calculate = () => {
    const s = values;
    try {
      const area = (parseFloat(s.deckL)||0) * (parseFloat(s.deckW)||0);
      const boardW = ((parseFloat(s.boardW)||5.5) + (parseFloat(s.gap)||0.125)) / 12;
      const boards = Math.ceil((parseFloat(s.deckW)||0) / boardW);
      const totalLF = boards * (parseFloat(s.deckL)||0);
      return { "Deck Area (sq ft)": area.toFixed(0), "Number of Boards": boards, "Total Linear Feet": totalLF.toFixed(0), "12ft Boards Needed": Math.ceil(totalLF/12), "16ft Boards Needed": Math.ceil(totalLF/16) };
    } catch { return {}; }
  };

  const handleCalculate = () => {
    const r = calculate();
    if (r) setResults(r);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="deck-board-calculator">
      <CardHeader>
        <CardTitle className="text-2xl">Deck Board Calculator</CardTitle>
        <p className="text-muted-foreground">Calculate deck boards needed</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="deckL">Deck Length (ft)</label>
              <Input
                id="deckL"
                data-testid="input-deckL"
                type="number"
                value={values.deckL}
                onChange={(e) => setValues({...values, deckL: e.target.value})}
                placeholder="Deck Length (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="deckW">Deck Width (ft)</label>
              <Input
                id="deckW"
                data-testid="input-deckW"
                type="number"
                value={values.deckW}
                onChange={(e) => setValues({...values, deckW: e.target.value})}
                placeholder="Deck Width (ft)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="boardW">Board Width (inches)</label>
              <Input
                id="boardW"
                data-testid="input-boardW"
                type="number"
                value={values.boardW}
                onChange={(e) => setValues({...values, boardW: e.target.value})}
                placeholder="Board Width (inches)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="gap">Gap Between Boards (inches)</label>
              <Input
                id="gap"
                data-testid="input-gap"
                type="number"
                value={values.gap}
                onChange={(e) => setValues({...values, gap: e.target.value})}
                placeholder="Gap Between Boards (inches)"
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
