import { Link, useLocation } from "wouter";
import { Calculator, Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { calculatorCategories } from "@/lib/calculator-data";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { buildLocalizedPath } from "@/lib/i18n/config";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, t, dir } = useLanguage();

  const lp = (path: string) => buildLocalizedPath(path, lang);

  const navLinks = [
    { id: "home", name: t("home"), href: lp("/") },
    { id: "financial", name: t("financial"), href: lp("/financial") },
    { id: "health", name: t("health"), href: lp("/health") },
    { id: "math", name: t("math"), href: lp("/math") },
    { id: "converters", name: t("converters"), href: lp("/converters") },
    { id: "unit-converters", name: t("unitConverters"), href: lp("/convert") },
    { id: "seo-tools", name: t("seoTools"), href: lp("/seo-tools") },
    { id: "daily-life", name: t("dailyLife"), href: lp("/other") },
    { id: "blog", name: t("blog"), href: lp("/blog") },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background" dir={dir}>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-6">
            <Link href={lp("/")} className="flex items-center gap-2 font-bold text-xl text-primary hover:opacity-90 transition-opacity">
              <img src="/logo.png" alt="CalcSmart24 Logo" className="h-8 w-8 rounded-lg object-contain" />
              <span>CalcSmart24</span>
            </Link>

            <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm font-medium text-muted-foreground">
              {navLinks.map((link) => (
                <Link 
                  key={link.id} 
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

          <div className="flex items-center gap-2">
            <div className="hidden md:flex relative w-full max-w-sm items-center">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <Input
                type="search"
                placeholder={t("searchPlaceholder")}
                className="w-32 lg:w-64 pl-9 h-9 bg-muted/50 border-transparent focus:bg-background focus:border-input transition-all"
                aria-label={t("searchPlaceholder")}
              />
            </div>

            <LanguageSwitcher />

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side={dir === "rtl" ? "left" : "right"} className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.id} 
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

      <main className="flex-1 container mx-auto px-4 py-6 md:py-10">
        {children}
      </main>

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
                        <Link href={lp(`/calculator/${slug}`)} className="hover:text-primary transition-colors block py-1">
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                  <li>
                    <Link href={lp(`/${cat.slug}`)} className="text-primary hover:underline text-xs font-medium block py-1 mt-2">
                      {t("browseAll")} {cat.title} →
                    </Link>
                  </li>
                </ul>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-border">
            <div>
              <Link href={lp("/")} className="flex items-center gap-2 font-bold text-2xl text-primary mb-4 hover:opacity-90 transition-opacity">
                <img src="/logo.png" alt="CalcSmart24 Logo" className="h-8 w-8 rounded-lg object-contain" />
                <span>CalcSmart24</span>
              </Link>
              <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
                {t("siteDescription")}
              </p>
            </div>
            <div className="flex flex-col md:items-end justify-center">
              <div className="flex flex-wrap gap-4 md:gap-6 text-sm font-medium">
                <Link href={lp("/privacy-policy")} className="hover:text-primary transition-colors">{t("privacy")}</Link>
                <Link href={lp("/terms")} className="hover:text-primary transition-colors">{t("terms")}</Link>
                <Link href={lp("/about")} className="hover:text-primary transition-colors">{t("about")}</Link>
                <Link href={lp("/contact")} className="hover:text-primary transition-colors">{t("contact")}</Link>
                <Link href={lp("/blog")} className="hover:text-primary transition-colors">{t("blog")}</Link>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>&copy; 2025 CalcSmart24. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href={lp("/privacy-policy")} className="hover:text-foreground">{t("privacy")}</Link>
              <Link href={lp("/terms")} className="hover:text-foreground">{t("terms")}</Link>
              <Link href={lp("/about")} className="hover:text-foreground">{t("about")}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
