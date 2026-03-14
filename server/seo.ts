export interface CalculatorToolData {
  name: string;
  slug: string;
  description: string;
  category: string;
  categorySlug: string;
  formula?: string;
}

export const calculatorCategorySlugs = [
  { title: "Financial", slug: "financial" },
  { title: "Business", slug: "business" },
  { title: "Fitness & Health", slug: "health" },
  { title: "Math", slug: "math" },
  { title: "Education", slug: "education" },
  { title: "Daily Life", slug: "other" },
  { title: "SEO & Text Tools", slug: "seo-tools" },
  { title: "Unit Converters", slug: "converters" },
  { title: "Construction", slug: "construction" },
];

const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const toolsByCategory: Record<string, { name: string; description: string }[]> = {
  financial: [
    { name: "Loan EMI Calculator", description: "Calculate your monthly EMI payments for any loan." },
    { name: "Mortgage Calculator", description: "Estimate your monthly mortgage payments and interest." },
    { name: "Auto Loan Calculator", description: "Calculate monthly car payments, total interest, and loan cost." },
    { name: "Simple Interest Calculator", description: "Calculate simple interest on your principal amount." },
    { name: "Compound Interest Calculator", description: "See how your investments grow with compound interest." },
    { name: "Amortization Calculator", description: "Generate a full loan amortization schedule with payment breakdown." },
    { name: "Payment Calculator", description: "Calculate monthly payment amounts for any loan." },
    { name: "Interest Rate Calculator", description: "Find the required interest rate to reach your financial goal." },
    { name: "Investment Calculator", description: "Project the future value of your investments." },
    { name: "Retirement Calculator", description: "Plan for a secure and comfortable retirement." },
    { name: "Saving Goal Calculator", description: "Plan how much you need to save to reach your goals." },
    { name: "Inflation Calculator", description: "Calculate the future cost of goods adjusted for inflation." },
    { name: "Currency Converter", description: "Convert between global currencies with live rates." },
    { name: "Tax Calculator", description: "Estimate your income tax liability based on income." },
    { name: "Sales Tax Calculator", description: "Calculate sales tax amounts for any purchase." },
    { name: "GST VAT Calculator", description: "Calculate GST and VAT amounts inclusive or exclusive." },
    { name: "Salary Calculator", description: "Estimate your take-home pay after taxes and deductions." },
    { name: "Salary to Hourly Calculator", description: "Convert annual salary to hourly wage and vice versa." },
    { name: "Gratuity Calculator", description: "Calculate end-of-service gratuity benefits based on labor law." },
    { name: "Discount Calculator", description: "Find out the final price after applying a discount." },
    { name: "Student Loan Calculator", description: "Calculate student loan payments with grace period and interest." },
    { name: "FHA Loan Calculator", description: "Calculate FHA loan payments with upfront and monthly MIP." },
    { name: "VA Loan Calculator", description: "Calculate VA loan payments with funding fee included." },
    { name: "Conventional Loan Calculator", description: "Calculate conventional mortgage with PMI if needed." },
    { name: "Fixed Rate Mortgage Calculator", description: "Calculate fixed-rate mortgage payments with taxes and insurance." },
    { name: "Adjustable Rate Mortgage Calculator", description: "Calculate ARM payments with initial and adjusted rates." },
    { name: "Mortgage Payoff Calculator", description: "Calculate how extra payments shorten your mortgage." },
    { name: "Early Mortgage Payoff Savings Calculator", description: "See how much you save by paying extra on your mortgage." },
    { name: "House Affordability Calculator", description: "Find out how much house you can afford based on income." },
    { name: "Rent vs Buy Calculator", description: "Compare the costs of renting versus buying a home." },
    { name: "Down Payment Calculator", description: "Calculate how long to save for a down payment." },
    { name: "Refinance Break Even Calculator", description: "Find when refinancing saves you money." },
    { name: "Boat Loan Calculator", description: "Calculate monthly boat loan payments and total cost." },
    { name: "RV Loan Calculator", description: "Calculate monthly RV loan payments and total interest." },
    { name: "Personal Loan Calculator", description: "Calculate personal loan payments and total cost." },
    { name: "Debt to Income Calculator", description: "Calculate your debt-to-income ratio." },
    { name: "Credit Card Payoff Calculator", description: "Calculate how long to pay off credit card debt." },
    { name: "Interest Only Loan Calculator", description: "Calculate interest-only and amortized payments." },
    { name: "Balloon Payment Calculator", description: "Calculate balloon payment amount at end of term." },
    { name: "Loan Comparison Calculator", description: "Compare two loans side by side." },
    { name: "Payday Loan Calculator", description: "Calculate the true cost and APR of payday loans." },
    { name: "Compound Interest Daily Calculator", description: "Calculate compound interest with daily compounding." },
    { name: "Compound Interest Monthly Calculator", description: "Calculate compound interest with monthly contributions." },
    { name: "401k Projection Calculator", description: "Project your 401k balance at retirement." },
    { name: "Roth IRA Calculator", description: "Project Roth IRA growth with tax-free withdrawals." },
    { name: "Traditional IRA Calculator", description: "Project Traditional IRA growth with tax implications." },
    { name: "Stock Profit Loss Calculator", description: "Calculate stock trading profit or loss." },
    { name: "Dividend Reinvestment Calculator", description: "Project growth with reinvested dividends." },
    { name: "CAGR Calculator", description: "Calculate Compound Annual Growth Rate." },
    { name: "Crypto ROI Calculator", description: "Calculate cryptocurrency return on investment." },
    { name: "Portfolio Rebalance Calculator", description: "Calculate trades needed to rebalance your portfolio." },
  ],
  business: [
    { name: "Profit Margin Calculator", description: "Calculate gross and net profit margins for your business." },
    { name: "Markup Calculator", description: "Calculate selling price from cost price and markup percentage." },
    { name: "Cost Price Calculator", description: "Calculate selling price from cost price and desired profit." },
    { name: "Gross Profit Calculator", description: "Calculate gross profit and gross margin from revenue and COGS." },
    { name: "Net Profit Calculator", description: "Calculate net profit with full income statement breakdown." },
    { name: "Break Even Calculator", description: "Find the break-even point in units and revenue for your business." },
    { name: "ROI Calculator", description: "Calculate Return on Investment percentage and annualized ROI." },
    { name: "Cash Flow Calculator", description: "Track income and expenses to calculate net cash flow." },
    { name: "Revenue Calculator", description: "Calculate total revenue, monthly averages, and growth rate." },
    { name: "Expense Calculator", description: "Track and categorize expenses with total and breakdown." },
    { name: "Invoice Calculator", description: "Create invoice totals with line items, subtotal, and tax." },
    { name: "Business Loan Calculator", description: "Calculate business loan payments with amortization schedule." },
    { name: "Price Per Unit Calculator", description: "Calculate the price per unit, per kg, or per piece." },
    { name: "Wholesale Price Calculator", description: "Calculate wholesale pricing with bulk discount tables." },
    { name: "Inventory Turnover Calculator", description: "Calculate inventory turnover ratio and days to sell inventory." },
    { name: "Accounts Receivable Calculator", description: "Calculate AR turnover ratio and average collection period." },
    { name: "Overtime Calculator", description: "Calculate overtime pay based on hourly rate and hours worked." },
    { name: "Customer Lifetime Value Calculator", description: "Calculate the total revenue a customer generates over their lifetime." },
    { name: "Customer Acquisition Cost Calculator", description: "Calculate cost per customer acquisition." },
    { name: "Net Promoter Score Calculator", description: "Calculate NPS from survey responses." },
    { name: "Payroll Tax Calculator", description: "Estimate payroll taxes including FICA and withholding." },
    { name: "Commission Calculator", description: "Calculate sales commissions with tiered rates." },
  ],
  health: [
    { name: "BMI Calculator", description: "Calculate your Body Mass Index (BMI) instantly." },
    { name: "Calorie Calculator", description: "Estimate daily calorie needs for weight loss or gain." },
    { name: "Body Fat Calculator", description: "Estimate your body fat percentage based on measurements." },
    { name: "Water Intake Calculator", description: "Find out how much water you should drink daily." },
    { name: "BMR Calculator", description: "Calculate your Basal Metabolic Rate (BMR)." },
    { name: "TDEE Calculator", description: "Calculate your Total Daily Energy Expenditure for diet planning." },
    { name: "Macro Calculator", description: "Calculate your optimal macronutrient split." },
    { name: "Ideal Weight Calculator", description: "Find your ideal weight range based on height." },
    { name: "Pace Calculator", description: "Calculate running or walking pace, speed, distance, and time." },
    { name: "Sleep Calculator", description: "Calculate the best time to go to bed or wake up." },
    { name: "Pregnancy Calculator", description: "Estimate your due date and track pregnancy milestones." },
    { name: "Due Date Calculator", description: "Calculate your pregnancy due date from last period or conception." },
    { name: "Ovulation Calculator", description: "Track your fertility window and ovulation dates." },
  ],
  math: [
    { name: "Standard Calculator", description: "A simple calculator for basic arithmetic operations." },
    { name: "Scientific Calculator", description: "Advanced calculator for scientific and engineering math." },
    { name: "Percentage Calculator", description: "Calculate percentages, increases, and decreases." },
    { name: "Percentage Increase Calculator", description: "Calculate the percentage increase or decrease between two values." },
    { name: "Fraction Calculator", description: "Add, subtract, multiply, and divide fractions." },
    { name: "Square Footage Calculator", description: "Calculate area in square feet for any space or room." },
    { name: "Pythagorean Theorem Calculator", description: "Find the missing side of a right triangle using the Pythagorean theorem." },
    { name: "Triangle Calculator", description: "Calculate angles, sides, and area of triangles." },
    { name: "Circumference Calculator", description: "Calculate the circumference, area, and diameter of a circle." },
    { name: "Geometry Calculator", description: "Calculate area, perimeter, and volume of shapes." },
    { name: "Volume Calculator", description: "Calculate volume of various 3D geometric shapes." },
    { name: "Slope Calculator", description: "Calculate the slope of a line from two points." },
    { name: "Quadratic Formula", description: "Solve quadratic equations and find roots." },
    { name: "Algebra Solver", description: "Solve algebraic equations and expressions." },
    { name: "Exponent Calculator", description: "Calculate the result of a base number raised to any power." },
    { name: "Logarithm Calculator", description: "Calculate logarithms with any base." },
    { name: "Root Calculator", description: "Calculate square roots, cube roots, and nth roots." },
    { name: "Factor Calculator", description: "Find all factors of a given number." },
    { name: "Prime Checker", description: "Check if a number is prime or composite." },
    { name: "Ratio Calculator", description: "Solve ratio and proportion problems." },
    { name: "Standard Deviation", description: "Calculate mean, variance, and standard deviation." },
    { name: "Scientific Notation Calculator", description: "Convert numbers to and from scientific notation." },
    { name: "Significant Figures Calculator", description: "Count and round numbers to significant figures." },
    { name: "Random Number Generator", description: "Generate random numbers within a specific range." },
    { name: "Binary to Decimal", description: "Convert binary numbers to decimal and vice versa." },
    { name: "Hex to Decimal Converter", description: "Convert hexadecimal values to decimal numbers." },
    { name: "Roman Numeral Converter", description: "Convert numbers to Roman numerals and back." },
  ],
  education: [
    { name: "GPA Calculator", description: "Calculate your Grade Point Average (GPA)." },
    { name: "CGPA Calculator", description: "Calculate cumulative GPA from semester grades and credit hours." },
    { name: "Grade Calculator", description: "Calculate your weighted grade for a class." },
    { name: "Marks Percentage Calculator", description: "Convert obtained marks to percentage with grade and pass/fail status." },
    { name: "Letter Grade Converter", description: "Convert letter grades to GPA scale and percentage equivalents." },
    { name: "Attendance Calculator", description: "Calculate your attendance percentage and classes needed to meet targets." },
    { name: "Study Time Calculator", description: "Plan study hours for each subject based on difficulty and time available." },
    { name: "Exam Countdown Timer", description: "Set exam dates and see a live countdown with days, hours, and minutes." },
  ],
  other: [
    { name: "Age Calculator", description: "Calculate your exact age in years, months, and days." },
    { name: "Date Calculator", description: "Calculate the duration between two dates." },
    { name: "Time Calculator", description: "Add or subtract time values easily." },
    { name: "Hours Calculator", description: "Add or subtract hours and minutes for time tracking." },
    { name: "Time Zone Converter", description: "Convert time between different time zones." },
    { name: "Tip Calculator", description: "Calculate tips and split bills among friends." },
    { name: "Age Gap Calculator", description: "Calculate the age difference between two people." },
    { name: "Birthday Countdown", description: "Count down the days, hours, and minutes to your birthday." },
    { name: "Fuel Cost Calculator", description: "Estimate fuel costs for any trip based on distance and efficiency." },
    { name: "Electricity Cost Calculator", description: "Estimate electricity costs for appliances and devices." },
    { name: "Shoe Size Converter", description: "Convert shoe sizes between US, UK, EU, and CM systems." },
    { name: "Subnet Calculator", description: "Calculate IP subnets and network masks." },
  ],
  "seo-tools": [
    { name: "Word Counter", description: "Count words, characters, and sentences in your text." },
    { name: "Character Counter", description: "Count characters with or without spaces." },
    { name: "Password Generator", description: "Generate strong, secure passwords instantly." },
    { name: "Case Converter", description: "Convert text to uppercase, lowercase, title case, etc." },
    { name: "QR Code Generator", description: "Create custom QR codes for URLs and text." },
    { name: "Text Repeater", description: "Repeat text multiple times with one click." },
    { name: "Color Picker Tool", description: "Get HEX, RGB, and HSL values for any color." },
  ],
  converters: [
    { name: "Length Converter", description: "Convert between meters, feet, inches, and more." },
    { name: "Weight Converter", description: "Convert between kilograms, pounds, ounces, etc." },
    { name: "Temperature Converter", description: "Convert Celsius, Fahrenheit, and Kelvin." },
    { name: "Area Converter", description: "Convert between square meters, acres, hectares, etc." },
    { name: "Volume Converter", description: "Convert liters, gallons, milliliters, and cups." },
    { name: "Speed Converter", description: "Convert between km/h, mph, m/s, and knots." },
    { name: "Time Converter", description: "Convert between seconds, minutes, hours, and days." },
    { name: "Pressure Converter", description: "Convert between pascal, bar, psi, and atm." },
    { name: "Energy Converter", description: "Convert between joules, calories, and kilowatt-hours." },
    { name: "Power Converter", description: "Convert between watts, horsepower, and kilowatts." },
    { name: "Data Storage Converter", description: "Convert between bytes, KB, MB, GB, TB, and more." },
    { name: "Fuel Efficiency Converter", description: "Convert between MPG, km/L, and L/100km." },
    { name: "Angle Converter", description: "Convert between degrees, radians, and gradians." },
  ],
  construction: [
    { name: "Concrete Calculator", description: "Estimate the amount of concrete needed for a project." },
    { name: "Cement Calculator", description: "Calculate cement bags, sand, and aggregate needed for construction." },
    { name: "Concrete Mix Calculator", description: "Calculate concrete mix quantities by ratio and volume needed." },
    { name: "Brick Calculator", description: "Calculate the number of bricks and mortar needed for a wall." },
    { name: "Steel Weight Calculator", description: "Calculate the weight of steel bars, plates, pipes, and angles." },
    { name: "Sand Calculator", description: "Calculate sand volume and weight needed for your project." },
    { name: "Tile Calculator", description: "Calculate tiles needed for floors and walls with wastage allowance." },
    { name: "Paint Calculator", description: "Calculate paint quantity needed based on room dimensions." },
    { name: "Plywood Calculator", description: "Calculate plywood sheets needed to cover an area." },
    { name: "Construction Cost Calculator", description: "Estimate total construction cost per square foot." },
    { name: "BOQ Calculator", description: "Create a Bill of Quantities with itemized costs and totals." },
    { name: "Labor Cost Calculator", description: "Calculate total labor costs including overtime for projects." },
    { name: "Material Cost Estimator", description: "Estimate total material costs with markup for projects." },
    { name: "Project Cost Calculator", description: "Calculate total project cost with materials, labor, and overhead." },
    { name: "Project Profit Calculator", description: "Calculate project profit margins from revenue and costs." },
    { name: "Concrete Slab Calculator", description: "Calculate concrete volume needed for a slab." },
    { name: "Concrete Footing Calculator", description: "Calculate concrete for footings." },
    { name: "Concrete Column Square Calculator", description: "Calculate concrete for square columns." },
    { name: "Concrete Column Round Calculator", description: "Calculate concrete for round columns." },
    { name: "Concrete Wall Calculator", description: "Calculate concrete for walls." },
    { name: "Concrete Curb Calculator", description: "Calculate concrete for curbs and gutters." },
    { name: "Concrete Stairs Calculator", description: "Calculate concrete for stairs." },
    { name: "Brick Wall Calculator", description: "Calculate bricks needed for a wall with mortar." },
    { name: "Brick Layer Calculator", description: "Calculate number of brick courses and layout." },
    { name: "Cinder Block Wall Calculator", description: "Calculate cinder blocks for a wall." },
    { name: "Mortar Mix Ratio Calculator", description: "Calculate mortar mix quantities by ratio." },
    { name: "Rebar Weight Calculator", description: "Calculate the weight of rebar by size and length." },
    { name: "Gravel Estimator", description: "Estimate gravel needed for an area." },
    { name: "Sand Estimator", description: "Estimate sand needed for an area." },
    { name: "Asphalt Paving Calculator", description: "Calculate asphalt needed for paving." },
    { name: "Wall Stud Counter", description: "Calculate studs needed for wall framing." },
    { name: "Floor Joist Size Calculator", description: "Determine floor joist size based on span." },
    { name: "Rafter Length Calculator", description: "Calculate rafter length from span and pitch." },
    { name: "Roof Pitch Calculator", description: "Calculate roof pitch from rise and run." },
    { name: "Roof Square Calculator", description: "Calculate roofing squares needed." },
    { name: "Drywall Sheet Calculator", description: "Calculate drywall sheets for walls and ceilings." },
    { name: "Siding Square Calculator", description: "Calculate siding squares needed." },
    { name: "Trim Length Calculator", description: "Calculate trim and molding lengths needed." },
    { name: "Lumber Board Foot Calculator", description: "Calculate board feet of lumber." },
    { name: "Plywood Sheet Calculator", description: "Calculate plywood sheets needed to cover an area." },
    { name: "Stair Stringer Calculator", description: "Calculate stair stringer dimensions." },
    { name: "Deck Board Calculator", description: "Calculate deck boards needed." },
    { name: "Fence Picket Calculator", description: "Calculate fence pickets needed." },
    { name: "Fence Post Calculator", description: "Calculate fence posts needed." },
    { name: "Cabinet Dimension Calculator", description: "Calculate cabinet dimensions and layout." },
    { name: "Wood Beam Span Calculator", description: "Estimate wood beam size based on span and load." },
    { name: "BTU Heat Load Calculator", description: "Calculate heating BTU requirements." },
    { name: "Air Duct Size Calculator", description: "Calculate duct size from CFM and velocity." },
    { name: "AC Tonnage Calculator", description: "Calculate AC tonnage needed for cooling." },
    { name: "Wire Size AWG Calculator", description: "Determine wire gauge based on amperage and distance." },
    { name: "Voltage Drop Calculator", description: "Calculate voltage drop in a wire run." },
    { name: "Ohms Law Calculator", description: "Calculate voltage, current, resistance, and power." },
    { name: "Power Factor Calculator", description: "Calculate power factor and apparent power." },
    { name: "Conduit Fill Calculator", description: "Calculate conduit fill percentage." },
    { name: "Pipe Volume Calculator", description: "Calculate the volume of a pipe." },
    { name: "Water Flow Rate Calculator", description: "Calculate water flow rate in pipes." },
    { name: "Vertical Tank Capacity Calculator", description: "Calculate vertical cylindrical tank capacity." },
    { name: "Horizontal Tank Capacity Calculator", description: "Calculate horizontal cylindrical tank capacity." },
    { name: "Pump Head Calculator", description: "Calculate total dynamic head for pump sizing." },
    { name: "Solar Panel Array Calculator", description: "Calculate solar panel array size and output." },
    { name: "Insulation R Value Calculator", description: "Calculate insulation R-value and thickness needed." },
  ],
};

