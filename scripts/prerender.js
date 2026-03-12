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
  "/business",
  "/education",
  "/construction",
  "/privacy-policy",
  "/terms",
  "/about",
  "/contact",
  "/convert"
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
  "speed-converter", "pressure-converter", "energy-converter", "power-converter",
  "markup-calculator", "break-even-calculator", "roi-calculator", "cash-flow-calculator",
  "business-loan-calculator", "invoice-calculator", "expense-calculator", "revenue-calculator",
  "overtime-calculator", "cost-price-calculator", "gross-profit-calculator", "net-profit-calculator",
  "inventory-turnover-calculator", "price-per-unit-calculator", "wholesale-price-calculator",
  "accounts-receivable-calculator", "cement-calculator", "concrete-mix-calculator",
  "steel-weight-calculator", "sand-calculator", "brick-calculator", "tile-calculator",
  "paint-calculator", "plywood-calculator", "construction-cost-calculator", "boq-calculator",
  "labor-cost-calculator", "material-cost-estimator", "project-cost-calculator", "project-profit-calculator"
];

function convPair(from, to) {
  const s = u => u.replace(/_/g, "-");
  return [`${s(from)}-to-${s(to)}`, `${s(to)}-to-${s(from)}`];
}

const converterSlugs = [
  ...convPair("meters","feet"),...convPair("meters","inches"),...convPair("meters","yards"),
  ...convPair("meters","centimeters"),...convPair("meters","millimeters"),...convPair("meters","kilometers"),
  ...convPair("meters","miles"),...convPair("kilometers","miles"),...convPair("centimeters","inches"),
  ...convPair("millimeters","inches"),...convPair("feet","inches"),...convPair("feet","centimeters"),
  ...convPair("feet","yards"),...convPair("yards","miles"),...convPair("inches","millimeters"),
  ...convPair("miles","kilometers"),...convPair("nautical_miles","kilometers"),...convPair("nautical_miles","miles"),
  ...convPair("micrometers","millimeters"),...convPair("meters","nautical_miles"),...convPair("feet","meters"),
  ...convPair("yards","meters"),...convPair("centimeters","feet"),...convPair("centimeters","millimeters"),
  ...convPair("kilometers","meters"),...convPair("inches","centimeters"),...convPair("miles","feet"),
  ...convPair("miles","yards"),...convPair("fathoms","feet"),...convPair("fathoms","meters"),
  ...convPair("leagues","miles"),...convPair("leagues","kilometers"),
  ...convPair("kilograms","pounds"),...convPair("kilograms","ounces"),...convPair("kilograms","grams"),
  ...convPair("kilograms","milligrams"),...convPair("kilograms","metric_tons"),...convPair("grams","ounces"),
  ...convPair("grams","milligrams"),...convPair("grams","pounds"),...convPair("pounds","ounces"),
  ...convPair("metric_tons","pounds"),...convPair("metric_tons","short_tons"),...convPair("short_tons","pounds"),
  ...convPair("stones","pounds"),...convPair("stones","kilograms"),...convPair("milligrams","micrograms"),
  ...convPair("carats","grams"),...convPair("carats","milligrams"),...convPair("troy_ounces","grams"),
  ...convPair("troy_ounces","ounces"),...convPair("kilograms","stones"),...convPair("pounds","kilograms"),
  ...convPair("ounces","grams"),...convPair("long_tons","kilograms"),...convPair("long_tons","metric_tons"),
  ...convPair("long_tons","short_tons"),
  ...convPair("square_meters","square_feet"),...convPair("square_meters","square_inches"),
  ...convPair("square_meters","square_yards"),...convPair("square_meters","acres"),
  ...convPair("square_meters","hectares"),...convPair("square_kilometers","square_miles"),
  ...convPair("hectares","acres"),...convPair("square_feet","square_inches"),
  ...convPair("square_feet","square_yards"),...convPair("acres","square_feet"),
  ...convPair("square_miles","acres"),...convPair("square_feet","square_meters"),
  ...convPair("acres","hectares"),
  ...convPair("liters","gallons"),...convPair("liters","milliliters"),
  ...convPair("liters","fluid_ounces"),...convPair("liters","cups"),
  ...convPair("liters","pints"),...convPair("liters","quarts"),
  ...convPair("gallons","quarts"),...convPair("gallons","liters"),
  ...convPair("cups","milliliters"),...convPair("fluid_ounces","milliliters"),
  ...convPair("tablespoons","teaspoons"),...convPair("tablespoons","milliliters"),
  ...convPair("cubic_meters","cubic_feet"),...convPair("cubic_meters","liters"),
  ...convPair("cubic_feet","gallons"),...convPair("cubic_inches","cubic_centimeters"),
  ...convPair("celsius","fahrenheit"),...convPair("celsius","kelvin"),...convPair("fahrenheit","kelvin"),
  ...convPair("km_per_hour","mph"),...convPair("km_per_hour","meters_per_second"),
  ...convPair("mph","meters_per_second"),...convPair("knots","km_per_hour"),
  ...convPair("knots","mph"),...convPair("meters_per_second","feet_per_second"),
  ...convPair("km_per_hour","feet_per_second"),...convPair("mph","feet_per_second"),
  ...convPair("knots","meters_per_second"),
  ...convPair("bytes","kilobytes"),...convPair("kilobytes","megabytes"),
  ...convPair("megabytes","gigabytes"),...convPair("gigabytes","terabytes"),
  ...convPair("terabytes","petabytes"),...convPair("bytes","megabytes"),
  ...convPair("bytes","gigabytes"),...convPair("kilobytes","gigabytes"),
  ...convPair("megabytes","terabytes"),...convPair("kibibytes","mebibytes"),
  ...convPair("mebibytes","gibibytes"),
  ...convPair("kbps","mbps"),...convPair("mbps","gbps"),
  ...convPair("kbps","gbps"),...convPair("bytes_per_sec","kbps"),
  ...convPair("bytes_per_sec","mbps"),...convPair("mbps","kbps"),
  ...convPair("gbps","mbps"),
  ...convPair("psi","bar"),...convPair("bar","pascal"),
  ...convPair("atm","psi"),...convPair("atm","bar"),
  ...convPair("atm","pascal"),...convPair("psi","pascal"),
  ...convPair("psi","kilopascal"),...convPair("bar","kilopascal"),
  ...convPair("mmhg","psi"),...convPair("mmhg","pascal"),
  ...convPair("mmhg","atm"),...convPair("inhg","psi"),
  ...convPair("joules","calories"),...convPair("joules","kilocalories"),
  ...convPair("joules","kilowatt_hours"),...convPair("joules","btu"),
  ...convPair("kilowatt_hours","btu"),...convPair("kilowatt_hours","calories"),
  ...convPair("kilowatt_hours","kilocalories"),...convPair("kilowatt_hours","joules"),
  ...convPair("calories","kilocalories"),...convPair("btu","kilojoules"),
  ...convPair("kilocalories","joules"),...convPair("kilocalories","btu"),
  ...convPair("watts","kilowatts"),...convPair("watts","horsepower"),
  ...convPair("watts","btu_per_hour"),...convPair("kilowatts","horsepower"),
  ...convPair("kilowatts","megawatts"),...convPair("horsepower","btu_per_hour"),
  ...convPair("megawatts","horsepower"),...convPair("watts","megawatts"),
  ...convPair("mpg","km_per_liter"),
  ...convPair("km_per_liter","liters_per_100km"),
  ...convPair("mpg","liters_per_100km"),
  ...convPair("degrees","radians"),...convPair("degrees","gradians"),
  ...convPair("radians","gradians"),...convPair("degrees","arcminutes"),
  ...convPair("degrees","arcseconds"),
  ...convPair("seconds","minutes"),...convPair("seconds","hours"),
  ...convPair("minutes","hours"),...convPair("hours","days"),
  ...convPair("days","weeks"),...convPair("days","hours"),
  ...convPair("weeks","days"),...convPair("hours","minutes"),
  ...convPair("minutes","seconds"),...convPair("days","years"),
];

const converterCategorySlugs = [
  "length", "weight", "area", "volume", "temperature", "speed",
  "digital-storage", "data-transfer", "pressure", "energy", "power",
  "fuel-efficiency", "angle", "time",
];

const allRoutes = [
  ...staticRoutes,
  ...slugs.map(s => `/calculator/${s}`),
  ...converterCategorySlugs.map(s => `/convert/${s}`),
  ...converterSlugs.map(s => `/convert/${s}`),
];

for (const route of allRoutes) {
  const dirPath = path.join("dist/public", route);
  fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(path.join(dirPath, "index.html"), indexHtml);

  const htmlPath = path.join("dist/public", `${route}.html`);
  fs.writeFileSync(htmlPath, indexHtml);
}

console.log(`Pre-rendered ${allRoutes.length} fallback routes (including ${converterSlugs.length} converter pages)!`);
