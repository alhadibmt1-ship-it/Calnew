interface FormulaBoxProps {
  formula: string;
  description?: string;
  variables?: { symbol: string; meaning: string }[];
}

export default function FormulaBox({ formula, description, variables }: FormulaBoxProps) {
  return (
    <div className="rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-5 space-y-3" data-testid="formula-box">
      <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM17 14v6M14 17h6"/></svg>
        Formula
      </div>
      <div className="font-mono text-lg md:text-xl font-bold text-foreground tracking-wide leading-relaxed">
        {formula}
      </div>
      {description && (
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      )}
      {variables && variables.length > 0 && (
        <div className="pt-2 border-t border-primary/10">
          <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Where</p>
          <div className="grid gap-1.5">
            {variables.map((v, i) => (
              <div key={i} className="flex items-baseline gap-2 text-sm">
                <span className="font-mono font-bold text-primary min-w-[2rem]">{v.symbol}</span>
                <span className="text-muted-foreground">= {v.meaning}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
