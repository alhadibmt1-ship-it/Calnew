import fs from "fs";
import path from "path";

const indexHtmlPath = path.resolve("dist/public/index.html");
if (!fs.existsSync(indexHtmlPath)) {
  console.error("index.html not found at", indexHtmlPath);
  process.exit(1);
}

const indexHtml = fs.readFileSync(indexHtmlPath, "utf8");

const staticRoutes = [
  "/financial",
  "/health",
  "/math",
  "/converters",
  "/seo-tools",
  "/other",
  "/privacy-policy",
  "/terms",
  "/about",
  "/contact"
];

const slugs = [
  "bmi-calculator", "calorie-calculator", "bmr-calculator", "ideal-weight-calculator",
  "body-fat-calculator", "pregnancy-calculator", "ovulation-calculator", "water-intake-calculator",
  "macro-calculator", "sleep-calculator", "standard-calculator", "scientific-calculator",
  "percentage-calculator", "random-number-generator", "geometry-calculator", "algebra-solver",
  "binary-to-decimal", "prime-checker", "fraction-calculator", "triangle-calculator",
  "volume-calculator", "quadratic-formula", "roman-numeral-converter", "hex-to-decimal-converter",
  "factor-calculator", "logarithm-calculator", "ratio-calculator", "root-calculator",
  "standard-deviation", "loan-emi-calculator", "mortgage-calculator", "simple-interest-calculator",
  "compound-interest-calculator", "gst-vat-calculator", "salary-calculator", "discount-calculator",
  "profit-margin-calculator", "currency-converter", "saving-goal-calculator", "investment-calculator",
  "retirement-calculator", "tax-calculator", "age-calculator", "date-calculator",
  "time-calculator", "tip-calculator", "age-gap-calculator", "birthday-countdown",
  "concrete-calculator", "gpa-calculator", "grade-calculator", "time-zone-converter",
  "subnet-calculator", "word-counter", "character-counter", "password-generator",
  "case-converter", "qr-code-generator", "text-repeater", "color-picker-tool",
  "length-converter", "weight-converter", "temperature-converter", "area-converter",
  "speed-converter", "pressure-converter", "energy-converter", "power-converter"
];

const allRoutes = [...staticRoutes, ...slugs.map(s => `/calculator/${s}`)];

for (const route of allRoutes) {
  // Option 1: create a folder and an index.html inside it
  const dirPath = path.join("dist/public", route);
  fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(path.join(dirPath, "index.html"), indexHtml);
  
  // Option 2: create a .html file
  const htmlPath = path.join("dist/public", `${route}.html`);
  fs.writeFileSync(htmlPath, indexHtml);
}

console.log(`Pre-rendered ${allRoutes.length} fallback routes!`);
