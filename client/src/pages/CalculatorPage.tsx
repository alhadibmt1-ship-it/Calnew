import Layout from "@/components/Layout";
import { useRoute, Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Construction, Home, ChevronRight } from "lucide-react";
import { getAllTools, calculatorCategories } from "@/lib/calculator-data";

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
import SubnetCalculator from "@/components/SubnetCalculator";
import GPACalculator from "@/components/GPACalculator";
import GradeCalculator from "@/components/GradeCalculator";
import TimeCalculator from "@/components/TimeCalculator";
import TimeZoneConverter from "@/components/TimeZoneConverter";
import AgeGapCalculator from "@/components/AgeGapCalculator";
import BirthdayCountdown from "@/components/BirthdayCountdown";

import BodyFatCalculator from "@/components/BodyFatCalculator";
import PregnancyCalculator from "@/components/PregnancyCalculator";
import OvulationCalculator from "@/components/OvulationCalculator";
import WaterIntakeCalculator from "@/components/WaterIntakeCalculator";
import MacroCalculator from "@/components/MacroCalculator";
import SleepCalculator from "@/components/SleepCalculator";

import FractionCalculator from "@/components/FractionCalculator";
import TriangleCalculator from "@/components/TriangleCalculator";
import VolumeCalculator from "@/components/VolumeCalculator";
import QuadraticCalculator from "@/components/QuadraticCalculator";
import RomanNumeralConverter from "@/components/RomanNumeralConverter";

