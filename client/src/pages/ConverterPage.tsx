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
