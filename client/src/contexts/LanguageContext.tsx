import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Language } from "@/lib/i18n/types";
import { DEFAULT_LANGUAGE, isValidLanguage, getLanguageConfig, getLanguageFromPath } from "@/lib/i18n/config";
import { t, getTranslations, getCalculatorName, getCalculatorDescription, getCategoryDescription } from "@/lib/i18n";
import type { UITranslations, TranslationModule } from "@/lib/i18n/types";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  dir: "ltr" | "rtl";
  t: (key: keyof UITranslations, params?: Record<string, string>) => string;
  getCalcName: (slug: string, fallback: string) => string;
  getCalcDesc: (slug: string, fallback: string) => string;
  getCatDesc: (catSlug: string, fallback: string) => string;
  translations: TranslationModule;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const STORAGE_KEY = "calcsmart24_lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const { lang: pathLang } = getLanguageFromPath(window.location.pathname);
      if (pathLang !== DEFAULT_LANGUAGE) return pathLang;
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && isValidLanguage(stored)) return stored as Language;
    }
    return DEFAULT_LANGUAGE;
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
    const config = getLanguageConfig(newLang);
    document.documentElement.dir = config.dir;
    document.documentElement.lang = newLang;
  };

  useEffect(() => {
    const config = getLanguageConfig(lang);
    document.documentElement.dir = config.dir;
    document.documentElement.lang = lang;
  }, [lang]);

  const value: LanguageContextType = {
    lang,
    setLang,
    dir: getLanguageConfig(lang).dir,
    t: (key, params) => t(lang, key, params),
    getCalcName: (slug, fallback) => getCalculatorName(lang, slug, fallback),
    getCalcDesc: (slug, fallback) => getCalculatorDescription(lang, slug, fallback),
    getCatDesc: (catSlug, fallback) => getCategoryDescription(lang, catSlug, fallback),
    translations: getTranslations(lang),
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
