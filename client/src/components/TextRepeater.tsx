import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TextRepeater() {
  const [text, setText] = useState("Hello World");
  const [count, setCount] = useState(10);
  const [separator, setSeparator] = useState("\\n"); // visual representation
  const [result, setResult] = useState("");

  const generate = () => {
    let sep = separator;
    if (sep === "\\n") sep = "\n";
    if (sep === "\\t") sep = "\t";
    
    const res = Array(count).fill(text).join(sep);
    setResult(res);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Text Repeater</CardTitle>
        <CardDescription>Repeat text multiple times instantly.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Text to Repeat</Label>
            <Input value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <Label>Repetitions</Label>
                <Input type="number" min="1" max="10000" value={count} onChange={(e) => setCount(Number(e.target.value))} />
             </div>
             <div className="space-y-2">
                <Label>Separator</Label>
                <Input value={separator} onChange={(e) => setSeparator(e.target.value)} placeholder="Use \n for new line" />
             </div>
          </div>
        </div>
        <Button className="w-full" onClick={generate}>Repeat Text</Button>

        {result && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Result</Label>
              <Button variant="outline" size="sm" onClick={copyToClipboard}>Copy Result</Button>
            </div>
            <Textarea value={result} readOnly className="h-48 font-mono text-xs" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}