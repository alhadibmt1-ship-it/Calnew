import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RotateCcw } from "lucide-react";
import { ELEMENTS, ELEMENT_COLORS, CITIES, getSunLon, getMoonLon, getAscendant, getPartOfFortune, houseNumber, isDayChart, degreesToSign } from "@/lib/astro-utils";

const POF_DATA: Record<string, { wealth: string; luck: string; fulfilment: string; activate: string }> = {
  Aries: {
    wealth: "Fortune flows through bold initiative, entrepreneurship, and being first to act. You attract luck by leading, not following.",
    luck: "Lucky when you take risks, start fresh projects, and compete. Stagnation works against you.",
    fulfilment: "You feel most fulfilled when in action, pioneering something new, and operating with complete independence.",
    activate: "Start something new, assert your needs boldly, take the first step others hesitate on."
  },
  Taurus: {
    wealth: "Fortune flows through patience, consistent effort, and building tangible assets. Sensory skill — art, food, music, beauty — is your wealth pathway.",
    luck: "Lucky when you slow down, invest long-term, and trust steady accumulation over quick wins.",
    fulfilment: "You feel most fulfilled surrounded by beauty, financial security, and sensory pleasures.",
    activate: "Invest steadily, develop an artistic or sensory skill, create something of lasting value."
  },
  Gemini: {
    wealth: "Fortune flows through communication, networking, and intellectual versatility. Writing, speaking, teaching, and trading bring luck.",
    luck: "Lucky when you stay curious, make connections between different worlds, and share your knowledge widely.",
    fulfilment: "You feel most fulfilled when intellectually stimulated, socially connected, and constantly learning.",
    activate: "Write, speak, teach, launch ideas, and build your network of contacts."
  },
  Cancer: {
    wealth: "Fortune flows through family, property, nurturing professions, and emotional intelligence. Real estate, childcare, and food industries may be lucky.",
    luck: "Lucky in domestic settings, family businesses, and situations that require empathy and emotional care.",
    fulfilment: "You feel most fulfilled when creating a nurturing home and deep emotional bonds.",
    activate: "Invest in property, nurture family ties, develop emotional intelligence, build a home base."
  },
  Leo: {
    wealth: "Fortune flows through creativity, performance, leadership, and generous self-expression. Entertainment, child-related industries, and arts are lucky.",
    luck: "Lucky when you step into the spotlight, express yourself boldly, and lead with warmth.",
    fulfilment: "You feel most fulfilled when your creativity is appreciated and you are truly seen.",
    activate: "Create, perform, lead, and allow yourself to be recognised and celebrated."
  },
  Virgo: {
    wealth: "Fortune flows through service, precision, health, and mastery of practical skills. Healing, editing, analysis, and craftsmanship bring fortune.",
    luck: "Lucky when you refine your craft, improve systems, and offer genuinely useful service to others.",
    fulfilment: "You feel most fulfilled when doing meaningful, precise work that improves others' lives.",
    activate: "Develop your craft, offer high-quality service, focus on health and wellness, perfect your skills."
  },
  Libra: {
    wealth: "Fortune flows through partnership, beauty, the arts, and diplomacy. Law, design, fashion, and counselling are lucky pathways.",
    luck: "Lucky in one-on-one relationships, creative collaborations, and environments that reward harmony.",
    fulfilment: "You feel most fulfilled in beautiful, balanced partnerships where both parties thrive equally.",
    activate: "Partner strategically, develop aesthetic skills, pursue beauty in your surroundings and work."
  },
  Scorpio: {
    wealth: "Fortune flows through depth, transformation, research, and other people's resources. Finance, psychology, surgery, and investigation are lucky pathways.",
    luck: "Lucky when diving deep, managing shared resources wisely, and facilitating transformation.",
    fulfilment: "You feel most fulfilled when experiencing profound transformation and deep, authentic connection.",
    activate: "Research deeply, invest in joint ventures, embrace transformation, develop psychological skills."
  },
  Sagittarius: {
    wealth: "Fortune flows through travel, philosophy, higher education, publishing, and cross-cultural exchange. Teaching, coaching, and faith are lucky pathways.",
    luck: "Lucky when you travel, expand your worldview, and share wisdom generously.",
    fulfilment: "You feel most fulfilled when exploring, learning, and living according to your philosophy.",
    activate: "Travel, study, teach, publish, and commit to a guiding personal philosophy."
  },
  Capricorn: {
    wealth: "Fortune flows through long-term strategy, discipline, leadership, and building institutional structures. Government, real estate, and traditional industries are lucky.",
    luck: "Lucky when you play the long game, take on responsibility, and build something that lasts.",
    fulfilment: "You feel most fulfilled when you have achieved something meaningful that stands the test of time.",
    activate: "Build long-term, take on leadership roles, develop structure and discipline, set ambitious goals."
  },
  Aquarius: {
    wealth: "Fortune flows through innovation, technology, community building, and humanitarian endeavour. Tech, science, and social enterprise are lucky pathways.",
    luck: "Lucky when you think ahead of the curve, collaborate with a community, and innovate.",
    fulfilment: "You feel most fulfilled when contributing to a vision larger than yourself.",
    activate: "Innovate, build community, use technology creatively, lead humanitarian initiatives."
  },
  Pisces: {
    wealth: "Fortune flows through art, healing, spirituality, and compassionate service. Music, film, nursing, therapy, and spiritual practice are lucky pathways.",
    luck: "Lucky when you trust your intuition, surrender to creative flow, and serve with compassion.",
    fulfilment: "You feel most fulfilled when connected to creativity, spirituality, and the wellbeing of others.",
    activate: "Create art, meditate, practise healing arts, trust your intuition, and serve compassionately."
  },
};

