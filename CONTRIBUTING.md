# Contributing to SWAYA Web

Thank you for contributing to SWAYA. This guide outlines the development standards, architectural principles, and workflows required for maintaining production and enterprise-grade code quality.

---

## 🧭 Architectural Principles

### 1. Separation of Concerns (SoC)
- **Presentation vs. Logic**: Components (`.jsx`) handle layout and rendering. All state management, effects, event handlers, and data fetching must live in dedicated custom hooks (`use[Component].js`).
- **Data Normalization**: Raw JSON and API responses must pass through dedicated normalizer functions (e.g. `faqNormalizer.js`, `changelogNormalizer.js`, `comparisonNormalizer.js`) before reaching UI components.

### 2. Localization (i18n) Rules
- **No Hardcoded Strings**: All user-facing text must use `t('key')` from the `LanguageContext`.
- **Single Source of Truth**: Text content resides in `src/site/locales/{locale}/*.json` or dedicated translation dictionaries.
- **Fallback Support**: Normalizers must provide automatic fallback to canonical English when translations are missing.

### 3. CSS & Styling Standards
- **Token-Only Styling**: Hardcoded colors (`#112233`), concrete pixel sizes (`14px`), or font families are strictly prohibited in `.module.css` files. Reference `var(--...)` tokens from `src/index.css` and `src/app/styles/variables.css`.
- **No `!important`**: Never use `!important`.
- **Encapsulated Dimensions**: Components must never declare external margins (`margin-top`, `margin-bottom`). Layout containers manage spacing via `gap` or layout padding.
- **Flat Class Selectors**: Avoid deep nesting. Prefer flat BEM class selectors (e.g., `.card-title`, `.hero--scrolled`).

---

## 🛠️ Development Workflow

### Branching & Commits
1. Branch from `main`.
2. Commit with clear, descriptive messages.
3. Verify that linting and builds pass locally before opening a pull request.

### Quality Checklist Before Submission
```bash
# 1. Run ESLint validation (must return 0 errors, 0 warnings)
npm run lint

# 2. Run Stylelint on CSS modules
npm run lint:style

# 3. Test production build and 10-language SSG prerender
npm run build
```

---

## ⚡ Adding New Features

### Adding a Documentation Guide
1. Create localized markdown files in `src/site/docs/{lang}/{SLUG}.md` across all 10 supported languages (`en`, `de`, `ja`, `hu`, `fr`, `es`, `zh`, `it`, `ru`, `pt`).
2. Register the doc in `src/site/data/docCategories.js` with its category and title key.
3. Update `scripts/prerender/constants.js` with metadata for static HTML generation.

### Adding a Software Comparison
1. Create the canonical model in `src/site/data/comparisons/items/{slug}.js`.
2. Add translation entries in `src/site/data/comparisons/{lang}.js` for all 10 locales.
3. Register the competitor in `src/site/data/comparisonsData.js` and `scripts/prerender/constants.js`.