export const converterCategorySlugs = [
  "length", "weight", "area", "volume", "temperature", "speed",
  "digital-storage", "data-transfer", "pressure", "energy", "power",
  "fuel-efficiency", "angle", "time",
];

const converterCategoryNames: Record<string, string> = {
  length: "Length", weight: "Weight", area: "Area", volume: "Volume",
  temperature: "Temperature", speed: "Speed", "digital-storage": "Digital Storage",
  "data-transfer": "Data Transfer", pressure: "Pressure", energy: "Energy",
  power: "Power", "fuel-efficiency": "Fuel Efficiency", angle: "Angle", time: "Time",
};

function convPair(cat: string, from: string, to: string): { slug: string; name: string; description: string; category: string }[] {
  const fmt = (u: string) => u.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  const s = (u: string) => u.replace(/_/g, "-");
  return [
    { slug: `${s(from)}-to-${s(to)}`, name: `${fmt(from)} to ${fmt(to)} Converter`, description: `Convert ${fmt(from)} to ${fmt(to)} instantly with our free online converter.`, category: cat },
    { slug: `${s(to)}-to-${s(from)}`, name: `${fmt(to)} to ${fmt(from)} Converter`, description: `Convert ${fmt(to)} to ${fmt(from)} instantly with our free online converter.`, category: cat },
  ];
}