export default function PartOfFortuneCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [city, setCity] = useState("");
  const [result, setResult] = useState<null | {
    sign: string; symbol: string; element: string; house: number;
    isDay: boolean; data: typeof POF_DATA[string];
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
    const sun = getSunLon(utcDate);
    const moon = getMoonLon(utcDate);
    const asc = getAscendant(utcDate, cityData.lat, cityData.lon);
    const isDay = isDayChart(sun, asc);
    const pof = getPartOfFortune(asc, sun, moon, isDay);
    const { sign, symbol } = degreesToSign(pof);
    const house = houseNumber(pof, asc);
    setResult({ sign, symbol, element: ELEMENTS[sign], house, isDay, data: POF_DATA[sign] });
  }

  function reset() { setBirthDate(""); setBirthTime(""); setCity(""); setResult(null); setError(""); }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Part of Fortune Calculator</CardTitle>
        <CardDescription>Calculate your Part of Fortune — the Arabic lot that reveals where natural luck, wealth, and fulfilment flow most easily in your life.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <Label>Birth Date</Label>
            <Input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
          </div>
          <div>
            <Label>Birth Time (local)</Label>
            <Input type="time" value={birthTime} onChange={e => setBirthTime(e.target.value)} />
          </div>
          <div>
            <Label>Nearest City</Label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger><SelectValue placeholder="Select city…" /></SelectTrigger>
              <SelectContent>
                {CITIES.map(c => <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate My Part of Fortune</Button>
          <Button variant="outline" onClick={reset}><RotateCcw className="w-4 h-4 mr-1" />Reset</Button>
        </div>
        {result && (
          <div className="mt-4 space-y-4">
            <div className="rounded-lg p-5 text-center" style={{ background: ELEMENT_COLORS[result.element] + "18", border: `2px solid ${ELEMENT_COLORS[result.element]}` }}>
              <div className="text-4xl mb-1">⊕ {result.symbol}</div>
              <h2 className="text-2xl font-bold">Part of Fortune in {result.sign}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                House {result.house} • {result.element} • {result.isDay ? "Day Chart" : "Night Chart"}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "💰 Wealth Path", text: result.data.wealth },
                { label: "🍀 Where Luck Flows", text: result.data.luck },
                { label: "💫 True Fulfilment", text: result.data.fulfilment },
                { label: "⚡ How to Activate It", text: result.data.activate },
              ].map(s => (
                <div key={s.label} className="rounded-md border p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">{s.label}</p>
                  <p className="text-sm">{s.text}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">* Formula: {result.isDay ? "ASC + Moon − Sun (day chart)" : "ASC + Sun − Moon (night chart)"}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
