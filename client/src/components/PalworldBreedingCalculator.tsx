import { useState, useMemo, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, X, Star, ChevronLeft, ChevronRight, RotateCcw, Search } from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────

const PALS: [string, number, string][] = [
  ["Lamball", 1500, "Neutral"],
  ["Cattiva", 1460, "Neutral"],
  ["Chikipi", 1450, "Neutral"],
  ["Lifmunk", 1440, "Grass"],
  ["Foxparks", 1430, "Fire"],
  ["Fuack", 1420, "Water"],
  ["Sparkit", 1410, "Electric"],
  ["Tanzee", 1400, "Grass"],
  ["Rooby", 1390, "Fire"],
  ["Pengullet", 1380, "Water/Ice"],
  ["Penking", 1370, "Water/Ice"],
  ["Jolthog", 1360, "Electric"],
  ["Jolthog Cryst", 1350, "Ice"],
  ["Gumoss", 1340, "Grass"],
  ["Vixy", 1330, "Neutral"],
  ["Hoocrates", 1320, "Dark"],
  ["Teafant", 1310, "Water"],
  ["Depresso", 1300, "Dark"],
  ["Cremis", 1290, "Neutral"],
  ["Daedream", 1280, "Dark"],
  ["Rushoar", 1270, "Ground"],
  ["Nox", 1260, "Dark"],
  ["Fuddler", 1250, "Ground"],
  ["Killamari", 1240, "Dark"],
  ["Mau", 1230, "Dark"],
  ["Mau Cryst", 1220, "Ice"],
  ["Celaray", 1210, "Water"],
  ["Direhowl", 1200, "Neutral"],
  ["Tocotoco", 1190, "Neutral"],
  ["Flopie", 1180, "Grass"],
  ["Mozzarina", 1170, "Neutral"],
  ["Bristla", 1160, "Grass"],
  ["Gobfin", 1150, "Water"],
  ["Gobfin Ignis", 1140, "Fire"],
  ["Hangyu", 1130, "Ground"],
  ["Hangyu Cryst", 1120, "Ice"],
  ["Melpaca", 1110, "Neutral"],
  ["Eikthyrdeer", 1100, "Neutral"],
  ["Eikthyrdeer Terra", 1090, "Ground"],
  ["Nitewing", 1080, "Neutral"],
  ["Ribbuny", 1070, "Neutral"],
  ["Incineram", 1060, "Fire/Dark"],
  ["Incineram Noct", 1050, "Dark"],
  ["Cinnamoth", 1040, "Grass"],
  ["Arsox", 1030, "Fire"],
  ["Dumud", 1020, "Ground"],
  ["Cawgnito", 1010, "Dark"],
  ["Digtoise", 1015, "Ground"],
  ["Leezpunk", 1000, "Dark"],
  ["Leezpunk Ignis", 990, "Fire"],
  ["Loupmoon", 980, "Dark"],
  ["Galeclaw", 970, "Neutral"],
  ["Robinquill", 960, "Grass"],
  ["Robinquill Terra", 950, "Ground"],
  ["Gorirat", 940, "Neutral"],
  ["Beegarde", 930, "Grass"],
  ["Elizabee", 920, "Grass"],
  ["Grintale", 910, "Neutral"],
  ["Swee", 900, "Ice"],
  ["Sweepa", 890, "Ice"],
  ["Surfent", 880, "Water"],
  ["Chillet", 880, "Ice/Dragon"],
  ["Surfent Terra", 870, "Ground"],
  ["Univolt", 870, "Electric"],
  ["Foxcicle", 860, "Ice"],
  ["Pyrin", 850, "Fire"],
  ["Pyrin Noct", 840, "Fire/Dark"],
  ["Reindrix", 830, "Ice"],
  ["Rayhound", 820, "Electric"],
  ["Kitsun", 810, "Fire"],
  ["Dazzi", 800, "Electric"],
  ["Croajiro", 795, "Water"],
  ["Lunaris", 790, "Neutral"],
  ["Felbat", 780, "Dark"],
  ["Quivern", 770, "Dragon"],
  ["Blazehowl", 760, "Fire"],
  ["Blazehowl Noct", 750, "Fire/Dark"],
  ["Relaxaurus", 740, "Dragon"],
  ["Relaxaurus Lux", 730, "Dragon/Electric"],
  ["Broncherry", 720, "Grass"],
  ["Broncherry Aqua", 710, "Water"],
  ["Petallia", 700, "Grass"],
  ["Reptyro", 690, "Fire/Ground"],
  ["Reptyro Cryst", 680, "Ice/Ground"],
  ["Kingpaca", 670, "Neutral"],
  ["Kingpaca Cryst", 660, "Ice"],
  ["Mammorest", 650, "Grass"],
  ["Mammorest Cryst", 640, "Ice"],
  ["Wumpo", 630, "Ice"],
  ["Wumpo Botan", 620, "Grass"],
  ["Wixen", 610, "Fire"],
  ["Verdash", 600, "Grass"],
  ["Vanwyrm", 590, "Fire/Dark"],
  ["Vanwyrm Cryst", 580, "Ice/Dark"],
  ["Bushi", 570, "Fire"],
  ["Beakon", 560, "Electric"],
  ["Ragnahawk", 550, "Fire"],
  ["Katress", 540, "Dark"],
  ["Katress Ignis", 530, "Fire"],
  ["Kelpsea", 520, "Water"],
  ["Kelpsea Ignis", 510, "Fire"],
  ["Azurobe", 500, "Water/Dragon"],
  ["Cryolinx", 490, "Ice"],
  ["Blazamut", 480, "Fire"],
  ["Blazamut Ryu", 470, "Fire/Dragon"],
  ["Helzephyr", 460, "Dark"],
  ["Astegon", 450, "Dragon/Dark"],
  ["Menasting", 440, "Ground/Dark"],
  ["Anubis", 430, "Ground"],
  ["Jormuntide", 420, "Water/Dragon"],
  ["Jormuntide Ignis", 410, "Fire/Dragon"],
  ["Suzaku", 400, "Fire"],
  ["Suzaku Aqua", 390, "Water"],
  ["Grizzbolt", 380, "Electric"],
  ["Lyleen", 370, "Grass"],
  ["Lyleen Noct", 360, "Dark"],
  ["Faleris", 350, "Fire"],
  ["Faleris Aqua", 340, "Water"],
  ["Orserk", 330, "Dragon/Electric"],
  ["Shadowbeak", 320, "Dark"],
  ["Paladius", 310, "Neutral"],
  ["Necromus", 300, "Dark"],
  ["Frostallion", 100, "Ice"],
  ["Frostallion Noct", 90, "Dark"],
  ["Jetragon", 50, "Dragon"],
];