export const converterPages = [
  ...convPair("length","meters","feet"),...convPair("length","meters","inches"),...convPair("length","meters","yards"),
  ...convPair("length","meters","centimeters"),...convPair("length","meters","millimeters"),...convPair("length","meters","kilometers"),
  ...convPair("length","meters","miles"),...convPair("length","kilometers","miles"),...convPair("length","centimeters","inches"),
  ...convPair("length","millimeters","inches"),...convPair("length","feet","inches"),...convPair("length","feet","centimeters"),
  ...convPair("length","feet","yards"),...convPair("length","yards","miles"),...convPair("length","inches","millimeters"),
  ...convPair("length","miles","kilometers"),...convPair("length","nautical_miles","kilometers"),...convPair("length","nautical_miles","miles"),
  ...convPair("length","micrometers","millimeters"),...convPair("length","meters","nautical_miles"),...convPair("length","feet","meters"),
  ...convPair("length","yards","meters"),...convPair("length","centimeters","feet"),...convPair("length","centimeters","millimeters"),
  ...convPair("length","kilometers","meters"),...convPair("length","inches","centimeters"),...convPair("length","miles","feet"),
  ...convPair("length","miles","yards"),...convPair("length","fathoms","feet"),...convPair("length","fathoms","meters"),
  ...convPair("length","leagues","miles"),...convPair("length","leagues","kilometers"),
  ...convPair("weight","kilograms","pounds"),...convPair("weight","kilograms","ounces"),...convPair("weight","kilograms","grams"),
  ...convPair("weight","kilograms","milligrams"),...convPair("weight","kilograms","metric_tons"),...convPair("weight","grams","ounces"),
  ...convPair("weight","grams","milligrams"),...convPair("weight","grams","pounds"),...convPair("weight","pounds","ounces"),
  ...convPair("weight","metric_tons","pounds"),...convPair("weight","metric_tons","short_tons"),...convPair("weight","short_tons","pounds"),
  ...convPair("weight","stones","pounds"),...convPair("weight","stones","kilograms"),...convPair("weight","milligrams","micrograms"),
  ...convPair("weight","carats","grams"),...convPair("weight","carats","milligrams"),...convPair("weight","troy_ounces","grams"),
  ...convPair("weight","troy_ounces","ounces"),...convPair("weight","kilograms","stones"),...convPair("weight","pounds","kilograms"),
  ...convPair("weight","ounces","grams"),...convPair("weight","long_tons","kilograms"),...convPair("weight","long_tons","metric_tons"),
  ...convPair("weight","long_tons","short_tons"),
  ...convPair("area","square_meters","square_feet"),...convPair("area","square_meters","square_inches"),
  ...convPair("area","square_meters","square_yards"),...convPair("area","square_meters","acres"),
  ...convPair("area","square_meters","hectares"),...convPair("area","square_kilometers","square_miles"),
  ...convPair("area","hectares","acres"),...convPair("area","square_feet","square_inches"),
  ...convPair("area","square_feet","square_yards"),...convPair("area","acres","square_feet"),
  ...convPair("area","square_miles","acres"),...convPair("area","square_feet","square_meters"),
  ...convPair("area","acres","hectares"),
  ...convPair("volume","liters","gallons"),...convPair("volume","liters","milliliters"),
  ...convPair("volume","liters","fluid_ounces"),...convPair("volume","liters","cups"),
  ...convPair("volume","liters","pints"),...convPair("volume","liters","quarts"),
  ...convPair("volume","gallons","quarts"),...convPair("volume","gallons","liters"),
  ...convPair("volume","cups","milliliters"),...convPair("volume","fluid_ounces","milliliters"),
  ...convPair("volume","tablespoons","teaspoons"),...convPair("volume","tablespoons","milliliters"),
  ...convPair("volume","cubic_meters","cubic_feet"),...convPair("volume","cubic_meters","liters"),
  ...convPair("volume","cubic_feet","gallons"),...convPair("volume","cubic_inches","cubic_centimeters"),
  ...convPair("temperature","celsius","fahrenheit"),...convPair("temperature","celsius","kelvin"),
  ...convPair("temperature","fahrenheit","kelvin"),
  ...convPair("speed","km_per_hour","mph"),...convPair("speed","km_per_hour","meters_per_second"),
  ...convPair("speed","mph","meters_per_second"),...convPair("speed","knots","km_per_hour"),
  ...convPair("speed","knots","mph"),...convPair("speed","meters_per_second","feet_per_second"),
  ...convPair("speed","km_per_hour","feet_per_second"),...convPair("speed","mph","feet_per_second"),
  ...convPair("speed","knots","meters_per_second"),
  ...convPair("digital-storage","bytes","kilobytes"),...convPair("digital-storage","kilobytes","megabytes"),
  ...convPair("digital-storage","megabytes","gigabytes"),...convPair("digital-storage","gigabytes","terabytes"),
  ...convPair("digital-storage","terabytes","petabytes"),...convPair("digital-storage","bytes","megabytes"),
  ...convPair("digital-storage","bytes","gigabytes"),...convPair("digital-storage","kilobytes","gigabytes"),
  ...convPair("digital-storage","megabytes","terabytes"),...convPair("digital-storage","kibibytes","mebibytes"),
  ...convPair("digital-storage","mebibytes","gibibytes"),
  ...convPair("data-transfer","kbps","mbps"),...convPair("data-transfer","mbps","gbps"),
  ...convPair("data-transfer","kbps","gbps"),...convPair("data-transfer","bytes_per_sec","kbps"),
  ...convPair("data-transfer","bytes_per_sec","mbps"),...convPair("data-transfer","mbps","kbps"),
  ...convPair("data-transfer","gbps","mbps"),
  ...convPair("pressure","psi","bar"),...convPair("pressure","bar","pascal"),
  ...convPair("pressure","atm","psi"),...convPair("pressure","atm","bar"),
  ...convPair("pressure","atm","pascal"),...convPair("pressure","psi","pascal"),
  ...convPair("pressure","psi","kilopascal"),...convPair("pressure","bar","kilopascal"),
  ...convPair("pressure","mmhg","psi"),...convPair("pressure","mmhg","pascal"),
  ...convPair("pressure","mmhg","atm"),...convPair("pressure","inhg","psi"),
  ...convPair("energy","joules","calories"),...convPair("energy","joules","kilocalories"),
  ...convPair("energy","joules","kilowatt_hours"),...convPair("energy","joules","btu"),
  ...convPair("energy","kilowatt_hours","btu"),...convPair("energy","kilowatt_hours","calories"),
  ...convPair("energy","kilowatt_hours","kilocalories"),...convPair("energy","kilowatt_hours","joules"),
  ...convPair("energy","calories","kilocalories"),...convPair("energy","btu","kilojoules"),
  ...convPair("energy","kilocalories","joules"),...convPair("energy","kilocalories","btu"),
  ...convPair("power","watts","kilowatts"),...convPair("power","watts","horsepower"),
  ...convPair("power","watts","btu_per_hour"),...convPair("power","kilowatts","horsepower"),
  ...convPair("power","kilowatts","megawatts"),...convPair("power","horsepower","btu_per_hour"),
  ...convPair("power","megawatts","horsepower"),...convPair("power","watts","megawatts"),
  ...convPair("fuel-efficiency","mpg","km_per_liter"),
  ...convPair("fuel-efficiency","km_per_liter","liters_per_100km"),
  ...convPair("fuel-efficiency","mpg","liters_per_100km"),
  ...convPair("angle","degrees","radians"),...convPair("angle","degrees","gradians"),
  ...convPair("angle","radians","gradians"),...convPair("angle","degrees","arcminutes"),
  ...convPair("angle","degrees","arcseconds"),
  ...convPair("time","seconds","minutes"),...convPair("time","seconds","hours"),
  ...convPair("time","minutes","hours"),...convPair("time","hours","days"),
  ...convPair("time","days","weeks"),...convPair("time","days","hours"),
  ...convPair("time","weeks","days"),...convPair("time","hours","minutes"),
  ...convPair("time","minutes","seconds"),...convPair("time","days","years"),
];

