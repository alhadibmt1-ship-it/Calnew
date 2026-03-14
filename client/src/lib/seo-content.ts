import type { Language } from "@/lib/i18n/types";

interface SEOContentSection {
  whatIs: string;
  howFormulaWorks: string;
  howToUse: string[];
  exampleTitle: string;
  exampleContent: string;
}

const contentTemplates: Record<string, SEOContentSection> = {
  "loan-emi-calculator": {
    whatIs: "The Loan EMI Calculator helps you calculate your Equated Monthly Installment (EMI) for any loan. Simply enter your loan amount, interest rate, and tenure to get your exact monthly payment, total interest, and total amount payable.",
    howFormulaWorks: "EMI = P × r × (1+r)^n / ((1+r)^n - 1), where P is the principal loan amount, r is the monthly interest rate (annual rate / 12 / 100), and n is the total number of monthly payments.",
    howToUse: ["Enter your loan amount", "Enter the annual interest rate", "Select the loan tenure in months or years", "Click Calculate to see your EMI breakdown"],
    exampleTitle: "Loan of $100,000 at 8% for 5 years",
    exampleContent: "Monthly EMI = $2,027.64 | Total Interest = $21,658.40 | Total Payment = $121,658.40",
  },
  "bmi-calculator": {
    whatIs: "The BMI Calculator computes your Body Mass Index using your height and weight. BMI is a widely used screening tool that categorizes you as underweight, normal weight, overweight, or obese.",
    howFormulaWorks: "BMI = Weight (kg) / Height (m)². For imperial units: BMI = (Weight in lbs × 703) / (Height in inches)².",
    howToUse: ["Enter your weight in kg or lbs", "Enter your height in cm or feet/inches", "Click Calculate to see your BMI and category"],
    exampleTitle: "Person weighing 70 kg, height 175 cm",
    exampleContent: "BMI = 70 / (1.75)² = 22.9 → Normal weight range (18.5 – 24.9)",
  },
  "percentage-calculator": {
    whatIs: "The Percentage Calculator helps you find percentages, calculate percentage increase/decrease, and determine what percentage one number is of another. Essential for shopping discounts, grade calculations, and financial analysis.",
    howFormulaWorks: "Percentage = (Part / Whole) × 100. For increase: ((New - Old) / Old) × 100. For decrease: ((Old - New) / Old) × 100.",
    howToUse: ["Choose the type of percentage calculation", "Enter the required values", "Click Calculate for instant results"],
    exampleTitle: "What is 15% of 200?",
    exampleContent: "15% of 200 = (15 / 100) × 200 = 30",
  },
  "mortgage-calculator": {
    whatIs: "The Mortgage Calculator estimates your monthly mortgage payment including principal, interest, taxes, and insurance. Compare different loan scenarios to find the best option for buying your home.",
    howFormulaWorks: "M = P × [r(1+r)^n] / [(1+r)^n - 1], where M is monthly payment, P is principal, r is monthly interest rate, and n is total number of payments.",
    howToUse: ["Enter the home price and down payment", "Enter the interest rate and loan term", "Add property tax and insurance if desired", "View your monthly breakdown and amortization"],
    exampleTitle: "$300,000 mortgage at 6.5% for 30 years",
    exampleContent: "Monthly Payment = $1,896.20 | Total Interest = $382,633.47 | Total Cost = $682,633.47",
  },
  "compound-interest-calculator": {
    whatIs: "The Compound Interest Calculator shows how your money grows over time with the power of compound interest. See the difference between simple and compound interest with visual charts.",
    howFormulaWorks: "A = P(1 + r/n)^(nt), where A is the final amount, P is the principal, r is the annual rate, n is compounding frequency, and t is time in years.",
    howToUse: ["Enter your initial investment amount", "Enter the annual interest rate", "Select the compounding frequency", "Enter the investment duration", "Click Calculate to see growth projections"],
    exampleTitle: "$10,000 at 7% compounded monthly for 10 years",
    exampleContent: "Final Amount = $20,096.61 | Interest Earned = $10,096.61 | Growth = 100.97%",
  },
  "concrete-calculator": {
    whatIs: "The Concrete Calculator helps you estimate the amount of concrete needed for slabs, footings, columns, and walls. Calculate volumes in cubic yards or cubic meters and estimate the number of bags required.",
    howFormulaWorks: "For rectangular slabs: Volume = Length × Width × Depth. For cylinders: Volume = π × r² × h. Results are converted to cubic yards (÷ 27) or cubic meters.",
    howToUse: ["Select the shape type (slab, cylinder, etc.)", "Enter dimensions in your preferred units", "Add 10-15% waste factor", "View concrete volume and bag estimates"],
    exampleTitle: "10 ft × 12 ft slab, 4 inches thick",
    exampleContent: "Volume = 10 × 12 × 0.333 = 40 cu ft = 1.48 cubic yards ≈ 67 bags (80 lb)",
  },
  "roi-calculator": {
    whatIs: "The ROI Calculator measures the return on your investment relative to its cost. Compare different investment opportunities by calculating ROI percentage and annualized returns.",
    howFormulaWorks: "ROI = ((Gain from Investment - Cost of Investment) / Cost of Investment) × 100. Annualized ROI = ((1 + ROI)^(1/years) - 1) × 100.",
    howToUse: ["Enter the initial investment cost", "Enter the final value or gain", "Optionally enter the investment period", "View ROI percentage and annualized return"],
    exampleTitle: "Investment of $5,000 grew to $7,500 in 3 years",
    exampleContent: "ROI = ((7,500 - 5,000) / 5,000) × 100 = 50% | Annualized ROI = 14.47%",
  },
  "markup-calculator": {
    whatIs: "The Markup Calculator helps businesses determine selling prices based on cost and desired markup percentage. Essential for retail pricing, wholesale calculations, and profit planning.",
    howFormulaWorks: "Selling Price = Cost × (1 + Markup% / 100). Markup% = ((Selling Price - Cost) / Cost) × 100.",
    howToUse: ["Enter the cost price of your product", "Enter your desired markup percentage", "View the selling price and profit amount"],
    exampleTitle: "Product cost $40 with 60% markup",
    exampleContent: "Selling Price = $40 × 1.60 = $64 | Profit = $24 per unit",
  },
  "break-even-calculator": {
    whatIs: "The Break-Even Calculator helps you determine the point where your total revenue equals total costs. Know exactly how many units you need to sell or how much revenue you need to cover all expenses.",
    howFormulaWorks: "Break-Even Units = Fixed Costs / (Price per Unit - Variable Cost per Unit). Break-Even Revenue = Fixed Costs / (1 - Variable Cost Ratio).",
    howToUse: ["Enter your fixed costs", "Enter the selling price per unit", "Enter the variable cost per unit", "View break-even point in units and revenue"],
    exampleTitle: "Fixed costs $10,000, price $50, variable cost $30",
    exampleContent: "Break-Even = 10,000 / (50 - 30) = 500 units | Revenue needed = $25,000",
  },
  "cement-calculator": {
    whatIs: "The Cement Calculator estimates the quantity of cement, sand, and aggregate needed for your construction project based on concrete volume and mix ratio.",
    howFormulaWorks: "For a standard 1:2:4 mix ratio, cement bags = (Volume × 1.54) / (sum of ratio × bag volume). Adjusts for different mix ratios and wastage.",
    howToUse: ["Enter the volume of concrete needed", "Select the mix ratio (1:2:4, 1:1.5:3, etc.)", "View cement bags, sand, and aggregate quantities"],
    exampleTitle: "1 cubic meter of M20 (1:1.5:3) concrete",
    exampleContent: "Cement = 8.22 bags (50kg) | Sand = 0.45 m³ | Aggregate = 0.89 m³",
  },
  "brick-calculator": {
    whatIs: "The Brick Calculator estimates the number of bricks needed for your wall or structure based on wall dimensions and brick size, including mortar joints.",
    howFormulaWorks: "Number of Bricks = Wall Area / (Brick Length + Mortar) × (Brick Height + Mortar). Add 5-10% for wastage.",
    howToUse: ["Enter wall length, height, and thickness", "Enter brick dimensions and mortar thickness", "View total bricks needed with wastage allowance"],
    exampleTitle: "10 ft × 8 ft wall with standard bricks",
    exampleContent: "Wall area = 80 sq ft ≈ 525 standard bricks (including 5% wastage)",
  },
  "gpa-calculator": {
    whatIs: "The GPA Calculator computes your Grade Point Average on a 4.0 scale. Enter your courses, grades, and credit hours to get your semester or cumulative GPA.",
    howFormulaWorks: "GPA = Sum of (Grade Points × Credit Hours) / Total Credit Hours. Each letter grade maps to a point value (A=4.0, B=3.0, C=2.0, D=1.0, F=0.0).",
    howToUse: ["Add each course with its name and credit hours", "Select the grade received for each course", "View your calculated GPA"],
    exampleTitle: "4 courses: A (3cr), B+ (3cr), A- (4cr), B (3cr)",
    exampleContent: "Quality Points = 12 + 9.9 + 14.8 + 9 = 45.7 | Credits = 13 | GPA = 3.52",
  },
};

export function getSEOContent(slug: string): SEOContentSection | null {
  return contentTemplates[slug] || null;
}

export function getGenericSEOContent(name: string, description: string): SEOContentSection {
  return {
    whatIs: `The ${name} is a free online tool that helps you ${description.toLowerCase().replace(/\.$/, "")}. Get instant, accurate results with our easy-to-use calculator.`,
    howFormulaWorks: `Enter your values and our ${name} will compute the result using standard mathematical formulas. All calculations happen instantly in your browser.`,
    howToUse: [
      "Enter the required values in the input fields",
      "Click the Calculate button",
      "View your results instantly",
      "Use Clear to reset and try different values",
    ],
    exampleTitle: `Using the ${name}`,
    exampleContent: `Enter your values and get instant, accurate results. Try different scenarios to compare outcomes.`,
  };
}

export function getAllSEOContentSlugs(): string[] {
  return Object.keys(contentTemplates);
}
