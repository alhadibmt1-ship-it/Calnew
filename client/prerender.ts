import fs from "fs";
import path from "path";
import { getAllTools, calculatorCategories } from "./src/lib/calculator-data";

const publicDir = path.resolve(process.cwd(), "client/public");
const indexHtmlPath = path.resolve(process.cwd(), "client/index.html");

if (!fs.existsSync(indexHtmlPath)) {
  console.error("index.html not found");
  process.exit(1);
}

const template = fs.readFileSync(indexHtmlPath, "utf-8");
const tools = getAllTools();

// 1. Generate HTML for each tool
tools.forEach((tool) => {
  const toolDir = path.join(publicDir, "calculator", tool.slug);
  if (!fs.existsSync(toolDir)) {
    fs.mkdirSync(toolDir, { recursive: true });
  }

  const title = tool.name;
  const description = tool.description || `Free online ${title.toLowerCase()} for instant results. Accurate, fast, and easy to use.`;
  const canonicalUrl = `https://calcsmart24.com/calculator/${tool.slug}`;

  let html = template
    .replace(
      /<title>.*<\/title>/,
      `<title>${title} - Free Online Tool | CalcSmart24</title>`
    )
    .replace(
      /<meta name="description" content="[^"]*"/,
      `<meta name="description" content="${description}"`
    )
    .replace(
      /<meta property="og:title" content="[^"]*"/,
      `<meta property="og:title" content="${title} - Free Online Tool | CalcSmart24"`
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
      `<meta name="twitter:title" content="${title} - Free Online Tool | CalcSmart24"`
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*"/,
      `<meta name="twitter:description" content="${description}"`
    );

  if (!html.includes('rel="canonical"')) {
    html = html.replace('</head>', `  <link rel="canonical" href="${canonicalUrl}" />\n  </head>`);
  }

  const crawlerHtml = `
    <div id="seo-crawler-content" style="display:none;" aria-hidden="true">
      <h1>${title}</h1>
      <p>${description}</p>
      ${tool.formula ? `<p>Formula: ${tool.formula}</p>` : ''}
      <a href="/">Home</a>
      <a href="/${tool.categorySlug}">${tool.category}</a>
      <a href="/about">About Us</a>
      <a href="/contact">Contact</a>
    </div>
  `;

  html = html.replace('<div id="root"></div>', `${crawlerHtml}\n    <div id="root"></div>`);
  fs.writeFileSync(path.join(toolDir, "index.html"), html);
});

// 2. Generate sitemap.xml
const sitemapPath = path.join(publicDir, "sitemap.xml");
const today = new Date().toISOString().split('T')[0];

let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
sitemapXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

// Home and fixed pages
const fixedPages = [
  { url: "https://calcsmart24.com/", priority: "1.0" },
  { url: "https://calcsmart24.com/about", priority: "0.8" },
  { url: "https://calcsmart24.com/contact", priority: "0.8" },
  { url: "https://calcsmart24.com/terms", priority: "0.5" },
  { url: "https://calcsmart24.com/privacy-policy", priority: "0.5" },
];

fixedPages.forEach(page => {
  sitemapXml += `  <url>\n`;
  sitemapXml += `    <loc>${page.url}</loc>\n`;
  sitemapXml += `    <lastmod>${today}</lastmod>\n`;
  sitemapXml += `    <changefreq>daily</changefreq>\n`;
  sitemapXml += `    <priority>${page.priority}</priority>\n`;
  sitemapXml += `  </url>\n`;
});

// Category pages
calculatorCategories.forEach(cat => {
  sitemapXml += `  <url>\n`;
  sitemapXml += `    <loc>https://calcsmart24.com/${cat.slug}</loc>\n`;
  sitemapXml += `    <lastmod>${today}</lastmod>\n`;
  sitemapXml += `    <changefreq>weekly</changefreq>\n`;
  sitemapXml += `    <priority>0.9</priority>\n`;
  sitemapXml += `  </url>\n`;
});

// Tool pages
tools.forEach(tool => {
  sitemapXml += `  <url>\n`;
  sitemapXml += `    <loc>https://calcsmart24.com/calculator/${tool.slug}</loc>\n`;
  sitemapXml += `    <lastmod>${today}</lastmod>\n`;
  sitemapXml += `    <changefreq>weekly</changefreq>\n`;
  sitemapXml += `    <priority>0.8</priority>\n`;
  sitemapXml += `  </url>\n`;
});

sitemapXml += `</urlset>`;
fs.writeFileSync(sitemapPath, sitemapXml);
console.log("sitemap.xml generated successfully.");

console.log("All tools prerendered successfully.");