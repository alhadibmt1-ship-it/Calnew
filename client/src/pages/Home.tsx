import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation, useSearch } from "wouter";
import { useState, lazy, Suspense, useEffect, useRef, KeyboardEvent } from "react";
import { calculatorCategories, getAllTools } from "@/lib/calculator-data";
import { 
  Calculator, 
  TrendingUp, 
  Heart, 
  Calendar, 
  DollarSign, 
  RefreshCcw,
  Type,
  Search,
  ArrowRight,
  Sparkles,
  Loader2
} from "lucide-react";

// Lazy load the prominent calculators to reduce initial bundle size
const StandardCalculator = lazy(() => import("@/components/StandardCalculator"));
const BMICalculator = lazy(() => import("@/components/BMICalculator"));

export default function Home() {
  const queryString = useSearch();
  const [, setLocation] = useLocation();
  const initialSearch = new URLSearchParams(queryString).get("search") ?? "";
  const [search, setSearch] = useState(initialSearch);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const term = new URLSearchParams(queryString).get("search") ?? "";
    setSearch(term);
    if (term && searchRef.current) {
      searchRef.current.focus();
    }
    if (term) {
      document.title = `Search: ${term} | CalcSmart24`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", `Search results for "${term}" — free online calculators at CalcSmart24.`);
      let noindex = document.querySelector('meta[name="robots"][content*="noindex"]') as HTMLMetaElement | null;
      if (!noindex) {
        noindex = document.createElement("meta") as HTMLMetaElement;
        noindex.name = "robots";
        document.head.appendChild(noindex);
      }
      noindex.setAttribute("content", "noindex, follow");
    } else {
      const noindex = document.querySelector('meta[name="robots"][content*="noindex"]');
      if (noindex) noindex.remove();
    }
  }, [queryString]);

  const handleSearchSubmit = () => {
    const trimmed = search.trim();
    if (trimmed) {
      setLocation(`/?search=${encodeURIComponent(trimmed)}`);
    } else {
      setLocation("/");
    }
  };

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearchSubmit();
  };

  // Local categories for the cards (using specific icons and subset if needed, 
  // but mapped to match the structure if we want consistent icons)
  // We'll keep the existing visual cards as they are for the main UI
  const featuredCategories = [
    {
      title: "Finance & Business",
      href: "/financial",
      icon: <DollarSign className="h-5 w-5" />,
      items: [
        { name: "Loan EMI Calculator" }, { name: "Mortgage Calculator" }, { name: "Compound Interest" }, 
        { name: "GST/VAT Calculator" }, { name: "Salary Calculator" }, { name: "Discount Calculator" }
      ]
    },
    {
      title: "Fitness & Health",
      href: "/health",
      icon: <Heart className="h-5 w-5" />,
      items: [
        { name: "BMI Calculator" }, { name: "Calorie Calculator" }, { name: "Body Fat Calculator" }, 
        { name: "Water Intake" }, { name: "BMR Calculator" }, { name: "Sleep Calculator" }
      ]
    },
    {
      title: "Unit Converters",
      href: "/converters",
      icon: <RefreshCcw className="h-5 w-5" />,
      items: [
        { name: "Length Converter" }, { name: "Weight Converter" }, { name: "Temperature Converter" }, 
        { name: "Area Converter" }, { name: "Volume Converter" }, { name: "Speed Converter" }
      ]
    },
    {
      title: "Math & Number",
      href: "/math",
      icon: <Calculator className="h-5 w-5" />,
      items: [
        { name: "Scientific Calculator" }, { name: "Percentage Calculator" }, { name: "Algebra Solver" }, 
        { name: "Geometry Calculator" }, { name: "Random Number" }, { name: "Prime Checker" }
      ]
    },
    {
      title: "Daily Life Tools",
      href: "/other",
      icon: <Calendar className="h-5 w-5" />,
      items: [
        { name: "Age Calculator" }, { name: "Date Calculator" }, { name: "Time Calculator" }, 
        { name: "Tip Calculator" }, { name: "Age Gap Calculator" }, { name: "Days Between Dates" }
      ]
    },
    {
      title: "SEO & Text Tools",
      href: "/seo-tools",
      icon: <Type className="h-5 w-5" />,
      items: [
        { name: "Word Counter" }, { name: "Character Counter" }, { name: "Password Generator" }, 
        { name: "Case Converter" }, { name: "QR Code Generator" }, { name: "Text Repeater" }
      ]
    }
  ];

  // All 240+ calculators for search
  const allTools = getAllTools();

  const filteredTools = search 
    ? allTools.filter(t => t.name.toLowerCase().includes(search.toLowerCase())).slice(0, 8)
    : [];

  return (
    <Layout>
      <div className="space-y-10">
        
        {/* Hero Section with Search */}
        <section className="relative text-center space-y-6 py-10 bg-slate-50 dark:bg-slate-900 rounded-3xl border shadow-sm">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none rounded-3xl"></div>
          <div className="relative z-10 max-w-3xl mx-auto px-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" /> 50+ Free Online Tools Added
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              Calculate Anything, <span className="text-primary">Instantly.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your all-in-one destination for financial, health, math, and daily utility calculators. Fast, free, and easy to use.
            </p>
            
            <div className="relative max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex items-center bg-background shadow-xl rounded-full border border-slate-200 dark:border-slate-800 p-2 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                  <Search className="ml-4 h-6 w-6 text-muted-foreground" aria-hidden="true" />
                  <Input 
                    ref={searchRef}
                    className="flex-1 border-0 shadow-none focus-visible:ring-0 bg-transparent h-12 text-lg px-4 placeholder:text-muted-foreground/70 relative z-10 text-foreground" 
                    placeholder="What would you like to calculate today?" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    aria-label="Search for a calculator"
                  />
                  <Button size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90 hidden sm:flex" onClick={handleSearchSubmit}>
                    Search
                  </Button>
                </div>
              </div>
              
              {/* Popular Tags */}
              <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
                <span>Try:</span>
                {['BMI', 'Mortgage', 'Age', 'Percentage', 'Loan'].map(term => (
                  <button 
                    key={term}
                    onClick={() => setSearch(term)}
                    className="hover:text-primary underline decoration-dotted underline-offset-4 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
              
              {/* Search Results Dropdown */}
              {search && (
                <div className="absolute top-full left-0 right-0 mt-4 bg-background/95 backdrop-blur-sm rounded-2xl border shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                  {filteredTools.length > 0 ? (
                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                      {filteredTools.map((tool) => (
                        <div 
                          key={tool.name} 
                          className="p-4 hover:bg-primary/5 cursor-pointer text-left flex items-center justify-between group transition-colors"
                          onClick={() => setLocation(tool.href)}
                        >
                          <div className="flex items-center gap-4">
                            <div className="bg-primary/10 p-2 rounded-lg text-primary">
                              <Search className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-semibold text-foreground">{tool.name}</p>
                              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{tool.category}</p>
                            </div>
                          </div>
                          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-muted-foreground">
                      <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No calculators found matching "{search}"</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="grid gap-8 md:grid-cols-12">
          {/* Main Left Column */}
          <div className="md:col-span-8 space-y-10">
            
            {/* Standard Calculator - Prominent */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <Calculator className="h-6 w-6 text-primary" />
                  Standard Calculator
                </h2>
              </div>
              <Suspense fallback={
                <div className="h-[400px] flex items-center justify-center bg-slate-50 dark:bg-slate-900/50 rounded-xl border">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              }>
                <StandardCalculator />
              </Suspense>
            </section>

             {/* Featured Calculator - BMI */}
             <section>
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Heart className="h-6 w-6 text-rose-500" />
                Featured: BMI Calculator
              </h2>
              <div className="max-w-2xl">
                <Suspense fallback={
                  <div className="h-[300px] flex items-center justify-center bg-slate-50 dark:bg-slate-900/50 rounded-xl border">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                }>
                  <BMICalculator />
                </Suspense>
              </div>
            </section>

            {/* All Categories with Links */}
            <div className="grid gap-6 sm:grid-cols-2">
              {featuredCategories.map((cat) => (
                <Link key={cat.title} href={cat.href} className="block h-full group">
                  <Card className="h-full transition-all hover:shadow-md hover:border-primary/50 cursor-pointer">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-3 text-lg group-hover:text-primary transition-colors">
                        <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          {cat.icon}
                        </div>
                        {cat.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {cat.items.slice(0, 5).map((item) => {
                          const itemName = typeof item === 'string' ? item : item.name;
                          return (
                            <li key={itemName} className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2">
                              <span className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-primary" />
                              {itemName}
                            </li>
                          );
                        })}
                        {cat.items.length > 5 && (
                          <li className="text-xs font-medium text-primary pt-1">
                            + {cat.items.length - 5} more tools
                          </li>
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* SEO Content Block */}
            <section className="prose dark:prose-invert max-w-none bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-800">
              <h2>About CalcSmart24</h2>
              <p>
                CalcSmart24 is your one-stop destination for online calculations. We understand that not everyone loves math, 
                which is why we've built intuitive tools to handle the numbers for you.
              </p>
              <div className="grid sm:grid-cols-2 gap-8 mt-4 not-prose">
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">Accuracy You Can Trust</h3>
                  <p className="text-sm text-muted-foreground">
                    Our calculators are rigorously tested to ensure precise results for financial planning, scientific research, and health monitoring.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">Free Forever</h3>
                  <p className="text-sm text-muted-foreground">
                    No subscriptions, no hidden fees. Access all our premium calculator tools completely free of charge, 24/7.
                  </p>
                </div>
              </div>
            </section>

          </div>

          {/* Sidebar Right Column */}
          <div className="md:col-span-4 space-y-8">
            
            {/* Popular Now */}
            <Card className="border-l-4 border-l-green-500 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Popular Now
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {[
                    { name: "Percentage Calculator", link: "/calculator/percentage-calculator" },
                    { name: "Age Calculator", link: "/calculator/age-calculator" },
                    { name: "BMI Calculator", link: "/calculator/bmi-calculator" },
                    { name: "Loan EMI Calculator", link: "/calculator/loan-emi-calculator" },
                    { name: "Word Counter", link: "/calculator/word-counter" },
                    { name: "Scientific Calculator", link: "/calculator/scientific-calculator" }
                  ].map((item, i) => (
                    <Link key={item.name} href={item.link} className="block px-6 py-3.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors flex items-center justify-between group">
                      <span className="flex items-center gap-3">
                        <span className="text-xs font-mono text-muted-foreground w-4">{i+1}</span>
                        {item.name}
                      </span>
                      <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all" />
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Tools */}
            <Card className="bg-slate-900 text-slate-50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-slate-50 flex items-center gap-2">
                  <RefreshCcw className="h-4 w-4" /> Quick Convert
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Length (m to ft)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="number" placeholder="Meters" className="bg-slate-800 border-slate-700 rounded px-3 py-2 text-sm w-full" />
                    <input type="number" placeholder="Feet" className="bg-slate-800 border-slate-700 rounded px-3 py-2 text-sm w-full" readOnly />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Temp (°C to °F)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="number" placeholder="°C" className="bg-slate-800 border-slate-700 rounded px-3 py-2 text-sm w-full" />
                    <input type="number" placeholder="°F" className="bg-slate-800 border-slate-700 rounded px-3 py-2 text-sm w-full" readOnly />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <Button variant="secondary" className="w-full hover:bg-slate-200 transition-colors" asChild>
                    <Link href="/convert">400+ Unit Converters</Link>
                  </Button>
                  <Button variant="ghost" className="w-full text-slate-400 hover:text-slate-200 text-xs" asChild>
                    <Link href="/converters">General Converters</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* Full Tools Sitemap / Footer Section */}
        <section className="mt-12 pt-12 border-t border-border">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
             <div className="h-2 w-2 rounded-full bg-primary"></div>
             All Calculators & Tools
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
            {calculatorCategories.map((cat) => (
              <div key={cat.title} className="space-y-4">
                <Link href={`/${cat.slug}`} className="block group">
                  <h3 className="font-semibold text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
                    {/* We can use the icon component if we want, but let's keep it simple text for footer */}
                    {cat.title}
                    <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </h3>
                </Link>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {cat.items.map((item) => {
                    const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                    return (
                      <li key={item.name}>
                        <Link href={`/calculator/${slug}`} className="hover:text-primary hover:underline block py-0.5">
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                  {/* Manually adding Currency Converter to Financial category if it's missing in the main loop */}
                  {cat.title === "Financial" && !cat.items.some(i => i.name === "Currency Converter") && (
                    <li>
                      <Link href="/calculator/currency-converter" className="hover:text-primary hover:underline block py-0.5">
                        Currency Converter
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}