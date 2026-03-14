import fs from "node:fs";
import { type Server } from "node:http";
import path from "node:path";

import express, { type Express } from "express";

import runApp from "./app";
import {
  getAllToolsServer,
  generateSitemapXml,
  generateCalculatorsSitemap,
  generateConvertersSitemap,
  generatePagesSitemap,
  generateBlogSitemap,
  generateRobotsTxt,
  injectSeoIntoHtml,
  injectCategorySeoIntoHtml,
  injectHomeSeoIntoHtml,
  injectConverterSeoIntoHtml,
  injectConverterCategorySeoIntoHtml,
  injectConverterHubSeoIntoHtml,
  injectBlogPostSeoIntoHtml,
  injectBlogHubSeoIntoHtml,
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

  app.get("/robots.txt", (_req, res) => {
    res.type("text/plain").send(generateRobotsTxt());
  });

  app.get("/sitemap.xml", (_req, res) => {
    res.type("application/xml").send(generateSitemapXml());
  });

  app.get("/sitemap_index.xml", (_req, res) => {
    res.type("application/xml").send(generateSitemapXml());
  });

  app.get("/sitemaps/calculators.xml", (_req, res) => {
    res.type("application/xml").send(generateCalculatorsSitemap());
  });

  app.get("/sitemaps/converters.xml", (_req, res) => {
    res.type("application/xml").send(generateConvertersSitemap());
  });

  app.get("/sitemaps/pages.xml", (_req, res) => {
    res.type("application/xml").send(generatePagesSitemap());
  });

  app.get("/sitemaps/blog.xml", (_req, res) => {
    res.type("application/xml").send(generateBlogSitemap());
  });

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

  app.get("/", (_req, res) => {
    const html = injectHomeSeoIntoHtml(indexHtml);
    res.type("html").send(html);
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

  app.use("*", (_req, res) => {
    res.type("html").send(indexHtml);
  });
}

(async () => {
  await runApp(serveStatic);
})();
