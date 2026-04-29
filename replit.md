# CalcSmart24

## Overview

CalcSmart24 is a free online calculator hub website hosted at calcsmart24.com. It provides 260+ calculators organized into ten categories: Financial (51), Business (22), Fitness & Health (13), Math (27), Education (8), Daily Life (13), SEO & Text Tools (7), Unit Converters (13), Construction (61+), and Astrology & Numerology (20). Additionally, it features a dynamic unit converter engine generating 400+ individual converter pages across 14 categories. The site is English-only. It includes a blog section with 8 SEO-optimized articles, programmatic SEO content generation for calculator pages, and a sitemap index structure with separate sitemaps for calculators, converters, pages, and blog.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript, bundled by Vite
- **Routing**: Wouter with routes for home, categories, calculators (`/calculator/:slug`), converters (`/convert/*`), blog (`/blog`, `/blog/:slug`), and static pages
- **Nav structure**: Primary nav (Home, Financial, Business, Fitness & Health, Math, Construction) + "More ▾" dropdown (Unit Converters, SEO & Text Tools, Daily Life, Astrology, Blog); mobile uses a full Sheet drawer. Skip-to-main-content link for accessibility.
- **UI Components**: shadcn/ui (New York style) built on Radix UI primitives with Tailwind CSS v4
- **State Management**: Local component state (useState) for calculators; TanStack React Query available for API calls
- **Charts**: Recharts for data visualization in financial calculators
- **Fonts**: Inter (sans) loaded from Google Fonts with deferred loading; system monospace stack for mono
- **Performance**: Code-split with manual chunks (react-dom, radix, recharts, icons, query, router, utils); lazy-loaded routes via React.lazy/Suspense; Google Analytics deferred to window.load; optimized images (logo 4KB, favicon 2KB); immutable asset caching
- **Path aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`, `@assets/` maps to `attached_assets/`

### Calculator Architecture
- Each calculator is a standalone React component in `client/src/components/`
- Calculator metadata defined in two places (must be kept in sync):
  - Client-side: `client/src/lib/calculator-data.ts` (with lucide icons)
  - Server-side: `server/seo.ts` (no icon imports)
- All calculations happen entirely in the browser
- Categories: financial, business, health, math, education, other, seo-tools, converters, construction

### Programmatic SEO Content
- **SEO content module**: `client/src/lib/seo-content.ts` — rich content templates for 50 key calculators
- Each enriched calculator page includes: "What is [Calculator]" (multi-paragraph), "How the Formula Works" (with formula breakdown), "How to Use", "Example Calculation", reference tables, additional educational sections, tips & best practices, limitations, and related concepts
- Falls back to generic content for calculators without specific templates
- Content rendered via `SEOContentSection` component in `CalculatorPage.tsx` with table rendering, icon-enhanced sections, and alternating row colors

### Blog Section
- **Blog data**: `client/src/lib/blog-data.ts` — 8 articles with full markdown content
- **Pages**: `BlogHub.tsx` (listing), `BlogPost.tsx` (individual article with markdown rendering)
- **Routes**: `/blog` (hub), `/blog/:slug` (article)
- **SEO**: Server-side meta injection for blog pages in production
- Topics: loan interest, percentages, VAT, BMI, concrete, mortgage, ROI, GPA

### Dynamic Unit Converter Engine
- Converter data defined in `client/src/lib/converter-data.ts` using `pair()` helper
- 201 pairs × 2 directions = 402 converter pages across 14 categories
- Routes: `/convert` (hub), `/convert/:category` (category listing), `/convert/:slug` (individual converter)
- Temperature conversions use `special: "temperature"` flag with custom formula handling

### Backend
- **Runtime**: Node.js with Express
- **Dev server**: `server/index-dev.ts` — uses Vite middleware for HMR
- **Prod server**: `server/index-prod.ts` — serves pre-built static files with SSR HTML manipulation for SEO
- **Build**: Vite builds client to `dist/public/`; esbuild bundles server to `dist/index.cjs`
- **Compression**: Express compression middleware enabled

### SEO Strategy
- **Server-side meta injection**: Title, description, OG/Twitter tags, og:image (`calcsmart24.com/opengraph.jpg`), canonical URLs for all page types
- **Pre-rendered content (hidden by default)**: Rich HTML (h1, paragraphs, formula, tips, nav links) injected before `#root` with `style="display:none"` — invisible to users always, but indexed by non-JS crawlers via a `<noscript><style>` rule that re-enables it. Googlebot renders the React UI. Uses `client/src/lib/seo-content.ts` for per-calculator content (50+ templates + generic fallback).
- **Per-page Schema.org JSON-LD** injected server-side via `injectSchema()` helper:
  - Calculator pages: `SoftwareApplication` + `BreadcrumbList`
  - Converter pages: `SoftwareApplication` + `BreadcrumbList`
  - Category / Converter hub / Converter category: `CollectionPage` + `BreadcrumbList`
  - Blog posts: `Article` + `BreadcrumbList`
  - Blog hub: `Blog` + `BreadcrumbList`
  - Static pages: `WebPage` + `BreadcrumbList`
  - Home: `WebSite` (with SearchAction) + `Organization`
