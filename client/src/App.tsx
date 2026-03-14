import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, lazy, Suspense } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Home from "@/pages/Home";

const CategoryHub = lazy(() => import("@/pages/CategoryHub"));
const CalculatorPage = lazy(() => import("@/pages/CalculatorPage"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const ConverterHub = lazy(() => import("@/pages/ConverterHub"));
const ConvertRouter = lazy(() => import("@/pages/ConvertRouter"));
const BlogHub = lazy(() => import("@/pages/BlogHub"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Terms = lazy(() => import("@/pages/Terms"));
const NotFound = lazy(() => import("@/pages/not-found"));

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function LazyFallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}

function AppRoutes() {
  return (
    <>
      <Route path="/" component={Home} />
      <Route path="/financial" component={CategoryHub} />
      <Route path="/health" component={CategoryHub} />
      <Route path="/math" component={CategoryHub} />
      <Route path="/converters" component={CategoryHub} />
      <Route path="/seo-tools" component={CategoryHub} />
      <Route path="/other" component={CategoryHub} />
      <Route path="/business" component={CategoryHub} />
      <Route path="/education" component={CategoryHub} />
      <Route path="/construction" component={CategoryHub} />
      <Route path="/terms" component={Terms} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/calculator/:slug" component={CalculatorPage} />
      <Route path="/convert" component={ConverterHub} />
      <Route path="/convert/:slug" component={ConvertRouter} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/blog" component={BlogHub} />
      <Route path="/blog/:slug" component={BlogPost} />
    </>
  );
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<LazyFallback />}>
        <Switch>
          <Route path="/:lang/financial" component={CategoryHub} />
          <Route path="/:lang/health" component={CategoryHub} />
          <Route path="/:lang/math" component={CategoryHub} />
          <Route path="/:lang/converters" component={CategoryHub} />
          <Route path="/:lang/seo-tools" component={CategoryHub} />
          <Route path="/:lang/other" component={CategoryHub} />
          <Route path="/:lang/business" component={CategoryHub} />
          <Route path="/:lang/education" component={CategoryHub} />
          <Route path="/:lang/construction" component={CategoryHub} />
          <Route path="/:lang/calculator/:slug" component={CalculatorPage} />
          <Route path="/:lang/convert" component={ConverterHub} />
          <Route path="/:lang/convert/:slug" component={ConvertRouter} />
          <Route path="/:lang/blog" component={BlogHub} />
          <Route path="/:lang/blog/:slug" component={BlogPost} />
          <Route path="/:lang/terms" component={Terms} />
          <Route path="/:lang/about" component={About} />
          <Route path="/:lang/contact" component={Contact} />
          <Route path="/:lang/privacy-policy" component={PrivacyPolicy} />
          <Route path="/:lang" component={Home} />

          <AppRoutes />

          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Router />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
