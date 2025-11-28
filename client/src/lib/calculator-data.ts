import { 
  DollarSign, 
  Heart, 
  RefreshCcw, 
  Calculator, 
  Calendar, 
  Type 
} from "lucide-react";

export const calculatorCategories = [
  {
    title: "Financial",
    slug: "financial",
    icon: DollarSign,
    items: [
      "Loan EMI Calculator", 
      "Mortgage Calculator", 
      "Simple Interest Calculator",
      "Compound Interest Calculator", 
      "GST VAT Calculator", 
      "Salary Calculator", 
      "Discount Calculator", 
      "Profit Margin Calculator", 
      "Currency Converter", 
      "Saving Goal Calculator", 
      "Investment Calculator", 
      "Retirement Calculator", 
      "Tax Calculator"
    ]
  },
  {
    title: "Fitness & Health",
    slug: "health",
    icon: Heart,
    items: [
      "BMI Calculator", 
      "Calorie Calculator", 
      "Body Fat Calculator", 
      "Water Intake Calculator", 
      "BMR Calculator", 
      "Sleep Calculator",
      "Ideal Weight Calculator",
      "Pregnancy Calculator",
      "Ovulation Calculator",
      "Macro Calculator"
    ]
  },
  {
    title: "Math",
    slug: "math",
    icon: Calculator,
    items: [
      "Standard Calculator", 
      "Scientific Calculator", 
      "Percentage Calculator", 
      "Random Number Generator", 
      "Geometry Calculator", 
      "Algebra Solver", 
      "Binary to Decimal", 
      "Prime Checker",
      "Fraction Calculator",
      "Triangle Calculator",
      "Volume Calculator",
      "Quadratic Formula",
      "Roman Numeral Converter",
      "Hex to Decimal Converter",
      "Factor Calculator",
      "Logarithm Calculator",
      "Ratio Calculator",
      "Root Calculator",
      "Standard Deviation"
    ]
  },
  {
    title: "Daily Life",
    slug: "other",
    icon: Calendar,
    items: [
      "Age Calculator", 
      "Date Calculator", 
      "Time Calculator", 
      "Tip Calculator", 
      "Age Gap Calculator", 
      "Birthday Countdown",
      "Concrete Calculator",
      "GPA Calculator",
      "Grade Calculator",
      "Time Zone Converter",
      "Subnet Calculator"
    ]
  },
  {
    title: "SEO & Text Tools",
    slug: "seo-tools",
    icon: Type,
    items: [
      "Word Counter", 
      "Character Counter", 
      "Password Generator", 
      "Case Converter", 
      "QR Code Generator", 
      "Text Repeater",
      "Color Picker Tool"
    ]
  },
  {
    title: "Unit Converters",
    slug: "converters",
    icon: RefreshCcw,
    items: [
      "Length Converter", 
      "Weight Converter", 
      "Temperature Converter", 
      "Area Converter", 
      "Volume Converter", 
      "Speed Converter",
      "Time Converter",
      "Pressure Converter",
      "Energy Converter",
      "Power Converter"
    ]
  }
];

export const getAllTools = () => {
  return calculatorCategories.flatMap(cat => cat.items.map(item => ({
    name: item,
    category: cat.title,
    categorySlug: cat.slug,
    slug: item.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    href: `/calculator/${item.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`
  })));
};