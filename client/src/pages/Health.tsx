import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import BMICalculator from "@/components/BMICalculator";
import CaloriesCalculator from "@/components/CaloriesCalculator";

export default function Health() {
  const calculators = [
    "Body Fat Calculator", "BMR Calculator", "Ideal Weight Calculator", 
    "Pregnancy Calculator", "Ovulation Calculator", "Due Date Calculator", 
    "Breath Count Calculator", "Target Heart Rate", "Water Intake Calculator", 
    "Macro Calculator", "TDEE Calculator", "Sleep Calculator"
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <section className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-900/20">
              <Heart className="h-8 w-8" />
            </div>
            Fitness & Health Calculators
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Take control of your health with our fitness and wellness calculators. 
            Track your BMI, estimate calorie needs, and monitor vital health metrics easily.
          </p>
        </section>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Featured Tool 1 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">BMI Calculator</h2>
            <BMICalculator />
          </section>

          {/* Featured Tool 2 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Calorie Calculator</h2>
            <CaloriesCalculator />
          </section>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
          {calculators.map((calc) => (
            <Card key={calc} className="hover:border-rose-500/50 transition-all hover:shadow-md cursor-pointer">
              <CardHeader>
                <CardTitle className="text-base">{calc}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Free online {calc.toLowerCase()}.</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}