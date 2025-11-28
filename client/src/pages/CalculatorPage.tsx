import Layout from "@/components/Layout";
import { useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Construction } from "lucide-react";
import { Link } from "wouter";
import BMICalculator from "@/components/BMICalculator";
import StandardCalculator from "@/components/StandardCalculator";
import ScientificCalculator from "@/components/ScientificCalculator";
import CaloriesCalculator from "@/components/CaloriesCalculator";
import AgeCalculator from "@/components/AgeCalculator";
import LoanCalculator from "@/components/LoanCalculator";
import PercentageCalculator from "@/components/PercentageCalculator";
import UnitConverter from "@/components/UnitConverter";
import InterestCalculator from "@/components/InterestCalculator";
import TipCalculator from "@/components/TipCalculator";
import WordCounter from "@/components/WordCounter";
import PasswordGenerator from "@/components/PasswordGenerator";
import DiscountCalculator from "@/components/DiscountCalculator";
import GSTCalculator from "@/components/GSTCalculator";
import DateCalculator from "@/components/DateCalculator";
import RandomGenerator from "@/components/RandomGenerator";
import CaseConverter from "@/components/CaseConverter";
import GeometryCalculator from "@/components/GeometryCalculator";
import AlgebraCalculator from "@/components/AlgebraCalculator";
import SalaryCalculator from "@/components/SalaryCalculator";
import ProfitMarginCalculator from "@/components/ProfitMarginCalculator";
import BMRCalculator from "@/components/BMRCalculator";
import BinaryConverter from "@/components/BinaryConverter";
import PrimeChecker from "@/components/PrimeChecker";
import IdealWeightCalculator from "@/components/IdealWeightCalculator";
import CurrencyConverter from "@/components/CurrencyConverter";
import SavingGoalCalculator from "@/components/SavingGoalCalculator";
import InvestmentCalculator from "@/components/InvestmentCalculator";
import RetirementCalculator from "@/components/RetirementCalculator";
import TaxCalculator from "@/components/TaxCalculator";
import ConcreteCalculator from "@/components/ConcreteCalculator";

