import type { Language, LanguageConfig } from "./types";

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  { code: "en", name: "English", nativeName: "English", dir: "ltr", flag: "🇺🇸" },
  { code: "es", name: "Spanish", nativeName: "Español", dir: "ltr", flag: "🇪🇸" },
  { code: "ar", name: "Arabic", nativeName: "العربية", dir: "rtl", flag: "🇸🇦" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", dir: "ltr", flag: "🇮🇳" },
  { code: "fr", name: "French", nativeName: "Français", dir: "ltr", flag: "🇫🇷" },
  { code: "pt", name: "Portuguese", nativeName: "Português", dir: "ltr", flag: "🇧🇷" },
];

export const DEFAULT_LANGUAGE: Language = "en";

export const LANGUAGE_CODES = SUPPORTED_LANGUAGES.map(l => l.code);

export function isValidLanguage(code: string): code is Language {
  return LANGUAGE_CODES.includes(code as Language);
}

export function getLanguageConfig(code: Language): LanguageConfig {
  return SUPPORTED_LANGUAGES.find(l => l.code === code) || SUPPORTED_LANGUAGES[0];
}

export function getLanguageFromPath(path: string): { lang: Language; restPath: string } {
  const segments = path.split("/").filter(Boolean);
  if (segments.length > 0 && isValidLanguage(segments[0])) {
    return { lang: segments[0] as Language, restPath: "/" + segments.slice(1).join("/") };
  }
  return { lang: DEFAULT_LANGUAGE, restPath: path };
}

export function buildLocalizedPath(path: string, lang: Language): string {
  if (lang === DEFAULT_LANGUAGE) return path;
  return `/${lang}${path}`;
}
