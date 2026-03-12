import fs from "node:fs";
import { type Server } from "node:http";
import path from "node:path";
import { createGzip } from "node:zlib";

import express, { type Express } from "express";

import runApp from "./app";
import {
  getAllToolsServer,
  generateSitemapXml,
  generateRobotsTxt,
  injectSeoIntoHtml,
  injectCategorySeoIntoHtml,
  injectHomeSeoIntoHtml,
  injectConverterSeoIntoHtml,
  injectConverterCategorySeoIntoHtml,
  injectConverterHubSeoIntoHtml,
  calculatorCategorySlugs,
  converterCategorySlugs as convCatSlugs,
  getConverterPageBySlug,
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

  app.get("/robots.txt", (_req, res) => {
    res.type("text/plain").send(generateRobotsTxt());
  });

  app.get("/sitemap.xml", (_req, res) => {
    res.type("application/xml").send(generateSitemapXml());
  });

  app.use(
    express.static(distPath, {
      redirect: false,
      index: false,
      maxAge: "1d",
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".html")) {
          res.setHeader("Cache-Control", "no-cache");
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