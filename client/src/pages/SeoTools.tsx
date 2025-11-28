import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Type } from "lucide-react";
import { Link } from "wouter";

export default function SeoTools() {
  const calculators = [
    "Word Counter", "Character Counter", "Case Converter", 
    "Text Repeater", "QR Code Generator", "Color Picker Tool", 
    "Password Generator"
  ];

  const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

  return (
    <Layout>
      <div className="space-y-8">
        <section className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-100 text-green-600 dark:bg-green-900/20">
              <Type className="h-8 w-8" />
            </div>
            SEO & Text Tools
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Essential tools for content creators, developers, and SEO professionals. 
            Manage text, generate secure passwords, and create QR codes.
          </p>
        </section>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {calculators.map((calc) => (
            <Link key={calc} href={`/calculator/${slugify(calc)}`}>
              <a className="block h-full">
                <Card className="h-full hover:border-green-500/50 transition-all hover:shadow-md cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-base">{calc}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Free {calc.toLowerCase()}.</p>
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