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
    description: "Plan your financial future with our comprehensive suite of free financial calculators.",
    items: [
      { name: "Loan EMI Calculator", description: "Calculate your monthly EMI payments for any loan." },
      { name: "Mortgage Calculator", description: "Estimate your monthly mortgage payments and interest." },
      { name: "Simple Interest Calculator", description: "Calculate simple interest on your principal amount." },
      { name: "Compound Interest Calculator", description: "See how your investments grow with compound interest." },
      { name: "GST VAT Calculator", description: "Calculate GST and VAT amounts inclusive or exclusive." },
      { name: "Salary Calculator", description: "Estimate your take-home pay after taxes and deductions." },
      { name: "Discount Calculator", description: "Find out the final price after applying a discount." },
      { name: "Profit Margin Calculator", description: "Calculate gross and net profit margins for your business." },
      { name: "Currency Converter", description: "Convert between global currencies with live rates." },
      { name: "Saving Goal Calculator", description: "Plan how much you need to save to reach your goals." },
      { name: "Investment Calculator", description: "Project the future value of your investments." },
      { name: "Retirement Calculator", description: "Plan for a secure and comfortable retirement." },
      { name: "Tax Calculator", description: "Estimate your income tax liability based on income." }
    ]
  },
  {
    title: "Fitness & Health",
    slug: "health",
    icon: Heart,
    description: "Track your health metrics and achieve your fitness goals with our accurate health tools.",
    items: [
      { name: "BMI Calculator", description: "Calculate your Body Mass Index (BMI) instantly." },
      { name: "Calorie Calculator", description: "Estimate daily calorie needs for weight loss or gain." },
      { name: "Body Fat Calculator", description: "Estimate your body fat percentage based on measurements." },
      { name: "Water Intake Calculator", description: "Find out how much water you should drink daily." },
      { name: "BMR Calculator", description: "Calculate your Basal Metabolic Rate (BMR)." },
      { name: "Sleep Calculator", description: "Calculate the best time to go to bed or wake up." },
      { name: "Ideal Weight Calculator", description: "Find your ideal weight range based on height." },
      { name: "Pregnancy Calculator", description: "Estimate your due date and track pregnancy milestones." },
      { name: "Ovulation Calculator", description: "Track your fertility window and ovulation dates." },
      { name: "Macro Calculator", description: "Calculate your optimal macronutrient split." }
    ]
  },
  {
    title: "Math",
    slug: "math",
    icon: Calculator,
    description: "Solve complex math problems instantly with our powerful mathematical calculators.",
    items: [
      { name: "Standard Calculator", description: "A simple calculator for basic arithmetic operations." },
      { name: "Scientific Calculator", description: "Advanced calculator for scientific and engineering math." },
      { name: "Percentage Calculator", description: "Calculate percentages, increases, and decreases." },
      { name: "Random Number Generator", description: "Generate random numbers within a specific range." },
      { name: "Geometry Calculator", description: "Calculate area, perimeter, and volume of shapes." },
      { name: "Algebra Solver", description: "Solve algebraic equations and expressions." },
      { name: "Binary to Decimal", description: "Convert binary numbers to decimal and vice versa." },
      { name: "Prime Checker", description: "Check if a number is prime or composite." },
      { name: "Fraction Calculator", description: "Add, subtract, multiply, and divide fractions." },
      { name: "Triangle Calculator", description: "Calculate angles, sides, and area of triangles." },
      { name: "Volume Calculator", description: "Calculate volume of various 3D geometric shapes." },
      { name: "Quadratic Formula", description: "Solve quadratic equations and find roots." },
      { name: "Roman Numeral Converter", description: "Convert numbers to Roman numerals and back." },
      { name: "Hex to Decimal Converter", description: "Convert hexadecimal values to decimal numbers." },
      { name: "Factor Calculator", description: "Find all factors of a given number." },
      { name: "Logarithm Calculator", description: "Calculate logarithms with any base." },
      { name: "Ratio Calculator", description: "Solve ratio and proportion problems." },
      { name: "Root Calculator", description: "Calculate square roots, cube roots, and nth roots." },
      { name: "Standard Deviation", description: "Calculate mean, variance, and standard deviation." }
    ]
  },
  {
    title: "Daily Life",
    slug: "other",
    icon: Calendar,
    description: "Simplify your daily tasks with our practical everyday calculators.",
    items: [
      { name: "Age Calculator", description: "Calculate your exact age in years, months, and days." },
      { name: "Date Calculator", description: "Calculate the duration between two dates." },
      { name: "Time Calculator", description: "Add or subtract time values easily." },
      { name: "Tip Calculator", description: "Calculate tips and split bills among friends." },
      { name: "Age Gap Calculator", description: "Calculate the age difference between two people." },
      { name: "Birthday Countdown", description: "Count down the days, hours, and minutes to your birthday." },
      { name: "Concrete Calculator", description: "Estimate the amount of concrete needed for a project." },
      { name: "GPA Calculator", description: "Calculate your Grade Point Average (GPA)." },
      { name: "Grade Calculator", description: "Calculate your weighted grade for a class." },
      { name: "Time Zone Converter", description: "Convert time between different time zones." },
      { name: "Subnet Calculator", description: "Calculate IP subnets and network masks." }
    ]
  },
  {
    title: "SEO & Text Tools",
    slug: "seo-tools",
    icon: Type,
    description: "Optimize your content and manage text with our SEO and utility tools.",
    items: [
      { name: "Word Counter", description: "Count words, characters, and sentences in your text." },
      { name: "Character Counter", description: "Count characters with or without spaces." },
      { name: "Password Generator", description: "Generate strong, secure passwords instantly." },
      { name: "Case Converter", description: "Convert text to uppercase, lowercase, title case, etc." },
      { name: "QR Code Generator", description: "Create custom QR codes for URLs and text." },
      { name: "Text Repeater", description: "Repeat text multiple times with one click." },
      { name: "Color Picker Tool", description: "Get HEX, RGB, and HSL values for any color." }
    ]
  },
  {
    title: "Unit Converters",
    slug: "converters",
    icon: RefreshCcw,
    description: "Convert between different units of measurement quickly and accurately.",
    items: [
      { name: "Length Converter", description: "Convert between meters, feet, inches, and more." },
      { name: "Weight Converter", description: "Convert between kilograms, pounds, ounces, etc." },
      { name: "Temperature Converter", description: "Convert Celsius, Fahrenheit, and Kelvin." },
      { name: "Area Converter", description: "Convert between square meters, acres, hectares, etc." },
      { name: "Volume Converter", description: "Convert liters, gallons, milliliters, and cups." },
      { name: "Speed Converter", description: "Convert between km/h, mph, m/s, and knots." },
      { name: "Time Converter", description: "Convert between seconds, minutes, hours, and days." },
      { name: "Pressure Converter", description: "Convert between pascal, bar, psi, and atm." },
      { name: "Energy Converter", description: "Convert between joules, calories, and kilowatt-hours." },
      { name: "Power Converter", description: "Convert between watts, horsepower, and kilowatts." }
    ]
  }
];

export const getAllTools = () => {
  return calculatorCategories.flatMap(cat => cat.items.map(item => ({
    name: item.name,
    description: item.description,
    category: cat.title,
    categorySlug: cat.slug,
    slug: item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    href: `/calculator/${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`
  })));
};