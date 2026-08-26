# SWAYA Web & Media Workstation Client

> Official website, documentation hub, competitor comparisons, and web preview client for the SWAYA offline media workstation.

---

## 🏛️ Architecture Overview

The codebase is organized into two primary subsystems:

```
src/
├── app/      # Desktop App UI & Interactive Web Demo (Library, Organizer, Player, Lists, Settings)
├── site/     # Marketing Website, Multi-Language SSG, Docs Hub, Comparisons, Changelog, Help
└── assets/   # Static artwork, logos, and vector assets
```

### 1. Site Subsystem (`src/site`)
- **10-Language Hybrid Internationalization**: Supports `en`, `de`, `ja`, `hu`, `fr`, `es`, `zh`, `it`, `ru`, `pt`.
- **Static Site Generation (SSG)**: Multi-language prerendering with automatic HTML injection and schema generation.
- **Enterprise SEO & Structured Data**: Rich JSON-LD schemas (`WebSite`, `SoftwareApplication`, `VideoObject`, `FaqPage`, `TechArticle`, `BreadcrumbList`) and `hreflang` tags on all pages.
- **Component-Level CSS Modules**: Strict 1:1 JSX-to-CSS-module mapping adhering to the centralized design system.

### 2. App Subsystem (`src/app`)
- **Interactive Web Demo**: Simulates desktop workstation capabilities (MPV video player, metadata curation, batch renaming dry-runs) in-browser.

---

## 📂 Project Structure

```
client/
├── public/                 # Static public assets (favicons, logos, sitemap, manifest)
├── scripts/
│   ├── build-vector-logo.js      # Vector logo and OG banner generation
│   ├── generate-og-images.js     # OpenGraph social card generator
│   └── prerender/                # Multi-language SSG engine
│       ├── constants.js          # Locales, doc metadata, build config
│       ├── generators/           # Page HTML builders (landing, docs, compare, help, etc.)
│       ├── schema.js             # Prerender JSON-LD schema builder
│       └── sitemap.js            # Dynamic multi-lingual XML sitemap generator
├── src/
│   ├── site/
│   │   ├── components/           # Site UI components (hero, showcase, faq, docs, etc.)
│   │   ├── data/                 # Configs, comparisons, changelog, documentation metadata
│   │   ├── docs/                 # Localized markdown documentation guides (10 languages)
│   │   ├── hooks/                # Dedicated state and logic hooks for all components
│   │   ├── lib/                  # Analytics, meta utilities, markdown compiler
│   │   ├── locales/              # Translation dictionaries (.json)
│   │   ├── pages/                # Route page components
│   │   ├── schema/               # Dynamic client-side JSON-LD builders
│   │   ├── routes.jsx            # React Router root definitions
│   │   └── routesConfig.js       # Centralized route manifest and lazy imports
│   ├── index.css                 # Global CSS variables, reset, and focus rings
│   └── main.jsx                  # Application entry point
├── tests/                        # Playwright E2E and smoke test suites
├── eslint.config.js              # ESLint Flat Config with custom i18n & a11y rules
└── vite.config.js                # Vite build and bundle chunking configuration
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `>= 20.0.0`
- npm `>= 10.0.0`

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Starts the local development server at `http://localhost:5173`.

### Production Build & SSG Prerender
```bash
npm run build
```
Executes:
1. `vite build` — Bundles optimized client assets into `build/`.
2. `node scripts/prerender.js` — Prerenders all 130+ static HTML pages across 10 languages and generates `sitemap.xml`.

### Code Quality & Linting
```bash
npm run lint         # Run ESLint validation
npm run lint:fix     # Automatically fix ESLint issues
npm run lint:style   # Run Stylelint on CSS stylesheets
```

### Testing
```bash
npm run test:smoke   # Run Playwright smoke test suite
```

---

## ⚡ Static Site Generation (SSG) Engine

The SSG engine (`scripts/prerender/`) produces pre-compiled, SEO-optimized static HTML files during build:

- **Root Routing**: `/` (English default) and `/:lang/` (for non-English locales).
- **Documentation**: `/docs` (Hub) and `/docs/:slug` (13 technical guides per language).
- **Comparisons**: `/compare` (Hub) and `/compare/:slug` (6 software comparisons per language).
- **Changelog & Help**: `/changelog` and `/help`.
- **404 Fallback**: `/404.html` with `noindex` and root-relative asset paths.

### Adding a New Page to the SSG Pipeline
1. Define the page route in [routesConfig.js](file:///e:/projects/repos/swaya-web/client/src/site/routesConfig.js).
2. Create a generator function in `scripts/prerender/generators/`.
3. Register the generator loop in [scripts/prerender/index.js](file:///e:/projects/repos/swaya-web/client/scripts/prerender/index.js).
4. Add the URL pattern to [sitemap.js](file:///e:/projects/repos/swaya-web/client/scripts/prerender/sitemap.js).

---

## 🎨 Design System & CSS Rules

1. **Strict Token Usage**: Concrete colors (`#fff`, `rgb(...)`) or raw pixel dimensions must never be hardcoded in component CSS modules. Always use `var(--...)` tokens.
2. **No `!important`**: Overrides must use proper specificity or component composition.
3. **No External Margins**: Spacing between components is always the responsibility of parent layout containers.
4. **CSS Modules**: All components use `[Component].module.css` with flat BEM-style class naming.
