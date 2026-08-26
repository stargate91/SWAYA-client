import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BASE_URL, BUILD_DIR, PUBLIC_DIR, LOCALES, DOCS_DIR, DOCS_LOCALES, SLUG_TO_FILE_MAP, DOC_METADATA } from './constants.js';
import { CHANGELOG_RELEASES } from '../../src/site/data/changelogConfig.js';
import { COMPARISONS_LIST } from '../../src/site/data/comparisonsData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOCALES_DIR = path.resolve(__dirname, '../../src/site/locales');

function escapeXml(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function getFileDate(filePath, fallback = '2026-08-16') {
  try {
    if (fs.existsSync(filePath)) {
      return fs.statSync(filePath).mtime.toISOString().split('T')[0];
    }
  } catch {
    // fallback
  }
  return fallback;
}

function getSitemapHreflangs(pathSuffix = '') {
  const cleanPath = pathSuffix.startsWith('/') ? pathSuffix : (pathSuffix ? '/' + pathSuffix : '');
  let links = `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${cleanPath || '/'}" />\n`;
  for (const loc of LOCALES) {
    const locPrefix = loc === 'en' ? '' : `/${loc}`;
    const targetUrl = loc === 'en' ? `${BASE_URL}${cleanPath || '/'}` : `${BASE_URL}${locPrefix}${cleanPath}`;
    links += `    <xhtml:link rel="alternate" hreflang="${loc}" href="${targetUrl}" />\n`;
  }
  return links;
}

export function generateSitemap() {
  const latestChangelogDate = CHANGELOG_RELEASES[0]?.date || '2026-08-16';

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `  xmlns:xhtml="http://www.w3.org/1999/xhtml"\n`;
  xml += `  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n`;
  xml += `  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n`;

  // 1. Homepages (with Video and Image sitemap rich snippets)
  xml += `  <!-- Homepages -->\n`;
  for (const locale of LOCALES) {
    const prefix = locale === 'en' ? '' : `/${locale}`;
    const fullUrl = locale === 'en' ? `${BASE_URL}/` : `${BASE_URL}${prefix}`;
    const landingLocaleFile = path.join(LOCALES_DIR, locale, 'landing.json');
    const pageLastMod = getFileDate(landingLocaleFile, latestChangelogDate);

    xml += `  <url>\n`;
    xml += `    <loc>${fullUrl}</loc>\n`;
    xml += `    <lastmod>${pageLastMod}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>1.0</priority>\n`;
    xml += getSitemapHreflangs('');
    xml += `    <video:video>\n`;
    xml += `      <video:thumbnail_loc>${BASE_URL}/og-image.jpg</video:thumbnail_loc>\n`;
    xml += `      <video:title>SWAYA - Product Overview &amp; Feature Walkthrough</video:title>\n`;
    xml += `      <video:description>SWAYA is a Windows desktop app that cleans up messy files on your drive, organizes your library, and plays your entire collection offline with a built-in MPV player.</video:description>\n`;
    xml += `      <video:content_loc>${BASE_URL}/assets/action.mp4</video:content_loc>\n`;
    xml += `      <video:player_loc>${BASE_URL}/#demo-video</video:player_loc>\n`;
    xml += `      <video:duration>168</video:duration>\n`;
    xml += `      <video:publication_date>2026-08-20T00:00:00+00:00</video:publication_date>\n`;
    xml += `      <video:family_friendly>yes</video:family_friendly>\n`;
    xml += `      <video:live>no</video:live>\n`;
    xml += `    </video:video>\n`;
    xml += `    <image:image>\n`;
    xml += `      <image:loc>${BASE_URL}/og-image.jpg</image:loc>\n`;
    xml += `      <image:title>SWAYA - Offline Media Center &amp; Video Player for Windows</image:title>\n`;
    xml += `    </image:image>\n`;
    xml += `    <image:image>\n`;
    xml += `      <image:loc>${BASE_URL}/og/docs-organizer.jpg</image:loc>\n`;
    xml += `      <image:title>SWAYA Smart Batch File Organizer Preview</image:title>\n`;
    xml += `    </image:image>\n`;
    xml += `    <image:image>\n`;
    xml += `      <image:loc>${BASE_URL}/og/docs-library.jpg</image:loc>\n`;
    xml += `      <image:title>SWAYA Media Catalog &amp; Curation Preview</image:title>\n`;
    xml += `    </image:image>\n`;
    xml += `    <image:image>\n`;
    xml += `      <image:loc>${BASE_URL}/og/docs-player.jpg</image:loc>\n`;
    xml += `      <image:title>SWAYA MPV 4K Video Player Preview</image:title>\n`;
    xml += `    </image:image>\n`;
    xml += `  </url>\n`;
  }
  xml += `\n`;

  // 2. Changelog Hubs
  xml += `  <!-- Changelog -->\n`;
  for (const locale of LOCALES) {
    const prefix = locale === 'en' ? '' : `/${locale}`;
    const fullUrl = `${BASE_URL}${prefix}/changelog`;

    xml += `  <url>\n`;
    xml += `    <loc>${fullUrl}</loc>\n`;
    xml += `    <lastmod>${latestChangelogDate}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.85</priority>\n`;
    xml += getSitemapHreflangs('/changelog');
    xml += `    <image:image>\n`;
    xml += `      <image:loc>${BASE_URL}/og/changelog.jpg</image:loc>\n`;
    xml += `      <image:title>SWAYA Release Notes &amp; Changelog</image:title>\n`;
    xml += `    </image:image>\n`;
    xml += `  </url>\n`;
  }
  xml += `\n`;

  // 3. Docs Hub
  let latestDocDate = '2026-08-16';
  for (const file of Object.values(SLUG_TO_FILE_MAP)) {
    const d = getFileDate(path.join(DOCS_DIR, file), '2026-08-16');
    if (d > latestDocDate) latestDocDate = d;
  }

  xml += `  <!-- Docs Hub -->\n`;
  for (const locale of LOCALES) {
    const prefix = locale === 'en' ? '' : `/${locale}`;
    const fullUrl = `${BASE_URL}${prefix}/docs`;
    const docsLocaleFile = path.join(LOCALES_DIR, locale, 'docs.json');
    const hubLastMod = getFileDate(docsLocaleFile, latestDocDate);

    xml += `  <url>\n`;
    xml += `    <loc>${fullUrl}</loc>\n`;
    xml += `    <lastmod>${hubLastMod}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.9</priority>\n`;
    xml += getSitemapHreflangs('/docs');
    xml += `    <image:image>\n`;
    xml += `      <image:loc>${BASE_URL}/og-image.jpg</image:loc>\n`;
    xml += `      <image:title>SWAYA Documentation - Guides, Tutorials &amp; Workflows</image:title>\n`;
    xml += `    </image:image>\n`;
    xml += `  </url>\n`;
  }
  xml += `\n`;

  // 4. Docs Articles (All Locales with hreflang alternates)
  xml += `  <!-- Docs Articles -->\n`;
  for (const [slug, fileName] of Object.entries(SLUG_TO_FILE_MAP)) {
    const meta = DOC_METADATA[slug] || {};

    for (const locale of LOCALES) {
      const prefix = locale === 'en' ? '' : `/${locale}`;
      const fullUrl = `${BASE_URL}${prefix}/docs/${slug}`;
      const localeDocsDir = path.resolve(__dirname, `../../src/site/docs/${locale}`);
      const filePath = path.join(localeDocsDir, fileName);
      const docDate = getFileDate(filePath, latestDocDate);
      const docsData = DOCS_LOCALES[locale] || DOCS_LOCALES.en;
      const title = docsData.items?.[slug]?.title || meta.title || slug;

      xml += `  <url>\n`;
      xml += `    <loc>${fullUrl}</loc>\n`;
      xml += `    <lastmod>${docDate}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += getSitemapHreflangs(`/docs/${slug}`);
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${BASE_URL}/og/docs-${slug}.jpg</image:loc>\n`;
      xml += `      <image:title>SWAYA Docs - ${escapeXml(title)}</image:title>\n`;
      xml += `    </image:image>\n`;
      xml += `  </url>\n`;
    }
  }
  xml += `\n`;

  // 5. Help & Support
  xml += `  <!-- Help & Support -->\n`;
  for (const locale of LOCALES) {
    const prefix = locale === 'en' ? '' : `/${locale}`;
    const fullUrl = `${BASE_URL}${prefix}/help`;
    const landingLocaleFile = path.join(LOCALES_DIR, locale, 'landing.json');
    const pageLastMod = getFileDate(landingLocaleFile, '2026-08-20');

    xml += `  <url>\n`;
    xml += `    <loc>${fullUrl}</loc>\n`;
    xml += `    <lastmod>${pageLastMod}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.85</priority>\n`;
    xml += getSitemapHreflangs('/help');
    xml += `    <image:image>\n`;
    xml += `      <image:loc>${BASE_URL}/og/help.jpg</image:loc>\n`;
    xml += `      <image:title>SWAYA Help &amp; Support</image:title>\n`;
    xml += `    </image:image>\n`;
    xml += `  </url>\n`;
  }
  xml += `\n`;

  // 6. Comparisons Hub & Pages
  xml += `  <!-- Comparisons Hub & Pages -->\n`;
  for (const locale of LOCALES) {
    const prefix = locale === 'en' ? '' : `/${locale}`;
    const hubUrl = `${BASE_URL}${prefix}/compare`;

    xml += `  <url>\n`;
    xml += `    <loc>${hubUrl}</loc>\n`;
    xml += `    <lastmod>2026-08-20</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.9</priority>\n`;
    xml += getSitemapHreflangs('/compare');
    xml += `    <image:image>\n`;
    xml += `      <image:loc>${BASE_URL}/og/compare-hub.jpg</image:loc>\n`;
    xml += `      <image:title>SWAYA Software Comparisons &amp; Alternatives</image:title>\n`;
    xml += `    </image:image>\n`;
    xml += `  </url>\n`;

    for (const comp of COMPARISONS_LIST) {
      const compUrl = `${BASE_URL}${prefix}/compare/${comp.slug}`;
      xml += `  <url>\n`;
      xml += `    <loc>${compUrl}</loc>\n`;
      xml += `    <lastmod>2026-08-20</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.88</priority>\n`;
      xml += getSitemapHreflangs(`/compare/${comp.slug}`);
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${BASE_URL}/og/compare-${comp.slug}.jpg</image:loc>\n`;
      xml += `      <image:title>SWAYA vs ${escapeXml(comp.name)}</image:title>\n`;
      xml += `    </image:image>\n`;
      xml += `  </url>\n`;
    }
  }
  xml += `\n`;

  // 7. Privacy Policy
  xml += `  <!-- Privacy Policy -->\n`;
  for (const locale of LOCALES) {
    const prefix = locale === 'en' ? '' : `/${locale}`;
    const fullUrl = `${BASE_URL}${prefix}/privacy`;

    xml += `  <url>\n`;
    xml += `    <loc>${fullUrl}</loc>\n`;
    xml += `    <lastmod>2026-08-20</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.5</priority>\n`;
    xml += getSitemapHreflangs('/privacy');
    xml += `  </url>\n`;
  }
  xml += `\n`;

  // 8. Terms of Service & Refund Policy
  xml += `  <!-- Terms & Refund Policy -->\n`;
  for (const locale of LOCALES) {
    const prefix = locale === 'en' ? '' : `/${locale}`;
    const fullUrl = `${BASE_URL}${prefix}/terms`;

    xml += `  <url>\n`;
    xml += `    <loc>${fullUrl}</loc>\n`;
    xml += `    <lastmod>2026-08-20</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.5</priority>\n`;
    xml += getSitemapHreflangs('/terms');
    xml += `  </url>\n`;
  }
  xml += `\n`;

  xml += `</urlset>\n`;

  // Write to build directory if it exists
  if (fs.existsSync(BUILD_DIR)) {
    fs.writeFileSync(path.join(BUILD_DIR, 'sitemap.xml'), xml, 'utf-8');
  }
  // Sync to public directory
  if (fs.existsSync(PUBLIC_DIR)) {
    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), xml, 'utf-8');
  }

  console.log('✓ Generated dynamic multi-lingual sitemap.xml with image and video rich snippet namespaces');
}
