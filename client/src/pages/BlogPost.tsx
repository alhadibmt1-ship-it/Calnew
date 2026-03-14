import { useParams, Link } from "wouter";
import Layout from "@/components/Layout";
import { getBlogPostBySlug, blogPosts } from "@/lib/blog-data";
import { Calendar, Clock, ArrowLeft, ArrowRight, Calculator } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NotFound from "./not-found";

function renderMarkdown(content: string) {
  const lines = content.trim().split("\n");
  const elements: JSX.Element[] = [];
  let inTable = false;
  let tableRows: string[][] = [];
  let tableHeaders: string[] = [];

  const flushTable = () => {
    if (tableHeaders.length > 0) {
      elements.push(
        <div key={`table-${elements.length}`} className="overflow-x-auto my-4">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-border">
                {tableHeaders.map((h, i) => (
                  <th key={i} className="text-left p-2 font-semibold">{h.trim()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, ri) => (
                <tr key={ri} className="border-b border-border">
                  {row.map((cell, ci) => (
                    <td key={ci} className="p-2">{cell.trim()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    tableHeaders = [];
    tableRows = [];
    inTable = false;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("|") && line.endsWith("|")) {
      const cells = line.split("|").filter(Boolean);
      if (cells.every(c => c.trim().match(/^[-:]+$/))) {
        continue;
      }
      if (!inTable) {
        inTable = true;
        tableHeaders = cells;
      } else {
        tableRows.push(cells);
      }
      continue;
    } else if (inTable) {
      flushTable();
    }

    if (line.startsWith("## ")) {
      elements.push(<h2 key={i} className="text-2xl font-bold mt-8 mb-4">{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={i} className="text-xl font-semibold mt-6 mb-3">{line.slice(4)}</h3>);
    } else if (line.startsWith("**Formula:**") || line.startsWith("**Example")) {
      const content = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      elements.push(
        <div key={i} className="bg-primary/5 border-l-4 border-primary p-3 my-2 rounded-r font-mono text-sm" dangerouslySetInnerHTML={{ __html: content }} />
      );
    } else if (line.match(/^\d+\.\s/)) {
      const text = line.replace(/^\d+\.\s/, "").replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>');
      elements.push(<li key={i} className="ml-6 list-decimal mb-1" dangerouslySetInnerHTML={{ __html: text }} />);
    } else if (line.startsWith("- ")) {
      const text = line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>');
      elements.push(<li key={i} className="ml-6 list-disc mb-1" dangerouslySetInnerHTML={{ __html: text }} />);
    } else if (line.trim() === "") {
      elements.push(<div key={i} className="h-2" />);
    } else {
      const text = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>');
      elements.push(<p key={i} className="text-muted-foreground leading-relaxed mb-2" dangerouslySetInnerHTML={{ __html: text }} />);
    }
  }
  if (inTable) flushTable();
  return elements;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(slug || "");

  if (!post) return <NotFound />;

  const relatedPosts = blogPosts.filter(p => p.slug !== post.slug).slice(0, 3);

  return (
    <Layout>
      <article className="max-w-3xl mx-auto" data-testid={`blog-post-${slug}`}>
        <Link href="/blog">
          <Button variant="ghost" size="sm" className="mb-4 gap-1" data-testid="link-back-blog">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Button>
        </Link>

        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary">{post.category}</Badge>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {new Date(post.publishDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {post.readTime} min read
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight" data-testid="text-blog-post-title">{post.title}</h1>
          <p className="text-lg text-muted-foreground mt-3">{post.description}</p>
        </header>

        <div className="prose prose-slate max-w-none">
          {renderMarkdown(post.content)}
        </div>

        {post.relatedCalculators.length > 0 && (
          <div className="mt-10 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              Related Calculators
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.relatedCalculators.map((calcSlug) => (
                <Link key={calcSlug} href={`/calculator/${calcSlug}`}>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors py-1.5 px-3">
                    {calcSlug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()).replace("Calculator", "").trim()} Calculator
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        )}

        {relatedPosts.length > 0 && (
          <div className="mt-10">
            <h3 className="font-semibold text-lg mb-4">Read More</h3>
            <div className="grid gap-3">
              {relatedPosts.map((rp) => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`}>
                  <Card className="hover:shadow-md transition-all cursor-pointer" data-testid={`link-related-${rp.slug}`}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{rp.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{rp.readTime} min read</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </Layout>
  );
}
