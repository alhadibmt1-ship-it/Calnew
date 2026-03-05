import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { calculatorCategories } from "@/lib/calculator-data";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";

export default function CategoryHub() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  // Identify category from the URL path
  const currentCategory = calculatorCategories.find(cat => 
    location.includes(cat.slug)
  );

  if (!currentCategory) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold">Category Not Found</h1>
          <Link href="/"><Button className="mt-4">Return Home</Button></Link>
        </div>
      </Layout>
    );
  }

  const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="space-y-4 bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-800">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <currentCategory.icon className="h-8 w-8" />
            </div>
            {currentCategory.title} Tools
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            {currentCategory.description}
          </p>
        </section>

        {/* Tools Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {currentCategory.items.map((item) => (
            <Link key={item.name} href={`/calculator/${slugify(item.name)}`}>
              <a className="block h-full group">
                <Card className="h-full transition-all hover:shadow-md hover:border-primary/50 cursor-pointer flex flex-col">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors flex items-center justify-between">
                      {item.name}
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </a>
            </Link>
          ))}
        </div>
        
        {/* SEO / Info Section */}
        <section className="prose dark:prose-invert max-w-none mt-16 border-t pt-12">
          <h2>Why use our {currentCategory.title} tools?</h2>
          <p>
            Our {currentCategory.title.toLowerCase()} collection is designed to provide precise and instant answers for your needs. 
            Whether you are looking for {currentCategory.items[0].name.toLowerCase()} or {currentCategory.items[1].name.toLowerCase()}, 
            CalcSmart24 ensures accuracy and ease of use.
          </p>
          <p>
            All calculators are free to use, mobile-friendly, and require no registration. Bookmark this page to have quick access to 
            essential {currentCategory.title.toLowerCase()} utilities whenever you need them.
          </p>
        </section>
      </div>
    </Layout>
  );
}