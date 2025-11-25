import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";
import StandardCalculator from "@/components/StandardCalculator";

export default function MathPage() {
  const calculators = [
    "Scientific Calculator", "Fraction Calculator", "Percentage Calculator", 
    "Random Number Generator", "Triangle Calculator", "Volume Calculator",
    "Standard Deviation", "Quadratic Formula", "Logarithm Calculator",
    "Ratio Calculator", "Root Calculator", "Binary Calculator"
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <section className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/20">
              <Calculator className="h-8 w-8" />
            </div>
            Math Calculators
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Solve complex math problems instantly. From basic arithmetic to advanced scientific equations, 
            our math tools are designed for students, teachers, and professionals.
          </p>
        </section>

        {/* Featured Tool */}
        <section className="max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Standard Calculator</h2>
          <StandardCalculator />
        </section>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
          {calculators.map((calc) => (
            <Card key={calc} className="hover:border-blue-500/50 transition-all hover:shadow-md cursor-pointer">
              <CardHeader>
                <CardTitle className="text-base">{calc}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Compute {calc.toLowerCase()} online.</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}