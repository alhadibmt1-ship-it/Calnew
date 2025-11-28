import Layout from "@/components/Layout";
import { useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Construction } from "lucide-react";
import { Link } from "wouter";
import BMICalculator from "@/components/BMICalculator";
import StandardCalculator from "@/components/StandardCalculator";
import CaloriesCalculator from "@/components/CaloriesCalculator";
import AgeCalculator from "@/components/AgeCalculator";
import LoanCalculator from "@/components/LoanCalculator";
import PercentageCalculator from "@/components/PercentageCalculator";

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
      
      // Math
      case "standard-calculator":
        return <StandardCalculator />;
      case "percentage-calculator":
        return <PercentageCalculator />;

      // Financial
      case "loan-emi-calculator":
      case "loan-calculator":
      case "mortgage-calculator": // Reusing loan calculator for now as they are similar
        return <LoanCalculator />;

      // Daily Life
      case "age-calculator":
        return <AgeCalculator />;

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