const converterPageMap = new Map(converterPages.map(c => [c.slug, c]));

export function getConverterPageBySlug(slug: string) {
  return converterPageMap.get(slug);
}

export function injectConverterSeoIntoHtml(html: string, converter: { slug: string; name: string; description: string; category: string }): string {
  const title = `${converter.name} - Free Online Unit Converter | CalcSmart24`;
  const description = converter.description;
  const canonicalUrl = `https://calcsmart24.com/convert/${converter.slug}`;

  html = html
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${description}"`)
    .replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${title}"`)
    .replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${description}"`)
    .replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${canonicalUrl}"`)
    .replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${title}"`)
    .replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${description}"`);

  if (!html.includes('rel="canonical"')) {
    html = html.replace("</head>", `  <link rel="canonical" href="${canonicalUrl}" />\n  </head>`);
  }

  const catName = converterCategoryNames[converter.category] || converter.category;
  const seoContent = `
    <div id="seo-content" style="display:none" aria-hidden="true">
      <h1>${converter.name}</h1>
      <p>${description}</p>
      <nav>
        <a href="/">Home</a>
        <a href="/convert">Unit Converters</a>
        <a href="/convert/${converter.category}">${catName} Converters</a>
      </nav>
    </div>`;

  html = html.replace('<div id="root"></div>', `${seoContent}\n    <div id="root"></div>`);
  return html;
}