const SPECIAL_COMBOS: { p1: string; p2: string; child: string }[] = [
  { p1: "Incineram",   p2: "Maraith",     child: "Incineram Noct" },
  { p1: "Kingpaca",    p2: "Reindrix",    child: "Kingpaca Cryst" },
  { p1: "Lyleen",      p2: "Menasting",   child: "Lyleen Noct" },
  { p1: "Vanwyrm",     p2: "Foxcicle",    child: "Vanwyrm Cryst" },
  { p1: "Blazehowl",   p2: "Reptyro",     child: "Blazehowl Noct" },
  { p1: "Relaxaurus",  p2: "Sparkit",     child: "Relaxaurus Lux" },
  { p1: "Broncherry",  p2: "Fuack",       child: "Broncherry Aqua" },
  { p1: "Surfent",     p2: "Dumud",       child: "Surfent Terra" },
  { p1: "Gobfin",      p2: "Rooby",       child: "Gobfin Ignis" },
  { p1: "Hangyu",      p2: "Swee",        child: "Hangyu Cryst" },
  { p1: "Mau",         p2: "Pengullet",   child: "Mau Cryst" },
  { p1: "Eikthyrdeer", p2: "Hangyu",      child: "Eikthyrdeer Terra" },
  { p1: "Robinquill",  p2: "Fuddler",     child: "Robinquill Terra" },
  { p1: "Jolthog",     p2: "Pengullet",   child: "Jolthog Cryst" },
  { p1: "Reptyro",     p2: "Foxcicle",    child: "Reptyro Cryst" },
  { p1: "Leezpunk",    p2: "Flambelle",   child: "Leezpunk Ignis" },
  { p1: "Pyrin",       p2: "Katress",     child: "Pyrin Noct" },
  { p1: "Mammorest",   p2: "Wumpo",       child: "Mammorest Cryst" },
  { p1: "Blazamut",    p2: "Relaxaurus",  child: "Blazamut Ryu" },
  { p1: "Suzaku",      p2: "Jormuntide",  child: "Suzaku Aqua" },
  { p1: "Jormuntide",  p2: "Pyrin",       child: "Jormuntide Ignis" },
  { p1: "Frostallion", p2: "Helzephyr",   child: "Frostallion Noct" },
  { p1: "Katress",     p2: "Wixen",       child: "Katress Ignis" },
  { p1: "Kelpsea",     p2: "Rooby",       child: "Kelpsea Ignis" },
  { p1: "Faleris",     p2: "Ragnahawk",   child: "Faleris Aqua" },
];

