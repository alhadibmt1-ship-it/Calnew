import { Link, useLocation } from "wouter";
import { Calculator, Search, Menu, X, Github } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { calculatorCategories } from "@/lib/calculator-data";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Financial", href: "/financial" },
    { name: "Fitness & Health", href: "/health" },
    { name: "Math", href: "/math" },
    { name: "Converters", href: "/converters" },
    { name: "Unit Converters", href: "/convert" },
    { name: "SEO & Text", href: "/seo-tools" },
    { name: "Daily Life", href: "/other" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary hover:opacity-90 transition-opacity">
              <img src="/logo.png" alt="CalcSmart24 Logo" className="h-8 w-8 rounded-lg object-contain" />
              <span>CalcSmart24</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm font-medium text-muted-foreground">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`transition-colors hover:text-foreground ${
                    location === link.href ? "text-foreground font-semibold" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Search - Visual only for now */}
            <div className="hidden md:flex relative w-full max-w-sm items-center">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <Input
                type="search"
                placeholder="Search calculators..."
                className="w-32 lg:w-64 pl-9 h-9 bg-muted/50 border-transparent focus:bg-background focus:border-input transition-all"
                aria-label="Search calculators"
              />
            </div>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.name} 
                      href={link.href}
                      className={`text-lg font-medium py-2 ${
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

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 md:py-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t py-12 md:py-16 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
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
                      View all {cat.title} →
                    </Link>
                  </li>
                </ul>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-border">
            <div>
              <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-primary mb-4 hover:opacity-90 transition-opacity">
                <img src="/logo.png" alt="CalcSmart24 Logo" className="h-8 w-8 rounded-lg object-contain" />
                <span>CalcSmart24</span>
              </Link>
              <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
                Your ultimate destination for free online calculators. We provide accurate, fast, and easy-to-use tools for finance, health, math, and daily life.
              </p>
            </div>
            <div className="flex flex-col md:items-end justify-center">
              <div className="flex flex-wrap gap-4 md:gap-6 text-sm font-medium">
                <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
                <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>&copy; 2025 CalcSmart24. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy-policy" className="hover:text-foreground">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-foreground">Terms of Use</Link>
              <Link href="/about" className="hover:text-foreground">About Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}