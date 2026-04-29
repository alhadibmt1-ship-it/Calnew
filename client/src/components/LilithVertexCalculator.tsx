import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RotateCcw } from "lucide-react";
import { ELEMENTS, ELEMENT_COLORS, CITIES, getLilithLon, getMidheaven, getVertex, degreesToSign } from "@/lib/astro-utils";

const LILITH_DATA: Record<string, { rawDesires: string; shadow: string; power: string; integration: string }> = {
  Aries: {
    rawDesires: "Absolute freedom, to be first, unchecked aggression, and unrestrained individual will.",
    shadow: "Impulsive rage, refusing to cooperate, and a need to dominate or destroy what constrains you.",
    power: "Fearless initiation, the courage to act alone, and a raw magnetism that others cannot ignore.",
    integration: "Channel primal drive into leadership. Honour your anger without being ruled by it."
  },
  Taurus: {
    rawDesires: "Unrestrained sensual pleasure, ownership, wealth without limitation, and total physical security.",
    shadow: "Extreme possessiveness, gluttony, hoarding, and using pleasure as a way to avoid emotional depth.",
    power: "Irresistible physical magnetism, the ability to attract abundance, and a deep connection to nature and the body.",
    integration: "Honour your need for pleasure and security while releasing attachment to ownership of others."
  },
  Gemini: {
    rawDesires: "Absolute freedom of thought, the right to speak any truth, and to be endlessly curious without consequence.",
    shadow: "Manipulative words, spreading half-truths, and using information as power or weaponry.",
    power: "Razor-sharp intellect, the ability to articulate what others cannot, and magnetic verbal charisma.",
    integration: "Use your voice for truth-telling rather than manipulation. Let information liberate rather than control."
  },
  Cancer: {
    rawDesires: "Total emotional security, an unbreakable bond, and the right to need without shame.",
    shadow: "Emotional manipulation, suffocating attachment, and weaponising vulnerability.",
    power: "Profound intuition, the ability to feel into hidden truths, and an almost psychic emotional intelligence.",
    integration: "Honour your emotional depth without using it as a tool of control or manipulation."
  },
  Leo: {
    rawDesires: "Absolute adoration, the spotlight without competition, and creative expression with no restrictions.",
    shadow: "Narcissism, demanding worship, crushing others' light to ensure your own shines brightest.",
    power: "Extraordinary creative force, an undeniable stage presence, and the magnetism to move crowds.",
    integration: "Create boldly and receive recognition without needing to be the only star in the room."
  },
  Virgo: {
    rawDesires: "Perfection, total control over the body and environment, and the right to critique everything.",
    shadow: "Obsessive control, weaponised criticism, and purging as a means of emotional regulation.",
    power: "Extraordinary precision, the ability to heal through detail, and a purity of vision others cannot access.",
    integration: "Use your discernment as a healing gift rather than a weapon. Accept the sacred in imperfection."
  },
  Libra: {
    rawDesires: "Perfect beauty, total relational harmony, and absolute fairness — by any means necessary.",
    shadow: "Manipulating relationships to maintain false peace, using beauty or charm as weapons.",
    power: "Magnetic grace, the ability to create beauty that moves people, and an innate sense of justice.",
    integration: "Pursue true balance rather than performed harmony. Let beauty be your offering, not your armour."
  },
  Scorpio: {
    rawDesires: "Total power, complete intimacy without walls, and control over life, death, and transformation.",
    shadow: "Obsession, jealousy, using sexuality as manipulation, and revenge without remorse.",
    power: "Unparalleled sexual magnetism, the ability to see through all facades, and mastery over transformation.",
    integration: "Use your power to heal and transform rather than to control and destroy."
  },
  Sagittarius: {
    rawDesires: "Absolute freedom, to speak every truth without filter, and to roam without restriction.",
    shadow: "Preaching without wisdom, careless honesty that wounds, and using philosophy to justify irresponsibility.",
    power: "A magnetic, visionary presence that inspires masses and a fierce devotion to living by raw truth.",
    integration: "Speak your truth with both fire and wisdom. Let freedom serve expansion, not escape."
  },
  Capricorn: {
    rawDesires: "Absolute power, status, and control over systems and hierarchies.",
    shadow: "Using authority ruthlessly, climbing over others without conscience, and worshipping power for its own sake.",
    power: "Unstoppable ambition, commanding authority, and the ability to build empires from nothing.",
    integration: "Build power in service of something greater. Lead with integrity as well as capability."
  },
  Aquarius: {
    rawDesires: "Total freedom from all convention, the right to be completely alien, and revolution without compromise.",
    shadow: "Detachment weaponised as coldness, rebellion for its own sake, and alienating all in the name of freedom.",
    power: "Visionary genius, the ability to see futures others cannot, and a revolutionary presence that changes minds.",
    integration: "Let your otherness serve the collective rather than isolate you from it."
  },
  Pisces: {
    rawDesires: "To dissolve into everything, to love without boundaries, and to escape all limitation.",
    shadow: "Addiction, self-destruction, martyrdom, and using chaos to avoid accountability.",
    power: "Extraordinary empathy, mystical vision, and the ability to access spiritual realms most cannot touch.",
    integration: "Build healthy boundaries so your compassion heals rather than consumes you."
  },
};

