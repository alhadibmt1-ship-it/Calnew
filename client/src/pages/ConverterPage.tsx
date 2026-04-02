import { useRoute, Link } from "wouter";
import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRightLeft, Calculator } from "lucide-react";
import Layout from "@/components/Layout";
import CopyShareButtons from "@/components/CopyShareButtons";
import FormulaBox from "@/components/FormulaBox";
import {
  getConverterBySlug,
  getRelatedConverters,
  getPopularConverters,
  converterCategories,
  type ConverterDefinition,
} from "@/lib/converter-data";

function temperatureConvert(value: number, from: string, to: string): number {
  let celsius = value;
  if (from === "fahrenheit") celsius = (value - 32) * 5 / 9;
  else if (from === "kelvin") celsius = value - 273.15;
  if (to === "celsius") return celsius;
  if (to === "fahrenheit") return (celsius * 9 / 5) + 32;
  if (to === "kelvin") return celsius + 273.15;
  return value;
}

function convert(value: number, def: ConverterDefinition): number {
  if (def.special === "temperature") return temperatureConvert(value, def.fromUnit, def.toUnit);
  return value * (def.factor || 0);
}

function ConverterWidget({ def }: { def: ConverterDefinition }) {
  const [inputValue, setInputValue] = useState("1");
  const [result, setResult] = useState("");

  useEffect(() => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) { setResult(""); return; }
    const r = convert(val, def);
    setResult(r.toPrecision(8).replace(/\.?0+$/, ""));
  }, [inputValue, def]);

  const fmtUnit = (u: string) => u.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());

  return (
    <Card className="w-full" data-testid="converter-widget">
      <CardContent className="pt-6 space-y-4">
        <div className="grid sm:grid-cols-[1fr,auto,1fr] gap-4 items-center">
          <div className="space-y-2">
            <label className="text-sm font-medium">{fmtUnit(def.fromUnit)} ({def.fromSymbol})</label>
            <Input type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="text-lg" data-testid="input-from" />
          </div>
          <div className="flex justify-center">
            <ArrowRightLeft className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{fmtUnit(def.toUnit)} ({def.toSymbol})</label>
            <div className="flex h-10 w-full rounded-md border bg-muted px-3 py-2 text-lg font-semibold items-center justify-between" data-testid="output-result">
              <span>{result}</span>
              {result && <CopyShareButtons textToCopy={`${inputValue} ${def.fromSymbol} = ${result} ${def.toSymbol}`} shareTitle={def.name} shareText={`${inputValue} ${def.fromSymbol} = ${result} ${def.toSymbol}`} compact />}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ConversionTable({ def }: { def: ConverterDefinition }) {
  const fmtUnit = (u: string) => u.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  const values = [0.1, 0.5, 1, 2, 5, 10, 25, 50, 100, 500, 1000];
  return (
    <Card>
      <CardHeader><CardTitle className="text-lg">Conversion Table</CardTitle></CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b"><th className="text-left py-2 px-3">{fmtUnit(def.fromUnit)} ({def.fromSymbol})</th><th className="text-left py-2 px-3">{fmtUnit(def.toUnit)} ({def.toSymbol})</th></tr></thead>
            <tbody>
              {values.map(v => (
                <tr key={v} className="border-b last:border-0">
                  <td className="py-2 px-3">{v}</td>
                  <td className="py-2 px-3 font-medium">{convert(v, def).toPrecision(6).replace(/\.?0+$/, "")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ConverterPage() {
  const [, params] = useRoute("/convert/:slug");
  const slug = params?.slug || "";
  const def = useMemo(() => getConverterBySlug(slug), [slug]);

  if (!def) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-3xl font-bold mb-4">Converter Not Found</h1>
          <p className="text-muted-foreground mb-6">The converter you're looking for doesn't exist.</p>
          <Link href="/convert" className="text-primary hover:underline">Browse all converters</Link>
        </div>
      </Layout>
    );
  }

  const related = getRelatedConverters(def, 6);
  const popular = getPopularConverters(5);
  const catInfo = converterCategories.find(c => c.slug === def.category);

  useEffect(() => {
    if (!def) return;
    document.title = `${def.name} | CalcSmart24`;
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    const fmtUnit = (u: string) => u.replace(/_/g, " ");
    setMeta("description", def.description || `Free online ${fmtUnit(def.fromUnit)} to ${fmtUnit(def.toUnit)} converter. Instantly convert ${def.fromSymbol} to ${def.toSymbol} with formula and examples.`);
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = `https://calcsmart24.com/convert/${def.slug}`;
  }, [def]);

  return (
    <Layout>
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <nav className="text-sm text-muted-foreground mb-6" data-testid="breadcrumb">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/convert" className="hover:underline">Converters</Link>
          <span className="mx-2">/</span>
          <Link href={`/convert/${def.category}`} className="hover:underline capitalize">{catInfo?.name || def.category}</Link>
          <span className="mx-2">/</span>
          <span>{def.name}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold mb-2" data-testid="converter-title">
          {def.name} ({def.fromSymbol} → {def.toSymbol})
        </h1>
        <p className="text-lg text-muted-foreground mb-8">{def.description}</p>

        <ConverterWidget def={def} />

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <FormulaBox formula={def.formula} description={def.example} />
          <ConversionTable def={def} />
        </div>

        {def.faq.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {def.faq.map((item, i) => (
                <Card key={i}>
                  <CardContent className="pt-4">
                    <h3 className="font-semibold mb-2">{item.question}</h3>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Educational Content */}
        {(() => {
          const categoryContent: Record<string, { intro: string; uses: string; tips: string }> = {
            length: {
              intro: `Length conversion is one of the most common unit conversions needed in everyday life, science, engineering, and international trade. The metric system uses meters as its base unit, while the imperial system commonly used in the United States relies on feet and inches. Understanding how to convert between these systems is essential for travel, construction, and scientific work.`,
              uses: `Common uses for length conversions include home improvement projects (converting between feet and meters), international travel (understanding distances in kilometers vs. miles), scientific measurements (converting between nanometers and millimeters), and online shopping where product dimensions may be listed in different units.`,
              tips: `When converting between metric and imperial units, remember that 1 meter equals approximately 3.281 feet, and 1 kilometer equals approximately 0.621 miles. For small measurements, 1 inch equals 2.54 centimeters exactly. Keeping these key reference points in mind helps you quickly estimate conversions without a calculator.`,
            },
            weight: {
              intro: `Weight and mass conversions are fundamental in cooking, shipping, medicine, and science. The metric system uses grams and kilograms, while the imperial system uses pounds and ounces. The distinction between weight (force due to gravity) and mass (amount of matter) is important in physics, though in everyday use the terms are often used interchangeably.`,
              uses: `Weight conversions are essential in cooking and baking (converting grams to ounces), shipping and logistics (calculating freight costs), medical dosing (converting between mg and mcg), fitness tracking (pounds vs. kilograms), and international trade where different standards apply in different countries.`,
              tips: `A key reference point: 1 kilogram equals approximately 2.205 pounds, and 1 pound equals approximately 453.6 grams. For cooking, knowing that 1 cup of water weighs approximately 240 grams helps with recipe conversions. When shipping packages internationally, always confirm which weight unit the carrier uses for billing.`,
            },
            temperature: {
              intro: `Temperature conversion is essential for weather, cooking, science, and medicine. The three most common temperature scales are Celsius (°C), Fahrenheit (°F), and Kelvin (K). Celsius is used in most of the world and in science, Fahrenheit is used in the United States, and Kelvin is used in physics and chemistry for thermodynamic calculations.`,
              uses: `Temperature conversions are needed for reading international weather forecasts, following recipes from different countries, calibrating laboratory equipment, understanding medical fever thresholds, and working with industrial processes. A fever of 38°C (100.4°F) is clinically significant — knowing this conversion can be critical for medical decisions.`,
              tips: `The formulas are: °F = (°C × 9/5) + 32, and °C = (°F − 32) × 5/9. Kelvin = °C + 273.15. Quick reference points: water freezes at 0°C (32°F), body temperature is 37°C (98.6°F), and water boils at 100°C (212°F). For a quick mental estimate, double the Celsius value and add 30 to get an approximate Fahrenheit.`,
            },
            area: {
              intro: `Area conversion is critical in real estate, agriculture, construction, and geography. Area measures the amount of two-dimensional space within a boundary. The metric system uses square meters and hectares, while the imperial system uses square feet, square yards, and acres. Land area is often expressed in acres (US) or hectares (internationally).`,
              uses: `Area conversions are commonly needed when buying or renting property (square feet vs. square meters), planning a garden or farm (acres vs. hectares), laying flooring or tile (square yards vs. square meters), and reading maps or geographic data that may use different area units depending on the country of origin.`,
              tips: `Key reference points: 1 acre = 4,047 square meters ≈ 43,560 square feet. 1 hectare = 10,000 square meters ≈ 2.471 acres. For rooms and floors, 1 square meter = 10.764 square feet. A standard football field (American) is about 0.535 acres, which helps visualize larger areas.`,
            },
            volume: {
              intro: `Volume conversion is essential in cooking, chemistry, medicine, and fluid management. Volume measures three-dimensional space or the capacity of a container. The metric system uses liters and milliliters, while the imperial system uses gallons, quarts, pints, and fluid ounces. Different regions even use different gallon sizes (US vs. UK).`,
              uses: `Volume conversions are needed when following recipes from different countries (cups to milliliters), measuring liquid medications (teaspoons to milliliters), calculating fuel efficiency (gallons vs. liters), managing aquariums or pools (gallons vs. liters), and shipping liquids internationally where regulations use specific volume units.`,
              tips: `Key conversions: 1 liter = 1,000 mL = 33.8 fluid oz ≈ 4.23 cups. 1 US gallon = 3.785 liters. 1 teaspoon = 5 mL, 1 tablespoon = 15 mL, 1 cup = 240 mL. Note that US and UK gallons differ: 1 UK gallon = 4.546 liters vs. 1 US gallon = 3.785 liters — always confirm which standard is being used.`,
            },
            speed: {
              intro: `Speed conversion is important for transportation, athletics, meteorology, and engineering. Speed measures distance covered per unit of time. The most common units are kilometers per hour (km/h) used in most countries, miles per hour (mph) used in the US and UK, and meters per second (m/s) used in science and physics.`,
              uses: `Speed conversions are needed for driving in foreign countries (reading speed limits in km/h vs. mph), understanding weather reports (wind speed in knots or km/h), tracking athletic performance (running pace in min/km vs. min/mile), and calculating travel times with different speed units in navigation or mapping applications.`,
              tips: `Key conversions: 1 mph = 1.609 km/h, 1 km/h ≈ 0.621 mph. 1 m/s = 3.6 km/h = 2.237 mph. 1 knot = 1.852 km/h. A useful mental shortcut: to convert mph to km/h, multiply by 1.6 (or more precisely by 1.609). Highway speed limits of 60 mph = 96.6 km/h, and 100 km/h ≈ 62 mph.`,
            },
            "digital-storage": {
              intro: `Digital storage conversion is essential in computing, networking, and data management. Storage capacity is measured in bits and bytes, with each step representing a factor of 1,000 (or 1,024 in binary). Common units include kilobytes (KB), megabytes (MB), gigabytes (GB), and terabytes (TB). Understanding these units helps you choose the right storage device and understand file sizes.`,
              uses: `Digital storage conversions are needed when comparing hard drive capacities, understanding file sizes for photos and videos, estimating how much content fits on a storage device, purchasing cloud storage plans, and understanding network transfer speeds. A typical photo is 3-5 MB, a movie is 1-10 GB, and modern hard drives measure in terabytes.`,
              tips: `In the SI system (used by storage manufacturers), 1 GB = 1,000 MB. In binary (used by operating systems), 1 GiB = 1,024 MiB. This is why a "1 TB" hard drive shows as about 931 GB in Windows. For quick estimates: 1 GB ≈ 250 photos, 1 TB ≈ 250,000 photos or about 500 hours of HD video.`,
            },
            pressure: {
              intro: `Pressure conversion is critical in engineering, meteorology, medicine, and manufacturing. Pressure is force per unit area. Common units include Pascal (Pa), bar, atmosphere (atm), pounds per square inch (psi), and millimeters of mercury (mmHg). Blood pressure is measured in mmHg, weather in millibars or hPa, and tire pressure in psi or bar.`,
              uses: `Pressure conversions are needed when checking tire pressure (psi vs. bar vs. kPa), reading weather reports (hPa or mbar), monitoring blood pressure (mmHg), working with hydraulic systems, calibrating pressure gauges in different industrial settings, and converting between measurement standards used in different countries.`,
              tips: `Key conversions: 1 atm = 101,325 Pa = 1.01325 bar = 14.696 psi = 760 mmHg. Standard tire pressure is typically 32-35 psi = 2.2-2.4 bar. Normal blood pressure is about 120/80 mmHg. Weather pressure averages about 1013 hPa (hectopascals) at sea level. Always check which pressure unit is required for your specific application.`,
            },
            energy: {
              intro: `Energy conversion is fundamental in physics, engineering, nutrition, and environmental science. Energy exists in many forms — mechanical, thermal, electrical, chemical, and nuclear — and can be measured in many units. The SI unit is the joule (J), but calories, kilowatt-hours, BTU, and electron volts are all widely used in different contexts.`,
              uses: `Energy conversions are needed when comparing food nutrition labels (kilocalories vs. kilojoules), calculating electricity bills (kilowatt-hours), understanding heating efficiency (BTU for HVAC systems), designing batteries and electronics (watt-hours), and analyzing fuel consumption and environmental impact in engineering projects.`,
              tips: `Key conversions: 1 kilocalorie (kcal) = 4,184 joules. 1 kWh = 3,600,000 joules = 3,412 BTU. 1 BTU = 1,055 joules. For nutrition: food labels use kilocalories (often called "calories"). A typical daily diet of 2,000 kcal = 8,368 kJ. For electricity: a 100W bulb running for 10 hours uses 1 kWh of energy.`,
            },
            power: {
              intro: `Power conversion is important in engineering, electronics, and everyday life. Power measures the rate at which energy is transferred or work is done. The SI unit is the watt (W), but horsepower (hp) is still widely used for engines and motors. Understanding power helps in selecting motors, comparing appliances, and calculating energy consumption.`,
              uses: `Power conversions are needed when comparing car engines (horsepower vs. kilowatts), sizing electrical systems (watts and kilowatts), understanding appliance energy consumption, calculating generator capacity, comparing electric motors for industrial use, and understanding heating and cooling system capacity (BTU/hour vs. watts).`,
              tips: `Key conversions: 1 horsepower (mechanical) = 745.7 watts. 1 kilowatt = 1.341 horsepower. For electricity: a 1 kW device running for 1 hour uses 1 kWh of energy. Common appliance power: microwave ≈ 1,000W, refrigerator ≈ 150W, LED light bulb ≈ 10W. Electric car motors typically range from 100-300 kW (134-402 hp).`,
            },
            "fuel-efficiency": {
              intro: `Fuel efficiency conversion is important for vehicle owners, fleet managers, and environmental analysts. Fuel efficiency measures how far a vehicle travels per unit of fuel. The US uses miles per gallon (MPG), most of the world uses liters per 100 kilometers (L/100km), and some countries use kilometers per liter (km/L). Lower L/100km values and higher MPG values both indicate better efficiency.`,
              uses: `Fuel efficiency conversions are needed when comparing vehicles from different countries, calculating travel costs, understanding fuel economy standards (CAFE standards in the US vs. EU regulations), choosing between vehicles, and tracking fleet efficiency in logistics. Converting between standards helps make apples-to-apples comparisons across markets.`,
              tips: `Key conversions: MPG (US) = 235.21 ÷ L/100km. 1 km/L = 2.352 MPG (US) = 100 ÷ (L/100km). To convert MPG to L/100km: divide 235.21 by the MPG value. A car rated at 30 MPG = 7.84 L/100km. Note that UK MPG uses the Imperial gallon (4.546L) vs US gallon (3.785L), so UK MPG and US MPG values are NOT directly comparable.`,
            },
            angle: {
              intro: `Angle conversion is essential in mathematics, engineering, navigation, and computer graphics. Angles can be measured in degrees (most common in everyday life), radians (used in mathematics and physics), or gradians (used in surveying). A full circle is 360°, 2π radians, or 400 gradians. Understanding these relationships helps in trigonometry, rotation calculations, and coordinate transformations.`,
              uses: `Angle conversions are needed in navigation and surveying (bearing angles), computer graphics and game development (rotation in radians vs. degrees), architecture and construction (slope and pitch angles), trigonometry calculations (most programming libraries use radians), astronomy (right ascension in hours vs. degrees), and robotics and control systems.`,
              tips: `Key formulas: radians = degrees × π/180, degrees = radians × 180/π. Key reference points: 90° = π/2 radians ≈ 1.5708 rad, 180° = π radians ≈ 3.1416 rad, 360° = 2π radians ≈ 6.2832 rad. Most scientific calculators have degree and radian modes — always check which mode is active before computing trigonometric functions.`,
            },
            time: {
              intro: `Time conversion is one of the most fundamental conversions in everyday life and science. Time can be measured in nanoseconds for computing, seconds for physics, minutes and hours for daily scheduling, days and weeks for planning, and years for historical or astronomical timescales. The SI base unit of time is the second.`,
              uses: `Time conversions are needed for scheduling across time zones, understanding computer performance metrics (milliseconds, microseconds), calculating project durations, understanding geological and astronomical timescales, sports timing (converting between hours/minutes/seconds and decimal formats), and converting between different calendar systems.`,
              tips: `Key conversions: 1 minute = 60 seconds, 1 hour = 3,600 seconds, 1 day = 86,400 seconds, 1 year ≈ 31,536,000 seconds (365 days). For digital systems: 1 millisecond = 0.001 seconds, 1 microsecond = 0.000001 seconds. For quick mental math: multiply hours by 3,600 to get seconds, or divide seconds by 3,600 to get hours.`,
            },
            "data-transfer": {
              intro: `Data transfer rate conversion is essential in networking, telecommunications, and internet services. Transfer rates measure how quickly data moves from one place to another. Common units include bits per second (bps), kilobits per second (kbps), megabits per second (Mbps), and gigabits per second (Gbps). Note that network speeds use bits while file sizes use bytes — 1 byte = 8 bits.`,
              uses: `Data transfer conversions are needed when comparing internet service plans (Mbps), calculating download times for files, understanding streaming requirements (Netflix HD requires about 5 Mbps), evaluating network infrastructure, comparing WiFi standards (WiFi 6 supports up to 9.6 Gbps), and estimating how quickly large data sets can be transferred or backed up.`,
              tips: `Important distinction: network speeds are in megabits (Mb) per second, but file sizes are in megabytes (MB). 1 MB = 8 Mb. So a 100 Mbps connection downloads a 100 MB file in about 8 seconds (not 1 second). To estimate download time: divide file size in MB by (speed in Mbps ÷ 8). A 1 GB file at 100 Mbps takes about 80 seconds.`,
            },
          };

          const content = categoryContent[def.category];
          if (!content) return null;
          const catInfo2 = converterCategories.find(c => c.slug === def.category);

          return (
            <div className="mt-8 space-y-6">
              <h2 className="text-2xl font-bold">About {catInfo2?.name || def.category} Conversions</h2>
              <p className="text-muted-foreground leading-relaxed">{content.intro}</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-muted/30 rounded-lg p-5">
                  <h3 className="font-semibold text-base mb-2">Common Uses</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{content.uses}</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-5">
                  <h3 className="font-semibold text-base mb-2">Tips & Quick Reference</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{content.tips}</p>
                </div>
              </div>
            </div>
          );
        })()}

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-bold mb-4">Related Converters</h2>
            <div className="space-y-2">
              {related.map(r => (
                <Link key={r.slug} href={`/convert/${r.slug}`} className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted transition-colors">
                  <ArrowRightLeft className="h-4 w-4 text-primary" />
                  <span>{r.name}</span>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Popular Converters</h2>
            <div className="space-y-2">
              {popular.map(p => (
                <Link key={p.slug} href={`/convert/${p.slug}`} className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted transition-colors">
                  <Calculator className="h-4 w-4 text-primary" />
                  <span>{p.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
