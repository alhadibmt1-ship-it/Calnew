import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RotateCcw, Sparkles } from "lucide-react";

const ANGEL_NUMBERS: Record<string, { emoji: string; title: string; color: string; meaning: string; love: string; career: string; spiritual: string; action: string }> = {
  "000": { emoji: "⭕", title: "Infinite Potential", color: "#6b7280", meaning: "You are at the beginning of a new infinite cycle. The Universe is signaling pure potential and a divine reset. Everything is possible.", love: "Open your heart completely — a new beginning in love is here.", career: "A clean slate for your professional life awaits. Start fresh.", spiritual: "You are deeply connected to the infinite source of all creation.", action: "Let go of the past and embrace the limitless possibilities ahead." },
  "111": { emoji: "1️⃣", title: "Manifestation Portal", color: "#f97316", meaning: "Your thoughts are manifesting rapidly right now. 111 is a powerful portal — whatever you focus on is becoming your reality. Think positively.", love: "Your thoughts about love are manifesting. Focus on what you desire.", career: "New opportunities are forming. Align your thoughts with your goals.", spiritual: "A direct line to the Universe is open. Meditate and set intentions.", action: "Monitor your thoughts carefully — you are creating right now." },
  "222": { emoji: "2️⃣", title: "Trust & Balance", color: "#3b82f6", meaning: "You are being guided to trust the process. 222 urges balance, patience, and faith. Your seeds are planted — keep watering them.", love: "Balance and harmony are coming to your relationships. Trust.", career: "Stay the course — your efforts are working even if you can't see it.", spiritual: "The angels are with you. You are exactly where you need to be.", action: "Trust the divine timing and maintain balance in all areas." },
  "333": { emoji: "3️⃣", title: "Divine Support", color: "#f97316", meaning: "The Ascended Masters are with you — Jesus, Buddha, and other high-vibration beings surround you with love and guidance.", love: "Your relationship is divinely supported. Communicate openly.", career: "Your talents are being recognized by higher forces. Shine bright.", spiritual: "You are fully supported by divine beings on your spiritual path.", action: "Express yourself authentically — your creativity is blessed." },
  "444": { emoji: "4️⃣", title: "Angels Are Near", color: "#eab308", meaning: "Your guardian angels are surrounding you right now, offering love, protection, and support. You are never alone. Everything is okay.", love: "Your relationship has angelic protection. Communicate with love.", career: "Stability and solid foundations are being built in your work life.", spiritual: "The veil between you and the angels is thin right now. Connect.", action: "Feel safe and supported. Release worry — your angels have you." },
  "555": { emoji: "5️⃣", title: "Major Change Coming", color: "#84cc16", meaning: "Major life changes are unfolding — embrace them. 555 signals that transformation is necessary for your growth. Trust the shift.", love: "A significant shift in your love life is coming. Embrace it.", career: "Your career path is changing. Be flexible and embrace new directions.", spiritual: "A profound spiritual transformation is underway within you.", action: "Release resistance. The change coming is for your highest good." },
  "666": { emoji: "6️⃣", title: "Rebalance & Refocus", color: "#ef4444", meaning: "A gentle nudge to rebalance your life. 666 is not negative — it urges you to shift focus from material concerns to love and spirit.", love: "Focus less on problems and more on love. Nurture your bond.", career: "Check that work-life balance. Don't let finances dominate your life.", spiritual: "Reconnect with your higher self and spiritual practices.", action: "Release worry about material things. Trust that you are provided for." },
  "777": { emoji: "7️⃣", title: "Divine Luck & Wisdom", color: "#7c3aed", meaning: "You are on the most aligned path of your life. 777 is the luckiest angel number — divine rewards and spiritual downloads are flowing to you.", love: "Deep soulmate connections and spiritual love are highlighted.", career: "Recognition and financial abundance are coming your way.", spiritual: "You are receiving profound spiritual wisdom and downloads.", action: "Keep going — you are in perfect divine alignment. Celebrate!" },
  "888": { emoji: "8️⃣", title: "Abundance Flowing", color: "#f59e0b", meaning: "Financial abundance and material success are flowing into your life. 888 is the number of infinite flow — give and receive freely.", love: "Abundance of love and joy is entering your relationships.", career: "Major financial success and career achievements are incoming.", spiritual: "You are in perfect alignment with the universal flow of abundance.", action: "Open your arms to receive — the Universe is delivering abundance." },
  "999": { emoji: "9️⃣", title: "Completion & Release", color: "#10b981", meaning: "A major chapter of your life is ending. 999 urges you to release what no longer serves you and prepare for a powerful new beginning.", love: "A chapter in your love story is complete. Release with gratitude.", career: "One career phase is closing — a greater opportunity is next.", spiritual: "A profound spiritual cycle is complete. You have leveled up.", action: "Let go gracefully. The best is yet to come after this ending." },
  "1111": { emoji: "✨", title: "Master Manifestation", color: "#a855f7", meaning: "The most powerful manifestation number. 1111 is a cosmic gateway — your thoughts are instantly creating your reality. This is a divine sign of alignment.", love: "Your twin flame or soulmate connection is being activated.", career: "Your deepest career dreams are within reach. Take bold action.", spiritual: "You have crossed a spiritual threshold. A major awakening awaits.", action: "Make a wish, set a powerful intention — the Universe is listening." },
  "1212": { emoji: "🌟", title: "Spiritual Awakening", color: "#06b6d4", meaning: "You are on the path of spiritual growth and awakening. 1212 encourages you to step outside your comfort zone and trust your spiritual gifts.", love: "Your relationship is evolving to a higher spiritual level.", career: "New beginnings in your work life align with your soul's purpose.", spiritual: "Trust your spiritual journey — you are being divinely guided.", action: "Trust your intuition and take inspired action toward your dreams." },
  "1234": { emoji: "🪜", title: "Step by Step Progress", color: "#84cc16", meaning: "You are making steady, sequential progress. 1234 is a sign to keep moving forward — one step at a time, in the right order.", love: "Take the relationship to the next level, one step at a time.", career: "Sequential progress in your career is unfolding perfectly.", spiritual: "Trust each step of your spiritual journey. It's unfolding perfectly.", action: "Keep moving forward methodically — progress is guaranteed." },
  "2222": { emoji: "☯️", title: "Divine Harmony", color: "#3b82f6", meaning: "Extraordinary balance and harmony are being established in your life. 2222 amplifies the power of 222 — trust is your superpower now.", love: "Relationship harmony and deep partnership are being strengthened.", career: "Collaborative success and peaceful work environments surround you.", spiritual: "You are in perfect harmony with the divine plan for your life.", action: "Practice gratitude and trust that everything is working out." },
  "3333": { emoji: "🔺", title: "Ascended Masters' Blessing", color: "#f97316", meaning: "The Ascended Masters are amplifying their support and guidance around you. Your creative power and expression are divinely blessed.", love: "Joyful love and deep creative connection are highlighted.", career: "Your talents are being powerfully amplified. Express yourself fully.", spiritual: "You are being called to a higher spiritual mission.", action: "Fully embrace your gifts and share them with the world." },
  "4444": { emoji: "🏛️", title: "Angelic Foundation", color: "#eab308", meaning: "A massive army of angels surrounds you, creating an unshakeable foundation of love and support. You are completely protected.", love: "Your love relationship is divinely protected and stable.", career: "Rock-solid career foundations are being laid for long-term success.", spiritual: "You are deeply anchored in angelic protection and divine love.", action: "Move forward with complete confidence — you are fully supported." },
  "5555": { emoji: "🌀", title: "Major Transformation", color: "#84cc16", meaning: "Profound, life-altering transformation is accelerating. 5555 amplifies change to its highest power — prepare for an extraordinary evolution.", love: "Your love life is undergoing a complete and beautiful transformation.", career: "Revolutionary career changes are rapidly accelerating.", spiritual: "A massive spiritual leap and consciousness expansion is occurring.", action: "Fully surrender to the transformation — it's elevating you." },
};

