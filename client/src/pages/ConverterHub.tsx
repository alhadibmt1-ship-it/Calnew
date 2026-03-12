import { Link } from "wouter";
import { ArrowRightLeft, Calculator } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import {
  converterCategories,
  converterDefinitions,
  getPopularConverters,
} from "@/lib/converter-data";

export default function ConverterHub() {
  const popular = getPopularConverters(10);
  const total = converterDefinitions.length;

  return (
    <Layout>
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Unit Converters</h1>
        <p className="text-lg text-muted-foreground mb-8">
          {total}+ free online unit converters. Convert length, weight, temperature, volume, and more instantly.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {converterCategories.map(cat => {
            const count = converterDefinitions.filter(d => d.category === cat.slug).length;
            return (
              <Link key={cat.slug} href={`/convert/${cat.slug}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="pt-5">
                    <div className="flex items-start gap-3">
                      <ArrowRightLeft className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <h2 className="font-bold text-lg">{cat.name}</h2>
                        <p className="text-sm text-muted-foreground mt-1">{cat.description}</p>
                        <p className="text-xs font-medium text-primary mt-2">{count} converters</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <h2 className="text-2xl font-bold mb-4">Popular Converters</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {popular.map(c => (
            <Link key={c.slug} href={`/convert/${c.slug}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="pt-4 flex items-center gap-2">
                  <ArrowRightLeft className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm font-medium">{c.name}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
}
