import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Delete, Divide, Minus, Plus, X, RotateCcw, Equal, Calculator as CalcIcon } from "lucide-react";

export default function ScientificCalculator() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [isNewNumber, setIsNewNumber] = useState(true);
  const [memory, setMemory] = useState<number>(0);
  const [angleMode, setAngleMode] = useState<"DEG" | "RAD">("DEG");

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

  const handleFunc = (func: string) => {
    const val = parseFloat(display);
    let res = 0;
    
    switch(func) {
      case "sin":
        res = angleMode === "DEG" ? Math.sin(val * Math.PI / 180) : Math.sin(val);
        break;
      case "cos":
        res = angleMode === "DEG" ? Math.cos(val * Math.PI / 180) : Math.cos(val);
        break;
      case "tan":
        res = angleMode === "DEG" ? Math.tan(val * Math.PI / 180) : Math.tan(val);
        break;
      case "log":
        res = Math.log10(val);
        break;
      case "ln":
        res = Math.log(val);
        break;
      case "sqrt":
        res = Math.sqrt(val);
        break;
      case "sq":
        res = val * val;
        break;
      case "inv":
        res = 1 / val;
        break;
      case "fact":
        res = factorial(val);
        break;
      case "pi":
        res = Math.PI;
        break;
      case "e":
        res = Math.E;
        break;
    }
    
    setDisplay(String(parseFloat(res.toFixed(8))));
    setIsNewNumber(true);
  };

  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  };

  const handleEqual = () => {
    if (!equation) return;
    try {
      const fullEquation = equation + display;
      const jsEquation = fullEquation
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/\^/g, "**");
        
      // eslint-disable-next-line no-new-func
      const result = new Function('return ' + jsEquation)();
      const formattedResult = parseFloat(result.toFixed(8));
      
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

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden shadow-lg border-border/50">
      <div className="bg-slate-50 dark:bg-slate-900 p-6 border-b relative">
        <div className="absolute top-4 left-4 flex gap-2">
          <button 
            onClick={() => setAngleMode(angleMode === "DEG" ? "RAD" : "DEG")}
            className="text-xs font-bold px-2 py-1 rounded bg-slate-200 dark:bg-slate-800"
          >
            {angleMode}
          </button>
        </div>
        <div className="text-right h-6 text-sm text-muted-foreground mb-1 font-mono min-h-[1.5rem]">
          {equation}
        </div>
        <div className="text-right text-4xl font-bold tracking-tight font-mono truncate text-foreground">
          {display}
        </div>
      </div>
      
      <div className="grid grid-cols-6 gap-px bg-border">
        {/* Scientific Row 1 */}
        <CalcButton onClick={() => handleFunc("sin")} variant="sci">sin</CalcButton>
        <CalcButton onClick={() => handleFunc("cos")} variant="sci">cos</CalcButton>
        <CalcButton onClick={() => handleFunc("tan")} variant="sci">tan</CalcButton>
        <CalcButton onClick={handleClear} className="bg-slate-100 dark:bg-slate-800 text-destructive font-bold col-span-2">AC</CalcButton>
        <CalcButton onClick={handleBackspace} className="bg-slate-100 dark:bg-slate-800"><Delete className="h-5 w-5" /></CalcButton>

        {/* Scientific Row 2 */}
        <CalcButton onClick={() => handleFunc("log")} variant="sci">log</CalcButton>
        <CalcButton onClick={() => handleFunc("ln")} variant="sci">ln</CalcButton>
        <CalcButton onClick={() => handleFunc("inv")} variant="sci">1/x</CalcButton>
        <CalcButton onClick={() => handleOperator("^")} variant="sci">x^y</CalcButton>
        <CalcButton onClick={() => handleFunc("sqrt")} variant="sci">√</CalcButton>
        <CalcButton onClick={() => handleOperator("÷")} variant="operator"><Divide className="h-5 w-5" /></CalcButton>

        {/* Scientific Row 3 */}
        <CalcButton onClick={() => handleFunc("pi")} variant="sci">π</CalcButton>
        <CalcButton onClick={() => handleFunc("e")} variant="sci">e</CalcButton>
        <CalcButton onClick={() => handleFunc("fact")} variant="sci">n!</CalcButton>
        <CalcButton onClick={() => handleNumber("7")}>7</CalcButton>
        <CalcButton onClick={() => handleNumber("8")}>8</CalcButton>
        <CalcButton onClick={() => handleNumber("9")}>9</CalcButton>
        <CalcButton onClick={() => handleOperator("×")} variant="operator"><X className="h-5 w-5" /></CalcButton>

        {/* Standard Row 1 */}
        <CalcButton onClick={() => setDisplay(String(Math.abs(parseFloat(display))))} variant="sci">±</CalcButton>
        <CalcButton onClick={() => handleOperator("(")} variant="sci">(</CalcButton>
        <CalcButton onClick={() => handleOperator(")")} variant="sci">)</CalcButton>
        <CalcButton onClick={() => handleNumber("4")}>4</CalcButton>
        <CalcButton onClick={() => handleNumber("5")}>5</CalcButton>
        <CalcButton onClick={() => handleNumber("6")}>6</CalcButton>
        <CalcButton onClick={() => handleOperator("-")} variant="operator"><Minus className="h-5 w-5" /></CalcButton>

        {/* Standard Row 2 */}
        <CalcButton onClick={() => handleFunc("sq")} variant="sci">x²</CalcButton>
        <CalcButton onClick={() => setMemory(0)} variant="sci">MC</CalcButton>
        <CalcButton onClick={() => setDisplay(String(memory))} variant="sci">MR</CalcButton>
        <CalcButton onClick={() => handleNumber("1")}>1</CalcButton>
        <CalcButton onClick={() => handleNumber("2")}>2</CalcButton>
        <CalcButton onClick={() => handleNumber("3")}>3</CalcButton>
        <CalcButton onClick={() => handleOperator("+")} variant="operator"><Plus className="h-5 w-5" /></CalcButton>

        {/* Standard Row 3 */}
        <CalcButton onClick={() => setMemory(parseFloat(display))} variant="sci">M+</CalcButton>
        <CalcButton onClick={() => setMemory(memory - parseFloat(display))} variant="sci">M-</CalcButton>
        <CalcButton onClick={() => handleNumber("0")} className="col-span-2">0</CalcButton>
        <CalcButton onClick={() => { if (!display.includes(".")) setDisplay(display + ".") }}>.</CalcButton>
        <CalcButton onClick={handleEqual} variant="primary" className="col-span-2"><Equal className="h-5 w-5" /></CalcButton>
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
  variant?: "default" | "operator" | "primary" | "sci";
  onClick: () => void;
}) {
  const variants = {
    default: "bg-background hover:bg-accent hover:text-accent-foreground text-foreground text-xl",
    operator: "bg-slate-100 dark:bg-slate-800 text-primary hover:bg-slate-200 dark:hover:bg-slate-700 text-xl",
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 text-xl",
    sci: "bg-slate-50 dark:bg-slate-900 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
  };

  return (
    <button
      className={cn(
        "h-14 flex items-center justify-center calculator-btn outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset",
        variants[variant],
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}