const VERTEX_DATA: Record<string, { fatedTheme: string; encounters: string; destiny: string }> = {
  Aries: { fatedTheme: "Fate brings courage, leadership, and warrior energy into your life", encounters: "Bold initiators, pioneers, and people who challenge you to act", destiny: "Fated moments call you to step into leadership and own your power" },
  Taurus: { fatedTheme: "Fate brings stability, beauty, and lasting value into your life", encounters: "Patient, sensual, and grounded people who help you build security", destiny: "Fated moments call you to create beauty and lasting abundance" },
  Gemini: { fatedTheme: "Fate brings communication, connection, and mental stimulation", encounters: "Communicators, writers, and curious minds who expand your thinking", destiny: "Fated moments call you to share your voice and make connections" },
  Cancer: { fatedTheme: "Fate brings nurturing, family, and emotional healing", encounters: "Nurturing, intuitive people who help you feel safe and seen", destiny: "Fated moments call you to give and receive unconditional care" },
  Leo: { fatedTheme: "Fate brings creativity, recognition, and heartfelt expression", encounters: "Charismatic, creative people who inspire you to shine", destiny: "Fated moments call you into the spotlight and toward authentic expression" },
  Virgo: { fatedTheme: "Fate brings healing, service, and precision into your life", encounters: "Skilled, analytical people who help you refine and improve", destiny: "Fated moments call you to serve, heal, and perfect your craft" },
  Libra: { fatedTheme: "Fate brings partnership, beauty, and diplomatic resolution", encounters: "Charming, balanced people who invite you into deep partnerships", destiny: "Fated moments call you to co-create and seek true balance" },
  Scorpio: { fatedTheme: "Fate brings transformation, depth, and powerful revelation", encounters: "Intense, perceptive people who force you to confront your shadow", destiny: "Fated moments call you to transform, surrender, and be reborn" },
  Sagittarius: { fatedTheme: "Fate brings wisdom, expansion, and philosophical truth", encounters: "Adventurous, wise teachers who expand your worldview", destiny: "Fated moments call you to seek higher truth and share your journey" },
  Capricorn: { fatedTheme: "Fate brings ambition, structure, and lasting achievement", encounters: "Disciplined, authoritative people who help you build your legacy", destiny: "Fated moments call you to take responsibility and build something lasting" },
  Aquarius: { fatedTheme: "Fate brings innovation, community, and progressive vision", encounters: "Revolutionary, visionary people who shake up your world", destiny: "Fated moments call you to serve the collective and think beyond convention" },
  Pisces: { fatedTheme: "Fate brings spiritual connection, compassion, and creative vision", encounters: "Spiritual, empathetic people who open your intuition", destiny: "Fated moments call you to surrender, create, and connect to the divine" },
};

