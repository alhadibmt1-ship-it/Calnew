import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RotateCcw } from "lucide-react";

const MEANINGS: Record<number, { title: string; color: string; traits: string; strengths: string; challenges: string; career: string; famous: string }> = {
  1: { title: "The Leader", color: "#ef4444", traits: "Independent, ambitious, self-reliant, pioneering. You are here to lead and innovate. Natural trailblazers who forge new paths.", strengths: "Leadership, courage, determination", challenges: "Stubbornness, selfishness, domineering tendencies", career: "Entrepreneur, CEO, Politician, Inventor, Director", famous: "Tom Hanks, Sting, Larry King" },
  2: { title: "The Peacemaker", color: "#3b82f6", traits: "Cooperative, sensitive, diplomatic, and intuitive. You thrive in partnerships and have a gift for bringing people together.", strengths: "Empathy, diplomacy, patience", challenges: "Over-sensitivity, indecisiveness, self-doubt", career: "Counselor, Mediator, Diplomat, Teacher, Healer", famous: "Jennifer Aniston, Bill Clinton, Madonna" },
  3: { title: "The Communicator", color: "#f97316", traits: "Creative, expressive, sociable, and optimistic. You are here to inspire and uplift others through your words and art.", strengths: "Creativity, charisma, expressiveness", challenges: "Scattered energy, superficiality, self-criticism", career: "Writer, Artist, Actor, Speaker, Musician", famous: "Christina Aguilera, David Bowie, Celine Dion" },
  4: { title: "The Builder", color: "#84cc16", traits: "Practical, disciplined, hardworking, and trustworthy. You are the foundation of society — stable, reliable, and methodical.", strengths: "Organization, reliability, hard work", challenges: "Rigidity, workaholism, stubbornness", career: "Engineer, Accountant, Manager, Architect, Analyst", famous: "Oprah Winfrey, Bill Gates, Arnold Schwarzenegger" },
  5: { title: "The Adventurer", color: "#eab308", traits: "Freedom-loving, versatile, curious, and adventurous. You thrive on change and experience and need constant stimulation.", strengths: "Adaptability, resourcefulness, curiosity", challenges: "Restlessness, irresponsibility, overindulgence", career: "Travel Writer, Marketing, Sales, Journalist, Pilot", famous: "Angelina Jolie, Abraham Lincoln, Vincent van Gogh" },
  6: { title: "The Nurturer", color: "#ec4899", traits: "Compassionate, responsible, caring, and harmonious. You are the caretaker of the numbers — devoted to family and community.", strengths: "Nurturing, reliability, responsibility", challenges: "Perfectionism, meddling, martyrdom", career: "Doctor, Nurse, Teacher, Social Worker, Counselor", famous: "Michael Jackson, John Lennon, Albert Einstein" },
  7: { title: "The Seeker", color: "#7c3aed", traits: "Analytical, introspective, spiritual, and wise. You are a deep thinker who seeks truth and understanding in all things.", strengths: "Intelligence, intuition, wisdom", challenges: "Isolation, secrecy, cynicism", career: "Scientist, Researcher, Philosopher, Analyst, Theologian", famous: "Princess Diana, Leonardo DiCaprio, Taylor Swift" },
  8: { title: "The Powerhouse", color: "#6b7280", traits: "Ambitious, authoritative, successful, and material-minded. You have a strong drive for achievement and financial success.", strengths: "Business acumen, leadership, determination", challenges: "Materialism, workaholism, ruthlessness", career: "Business Owner, Executive, Banker, Judge, Politician", famous: "Nelson Mandela, Halle Berry, Pablo Picasso" },
  9: { title: "The Humanitarian", color: "#10b981", traits: "Compassionate, generous, idealistic, and globally minded. You are here to serve humanity and make the world a better place.", strengths: "Wisdom, compassion, idealism", challenges: "Emotional volatility, resentment, scattered focus", career: "Activist, Teacher, Artist, Healer, Non-profit Leader", famous: "Gandhi, Mother Teresa, Jim Carrey" },
  11: { title: "The Visionary (Master 11)", color: "#a855f7", traits: "Highly intuitive, inspirational, and spiritually aware. Master 11 is the most intuitive of all numbers — a bridge between the earthly and divine.", strengths: "Intuition, inspiration, idealism", challenges: "Anxiety, self-doubt, impracticality", career: "Spiritual Leader, Artist, Counselor, Psychic, Inventor", famous: "Barack Obama, Bill Clinton, Michelle Obama" },
  22: { title: "The Master Builder (Master 22)", color: "#f59e0b", traits: "Powerful, visionary, and able to turn dreams into reality on a large scale. Master 22 combines the intuition of 11 with 4's practicality.", strengths: "Vision, leadership, practical genius", challenges: "Excessive pressure, perfectionism, overwhelm", career: "Architect, World Leader, Visionary Entrepreneur", famous: "Bill Gates, Will Smith, Oprah Winfrey" },
  33: { title: "The Master Teacher (Master 33)", color: "#06b6d4", traits: "The most spiritually evolved of all numbers — the Master Teacher. Rare and deeply compassionate, focused on uplifting all of humanity.", strengths: "Compassion, healing, spiritual wisdom", challenges: "Self-sacrifice, martyrdom, perfectionism", career: "Spiritual Teacher, Healer, Humanitarian Leader", famous: "Albert Einstein, Francis of Assisi" },
};

