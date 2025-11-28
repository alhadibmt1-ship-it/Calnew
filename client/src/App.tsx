import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Financial from "@/pages/Financial";
import Health from "@/pages/Health";
import MathPage from "@/pages/Math";
import Other from "@/pages/Other";
import Converters from "@/pages/Converters";
import SeoTools from "@/pages/SeoTools";
import CalculatorPage from "@/pages/CalculatorPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/financial" component={Financial} />
      <Route path="/health" component={Health} />
      <Route path="/math" component={MathPage} />
      <Route path="/converters" component={Converters} />
      <Route path="/seo-tools" component={SeoTools} />
      <Route path="/other" component={Other} />
      <Route path="/calculator/:slug" component={CalculatorPage} />
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