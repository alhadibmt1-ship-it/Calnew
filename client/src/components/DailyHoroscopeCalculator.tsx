import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SIGNS, SIGN_SYMBOLS, ELEMENTS, ELEMENT_COLORS, getSunLon, getMoonLon, getMarsLon, getVenusLon, degreesToSign } from "@/lib/astro-utils";

// Horoscope pool — indexed by (signIndex + dayOfYear) % pool.length
const GENERAL_POOL = [
  "Today's planetary energy supports reflection and careful planning. A quiet moment of clarity arrives if you pause and listen to your instincts.",
  "An unexpected opportunity emerges today. Stay alert — what looks like a small opening could be the door to something much larger.",
  "The cosmos invite you to release what no longer serves you. A gentle but firm reset in one area of your life brings long-term benefit.",
  "Your social energy is heightened today. Meaningful conversations and new connections set the stage for future growth.",
  "A focus on discipline and structure pays off. Steady effort — not sudden leaps — is your winning strategy right now.",
  "Creative energy is high. An idea that surfaces today deserves your full attention; it has more potential than it first appears.",
  "Patience is your greatest asset today. A situation that feels stuck is about to shift — trust the timing of the universe.",
  "Today calls for honest self-assessment. Acknowledging where you need support is a sign of wisdom, not weakness.",
];
const LOVE_POOL = [
  "Romance flourishes when you express appreciation openly. A small gesture of gratitude can reignite warmth in your closest connection.",
  "Communication is the key to intimacy today. What you say honestly is more attractive than any carefully crafted impression.",
  "Singles may encounter someone who surprises them. Stay open — attraction can begin in the most ordinary moments.",
  "A gentle conversation repairs a small rift that has been quietly growing. Approach with curiosity, not defensiveness.",
  "Your partner needs to feel truly heard today. Set aside distractions and give your undivided presence.",
  "Love grows through shared experiences. Plan something new together — even something simple — to reinvigorate your bond.",
  "For singles, self-love lays the foundation today. The relationship you have with yourself sets the standard for all others.",
  "A past connection resurfaces in your thoughts. Reflect on what it taught you — the lesson matters more than the reunion.",
];
const CAREER_POOL = [
  "A collaborative approach yields better results than going it alone today. Share your idea with the right person and watch it accelerate.",
  "Your analytical mind is sharper than usual. Use this clarity to tackle a project that has been stalling.",
  "Financial awareness is important today. Review your income and expenses before committing to anything new.",
  "A leadership opportunity arrives. Step forward even if you feel uncertain — your skills are more than adequate.",
  "Focus beats multitasking today. Choose one important task and give it your complete attention from start to finish.",
  "A creative solution to an ongoing workplace challenge becomes clear. Trust the unconventional approach.",
  "Networking bears fruit. A casual connection leads to a meaningful professional introduction.",
  "Long-term thinking is rewarded. Plant seeds today that your future self will thank you for.",
];
const HEALTH_POOL = [
  "Your body is asking for rest and restoration today. Honour that request — recovery is productive, not passive.",
  "Movement lifts your mood and sharpens your mind today. Even a 20-minute walk transforms your energy significantly.",
  "Hydration and nourishing food make a bigger difference than you might expect today. Treat your body like the instrument it is.",
  "Mental wellbeing is in focus. A short mindfulness practice or time spent in nature resets your nervous system beautifully.",
  "Pay attention to tension held in the body. Stretching, breathing, or massage can release more than just physical tightness.",
  "Sleep quality is a priority today. Protect your evening routine from screens and stimulation to wake up restored.",
  "Your energy naturally fluctuates. Work with your body's rhythm rather than against it for best results.",
  "A small health habit practised consistently from today will have a meaningful impact within 30 days. Start now.",
];

const LUCKY_NUMBERS: Record<string, number[]> = {
  Aries:[1,8,17],Taurus:[2,6,9],Gemini:[3,12,20],Cancer:[7,11,25],
  Leo:[1,10,19],Virgo:[5,14,23],Libra:[6,15,24],Scorpio:[4,9,18],
  Sagittarius:[3,7,21],Capricorn:[8,17,26],Aquarius:[11,22,29],Pisces:[2,7,16],
};
const LUCKY_COLORS: Record<string, string> = {
  Aries:"Red",Taurus:"Green",Gemini:"Yellow",Cancer:"Silver",
  Leo:"Gold",Virgo:"Navy",Libra:"Pink",Scorpio:"Crimson",
  Sagittarius:"Purple",Capricorn:"Dark Grey",Aquarius:"Electric Blue",Pisces:"Sea Green",
};

function getDayOfYear(date: Date): number {
  const start = new Date(Date.UTC(date.getUTCFullYear(), 0, 0));
  return Math.floor((date.getTime() - start.getTime()) / 86400000);
}

