export interface ConverterDefinition {
  name: string;
  slug: string;
  category: string;
  fromUnit: string;
  toUnit: string;
  fromSymbol: string;
  toSymbol: string;
  factor?: number;
  special?: "temperature";
  description: string;
  formula: string;
  example: string;
  faq: { question: string; answer: string }[];
}

export interface ConverterCategory {
  name: string;
  slug: string;
  description: string;
}

export const converterCategories: ConverterCategory[] = [
  { name: "Length", slug: "length", description: "Convert between meters, feet, inches, miles, kilometers, and more." },
  { name: "Weight", slug: "weight", description: "Convert between kilograms, pounds, ounces, grams, tons, and more." },
  { name: "Area", slug: "area", description: "Convert between square meters, square feet, acres, hectares, and more." },
  { name: "Volume", slug: "volume", description: "Convert between liters, gallons, milliliters, fluid ounces, and more." },
  { name: "Temperature", slug: "temperature", description: "Convert between Celsius, Fahrenheit, and Kelvin." },
  { name: "Speed", slug: "speed", description: "Convert between km/h, mph, m/s, and knots." },
  { name: "Digital Storage", slug: "digital-storage", description: "Convert between bytes, kilobytes, megabytes, gigabytes, and more." },
  { name: "Data Transfer", slug: "data-transfer", description: "Convert between kbps, mbps, gbps, and more." },
  { name: "Pressure", slug: "pressure", description: "Convert between psi, bar, pascal, atm, and more." },
  { name: "Energy", slug: "energy", description: "Convert between joules, calories, kilowatt-hours, BTU, and more." },
  { name: "Power", slug: "power", description: "Convert between watts, kilowatts, horsepower, and more." },
  { name: "Fuel Efficiency", slug: "fuel-efficiency", description: "Convert between MPG, km/L, and L/100km." },
  { name: "Angle", slug: "angle", description: "Convert between degrees, radians, and gradians." },
  { name: "Time", slug: "time", description: "Convert between seconds, minutes, hours, days, and more." },
];

function pair(
  category: string,
  fromUnit: string, toUnit: string,
  fromSymbol: string, toSymbol: string,
  factor: number,
  special?: "temperature"
): ConverterDefinition[] {
  const fmtName = (u: string) => u.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  const fromName = fmtName(fromUnit);
  const toName = fmtName(toUnit);
  const slug1 = `${fromUnit.replace(/_/g, "-")}-to-${toUnit.replace(/_/g, "-")}`;
  const slug2 = `${toUnit.replace(/_/g, "-")}-to-${fromUnit.replace(/_/g, "-")}`;
  const invFactor = factor !== 0 ? 1 / factor : 0;

  const base: Omit<ConverterDefinition, "name" | "slug" | "fromUnit" | "toUnit" | "fromSymbol" | "toSymbol" | "factor" | "formula" | "example" | "description"> = {
    category,
    special,
    faq: [
      { question: `How do I convert ${fromName} to ${toName}?`, answer: special === "temperature" ? `Use the temperature conversion formula specific to these units.` : `Multiply the value in ${fromName} by ${factor.toPrecision(6)} to get the value in ${toName}.` },
      { question: `How do I convert ${toName} to ${fromName}?`, answer: special === "temperature" ? `Use the inverse temperature conversion formula.` : `Multiply the value in ${toName} by ${invFactor.toPrecision(6)} to get the value in ${fromName}.` },
      { question: `Is this conversion exact?`, answer: `The conversion factor used provides high precision suitable for most practical purposes.` },
    ],
  };

  return [
    {
      ...base,
      name: `${fromName} to ${toName} Converter`,
      slug: slug1,
      fromUnit, toUnit, fromSymbol, toSymbol,
      factor,
      formula: special === "temperature" ? `Special temperature formula` : `${toName} = ${fromName} × ${factor.toPrecision(6)}`,
      example: special === "temperature" ? `100°C = 212°F` : `1 ${fromSymbol} = ${factor.toPrecision(6)} ${toSymbol}`,
      description: `Convert ${fromName} (${fromSymbol}) to ${toName} (${toSymbol}) instantly with our free online converter.`,
    },
    {
      ...base,
      name: `${toName} to ${fromName} Converter`,
      slug: slug2,
      fromUnit: toUnit, toUnit: fromUnit,
      fromSymbol: toSymbol, toSymbol: fromSymbol,
      factor: invFactor,
      formula: special === "temperature" ? `Special temperature formula` : `${fromName} = ${toName} × ${invFactor.toPrecision(6)}`,
      example: special === "temperature" ? `212°F = 100°C` : `1 ${toSymbol} = ${invFactor.toPrecision(6)} ${fromSymbol}`,
      description: `Convert ${toName} (${toSymbol}) to ${fromName} (${fromSymbol}) instantly with our free online converter.`,
    },
  ];
}

