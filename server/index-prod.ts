import fs from "node:fs";
import { type Server } from "node:http";
import path from "node:path";

import express, { type Express } from "express";

import runApp from "./app";
import {
  getAllToolsServer,
  injectSeoIntoHtml,
  injectCategorySeoIntoHtml,
  injectHomeSeoIntoHtml,
  injectConverterSeoIntoHtml,
  injectConverterCategorySeoIntoHtml,
  injectConverterHubSeoIntoHtml,
  injectBlogPostSeoIntoHtml,
  injectBlogHubSeoIntoHtml,
  injectStaticPageSeoIntoHtml,
  calculatorCategorySlugs,
  converterCategorySlugs as convCatSlugs,
  getConverterPageBySlug,
  blogPostsSeo,
} from "./seo";

export async function serveStatic(app: Express, server: Server) {
  const distPath = path.resolve(__dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  const indexHtml = fs.readFileSync(
    path.resolve(distPath, "index.html"),
    "utf-8"
  );

  const tools = getAllToolsServer();
  const toolMap = new Map(tools.map((t) => [t.slug, t]));
  const categorySlugs = new Set(calculatorCategorySlugs.map((c) => c.slug));
  const blogPostMap = new Map(blogPostsSeo.map((p) => [p.slug, p]));

  app.use(
    express.static(distPath, {
      redirect: false,
      index: false,
      maxAge: "1y",
      immutable: true,
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".html")) {
          res.setHeader("Cache-Control", "no-cache");
        } else if (filePath.includes("/assets/")) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        } else if (filePath.endsWith(".png") || filePath.endsWith(".jpg") || filePath.endsWith(".ico")) {
          res.setHeader("Cache-Control", "public, max-age=86400");
        }
      },
    })
  );

  app.get("/", (req, res) => {
    const searchTerm = req.query.search as string | undefined;
    if (searchTerm) {
      const escaped = searchTerm.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
      let html = injectHomeSeoIntoHtml(indexHtml);
      html = html
        .replace(/<title>.*?<\/title>/, `<title>Search: ${escaped} | CalcSmart24</title>`)
        .replace("</head>", `<meta name="robots" content="noindex, follow">\n</head>`);
      res.type("html").send(html);
    } else {
      const html = injectHomeSeoIntoHtml(indexHtml);
      res.type("html").send(html);
    }
  });

  app.get("/calculator/:slug", (req, res) => {
    const tool = toolMap.get(req.params.slug);
    if (tool) {
      const html = injectSeoIntoHtml(indexHtml, tool);
      res.type("html").send(html);
    } else {
      res.type("html").send(indexHtml);
    }
  });

  app.get("/convert", (_req, res) => {
    const html = injectConverterHubSeoIntoHtml(indexHtml);
    res.type("html").send(html);
  });

  const convCatSet = new Set(convCatSlugs);
  app.get("/convert/:slug", (req, res) => {
    const slug = req.params.slug;
    if (convCatSet.has(slug)) {
      const html = injectConverterCategorySeoIntoHtml(indexHtml, slug);
      res.type("html").send(html);
    } else {
      const conv = getConverterPageBySlug(slug);
      if (conv) {
        const html = injectConverterSeoIntoHtml(indexHtml, conv);
        res.type("html").send(html);
      } else {
        res.type("html").send(indexHtml);
      }
    }
  });

  app.get("/blog", (_req, res) => {
    const html = injectBlogHubSeoIntoHtml(indexHtml);
    res.type("html").send(html);
  });

  app.get("/blog/:slug", (req, res) => {
    const post = blogPostMap.get(req.params.slug);
    if (post) {
      const html = injectBlogPostSeoIntoHtml(indexHtml, post);
      res.type("html").send(html);
    } else {
      res.type("html").send(indexHtml);
    }
  });

  const categoryRoutes = Array.from(categorySlugs);
  for (const slug of categoryRoutes) {
    app.get(`/${slug}`, (_req, res) => {
      const html = injectCategorySeoIntoHtml(indexHtml, slug);
      res.type("html").send(html);
    });
  }

  app.get("/about", (_req, res) => {
    const html = injectStaticPageSeoIntoHtml(indexHtml, {
      title: "About Us",
      h1: "About CalcSmart24",
      description: "CalcSmart24 is a free online calculator hub with 240+ tools for finance, health, math, business, construction, and more. Fast, accurate, and mobile-friendly.",
      slug: "about",
    });
    res.type("html").send(html);
  });

  app.get("/contact", (_req, res) => {
    const html = injectStaticPageSeoIntoHtml(indexHtml, {
      title: "Contact Us",
      h1: "Contact CalcSmart24",
      description: "Get in touch with the CalcSmart24 team. We welcome feedback, suggestions, and partnership inquiries.",
      slug: "contact",
    });
    res.type("html").send(html);
  });

  app.get("/terms", (_req, res) => {
    const html = injectStaticPageSeoIntoHtml(indexHtml, {
      title: "Terms of Service",
      h1: "Terms of Service",
      description: "Read the CalcSmart24 Terms of Service. Learn about the rules and guidelines for using our free online calculators.",
      slug: "terms",
    });
    res.type("html").send(html);
  });

  app.get("/privacy-policy", (_req, res) => {
    const html = injectStaticPageSeoIntoHtml(indexHtml, {
      title: "Privacy Policy",
      h1: "Privacy Policy",
      description: "CalcSmart24 Privacy Policy. Learn how we collect, use, and protect your data when using our free online calculators.",
      slug: "privacy-policy",
    });
    res.type("html").send(html);
  });

  app.use("*", (_req, res) => {
    res.type("html").send(indexHtml);
  });
}

(async () => {
  await runApp(serveStatic);
})();
