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
      
      // Math
      case "standard-calculator":
        return <StandardCalculator />;
      case "scientific-calculator":
        return <ScientificCalculator />;
      case "percentage-calculator":
        return <PercentageCalculator />;
      case "random-number-generator":
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
        return <LoanCalculator />;
      
      case "simple-interest-calculator":
      case "compound-interest-calculator":
      case "interest-calculator":
        return <InterestCalculator />;

      case "discount-calculator":
        return <DiscountCalculator />;
      case "gst-vat-calculator":
        return <GSTCalculator />;
      case "salary-calculator":
      case "paycheck-calculator":
        return <SalaryCalculator />;
      case "profit-margin-calculator":
      case "margin-calculator":
        return <ProfitMarginCalculator />;

      // Daily Life
      case "age-calculator":
        return <AgeCalculator />;
      case "tip-calculator":
        return <TipCalculator />;
      case "date-calculator":
      case "days-between-dates":
        return <DateCalculator />;

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

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
            <p className="text-muted-foreground">Free online {title.toLowerCase()}</p>
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