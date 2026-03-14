import { useLanguage } from "@/contexts/LanguageContext";
import { SUPPORTED_LANGUAGES } from "@/lib/i18n/config";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocation } from "wouter";
import { buildLocalizedPath, getLanguageFromPath, DEFAULT_LANGUAGE } from "@/lib/i18n/config";
import type { Language } from "@/lib/i18n/types";

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage();
  const [location, setLocation] = useLocation();

  const handleLanguageChange = (newLang: Language) => {
    const { restPath } = getLanguageFromPath(location);
    setLang(newLang);
    const newPath = buildLocalizedPath(restPath || "/", newLang);
    setLocation(newPath);
  };

  const currentLangConfig = SUPPORTED_LANGUAGES.find(l => l.code === lang);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground" data-testid="language-switcher">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline text-xs">{currentLangConfig?.nativeName || "English"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {SUPPORTED_LANGUAGES.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`cursor-pointer gap-2 ${lang === language.code ? "bg-accent font-semibold" : ""}`}
            data-testid={`lang-option-${language.code}`}
          >
            <span>{language.flag}</span>
            <span>{language.nativeName}</span>
            {language.code !== "en" && (
              <span className="text-xs text-muted-foreground ml-auto">{language.name}</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
