import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { Link } from "wouter";

export default function Financial() {
  const calculators = [
    "Loan EMI Calculator", "Mortgage Calculator", "Compound Interest Calculator", 
    "Simple Interest Calculator", "Profit Margin Calculator", "GST/VAT Calculator", 
    "Salary Calculator", "Currency Converter", "Saving Goal Calculator", 
    "Tax Calculator", "Discount Calculator", "Investment Calculator",
    "Auto Loan Calculator", "Retirement Calculator", "Amortization Calculator"
  ];

  const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

  return (
    <Layout>
      <div className="space-y-8">
        <section className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <DollarSign className="h-8 w-8" />
            </div>
            Finance & Business Calculators
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Plan your financial future with our comprehensive suite of free financial calculators. 
            Whether you're buying a home, planning for retirement, or managing debt, we have the tools to help you make informed decisions.
          </p>
        </section>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {calculators.map((calc) => (
            <Link key={calc} href={`/calculator/${slugify(calc)}`}>
              <a className="block h-full">
                <Card className="h-full hover:border-primary/50 transition-all hover:shadow-md cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-base">{calc}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Calculate {calc.toLowerCase()} instantly.</p>
                  </CardContent>
                </Card>
              </a>
            </Link>
          ))}
        </div>
        
        <section className="prose dark:prose-invert max-w-none mt-12">
          <h2>Why Use Our Financial Calculators?</h2>
          <p>
            Financial planning can be complex. Our calculators simplify the process by allowing you to input your specific variables 
            and see immediate projections. From estimating monthly mortgage payments to understanding compound interest, 
            these tools provide the clarity you need to manage your money effectively.
          </p>
        </section>
      </div>
    </Layout>
  );
}