import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCcw } from "lucide-react";

export default function Converters() {
  const calculators = [
    "Length Converter", "Weight Converter", "Temperature Converter", 
    "Area Converter", "Volume Converter", "Speed Converter", 
    "Time Converter", "Pressure Converter", "Energy Converter", 
    "Power Converter"
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <section className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/20">
              <RefreshCcw className="h-8 w-8" />
            </div>
            Unit Conversion Tools
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Convert between different units of measurement instantly. From length and weight to more complex
            scientific units, our converters are accurate and easy to use.
          </p>
        </section>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {calculators.map((calc) => (
            <Card key={calc} className="hover:border-purple-500/50 transition-all hover:shadow-md cursor-pointer">
              <CardHeader>
                <CardTitle className="text-base">{calc}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Online {calc.toLowerCase()}.</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}