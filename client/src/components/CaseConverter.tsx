import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CaseConverter() {
  const [text, setText] = useState("");
  const { toast } = useToast();

  const toUpper = () => setText(text.toUpperCase());
  const toLower = () => setText(text.toLowerCase());
  const toTitle = () => {
    setText(
      text.toLowerCase().split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    );
  };
  const toSentence = () => {
    setText(
      text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase())
    );
  };
  const toAlternating = () => {
    setText(
      text.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('')
    );
  };
  const toInverse = () => {
    setText(
      text.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('')
    );
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard" });
  };

  const clear = () => setText("");

  return (
    <Card className="w-full border-t-4 border-t-green-600">
      <CardHeader>
        <CardTitle>Case Converter</CardTitle>
        <CardDescription>Convert text between Uppercase, Lowercase, Title Case, and more.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Type or paste your text here..."
          className="min-h-[200px] text-lg"
        />
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <Button variant="outline" onClick={toUpper}>UPPERCASE</Button>
          <Button variant="outline" onClick={toLower}>lowercase</Button>
          <Button variant="outline" onClick={toTitle}>Title Case</Button>
          <Button variant="outline" onClick={toSentence}>Sentence case</Button>
          <Button variant="outline" onClick={toAlternating}>aLtErNaTiNg</Button>
          <Button variant="outline" onClick={toInverse}>InVeRsE cAsE</Button>
        </div>

        <div className="flex gap-2 pt-2">
          <Button onClick={copyToClipboard} className="flex-1 bg-green-600 hover:bg-green-700">
            <Copy className="mr-2 h-4 w-4" /> Copy Text
          </Button>
          <Button onClick={clear} variant="destructive">
            <RotateCcw className="mr-2 h-4 w-4" /> Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}