export function injectConverterCategorySeoIntoHtml(html: string, categorySlug: string): string {
  const catName = converterCategoryNames[categorySlug];
  if (!catName) return html;

  const catConverters = converterPages.filter(c => c.category === categorySlug);
  const title = `${catName} Converters - Free Online Unit Converters | CalcSmart24`;
  const description = `${catConverters.length}+ free online ${catName.toLowerCase()} converters. Convert instantly with accurate results.`;
  const canonicalUrl = `https://calcsmart24.com/convert/${categorySlug}`;

  html = html
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${description}"`)
    .replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${title}"`)
    .replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${description}"`)
    .replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${canonicalUrl}"`)
    .replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${title}"`)
    .replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${description}"`);

  if (!html.includes('rel="canonical"')) {
    html = html.replace("</head>", `  <link rel="canonical" href="${canonicalUrl}" />\n  </head>`);
  }

  const convLinks = catConverters.map(c => `<a href="/convert/${c.slug}">${c.name}</a>`).join("\n        ");
  const seoContent = `
    <div id="seo-content" style="display:none" aria-hidden="true">
      <h1>${catName} Converters</h1>
      <p>${description}</p>
      <nav>
        <a href="/">Home</a>
        <a href="/convert">Unit Converters</a>
        ${convLinks}
      </nav>
    </div>`;

  html = html.replace('<div id="root"></div>', `${seoContent}\n    <div id="root"></div>`);
  return html;
}

