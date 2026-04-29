import { Link, useLocation } from "wouter";
import { Calculator, Search, Menu, ChevronDown } from "lucide-react";
import { useState, KeyboardEvent, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { calculatorCategories } from "@/lib/calculator-data";

const NAV_PRIMARY = [
  { id: "home",         name: "Home",           href: "/" },
  { id: "financial",    name: "Financial",       href: "/financial" },
  { id: "business",     name: "Business",        href: "/business" },
  { id: "health",       name: "Fitness & Health",href: "/health" },
  { id: "math",         name: "Math",            href: "/math" },
  { id: "construction", name: "Construction",    href: "/construction" },
];

const NAV_MORE = [
  { id: "unit-converters", name: "Unit Converters",  href: "/convert" },
  { id: "seo-tools",       name: "SEO & Text Tools", href: "/seo-tools" },
  { id: "daily-life",      name: "Daily Life",        href: "/other" },
  { id: "astrology",       name: "Astrology",         href: "/astrology" },
  { id: "blog",            name: "Blog",              href: "/blog" },
];

const ALL_NAV = [...NAV_PRIMARY, ...NAV_MORE];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [headerSearch, setHeaderSearch] = useState("");
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  const handleHeaderSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const trimmed = headerSearch.trim();
      if (trimmed) setLocation(`/?search=${encodeURIComponent(trimmed)}`);
      setHeaderSearch("");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setMoreOpen(false); };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc as unknown as EventListener);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc as unknown as EventListener);
    };
  }, []);

  const isMoreActive = NAV_MORE.some(link => location === link.href || location.startsWith(link.href + "/"));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Skip to main content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>

      <header role="banner" className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary hover:opacity-90 transition-opacity shrink-0">
            <img src="/logo.png" alt="CalcSmart24 Logo" width="32" height="32" className="h-8 w-8 rounded-lg object-contain" />
            <span className="hidden sm:inline">CalcSmart24</span>
          </Link>

          {/* Desktop primary nav */}
          <nav
            role="navigation"
            aria-label="Main navigation"
            className="hidden lg:flex items-center gap-1 text-sm font-medium text-muted-foreground flex-1 min-w-0"
          >
            {NAV_PRIMARY.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors hover:text-foreground hover:bg-muted/60 ${
                  location === link.href ? "text-foreground font-semibold bg-muted/60" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* "More" dropdown */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreOpen(v => !v)}
                aria-expanded={moreOpen}
                aria-haspopup="true"
                aria-label="More categories"
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md whitespace-nowrap transition-colors hover:text-foreground hover:bg-muted/60 ${
                  isMoreActive ? "text-foreground font-semibold bg-muted/60" : ""
                }`}
              >
                More
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`} />
              </button>

              {moreOpen && (
                <div
                  className="absolute top-full left-0 mt-1.5 w-52 rounded-xl border bg-background shadow-lg z-[100] py-1 overflow-hidden"
                  role="menu"
                >
                  {NAV_MORE.map((link) => (
                    <Link
                      key={link.id}
                      href={link.href}
                      role="menuitem"
                      onClick={() => setMoreOpen(false)}
                      className={`block px-4 py-2.5 text-sm transition-colors hover:bg-muted hover:text-foreground ${
                        location === link.href ? "text-primary font-medium bg-primary/5" : "text-muted-foreground"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Desktop search */}
          <div className="hidden lg:flex relative items-center shrink-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
            <Input
              type="search"
              placeholder="Search calculators..."
              className="w-44 xl:w-60 pl-9 h-9 bg-muted/50 border-transparent focus:bg-background focus:border-input transition-all"
              aria-label="Search calculators"
              value={headerSearch}
              onChange={(e) => setHeaderSearch(e.target.value)}
              onKeyDown={handleHeaderSearchKeyDown}
            />
          </div>

          {/* Mobile: hamburger */}
          <div className="flex items-center gap-2 ml-auto lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[360px] flex flex-col">
                <div className="mt-4 mb-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    <Input
                      type="search"
                      placeholder="Search calculators..."
                      className="pl-9 h-9"
                      aria-label="Search calculators"
                      value={headerSearch}
                      onChange={(e) => setHeaderSearch(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const trimmed = headerSearch.trim();
                          if (trimmed) { setLocation(`/?search=${encodeURIComponent(trimmed)}`); setIsMobileMenuOpen(false); }
                          setHeaderSearch("");
                        }
                      }}
                    />
                  </div>
                </div>
                <nav className="flex flex-col mt-2 flex-1 overflow-y-auto" aria-label="Mobile navigation">
                  {ALL_NAV.map((link) => (
                    <Link
                      key={link.id}
                      href={link.href}
                      className={`text-base font-medium py-3 px-2 border-b border-border/50 min-h-[48px] flex items-center transition-colors hover:text-primary ${
                        location === link.href ? "text-primary" : "text-foreground"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main id="main-content" role="main" className="flex-1 container mx-auto px-4 py-6 md:py-10">
        {children}
      </main>

      <footer role="contentinfo" className="border-t py-12 md:py-16 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          {/* Category columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
            {calculatorCategories.map((cat) => (
              <div key={cat.title}>
                <h3 className="font-semibold mb-4 text-foreground">{cat.title}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {cat.items.slice(0, 6).map((item) => {
                    const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                    return (
                      <li key={item.name}>
                        <Link href={`/calculator/${slug}`} className="hover:text-primary transition-colors block py-1">
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                  <li>
                    <Link href={`/${cat.slug}`} className="text-primary hover:underline text-xs font-medium block py-1 mt-2">
                      Browse All {cat.title} →
                    </Link>
                  </li>
                </ul>
              </div>
            ))}
          </div>

          {/* Footer bottom */}
          <div className="border-t border-border pt-8 space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary hover:opacity-90 transition-opacity">
                <img src="/logo.png" alt="CalcSmart24 Logo" width="32" height="32" className="h-7 w-7 rounded-lg object-contain" />
                <span>CalcSmart24</span>
              </Link>
              <nav aria-label="Footer navigation" className="flex flex-wrap gap-4 text-sm font-medium">
                <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link>
              </nav>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} CalcSmart24 — Free Online Calculators for Everyone. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
