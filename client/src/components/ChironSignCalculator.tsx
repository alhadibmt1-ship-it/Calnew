import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RotateCcw } from "lucide-react";
import { ELEMENTS, ELEMENT_COLORS, getChironLon, degreesToSign } from "@/lib/astro-utils";

const CHIRON_DATA: Record<string, {
  wound: string; healingPath: string; strengths: string; affirmation: string;
}> = {
  Aries: {
    wound: "Deep wound around identity, courage, and the right to exist as an individual. You may struggle with asserting yourself, initiating action, or feeling 'good enough' to lead.",
    healingPath: "Healing comes through learning to act without permission, to trust your instincts, and to own your identity fully. Taking courageous action — even when terrified — transforms this wound.",
    strengths: "Extraordinary courage, deep empathy for those who feel powerless, natural ability to ignite bravery in others, and wisdom about self-leadership.",
    affirmation: "I am allowed to take up space and lead my life with bold confidence."
  },
  Taurus: {
    wound: "Core wound around self-worth, physical security, and material stability. You may feel fundamentally undeserving of comfort, beauty, or abundance.",
    healingPath: "Healing comes through slowly building a secure relationship with your body and material world. Developing self-worth independent of achievement or others' approval is the path forward.",
    strengths: "Extraordinary generosity, the ability to help others value themselves, a deep wisdom about true abundance, and unshakeable resilience once healed.",
    affirmation: "I am inherently worthy of comfort, beauty, and abundance."
  },
  Gemini: {
    wound: "Core wound around communication, intelligence, and being heard or understood. You may feel that your words are wrong, your mind is defective, or that no one truly listens to you.",
    healingPath: "Healing comes through sharing your voice anyway — writing, speaking, teaching. The wound becomes your gift when you help others articulate what they cannot express.",
    strengths: "A gifted communicator who speaks truth with precision, deep empathy for those who struggle to be understood, and the ability to bridge opposing viewpoints.",
    affirmation: "My voice and ideas are valuable. I am heard and I matter."
  },
  Cancer: {
    wound: "Deep wound around home, belonging, and unconditional nurturing. You may have experienced a family dynamic that left you feeling unwelcome, unseen, or emotionally abandoned.",
    healingPath: "Healing comes through creating the home and emotional safety you longed for — first within yourself, then for others. Becoming your own loving parent is the path.",
    strengths: "Profound emotional intelligence, the ability to create genuine safety for others, deep intuitive wisdom about family and belonging, and extraordinary empathy.",
    affirmation: "I am home within myself. I belong here, and I create belonging for others."
  },
  Leo: {
    wound: "Core wound around creativity, being seen, and the right to shine. You may feel that your self-expression is wrong, too much, or unworthy of appreciation.",
    healingPath: "Healing comes through creating anyway — performing, making, leading with the heart. When you risk being seen and survive, the wound transforms into radiance.",
    strengths: "A rare ability to celebrate others' uniqueness, exceptional creative courage, wisdom about genuine self-expression, and the gift of making others feel truly seen.",
    affirmation: "I am meant to shine. My unique gifts deserve to be shared and celebrated."
  },
  Virgo: {
    wound: "Deep wound around perfectionism, criticism, and the fear of being flawed or impure. You may feel fundamentally broken, incompetent, or perpetually 'not enough'.",
    healingPath: "Healing comes through embracing your own imperfection with compassion and offering that same compassion to others. Your wound becomes wisdom when you serve without self-punishment.",
    strengths: "Extraordinary precision and analytical ability, deep healing gifts, the ability to notice what others miss, and profound compassion for those who feel 'not enough'.",
    affirmation: "I am whole as I am. My imperfections are part of my beauty and wisdom."
  },
  Libra: {
    wound: "Core wound around relationships, fairness, and the ability to be loved as you are. You may have experienced deep injustice in partnerships or struggled to believe you deserve balanced love.",
    healingPath: "Healing comes through developing internal balance before seeking it externally, and choosing relationships based on genuine equality and mutual respect.",
    strengths: "Exceptional mediation and peacemaking skills, deep wisdom about true partnership, the ability to help others find balance, and extraordinary empathy for relationship pain.",
    affirmation: "I am worthy of balanced, beautiful, and reciprocal love."
  },
  Scorpio: {
    wound: "Deep wound around power, betrayal, and transformation. You may have experienced profound loss, trauma, or betrayal that left you fearing intimacy or surrendering control.",
    healingPath: "Healing comes through facing the shadow, embracing transformation, and developing the courage to be completely vulnerable with trusted others. Depth becomes your superpower.",
    strengths: "Exceptional psychological insight, natural healing and transformative abilities, the wisdom to guide others through crisis, and the capacity for profound regeneration.",
    affirmation: "I am safe to transform. I rise from every ending stronger and wiser."
  },
  Sagittarius: {
    wound: "Core wound around freedom, truth, and the meaning of life. You may feel that your beliefs are wrong, your culture is a mismatch, or that you will never truly belong anywhere.",
    healingPath: "Healing comes through committing to your own truth, travelling your own philosophical path, and teaching what you know rather than forever seeking what you don't.",
    strengths: "Exceptional wisdom and philosophical depth, the ability to inspire others through your journey, a deep understanding of cultural diversity, and natural teaching abilities.",
    affirmation: "My truth is valid. I am on the right path and my wisdom lights the way for others."
  },
  Capricorn: {
    wound: "Deep wound around authority, achievement, and the right to be respected. You may have had a critical or absent authority figure, leading to a crippling fear of failure or authority.",
    healingPath: "Healing comes through developing self-authority — succeeding on your own terms, releasing impossible standards, and recognising that your worth is not determined by achievement.",
    strengths: "Exceptional leadership wisdom, the ability to help others overcome fear of failure, deep understanding of healthy ambition, and unshakeable resilience.",
    affirmation: "I am my own authority. My accomplishments are real and my ambitions are healthy."
  },
  Aquarius: {
    wound: "Core wound around belonging, uniqueness, and acceptance by the group. You may feel like an outsider — too weird, too different, or fundamentally disconnected from humanity.",
    healingPath: "Healing comes through embracing your difference as your gift, finding your true tribe, and channelling your originality into service of the collective.",
    strengths: "Exceptional vision for a better world, the ability to unite seemingly incompatible people, deep compassion for those who feel they don't belong, and revolutionary thinking.",
    affirmation: "My uniqueness is my gift to the world. I belong exactly where I am."
  },
  Pisces: {
    wound: "Deep wound around spiritual disconnection, boundaries, and the fear of dissolution. You may struggle with feeling lost, victimised, or swallowed by others' pain and expectations.",
    healingPath: "Healing comes through developing spiritual practice, healthy boundaries, and channelling your sensitivity into creative or healing work rather than escaping through it.",
    strengths: "Extraordinary empathy and healing gifts, profound artistic vision, the ability to channel higher wisdom, and the capacity to hold space for others' spiritual journey.",
    affirmation: "I am spiritually connected and protected. My sensitivity is a sacred gift."
  },
};