export default function LilithVertexCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [city, setCity] = useState("");
  const [result, setResult] = useState<null | {
    lilith: { sign: string; symbol: string; element: string; data: typeof LILITH_DATA[string] };
    vertex: { sign: string; symbol: string; element: string; data: typeof VERTEX_DATA[string] };
  }>(null);
  const [error, setError] = useState("");

  function calculate() {
    setError("");
    if (!birthDate || !birthTime || !city) { setError("Please fill in all fields."); return; }
    const cityData = CITIES.find(c => c.name === city);
    if (!cityData) return;
    const [h, m] = birthTime.split(":").map(Number);
    const date = new Date(`${birthDate}T${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:00Z`);
    const offset = cityData.lon / 15;
    const utcDate = new Date(date.getTime() - offset * 3600 * 1000);
    const lilithInfo = degreesToSign(getLilithLon(utcDate));
    const mc = getMidheaven(utcDate, cityData.lon);
    const vertexInfo = degreesToSign(getVertex(mc, cityData.lat));
    setResult({
      lilith: { sign: lilithInfo.sign, symbol: lilithInfo.symbol, element: ELEMENTS[lilithInfo.sign], data: LILITH_DATA[lilithInfo.sign] },
      vertex: { sign: vertexInfo.sign, symbol: vertexInfo.symbol, element: ELEMENTS[vertexInfo.sign], data: VERTEX_DATA[vertexInfo.sign] },
    });
  }

  function reset() { setBirthDate(""); setBirthTime(""); setCity(""); setResult(null); setError(""); }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Lilith &amp; Vertex Calculator</CardTitle>
        <CardDescription>Uncover your Black Moon Lilith (raw desires and shadow self) and your Vertex (fated encounters and destiny points) in one combined tool.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div><Label>Birth Date</Label><Input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} /></div>
          <div><Label>Birth Time (local)</Label><Input type="time" value={birthTime} onChange={e => setBirthTime(e.target.value)} /></div>
          <div>
            <Label>Nearest City</Label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger><SelectValue placeholder="Select city…" /></SelectTrigger>
              <SelectContent>{CITIES.map(c => <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate Lilith &amp; Vertex</Button>
          <Button variant="outline" onClick={reset}><RotateCcw className="w-4 h-4 mr-1" />Reset</Button>
        </div>
        {result && (
          <div className="mt-4 space-y-6">
            {/* Lilith Section */}
            <div className="space-y-3">
              <div className="rounded-lg p-4 text-center" style={{ background: "#1e1e2e", border: "2px solid #7c3aed" }}>
                <div className="text-3xl mb-1 text-white">⚸ {result.lilith.symbol}</div>
                <h3 className="text-xl font-bold text-white">Black Moon Lilith in {result.lilith.sign}</h3>
                <p className="text-xs text-purple-300 mt-1">Raw Desires · Shadow Self · Taboo</p>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  { label: "🖤 Raw Desires", text: result.lilith.data.rawDesires },
                  { label: "🌑 Shadow Side", text: result.lilith.data.shadow },
                  { label: "⚡ Hidden Power", text: result.lilith.data.power },
                  { label: "🌀 Integration Path", text: result.lilith.data.integration },
                ].map(s => (
                  <div key={s.label} className="rounded-md border p-3">
                    <p className="text-xs font-semibold text-muted-foreground mb-1">{s.label}</p>
                    <p className="text-sm">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Vertex Section */}
            <div className="space-y-3">
              <div className="rounded-lg p-4 text-center" style={{ background: "#0f1a2e", border: "2px solid #2563eb" }}>
                <div className="text-3xl mb-1 text-white">Vx {result.vertex.symbol}</div>
                <h3 className="text-xl font-bold text-white">Vertex in {result.vertex.sign}</h3>
                <p className="text-xs text-blue-300 mt-1">Fated Encounters · Destiny Points</p>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {[
                  { label: "🌟 Fated Theme", text: result.vertex.data.fatedTheme },
                  { label: "🤝 Who You Meet", text: result.vertex.data.encounters },
                  { label: "🎯 Your Destiny", text: result.vertex.data.destiny },
                ].map(s => (
                  <div key={s.label} className="rounded-md border p-3">
                    <p className="text-xs font-semibold text-muted-foreground mb-1">{s.label}</p>
                    <p className="text-sm">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
