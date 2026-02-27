import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import CategoryHub from "@/pages/CategoryHub";
import CalculatorPage from "@/pages/CalculatorPage";
import PrivacyPolicy from "@/pages/PrivacyPolicy";

import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Terms from "@/pages/Terms";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/financial" component={CategoryHub} />
      <Route path="/health" component={CategoryHub} />
      <Route path="/math" component={CategoryHub} />
      <Route path="/converters" component={CategoryHub} />
      <Route path="/seo-tools" component={CategoryHub} />
      <Route path="/other" component={CategoryHub} />
      <Route path="/construction" component={CategoryHub} />
      <Route path="/terms" component={Terms} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/calculator/:slug" component={CalculatorPage} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;