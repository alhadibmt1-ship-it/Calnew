import Layout from "@/components/Layout";
import { useRoute, Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Construction, Home, ChevronRight, ArrowLeft, Loader2, BookOpen, Lightbulb, ListChecks, FlaskConical, Table2, AlertTriangle, CheckCircle2, Link2 } from "lucide-react";
import { getAllTools, calculatorCategories } from "@/lib/calculator-data";
import { useEffect, lazy, Suspense } from "react";
import { getSEOContent, getGenericSEOContent } from "@/lib/seo-content";
import { getRelatedCalculators } from "@/lib/internal-links";


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
const FHALoanCalculator = lazy(() => import("@/components/FHALoanCalculator"));
const VALoanCalculator = lazy(() => import("@/components/VALoanCalculator"));
const ConventionalLoanCalculator = lazy(() => import("@/components/ConventionalLoanCalculator"));
const FixedRateMortgageCalculator = lazy(() => import("@/components/FixedRateMortgageCalculator"));
const AdjustableRateMortgageCalculator = lazy(() => import("@/components/AdjustableRateMortgageCalculator"));
const MortgagePayoffCalculator = lazy(() => import("@/components/MortgagePayoffCalculator"));
const EarlyMortgagePayoffCalculator = lazy(() => import("@/components/EarlyMortgagePayoffCalculator"));
const HouseAffordabilityCalculator = lazy(() => import("@/components/HouseAffordabilityCalculator"));
const RentVsBuyCalculator = lazy(() => import("@/components/RentVsBuyCalculator"));
const DownPaymentCalculator = lazy(() => import("@/components/DownPaymentCalculator"));
const RefinanceBreakEvenCalculator = lazy(() => import("@/components/RefinanceBreakEvenCalculator"));
const BoatLoanCalculator = lazy(() => import("@/components/BoatLoanCalculator"));
const RVLoanCalculator = lazy(() => import("@/components/RVLoanCalculator"));
const PersonalLoanCalculator = lazy(() => import("@/components/PersonalLoanCalculator"));
const DebtToIncomeCalculator = lazy(() => import("@/components/DebtToIncomeCalculator"));
const CreditCardPayoffCalculator = lazy(() => import("@/components/CreditCardPayoffCalculator"));
const InterestOnlyLoanCalculator = lazy(() => import("@/components/InterestOnlyLoanCalculator"));
const BalloonPaymentCalculator = lazy(() => import("@/components/BalloonPaymentCalculator"));
const LoanComparisonCalculator = lazy(() => import("@/components/LoanComparisonCalculator"));
const PaydayLoanCalculator = lazy(() => import("@/components/PaydayLoanCalculator"));
const CompoundInterestDailyCalculator = lazy(() => import("@/components/CompoundInterestDailyCalculator"));
const CompoundInterestMonthlyCalculator = lazy(() => import("@/components/CompoundInterestMonthlyCalculator"));
const FourOOneKProjectionCalculator = lazy(() => import("@/components/FourOOneKProjectionCalculator"));
const RothIRACalculator = lazy(() => import("@/components/RothIRACalculator"));
const TraditionalIRACalculator = lazy(() => import("@/components/TraditionalIRACalculator"));
const StockProfitLossCalculator = lazy(() => import("@/components/StockProfitLossCalculator"));
const DividendReinvestmentCalculator = lazy(() => import("@/components/DividendReinvestmentCalculator"));
const CAGRCalculator = lazy(() => import("@/components/CAGRCalculator"));
const CryptoROICalculator = lazy(() => import("@/components/CryptoROICalculator"));
const PortfolioRebalanceCalculator = lazy(() => import("@/components/PortfolioRebalanceCalculator"));
const CustomerLifetimeValueCalculator = lazy(() => import("@/components/CustomerLifetimeValueCalculator"));
const CustomerAcquisitionCostCalculator = lazy(() => import("@/components/CustomerAcquisitionCostCalculator"));
const NetPromoterScoreCalculator = lazy(() => import("@/components/NetPromoterScoreCalculator"));
const PayrollTaxCalculator = lazy(() => import("@/components/PayrollTaxCalculator"));
const CommissionCalculator = lazy(() => import("@/components/CommissionCalculator"));
const ConcreteSlabCalculator = lazy(() => import("@/components/ConcreteSlabCalculator"));
const ConcreteFootingCalculator = lazy(() => import("@/components/ConcreteFootingCalculator"));
const ConcreteColumnSquareCalculator = lazy(() => import("@/components/ConcreteColumnSquareCalculator"));
const ConcreteColumnRoundCalculator = lazy(() => import("@/components/ConcreteColumnRoundCalculator"));
const ConcreteWallCalculator = lazy(() => import("@/components/ConcreteWallCalculator"));
const ConcreteCurbCalculator = lazy(() => import("@/components/ConcreteCurbCalculator"));
const ConcreteStairsCalculator = lazy(() => import("@/components/ConcreteStairsCalculator"));
const BrickWallCalculator = lazy(() => import("@/components/BrickWallCalculator"));
const BrickLayerCalculator = lazy(() => import("@/components/BrickLayerCalculator"));
const CinderBlockWallCalculator = lazy(() => import("@/components/CinderBlockWallCalculator"));
const MortarMixRatioCalculator = lazy(() => import("@/components/MortarMixRatioCalculator"));
const RebarWeightCalculator = lazy(() => import("@/components/RebarWeightCalculator"));
const GravelEstimator = lazy(() => import("@/components/GravelEstimator"));
const SandEstimator = lazy(() => import("@/components/SandEstimator"));
const AsphaltPavingCalculator = lazy(() => import("@/components/AsphaltPavingCalculator"));
const WallStudCounter = lazy(() => import("@/components/WallStudCounter"));
const FloorJoistSizeCalculator = lazy(() => import("@/components/FloorJoistSizeCalculator"));
const RafterLengthCalculator = lazy(() => import("@/components/RafterLengthCalculator"));
const RoofPitchCalculator = lazy(() => import("@/components/RoofPitchCalculator"));
const RoofSquareCalculator = lazy(() => import("@/components/RoofSquareCalculator"));
const DrywallSheetCalculator = lazy(() => import("@/components/DrywallSheetCalculator"));
const SidingSquareCalculator = lazy(() => import("@/components/SidingSquareCalculator"));
const TrimLengthCalculator = lazy(() => import("@/components/TrimLengthCalculator"));
const LumberBoardFootCalculator = lazy(() => import("@/components/LumberBoardFootCalculator"));
const PlywoodSheetCalculator = lazy(() => import("@/components/PlywoodSheetCalculator"));
const StairStringerCalculator = lazy(() => import("@/components/StairStringerCalculator"));
const DeckBoardCalculator = lazy(() => import("@/components/DeckBoardCalculator"));
const FencePicketCalculator = lazy(() => import("@/components/FencePicketCalculator"));
const FencePostCalculator = lazy(() => import("@/components/FencePostCalculator"));
const CabinetDimensionCalculator = lazy(() => import("@/components/CabinetDimensionCalculator"));
const WoodBeamSpanCalculator = lazy(() => import("@/components/WoodBeamSpanCalculator"));
const BTUHeatLoadCalculator = lazy(() => import("@/components/BTUHeatLoadCalculator"));
const AirDuctSizeCalculator = lazy(() => import("@/components/AirDuctSizeCalculator"));
const ACTonnageCalculator = lazy(() => import("@/components/ACTonnageCalculator"));
const WireSizeAWGCalculator = lazy(() => import("@/components/WireSizeAWGCalculator"));
const VoltageDropCalculator = lazy(() => import("@/components/VoltageDropCalculator"));
const OhmsLawCalculator = lazy(() => import("@/components/OhmsLawCalculator"));
const PowerFactorCalculator = lazy(() => import("@/components/PowerFactorCalculator"));
const ConduitFillCalculator = lazy(() => import("@/components/ConduitFillCalculator"));
const PipeVolumeCalculator = lazy(() => import("@/components/PipeVolumeCalculator"));
const WaterFlowRateCalculator = lazy(() => import("@/components/WaterFlowRateCalculator"));
const VerticalTankCapacityCalculator = lazy(() => import("@/components/VerticalTankCapacityCalculator"));
const HorizontalTankCapacityCalculator = lazy(() => import("@/components/HorizontalTankCapacityCalculator"));
const PumpHeadCalculator = lazy(() => import("@/components/PumpHeadCalculator"));
const SolarPanelArrayCalculator = lazy(() => import("@/components/SolarPanelArrayCalculator"));
const InsulationRValueCalculator = lazy(() => import("@/components/InsulationRValueCalculator"));

