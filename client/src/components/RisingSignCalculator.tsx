import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RotateCcw } from "lucide-react";
import { SIGNS, SIGN_SYMBOLS, ELEMENTS, ELEMENT_COLORS, RULING_PLANETS, CITIES, getAscendant, degreesToSign } from "@/lib/astro-utils";

const RISING_DATA: Record<string, {
  outward: string; firstImpression: string; appearance: string; style: string;
}> = {
  Aries: {
    outward: "Bold, assertive, and energetic. You come across as direct, confident, and always ready to take charge. Others sense your drive and initiative the moment you walk in.",
    firstImpression: "People see you as a leader, someone quick to act and unafraid of challenges. You radiate a pioneering, courageous energy.",
    appearance: "Often athletic or wiry build. Quick, purposeful movements. Eyes that spark with intensity. Red or warm tones suit your energy.",
    style: "Action-oriented, minimal fuss. You prefer functional, confident clothing with a bold touch."
  },
  Taurus: {
    outward: "Steady, warm, and dependable. You project an air of calm reliability that puts people at ease. There's a sensuous, grounded quality to how you carry yourself.",
    firstImpression: "Others see you as trustworthy, patient, and someone who values quality and comfort. Your presence feels solid and reassuring.",
    appearance: "Often has a strong, well-proportioned build. A natural beauty and attention to texture and material in dress. Earthy tones and luxurious fabrics.",
    style: "Classic and quality-focused. You invest in timeless pieces that feel and look beautiful."
  },
  Gemini: {
    outward: "Quick-witted, expressive, and versatile. You project an air of curiosity and youthfulness that makes you instantly engaging. Your energy is light and adaptable.",
    firstImpression: "People see you as clever, sociable, and interesting. You seem to know a little about everything and can talk to anyone.",
    appearance: "Often youthful appearance regardless of age. Expressive eyes and quick, animated gestures. Tends toward bright, varied styles.",
    style: "Eclectic and changeable. You love mixing patterns and trying trends, often wearing something eye-catching."
  },
  Cancer: {
    outward: "Nurturing, empathetic, and quietly perceptive. You project an aura of emotional depth and protectiveness. Others sense that you genuinely care.",
    firstImpression: "People see you as warm, intuitive, and safe to open up to. There's a homey, comforting quality to your presence.",
    appearance: "Soft, rounded features. Expressive, luminous eyes. Often dresses in comfortable, classic, or sentimental pieces.",
    style: "Nostalgic and cozy. Soft fabrics, muted or watery tones — you dress to feel secure and comforted."
  },
  Leo: {
    outward: "Charismatic, confident, and magnetically warm. You project a natural star quality that draws people to you. Your energy lights up any room.",
    firstImpression: "People notice you first. You come across as generous, proud, and creative — someone worth watching.",
    appearance: "Often has a mane-like hair and a regal bearing. Bright, warm colouring. Tends toward dramatic or eye-catching fashion.",
    style: "Bold, theatrical, and luxurious. You love gold, statement pieces, and being remembered for your look."
  },
  Virgo: {
    outward: "Precise, helpful, and quietly observant. You project an air of intelligence and competence. Others sense you notice everything and have high standards.",
    firstImpression: "People see you as reliable, detail-oriented, and practical. There's a refined, polished quality to how you present yourself.",
    appearance: "Clean, well-groomed appearance. Tends toward a neat, understated aesthetic. Often slim or angular build.",
    style: "Understated and precise. You prefer quality over quantity, neutral tones, and impeccably fitted clothing."
  },
  Libra: {
    outward: "Charming, diplomatic, and aesthetically attuned. You project an air of grace and social ease. Others sense your desire for harmony and beauty.",
    firstImpression: "People see you as elegant, agreeable, and refined. You seem to glide through social situations effortlessly.",
    appearance: "Symmetrical, attractive features. Natural elegance in movement. Often gravitates toward beautiful, coordinated outfits.",
    style: "Stylish and balanced. You have an eye for fashion trends and always look put-together and harmonious."
  },
  Scorpio: {
    outward: "Intense, magnetic, and perceptive. You project an aura of power and mystery that is immediately felt. Others sense your depth and may feel seen through.",
    firstImpression: "People sense a focused, penetrating intelligence. You come across as private, powerful, and not to be underestimated.",
    appearance: "Often striking, dark, or intense features. Piercing gaze. Tends toward dark or dramatic clothing choices.",
    style: "Dark, sleek, and powerful. You prefer quality, understated garments with an edge of intensity."
  },
  Sagittarius: {
    outward: "Optimistic, adventurous, and philosophical. You project an infectious enthusiasm and freedom-loving energy. Others sense your quest for meaning.",
    firstImpression: "People see you as open, honest, and bigger than life. You radiate a cheerful confidence and love of ideas.",
    appearance: "Often tall or long-limbed. Bright, expressive eyes. An outdoorsy, natural quality to the look.",
    style: "Casual, adventurous, and international. You prefer comfort and practicality, mixing cultural influences freely."
  },
  Capricorn: {
    outward: "Responsible, composed, and authoritative. You project an air of maturity and ambition. Others sense your discipline and ability to deliver results.",
    firstImpression: "People see you as serious, capable, and someone who means business. You appear older than your years when young, and younger when older.",
    appearance: "Often strong bone structure. A dignified, composed bearing. Tends toward classic, conservative, high-quality clothing.",
    style: "Classic, professional, and timeless. You invest in quality basics and build a wardrobe that communicates success."
  },
  Aquarius: {
    outward: "Unique, progressive, and intellectually vibrant. You project an energy of individuality and forward-thinking. Others sense you are ahead of your time.",
    firstImpression: "People see you as original, independent, and slightly eccentric. You seem to operate on your own frequency.",
    appearance: "Often distinctive or unconventional features. A look that stands apart. Drawn to unusual or avant-garde styles.",
    style: "Eclectic and futuristic. You wear what expresses your individuality, often mixing vintage with cutting-edge."
  },
  Pisces: {
    outward: "Dreamy, empathetic, and otherworldly. You project a gentle, fluid quality that makes others feel understood. There is an ethereal quality to your presence.",
    firstImpression: "People sense your sensitivity and depth. You seem creative, compassionate, and slightly elusive — difficult to fully pin down.",
    appearance: "Often soft, ethereal features. Large or dreamy eyes. A flowing, romantic quality to personal style.",
    style: "Romantic, flowing, and artistic. Soft fabrics, ocean-inspired tones, and dreamy aesthetics draw you in."
  },
};

