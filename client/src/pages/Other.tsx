import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Link } from "wouter";

export default function Other() {
  const calculators = [
    "Date Calculator", "Days Between Dates", "Age Calculator", 
    "Age Gap Calculator", "Time Calculator", "Time Zone Converter",
    "Tip Calculator", "Birthday Countdown", "GPA Calculator",
    "Grade Calculator", "Concrete Calculator", "Subnet Calculator"
  ];

  const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

  return (
    <Layout>
      <div className="space-y-8">
        <section className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900/20">
              <Calendar className="h-8 w-8" />
            </div>
            Daily Life Tools
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            A collection of useful tools for everyday life. Calculate age, dates, time, grades, and more 
            with our versatile utility calculators.
          </p>
        </section>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {calculators.map((calc) => (
            <Link key={calc} href={`/calculator/${slugify(calc)}`}>
              <a className="block h-full">
                <Card className="h-full hover:border-orange-500/50 transition-all hover:shadow-md cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-base">{calc}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Free {calc.toLowerCase()} tool.</p>
                  </CardContent>
                </Card>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}