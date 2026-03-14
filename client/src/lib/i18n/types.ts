export type Language = "en" | "es" | "ar" | "hi" | "fr" | "pt";

export interface LanguageConfig {
  code: Language;
  name: string;
  nativeName: string;
  dir: "ltr" | "rtl";
  flag: string;
}

export interface UITranslations {
  siteTitle: string;
  siteDescription: string;
  home: string;
  allCalculators: string;
  categories: string;
  financial: string;
  business: string;
  health: string;
  math: string;
  education: string;
  dailyLife: string;
  seoTools: string;
  converters: string;
  construction: string;
  calculate: string;
  clear: string;
  reset: string;
  result: string;
  results: string;
  formula: string;
  example: string;
  howToUse: string;
  whatIs: string;
  howFormulaWorks: string;
  exampleCalculation: string;
  relatedCalculators: string;
  popularCalculators: string;
  faq: string;
  readMore: string;
  blog: string;
  about: string;
  contact: string;
  privacy: string;
  terms: string;
  searchPlaceholder: string;
  freeOnlineCalculators: string;
  quickAccurate: string;
  language: string;
  unitConverters: string;
  browseAll: string;
  copyResult: string;
  share: string;
  whyUseCalcSmart: string;
  free: string;
  fast: string;
  private: string;
  mobileFriendly: string;
  enterValues: string;
  getResults: string;
}

export interface TranslationModule {
  ui: UITranslations;
  calculatorNames: Record<string, string>;
  calculatorDescriptions: Record<string, string>;
  categoryDescriptions: Record<string, string>;
}