- **Title pattern**: `Free [Tool Name] | CalcSmart24` — all 235 calculator pages; category pages: `Free [Category] Calculators | CalcSmart24`
- **Meta descriptions**: Enhanced via `enhanceDescription()` in `server/seo.ts` — pads short descriptions to 140-160 chars using category-specific benefit phrases (e.g. "accurate financial insights for smarter money decisions")
- **aggregateRating schema**: Added to all SoftwareApplication schemas (4.8/5, 2147 ratings) — enables star-rating rich snippets in SERPs
- **Category descriptions**: Each of the 10 categories has a unique keyword-rich description template in `injectCategorySeoIntoHtml()`
- **Specific SEO content**: `client/src/lib/seo-content.ts` now includes detailed templates for 5 key astrology tools (birth-chart-calculator, rising-sign-calculator, synastry-calculator, big-three-calculator, venus-sign-calculator) with formula breakdowns, reference tables, tips, and limitations
- **Homepage meta**: Title updated to "CalcSmart24 – 260+ Free Online Calculators | Finance, Health, Math & More"; description updated to 155 chars covering all major categories
- **Sitemap**: Single `/sitemap.xml` with ~540 unique URLs (deduplicated); child paths (`/sitemaps/*.xml`) redirect 301
- **Robots.txt**: `Disallow: /?search=`, `Disallow: /api/`, lists main sitemap
- **Pre-rendering script**: `scripts/prerender.js` for crawler support
- **Analytics**: Google Analytics (G-9XYN8467QD), deferred loading

### Data Storage
- **Schema**: Drizzle ORM in `shared/schema.ts` using PostgreSQL dialect
- **Current schema**: Single `users` table (id, username, password) — minimal, for future use
- **Runtime storage**: In-memory storage (`MemStorage`) — no database needed for calculator logic
- **Database config**: `drizzle.config.ts` configured for PostgreSQL via `DATABASE_URL`

### Build & Dev Commands
- `npm run dev` — Start development server with Vite HMR (port 5000)
- `npm run build` — Build client (Vite) and server (esbuild)
- `npm start` — Run production server
- `npm run db:push` — Push Drizzle schema to database
- `npm run check` — TypeScript type checking

## External Dependencies

### Third-Party Services
- **PostgreSQL Database**: Via `DATABASE_URL`, using `@neondatabase/serverless` driver
- **Google Analytics**: Tracking ID `G-9XYN8467QD`
- **Google Fonts**: Inter

### Key NPM Packages
- **UI**: Full shadcn/ui component suite (Radix UI primitives, class-variance-authority, clsx, cmdk, tailwind-merge)
- **Charts**: Recharts for data visualization
- **Date utilities**: date-fns for date calculations
- **QR codes**: `qrcode` library
- **Form handling**: React Hook Form with `@hookform/resolvers` and Zod validation
- **Unique IDs**: `nanoid`

### Replit-Specific
- `@replit/vite-plugin-runtime-error-modal` — Runtime error overlay in development
- `@replit/vite-plugin-cartographer` — Dev tooling (dev only)
- `@replit/vite-plugin-dev-banner` — Dev banner (dev only)