export default function RisingSignCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [city, setCity] = useState("");
  const [result, setResult] = useState<null | {
    sign: string; symbol: string; element: string; ruling: string;
    degrees: number; data: typeof RISING_DATA[string];
  }>(null);
  const [error, setError] = useState("");

  function calculate() {
    setError("");
    if (!birthDate || !birthTime || !city) { setError("Please fill in all fields."); return; }
    const cityData = CITIES.find(c => c.name === city);
    if (!cityData) { setError("Please select a city."); return; }
    const [h, m] = birthTime.split(":").map(Number);
    const date = new Date(`${birthDate}T${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:00Z`);
    const lonOffset = cityData.lon / 15;
    const utcDate = new Date(date.getTime() - lonOffset * 3600 * 1000);
    const asc = getAscendant(utcDate, cityData.lat, cityData.lon);
    const { sign, symbol, degreesInSign } = degreesToSign(asc);
    setResult({
      sign, symbol,
      element: ELEMENTS[sign],
      ruling: RULING_PLANETS[sign],
      degrees: Math.floor(degreesInSign),
      data: RISING_DATA[sign]
    });
  }

  function reset() { setBirthDate(""); setBirthTime(""); setCity(""); setResult(null); setError(""); }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Rising Sign Calculator</CardTitle>
        <CardDescription>Enter your birth date, exact birth time, and nearest city to find your Ascendant sign.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <Label htmlFor="rise-date">Birth Date</Label>
            <Input id="rise-date" type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="rise-time">Birth Time (local)</Label>
            <Input id="rise-time" type="time" value={birthTime} onChange={e => setBirthTime(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="rise-city">Nearest City</Label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger id="rise-city"><SelectValue placeholder="Select city…" /></SelectTrigger>
              <SelectContent>
                {CITIES.map(c => <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex gap-2">
          <Button onClick={calculate}>Find My Rising Sign</Button>
          <Button variant="outline" onClick={reset}><RotateCcw className="w-4 h-4 mr-1" />Reset</Button>
        </div>
        {result && (
          <div className="mt-4 space-y-4">
            <div className="rounded-lg p-5 text-center" style={{ background: ELEMENT_COLORS[result.element] + "20", border: `2px solid ${ELEMENT_COLORS[result.element]}` }}>
              <div className="text-4xl mb-1">{result.symbol}</div>
              <h2 className="text-2xl font-bold">{result.sign} Rising</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {result.degrees}° {result.sign} • {result.element} • Ruled by {result.ruling}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { title: "Your Outward Energy", text: result.data.outward },
                { title: "First Impression", text: result.data.firstImpression },
                { title: "Physical Appearance", text: result.data.appearance },
                { title: "Personal Style", text: result.data.style },
              ].map(s => (
                <div key={s.title} className="rounded-md border p-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">{s.title}</p>
                  <p className="text-sm">{s.text}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">* Rising sign changes every ~2 hours. Birth time accuracy matters.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
