import type { Language, TranslationModule, UITranslations } from "./types";
import en from "./en";
import es from "./es";
import ar from "./ar";
import hi from "./hi";
import fr from "./fr";
import pt from "./pt";

export type { Language, TranslationModule, UITranslations };
export { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, LANGUAGE_CODES, isValidLanguage, getLanguageConfig, getLanguageFromPath, buildLocalizedPath } from "./config";

const translations: Record<Language, TranslationModule> = { en, es, ar, hi, fr, pt };

export function getTranslations(lang: Language): TranslationModule {
  return translations[lang] || translations.en;
}

export function t(lang: Language, key: keyof UITranslations, params?: Record<string, string>): string {
  const tr = translations[lang]?.ui || translations.en.ui;
  let text = tr[key] || translations.en.ui[key] || key;
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      text = text.replace(`{${k}}`, v);
    });
  }
  return text;
}

export function getCalculatorName(lang: Language, slug: string, fallbackName: string): string {
  return translations[lang]?.calculatorNames[slug] || fallbackName;
}

export function getCalculatorDescription(lang: Language, slug: string, fallbackDesc: string): string {
  return translations[lang]?.calculatorDescriptions[slug] || fallbackDesc;
}

export function getCategoryDescription(lang: Language, categorySlug: string, fallbackDesc: string): string {
  return translations[lang]?.categoryDescriptions[categorySlug] || fallbackDesc;
}
