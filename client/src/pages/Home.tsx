import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "wouter";
import { useState, lazy, Suspense } from "react";
import { calculatorCategories } from "@/lib/calculator-data";
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
  const [search, setSearch] = useState("");
  const [, setLocation] = useLocation();

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

  // Flatten items for search
  const allTools = featuredCategories.flatMap(cat => cat.items.map(item => ({
    name: typeof item === 'string' ? item : item.name,
    category: cat.title,
    href: `/calculator/${(typeof item === 'string' ? item : item.name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`
  })));

  const filteredTools = search 
    ? allTools.filter(t => t.name.toLowerCase().includes(search.toLowerCase())).slice(0, 5)
    : [];

  return (
    <Layout>
      <div className="space-y-10">
        
        {/* Hero Section with Search */}
        <section className="relative text-center space-y-6 py-10 bg-slate-50 dark:bg-slate-900 rounded-3xl border shadow-sm overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
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
            
            <div className="relative max-w-lg mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  className="pl-10 h-12 text-lg bg-background shadow-sm rounded-xl border-slate-200" 
                  placeholder="Search for a calculator..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              
              {/* Search Results Dropdown */}
              {search && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-background rounded-xl border shadow-lg z-50 overflow-hidden">
                  {filteredTools.length > 0 ? (
                    <div className="divide-y">
                      {filteredTools.map((tool) => (
                        <div 
                          key={tool.name} 
                          className="p-3 hover:bg-muted cursor-pointer text-left flex items-center justify-between group"
                          onClick={() => setLocation(tool.href)}
                        >
                          <div>
                            <p className="font-medium text-foreground">{tool.name}</p>
                            <p className="text-xs text-muted-foreground">{tool.category}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-muted-foreground text-sm">No tools found.</div>
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
                <Button variant="secondary" className="w-full hover:bg-slate-200 transition-colors" asChild>
                  <Link href="/converters">View All Converters</Link>
                </Button>
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
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}