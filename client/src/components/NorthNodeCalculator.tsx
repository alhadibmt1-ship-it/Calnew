import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RotateCcw } from "lucide-react";
import { ELEMENTS, ELEMENT_COLORS, getNorthNodeLon, degreesToSign, normalizeAngle } from "@/lib/astro-utils";

const NODE_DATA: Record<string, { northPath: string; southKarma: string; lessons: string[]; soulPurpose: string }> = {
  Aries: {
    northPath: "Your soul is learning independence, courage, and self-assertion. You are meant to step into the role of a leader and trust your own instincts without seeking approval.",
    southKarma: "South Node in Libra: past-life pattern of over-reliance on others, indecision, and giving away your power to keep the peace.",
    lessons: ["Prioritise your own needs", "Act decisively without waiting for consensus", "Develop a strong individual identity", "Embrace healthy competition"],
    soulPurpose: "To become a courageous, self-directed pioneer who trusts your unique path."
  },
  Taurus: {
    northPath: "Your soul is learning stability, patience, and self-reliance. You are meant to build something lasting through slow, consistent effort and to find peace in the material world.",
    southKarma: "South Node in Scorpio: past-life patterns of intensity, crisis, power struggles, and transformation at the expense of stability.",
    lessons: ["Build financial and emotional security", "Slow down and appreciate the present", "Trust simplicity over drama", "Develop patience and persistence"],
    soulPurpose: "To create lasting beauty, abundance, and peace through patience and groundedness."
  },
  Gemini: {
    northPath: "Your soul is learning communication, curiosity, and adaptability. You are meant to gather information, make connections, and share ideas widely.",
    southKarma: "South Node in Sagittarius: past-life reliance on broad philosophies and distant horizons rather than present, local connection.",
    lessons: ["Listen as much as you speak", "Stay curious and open-minded", "Value nearby connections", "Explore many perspectives before concluding"],
    soulPurpose: "To be a bridge between ideas and people — a versatile communicator who illuminates the world."
  },
  Cancer: {
    northPath: "Your soul is learning emotional intelligence, nurturing, and creating a true home. You are meant to lead with the heart and build deep, lasting emotional bonds.",
    southKarma: "South Node in Capricorn: past-life overemphasis on achievement, status, and duty at the cost of emotional wellbeing.",
    lessons: ["Prioritise emotional connection over achievement", "Allow vulnerability", "Create a nurturing home and family life", "Trust your intuition"],
    soulPurpose: "To become an emotionally courageous nurturer who creates safety and belonging for others."
  },
  Leo: {
    northPath: "Your soul is learning creativity, confidence, and generous self-expression. You are meant to shine, lead from the heart, and inspire others with your authentic self.",
    southKarma: "South Node in Aquarius: past-life tendency to merge into the group, detach emotionally, and avoid the spotlight.",
    lessons: ["Share your unique creative gifts", "Allow yourself to be seen and appreciated", "Lead with warmth, not logic", "Develop authentic confidence"],
    soulPurpose: "To be a radiant, heart-centred leader who inspires others through creative self-expression."
  },
  Virgo: {
    northPath: "Your soul is learning service, discernment, and the perfection of skill. You are meant to develop mastery in a practical craft and offer it in service to others.",
    southKarma: "South Node in Pisces: past-life patterns of escapism, martyrdom, and dissolving into fantasy or victimhood.",
    lessons: ["Develop practical routines and healthy habits", "Offer concrete help to others", "Master a skill or craft", "Distinguish what is real from what is ideal"],
    soulPurpose: "To be a dedicated, skilled servant of the greater good — using precision and care in all you do."
  },
  Libra: {
    northPath: "Your soul is learning partnership, diplomacy, and the art of relating. You are meant to co-create with others, develop fairness, and seek true equality in relationships.",
    southKarma: "South Node in Aries: past-life independence and self-focus; difficulty cooperating and considering others' perspectives.",
    lessons: ["Develop genuine consideration for others", "Practise compromise and diplomacy", "Commit to long-term partnerships", "Cultivate inner and outer beauty"],
    soulPurpose: "To become a peacemaker and true partner — someone who creates harmony through balanced, loving relationships."
  },
  Scorpio: {
    northPath: "Your soul is learning depth, transformation, and the power of surrender. You are meant to dive beneath the surface, embrace change, and develop emotional and spiritual depth.",
    southKarma: "South Node in Taurus: past-life attachment to comfort, possessions, and resistance to necessary change.",
    lessons: ["Embrace endings and transformation", "Release attachment to comfort and certainty", "Develop emotional depth and vulnerability", "Investigate what is hidden"],
    soulPurpose: "To be a powerful agent of transformation — someone who helps others (and yourself) shed the old and be reborn."
  },
  Sagittarius: {
    northPath: "Your soul is learning wisdom, adventure, and a broad philosophical vision. You are meant to seek truth across cultures, belief systems, and vast horizons.",
    southKarma: "South Node in Gemini: past-life scattering of energy, too much talking, too little committing to a belief.",
    lessons: ["Commit to a guiding philosophy", "Travel, learn, and expand beyond the familiar", "Speak and live your truth boldly", "Trust the journey, not just the information"],
    soulPurpose: "To become a wise explorer of life's great truths — a teacher, traveller, and truth-seeker."
  },
  Capricorn: {
    northPath: "Your soul is learning ambition, discipline, and how to build lasting structures. You are meant to develop a public role, take on responsibility, and achieve long-term goals.",
    southKarma: "South Node in Cancer: past-life patterns of over-dependence on family, emotional reactivity, and avoiding worldly responsibility.",
    lessons: ["Build a meaningful career and public identity", "Develop self-discipline and patience", "Take on leadership and responsibility", "Channel emotions into productive action"],
    soulPurpose: "To become a respected builder of lasting legacies — someone who leads with integrity and achieves through discipline."
  },
  Aquarius: {
    northPath: "Your soul is learning to embrace community, innovation, and humanitarian vision. You are meant to step beyond personal ego and contribute to the collective good.",
    southKarma: "South Node in Leo: past-life patterns of pride, drama, and placing personal glory above collective welfare.",
    lessons: ["Serve the collective, not just yourself", "Embrace uniqueness and individuality", "Innovate and challenge the status quo", "Build genuine community"],
    soulPurpose: "To be a visionary humanitarian — someone who unites people around a shared future and progressive ideals."
  },
  Pisces: {
    northPath: "Your soul is learning compassion, spirituality, and dissolution of the ego. You are meant to develop faith, artistic vision, and a connection to something greater than yourself.",
    southKarma: "South Node in Virgo: past-life over-reliance on criticism, routine, and control as coping mechanisms.",
    lessons: ["Cultivate trust, faith, and surrender", "Develop creative and spiritual practices", "Offer compassion without judgement", "Release the need to control everything"],
    soulPurpose: "To be a compassionate mystic and healer — someone who bridges the earthly and the divine."
  },
};

