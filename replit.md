# CalcSmart24

## Overview

CalcSmart24 is a free online calculator hub website hosted at calcsmart24.com. It provides 60+ calculators organized into six categories: Financial, Fitness & Health, Math, Unit Converters, SEO & Text Tools, and Daily Life. The app is a full-stack TypeScript project with a React SPA frontend and an Express backend. All calculator logic runs client-side (no server computation needed). The backend primarily handles serving the SPA, SEO (server-side HTML injection for meta tags, sitemap, robots.txt), and has a minimal user schema for potential future features.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript, bundled by Vite
- **Routing**: Wouter (lightweight client-side router) with routes for home, category hub pages, individual calculator pages (`/calculator/:slug`), and static pages (about, contact, privacy, terms)
- **UI Components**: shadcn/ui (New York style) built on Radix UI primitives with Tailwind CSS v4 (using `@tailwindcss/vite` plugin)
- **State Management**: Local component state (useState) for calculators; TanStack React Query available for any API calls
- **Charts**: Recharts for data visualization in financial calculators (pie charts, bar charts)
- **Fonts**: Inter (sans) and JetBrains Mono (mono), loaded from Google Fonts with preload optimization
- **Path aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`, `@assets/` maps to `attached_assets/`

### Calculator Architecture
- Each calculator is a standalone React component in `client/src/components/` (e.g., `BMICalculator.tsx`, `LoanCalculator.tsx`)
- Calculator metadata (name, slug, description, category) is defined in two places:
  - Client-side: `client/src/lib/calculator-data.ts` (for routing and display)
  - Server-side: `server/seo.ts` (for SSR meta tag injection and sitemap generation)
- All calculations happen entirely in the browser — no API calls needed for computation
- Categories: financial, health, math, converters, seo-tools, other

### Backend
- **Runtime**: Node.js with Express
- **Dev server**: `server/index-dev.ts` — uses Vite middleware for HMR
- **Prod server**: `server/index-prod.ts` — serves pre-built static files from `dist/public/`, with server-side HTML manipulation for SEO
- **Build**: Vite builds the client to `dist/public/`; esbuild bundles the server to `dist/index.cjs`
- **Compression**: Express compression middleware enabled
- **API**: Routes registered in `server/routes.ts` under `/api` prefix (currently minimal)

### SEO Strategy
- **Server-side meta injection**: In production, the server intercepts requests for calculator pages and category pages, injecting appropriate `<title>`, `<meta description>`, and Open Graph tags into the HTML before serving
- **Sitemap**: Dynamically generated at `/sitemap.xml` from the tool registry in `server/seo.ts`
- **Robots.txt**: Dynamically served at `/robots.txt`
- **Pre-rendering script**: `scripts/prerender.js` creates static HTML files for all routes to support crawlers
- **Schema.org**: JSON-LD structured data in `index.html`
- **Analytics**: Google Analytics (G-9XYN8467QD) integrated in the HTML head
- **OpenGraph images**: Vite plugin (`vite-plugin-meta-images.ts`) auto-updates og:image URLs with the deployment domain

### Data Storage
- **Schema**: Defined with Drizzle ORM in `shared/schema.ts` using PostgreSQL dialect
- **Current schema**: Single `users` table (id, username, password) — minimal, for future use
- **Validation**: Zod schemas generated from Drizzle schemas via `drizzle-zod`
- **Runtime storage**: Currently uses in-memory storage (`MemStorage` class in `server/storage.ts`) — not connected to a real database for calculator functionality
- **Database config**: `drizzle.config.ts` configured for PostgreSQL via `DATABASE_URL` environment variable
- **DB provider**: Uses `@neondatabase/serverless` for PostgreSQL connections
- **Migrations**: Output to `./migrations` directory; push with `npm run db:push`

### Build & Dev Commands
- `npm run dev` — Start development server with Vite HMR (port 5000)
- `npm run build` — Build client (Vite) and server (esbuild)
- `npm start` — Run production server
- `npm run db:push` — Push Drizzle schema to database
- `npm run check` — TypeScript type checking

## External Dependencies

### Third-Party Services
- **PostgreSQL Database**: Connected via `DATABASE_URL` environment variable, using `@neondatabase/serverless` driver and Drizzle ORM
- **Google Analytics**: Tracking ID `G-9XYN8467QD`
- **Google Fonts**: Inter and JetBrains Mono font families

### Key NPM Packages
- **UI**: Full shadcn/ui component suite (Radix UI primitives, class-variance-authority, clsx, cmdk, tailwind-merge)
- **Charts**: Recharts for data visualization
- **Date utilities**: date-fns for date calculations across multiple calculators
- **QR codes**: `qrcode` library for QR code generation
- **Form handling**: React Hook Form with `@hookform/resolvers` and Zod validation
- **Session store**: `connect-pg-simple` (available for future session management)
- **Unique IDs**: `nanoid` for ID generation

### Replit-Specific
- `@replit/vite-plugin-runtime-error-modal` — Runtime error overlay in development
- `@replit/vite-plugin-cartographer` — Dev tooling (dev only)
- `@replit/vite-plugin-dev-banner` — Dev banner (dev only)