export function injectConverterHubSeoIntoHtml(html: string): string {
  const title = "Unit Converters - Free Online Conversion Tools | CalcSmart24";
  const description = `${converterPages.length}+ free online unit converters. Convert length, weight, temperature, volume, and more instantly.`;
  const canonicalUrl = "https://calcsmart24.com/convert";

  html = html
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${description}"`)
    .replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${title}"`)
    .replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${description}"`)
    .replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${canonicalUrl}"`)
    .replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${title}"`)
    .replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${description}"`);

  if (!html.includes('rel="canonical"')) {
    html = html.replace("</head>", `  <link rel="canonical" href="${canonicalUrl}" />\n  </head>`);
  }

  const catLinks = converterCategorySlugs.map(s => `<a href="/convert/${s}">${converterCategoryNames[s]} Converters</a>`).join("\n        ");
  const seoContent = `
    <div id="seo-content" style="display:none" aria-hidden="true">
      <h1>Free Online Unit Converters</h1>
      <p>${description}</p>
      <nav>
        <a href="/">Home</a>
        ${catLinks}
      </nav>
    </div>`;

  html = html.replace('<div id="root"></div>', `${seoContent}\n    <div id="root"></div>`);
  return html;
}

export function getAllToolsServer(): CalculatorToolData[] {
  const tools: CalculatorToolData[] = [];
  for (const cat of calculatorCategorySlugs) {
    const items = toolsByCategory[cat.slug] || [];
    for (const item of items) {
      tools.push({
        name: item.name,
        slug: slugify(item.name),
        description: item.description,
        category: cat.title,
        categorySlug: cat.slug,
      });
    }
  }
  return tools;
}

const BASE_URL = "https://calcsmart24.com";

export interface BlogPostSeo {
  slug: string;
  title: string;
  description: string;
}