export default function NorthNodeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<null | {
    north: { sign: string; symbol: string; element: string };
    south: { sign: string; symbol: string };
    data: typeof NODE_DATA[string];
  }>(null);

  function calculate() {
    if (!birthDate) return;
    const date = new Date(birthDate + "T12:00:00Z");
    const northInfo = degreesToSign(getNorthNodeLon(date));
    const southInfo = degreesToSign(normalizeAngle(getNorthNodeLon(date) + 180));
    setResult({
      north: { sign: northInfo.sign, symbol: northInfo.symbol, element: ELEMENTS[northInfo.sign] },
      south: { sign: southInfo.sign, symbol: southInfo.symbol },
      data: NODE_DATA[northInfo.sign],
    });
  }

  function reset() { setBirthDate(""); setResult(null); }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>North Node Calculator</CardTitle>
        <CardDescription>Discover your North Node sign — your karmic soul mission and the direction your life is meant to grow.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="max-w-xs">
          <Label htmlFor="nn-date">Birth Date</Label>
          <Input id="nn-date" type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
        </div>
        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate My North Node</Button>
          <Button variant="outline" onClick={reset}><RotateCcw className="w-4 h-4 mr-1" />Reset</Button>
        </div>
        {result && (
          <div className="mt-4 space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg p-4 text-center" style={{ background: ELEMENT_COLORS[result.north.element] + "18", border: `2px solid ${ELEMENT_COLORS[result.north.element]}` }}>
                <div className="text-xs font-semibold text-muted-foreground mb-1">☊ NORTH NODE</div>
                <div className="text-3xl">{result.north.symbol}</div>
                <div className="text-xl font-bold">{result.north.sign}</div>
                <div className="text-xs mt-1" style={{ color: ELEMENT_COLORS[result.north.element] }}>{result.north.element}</div>
              </div>
              <div className="rounded-lg p-4 text-center bg-gray-50 border">
                <div className="text-xs font-semibold text-muted-foreground mb-1">☋ SOUTH NODE</div>
                <div className="text-3xl">{result.south.symbol}</div>
                <div className="text-xl font-bold">{result.south.sign}</div>
                <div className="text-xs mt-muted-foreground mt-1">Past-life karma</div>
              </div>
            </div>
            <div className="rounded-md border p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">🧭 Your Soul Path</p>
              <p className="text-sm">{result.data.northPath}</p>
            </div>
            <div className="rounded-md border bg-amber-50 border-amber-200 p-3">
              <p className="text-xs font-semibold text-amber-700 mb-1">🔮 Past-Life Karma (South Node)</p>
              <p className="text-sm text-amber-900">{result.data.southKarma}</p>
            </div>
            <div className="rounded-md border p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">📋 Key Lessons</p>
              <ul className="space-y-1">
                {result.data.lessons.map(l => (
                  <li key={l} className="text-sm flex gap-2"><span className="text-green-500 flex-shrink-0">✓</span>{l}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-md border border-purple-200 bg-purple-50 p-3">
              <p className="text-xs font-semibold text-purple-700 mb-1">⭐ Soul Purpose</p>
              <p className="text-sm text-purple-900">{result.data.soulPurpose}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
