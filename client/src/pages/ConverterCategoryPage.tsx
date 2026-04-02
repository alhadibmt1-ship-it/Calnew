import { useRoute, Link } from "wouter";
import { useMemo, useEffect } from "react";
import { ArrowRightLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import {
  getConvertersByCategory,
  converterCategories,
  converterDefinitions,
} from "@/lib/converter-data";

export default function ConverterCategoryPage() {
  const [, params] = useRoute("/convert/:category");
  const category = params?.category || "";
  const catInfo = converterCategories.find(c => c.slug === category);
  const converters = useMemo(() => getConvertersByCategory(category), [category]);

  useEffect(() => {
    if (!catInfo) return;
    document.title = `${catInfo.name} Converters | CalcSmart24`;
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("description", `Free online ${catInfo.name.toLowerCase()} converters. ${catInfo.description} Convert instantly with ${converters.length} tools.`);
  }, [catInfo, converters.length]);

  if (!catInfo || converters.length === 0) return null;

  return (
    <Layout>
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <nav className="text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/convert" className="hover:underline">Converters</Link>
          <span className="mx-2">/</span>
          <span>{catInfo.name}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold mb-2">{catInfo.name} Converters</h1>
        <p className="text-lg text-muted-foreground mb-8">{catInfo.description}</p>
        <p className="text-sm text-muted-foreground mb-6">{converters.length} converters available</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {converters.map(c => (
            <Link key={c.slug} href={`/convert/${c.slug}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="pt-4 flex items-start gap-3">
                  <ArrowRightLeft className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm">{c.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{c.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Other Categories</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {converterCategories.filter(c => c.slug !== category).map(cat => (
              <Link key={cat.slug} href={`/convert/${cat.slug}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-4">
                    <h3 className="font-semibold">{cat.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {converterDefinitions.filter(d => d.category === cat.slug).length} converters
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
