import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Copy, RefreshCw, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const { toast } = useToast();

  const generatePassword = () => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let chars = "";
    if (includeUppercase) chars += upper;
    if (includeLowercase) chars += lower;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    if (chars === "") return;

    let generated = "";
    for (let i = 0; i < length; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(generated);
  };

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    toast({
      title: "Copied!",
      description: "Password copied to clipboard.",
    });
  };

  // Generate on mount
  useState(() => {
    generatePassword();
  });

  const strength = Math.min(
    (length * 4) + 
    (includeUppercase ? 10 : 0) + 
    (includeLowercase ? 10 : 0) + 
    (includeNumbers ? 10 : 0) + 
    (includeSymbols ? 10 : 0),
    100
  );

  return (
    <Card className="w-full border-t-4 border-t-green-600">
      <CardHeader>
        <CardTitle>Password Generator</CardTitle>
        <CardDescription>
          Create strong, secure passwords to protect your accounts.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="relative">
          <Input 
            readOnly 
            value={password} 
            className="text-center font-mono text-xl h-14 pr-12 bg-muted/20"
          />
          <div className="absolute right-2 top-2 flex gap-1">
            <Button variant="ghost" size="icon" onClick={generatePassword} title="Regenerate">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={copyToClipboard} title="Copy">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Strength</span>
            <span className={strength > 80 ? "text-green-600" : strength > 50 ? "text-orange-500" : "text-red-500"}>
              {strength > 80 ? "Strong" : strength > 50 ? "Medium" : "Weak"}
            </span>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${
                strength > 80 ? "bg-green-600" : strength > 50 ? "bg-orange-500" : "bg-red-500"
              }`}
              style={{ width: `${strength}%` }}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>Password Length</Label>
              <span className="font-bold">{length}</span>
            </div>
            <Slider 
              value={[length]} 
              onValueChange={(v) => setLength(v[0])} 
              min={6} 
              max={32} 
              step={1} 
              onValueCommit={generatePassword}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="upper" checked={includeUppercase} onCheckedChange={(c) => { setIncludeUppercase(!!c); generatePassword(); }} />
              <Label htmlFor="upper">Uppercase (A-Z)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="lower" checked={includeLowercase} onCheckedChange={(c) => { setIncludeLowercase(!!c); generatePassword(); }} />
              <Label htmlFor="lower">Lowercase (a-z)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="numbers" checked={includeNumbers} onCheckedChange={(c) => { setIncludeNumbers(!!c); generatePassword(); }} />
              <Label htmlFor="numbers">Numbers (0-9)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="symbols" checked={includeSymbols} onCheckedChange={(c) => { setIncludeSymbols(!!c); generatePassword(); }} />
              <Label htmlFor="symbols">Symbols (!@#)</Label>
            </div>
          </div>
        </div>

        <Button onClick={generatePassword} className="w-full bg-green-600 hover:bg-green-700">
          Generate New Password
        </Button>
      </CardContent>
    </Card>
  );
}