import Layout from "@/components/Layout";
import { useRoute, Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Construction, Home, ChevronRight, ArrowLeft, Loader2 } from "lucide-react";
import { getAllTools, calculatorCategories } from "@/lib/calculator-data";
import { useEffect, lazy, Suspense } from "react";

// Lazy load calculator components to reduce initial bundle size
const BMICalculator = lazy(() => import("@/components/BMICalculator"));
const StandardCalculator = lazy(() => import("@/components/StandardCalculator"));
const ScientificCalculator = lazy(() => import("@/components/ScientificCalculator"));
const CaloriesCalculator = lazy(() => import("@/components/CaloriesCalculator"));
const AgeCalculator = lazy(() => import("@/components/AgeCalculator"));
const LoanCalculator = lazy(() => import("@/components/LoanCalculator"));
const PercentageCalculator = lazy(() => import("@/components/PercentageCalculator"));
const UnitConverter = lazy(() => import("@/components/UnitConverter"));
const InterestCalculator = lazy(() => import("@/components/InterestCalculator"));
const TipCalculator = lazy(() => import("@/components/TipCalculator"));
const WordCounter = lazy(() => import("@/components/WordCounter"));
const PasswordGenerator = lazy(() => import("@/components/PasswordGenerator"));
const DiscountCalculator = lazy(() => import("@/components/DiscountCalculator"));
const GSTCalculator = lazy(() => import("@/components/GSTCalculator"));
const DateCalculator = lazy(() => import("@/components/DateCalculator"));
const RandomGenerator = lazy(() => import("@/components/RandomGenerator"));
const CaseConverter = lazy(() => import("@/components/CaseConverter"));
const GeometryCalculator = lazy(() => import("@/components/GeometryCalculator"));
const AlgebraCalculator = lazy(() => import("@/components/AlgebraCalculator"));
const SalaryCalculator = lazy(() => import("@/components/SalaryCalculator"));
const ProfitMarginCalculator = lazy(() => import("@/components/ProfitMarginCalculator"));
const BMRCalculator = lazy(() => import("@/components/BMRCalculator"));
const BinaryConverter = lazy(() => import("@/components/BinaryConverter"));
const PrimeChecker = lazy(() => import("@/components/PrimeChecker"));
const IdealWeightCalculator = lazy(() => import("@/components/IdealWeightCalculator"));
const CurrencyConverter = lazy(() => import("@/components/CurrencyConverter"));
const SavingGoalCalculator = lazy(() => import("@/components/SavingGoalCalculator"));
const InvestmentCalculator = lazy(() => import("@/components/InvestmentCalculator"));
const RetirementCalculator = lazy(() => import("@/components/RetirementCalculator"));
const TaxCalculator = lazy(() => import("@/components/TaxCalculator"));
const ConcreteCalculator = lazy(() => import("@/components/ConcreteCalculator"));
const SubnetCalculator = lazy(() => import("@/components/SubnetCalculator"));
const GPACalculator = lazy(() => import("@/components/GPACalculator"));
const GradeCalculator = lazy(() => import("@/components/GradeCalculator"));
const TimeCalculator = lazy(() => import("@/components/TimeCalculator"));
const TimeZoneConverter = lazy(() => import("@/components/TimeZoneConverter"));
const AgeGapCalculator = lazy(() => import("@/components/AgeGapCalculator"));
const BirthdayCountdown = lazy(() => import("@/components/BirthdayCountdown"));
const BodyFatCalculator = lazy(() => import("@/components/BodyFatCalculator"));
const PregnancyCalculator = lazy(() => import("@/components/PregnancyCalculator"));
const OvulationCalculator = lazy(() => import("@/components/OvulationCalculator"));
const WaterIntakeCalculator = lazy(() => import("@/components/WaterIntakeCalculator"));
const MacroCalculator = lazy(() => import("@/components/MacroCalculator"));
const SleepCalculator = lazy(() => import("@/components/SleepCalculator"));
const FractionCalculator = lazy(() => import("@/components/FractionCalculator"));
const TriangleCalculator = lazy(() => import("@/components/TriangleCalculator"));
const VolumeCalculator = lazy(() => import("@/components/VolumeCalculator"));
const QuadraticCalculator = lazy(() => import("@/components/QuadraticCalculator"));
const RomanNumeralConverter = lazy(() => import("@/components/RomanNumeralConverter"));
const HexConverter = lazy(() => import("@/components/HexConverter"));
const FactorCalculator = lazy(() => import("@/components/FactorCalculator"));
const LogarithmCalculator = lazy(() => import("@/components/LogarithmCalculator"));
const RatioCalculator = lazy(() => import("@/components/RatioCalculator"));
const RootCalculator = lazy(() => import("@/components/RootCalculator"));
const StandardDeviationCalculator = lazy(() => import("@/components/StandardDeviationCalculator"));
const TextRepeater = lazy(() => import("@/components/TextRepeater"));
const QRCodeGenerator = lazy(() => import("@/components/QRCodeGenerator"));
const ColorPicker = lazy(() => import("@/components/ColorPicker"));
const AutoLoanCalculator = lazy(() => import("@/components/AutoLoanCalculator"));
const AmortizationCalculator = lazy(() => import("@/components/AmortizationCalculator"));
const InflationCalculator = lazy(() => import("@/components/InflationCalculator"));
const SalesTaxCalculator = lazy(() => import("@/components/SalesTaxCalculator"));
const InterestRateCalculator = lazy(() => import("@/components/InterestRateCalculator"));
const PaymentCalculator = lazy(() => import("@/components/PaymentCalculator"));
const SalaryToHourlyCalculator = lazy(() => import("@/components/SalaryToHourlyCalculator"));
const PaceCalculator = lazy(() => import("@/components/PaceCalculator"));
const DueDateCalculator = lazy(() => import("@/components/DueDateCalculator"));
const TDEECalculator = lazy(() => import("@/components/TDEECalculator"));
const PythagoreanCalculator = lazy(() => import("@/components/PythagoreanCalculator"));
const PercentageIncreaseCalculator = lazy(() => import("@/components/PercentageIncreaseCalculator"));
const CircumferenceCalculator = lazy(() => import("@/components/CircumferenceCalculator"));
const SlopeCalculator = lazy(() => import("@/components/SlopeCalculator"));
const ExponentCalculator = lazy(() => import("@/components/ExponentCalculator"));
const ScientificNotationCalculator = lazy(() => import("@/components/ScientificNotationCalculator"));
const SignificantFiguresCalculator = lazy(() => import("@/components/SignificantFiguresCalculator"));
const SquareFootageCalculator = lazy(() => import("@/components/SquareFootageCalculator"));
const HoursCalculator = lazy(() => import("@/components/HoursCalculator"));
const FuelCostCalculator = lazy(() => import("@/components/FuelCostCalculator"));
const ElectricityCostCalculator = lazy(() => import("@/components/ElectricityCostCalculator"));
const ShoeSizeConverter = lazy(() => import("@/components/ShoeSizeConverter"));
const GratuityCalculator = lazy(() => import("@/components/GratuityCalculator"));
const MarkupCalculator = lazy(() => import("@/components/MarkupCalculator"));
const BreakEvenCalculator = lazy(() => import("@/components/BreakEvenCalculator"));
const ROICalculator = lazy(() => import("@/components/ROICalculator"));
const CashFlowCalculator = lazy(() => import("@/components/CashFlowCalculator"));
const BusinessLoanCalculator = lazy(() => import("@/components/BusinessLoanCalculator"));
const InvoiceCalculator = lazy(() => import("@/components/InvoiceCalculator"));
const ExpenseCalculator = lazy(() => import("@/components/ExpenseCalculator"));
const RevenueCalculator = lazy(() => import("@/components/RevenueCalculator"));
const OvertimeCalculator = lazy(() => import("@/components/OvertimeCalculator"));
const CostPriceCalculator = lazy(() => import("@/components/CostPriceCalculator"));
const GrossProfitCalculator = lazy(() => import("@/components/GrossProfitCalculator"));
const NetProfitCalculator = lazy(() => import("@/components/NetProfitCalculator"));
const InventoryTurnoverCalculator = lazy(() => import("@/components/InventoryTurnoverCalculator"));
const PricePerUnitCalculator = lazy(() => import("@/components/PricePerUnitCalculator"));
const WholesalePriceCalculator = lazy(() => import("@/components/WholesalePriceCalculator"));
const AccountsReceivableCalculator = lazy(() => import("@/components/AccountsReceivableCalculator"));
const CementCalculator = lazy(() => import("@/components/CementCalculator"));
const ConcreteMixCalculator = lazy(() => import("@/components/ConcreteMixCalculator"));
const SteelWeightCalculator = lazy(() => import("@/components/SteelWeightCalculator"));
const SandCalculator = lazy(() => import("@/components/SandCalculator"));
const BrickCalculator = lazy(() => import("@/components/BrickCalculator"));
const TileCalculator = lazy(() => import("@/components/TileCalculator"));
const PaintCalculator = lazy(() => import("@/components/PaintCalculator"));
const PlywoodCalculator = lazy(() => import("@/components/PlywoodCalculator"));
const ConstructionCostCalculator = lazy(() => import("@/components/ConstructionCostCalculator"));
const BOQCalculator = lazy(() => import("@/components/BOQCalculator"));
const LaborCostCalculator = lazy(() => import("@/components/LaborCostCalculator"));
const MaterialCostEstimator = lazy(() => import("@/components/MaterialCostEstimator"));
const ProjectCostCalculator = lazy(() => import("@/components/ProjectCostCalculator"));
const ProjectProfitCalculator = lazy(() => import("@/components/ProjectProfitCalculator"));
const AttendanceCalculator = lazy(() => import("@/components/AttendanceCalculator"));
const CGPACalculator = lazy(() => import("@/components/CGPACalculator"));
const MarksPercentageCalculator = lazy(() => import("@/components/MarksPercentageCalculator"));
const LetterGradeConverter = lazy(() => import("@/components/LetterGradeConverter"));
const StudentLoanCalculator = lazy(() => import("@/components/StudentLoanCalculator"));
const StudyTimeCalculator = lazy(() => import("@/components/StudyTimeCalculator"));
const ExamCountdownTimer = lazy(() => import("@/components/ExamCountdownTimer"));

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
        return <PregnancyCalculator />;
      case "due-date-calculator":
        return <DueDateCalculator />;
      case "ovulation-calculator":
        return <OvulationCalculator />;
      case "water-intake-calculator":
        return <WaterIntakeCalculator />;
      case "macro-calculator":
        return <MacroCalculator />;
      case "tdee-calculator":
        return <TDEECalculator />;
      case "pace-calculator":
        return <PaceCalculator />;
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
      case "pythagorean-theorem-calculator":
        return <PythagoreanCalculator />;
      case "percentage-increase-calculator":
        return <PercentageIncreaseCalculator />;
      case "circumference-calculator":
        return <CircumferenceCalculator />;
      case "slope-calculator":
        return <SlopeCalculator />;
      case "exponent-calculator":
        return <ExponentCalculator />;
      case "scientific-notation-calculator":
        return <ScientificNotationCalculator />;
      case "significant-figures-calculator":
        return <SignificantFiguresCalculator />;
      case "square-footage-calculator":
        return <SquareFootageCalculator />;

      // Financial
      case "loan-emi-calculator":
      case "loan-calculator":
      case "mortgage-calculator": 
        return <LoanCalculator />;
      case "auto-loan-calculator":
        return <AutoLoanCalculator />;
      case "amortization-calculator":
        return <AmortizationCalculator />;
      
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
      case "inflation-calculator":
        return <InflationCalculator />;
      case "sales-tax-calculator":
        return <SalesTaxCalculator />;
      case "interest-rate-calculator":
        return <InterestRateCalculator />;
      case "payment-calculator":
        return <PaymentCalculator />;
      case "salary-to-hourly-calculator":
        return <SalaryToHourlyCalculator />;
      case "gratuity-calculator":
        return <GratuityCalculator />;
      case "markup-calculator":
        return <MarkupCalculator />;
      case "break-even-calculator":
        return <BreakEvenCalculator />;
      case "roi-calculator":
        return <ROICalculator />;
      case "cash-flow-calculator":
        return <CashFlowCalculator />;
      case "business-loan-calculator":
        return <BusinessLoanCalculator />;
      case "invoice-calculator":
        return <InvoiceCalculator />;
      case "expense-calculator":
        return <ExpenseCalculator />;
      case "revenue-calculator":
        return <RevenueCalculator />;
      case "overtime-calculator":
        return <OvertimeCalculator />;
      case "cost-price-calculator":
        return <CostPriceCalculator />;
      case "gross-profit-calculator":
        return <GrossProfitCalculator />;
      case "net-profit-calculator":
        return <NetProfitCalculator />;
      case "inventory-turnover-calculator":
        return <InventoryTurnoverCalculator />;
      case "price-per-unit-calculator":
        return <PricePerUnitCalculator />;
      case "wholesale-price-calculator":
        return <WholesalePriceCalculator />;
      case "accounts-receivable-calculator":
        return <AccountsReceivableCalculator />;

      // Construction
      case "cement-calculator":
        return <CementCalculator />;
      case "concrete-mix-calculator":
        return <ConcreteMixCalculator />;
      case "steel-weight-calculator":
        return <SteelWeightCalculator />;
      case "sand-calculator":
        return <SandCalculator />;
      case "brick-calculator":
        return <BrickCalculator />;
      case "tile-calculator":
        return <TileCalculator />;
      case "paint-calculator":
        return <PaintCalculator />;
      case "plywood-calculator":
        return <PlywoodCalculator />;
      case "construction-cost-calculator":
        return <ConstructionCostCalculator />;
      case "boq-calculator":
        return <BOQCalculator />;
      case "labor-cost-calculator":
        return <LaborCostCalculator />;
      case "material-cost-estimator":
        return <MaterialCostEstimator />;
      case "project-cost-calculator":
        return <ProjectCostCalculator />;
      case "project-profit-calculator":
        return <ProjectProfitCalculator />;

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
      case "hours-calculator":
        return <HoursCalculator />;
      case "fuel-cost-calculator":
        return <FuelCostCalculator />;
      case "electricity-cost-calculator":
        return <ElectricityCostCalculator />;
      case "shoe-size-converter":
        return <ShoeSizeConverter />;
      case "attendance-calculator":
        return <AttendanceCalculator />;
      case "cgpa-calculator":
        return <CGPACalculator />;
      case "marks-percentage-calculator":
        return <MarksPercentageCalculator />;
      case "letter-grade-converter":
        return <LetterGradeConverter />;
      case "student-loan-calculator":
        return <StudentLoanCalculator />;
      case "study-time-calculator":
        return <StudyTimeCalculator />;
      case "exam-countdown-timer":
        return <ExamCountdownTimer />;

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
      case "data-storage-converter":
      case "fuel-efficiency-converter":
      case "angle-converter":
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

  const getToolData = (slug: string) => {
    const allTools = getAllTools();
    return allTools.find(t => t.slug === slug || t.slug === slug.replace(/-calculator$/, ''));
  };

  const toolData = getToolData(slug);

  useEffect(() => {
    // Update Title
    document.title = `${title} - Free Online Tool | CalcSmart24`;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', toolData?.description || `Free online ${title.toLowerCase()} for instant results. Accurate, fast, and easy to use.`);

    // Update Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', `https://calcsmart24.com/calculator/${slug}`);

    // Structured Data (SoftwareApplication)
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": title,
      "applicationCategory": category.name,
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": toolData?.description || `Free online ${title.toLowerCase()} for instant results.`
    };

    let scriptTag = document.querySelector('#schema-structured-data');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'schema-structured-data';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaData);

  }, [title, slug, toolData, category]);

  return (
    <Layout>
      <div className="grid lg:grid-cols-[1fr_300px] gap-8 max-w-7xl mx-auto">
        
        {/* Main Content Column */}
        <div className="space-y-8 min-w-0">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2">
            <Link href={category.href}>
              <Button variant="ghost" size="icon" className="-ml-3 text-muted-foreground hover:text-foreground" aria-label="Back to category">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
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
          </div>

          {/* Main Calculator Area */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
              <p className="text-lg text-muted-foreground">
                {toolData?.description || `Free online ${title.toLowerCase()} for instant results. Accurate, fast, and easy to use.`}
              </p>
            </div>

            <div className="flex justify-center w-full bg-card rounded-xl border shadow-sm p-4 md:p-8 min-h-[400px]">
              <Suspense fallback={
                <div className="flex flex-col items-center justify-center h-full space-y-4 p-8 text-muted-foreground w-full">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p>Loading calculator...</p>
                </div>
              }>
                {renderCalculator()}
              </Suspense>
            </div>
          </div>

          {/* Rich SEO Content */}
          <section className="prose dark:prose-invert max-w-none bg-muted/30 p-8 rounded-xl border space-y-8">
            
            {/* Intro / Description */}
            <div>
              <h2>About {title}</h2>
              <p>
                This <strong>{title}</strong> is a free online tool designed to help you calculate {title.toLowerCase().replace('calculator', '')} quickly and accurately. 
                Whether you're a student, professional, or just need to make a quick calculation, our tool provides instant results without any complex setup.
              </p>
            </div>

            {/* Formula Section (Conditional) */}
            {toolData?.formula && (
              <div>
                <h3>Formula</h3>
                <p>The {title} uses the following formula:</p>
                <blockquote className="not-italic font-mono bg-slate-100 dark:bg-slate-900 p-4 rounded-lg border-l-4 border-primary">
                  {toolData.formula}
                </blockquote>
              </div>
            )}

            {/* Example Section (Conditional) */}
            {toolData?.example && (
              <div>
                <h3>Example Calculation</h3>
                <p>{toolData.example}</p>
              </div>
            )}

            {/* How To Use */}
            <div>
              <h3>How to use this calculator</h3>
              <ul>
                <li>Enter the required values in the input fields above.</li>
                <li>Check that the units are correct (if applicable).</li>
                <li>Click the "Calculate" or "Convert" button to see your result.</li>
                <li>Use the "Reset" or "Clear" button to start a new calculation.</li>
              </ul>
            </div>

            {/* FAQ Section (Conditional) */}
            {toolData?.faq && toolData.faq.length > 0 && (
              <div>
                <h3>Frequently Asked Questions (FAQ)</h3>
                <div className="space-y-4">
                  {toolData.faq.map((item, i) => (
                    <div key={i} className="border-b pb-4 last:border-0">
                      <h4 className="font-semibold text-lg mb-2">{item.question}</h4>
                      <p className="text-muted-foreground">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* General Info */}
            <div>
              <h3>Why use CalcSmart24?</h3>
              <p>
                CalcSmart24 provides a suite of over 50 free online calculators covering finance, health, math, and daily life utilities. 
                Our tools are:
              </p>
              <ul>
                <li><strong>Free:</strong> No registration or payment required.</li>
                <li><strong>Fast:</strong> Instant results right in your browser.</li>
                <li><strong>Private:</strong> Calculations happen on your device; we don't store your personal data.</li>
                <li><strong>Mobile-Friendly:</strong> Works perfectly on phones, tablets, and desktops.</li>
              </ul>
            </div>
          </section>

          {/* Related Tools Section */}
          <section className="pt-8 border-t">
            <h3 className="text-2xl font-bold mb-6 text-foreground">Related {category.name} Tools</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedTools.slice(0, 6).map((tool) => (
                <Link key={tool.slug} href={tool.href}>
                  <a className="block group">
                    <Card className="h-full transition-all hover:shadow-md hover:border-primary/50 cursor-pointer bg-slate-50 dark:bg-slate-900/50">
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-base group-hover:text-primary transition-colors">{tool.name}</h4>
                          <div className="bg-primary/10 p-1.5 rounded-full text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {tool.description || `Use our free online ${tool.name.toLowerCase()} to get instant results.`}
                        </p>
                      </CardContent>
                    </Card>
                  </a>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <div className="bg-card rounded-xl border shadow-sm p-6 sticky top-24">
            
            {/* Search Quick Link */}
            <div className="mb-6 pb-6 border-b">
              <Link href="/">
                <Button variant="outline" className="w-full justify-start text-muted-foreground">
                   <Home className="mr-2 h-4 w-4" />
                   Return to All Calculators
                </Button>
              </Link>
            </div>

            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary"></div>
              More {category.name} Tools
            </h3>
            <ul className="space-y-1 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
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
                <div className="h-2 w-2 rounded-full bg-rose-500"></div>
                Popular Sitewide
              </h3>
              <ul className="space-y-1 mb-6">
                {[
                  { name: "Percentage Calculator", slug: "percentage-calculator" },
                  { name: "BMI Calculator", slug: "bmi-calculator" },
                  { name: "Age Calculator", slug: "age-calculator" },
                  { name: "Loan EMI Calculator", slug: "loan-emi-calculator" },
                  { name: "Scientific Calculator", slug: "scientific-calculator" },
                ].map(tool => (
                  <li key={tool.slug}>
                    <Link href={`/calculator/${tool.slug}`} className="block py-2 px-3 rounded-md text-sm text-muted-foreground hover:text-primary hover:bg-muted transition-colors flex items-center justify-between group">
                      <span>{tool.name}</span>
                      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>

               <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                Browse Categories
              </h3>
              <ul className="space-y-1">
                {calculatorCategories.map(cat => (
                    <li key={cat.slug}>
                        <Link href={`/${cat.slug}`} className="block py-2 px-3 rounded-md text-sm text-muted-foreground hover:text-primary hover:bg-muted transition-colors flex items-center justify-between group">
                            <span>{cat.title}</span>
                            <ChevronRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </Link>
                    </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}
