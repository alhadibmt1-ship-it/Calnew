import { Link, useLocation } from "wouter";
import { Calculator, Search, Menu, X, Github } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Financial", href: "/financial" },
    { name: "Fitness & Health", href: "/health" },
    { name: "Math", href: "/math" },
    { name: "Converters", href: "/converters" },
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
      <footer className="border-t py-8 md:py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Financial</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/calculator/mortgage-calculator" className="hover:text-foreground">Mortgage Calculator</Link></li>
                <li><Link href="/calculator/loan-calculator" className="hover:text-foreground">Loan Calculator</Link></li>
                <li><Link href="/calculator/gst-vat-calculator" className="hover:text-foreground">GST/VAT Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Fitness & Health</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/calculator/bmi-calculator" className="hover:text-foreground">BMI Calculator</Link></li>
                <li><Link href="/calculator/calorie-calculator" className="hover:text-foreground">Calorie Calculator</Link></li>
                <li><Link href="/calculator/body-fat-calculator" className="hover:text-foreground">Body Fat Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Tools</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/converters" className="hover:text-foreground">Unit Converters</Link></li>
                <li><Link href="/calculator/password-generator" className="hover:text-foreground">Password Generator</Link></li>
                <li><Link href="/calculator/word-counter" className="hover:text-foreground">Word Counter</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Daily Life</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/calculator/age-calculator" className="hover:text-foreground">Age Calculator</Link></li>
                <li><Link href="/calculator/date-calculator" className="hover:text-foreground">Date Calculator</Link></li>
                <li><Link href="/calculator/tip-calculator" className="hover:text-foreground">Tip Calculator</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
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