export const blogPostsSeo: BlogPostSeo[] = [
  { slug: "how-to-calculate-loan-interest", title: "How to Calculate Loan Interest: A Complete Guide", description: "Learn how to calculate loan interest, understand EMI formulas, and compare different loan types with practical examples." },
  { slug: "how-to-calculate-percentage", title: "How to Calculate Percentage: Formulas, Examples & Tips", description: "Master percentage calculations with easy formulas for increase, decrease, discount, and more." },
  { slug: "how-to-calculate-vat", title: "How to Calculate VAT: Guide for UAE, UK, India & More", description: "Learn how to calculate VAT for different countries including UAE, UK, and India." },
  { slug: "how-to-calculate-bmi", title: "How to Calculate BMI: Formula, Chart & Health Ranges", description: "Learn how to calculate your Body Mass Index (BMI), understand health ranges." },
  { slug: "how-to-calculate-concrete", title: "How to Calculate Concrete Needed: Volume, Bags & Cost", description: "Learn how to calculate concrete volume for slabs, footings, and columns." },
  { slug: "how-to-calculate-mortgage-payments", title: "How to Calculate Mortgage Payments: Complete Guide", description: "Learn the mortgage payment formula, understand amortization, and compare fixed vs adjustable rate mortgages." },
  { slug: "how-to-calculate-roi", title: "How to Calculate ROI: Return on Investment Formula & Examples", description: "Learn how to calculate ROI for business decisions, real estate, and stock investments." },
  { slug: "how-to-calculate-gpa", title: "How to Calculate GPA: Step-by-Step Guide with Examples", description: "Learn how to calculate your GPA on a 4.0 scale, understand weighted vs unweighted GPA." },
];

export function injectBlogPostSeoIntoHtml(html: string, post: BlogPostSeo): string {
  const title = `${post.title} | CalcSmart24`;
  const description = post.description;
  const canonicalUrl = `${BASE_URL}/blog/${post.slug}`;

  html = html
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${description}"`)
    .replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${title}"`)
    .replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${description}"`)
    .replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${canonicalUrl}"`)
    .replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${title}"`)
    .replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${description}"`);

  if (!html.includes('rel="canonical"')) {
    html = html.replace("</head>", `  <link rel="canonical" href="${canonicalUrl}" />\n  </head>`);
  }

  return html;
}

export function injectBlogHubSeoIntoHtml(html: string): string {
  const title = "Blog - Calculator Guides & How-To Articles | CalcSmart24";
  const description = "Learn how to use calculators effectively with our guides, formulas, and practical examples for finance, math, health, and construction.";
  const canonicalUrl = `${BASE_URL}/blog`;

  html = html
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${description}"`)
    .replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${title}"`)
    .replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${description}"`)
    .replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${canonicalUrl}"`)
    .replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${title}"`)
    .replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${description}"`);

  if (!html.includes('rel="canonical"')) {
    html = html.replace("</head>", `  <link rel="canonical" href="${canonicalUrl}" />\n  </head>`);
  }

  return html;
}

function sitemapUrl(loc: string, lastmod: string, freq: string, priority: string): string {
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
}

export function generateSitemapIndex(): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  const today = new Date().toISOString().split("T")[0];
  const sitemaps = ["calculators", "converters", "pages", "blog"];
  for (const name of sitemaps) {
    xml += `  <sitemap>\n    <loc>${BASE_URL}/sitemaps/${name}.xml</loc>\n    <lastmod>${today}</lastmod>\n  </sitemap>\n`;
  }
  xml += `</sitemapindex>`;
  return xml;
}

export function generateCalculatorsSitemap(): string {
  const tools = getAllToolsServer();
  const today = new Date().toISOString().split("T")[0];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  for (const cat of calculatorCategorySlugs) {
    xml += sitemapUrl(`${BASE_URL}/${cat.slug}`, today, "weekly", "0.9");
  }
  for (const tool of tools) {
    xml += sitemapUrl(`${BASE_URL}/calculator/${tool.slug}`, today, "weekly", "0.8");
  }
  xml += `</urlset>`;
  return xml;
}

export function generateConvertersSitemap(): string {
  const today = new Date().toISOString().split("T")[0];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  xml += sitemapUrl(`${BASE_URL}/convert`, today, "weekly", "0.9");
  for (const convCat of converterCategorySlugs) {
    xml += sitemapUrl(`${BASE_URL}/convert/${convCat}`, today, "weekly", "0.8");
  }
  for (const conv of converterPages) {
    xml += sitemapUrl(`${BASE_URL}/convert/${conv.slug}`, today, "weekly", "0.7");
  }
  xml += `</urlset>`;
  return xml;
}

export function generatePagesSitemap(): string {
  const today = new Date().toISOString().split("T")[0];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  xml += sitemapUrl(`${BASE_URL}/`, today, "daily", "1.0");
  xml += sitemapUrl(`${BASE_URL}/about`, today, "monthly", "0.8");
  xml += sitemapUrl(`${BASE_URL}/contact`, today, "monthly", "0.8");
  xml += sitemapUrl(`${BASE_URL}/terms`, today, "monthly", "0.5");
  xml += sitemapUrl(`${BASE_URL}/privacy-policy`, today, "monthly", "0.5");
  xml += `</urlset>`;
  return xml;
}

export function generateBlogSitemap(): string {
  const today = new Date().toISOString().split("T")[0];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  xml += sitemapUrl(`${BASE_URL}/blog`, today, "weekly", "0.9");
  for (const post of blogPostsSeo) {
    xml += sitemapUrl(`${BASE_URL}/blog/${post.slug}`, today, "monthly", "0.7");
  }
  xml += `</urlset>`;
  return xml;
}