function SEOContentSection({ slug, title, toolData }: { slug: string; title: string; toolData: any }) {
  const seoContent = getSEOContent(slug) || getGenericSEOContent(title, toolData?.description || "");

  return (
    <section className="prose dark:prose-invert max-w-none bg-muted/30 p-8 rounded-xl border space-y-8" data-testid="seo-content-section">
      <div>
        <h2 className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          What is {title}
        </h2>
        <p>{seoContent.whatIs}</p>
        {seoContent.whatIsExtra?.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <div>
        <h3 className="flex items-center gap-2">
          <FlaskConical className="h-5 w-5 text-primary" />
          How the Formula Works
        </h3>
        <blockquote className="not-italic font-mono bg-slate-100 dark:bg-slate-900 p-4 rounded-lg border-l-4 border-primary text-sm">
          {seoContent.howFormulaWorks}
        </blockquote>
        {seoContent.formulaBreakdown && (
          <ul className="list-disc pl-6 space-y-1 mt-3 text-sm">
            {seoContent.formulaBreakdown.map((item, i) => (
              <li key={i} className="font-mono">{item}</li>
            ))}
          </ul>
        )}
      </div>

      {toolData?.formula && (
        <div>
          <h3>Formula</h3>
          <blockquote className="not-italic font-mono bg-slate-100 dark:bg-slate-900 p-4 rounded-lg border-l-4 border-primary">
            {toolData.formula}
          </blockquote>
        </div>
      )}

      <div>
        <h3 className="flex items-center gap-2">
          <ListChecks className="h-5 w-5 text-primary" />
          How to Use This Calculator
        </h3>
        <ol className="list-decimal pl-6 space-y-1">
          {seoContent.howToUse.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>

      <div>
        <h3 className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          {seoContent.exampleTitle}
        </h3>
        <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r">
          <p className="font-mono text-sm">{seoContent.exampleContent}</p>
        </div>
      </div>

      {seoContent.tables?.map((table, i) => (
        <div key={i}>
          <h3 className="flex items-center gap-2">
            <Table2 className="h-5 w-5 text-primary" />
            {table.title}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse not-prose">
              <thead>
                <tr className="bg-primary/10">
                  {table.headers.map((header, j) => (
                    <th key={j} className="border border-border px-3 py-2 text-left font-semibold">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, j) => (
                  <tr key={j} className={j % 2 === 0 ? "bg-background" : "bg-muted/50"}>
                    {row.map((cell, k) => (
                      <td key={k} className="border border-border px-3 py-2">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {seoContent.additionalSections?.map((section, i) => (
        <div key={i}>
          <h3>{section.title}</h3>
          <p>{section.content}</p>
        </div>
      ))}

      {seoContent.tips && seoContent.tips.length > 0 && (
        <div>
          <h3 className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            Tips & Best Practices
          </h3>
          <ul className="list-disc pl-6 space-y-1">
            {seoContent.tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      )}

      {seoContent.limitations && seoContent.limitations.length > 0 && (
        <div>
          <h3 className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Limitations to Keep in Mind
          </h3>
          <ul className="list-disc pl-6 space-y-1">
            {seoContent.limitations.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {seoContent.relatedConcepts && seoContent.relatedConcepts.length > 0 && (
        <div>
          <h3 className="flex items-center gap-2">
            <Link2 className="h-5 w-5 text-primary" />
            Related Concepts
          </h3>
          <div className="flex flex-wrap gap-2 not-prose">
            {seoContent.relatedConcepts.map((concept, i) => {
              const conceptSlug = concept.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
              const calcSlug = conceptSlug.endsWith('-calculator') ? conceptSlug : conceptSlug + '-calculator';
              const allTools = getAllTools();
              const matchedTool = allTools.find(t => t.slug === calcSlug || t.slug === conceptSlug);
              if (matchedTool) {
                return (
                  <Link key={i} href={matchedTool.href}>
                    <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium hover:bg-primary/20 cursor-pointer transition-colors">{concept}</span>
                  </Link>
                );
              }
              return <span key={i} className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">{concept}</span>;
            })}
          </div>
        </div>
      )}

      {toolData?.faq && toolData.faq.length > 0 && (
        <div>
          <h3>Frequently Asked Questions</h3>
          <div className="space-y-4">
            {toolData.faq.map((item: any, i: number) => (
              <div key={i} className="border-b pb-4 last:border-0">
                <h4 className="font-semibold text-lg mb-2">{item.question}</h4>
                <p className="text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3>Why Use CalcSmart24?</h3>
        <ul>
          <li><strong>Free:</strong> No registration or payment required.</li>
          <li><strong>Fast:</strong> Instant results right in your browser.</li>
          <li><strong>Private:</strong> Calculations happen on your device.</li>
          <li><strong>Mobile-Friendly:</strong> Works perfectly on any device.</li>
        </ul>
      </div>
    </section>
  );
}

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
      case "customer-lifetime-value-calculator":
        return <CustomerLifetimeValueCalculator />;
      case "customer-acquisition-cost-calculator":
        return <CustomerAcquisitionCostCalculator />;
      case "net-promoter-score-calculator":
        return <NetPromoterScoreCalculator />;
      case "payroll-tax-calculator":
        return <PayrollTaxCalculator />;
      case "commission-calculator":
        return <CommissionCalculator />;

      // Financial - New
      case "fha-loan-calculator":
        return <FHALoanCalculator />;
      case "va-loan-calculator":
        return <VALoanCalculator />;
      case "conventional-loan-calculator":
        return <ConventionalLoanCalculator />;
      case "fixed-rate-mortgage-calculator":
        return <FixedRateMortgageCalculator />;
      case "adjustable-rate-mortgage-calculator":
        return <AdjustableRateMortgageCalculator />;
      case "mortgage-payoff-calculator":
        return <MortgagePayoffCalculator />;
      case "early-mortgage-payoff-savings-calculator":
        return <EarlyMortgagePayoffCalculator />;
      case "house-affordability-calculator":
        return <HouseAffordabilityCalculator />;
      case "rent-vs-buy-calculator":
        return <RentVsBuyCalculator />;
      case "down-payment-calculator":
        return <DownPaymentCalculator />;
      case "refinance-break-even-calculator":
        return <RefinanceBreakEvenCalculator />;
      case "boat-loan-calculator":
        return <BoatLoanCalculator />;
      case "rv-loan-calculator":
        return <RVLoanCalculator />;
      case "personal-loan-calculator":
        return <PersonalLoanCalculator />;
      case "debt-to-income-calculator":
        return <DebtToIncomeCalculator />;
      case "credit-card-payoff-calculator":
        return <CreditCardPayoffCalculator />;
      case "interest-only-loan-calculator":
        return <InterestOnlyLoanCalculator />;
      case "balloon-payment-calculator":
        return <BalloonPaymentCalculator />;
      case "loan-comparison-calculator":
        return <LoanComparisonCalculator />;
      case "payday-loan-calculator":
        return <PaydayLoanCalculator />;
      case "compound-interest-daily-calculator":
        return <CompoundInterestDailyCalculator />;
      case "compound-interest-monthly-calculator":
        return <CompoundInterestMonthlyCalculator />;
      case "401k-projection-calculator":
        return <FourOOneKProjectionCalculator />;
      case "roth-ira-calculator":
        return <RothIRACalculator />;
      case "traditional-ira-calculator":
        return <TraditionalIRACalculator />;
      case "stock-profit-loss-calculator":
        return <StockProfitLossCalculator />;
      case "dividend-reinvestment-calculator":
        return <DividendReinvestmentCalculator />;
      case "cagr-calculator":
        return <CAGRCalculator />;
      case "crypto-roi-calculator":
        return <CryptoROICalculator />;
      case "portfolio-rebalance-calculator":
        return <PortfolioRebalanceCalculator />;

      // Construction
      case "concrete-calculator":
        return <ConcreteCalculator />;
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
      case "concrete-slab-calculator":
        return <ConcreteSlabCalculator />;
      case "concrete-footing-calculator":
        return <ConcreteFootingCalculator />;
      case "concrete-column-square-calculator":
        return <ConcreteColumnSquareCalculator />;
      case "concrete-column-round-calculator":
        return <ConcreteColumnRoundCalculator />;
      case "concrete-wall-calculator":
        return <ConcreteWallCalculator />;
      case "concrete-curb-calculator":
        return <ConcreteCurbCalculator />;
      case "concrete-stairs-calculator":
        return <ConcreteStairsCalculator />;
      case "brick-wall-calculator":
        return <BrickWallCalculator />;
      case "brick-layer-calculator":
        return <BrickLayerCalculator />;
      case "cinder-block-wall-calculator":
        return <CinderBlockWallCalculator />;
      case "mortar-mix-ratio-calculator":
        return <MortarMixRatioCalculator />;
      case "rebar-weight-calculator":
        return <RebarWeightCalculator />;
      case "gravel-estimator":
        return <GravelEstimator />;
      case "sand-estimator":
        return <SandEstimator />;
      case "asphalt-paving-calculator":
        return <AsphaltPavingCalculator />;
      case "wall-stud-counter":
        return <WallStudCounter />;
      case "floor-joist-size-calculator":
        return <FloorJoistSizeCalculator />;
      case "rafter-length-calculator":
        return <RafterLengthCalculator />;
      case "roof-pitch-calculator":
        return <RoofPitchCalculator />;
      case "roof-square-calculator":
        return <RoofSquareCalculator />;
      case "drywall-sheet-calculator":
        return <DrywallSheetCalculator />;
      case "siding-square-calculator":
        return <SidingSquareCalculator />;
      case "trim-length-calculator":
        return <TrimLengthCalculator />;
      case "lumber-board-foot-calculator":
        return <LumberBoardFootCalculator />;
      case "plywood-sheet-calculator":
        return <PlywoodSheetCalculator />;
      case "stair-stringer-calculator":
        return <StairStringerCalculator />;
      case "deck-board-calculator":
        return <DeckBoardCalculator />;
      case "fence-picket-calculator":
        return <FencePicketCalculator />;
      case "fence-post-calculator":
        return <FencePostCalculator />;
      case "cabinet-dimension-calculator":
        return <CabinetDimensionCalculator />;
      case "wood-beam-span-calculator":
        return <WoodBeamSpanCalculator />;
      case "btu-heat-load-calculator":
        return <BTUHeatLoadCalculator />;
      case "air-duct-size-calculator":
        return <AirDuctSizeCalculator />;
      case "ac-tonnage-calculator":
        return <ACTonnageCalculator />;
      case "wire-size-awg-calculator":
        return <WireSizeAWGCalculator />;
      case "voltage-drop-calculator":
        return <VoltageDropCalculator />;
      case "ohms-law-calculator":
        return <OhmsLawCalculator />;
      case "power-factor-calculator":
        return <PowerFactorCalculator />;
      case "conduit-fill-calculator":
        return <ConduitFillCalculator />;
      case "pipe-volume-calculator":
        return <PipeVolumeCalculator />;
      case "water-flow-rate-calculator":
        return <WaterFlowRateCalculator />;
      case "vertical-tank-capacity-calculator":
        return <VerticalTankCapacityCalculator />;
      case "horizontal-tank-capacity-calculator":
        return <HorizontalTankCapacityCalculator />;
      case "pump-head-calculator":
        return <PumpHeadCalculator />;
      case "solar-panel-array-calculator":
        return <SolarPanelArrayCalculator />;
      case "insulation-r-value-calculator":
        return <InsulationRValueCalculator />;

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

      // Education
      case "gpa-calculator":
        return <GPACalculator />;
      case "cgpa-calculator":
        return <CGPACalculator />;
      case "grade-calculator":
        return <GradeCalculator />;
      case "marks-percentage-calculator":
        return <MarksPercentageCalculator />;
      case "letter-grade-converter":
        return <LetterGradeConverter />;
      case "attendance-calculator":
        return <AttendanceCalculator />;
      case "study-time-calculator":
        return <StudyTimeCalculator />;
      case "exam-countdown-timer":
        return <ExamCountdownTimer />;
      case "student-loan-calculator":
        return <StudentLoanCalculator />;

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
    document.title = `${title} | CalcSmart24`;

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
          <SEOContentSection slug={slug} title={title} toolData={toolData} />

          {/* Cross-Category Internal Links */}
          {(() => {
            const crossLinks = getRelatedCalculators(slug);
            if (crossLinks.length === 0) return null;
            return (
              <section className="pt-8 border-t" data-testid="cross-category-links">
                <h3 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                  <Link2 className="h-6 w-6 text-primary" />
                  You May Also Like
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {crossLinks.map((link) => (
                    <Link key={link.slug} href={link.href}>
                      <a className="block group" data-testid={`cross-link-${link.slug}`}>
                        <div className="flex items-center gap-3 p-4 rounded-lg border bg-card hover:border-primary/50 hover:shadow-sm transition-all">
                          <div className="bg-primary/10 p-2 rounded-full text-primary shrink-0">
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                          <span className="font-medium text-sm group-hover:text-primary transition-colors">{link.name}</span>
                        </div>
                      </a>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })()}

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