function getPool<T>(pool: T[], signIndex: number, dayOfYear: number): T {
  return pool[(signIndex + dayOfYear) % pool.length];
}

function getMoonPhase(date: Date): string {
  const moonLon = getMoonLon(date);
  const sunLon = getSunLon(date);
  const diff = ((moonLon - sunLon + 360) % 360);
  if (diff < 22.5) return "🌑 New Moon";
  if (diff < 67.5) return "🌒 Waxing Crescent";
  if (diff < 112.5) return "🌓 First Quarter";
  if (diff < 157.5) return "🌔 Waxing Gibbous";
  if (diff < 202.5) return "🌕 Full Moon";
  if (diff < 247.5) return "🌖 Waning Gibbous";
  if (diff < 292.5) return "🌗 Last Quarter";
  if (diff < 337.5) return "🌘 Waning Crescent";
  return "🌑 New Moon";
}

export default function DailyHoroscopeCalculator() {
  const [selectedSign, setSelectedSign] = useState("");
  const [horoscope, setHoroscope] = useState<null | {
    sign: string; symbol: string; element: string; general: string;
    love: string; career: string; health: string; luckyNumbers: number[];
    luckyColor: string; moonPhase: string; sunTransit: string; venusTransit: string;
  }>(null);

  function generate() {
    if (!selectedSign) return;
    const today = new Date();
    const day = getDayOfYear(today);
    const signIndex = SIGNS.indexOf(selectedSign);
    const element = ELEMENTS[selectedSign];
    const moonPhase = getMoonPhase(today);
    const sunTransit = degreesToSign(getSunLon(today)).sign;
    const venusTransit = degreesToSign(getVenusLon(today)).sign;
    setHoroscope({
      sign: selectedSign,
      symbol: SIGN_SYMBOLS[signIndex],
      element,
      general: getPool(GENERAL_POOL, signIndex, day),
      love: getPool(LOVE_POOL, signIndex, day),
      career: getPool(CAREER_POOL, signIndex, day),
      health: getPool(HEALTH_POOL, signIndex, day),
      luckyNumbers: LUCKY_NUMBERS[selectedSign],
      luckyColor: LUCKY_COLORS[selectedSign],
      moonPhase,
      sunTransit,
      venusTransit,
    });
  }

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-GB", { weekday:"long", day:"numeric", month:"long", year:"numeric" });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Free Daily Horoscopes for All 12 Signs</CardTitle>
        <CardDescription>Select your zodiac sign to get today's personalised horoscope — covering love, career, and health.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">{dateStr}</div>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {SIGNS.map((sign, i) => (
            <button key={sign}
              onClick={() => { setSelectedSign(sign); }}
              className={`rounded-md border p-2 text-center text-xs font-medium transition-colors ${selectedSign === sign ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted"}`}>
              <div className="text-lg">{SIGN_SYMBOLS[i]}</div>
              <div>{sign}</div>
            </button>
          ))}
        </div>
        <Button onClick={generate} disabled={!selectedSign}>Get Today's Horoscope</Button>
        {horoscope && (
          <div className="mt-4 space-y-4">
            <div className="rounded-lg p-5 text-center" style={{ background: ELEMENT_COLORS[horoscope.element] + "18", border: `2px solid ${ELEMENT_COLORS[horoscope.element]}` }}>
              <div className="text-4xl">{horoscope.symbol}</div>
              <h2 className="text-2xl font-bold mt-1">{horoscope.sign}</h2>
              <div className="flex justify-center gap-4 mt-2 text-xs text-muted-foreground flex-wrap">
                <span>{horoscope.moonPhase}</span>
                <span>☀️ Sun in {horoscope.sunTransit}</span>
                <span>♀ Venus in {horoscope.venusTransit}</span>
              </div>
            </div>
            <div className="rounded-md border p-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">⭐ Overall Energy</p>
              <p className="text-sm">{horoscope.general}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: "💕 Love", text: horoscope.love },
                { label: "💼 Career", text: horoscope.career },
                { label: "🌿 Health", text: horoscope.health },
              ].map(s => (
                <div key={s.label} className="rounded-md border p-3">
                  <p className="text-xs font-semibold text-muted-foreground mb-1">{s.label}</p>
                  <p className="text-sm">{s.text}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-4 flex-wrap text-sm">
              <div className="rounded-md border px-3 py-2">
                <span className="text-xs text-muted-foreground">🍀 Lucky Numbers: </span>
                <span className="font-semibold">{horoscope.luckyNumbers.join(", ")}</span>
              </div>
              <div className="rounded-md border px-3 py-2">
                <span className="text-xs text-muted-foreground">🎨 Lucky Colour: </span>
                <span className="font-semibold">{horoscope.luckyColor}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
