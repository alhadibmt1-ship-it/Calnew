import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Info, Target, Users } from "lucide-react";

export default function About() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-12 py-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">About CalcSmart24</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your trusted destination for free, accurate, and instant online calculations.
          </p>
        </div>

        <Card>
          <CardContent className="p-8 md:p-12 prose dark:prose-invert max-w-none">
            <div className="grid md:grid-cols-2 gap-12 items-center not-prose mb-12">
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl text-primary mb-2">
                  <Target className="h-8 w-8" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At CalcSmart24, we believe that complex calculations shouldn't be a barrier to making informed decisions. 
                  Our mission is to provide accessible, highly accurate, and easy-to-use calculator tools for everyone—from 
                  students and professionals to individuals managing their daily finances or health.
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border">
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 p-2 rounded-lg h-fit">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">100% Free Forever</h3>
                      <p className="text-sm text-muted-foreground">No hidden fees, no subscriptions, no paywalls.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 p-2 rounded-lg h-fit">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Privacy First</h3>
                      <p className="text-sm text-muted-foreground">Calculations happen on your device. We don't store your data.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 p-2 rounded-lg h-fit">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Lightning Fast</h3>
                      <p className="text-sm text-muted-foreground">Instant results without reloading the page.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <h2>Who We Are</h2>
            <p>
              CalcSmart24 was founded by a team of developers and math enthusiasts who noticed a gap in the market. 
              While there were many calculator websites available, most were cluttered with intrusive ads, difficult to navigate on mobile devices, or overly complicated for basic needs.
            </p>
            <p>
              We decided to build a platform that prioritizes user experience above all else. A clean interface, fast load times, and logical categorization make CalcSmart24 the ultimate utility hub for your daily web browsing.
            </p>

            <h2>What We Offer</h2>
            <p>We currently host over 50 specialized calculators across multiple categories:</p>
            <ul>
              <li><strong>Financial Tools:</strong> Mortgage, Loan EMI, Compound Interest, and Tax calculators to help you manage your wealth.</li>
              <li><strong>Health & Fitness:</strong> BMI, Calorie, and Body Fat calculators to track your wellness journey.</li>
              <li><strong>Math & Algebra:</strong> Scientific calculators, equation solvers, and geometry tools for students and professionals.</li>
              <li><strong>Unit Converters:</strong> Instantly convert length, weight, temperature, and more.</li>
              <li><strong>Everyday Utilities:</strong> Age, Date, and Time calculators to simplify your daily scheduling.</li>
            </ul>

            <div className="mt-12 p-8 bg-primary/5 rounded-2xl border text-center">
              <h3 className="text-2xl font-bold mt-0 mb-4">Ready to start calculating?</h3>
              <p className="mb-6">Explore our extensive collection of free tools.</p>
              <Link href="/">
                <Button size="lg" className="px-8">Browse All Calculators</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