function reduceDigits(n: number): number {
  if (n <= 9 || n === 11 || n === 22 || n === 33) return n;
  const sum = String(n).split("").reduce((acc, d) => acc + parseInt(d), 0);
  return reduceDigits(sum);
}

function calcLifePath(date: string): { number: number; steps: string[] } {
  const d = new Date(date);
  const m = d.getMonth() + 1, day = d.getDate(), y = d.getFullYear();
  const monthReduced = reduceDigits(m);
  const dayReduced = reduceDigits(day);
  const yearSum = String(y).split("").reduce((a, b) => a + parseInt(b), 0);
  const yearReduced = reduceDigits(yearSum);
  const total = monthReduced + dayReduced + yearReduced;
  const final = reduceDigits(total);
  const steps = [
    `Month: ${m} → ${monthReduced}`,
    `Day: ${day} → ${dayReduced}`,
    `Year: ${y} → ${yearSum} → ${yearReduced}`,
    `Total: ${monthReduced} + ${dayReduced} + ${yearReduced} = ${total}${total !== final ? ` → ${final}` : ""}`,
  ];
  return { number: final, steps };
}

export default function LifePathNumberCalculator() {
  const [date, setDate] = useState("");
  const [result, setResult] = useState<{ number: number; steps: string[] } | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    if (!date) { setError("Please enter your birth date."); return; }
    setError("");
    setResult(calcLifePath(date));
  };

  const reset = () => { setDate(""); setResult(null); setError(""); };

  const meaning = result ? MEANINGS[result.number] : null;

  return (
    <Card className="w-full border-t-4 border-t-violet-500">
      <CardHeader>
        <CardTitle>Life Path Number Calculator</CardTitle>
        <CardDescription>Your Life Path Number is the most important number in numerology — it reveals your natural talents, challenges, and life purpose.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-1.5 max-w-xs">
          <Label>Your Birth Date</Label>
          <Input type="date" value={date} onChange={e => setDate(e.target.value)} max={new Date().toISOString().split("T")[0]} />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate Life Path</Button>
          <Button variant="ghost" size="sm" onClick={reset} className="flex items-center gap-1.5">
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </Button>
        </div>

        {result && meaning && (
          <div className="space-y-4">
            <div className="rounded-xl border p-6 space-y-2" style={{ borderColor: meaning.color, background: `${meaning.color}10` }}>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Your Life Path Number</p>
              <div className="flex items-baseline gap-3">
                <span className="text-6xl font-black" style={{ color: meaning.color }}>{result.number}</span>
                <span className="text-xl font-bold text-gray-700">{meaning.title}</span>
              </div>
              {[11, 22, 33].includes(result.number) && (
                <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: meaning.color }}>Master Number</span>
              )}
            </div>

            <details className="rounded-lg border border-gray-200 overflow-hidden">
              <summary className="cursor-pointer px-4 py-3 bg-gray-50 text-sm font-semibold text-gray-700 hover:bg-gray-100 list-none">How was this calculated?</summary>
              <div className="px-4 py-3 text-sm space-y-1 border-t border-gray-100">
                {result.steps.map((s, i) => <p key={i} className="text-gray-600 font-mono">{s}</p>)}
              </div>
            </details>

            <div className="rounded-xl border border-gray-200 p-5 space-y-4">
              <p className="text-sm text-gray-700">{meaning.traits}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-green-50 p-3 border border-green-100">
                  <p className="text-xs font-semibold text-green-700 uppercase mb-1">✅ Strengths</p>
                  <p className="text-gray-600">{meaning.strengths}</p>
                </div>
                <div className="rounded-lg bg-orange-50 p-3 border border-orange-100">
                  <p className="text-xs font-semibold text-orange-700 uppercase mb-1">⚠️ Challenges</p>
                  <p className="text-gray-600">{meaning.challenges}</p>
                </div>
                <div className="rounded-lg bg-blue-50 p-3 border border-blue-100">
                  <p className="text-xs font-semibold text-blue-700 uppercase mb-1">💼 Career Paths</p>
                  <p className="text-gray-600">{meaning.career}</p>
                </div>
                <div className="rounded-lg bg-purple-50 p-3 border border-purple-100">
                  <p className="text-xs font-semibold text-purple-700 uppercase mb-1">⭐ Famous People</p>
                  <p className="text-gray-600">{meaning.famous}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