export default function CalculatorPage() {
  const [match, params] = useRoute("/calculator/:slug");
  const slug = params?.slug || "";
  
  // Convert slug back to title (approximate)
  const title = slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Map slugs to actual components if they exist
  const renderCalculator = () => {
    switch (slug) {
      // Health
      case "bmi-calculator":
        return <BMICalculator />;
      case "calorie-calculator":
        return <CaloriesCalculator />;
      case "bmr-calculator":
        return <BMRCalculator />;
      case "ideal-weight-calculator":
        return <IdealWeightCalculator />;
      
      // Math
      case "standard-calculator":
        return <StandardCalculator />;
      case "scientific-calculator":
        return <ScientificCalculator />;
      case "percentage-calculator":
        return <PercentageCalculator />;
      case "random-number-generator":
      case "random-number":
        return <RandomGenerator />;
      case "geometry-calculator":
        return <GeometryCalculator />;
      case "algebra-solver":
      case "algebra-calculator":
        return <AlgebraCalculator />;
      case "binary-to-decimal":
      case "decimal-to-binary":
      case "number-base-converter":
        return <BinaryConverter />;
      case "prime-checker":
      case "prime-number-checker":
        return <PrimeChecker />;

      // Financial
      case "loan-emi-calculator":
      case "loan-calculator":
      case "mortgage-calculator": 
      case "auto-loan-calculator":
      case "amortization-calculator":
        return <LoanCalculator />;
      
      case "simple-interest-calculator":
      case "compound-interest-calculator":
      case "interest-calculator":
      case "compound-interest":
        return <InterestCalculator />;

      case "discount-calculator":
        return <DiscountCalculator />;
      case "gst-vat-calculator":
      case "gst-calculator":
      case "vat-calculator":
      case "gstvat-calculator":
        return <GSTCalculator />;
      case "salary-calculator":
      case "paycheck-calculator":
        return <SalaryCalculator />;
      case "profit-margin-calculator":
      case "margin-calculator":
      case "profit-margin":
        return <ProfitMarginCalculator />;
      case "currency-converter":
        return <CurrencyConverter />;
      case "saving-goal-calculator":
      case "savings-calculator":
        return <SavingGoalCalculator />;
      case "investment-calculator":
        return <InvestmentCalculator />;
      case "retirement-calculator":
        return <RetirementCalculator />;
      case "tax-calculator":
      case "income-tax-calculator":
        return <TaxCalculator />;

      // Daily Life
      case "age-calculator":
        return <AgeCalculator />;
      case "tip-calculator":
        return <TipCalculator />;
      case "date-calculator":
      case "days-between-dates":
        return <DateCalculator />;
      case "concrete-calculator":
        return <ConcreteCalculator />;

      // SEO
      case "word-counter":
      case "character-counter":
        return <WordCounter />;
      case "password-generator":
        return <PasswordGenerator />;
      case "case-converter":
        return <CaseConverter />;

      // Unit Converters (Dynamic mapping)
      case "length-converter":
      case "weight-converter":
      case "temperature-converter":
      case "area-converter":
      case "volume-converter":
      case "speed-converter":
      case "time-converter":
      case "pressure-converter":
      case "energy-converter":
      case "power-converter":
        return <UnitConverter type={slug.replace("-converter", "")} />;

      default:
        return (
          <Card className="w-full max-w-2xl mx-auto text-center py-12">
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <div className="p-4 bg-muted rounded-full">
                  <Construction className="h-12 w-12 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold">Coming Soon</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  The {title} is currently under development. We are working hard to bring you this tool very soon.
                </p>
              </div>
              <div className="pt-4">
                <Link href="/">
                  <Button>Return Home</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  const getCategoryInfo = (slug: string) => {
    const s = slug.toLowerCase();
    
    // Health
    if (
      s.includes('bmi') || 
      s.includes('calorie') || 
      s.includes('bmr') || 
      s.includes('ideal-weight') ||
      s.includes('body-fat') ||
      s.includes('water-intake') ||
      s.includes('sleep') ||
      s.includes('ovulation')
    ) return { name: "Health", href: "/health" };

    // Financial
    if (
      s.includes('loan') || 
      s.includes('mortgage') || 
      s.includes('interest') || 
      s.includes('gst') || 
      s.includes('vat') || 
      s.includes('salary') || 
      s.includes('paycheck') || 
      s.includes('discount') || 
      s.includes('profit') ||
      s.includes('margin') ||
      s.includes('emi') ||
      s.includes('tax') ||
      s.includes('investment') ||
      s.includes('retirement') ||
      s.includes('amortization') ||
      s.includes('currency') ||
      s.includes('saving')
    ) return { name: "Financial", href: "/financial" };

    // Converters (Must be before generic 'calculator' checks if any)
    if (
      (s.includes('converter') && !s.includes('case')) ||
      s.includes('to-binary') ||
      s.includes('to-decimal') ||
      s.includes('base-converter')
    ) return { name: "Converters", href: "/converters" };

    // SEO Tools
    if (
      s.includes('word') || 
      s.includes('character') || 
      s.includes('password') || 
      s.includes('case') ||
      s.includes('qr') ||
      s.includes('text-repeater')
    ) return { name: "SEO Tools", href: "/seo-tools" };

    // Daily Life
    if (
      s.includes('age') || 
      s.includes('date') || 
      s.includes('time') || 
      s.includes('tip') ||
      s.includes('day') ||
      s.includes('concrete')
    ) return { name: "Daily Life", href: "/other" };

    // Math (Default)
    return { name: "Math", href: "/math" };
  };

  const category = getCategoryInfo(slug);

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Link href={category.href}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href={category.href}>{category.name}</Link>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
          </div>
        </div>

        <div className="flex justify-center">
          {renderCalculator()}
        </div>

        <section className="prose dark:prose-invert max-w-none mt-12">
          <h2>About {title}</h2>
          <p>
            This comprehensive {title.toLowerCase()} is designed to provide accurate and instant results. 
            Like all our tools at CalcHub, it is completely free to use and optimized for both desktop and mobile devices.
          </p>
        </section>
      </div>
    </Layout>
  );
}