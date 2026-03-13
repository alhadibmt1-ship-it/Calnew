import { Link } from "wouter";
import { Clock, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTools } from "@/lib/calculator-data";

const STORAGE_KEY = "calcsmart24_recently_used";
const MAX_RECENT = 8;

export function trackCalculatorUsage(slug: string) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    let recent: string[] = stored ? JSON.parse(stored) : [];
    recent = [slug, ...recent.filter(s => s !== slug)].slice(0, MAX_RECENT);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recent));
  } catch {}
}

function getRecentlyUsed(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

const RELATED_MAP: Record<string, string[]> = {
  "financial": ["loan-emi-calculator", "mortgage-calculator", "compound-interest-calculator", "investment-calculator", "retirement-calculator", "tax-calculator", "salary-calculator"],
  "health": ["bmi-calculator", "calorie-calculator", "bmr-calculator", "tdee-calculator", "ideal-weight-calculator", "body-fat-calculator", "macro-calculator"],
  "math": ["standard-calculator", "scientific-calculator", "percentage-calculator", "fraction-calculator", "geometry-calculator", "algebra-solver"],
  "business": ["profit-margin-calculator", "markup-calculator", "break-even-calculator", "roi-calculator", "invoice-calculator", "revenue-calculator"],
  "construction": ["concrete-calculator", "cement-calculator", "brick-calculator", "steel-weight-calculator", "tile-calculator", "paint-calculator"],
};

function getRecommendations(currentSlug: string, recentSlugs: string[]): { name: string; slug: string; href: string }[] {
  const allTools = getAllTools();
  const currentTool = allTools.find(t => t.slug === currentSlug);
  const catSlug = currentTool?.categorySlug || "";

  const relatedSlugs = RELATED_MAP[catSlug] || [];
  const candidates = allTools.filter(t =>
    t.slug !== currentSlug &&
    !recentSlugs.includes(t.slug) &&
    (t.categorySlug === catSlug || relatedSlugs.includes(t.slug))
  ).slice(0, 6);

  return candidates.map(t => ({ name: t.name, slug: t.slug, href: t.href }));
}

export default function RecentlyUsedSidebar({ currentSlug }: { currentSlug: string }) {
  const recentSlugs = getRecentlyUsed().filter(s => s !== currentSlug);
  const allTools = getAllTools();
  const recentTools = recentSlugs
    .map(slug => allTools.find(t => t.slug === slug))
    .filter(Boolean)
    .slice(0, 5);

  const recommendations = getRecommendations(currentSlug, recentSlugs);

  if (recentTools.length === 0 && recommendations.length === 0) return null;

  return (
    <div className="space-y-4" data-testid="recently-used-sidebar">
      {recentTools.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Recently Used
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-1">
            {recentTools.map(tool => tool && (
              <Link key={tool.slug} href={tool.href} className="flex items-center gap-2 py-2 px-2 rounded-md text-sm hover:bg-muted transition-colors group">
                <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="truncate">{tool.name}</span>
              </Link>
            ))}
          </CardContent>
        </Card>
      )}

      {recommendations.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Recommended
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-1">
            {recommendations.map(tool => (
              <Link key={tool.slug} href={tool.href} className="flex items-center gap-2 py-2 px-2 rounded-md text-sm hover:bg-muted transition-colors group">
                <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="truncate">{tool.name}</span>
              </Link>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
