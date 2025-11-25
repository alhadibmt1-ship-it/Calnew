import Layout from "@/components/Layout";
import StandardCalculator from "@/components/StandardCalculator";
import BMICalculator from "@/components/BMICalculator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, 
  TrendingUp, 
  Heart, 
  Calendar, 
  DollarSign, 
  Percent, 
  Ruler, 
  FlaskConical 
} from "lucide-react";

export default function Home() {
  const categories = [
    {
      title: "Financial Calculators",
      icon: <DollarSign className="h-5 w-5" />,
      items: ["Mortgage Calculator", "Loan Calculator", "Auto Loan Calculator", "Interest Calculator", "Retirement Calculator", "Amortization Calculator"]
    },
    {
      title: "Fitness & Health",
      icon: <Heart className="h-5 w-5" />,
      items: ["BMI Calculator", "Calorie Calculator", "Body Fat Calculator", "BMR Calculator", "Ideal Weight Calculator", "Pregnancy Calculator"]
    },
    {
      title: "Math Calculators",
      icon: <Calculator className="h-5 w-5" />,
      items: ["Scientific Calculator", "Fraction Calculator", "Percentage Calculator", "Random Number Generator", "Triangle Calculator", "Volume Calculator"]
    },
    {
      title: "Other Calculators",
      icon: <Calendar className="h-5 w-5" />,
      items: ["Age Calculator", "Date Calculator", "Time Calculator", "GPA Calculator", "Password Generator", "Concrete Calculator"]
    }
  ];

  return (
    <Layout>
      <div className="grid gap-8 md:grid-cols-12">
        {/* Main Left Column */}
        <div className="md:col-span-8 space-y-10">
          
          {/* Hero Section */}
          <section className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Free Online Calculators
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Quick, free, and accurate online calculators. From simple math to complex financial planning, we have the tools you need.
            </p>
          </section>

          {/* Standard Calculator - Prominent */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Calculator className="h-6 w-6 text-primary" />
              Standard Calculator
            </h2>
            <StandardCalculator />
          </section>

           {/* Featured Calculator - BMI */}
           <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Heart className="h-6 w-6 text-rose-500" />
              Featured: BMI Calculator
            </h2>
            <div className="max-w-2xl">
              <BMICalculator />
            </div>
          </section>

          {/* All Categories */}
          <div className="grid gap-6 sm:grid-cols-2">
            {categories.map((cat) => (
              <Card key={cat.title} className="h-full hover:border-primary/50 transition-colors">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="p-2 rounded-md bg-primary/10 text-primary">
                      {cat.icon}
                    </div>
                    {cat.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {cat.items.map((item) => (
                      <li key={item}>
                        <a href="#" className="text-sm text-muted-foreground hover:text-primary hover:underline flex items-center gap-1 group">
                          <span className="w-1 h-1 rounded-full bg-muted-foreground group-hover:bg-primary" />
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

        </div>

        {/* Sidebar Right Column */}
        <div className="md:col-span-4 space-y-8">
          
          {/* Popular Now */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Popular Now
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {[
                  "Mortgage Calculator",
                  "BMI Calculator",
                  "Age Calculator",
                  "Percentage Calculator",
                  "Time Calculator"
                ].map((item, i) => (
                  <a 
                    key={item} 
                    href="#" 
                    className="block px-6 py-3 text-sm hover:bg-muted/50 transition-colors flex items-center justify-between group"
                  >
                    {item}
                    <span className="text-xs text-muted-foreground group-hover:text-foreground">Go &rarr;</span>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Tools */}
          <Card className="bg-slate-900 text-slate-50">
            <CardHeader>
              <CardTitle className="text-lg text-slate-50">Quick Converters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Length (m to ft)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input type="number" placeholder="Meters" className="bg-slate-800 border-slate-700 rounded px-3 py-2 text-sm" />
                  <input type="number" placeholder="Feet" className="bg-slate-800 border-slate-700 rounded px-3 py-2 text-sm" readOnly />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Temp (°C to °F)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input type="number" placeholder="°C" className="bg-slate-800 border-slate-700 rounded px-3 py-2 text-sm" />
                  <input type="number" placeholder="°F" className="bg-slate-800 border-slate-700 rounded px-3 py-2 text-sm" readOnly />
                </div>
              </div>
              <Button variant="secondary" className="w-full">View All Converters</Button>
            </CardContent>
          </Card>

        </div>
      </div>
    </Layout>
  );
}