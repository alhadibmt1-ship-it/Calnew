import Layout from "@/components/Layout";
import { blogPosts } from "@/lib/blog-data";
import { Link } from "wouter";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function BlogHub() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto" data-testid="blog-hub">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold" data-testid="text-blog-title">Blog</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Learn how to use calculators effectively with our guides, formulas, and practical examples.
          </p>
        </div>

        <div className="grid gap-6">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="hover:shadow-lg transition-all cursor-pointer group border-l-4 border-l-primary/20 hover:border-l-primary" data-testid={`card-blog-${post.slug}`}>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.publishDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {post.readTime} min read
                    </span>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{post.title}</CardTitle>
                  <CardDescription className="text-sm">{post.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    {t("readMore")} <ArrowRight className="h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