import HexConverter from "@/components/HexConverter";
import FactorCalculator from "@/components/FactorCalculator";
import LogarithmCalculator from "@/components/LogarithmCalculator";
import RatioCalculator from "@/components/RatioCalculator";
import RootCalculator from "@/components/RootCalculator";
import StandardDeviationCalculator from "@/components/StandardDeviationCalculator";
import TextRepeater from "@/components/TextRepeater";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import ColorPicker from "@/components/ColorPicker";

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
      case "body-fat-calculator":
        return <BodyFatCalculator />;
      case "pregnancy-calculator":
      case "due-date-calculator":
        return <PregnancyCalculator />;
      case "ovulation-calculator":
        return <OvulationCalculator />;
      case "water-intake-calculator":
        return <WaterIntakeCalculator />;
      case "macro-calculator":
      case "tdee-calculator":
        return <MacroCalculator />;
      case "sleep-calculator":
        return <SleepCalculator />;
      
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
      case "binary-to-decimal-converter":
        return <BinaryConverter />;
      case "prime-checker":
      case "prime-number-checker":
        return <PrimeChecker />;
      case "subnet-calculator":
        return <SubnetCalculator />;
      case "fraction-calculator":
        return <FractionCalculator />;
      case "triangle-calculator":
        return <TriangleCalculator />;
      case "volume-calculator":
        return <VolumeCalculator />;
      case "quadratic-formula":
      case "equation-calculator":
        return <QuadraticCalculator />;
      case "roman-numeral-converter":
        return <RomanNumeralConverter />;
      case "hex-to-decimal-converter":
        return <HexConverter />;
      case "factor-calculator":
        return <FactorCalculator />;
      case "logarithm-calculator":
        return <LogarithmCalculator />;
      case "ratio-calculator":
        return <RatioCalculator />;
      case "root-calculator":
        return <RootCalculator />;
      case "standard-deviation":
        return <StandardDeviationCalculator />;

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
      case "age-gap-calculator":
        return <AgeGapCalculator />;
      case "birthday-countdown":
        return <BirthdayCountdown />;
      case "tip-calculator":
        return <TipCalculator />;
      case "date-calculator":
      case "days-between-dates":
        return <DateCalculator />;
      case "concrete-calculator":
        return <ConcreteCalculator />;
      case "gpa-calculator":
        return <GPACalculator />;
      case "grade-calculator":
        return <GradeCalculator />;
      case "time-calculator":
        return <TimeCalculator />;
      case "time-zone-converter":
        return <TimeZoneConverter />;

      // SEO
      case "word-counter":
      case "character-counter":
        return <WordCounter />;
      case "password-generator":
        return <PasswordGenerator />;
      case "case-converter":
        return <CaseConverter />;
      case "text-repeater":
        return <TextRepeater />;
      case "qr-code-generator":
        return <QRCodeGenerator />;
      case "color-picker-tool":
        return <ColorPicker />;

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
    const allTools = getAllTools();
    const tool = allTools.find(t => t.slug === slug || t.slug === slug.replace(/-calculator$/, ''));
    
    if (tool) {
      return { name: tool.category, href: `/${tool.categorySlug}` };
    }
    
    // Fallbacks for aliases not in the main list
    const s = slug.toLowerCase();
    if (s.includes('bmi') || s.includes('calorie') || s.includes('health')) return { name: "Health", href: "/health" };
    if (s.includes('loan') || s.includes('tax') || s.includes('finance')) return { name: "Financial", href: "/financial" };
    if (s.includes('converter')) return { name: "Converters", href: "/converters" };
    
    return { name: "Math", href: "/math" };
  };

  const category = getCategoryInfo(slug);
  
  // Get related tools in the same category
  const relatedTools = getAllTools()
    .filter(t => t.category === category.name && t.slug !== slug)
    .slice(0, 10); // Show top 10 related

  return (
    <Layout>
      <div className="grid lg:grid-cols-[1fr_300px] gap-8 max-w-7xl mx-auto">
        
        {/* Main Content Column */}
        <div className="space-y-8 min-w-0">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center text-sm text-muted-foreground overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/" className="hover:text-primary flex items-center gap-1 transition-colors">
              <Home className="h-4 w-4" />
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 shrink-0" />
            <Link href={category.href} className="hover:text-primary transition-colors">
              {category.name}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 shrink-0" />
            <span className="font-medium text-foreground">{title}</span>
          </nav>

          {/* Main Calculator Area */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
              <p className="text-lg text-muted-foreground">
                Free online {title.toLowerCase()} for instant results. Accurate, fast, and easy to use.
              </p>
            </div>

            <div className="flex justify-center w-full bg-card rounded-xl border shadow-sm p-4 md:p-8">
              {renderCalculator()}
            </div>
          </div>

          {/* SEO Article / Description */}
          <section className="prose dark:prose-invert max-w-none bg-muted/30 p-8 rounded-xl border">
            <h2>About {title}</h2>
            <p>
              This <strong>{title}</strong> is a free online tool designed to help you calculate {title.toLowerCase().replace('calculator', '')} quickly and accurately. 
              Whether you're a student, professional, or just need to make a quick calculation, our tool provides instant results without any complex setup.
            </p>
            
            <h3>How to use this calculator</h3>
            <ul>
              <li>Enter the required values in the input fields above.</li>
              <li>Check that the units are correct (if applicable).</li>
              <li>Click the "Calculate" or "Convert" button to see your result.</li>
              <li>Use the "Reset" or "Clear" button to start a new calculation.</li>
            </ul>

            <h3>Why use CalcHub?</h3>
            <p>
              CalcHub provides a suite of over 50 free online calculators covering finance, health, math, and daily life utilities. 
              Our tools are:
            </p>
            <ul>
              <li><strong>Free:</strong> No registration or payment required.</li>
              <li><strong>Fast:</strong> Instant results right in your browser.</li>
              <li><strong>Private:</strong> Calculations happen on your device; we don't store your personal data.</li>
              <li><strong>Mobile-Friendly:</strong> Works perfectly on phones, tablets, and desktops.</li>
            </ul>
          </section>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <div className="bg-card rounded-xl border shadow-sm p-6 sticky top-24">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary"></div>
              More {category.name} Tools
            </h3>
            <ul className="space-y-1">
              {relatedTools.map((tool) => (
                <li key={tool.slug}>
                  <Link href={tool.href} className="block py-2 px-3 rounded-md text-sm text-muted-foreground hover:text-primary hover:bg-muted transition-colors flex items-center justify-between group">
                    <span>{tool.name}</span>
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 pt-6 border-t">
               <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-green-500"></div>
                Popular Tools
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/calculator/bmi-calculator" className="text-sm text-muted-foreground hover:text-primary block">BMI Calculator</Link>
                </li>
                <li>
                  <Link href="/calculator/percentage-calculator" className="text-sm text-muted-foreground hover:text-primary block">Percentage Calculator</Link>
                </li>
                <li>
                  <Link href="/calculator/loan-emi-calculator" className="text-sm text-muted-foreground hover:text-primary block">Loan Calculator</Link>
                </li>
                <li>
                  <Link href="/calculator/age-calculator" className="text-sm text-muted-foreground hover:text-primary block">Age Calculator</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}