export default function ChironSignCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<null | {
    sign: string; symbol: string; element: string; data: typeof CHIRON_DATA[string];
  }>(null);

  function calculate() {
    if (!birthDate) return;
    const date = new Date(birthDate + "T12:00:00Z");
    const { sign, symbol } = degreesToSign(getChironLon(date));
    setResult({ sign, symbol, element: ELEMENTS[sign], data: CHIRON_DATA[sign] });
  }

  function reset() { setBirthDate(""); setResult(null); }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Chiron Sign Calculator — Your Wounded Healer</CardTitle>
        <CardDescription>Find your Chiron sign — the placement that reveals your deepest wound and how healing it becomes your greatest strength.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="max-w-xs">
          <Label htmlFor="chiron-date">Birth Date</Label>
          <Input id="chiron-date" type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
        </div>
        <div className="flex gap-2">
          <Button onClick={calculate}>Find My Chiron Sign</Button>
          <Button variant="outline" onClick={reset}><RotateCcw className="w-4 h-4 mr-1" />Reset</Button>
        </div>
        {result && (
          <div className="mt-4 space-y-4">
            <div className="rounded-lg p-5 text-center" style={{ background: ELEMENT_COLORS[result.element] + "18", border: `2px solid ${ELEMENT_COLORS[result.element]}` }}>
              <div className="text-4xl mb-1">⚷ {result.symbol}</div>
              <h2 className="text-2xl font-bold">Chiron in {result.sign}</h2>
              <p className="text-sm text-muted-foreground mt-1">{result.element} element</p>
            </div>
            <div className="rounded-md border border-red-200 bg-red-50 p-3">
              <p className="text-xs font-semibold text-red-700 mb-1">🩹 Core Wound</p>
              <p className="text-sm text-red-900">{result.data.wound}</p>
            </div>
            <div className="rounded-md border border-green-200 bg-green-50 p-3">
              <p className="text-xs font-semibold text-green-700 mb-1">🌱 Healing Path</p>
              <p className="text-sm text-green-900">{result.data.healingPath}</p>
            </div>
            <div className="rounded-md border p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">✨ Strengths That Emerge</p>
              <p className="text-sm">{result.data.strengths}</p>
            </div>
            <div className="rounded-md border border-purple-200 bg-purple-50 p-3 text-center">
              <p className="text-xs font-semibold text-purple-700 mb-1">💜 Affirmation</p>
              <p className="text-sm italic text-purple-900">"{result.data.affirmation}"</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