// ─── Helpers ───────────────────────────────────────────────────────────────

const PAL_MAP = new Map(PALS.map(([name, power, element]) => [name, { power, element }]));

const ELEMENT_COLORS: Record<string, string> = {
  Fire: "#ef4444", Water: "#3b82f6", Grass: "#22c55e", Electric: "#eab308",
  Ice: "#06b6d4", Ground: "#92400e", Dark: "#7c3aed", Dragon: "#f97316", Neutral: "#6b7280",
};

function getElementColor(element: string): string {
  const primary = element.split("/")[0];
  return ELEMENT_COLORS[primary] || "#6b7280";
}

function checkSpecial(p1: string, p2: string): string | null {
  for (const combo of SPECIAL_COMBOS) {
    if ((combo.p1 === p1 && combo.p2 === p2) || (combo.p1 === p2 && combo.p2 === p1)) {
      return combo.child;
    }
  }
  return null;
}

function calcOffspring(p1Name: string, p2Name: string): { name: string; power: number; element: string; isSpecial: boolean } | null {
  const special = checkSpecial(p1Name, p2Name);
  if (special) {
    const data = PAL_MAP.get(special);
    if (data) return { name: special, power: data.power, element: data.element, isSpecial: true };
  }
  const p1 = PAL_MAP.get(p1Name);
  const p2 = PAL_MAP.get(p2Name);
  if (!p1 || !p2) return null;
  const childPower = Math.floor((p1.power + p2.power + 1) / 2);
  let closest = PALS[0];
  let minDiff = Math.abs(PALS[0][1] - childPower);
  for (const pal of PALS) {
    const diff = Math.abs(pal[1] - childPower);
    if (diff < minDiff) { minDiff = diff; closest = pal; }
  }
  return { name: closest[0], power: closest[1], element: closest[2], isSpecial: false };
}

function findParentCombos(targetName: string): { p1: string; p2: string; isSpecial: boolean }[] {
  const results: { p1: string; p2: string; isSpecial: boolean }[] = [];
  // Special combos first
  for (const combo of SPECIAL_COMBOS) {
    if (combo.child === targetName) {
      results.push({ p1: combo.p1, p2: combo.p2, isSpecial: true });
    }
  }
  // Standard formula combos
  const palNames = PALS.map(p => p[0]);
  for (let i = 0; i < palNames.length; i++) {
    for (let j = i; j < palNames.length; j++) {
      const p1 = palNames[i], p2 = palNames[j];
      if (checkSpecial(p1, p2)) continue;
      const offspring = calcOffspring(p1, p2);
      if (offspring && offspring.name === targetName) {
        results.push({ p1, p2, isSpecial: false });
      }
    }
  }
  return results;
}

// ─── Sub-components ────────────────────────────────────────────────────────

interface PalDropdownProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

