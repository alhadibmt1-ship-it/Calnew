import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Delete, Divide, Minus, Plus, X, RotateCcw, Equal } from "lucide-react";

export default function StandardCalculator() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [isNewNumber, setIsNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (isNewNumber) {
      setDisplay(num);
      setIsNewNumber(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperator = (op: string) => {
    setEquation(`${display} ${op} `);
    setIsNewNumber(true);
  };

  const handleEqual = () => {
    if (!equation) return;
    
    try {
      // Simple evaluation for prototype
      // Note: In a real app, use a safer math parser than eval-like logic
      // Or just use basic JS math for this demo
      const fullEquation = equation + display;
      // Replace visual operators with JS operators
      const jsEquation = fullEquation
        .replace(/×/g, "*")
        .replace(/÷/g, "/");
        
      // eslint-disable-next-line no-new-func
      const result = new Function('return ' + jsEquation)();
      
      // Format result to avoid long decimals
      const formattedResult = Math.round(result * 100000000) / 100000000;
      
      setDisplay(String(formattedResult));
      setEquation("");
      setIsNewNumber(true);
    } catch (e) {
      setDisplay("Error");
      setEquation("");
      setIsNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setEquation("");
    setIsNewNumber(true);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
      setIsNewNumber(true);
    }
  };

  const handleDecimal = () => {
    if (isNewNumber) {
      setDisplay("0.");
      setIsNewNumber(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/\d/.test(e.key)) handleNumber(e.key);
      if (e.key === "+") handleOperator("+");
      if (e.key === "-") handleOperator("-");
      if (e.key === "*") handleOperator("×");
      if (e.key === "/") handleOperator("÷");
      if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        handleEqual();
      }
      if (e.key === "Escape") handleClear();
      if (e.key === "Backspace") handleBackspace();
      if (e.key === ".") handleDecimal();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [display, equation, isNewNumber]);

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden shadow-lg border-border/50">
      <div className="bg-slate-50 dark:bg-slate-900 p-6 border-b">
        <div className="text-right h-6 text-sm text-muted-foreground mb-1 font-mono min-h-[1.5rem]">
          {equation}
        </div>
        <div className="text-right text-4xl font-bold tracking-tight font-mono truncate text-foreground" data-testid="display-main">
          {display}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-px bg-border">
        <CalcButton onClick={handleClear} className="bg-slate-100 dark:bg-slate-800 text-destructive font-bold">AC</CalcButton>
        <CalcButton onClick={handleBackspace} className="bg-slate-100 dark:bg-slate-800"><Delete className="h-5 w-5" /></CalcButton>
        <CalcButton onClick={() => handleOperator("%")} className="bg-slate-100 dark:bg-slate-800">%</CalcButton>
        <CalcButton onClick={() => handleOperator("÷")} variant="operator"><Divide className="h-5 w-5" /></CalcButton>

        <CalcButton onClick={() => handleNumber("7")}>7</CalcButton>
        <CalcButton onClick={() => handleNumber("8")}>8</CalcButton>
        <CalcButton onClick={() => handleNumber("9")}>9</CalcButton>
        <CalcButton onClick={() => handleOperator("×")} variant="operator"><X className="h-5 w-5" /></CalcButton>

        <CalcButton onClick={() => handleNumber("4")}>4</CalcButton>
        <CalcButton onClick={() => handleNumber("5")}>5</CalcButton>
        <CalcButton onClick={() => handleNumber("6")}>6</CalcButton>
        <CalcButton onClick={() => handleOperator("-")} variant="operator"><Minus className="h-5 w-5" /></CalcButton>

        <CalcButton onClick={() => handleNumber("1")}>1</CalcButton>
        <CalcButton onClick={() => handleNumber("2")}>2</CalcButton>
        <CalcButton onClick={() => handleNumber("3")}>3</CalcButton>
        <CalcButton onClick={() => handleOperator("+")} variant="operator"><Plus className="h-5 w-5" /></CalcButton>

        <CalcButton onClick={() => handleNumber("0")} className="col-span-2">0</CalcButton>
        <CalcButton onClick={handleDecimal}>.</CalcButton>
        <CalcButton onClick={handleEqual} variant="primary"><Equal className="h-5 w-5" /></CalcButton>
      </div>
    </Card>
  );
}

function CalcButton({ 
  children, 
  className, 
  variant = "default",
  onClick 
}: { 
  children: React.ReactNode; 
  className?: string;
  variant?: "default" | "operator" | "primary";
  onClick: () => void;
}) {
  const variants = {
    default: "bg-background hover:bg-accent hover:text-accent-foreground text-foreground",
    operator: "bg-slate-100 dark:bg-slate-800 text-primary hover:bg-slate-200 dark:hover:bg-slate-700",
    primary: "bg-primary text-primary-foreground hover:bg-primary/90"
  };

  return (
    <button
      className={cn(
        "h-16 sm:h-20 text-xl flex items-center justify-center calculator-btn outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset",
        variants[variant],
        className
      )}
      onClick={onClick}
      data-testid={`btn-${typeof children === 'string' ? children : 'icon'}`}
    >
      {children}
    </button>
  );
}