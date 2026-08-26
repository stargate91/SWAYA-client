# SWAYA Static Site Generation (SSG) Engine

The SSG engine compiles multi-lingual, pre-rendered static HTML pages and generates a rich `sitemap.xml` during `npm run build`.

---

## 🏗️ Architecture & Execution Flow

```
npm run build
  │
  ├── 1. vite build (Compiles client bundle into build/)
  │
  └── 2. node scripts/prerender.js
        │
        ├── Reads build/index.html (base HTML template)
        │
        ├── Iterates over all 10 locales:
        │   ├── Landing Page:        / and /:lang
        │   ├── Docs Hub:            /docs and /:lang/docs
        │   ├── 13 Technical Guides: /docs/:slug and /:lang/docs/:slug
        │   ├── Changelog:           /changelog and /:lang/changelog
        │   ├── Help & Support:      /help and /:lang/help
        │   ├── Comparisons Hub:     /compare and /:lang/compare
        │   └── 6 Competitor Pages:  /compare/:slug and /:lang/compare/:slug
        │
        ├── 404 Fallback:            /404.html (noindex, follow)
        │
        └── Sitemap Generator:       /sitemap.xml (with image/video rich schemas)
```

---

## 📁 File Structure

- `index.js`: Main execution pipeline. Loops through all supported locales and triggers page generators.
- `constants.js`: Definition of `LOCALES`, `DOC_METADATA`, `BUILD_DIR`, and `BASE_URL`.
- `generators/`:
  - `landing.js`: Generates landing page with pre-rendered hero, video, and FAQ JSON-LD.
  - `docs.js`: Pre-renders documentation markdown into HTML with syntax highlighting and table of contents.
  - `compare.js`: Pre-renders side-by-side comparison tables, pros/cons, and FAQs.
  - `changelog.js`: Generates release notes and highlights.
  - `help.js`: Pre-renders community and developer contact cards.
  - `notFound.js`: Generates standalone 404 fallback page.
- `schema.js`: Builds JSON-LD structured data (`WebSite`, `VideoObject`, `SoftwareApplication`, `FaqPage`, `TechArticle`).
- `sitemap.js`: Dynamically outputs multi-lingual XML sitemap with alternate language `xhtml:link` tags.

---

## ➕ How to Add a New Route to the SSG Engine

1. **Define the Route in Frontend**: Add the route in `src/site/routesConfig.js`.
2. **Create Generator**: Create `scripts/prerender/generators/myNewPage.js` that takes `(templateHtml, locale)` and replaces `<title>`, `<meta>`, `<script id="site-jsonld">`, and `<main>` tags.
3. **Register Generator in Prerender Index**: Import and invoke the generator in `scripts/prerender/index.js` inside the `for (const locale of LOCALES)` loop.
4. **Update Sitemap**: Add the URL pattern to `scripts/prerender/sitemap.js`.
