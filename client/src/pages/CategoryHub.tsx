import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { calculatorCategories } from "@/lib/calculator-data";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect } from "react";

const categoryAccent: Record<string, string> = {
  financial:    "border-l-emerald-500 bg-emerald-50 dark:bg-emerald-950/20",
  business:     "border-l-blue-500 bg-blue-50 dark:bg-blue-950/20",
  health:       "border-l-rose-500 bg-rose-50 dark:bg-rose-950/20",
  math:         "border-l-violet-500 bg-violet-50 dark:bg-violet-950/20",
  education:    "border-l-amber-500 bg-amber-50 dark:bg-amber-950/20",
  other:        "border-l-orange-500 bg-orange-50 dark:bg-orange-950/20",
  "seo-tools":  "border-l-cyan-500 bg-cyan-50 dark:bg-cyan-950/20",
  converters:   "border-l-indigo-500 bg-indigo-50 dark:bg-indigo-950/20",
  construction: "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20",
  astrology:    "border-l-purple-500 bg-purple-50 dark:bg-purple-950/20",
};

const categoryIconBg: Record<string, string> = {
  financial:    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  business:     "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  health:       "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400",
  math:         "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400",
  education:    "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  other:        "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400",
  "seo-tools":  "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-400",
  converters:   "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400",
  construction: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400",
  astrology:    "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
};

const categoryHeroBg: Record<string, string> = {
  financial:    "from-emerald-50 to-white dark:from-emerald-950/30 dark:to-background",
  business:     "from-blue-50 to-white dark:from-blue-950/30 dark:to-background",
  health:       "from-rose-50 to-white dark:from-rose-950/30 dark:to-background",
  math:         "from-violet-50 to-white dark:from-violet-950/30 dark:to-background",
  education:    "from-amber-50 to-white dark:from-amber-950/30 dark:to-background",
  other:        "from-orange-50 to-white dark:from-orange-950/30 dark:to-background",
  "seo-tools":  "from-cyan-50 to-white dark:from-cyan-950/30 dark:to-background",
  converters:   "from-indigo-50 to-white dark:from-indigo-950/30 dark:to-background",
  construction: "from-yellow-50 to-white dark:from-yellow-950/30 dark:to-background",
  astrology:    "from-purple-50 to-white dark:from-purple-950/30 dark:to-background",
};

export default function CategoryHub() {
  const [location] = useLocation();

  const currentCategory = calculatorCategories.find(cat =>
    location.includes(cat.slug)
  );

  if (!currentCategory) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold">Category Not Found</h1>
          <Link href="/"><Button className="mt-4">Return Home</Button></Link>
        </div>
      </Layout>
    );
  }

  const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const accent = categoryAccent[currentCategory.slug] || "border-l-primary bg-primary/5";
  const iconBg  = categoryIconBg[currentCategory.slug]  || "bg-primary/10 text-primary";
  const heroBg  = categoryHeroBg[currentCategory.slug]  || "from-primary/5 to-white";

  useEffect(() => {
    document.title = `Free ${currentCategory.title} Calculators | CalcSmart24`;
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("description", `Free online ${currentCategory.title.toLowerCase()} calculators. ${currentCategory.description}`);
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = `https://calcsmart24.com/${currentCategory.slug}`;
  }, [currentCategory]);

  return (
    <Layout>
      <div className="space-y-8">

        {/* Hero Section */}
        <section className={`bg-gradient-to-br ${heroBg} rounded-2xl border p-8 space-y-4`}>
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl shrink-0 ${iconBg}`}>
              <currentCategory.icon className="h-8 w-8" />
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                  {currentCategory.title} Calculators
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                  {currentCategory.items.length} free tools
                </span>
              </div>
              <p className="text-lg text-muted-foreground mt-2 max-w-3xl leading-relaxed">
                {currentCategory.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            {[
              "100% Free",
              "No sign-up needed",
              "Mobile-friendly",
              "Instant results",
            ].map(f => (
              <span key={f} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                {f}
              </span>
            ))}
          </div>
        </section>

        {/* Tools Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {currentCategory.items.map((item) => (
            <Link key={item.name} href={`/calculator/${slugify(item.name)}`} className="block h-full group">
              <div className={`h-full rounded-xl border border-l-4 ${accent} p-4 flex flex-col gap-2 transition-all hover:shadow-md hover:scale-[1.01] cursor-pointer`}>
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm leading-snug">
                    {item.name}
                  </h2>
                  <div className={`shrink-0 p-1.5 rounded-lg ${iconBg}`}>
                    <currentCategory.icon className="h-3.5 w-3.5" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                  {item.description}
                </p>
                <div className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                  Open calculator <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Section */}
        <section className="border-t pt-10 pb-4">
          <h2 className="text-xl font-semibold mb-3">
            About our {currentCategory.title} tools
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            Our {currentCategory.title.toLowerCase()} collection gives you {currentCategory.items.length} precise, 
            instant-result tools — from {currentCategory.items[0]?.name} to {currentCategory.items[currentCategory.items.length - 1]?.name}.
            Every tool is 100% free, works on any device, and requires no account or download.
          </p>
        </section>
      </div>
    </Layout>
  );
}
