import fs from 'node:fs';
import path from 'node:path';
import { BUILD_DIR, PUBLIC_DIR, LOCALES, DOC_METADATA } from './constants.js';
import { buildHtmlForLanding } from './generators/landing.js';
import { buildHtmlForDoc, buildHtmlForDocsHub } from './generators/docs.js';
import { buildHtmlForChangelog } from './generators/changelog.js';
import { buildHtmlForHelp } from './generators/help.js';
import { buildHtmlForCompare, buildHtmlForCompareHub } from './generators/compare.js';
import { buildHtmlForPrivacy } from './generators/privacy.js';
import { buildHtmlForTerms } from './generators/terms.js';
import { buildHtmlForNotFound } from './generators/notFound.js';
import { generateSitemap } from './sitemap.js';
import { generateRssFeed } from './feed.js';
import { COMPARISONS_LIST, getComparisonBySlug } from '../../src/site/data/comparisonsData.js';

export function prerender() {
  if (!fs.existsSync(BUILD_DIR)) {
    console.error(`Build directory ${BUILD_DIR} does not exist. Run "npm run build" first.`);
    process.exit(1);
  }

  const indexHtmlPath = path.join(BUILD_DIR, 'index.html');
  const templateHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

  console.log('⚡ Starting static site prerender (SSG) with Multi-Language Routing (EN, DE, JA, HU, FR, ES, ZH, IT, RU, PT, KO, NL, PL, ZH-TW, SV, TR, CS)...');

  for (const locale of LOCALES) {
    const isDefault = locale === 'en';
    const baseDir = isDefault ? BUILD_DIR : path.join(BUILD_DIR, locale);

    // 1. Landing Page
    const landingHtml = buildHtmlForLanding(templateHtml, locale);
    fs.mkdirSync(baseDir, { recursive: true });
    fs.writeFileSync(path.join(baseDir, 'index.html'), landingHtml, 'utf-8');
    console.log(`✓ Prerendered ${isDefault ? '/' : `/${locale}`} (Landing Page)`);

    // 2. Docs Hub
    const docsHubHtml = buildHtmlForDocsHub(templateHtml, locale);
    const docsDir = path.join(baseDir, 'docs');
    fs.mkdirSync(docsDir, { recursive: true });
    fs.writeFileSync(path.join(docsDir, 'index.html'), docsHubHtml, 'utf-8');
    console.log(`✓ Prerendered ${isDefault ? '/docs' : `/${locale}/docs`} (Docs Hub)`);

    // Docs Articles
    for (const [slug, meta] of Object.entries(DOC_METADATA)) {
      const docHtml = buildHtmlForDoc(templateHtml, slug, meta, locale);
      const docSlugDir = path.join(docsDir, slug);
      fs.mkdirSync(docSlugDir, { recursive: true });
      fs.writeFileSync(path.join(docSlugDir, 'index.html'), docHtml, 'utf-8');
    }
    console.log(`✓ Prerendered all 13 doc guides for [${locale.toUpperCase()}]`);

    // 3. Changelog
    const changelogHtml = buildHtmlForChangelog(templateHtml, locale);
    const changelogDir = path.join(baseDir, 'changelog');
    fs.mkdirSync(changelogDir, { recursive: true });
    fs.writeFileSync(path.join(changelogDir, 'index.html'), changelogHtml, 'utf-8');
    console.log(`✓ Prerendered ${isDefault ? '/changelog' : `/${locale}/changelog`} (Changelog)`);

    // 4. Help & Support
    const helpHtml = buildHtmlForHelp(templateHtml, locale);
    const helpDir = path.join(baseDir, 'help');
    fs.mkdirSync(helpDir, { recursive: true });
    fs.writeFileSync(path.join(helpDir, 'index.html'), helpHtml, 'utf-8');
    console.log(`✓ Prerendered ${isDefault ? '/help' : `/${locale}/help`} (Help & Support)`);

    // 5. Comparisons Hub & Detail Pages
    const compareHubHtml = buildHtmlForCompareHub(templateHtml, locale);
    const compareDir = path.join(baseDir, 'compare');
    fs.mkdirSync(compareDir, { recursive: true });
    fs.writeFileSync(path.join(compareDir, 'index.html'), compareHubHtml, 'utf-8');

    for (const comp of COMPARISONS_LIST) {
      const localizedComp = getComparisonBySlug(comp.slug, locale);
      const compareHtml = buildHtmlForCompare(templateHtml, localizedComp, locale);
      const compSlugDir = path.join(compareDir, comp.slug);
      fs.mkdirSync(compSlugDir, { recursive: true });
      fs.writeFileSync(path.join(compSlugDir, 'index.html'), compareHtml, 'utf-8');
    }
    console.log(`✓ Prerendered /compare hub and all ${COMPARISONS_LIST.length} comparison pages for [${locale.toUpperCase()}]`);

    // 6. Privacy Policy
    const privacyHtml = buildHtmlForPrivacy(templateHtml, locale);
    const privacyDir = path.join(baseDir, 'privacy');
    fs.mkdirSync(privacyDir, { recursive: true });
    fs.writeFileSync(path.join(privacyDir, 'index.html'), privacyHtml, 'utf-8');
    console.log(`✓ Prerendered ${isDefault ? '/privacy' : `/${locale}/privacy`} (Privacy Policy)`);

    // 7. Terms & Refund Policy
    const termsHtml = buildHtmlForTerms(templateHtml, locale);
    const termsDir = path.join(baseDir, 'terms');
    fs.mkdirSync(termsDir, { recursive: true });
    fs.writeFileSync(path.join(termsDir, 'index.html'), termsHtml, 'utf-8');
    console.log(`✓ Prerendered ${isDefault ? '/terms' : `/${locale}/terms`} (Terms & Refund Policy)`);
  }

  // 404 Fallback (with noindex, root-relative paths, and no canonical)
  const notFoundHtml = buildHtmlForNotFound(templateHtml);
  fs.writeFileSync(path.join(BUILD_DIR, '404.html'), notFoundHtml, 'utf-8');
  if (fs.existsSync(PUBLIC_DIR)) {
    fs.writeFileSync(path.join(PUBLIC_DIR, '404.html'), notFoundHtml, 'utf-8');
  }
  console.log('✓ Created /404.html fallback (noindex, follow)');

  // Dynamic Sitemap Generation
  generateSitemap();

  // Dynamic RSS / Atom Feed Generation for Releases
  generateRssFeed();

  console.log('✨ Multi-language SSG (EN, DE, JA, HU, FR, ES, ZH, IT, RU, PT, KO, NL, PL, ZH-TW, SV, TR, CS), sitemap.xml, and feed.xml successfully prerendered into build/');
}
