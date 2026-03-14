export interface InternalLink {
  name: string;
  slug: string;
  href: string;
}

const relatedMap: Record<string, string[]> = {
  "bmi-calculator": ["calorie-calculator", "bmr-calculator", "body-fat-calculator", "ideal-weight-calculator", "tdee-calculator", "water-intake-calculator"],
  "calorie-calculator": ["bmi-calculator", "bmr-calculator", "tdee-calculator", "macro-calculator", "ideal-weight-calculator", "water-intake-calculator"],
  "bmr-calculator": ["calorie-calculator", "tdee-calculator", "bmi-calculator", "macro-calculator", "body-fat-calculator", "ideal-weight-calculator"],
  "tdee-calculator": ["calorie-calculator", "bmr-calculator", "macro-calculator", "bmi-calculator", "body-fat-calculator", "pace-calculator"],
  "body-fat-calculator": ["bmi-calculator", "ideal-weight-calculator", "bmr-calculator", "tdee-calculator", "calorie-calculator", "water-intake-calculator"],
  "ideal-weight-calculator": ["bmi-calculator", "body-fat-calculator", "calorie-calculator", "bmr-calculator", "tdee-calculator", "water-intake-calculator"],
  "macro-calculator": ["calorie-calculator", "tdee-calculator", "bmr-calculator", "bmi-calculator", "body-fat-calculator", "water-intake-calculator"],
  "water-intake-calculator": ["calorie-calculator", "bmi-calculator", "tdee-calculator", "bmr-calculator", "macro-calculator", "sleep-calculator"],
  "pace-calculator": ["calorie-calculator", "tdee-calculator", "bmi-calculator", "bmr-calculator", "sleep-calculator", "water-intake-calculator"],
  "sleep-calculator": ["calorie-calculator", "bmr-calculator", "water-intake-calculator", "tdee-calculator", "bmi-calculator", "age-calculator"],
  "pregnancy-calculator": ["due-date-calculator", "ovulation-calculator", "bmi-calculator", "calorie-calculator", "age-calculator", "water-intake-calculator"],
  "due-date-calculator": ["pregnancy-calculator", "ovulation-calculator", "age-calculator", "bmi-calculator", "calorie-calculator", "date-calculator"],
  "ovulation-calculator": ["pregnancy-calculator", "due-date-calculator", "age-calculator", "bmi-calculator", "date-calculator", "calorie-calculator"],

  "mortgage-calculator": ["house-affordability-calculator", "amortization-calculator", "loan-emi-calculator", "auto-loan-calculator", "compound-interest-calculator", "salary-calculator"],
  "loan-emi-calculator": ["mortgage-calculator", "auto-loan-calculator", "amortization-calculator", "simple-interest-calculator", "compound-interest-calculator", "interest-rate-calculator"],
  "auto-loan-calculator": ["loan-emi-calculator", "mortgage-calculator", "amortization-calculator", "interest-rate-calculator", "compound-interest-calculator", "salary-calculator"],
  "simple-interest-calculator": ["compound-interest-calculator", "interest-rate-calculator", "loan-emi-calculator", "investment-calculator", "mortgage-calculator", "roi-calculator"],
  "compound-interest-calculator": ["simple-interest-calculator", "investment-calculator", "interest-rate-calculator", "retirement-calculator", "loan-emi-calculator", "roi-calculator"],
  "amortization-calculator": ["mortgage-calculator", "loan-emi-calculator", "auto-loan-calculator", "interest-rate-calculator", "compound-interest-calculator", "house-affordability-calculator"],
  "interest-rate-calculator": ["compound-interest-calculator", "simple-interest-calculator", "loan-emi-calculator", "investment-calculator", "mortgage-calculator", "inflation-calculator"],
  "investment-calculator": ["compound-interest-calculator", "retirement-calculator", "roi-calculator", "interest-rate-calculator", "inflation-calculator", "stock-profit-loss-calculator"],
  "retirement-calculator": ["investment-calculator", "compound-interest-calculator", "inflation-calculator", "salary-calculator", "roi-calculator", "interest-rate-calculator"],
  "inflation-calculator": ["compound-interest-calculator", "investment-calculator", "retirement-calculator", "salary-calculator", "interest-rate-calculator", "roi-calculator"],
  "tax-calculator": ["salary-calculator", "sales-tax-calculator", "gst-vat-calculator", "discount-calculator", "tip-calculator", "inflation-calculator"],
  "sales-tax-calculator": ["tax-calculator", "gst-vat-calculator", "discount-calculator", "tip-calculator", "salary-calculator", "percentage-calculator"],
  "gst-vat-calculator": ["sales-tax-calculator", "tax-calculator", "discount-calculator", "percentage-calculator", "tip-calculator", "profit-margin-calculator"],
  "salary-calculator": ["tax-calculator", "retirement-calculator", "inflation-calculator", "loan-emi-calculator", "mortgage-calculator", "house-affordability-calculator"],
  "discount-calculator": ["percentage-calculator", "sales-tax-calculator", "tip-calculator", "gst-vat-calculator", "profit-margin-calculator", "markup-calculator"],
  "house-affordability-calculator": ["mortgage-calculator", "amortization-calculator", "salary-calculator", "loan-emi-calculator", "tax-calculator", "auto-loan-calculator"],
  "stock-profit-loss-calculator": ["roi-calculator", "investment-calculator", "compound-interest-calculator", "profit-margin-calculator", "percentage-calculator", "break-even-calculator"],
  "debt-to-income-calculator": ["mortgage-calculator", "loan-emi-calculator", "salary-calculator", "house-affordability-calculator", "auto-loan-calculator", "tax-calculator"],

  "profit-margin-calculator": ["markup-calculator", "break-even-calculator", "roi-calculator", "discount-calculator", "percentage-calculator", "gst-vat-calculator"],
  "markup-calculator": ["profit-margin-calculator", "discount-calculator", "break-even-calculator", "percentage-calculator", "gst-vat-calculator", "roi-calculator"],
  "break-even-calculator": ["profit-margin-calculator", "markup-calculator", "roi-calculator", "percentage-calculator", "discount-calculator", "investment-calculator"],
  "roi-calculator": ["investment-calculator", "compound-interest-calculator", "profit-margin-calculator", "stock-profit-loss-calculator", "break-even-calculator", "retirement-calculator"],
  "tip-calculator": ["discount-calculator", "percentage-calculator", "sales-tax-calculator", "gst-vat-calculator", "standard-calculator", "salary-calculator"],

  "percentage-calculator": ["discount-calculator", "tip-calculator", "profit-margin-calculator", "sales-tax-calculator", "fraction-calculator", "roi-calculator"],
  "fraction-calculator": ["percentage-calculator", "scientific-calculator", "standard-calculator", "gpa-calculator", "square-footage-calculator", "discount-calculator"],
  "scientific-calculator": ["standard-calculator", "fraction-calculator", "percentage-calculator", "square-footage-calculator", "gpa-calculator", "compound-interest-calculator"],
  "standard-calculator": ["scientific-calculator", "percentage-calculator", "fraction-calculator", "tip-calculator", "discount-calculator", "square-footage-calculator"],
  "gpa-calculator": ["percentage-calculator", "fraction-calculator", "scientific-calculator", "standard-calculator", "age-calculator", "date-calculator"],
  "age-calculator": ["date-calculator", "due-date-calculator", "pregnancy-calculator", "bmi-calculator", "gpa-calculator", "retirement-calculator"],
  "date-calculator": ["age-calculator", "due-date-calculator", "pregnancy-calculator", "ovulation-calculator", "sleep-calculator", "retirement-calculator"],
  "square-footage-calculator": ["concrete-calculator", "tile-calculator", "paint-calculator", "brick-calculator", "rebar-weight-calculator", "cement-calculator"],

  "concrete-calculator": ["cement-calculator", "rebar-weight-calculator", "square-footage-calculator", "brick-calculator", "tile-calculator", "paint-calculator"],
  "cement-calculator": ["concrete-calculator", "rebar-weight-calculator", "square-footage-calculator", "brick-calculator", "tile-calculator", "paint-calculator"],
  "rebar-weight-calculator": ["concrete-calculator", "cement-calculator", "square-footage-calculator", "brick-calculator", "tile-calculator", "paint-calculator"],
  "brick-calculator": ["concrete-calculator", "cement-calculator", "tile-calculator", "square-footage-calculator", "paint-calculator", "rebar-weight-calculator"],
  "tile-calculator": ["square-footage-calculator", "paint-calculator", "brick-calculator", "concrete-calculator", "cement-calculator", "rebar-weight-calculator"],
  "paint-calculator": ["square-footage-calculator", "tile-calculator", "brick-calculator", "concrete-calculator", "cement-calculator", "rebar-weight-calculator"],

  "electricity-cost-calculator": ["fuel-cost-calculator", "salary-calculator", "discount-calculator", "percentage-calculator", "inflation-calculator", "tax-calculator"],
  "fuel-cost-calculator": ["electricity-cost-calculator", "auto-loan-calculator", "discount-calculator", "salary-calculator", "percentage-calculator", "inflation-calculator"],
};

export function getRelatedCalculators(slug: string): InternalLink[] {
  const related = relatedMap[slug];
  if (!related || related.length === 0) return [];
  return related.map(s => ({
    name: s.split("-").filter(w => w !== "calculator").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") + " Calculator",
    slug: s,
    href: `/calculator/${s}`,
  }));
}
