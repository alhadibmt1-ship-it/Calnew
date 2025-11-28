import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function WordCounter() {
  const [text, setText] = useState("");

  const stats = {
    characters: text.length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    sentences: text.split(/[.!?]+/).filter(x => x.trim().length > 0).length,
    paragraphs: text.split(/\n+/).filter(x => x.trim().length > 0).length,
    spaces: text.split(" ").length - 1,
  };

  return (
    <Card className="w-full border-t-4 border-t-green-600">
      <CardHeader>
        <CardTitle>Word Counter</CardTitle>
        <CardDescription>
          Count words, characters, sentences, and paragraphs in real-time.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          <StatBox label="Words" value={stats.words} />
          <StatBox label="Characters" value={stats.characters} />
          <StatBox label="Sentences" value={stats.sentences} />
          <StatBox label="Paragraphs" value={stats.paragraphs} />
          <StatBox label="Spaces" value={stats.spaces} />
        </div>

        <Textarea 
          placeholder="Type or paste your text here..." 
          className="min-h-[300px] text-lg p-6 leading-relaxed resize-y"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex gap-2 flex-wrap">
          <Badge variant="secondary">Reading Time: {Math.ceil(stats.words / 200)} min</Badge>
          <Badge variant="secondary">Speaking Time: {Math.ceil(stats.words / 130)} min</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

function StatBox({ label, value }: { label: string, value: number }) {
  return (
    <div className="bg-muted/30 border rounded-lg p-3 text-center">
      <p className="text-xs text-muted-foreground uppercase font-medium mb-1">{label}</p>
      <p className="text-2xl font-bold">{value.toLocaleString()}</p>
    </div>
  );
}