function PalDropdown({ label, value, onChange, placeholder = "Search for a Pal…" }: PalDropdownProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return PALS.filter(([name]) => name.toLowerCase().includes(q));
  }, [query]);

  const selected = value ? PAL_MAP.get(value) : null;

  return (
    <div className="space-y-1.5" ref={ref}>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => { setOpen(o => !o); if (!open) setTimeout(() => inputRef.current?.focus(), 50); }}
          className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          {value && selected ? (
            <span className="flex items-center gap-2 min-w-0">
              <span
                className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: getElementColor(selected.element) }}
              />
              <span className="truncate font-medium">{value}</span>
              <span className="text-xs px-1.5 py-0.5 rounded-full flex-shrink-0 text-white font-medium"
                style={{ backgroundColor: getElementColor(selected.element) }}>
                {selected.element}
              </span>
            </span>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
          <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
        </button>

        {open && (
          <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            <div className="p-2 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-2.5 top-2 h-4 w-4 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search Pals…"
                  className="w-full pl-8 pr-3 py-1.5 text-sm rounded border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {query && (
                  <button onClick={() => setQuery("")} className="absolute right-2 top-2 text-gray-400 hover:text-gray-600">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            <div className="max-h-56 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="px-3 py-4 text-sm text-gray-400 text-center">No Pals found</div>
              ) : (
                filtered.map(([name, , element]) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => { onChange(name); setOpen(false); setQuery(""); }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-blue-50 transition-colors ${value === name ? "bg-blue-50 font-medium" : ""}`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: getElementColor(element) }} />
                    <span className="flex-1 truncate">{name}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded-full text-white flex-shrink-0"
                      style={{ backgroundColor: getElementColor(element) }}>
                      {element}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ElementBadge({ element }: { element: string }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold text-white"
      style={{ backgroundColor: getElementColor(element) }}
    >
      {element}
    </span>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────

export default function PalworldBreedingCalculator() {
  const [activeTab, setActiveTab] = useState<"offspring" | "parents">("offspring");

  // Mode A: Find Offspring
  const [parent1, setParent1] = useState("");
  const [parent2, setParent2] = useState("");

  // Mode B: Find Parents
  const [targetPal, setTargetPal] = useState("");
  const [page, setPage] = useState(0);

  const PER_PAGE = 20;

  const offspring = useMemo(() => {
    if (!parent1 || !parent2) return null;
    return calcOffspring(parent1, parent2);
  }, [parent1, parent2]);

  const parentCombos = useMemo(() => {
    if (!targetPal) return [];
    return findParentCombos(targetPal);
  }, [targetPal]);

  const totalPages = Math.ceil(parentCombos.length / PER_PAGE);
  const pageSlice = parentCombos.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  const reset = () => {
    setParent1(""); setParent2(""); setTargetPal(""); setPage(0);
  };

  // Reset page when target changes
  useEffect(() => { setPage(0); }, [targetPal]);

  return (
    <Card className="w-full border-t-4 border-t-blue-600">
      <CardHeader>
        <CardTitle>Palworld Breeding Calculator</CardTitle>
        <CardDescription>
          Find offspring from two Pals, or discover every parent combination that produces a specific Pal.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">

        {/* Tab Bar */}
        <div className="flex rounded-lg border border-gray-200 overflow-hidden">
          {(["offspring", "parents"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab === "offspring" ? "🥚 Find Offspring" : "🔍 Find Parents"}
            </button>
          ))}
        </div>

        {/* ── Mode A: Find Offspring ── */}
        {activeTab === "offspring" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <PalDropdown label="Parent 1" value={parent1} onChange={setParent1} placeholder="Select Parent 1…" />
              <PalDropdown label="Parent 2" value={parent2} onChange={setParent2} placeholder="Select Parent 2…" />
            </div>

            {parent1 && parent2 && offspring && (
              <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 to-white p-5 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Predicted Offspring</p>
                  {offspring.isSpecial && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold border border-amber-300">
                      <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> Special Combo!
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-2xl font-bold text-gray-900">{offspring.name}</h3>
                  <ElementBadge element={offspring.element} />
                </div>
                <p className="text-sm text-gray-500">
                  Breeding Power: <span className="font-semibold text-gray-700">{offspring.power}</span>
                </p>
                <p className="text-xs text-gray-400">
                  {parent1} (⚡{PAL_MAP.get(parent1)?.power}) + {parent2} (⚡{PAL_MAP.get(parent2)?.power})
                  {!offspring.isSpecial && ` → avg ${Math.floor(((PAL_MAP.get(parent1)?.power ?? 0) + (PAL_MAP.get(parent2)?.power ?? 0) + 1) / 2)}`}
                </p>
              </div>
            )}

            {parent1 && parent2 && !offspring && (
              <div className="rounded-lg border border-red-100 bg-red-50 p-4 text-sm text-red-600 text-center">
                Could not calculate offspring for this combination.
              </div>
            )}

            {(!parent1 || !parent2) && (
              <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-400">
                Select both parents to see the predicted offspring.
              </div>
            )}
          </div>
        )}

        {/* ── Mode B: Find Parents ── */}
        {activeTab === "parents" && (
          <div className="space-y-5">
            <PalDropdown label="Target Pal" value={targetPal} onChange={setTargetPal} placeholder="Select the Pal you want to breed…" />

            {targetPal && parentCombos.length === 0 && (
              <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500">
                No parent combinations found for <strong>{targetPal}</strong>.
              </div>
            )}

            {targetPal && parentCombos.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span><strong className="text-gray-900">{parentCombos.length}</strong> combinations found</span>
                  {totalPages > 1 && <span>Page {page + 1} of {totalPages}</span>}
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-600">Parent 1</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-600">Parent 2</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-600">Type</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {pageSlice.map(({ p1, p2, isSpecial }, i) => {
                        const d1 = PAL_MAP.get(p1);
                        const d2 = PAL_MAP.get(p2);
                        return (
                          <tr key={i} className="hover:bg-blue-50/50 transition-colors">
                            <td className="px-4 py-2.5">
                              <div className="flex items-center gap-2">
                                {d1 && <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: getElementColor(d1.element) }} />}
                                <span className="font-medium">{p1}</span>
                                {d1 && <span className="hidden sm:inline text-xs text-gray-400">⚡{d1.power}</span>}
                              </div>
                            </td>
                            <td className="px-4 py-2.5">
                              <div className="flex items-center gap-2">
                                {d2 && <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: getElementColor(d2.element) }} />}
                                <span className="font-medium">{p2}</span>
                                {d2 && <span className="hidden sm:inline text-xs text-gray-400">⚡{d2.power}</span>}
                              </div>
                            </td>
                            <td className="px-4 py-2.5">
                              {isSpecial ? (
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                                  <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> Special
                                </span>
                              ) : (
                                <span className="text-xs text-gray-400">Standard</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-between pt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(p => Math.max(0, p - 1))}
                      disabled={page === 0}
                      className="flex items-center gap-1"
                    >
                      <ChevronLeft className="h-4 w-4" /> Previous
                    </Button>
                    <span className="text-sm text-gray-500">{page + 1} / {totalPages}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                      disabled={page === totalPages - 1}
                      className="flex items-center gap-1"
                    >
                      Next <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            )}

            {!targetPal && (
              <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-400">
                Select a target Pal to see all parent combinations.
              </div>
            )}
          </div>
        )}

        {/* Reset */}
        <div className="flex justify-end pt-1">
          <Button variant="ghost" size="sm" onClick={reset} className="text-gray-500 hover:text-gray-700 flex items-center gap-1.5">
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </Button>
        </div>

        {/* How it works accordion */}
        <details className="rounded-lg border border-gray-200 overflow-hidden">
          <summary className="cursor-pointer px-4 py-3 bg-gray-50 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors select-none list-none flex items-center justify-between">
            <span>How does Palworld breeding work?</span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </summary>
          <div className="px-4 py-4 text-sm text-gray-600 space-y-2 border-t border-gray-200 bg-white">
            <p>1. Every Pal has a hidden <strong>Breeding Power</strong> between 10 and 1500. Lower = rarer/stronger.</p>
            <p>2. The game averages both parents using: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">floor((parent1Power + parent2Power + 1) / 2)</code></p>
            <p>3. The Pal with the closest Breeding Power to that result becomes the child.</p>
            <p>4. Some parent pairs have hardcoded <strong>Special Combo</strong> results that override the formula — shown with a ⭐ badge.</p>
            <p>5. In-game you need a <strong>Breeding Farm</strong> (Technology Level 19) and at least one <strong>Cake</strong> in the farm chest. Cake requires Flour, Red Berries, Eggs, Milk, and Honey.</p>
          </div>
        </details>

        {/* Disclaimer */}
        <p className="text-xs text-gray-400 text-center leading-relaxed">
          Breeding data is based on the current Palworld version. Combinations may change with future game updates. This tool is not affiliated with Pocketpair.
        </p>
      </CardContent>
    </Card>
  );
}
