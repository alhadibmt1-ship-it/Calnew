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
  injectHreflangIntoHtml,
  injectBlogPostSeoIntoHtml,
  injectBlogHubSeoIntoHtml,
  calculatorCategorySlugs,
  converterCategorySlugs as convCatSlugs,
  getConverterPageBySlug,
  blogPostsSeo,
} from "./seo";

const SUPPORTED_LANGS = ["es", "ar", "hi", "fr", "pt"];

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
      maxAge: "1d",
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".html")) {
          res.setHeader("Cache-Control", "no-cache");
        }
      },
    })
  );

  app.get("/", (_req, res) => {
    let html = injectHomeSeoIntoHtml(indexHtml);
    html = injectHreflangIntoHtml(html, "/");
    res.type("html").send(html);
  });

  app.get("/calculator/:slug", (req, res) => {
    const tool = toolMap.get(req.params.slug);
    if (tool) {
      let html = injectSeoIntoHtml(indexHtml, tool);
      html = injectHreflangIntoHtml(html, `/calculator/${req.params.slug}`);
      res.type("html").send(html);
    } else {
      res.type("html").send(indexHtml);
    }
  });

  app.get("/convert", (_req, res) => {
    let html = injectConverterHubSeoIntoHtml(indexHtml);
    html = injectHreflangIntoHtml(html, "/convert");
    res.type("html").send(html);
  });

  const convCatSet = new Set(convCatSlugs);
  app.get("/convert/:slug", (req, res) => {
    const slug = req.params.slug;
    if (convCatSet.has(slug)) {
      let html = injectConverterCategorySeoIntoHtml(indexHtml, slug);
      html = injectHreflangIntoHtml(html, `/convert/${slug}`);
      res.type("html").send(html);
    } else {
      const conv = getConverterPageBySlug(slug);
      if (conv) {
        let html = injectConverterSeoIntoHtml(indexHtml, conv);
        html = injectHreflangIntoHtml(html, `/convert/${slug}`);
        res.type("html").send(html);
      } else {
        res.type("html").send(indexHtml);
      }
    }
  });

  app.get("/blog", (_req, res) => {
    let html = injectBlogHubSeoIntoHtml(indexHtml);
    html = injectHreflangIntoHtml(html, "/blog");
    res.type("html").send(html);
  });

  app.get("/blog/:slug", (req, res) => {
    const post = blogPostMap.get(req.params.slug);
    if (post) {
      let html = injectBlogPostSeoIntoHtml(indexHtml, post);
      html = injectHreflangIntoHtml(html, `/blog/${req.params.slug}`);
      res.type("html").send(html);
    } else {
      res.type("html").send(indexHtml);
    }
  });

  const categoryRoutes = Array.from(categorySlugs);
  for (const slug of categoryRoutes) {
    app.get(`/${slug}`, (_req, res) => {
      let html = injectCategorySeoIntoHtml(indexHtml, slug);
      html = injectHreflangIntoHtml(html, `/${slug}`);
      res.type("html").send(html);
    });
  }

  for (const langCode of SUPPORTED_LANGS) {
    app.get(`/${langCode}`, (_req, res) => {
      let html = injectHomeSeoIntoHtml(indexHtml);
      html = injectHreflangIntoHtml(html, "/");
      res.type("html").send(html);
    });

    app.get(`/${langCode}/calculator/:slug`, (req, res) => {
      const tool = toolMap.get(req.params.slug);
      if (tool) {
        let html = injectSeoIntoHtml(indexHtml, tool);
        html = injectHreflangIntoHtml(html, `/calculator/${req.params.slug}`);
        res.type("html").send(html);
      } else {
        res.type("html").send(indexHtml);
      }
    });

    for (const catSlug of categoryRoutes) {
      app.get(`/${langCode}/${catSlug}`, (_req, res) => {
        let html = injectCategorySeoIntoHtml(indexHtml, catSlug);
        html = injectHreflangIntoHtml(html, `/${catSlug}`);
        res.type("html").send(html);
      });
    }

    app.get(`/${langCode}/convert`, (_req, res) => {
      let html = injectConverterHubSeoIntoHtml(indexHtml);
      html = injectHreflangIntoHtml(html, "/convert");
      res.type("html").send(html);
    });

    app.get(`/${langCode}/convert/:slug`, (req, res) => {
      const slug = req.params.slug;
      if (convCatSet.has(slug)) {
        let html = injectConverterCategorySeoIntoHtml(indexHtml, slug);
        html = injectHreflangIntoHtml(html, `/convert/${slug}`);
        res.type("html").send(html);
      } else {
        const conv = getConverterPageBySlug(slug);
        if (conv) {
          let html = injectConverterSeoIntoHtml(indexHtml, conv);
          html = injectHreflangIntoHtml(html, `/convert/${slug}`);
          res.type("html").send(html);
        } else {
          res.type("html").send(indexHtml);
        }
      }
    });

    app.get(`/${langCode}/blog`, (_req, res) => {
      let html = injectBlogHubSeoIntoHtml(indexHtml);
      html = injectHreflangIntoHtml(html, "/blog");
      res.type("html").send(html);
    });

    app.get(`/${langCode}/blog/:slug`, (req, res) => {
      const post = blogPostMap.get(req.params.slug);
      if (post) {
        let html = injectBlogPostSeoIntoHtml(indexHtml, post);
        html = injectHreflangIntoHtml(html, `/blog/${req.params.slug}`);
        res.type("html").send(html);
      } else {
        res.type("html").send(indexHtml);
      }
    });
  }

  app.use("*", (_req, res) => {
    res.type("html").send(indexHtml);
  });
}

(async () => {
  await runApp(serveStatic);
})();
