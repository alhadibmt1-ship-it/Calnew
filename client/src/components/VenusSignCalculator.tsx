import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RotateCcw } from "lucide-react";
import { ELEMENTS, ELEMENT_COLORS, getVenusLon, degreesToSign } from "@/lib/astro-utils";

const VENUS_DATA: Record<string, {
  loveLanguage: string; romanticStyle: string; attraction: string; idealPartner: string; shadow: string;
}> = {
  Aries: {
    loveLanguage: "Physical touch and quality time — you love direct, passionate affection",
    romanticStyle: "Bold, spontaneous, and direct. You fall fast and love the thrill of the chase. You need excitement in relationships.",
    attraction: "Confidence, directness, and a competitive spirit. Someone who can keep up with your energy.",
    idealPartner: "Confident, action-oriented, and independent. Someone who challenges you.",
    shadow: "Impatience and moving on too quickly when initial passion fades."
  },
  Taurus: {
    loveLanguage: "Physical touch and gift-giving — you express love through sensory pleasures",
    romanticStyle: "Slow-burning, loyal, and deeply sensual. You build love carefully and need security. You're devoted once committed.",
    attraction: "Reliability, good taste, and physical warmth. Someone who enjoys the finer things in life.",
    idealPartner: "Stable, patient, and affectionate. Someone who provides security and shares your love of beauty.",
    shadow: "Possessiveness and resistance to change within the relationship."
  },
  Gemini: {
    loveLanguage: "Words of affirmation — you need witty, stimulating conversation to feel loved",
    romanticStyle: "Playful, flirtatious, and mentally engaged. You need variety and mental stimulation. Romance must include good conversation.",
    attraction: "Intelligence, wit, and the ability to surprise you. Someone who keeps your mind engaged.",
    idealPartner: "Intellectually curious, communicative, and flexible. Someone who enjoys debate and learning.",
    shadow: "Inconsistency and difficulty committing when something shinier appears."
  },
  Cancer: {
    loveLanguage: "Acts of service and quality time — you show love through nurturing and care",
    romanticStyle: "Deeply devoted, protective, and emotionally present. You create a sanctuary in relationships. Home and family are central to your love.",
    attraction: "Emotional vulnerability, warmth, and a nurturing nature. Someone who makes you feel safe.",
    idealPartner: "Emotionally available, family-oriented, and dependable. Someone who creates a true home with you.",
    shadow: "Over-sensitivity and clinginess when feeling insecure."
  },
  Leo: {
    loveLanguage: "Words of affirmation and acts of service — you need to feel adored and appreciated",
    romanticStyle: "Grand, generous, and theatrical. You love romance done well — candlelit dinners, heartfelt declarations, and celebrations of the relationship.",
    attraction: "Confidence, generosity, and someone who genuinely admires you. A partner who makes you feel like royalty.",
    idealPartner: "Loyal, expressive, and proud to show you off. Someone who matches your warmth.",
    shadow: "Pride and needing to be the centre of attention in the relationship."
  },
  Virgo: {
    loveLanguage: "Acts of service — you show love by solving problems and taking care of details",
    romanticStyle: "Quietly devoted and attentive. You may be reserved at first, but once trusted, you are deeply caring and reliable. Practical love is your native language.",
    attraction: "Intelligence, reliability, and someone who values self-improvement. A partner with standards.",
    idealPartner: "Organised, health-conscious, and intellectually sharp. Someone who appreciates effort.",
    shadow: "Over-criticism and difficulty accepting imperfection in partners."
  },
  Libra: {
    loveLanguage: "Quality time and words of affirmation — harmony and thoughtful gestures matter deeply",
    romanticStyle: "Charming, idealistic, and deeply partnership-oriented. You believe in romance and invest in making relationships beautiful. You thrive with a true partner.",
    attraction: "Elegance, fairness, and social grace. Someone who enhances your life aesthetically and socially.",
    idealPartner: "Balanced, refined, and genuinely loving. Someone who values equality and beauty.",
    shadow: "Indecisiveness and a tendency to stay in relationships past their expiry date."
  },
  Scorpio: {
    loveLanguage: "Physical touch and quality time — you need total, undivided intimacy",
    romanticStyle: "Intensely passionate, loyal, and all-or-nothing. You require complete trust and emotional depth. Surface-level connections don't interest you.",
    attraction: "Depth, authenticity, and raw honesty. Someone unafraid of intensity and transformation.",
    idealPartner: "Trustworthy, emotionally deep, and equally committed. Someone who can handle your intensity.",
    shadow: "Jealousy, possessiveness, and testing partners to prove loyalty."
  },
  Sagittarius: {
    loveLanguage: "Quality time and words of affirmation — you need adventure and honest conversation",
    romanticStyle: "Fun, honest, and freedom-loving. You need a partner who is also a friend and an adventure buddy. Relationships must support, not restrict, your freedom.",
    attraction: "Enthusiasm, intelligence, and an adventurous spirit. Someone who says yes to new experiences.",
    idealPartner: "Open-minded, funny, and philosophically curious. Someone who grows alongside you.",
    shadow: "Commitment-phobia and being brutally honest in ways that sting."
  },
  Capricorn: {
    loveLanguage: "Acts of service and gift-giving — you show love through practical support and loyalty",
    romanticStyle: "Reserved, traditional, and deeply loyal once committed. You may take time to open up, but once you do, your devotion is unwavering. You take love seriously.",
    attraction: "Ambition, reliability, and maturity. Someone who has their life together and respects yours.",
    idealPartner: "Responsible, driven, and emotionally stable. Someone who builds a life alongside you.",
    shadow: "Emotional distance and prioritising work or status over the relationship."
  },
  Aquarius: {
    loveLanguage: "Words of affirmation and quality time — you need intellectual connection and freedom",
    romanticStyle: "Unconventional, intellectual, and friendly. You need a partner who is also your best friend. Love must coexist with personal freedom and shared ideals.",
    attraction: "Originality, intelligence, and a humanitarian outlook. Someone who sees the world differently.",
    idealPartner: "Independent, open-minded, and progressive. Someone who respects your freedom.",
    shadow: "Emotional detachment and difficulty with traditional romantic expectations."
  },
  Pisces: {
    loveLanguage: "Physical touch and words of affirmation — you need romance, empathy, and spiritual connection",
    romanticStyle: "Dreamy, devotional, and empathetic. You love deeply and selflessly. You are drawn to soulmate connections and need a partner who honours your sensitivity.",
    attraction: "Creativity, emotional depth, and kindness. Someone who sees your soul and not just your surface.",
    idealPartner: "Gentle, creative, and spiritually aware. Someone who creates a dream with you.",
    shadow: "Idealising partners and ignoring red flags in pursuit of a romantic fantasy."
  },
};

