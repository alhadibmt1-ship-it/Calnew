import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home, Search } from "lucide-react";
import { Link } from "wouter";
import Layout from "@/components/Layout";

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-[60vh] w-full flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <div className="flex justify-center mb-6">
            <div className="bg-muted p-6 rounded-full">
              <FileQuestion className="h-16 w-16 text-muted-foreground" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Page Not Found</h1>
            <p className="text-lg text-muted-foreground">
              Sorry, we couldn't find the calculator or page you're looking for. It might have been moved or deleted.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                <Home className="h-4 w-4" />
                Return Home
              </Button>
            </Link>
            <Link href="/financial">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
                <Search className="h-4 w-4" />
                Browse Calculators
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
