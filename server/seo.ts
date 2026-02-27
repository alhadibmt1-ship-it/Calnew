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
  { title: "Fitness & Health", slug: "health" },
  { title: "Math", slug: "math" },
  { title: "Daily Life", slug: "other" },
  { title: "SEO & Text Tools", slug: "seo-tools" },
  { title: "Unit Converters", slug: "converters" },
];

const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const toolsByCategory: Record<string, { name: string; description: string }[]> = {
  financial: [
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
    { name: "Tax Calculator", description: "Estimate your income tax liability based on income." },
    { name: "Auto Loan Calculator", description: "Calculate monthly car payments, total interest, and loan cost." },
    { name: "Amortization Calculator", description: "Generate a full loan amortization schedule with payment breakdown." },
    { name: "Inflation Calculator", description: "Calculate the future cost of goods adjusted for inflation." },
    { name: "Sales Tax Calculator", description: "Calculate sales tax amounts for any purchase." },
    { name: "Interest Rate Calculator", description: "Find the required interest rate to reach your financial goal." },
    { name: "Payment Calculator", description: "Calculate monthly payment amounts for any loan." },
    { name: "Salary to Hourly Calculator", description: "Convert annual salary to hourly wage and vice versa." },
  ],
  health: [
    { name: "BMI Calculator", description: "Calculate your Body Mass Index (BMI) instantly." },
    { name: "Calorie Calculator", description: "Estimate daily calorie needs for weight loss or gain." },
    { name: "Body Fat Calculator", description: "Estimate your body fat percentage based on measurements." },
    { name: "Water Intake Calculator", description: "Find out how much water you should drink daily." },
    { name: "BMR Calculator", description: "Calculate your Basal Metabolic Rate (BMR)." },
    { name: "Sleep Calculator", description: "Calculate the best time to go to bed or wake up." },
    { name: "Ideal Weight Calculator", description: "Find your ideal weight range based on height." },
    { name: "Pregnancy Calculator", description: "Estimate your due date and track pregnancy milestones." },
    { name: "Ovulation Calculator", description: "Track your fertility window and ovulation dates." },
    { name: "Macro Calculator", description: "Calculate your optimal macronutrient split." },
    { name: "Pace Calculator", description: "Calculate running or walking pace, speed, distance, and time." },
    { name: "Due Date Calculator", description: "Calculate your pregnancy due date from last period or conception." },
    { name: "TDEE Calculator", description: "Calculate your Total Daily Energy Expenditure for diet planning." },
  ],
  math: [
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
    { name: "Standard Deviation", description: "Calculate mean, variance, and standard deviation." },
    { name: "Pythagorean Theorem Calculator", description: "Find the missing side of a right triangle using the Pythagorean theorem." },
    { name: "Percentage Increase Calculator", description: "Calculate the percentage increase or decrease between two values." },
    { name: "Circumference Calculator", description: "Calculate the circumference, area, and diameter of a circle." },
    { name: "Slope Calculator", description: "Calculate the slope of a line from two points." },
    { name: "Exponent Calculator", description: "Calculate the result of a base number raised to any power." },
    { name: "Scientific Notation Calculator", description: "Convert numbers to and from scientific notation." },
    { name: "Significant Figures Calculator", description: "Count and round numbers to significant figures." },
    { name: "Square Footage Calculator", description: "Calculate area in square feet for any space or room." },
  ],
  other: [
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
    { name: "Subnet Calculator", description: "Calculate IP subnets and network masks." },
    { name: "Hours Calculator", description: "Add or subtract hours and minutes for time tracking." },
    { name: "Fuel Cost Calculator", description: "Estimate fuel costs for any trip based on distance and efficiency." },
    { name: "Electricity Cost Calculator", description: "Estimate electricity costs for appliances and devices." },
    { name: "Shoe Size Converter", description: "Convert shoe sizes between US, UK, EU, and CM systems." },
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
};

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

export function generateSitemapXml(): string {
  const tools = getAllToolsServer();
  const today = new Date().toISOString().split("T")[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  const fixedPages = [
    { url: "https://calcsmart24.com/", priority: "1.0", freq: "daily" },
    { url: "https://calcsmart24.com/about", priority: "0.8", freq: "monthly" },
    { url: "https://calcsmart24.com/contact", priority: "0.8", freq: "monthly" },
    { url: "https://calcsmart24.com/terms", priority: "0.5", freq: "monthly" },
    { url: "https://calcsmart24.com/privacy-policy", priority: "0.5", freq: "monthly" },
  ];

  for (const page of fixedPages) {
    xml += `  <url>\n    <loc>${page.url}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${page.freq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>\n`;
  }

  for (const cat of calculatorCategorySlugs) {
    xml += `  <url>\n    <loc>https://calcsmart24.com/${cat.slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
  }

  for (const tool of tools) {
    xml += `  <url>\n    <loc>https://calcsmart24.com/calculator/${tool.slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  }

  xml += `</urlset>`;
  return xml;
}

export function generateRobotsTxt(): string {
  return `User-agent: *\nAllow: /\n\nSitemap: https://calcsmart24.com/sitemap.xml\n`;
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

  const seoContent = `
    <div id="seo-content" style="display:none" aria-hidden="true">
      <h1>CalcSmart24 - Free Online Calculators</h1>
      <p>Free online calculators for math, fitness, finance, and more. ${tools.length}+ accurate, fast tools for everyday calculations.</p>
      <nav>
        ${catLinks}
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