export default function VenusSignCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<null | {
    sign: string; symbol: string; element: string; data: typeof VENUS_DATA[string];
  }>(null);

  function calculate() {
    if (!birthDate) return;
    const date = new Date(birthDate + "T12:00:00Z");
    const { sign, symbol } = degreesToSign(getVenusLon(date));
    setResult({ sign, symbol, element: ELEMENTS[sign], data: VENUS_DATA[sign] });
  }

  function reset() { setBirthDate(""); setResult(null); }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Venus Sign Calculator</CardTitle>
        <CardDescription>Discover your Venus sign — the planet that governs your love style, attraction, and romantic desires.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="max-w-xs">
          <Label htmlFor="venus-date">Birth Date</Label>
          <Input id="venus-date" type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
        </div>
        <div className="flex gap-2">
          <Button onClick={calculate}>Find My Venus Sign</Button>
          <Button variant="outline" onClick={reset}><RotateCcw className="w-4 h-4 mr-1" />Reset</Button>
        </div>
        {result && (
          <div className="mt-4 space-y-4">
            <div className="rounded-lg p-5 text-center" style={{ background: ELEMENT_COLORS[result.element] + "18", border: `2px solid ${ELEMENT_COLORS[result.element]}` }}>
              <div className="text-4xl mb-1">♀ {result.symbol}</div>
              <h2 className="text-2xl font-bold">Venus in {result.sign}</h2>
              <p className="text-sm text-muted-foreground mt-1">{result.element} element</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "Love Language", icon: "💬", text: result.data.loveLanguage },
                { label: "Romantic Style", icon: "💕", text: result.data.romanticStyle },
                { label: "You're Attracted To", icon: "✨", text: result.data.attraction },
                { label: "Ideal Partner", icon: "👫", text: result.data.idealPartner },
              ].map(s => (
                <div key={s.label} className="rounded-md border p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">{s.icon} {s.label}</p>
                  <p className="text-sm">{s.text}</p>
                </div>
              ))}
            </div>
            <div className="rounded-md border border-orange-200 bg-orange-50 p-3">
              <p className="text-xs font-semibold text-orange-700 mb-1">⚠️ Venus Shadow</p>
              <p className="text-sm text-orange-900">{result.data.shadow}</p>
            </div>
            <p className="text-xs text-muted-foreground">* Venus changes sign roughly every 4–5 weeks. For borderline dates, birth time can affect placement.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