export const converterDefinitions: ConverterDefinition[] = [
  // LENGTH (64 pages = 32 pairs)
  ...pair("length", "meters", "feet", "m", "ft", 3.28084),
  ...pair("length", "meters", "inches", "m", "in", 39.3701),
  ...pair("length", "meters", "yards", "m", "yd", 1.09361),
  ...pair("length", "meters", "centimeters", "m", "cm", 100),
  ...pair("length", "meters", "millimeters", "m", "mm", 1000),
  ...pair("length", "meters", "kilometers", "m", "km", 0.001),
  ...pair("length", "meters", "miles", "m", "mi", 0.000621371),
  ...pair("length", "kilometers", "miles", "km", "mi", 0.621371),
  ...pair("length", "centimeters", "inches", "cm", "in", 0.393701),
  ...pair("length", "millimeters", "inches", "mm", "in", 0.0393701),
  ...pair("length", "feet", "inches", "ft", "in", 12),
  ...pair("length", "feet", "centimeters", "ft", "cm", 30.48),
  ...pair("length", "feet", "yards", "ft", "yd", 0.333333),
  ...pair("length", "yards", "miles", "yd", "mi", 0.000568182),
  ...pair("length", "inches", "millimeters", "in", "mm", 25.4),
  ...pair("length", "miles", "kilometers", "mi", "km", 1.60934),
  ...pair("length", "nautical_miles", "kilometers", "nmi", "km", 1.852),
  ...pair("length", "nautical_miles", "miles", "nmi", "mi", 1.15078),
  ...pair("length", "micrometers", "millimeters", "μm", "mm", 0.001),
  ...pair("length", "meters", "nautical_miles", "m", "nmi", 0.000539957),
  ...pair("length", "feet", "meters", "ft", "m", 0.3048),
  ...pair("length", "yards", "meters", "yd", "m", 0.9144),
  ...pair("length", "centimeters", "feet", "cm", "ft", 0.0328084),
  ...pair("length", "centimeters", "millimeters", "cm", "mm", 10),
  ...pair("length", "kilometers", "meters", "km", "m", 1000),
  ...pair("length", "inches", "centimeters", "in", "cm", 2.54),
  ...pair("length", "miles", "feet", "mi", "ft", 5280),
  ...pair("length", "miles", "yards", "mi", "yd", 1760),
  ...pair("length", "fathoms", "feet", "fathom", "ft", 6),
  ...pair("length", "fathoms", "meters", "fathom", "m", 1.8288),
  ...pair("length", "leagues", "miles", "league", "mi", 3),
  ...pair("length", "leagues", "kilometers", "league", "km", 4.828),

  // WEIGHT (50 pages = 25 pairs)
  ...pair("weight", "kilograms", "pounds", "kg", "lbs", 2.20462),
  ...pair("weight", "kilograms", "ounces", "kg", "oz", 35.274),
  ...pair("weight", "kilograms", "grams", "kg", "g", 1000),
  ...pair("weight", "kilograms", "milligrams", "kg", "mg", 1000000),
  ...pair("weight", "kilograms", "metric_tons", "kg", "t", 0.001),
  ...pair("weight", "grams", "ounces", "g", "oz", 0.035274),
  ...pair("weight", "grams", "milligrams", "g", "mg", 1000),
  ...pair("weight", "grams", "pounds", "g", "lbs", 0.00220462),
  ...pair("weight", "pounds", "ounces", "lbs", "oz", 16),
  ...pair("weight", "metric_tons", "pounds", "t", "lbs", 2204.62),
  ...pair("weight", "metric_tons", "short_tons", "t", "US ton", 1.10231),
  ...pair("weight", "short_tons", "pounds", "US ton", "lbs", 2000),
  ...pair("weight", "stones", "pounds", "st", "lbs", 14),
  ...pair("weight", "stones", "kilograms", "st", "kg", 6.35029),
  ...pair("weight", "milligrams", "micrograms", "mg", "μg", 1000),
  ...pair("weight", "carats", "grams", "ct", "g", 0.2),
  ...pair("weight", "carats", "milligrams", "ct", "mg", 200),
  ...pair("weight", "troy_ounces", "grams", "oz t", "g", 31.1035),
  ...pair("weight", "troy_ounces", "ounces", "oz t", "oz", 1.09714),
  ...pair("weight", "kilograms", "stones", "kg", "st", 0.157473),
  ...pair("weight", "pounds", "kilograms", "lbs", "kg", 0.453592),
  ...pair("weight", "ounces", "grams", "oz", "g", 28.3495),
  ...pair("weight", "long_tons", "kilograms", "long ton", "kg", 1016.05),
  ...pair("weight", "long_tons", "metric_tons", "long ton", "t", 1.01605),
  ...pair("weight", "long_tons", "short_tons", "long ton", "US ton", 1.12),

  // AREA (48 pages = 24 pairs)
  ...pair("area", "square_meters", "square_feet", "m²", "ft²", 10.7639),
  ...pair("area", "square_meters", "square_inches", "m²", "in²", 1550),
  ...pair("area", "square_meters", "square_yards", "m²", "yd²", 1.19599),
  ...pair("area", "square_meters", "acres", "m²", "ac", 0.000247105),
  ...pair("area", "square_meters", "hectares", "m²", "ha", 0.0001),
  ...pair("area", "square_kilometers", "square_miles", "km²", "mi²", 0.386102),
  ...pair("area", "square_kilometers", "acres", "km²", "ac", 247.105),
  ...pair("area", "square_kilometers", "hectares", "km²", "ha", 100),
  ...pair("area", "acres", "square_feet", "ac", "ft²", 43560),
  ...pair("area", "acres", "hectares", "ac", "ha", 0.404686),
  ...pair("area", "hectares", "square_feet", "ha", "ft²", 107639),
  ...pair("area", "square_feet", "square_inches", "ft²", "in²", 144),
  ...pair("area", "square_feet", "square_yards", "ft²", "yd²", 0.111111),
  ...pair("area", "square_miles", "acres", "mi²", "ac", 640),
  ...pair("area", "square_miles", "square_kilometers", "mi²", "km²", 2.58999),
  ...pair("area", "square_miles", "hectares", "mi²", "ha", 258.999),
  ...pair("area", "square_yards", "square_feet", "yd²", "ft²", 9),
  ...pair("area", "square_yards", "square_meters", "yd²", "m²", 0.836127),
  ...pair("area", "square_centimeters", "square_inches", "cm²", "in²", 0.155),
  ...pair("area", "square_centimeters", "square_meters", "cm²", "m²", 0.0001),
  ...pair("area", "square_inches", "square_centimeters", "in²", "cm²", 6.4516),
  ...pair("area", "square_feet", "square_meters", "ft²", "m²", 0.092903),
  ...pair("area", "acres", "square_meters", "ac", "m²", 4046.86),
  ...pair("area", "hectares", "acres", "ha", "ac", 2.47105),

  // VOLUME (50 pages = 25 pairs)
  ...pair("volume", "liters", "gallons", "L", "gal", 0.264172),
  ...pair("volume", "liters", "quarts", "L", "qt", 1.05669),
  ...pair("volume", "liters", "pints", "L", "pt", 2.11338),
  ...pair("volume", "liters", "cups", "L", "cup", 4.22675),
  ...pair("volume", "liters", "fluid_ounces", "L", "fl oz", 33.814),
  ...pair("volume", "liters", "milliliters", "L", "mL", 1000),
  ...pair("volume", "liters", "cubic_meters", "L", "m³", 0.001),
  ...pair("volume", "liters", "cubic_feet", "L", "ft³", 0.0353147),
  ...pair("volume", "gallons", "quarts", "gal", "qt", 4),
  ...pair("volume", "gallons", "pints", "gal", "pt", 8),
  ...pair("volume", "gallons", "cups", "gal", "cup", 16),
  ...pair("volume", "gallons", "fluid_ounces", "gal", "fl oz", 128),
  ...pair("volume", "gallons", "liters", "gal", "L", 3.78541),
  ...pair("volume", "milliliters", "fluid_ounces", "mL", "fl oz", 0.033814),
  ...pair("volume", "milliliters", "teaspoons", "mL", "tsp", 0.202884),
  ...pair("volume", "milliliters", "tablespoons", "mL", "tbsp", 0.067628),
  ...pair("volume", "cubic_meters", "cubic_feet", "m³", "ft³", 35.3147),
  ...pair("volume", "cubic_meters", "cubic_yards", "m³", "yd³", 1.30795),
  ...pair("volume", "cubic_meters", "gallons", "m³", "gal", 264.172),
  ...pair("volume", "cubic_feet", "cubic_inches", "ft³", "in³", 1728),
  ...pair("volume", "cubic_feet", "gallons", "ft³", "gal", 7.48052),
  ...pair("volume", "cubic_yards", "cubic_feet", "yd³", "ft³", 27),
  ...pair("volume", "cubic_yards", "cubic_meters", "yd³", "m³", 0.764555),
  ...pair("volume", "tablespoons", "teaspoons", "tbsp", "tsp", 3),
  ...pair("volume", "cups", "tablespoons", "cup", "tbsp", 16),

  // TEMPERATURE (6 pages = 3 pairs)
  ...pair("temperature", "celsius", "fahrenheit", "°C", "°F", 0, "temperature"),
  ...pair("temperature", "fahrenheit", "kelvin", "°F", "K", 0, "temperature"),
  ...pair("temperature", "kelvin", "celsius", "K", "°C", 0, "temperature"),

  // SPEED (24 pages = 12 pairs)
  ...pair("speed", "kilometers_per_hour", "miles_per_hour", "km/h", "mph", 0.621371),
  ...pair("speed", "miles_per_hour", "meters_per_second", "mph", "m/s", 0.44704),
  ...pair("speed", "meters_per_second", "kilometers_per_hour", "m/s", "km/h", 3.6),
  ...pair("speed", "knots", "miles_per_hour", "kn", "mph", 1.15078),
  ...pair("speed", "knots", "kilometers_per_hour", "kn", "km/h", 1.852),
  ...pair("speed", "meters_per_second", "feet_per_second", "m/s", "ft/s", 3.28084),
  ...pair("speed", "miles_per_hour", "feet_per_second", "mph", "ft/s", 1.46667),
  ...pair("speed", "kilometers_per_hour", "meters_per_second", "km/h", "m/s", 0.277778),
  ...pair("speed", "knots", "meters_per_second", "kn", "m/s", 0.514444),
  ...pair("speed", "mach", "kilometers_per_hour", "Mach", "km/h", 1234.8),
  ...pair("speed", "mach", "miles_per_hour", "Mach", "mph", 767.269),
  ...pair("speed", "mach", "meters_per_second", "Mach", "m/s", 343),

  // DIGITAL STORAGE (40 pages = 20 pairs)
  ...pair("digital-storage", "bytes", "kilobytes", "B", "KB", 1/1024),
  ...pair("digital-storage", "kilobytes", "megabytes", "KB", "MB", 1/1024),
  ...pair("digital-storage", "megabytes", "gigabytes", "MB", "GB", 1/1024),
  ...pair("digital-storage", "gigabytes", "terabytes", "GB", "TB", 1/1024),
  ...pair("digital-storage", "terabytes", "petabytes", "TB", "PB", 1/1024),
  ...pair("digital-storage", "bytes", "megabytes", "B", "MB", 1/(1024**2)),
  ...pair("digital-storage", "bytes", "gigabytes", "B", "GB", 1/(1024**3)),
  ...pair("digital-storage", "kilobytes", "gigabytes", "KB", "GB", 1/(1024**2)),
  ...pair("digital-storage", "megabytes", "terabytes", "MB", "TB", 1/(1024**2)),
  ...pair("digital-storage", "bits", "bytes", "bit", "B", 0.125),
  ...pair("digital-storage", "kilobits", "kilobytes", "Kbit", "KB", 0.125),
  ...pair("digital-storage", "megabits", "megabytes", "Mbit", "MB", 0.125),
  ...pair("digital-storage", "gigabits", "gigabytes", "Gbit", "GB", 0.125),
  ...pair("digital-storage", "bits", "kilobits", "bit", "Kbit", 1/1024),
  ...pair("digital-storage", "kilobits", "megabits", "Kbit", "Mbit", 1/1024),
  ...pair("digital-storage", "megabits", "gigabits", "Mbit", "Gbit", 1/1024),
  ...pair("digital-storage", "bytes", "bits", "B", "bit", 8),
  ...pair("digital-storage", "kilobytes", "bytes", "KB", "B", 1024),
  ...pair("digital-storage", "megabytes", "kilobytes", "MB", "KB", 1024),
  ...pair("digital-storage", "gigabytes", "megabytes", "GB", "MB", 1024),

  // DATA TRANSFER (20 pages = 10 pairs)
  ...pair("data-transfer", "kbps", "mbps", "Kbps", "Mbps", 0.001),
  ...pair("data-transfer", "mbps", "gbps", "Mbps", "Gbps", 0.001),
  ...pair("data-transfer", "gbps", "tbps", "Gbps", "Tbps", 0.001),
  ...pair("data-transfer", "kbps", "kbytes_per_sec", "Kbps", "KB/s", 0.125),
  ...pair("data-transfer", "mbps", "mbytes_per_sec", "Mbps", "MB/s", 0.125),
  ...pair("data-transfer", "gbps", "gbytes_per_sec", "Gbps", "GB/s", 0.125),
  ...pair("data-transfer", "kbps", "gbps", "Kbps", "Gbps", 0.000001),
  ...pair("data-transfer", "mbps", "kbps", "Mbps", "Kbps", 1000),
  ...pair("data-transfer", "gbps", "mbps", "Gbps", "Mbps", 1000),
  ...pair("data-transfer", "tbps", "gbps", "Tbps", "Gbps", 1000),

  // PRESSURE (24 pages = 12 pairs)
  ...pair("pressure", "psi", "bar", "psi", "bar", 0.0689476),
  ...pair("pressure", "bar", "pascal", "bar", "Pa", 100000),
  ...pair("pressure", "atm", "psi", "atm", "psi", 14.6959),
  ...pair("pressure", "atm", "bar", "atm", "bar", 1.01325),
  ...pair("pressure", "atm", "pascal", "atm", "Pa", 101325),
  ...pair("pressure", "psi", "pascal", "psi", "Pa", 6894.76),
  ...pair("pressure", "psi", "kilopascal", "psi", "kPa", 6.89476),
  ...pair("pressure", "bar", "kilopascal", "bar", "kPa", 100),
  ...pair("pressure", "mmhg", "psi", "mmHg", "psi", 0.0193368),
  ...pair("pressure", "mmhg", "pascal", "mmHg", "Pa", 133.322),
  ...pair("pressure", "mmhg", "atm", "mmHg", "atm", 0.00131579),
  ...pair("pressure", "inhg", "psi", "inHg", "psi", 0.491154),

  // ENERGY (24 pages = 12 pairs)
  ...pair("energy", "joules", "calories", "J", "cal", 0.239006),
  ...pair("energy", "joules", "kilocalories", "J", "kcal", 0.000239006),
  ...pair("energy", "joules", "kilowatt_hours", "J", "kWh", 2.77778e-7),
  ...pair("energy", "joules", "btu", "J", "BTU", 0.000947817),
  ...pair("energy", "kilowatt_hours", "btu", "kWh", "BTU", 3412.14),
  ...pair("energy", "kilowatt_hours", "calories", "kWh", "cal", 860421),
  ...pair("energy", "kilowatt_hours", "kilocalories", "kWh", "kcal", 860.421),
  ...pair("energy", "kilowatt_hours", "joules", "kWh", "J", 3600000),
  ...pair("energy", "calories", "kilocalories", "cal", "kcal", 0.001),
  ...pair("energy", "btu", "kilojoules", "BTU", "kJ", 1.05506),
  ...pair("energy", "kilocalories", "joules", "kcal", "J", 4184),
  ...pair("energy", "kilocalories", "btu", "kcal", "BTU", 3.96567),

  // POWER (16 pages = 8 pairs)
  ...pair("power", "watts", "kilowatts", "W", "kW", 0.001),
  ...pair("power", "watts", "horsepower", "W", "hp", 0.00134102),
  ...pair("power", "watts", "btu_per_hour", "W", "BTU/h", 3.41214),
  ...pair("power", "kilowatts", "horsepower", "kW", "hp", 1.34102),
  ...pair("power", "kilowatts", "megawatts", "kW", "MW", 0.001),
  ...pair("power", "horsepower", "btu_per_hour", "hp", "BTU/h", 2544.43),
  ...pair("power", "megawatts", "horsepower", "MW", "hp", 1341.02),
  ...pair("power", "watts", "megawatts", "W", "MW", 0.000001),

  // FUEL EFFICIENCY (6 pages = 3 pairs)
  ...pair("fuel-efficiency", "mpg", "km_per_liter", "mpg", "km/L", 0.425144),
  ...pair("fuel-efficiency", "km_per_liter", "liters_per_100km", "km/L", "L/100km", 0),
  ...pair("fuel-efficiency", "mpg", "liters_per_100km", "mpg", "L/100km", 0),

  // ANGLE (10 pages = 5 pairs)
  ...pair("angle", "degrees", "radians", "°", "rad", Math.PI / 180),
  ...pair("angle", "degrees", "gradians", "°", "gon", 10/9),
  ...pair("angle", "radians", "gradians", "rad", "gon", 200/Math.PI),
  ...pair("angle", "degrees", "arcminutes", "°", "'", 60),
  ...pair("angle", "degrees", "arcseconds", "°", "\"", 3600),

  // TIME (20 pages = 10 pairs)
  ...pair("time", "seconds", "minutes", "s", "min", 1/60),
  ...pair("time", "seconds", "hours", "s", "h", 1/3600),
  ...pair("time", "minutes", "hours", "min", "h", 1/60),
  ...pair("time", "hours", "days", "h", "d", 1/24),
  ...pair("time", "days", "weeks", "d", "wk", 1/7),
  ...pair("time", "days", "hours", "d", "h", 24),
  ...pair("time", "weeks", "days", "wk", "d", 7),
  ...pair("time", "hours", "minutes", "h", "min", 60),
  ...pair("time", "minutes", "seconds", "min", "s", 60),
  ...pair("time", "days", "years", "d", "yr", 1/365.25),
];

export function getConverterBySlug(slug: string): ConverterDefinition | undefined {
  return converterDefinitions.find(c => c.slug === slug);
}

export function getConvertersByCategory(category: string): ConverterDefinition[] {
  return converterDefinitions.filter(c => c.category === category);
}

export function getRelatedConverters(converter: ConverterDefinition, limit = 5): ConverterDefinition[] {
  return converterDefinitions
    .filter(c => c.category === converter.category && c.slug !== converter.slug)
    .slice(0, limit);
}

export function getPopularConverters(limit = 5): ConverterDefinition[] {
  const popular = ["meters-to-feet", "kg-to-lbs", "celsius-to-fahrenheit", "km-to-miles", "liters-to-gallons"];
  return popular
    .map(slug => converterDefinitions.find(c => c.slug === slug || c.slug === slug.replace(/s-to-/, "-to-")))
    .filter(Boolean)
    .slice(0, limit) as ConverterDefinition[];
}