export function generateSitemapXml(): string {
  const tools = getAllToolsServer();
  const today = new Date().toISOString().split("T")[0];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  xml += sitemapUrl(`${BASE_URL}/`, today, "daily", "1.0");
  xml += sitemapUrl(`${BASE_URL}/about`, today, "monthly", "0.8");
  xml += sitemapUrl(`${BASE_URL}/contact`, today, "monthly", "0.8");
  xml += sitemapUrl(`${BASE_URL}/terms`, today, "monthly", "0.5");
  xml += sitemapUrl(`${BASE_URL}/privacy-policy`, today, "monthly", "0.5");

  for (const cat of calculatorCategorySlugs) {
    xml += sitemapUrl(`${BASE_URL}/${cat.slug}`, today, "weekly", "0.9");
  }
  for (const tool of tools) {
    xml += sitemapUrl(`${BASE_URL}/calculator/${tool.slug}`, today, "weekly", "0.8");
  }

  xml += sitemapUrl(`${BASE_URL}/convert`, today, "weekly", "0.9");
  for (const convCat of converterCategorySlugs) {
    xml += sitemapUrl(`${BASE_URL}/convert/${convCat}`, today, "weekly", "0.8");
  }
  for (const conv of converterPages) {
    xml += sitemapUrl(`${BASE_URL}/convert/${conv.slug}`, today, "weekly", "0.7");
  }

  xml += sitemapUrl(`${BASE_URL}/blog`, today, "weekly", "0.9");
  for (const post of blogPostsSeo) {
    xml += sitemapUrl(`${BASE_URL}/blog/${post.slug}`, today, "monthly", "0.7");
  }

  xml += `</urlset>`;
  return xml;
}

export function generateRobotsTxt(): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${BASE_URL}/sitemap.xml\n`;
}

export function injectSeoIntoHtml(
  html: string,
  tool: CalculatorToolData
): string {
  const title = `${tool.name} - Free Online Tool | CalcSmart24`;
  const description = tool.description;
  const canonicalUrl = `https://calcsmart24.com/calculator/${tool.slug}`;

  html = html
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"/,
      `<meta name="description" content="${description}"`
    )
    .replace(
      /<meta property="og:title" content="[^"]*"/,
      `<meta property="og:title" content="${title}"`
    )
    .replace(
      /<meta property="og:description" content="[^"]*"/,
      `<meta property="og:description" content="${description}"`
    )
    .replace(
      /<meta property="og:url" content="[^"]*"/,
      `<meta property="og:url" content="${canonicalUrl}"`
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*"/,
      `<meta name="twitter:title" content="${title}"`
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*"/,
      `<meta name="twitter:description" content="${description}"`
    );

  if (!html.includes('rel="canonical"')) {
    html = html.replace(
      "</head>",
      `  <link rel="canonical" href="${canonicalUrl}" />\n  </head>`
    );
  }

  const seoContent = `
    <div id="seo-content" style="display:none" aria-hidden="true">
      <h1>${tool.name}</h1>
      <p>${description}</p>
      <nav>
        <a href="/">Home</a>
        <a href="/${tool.categorySlug}">${tool.category}</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms">Terms</a>
      </nav>
    </div>`;

  html = html.replace(
    '<div id="root"></div>',
    `${seoContent}\n    <div id="root"></div>`
  );

  return html;
}

export function injectCategorySeoIntoHtml(
  html: string,
  categorySlug: string
): string {
  const cat = calculatorCategorySlugs.find((c) => c.slug === categorySlug);
  if (!cat) return html;

  const tools = getAllToolsServer().filter((t) => t.categorySlug === categorySlug);
  const title = `${cat.title} Calculators - Free Online Tools | CalcSmart24`;
  const description = `Free online ${cat.title.toLowerCase()} calculators and tools. ${tools.length}+ accurate, fast tools for everyday use.`;
  const canonicalUrl = `https://calcsmart24.com/${cat.slug}`;

  html = html
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"/,
      `<meta name="description" content="${description}"`
    )
    .replace(
      /<meta property="og:title" content="[^"]*"/,
      `<meta property="og:title" content="${title}"`
    )
    .replace(
      /<meta property="og:description" content="[^"]*"/,
      `<meta property="og:description" content="${description}"`
    )
    .replace(
      /<meta property="og:url" content="[^"]*"/,
      `<meta property="og:url" content="${canonicalUrl}"`
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*"/,
      `<meta name="twitter:title" content="${title}"`
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*"/,
      `<meta name="twitter:description" content="${description}"`
    );

  if (!html.includes('rel="canonical"')) {
    html = html.replace(
      "</head>",
      `  <link rel="canonical" href="${canonicalUrl}" />\n  </head>`
    );
  }

  const toolLinks = tools
    .map((t) => `<a href="/calculator/${t.slug}">${t.name}</a>`)
    .join("\n        ");

  const seoContent = `
    <div id="seo-content" style="display:none" aria-hidden="true">
      <h1>${cat.title} Calculators</h1>
      <p>${description}</p>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        ${toolLinks}
      </nav>
    </div>`;

  html = html.replace(
    '<div id="root"></div>',
    `${seoContent}\n    <div id="root"></div>`
  );

  return html;
}

export function injectHomeSeoIntoHtml(html: string): string {
  const tools = getAllToolsServer();
  const categories = calculatorCategorySlugs;

  const catLinks = categories
    .map((c) => `<a href="/${c.slug}">${c.title}</a>`)
    .join("\n        ");
  const toolLinks = tools
    .map((t) => `<a href="/calculator/${t.slug}">${t.name}</a>`)
    .join("\n        ");
  const convCatLinks = converterCategorySlugs
    .map((s) => `<a href="/convert/${s}">${converterCategoryNames[s]} Converters</a>`)
    .join("\n        ");

  const seoContent = `
    <div id="seo-content" style="display:none" aria-hidden="true">
      <h1>CalcSmart24 - Free Online Calculators</h1>
      <p>Free online calculators for math, fitness, finance, and more. ${tools.length}+ accurate, fast tools for everyday calculations. ${converterPages.length}+ unit converters.</p>
      <nav>
        ${catLinks}
        <a href="/convert">Unit Converters</a>
        ${convCatLinks}
        ${toolLinks}
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms">Terms</a>
      </nav>
    </div>`;

  html = html.replace(
    '<div id="root"></div>',
    `${seoContent}\n    <div id="root"></div>`
  );

  return html;
}