const POPULAR = ["111", "222", "333", "444", "555", "666", "777", "888", "999", "1111", "1212"];

export default function AngelNumberCalculator() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<typeof ANGEL_NUMBERS[string] | null>(null);
  const [notFound, setNotFound] = useState(false);

  const lookup = (val: string) => {
    const clean = val.replace(/[^0-9]/g, "");
    if (!clean) return;
    const found = ANGEL_NUMBERS[clean];
    setNotFound(!found);
    setResult(found || null);
    setNumber(clean);
  };

  const reset = () => { setNumber(""); setResult(null); setNotFound(false); };

  return (
    <Card className="w-full border-t-4 border-t-purple-400">
      <CardHeader>
        <CardTitle>Angel Number Calculator</CardTitle>
        <CardDescription>See repeating numbers everywhere? Enter them here to discover the spiritual message your guardian angels are sending you.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-1.5 max-w-xs">
          <Label>Angel Number (e.g. 111, 444, 1212)</Label>
          <Input placeholder="e.g. 333" value={number} onChange={e => setNumber(e.target.value.replace(/[^0-9]/g, ""))}
            onKeyDown={e => e.key === "Enter" && lookup(number)} maxLength={6} />
        </div>
        <div className="flex gap-2">
          <Button onClick={() => lookup(number)} className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" /> Decode Message
          </Button>
          <Button variant="ghost" size="sm" onClick={reset} className="flex items-center gap-1.5">
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </Button>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Popular Angel Numbers</p>
          <div className="flex flex-wrap gap-2">
            {POPULAR.map(n => (
              <button key={n} onClick={() => lookup(n)}
                className="px-3 py-1.5 rounded-full border text-sm font-medium hover:bg-purple-50 hover:border-purple-400 transition-colors"
                style={{ borderColor: number === n ? "#a855f7" : undefined, backgroundColor: number === n ? "#f5f3ff" : undefined }}>
                {n}
              </button>
            ))}
          </div>
        </div>

        {notFound && (
          <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 p-5 text-center text-sm text-gray-500">
            <p className="font-medium">"{number}" is not in our database yet.</p>
            <p className="mt-1 text-xs">Try combining the individual digits' meanings, or check one of the popular numbers above.</p>
          </div>
        )}

        {result && (
          <div className="rounded-xl border p-6 space-y-4" style={{ borderColor: result.color, background: `${result.color}10` }}>
            <div className="flex items-center gap-4">
              <span className="text-5xl">{result.emoji}</span>
              <div>
                <h3 className="text-2xl font-bold" style={{ color: result.color }}>{number}</h3>
                <p className="text-base font-semibold text-gray-700">{result.title}</p>
              </div>
            </div>
            <p className="text-sm text-gray-700">{result.meaning}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div className="rounded-lg bg-white/80 p-3">
                <p className="text-xs font-semibold text-pink-700 uppercase mb-1">❤️ Love</p>
                <p className="text-gray-600 text-xs">{result.love}</p>
              </div>
              <div className="rounded-lg bg-white/80 p-3">
                <p className="text-xs font-semibold text-blue-700 uppercase mb-1">💼 Career</p>
                <p className="text-gray-600 text-xs">{result.career}</p>
              </div>
              <div className="rounded-lg bg-white/80 p-3">
                <p className="text-xs font-semibold text-purple-700 uppercase mb-1">🌟 Spiritual</p>
                <p className="text-gray-600 text-xs">{result.spiritual}</p>
              </div>
            </div>
            <div className="rounded-lg bg-white/80 p-3 text-sm border-l-4" style={{ borderLeftColor: result.color }}>
              <p className="text-xs font-semibold text-gray-600 uppercase mb-1">✅ What to Do</p>
              <p className="text-gray-700">{result.action}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
