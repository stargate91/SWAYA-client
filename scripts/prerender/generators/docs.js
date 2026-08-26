import fs from 'node:fs';
import path from 'node:path';
import { BASE_URL, DOCS_BASE_DIR, DOCS_LOCALES, SLUG_TO_FILE_MAP, DOC_METADATA } from '../constants.js';
import { getHrefLangTags, getOgLocaleTags } from '../utils.js';
import { getDocArticleJsonLd, getDocsHubJsonLd } from '../schema.js';
import { compileMarkdown } from '../../../src/site/lib/markdownCompiler.js';
import { getDocDate } from '../../../src/site/data/docDates.js';

export function buildHtmlForDoc(templateHtml, slug, meta, locale = 'en') {
  const docsData = DOCS_LOCALES[locale] || DOCS_LOCALES.en;
  const fileName = SLUG_TO_FILE_MAP[slug];
  const localeDocsDir = path.resolve(DOCS_BASE_DIR, locale);
  let filePath = path.join(localeDocsDir, fileName);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(path.resolve(DOCS_BASE_DIR, 'en'), fileName);
  }

  let markdownContent = '';
  let fileMtimeDate = null;
  if (fs.existsSync(filePath)) {
    markdownContent = fs.readFileSync(filePath, 'utf-8');
    try {
      fileMtimeDate = fs.statSync(filePath).mtime.toISOString().split('T')[0];
    } catch {
      // fallback
    }
  }

  const docDateConfig = getDocDate(slug);
  const publishedDate = docDateConfig.published || '2026-08-15';
  const modifiedDate = docDateConfig.modified || fileMtimeDate || '2026-08-20';

  const { html: parsedContentHtml } = compileMarkdown(markdownContent);

  const prefix = locale === 'en' ? '' : `/${locale}`;
  const docUrl = `${BASE_URL}${prefix}/docs/${slug}`;
  const title = docsData.items?.[slug]?.title || meta.title;
  const description = docsData.items?.[slug]?.description || meta.description;
  const category = docsData.categories?.[meta.categoryKey] || meta.category;
  const fullTitle = `SWAYA Docs - ${title}`;

  const jsonLd = getDocArticleJsonLd({
    locale,
    slug,
    meta,
    docsData,
    docUrl,
    title,
    description,
    prefix,
    datePublished: publishedDate,
    dateModified: modifiedDate,
  });

  let html = templateHtml;
  html = html.replaceAll('src="./', 'src="/');
  html = html.replaceAll('href="./', 'href="/');

  const canonicalUrl = `${BASE_URL}${prefix}/docs/${slug}`;
  html = html.replace(/<html lang=".*?"/i, `<html lang="${locale}"`);
  html = html.replace(/<title>.*?<\/title>/i, `<title>${fullTitle}</title>`);
  html = html.replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${canonicalUrl}" />${getHrefLangTags(`/docs/${slug}`)}`);
  let articleMetaTags = '<meta property="og:type" content="article" />';
  articleMetaTags += `\n  <meta property="article:published_time" content="${publishedDate}T00:00:00Z" />`;
  articleMetaTags += `\n  <meta property="article:modified_time" content="${modifiedDate}T00:00:00Z" />`;
  articleMetaTags += '\n  <meta property="article:author" content="SWAYA" />';
  html = html.replace(/<meta property="og:type" content=".*?" \/>/i, articleMetaTags);
  html = html.replace(
    /<meta name="description" content=".*?" \/>/i,
    `<meta name="description" content="${description}" />`
  );
  html = html.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${docUrl}" />`);
  html = html.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${fullTitle}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${description}" />`);
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/i, `<meta name="twitter:title" content="${fullTitle}" />`);
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/i, `<meta name="twitter:description" content="${description}" />`);

  const ogLocaleTags = getOgLocaleTags(locale);
  html = html.replace(/<meta property="og:locale"[\s\S]*?<meta property="og:image"/i, `${ogLocaleTags.trim()}\n  <meta property="og:image"`);

  const docOgImage = `${BASE_URL}/og/docs-${slug}.jpg`;
  html = html.replace(/<meta property="og:image" content=".*?" \/>/i, `<meta property="og:image" content="${docOgImage}" />`);
  html = html.replace(/<meta name="twitter:image" content=".*?" \/>/i, `<meta name="twitter:image" content="${docOgImage}" />`);
  html = html.replace(/<meta property="og:image:alt" content=".*?" \/>/i, `<meta property="og:image:alt" content="${fullTitle}" />`);
  html = html.replace(/<meta name="twitter:image:alt" content=".*?" \/>/i, `<meta name="twitter:image:alt" content="${fullTitle}" />`);

  const jsonLdScript = `<script id="site-jsonld" type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n  </script>`;
  html = html.replace(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/i, jsonLdScript);

  const homeUrl = prefix || '/';
  const docsUrl = `${prefix}/docs`;

  const ssrBody = `
    <div id="root">
      <main style="max-width: 1200px; margin: 0 auto; padding: 2rem 1rem;">
        <nav aria-label="Breadcrumb">
          <a href="${homeUrl}">${docsData.ui?.breadcrumbHome || 'Home'}</a> &gt; <a href="${docsUrl}">${docsData.ui?.breadcrumbDocs || 'Docs'}</a> &gt; <span>${category}</span>
        </nav>
        <header style="margin: 1.5rem 0; border-bottom: 1px solid #222; padding-bottom: 1rem;">
          <span style="font-size: 0.85rem; color: #38bdf8;">${category}</span>
          <h1 style="font-size: 2.2rem; margin: 0.5rem 0;">${title}</h1>
          <p style="color: #94a3b8; font-size: 1.1rem;">${description}</p>
        </header>
        <article class="markdown-body">
          ${parsedContentHtml}
        </article>
      </main>
    </div>
  `.trim();

  html = html.replace('<div id="root"></div>', ssrBody);
  return html;
}

export function buildHtmlForDocsHub(templateHtml, locale = 'en') {
  const docsData = DOCS_LOCALES[locale] || DOCS_LOCALES.en;
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const hubUrl = `${BASE_URL}${prefix}/docs`;
  const fullTitle = docsData.ui?.hubTitle || 'SWAYA Documentation - Guides, Tutorials & Workflows';
  const description =
    docsData.ui?.hubSubtitle ||
    'Official SWAYA documentation: master media library curation, multi-source metadata scraping, custom collection management, and smooth playback.';

  const allDocEntries = Object.entries(DOC_METADATA);

  const jsonLd = getDocsHubJsonLd({
    locale,
    docsData,
    hubUrl,
    fullTitle,
    description,
    allDocEntries,
    prefix,
  });

  let html = templateHtml;
  html = html.replaceAll('src="./', 'src="/');
  html = html.replaceAll('href="./', 'href="/');

  html = html.replace(/<html lang=".*?"/i, `<html lang="${locale}"`);
  html = html.replace(/<title>.*?<\/title>/i, `<title>${fullTitle}</title>`);
  html = html.replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${hubUrl}" />${getHrefLangTags('/docs')}`);
  html = html.replace(
    /<meta name="description" content=".*?" \/>/i,
    `<meta name="description" content="${description}" />`
  );
  html = html.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${hubUrl}" />`);
  html = html.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${fullTitle}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${description}" />`);
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/i, `<meta name="twitter:title" content="${fullTitle}" />`);
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/i, `<meta name="twitter:description" content="${description}" />`);

  const ogLocaleTagsHub = getOgLocaleTags(locale);
  html = html.replace(/<meta property="og:locale"[\s\S]*?<meta property="og:image"/i, `${ogLocaleTagsHub.trim()}\n  <meta property="og:image"`);
  html = html.replace(/<meta property="og:image:alt" content=".*?" \/>/i, `<meta property="og:image:alt" content="${fullTitle}" />`);
  html = html.replace(/<meta name="twitter:image:alt" content=".*?" \/>/i, `<meta name="twitter:image:alt" content="${fullTitle}" />`);

  const jsonLdScript = `<script id="site-jsonld" type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n  </script>`;
  html = html.replace(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/i, jsonLdScript);

  const categories = {};
  for (const [slug, meta] of allDocEntries) {
    const cat = meta.category || 'General';
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push({ slug, meta, title: docsData.items?.[slug]?.title || meta.title, description: docsData.items?.[slug]?.description || meta.description });
  }

  const categoryHtml = Object.entries(categories)
    .map(
      ([catName, items]) => `
      <section style="margin-bottom: 3rem;">
        <h2 style="font-size: 1.5rem; font-weight: 700; color: #f8fafc; margin-bottom: 1rem; border-bottom: 1px solid #222; padding-bottom: 0.5rem;">
          ${catName}
        </h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem;">
          ${items
          .map(
            (item) => `
            <a href="${prefix}/docs/${item.slug}" style="display: block; padding: 1.25rem; background: #131722; border: 1px solid #222; border-radius: 8px; text-decoration: none; color: inherit;">
              <h3 style="font-size: 1.1rem; font-weight: 600; color: #fff; margin-bottom: 0.5rem;">${item.title} →</h3>
              <p style="font-size: 0.9rem; color: #94a3b8; line-height: 1.5; margin: 0;">${item.description}</p>
            </a>
          `
          )
          .join('')}
        </div>
      </section>
    `
    )
    .join('');

  const homeUrl = prefix || '/';

  const ssrBody = `
    <div id="root">
      <main style="max-width: 1200px; margin: 0 auto; padding: 2rem 1rem;">
        <nav aria-label="Breadcrumb">
          <a href="${homeUrl}">Home</a> &gt; <span>Documentation</span>
        </nav>
        <header style="margin: 2rem 0; border-bottom: 1px solid #222; padding-bottom: 1.5rem;">
          <span style="font-size: 0.85rem; color: #38bdf8; font-weight: 600; text-transform: uppercase;">${docsData.ui?.documentationHub || 'Workstation Guides'}</span>
          <h1 style="font-size: 2.5rem; font-weight: 800; margin: 0.5rem 0;">${fullTitle}</h1>
          <p style="color: #94a3b8; font-size: 1.15rem; max-width: 800px; line-height: 1.6;">${description}</p>
        </header>
        <div>
          ${categoryHtml}
        </div>
      </main>
    </div>
  `.trim();

  html = html.replace('<div id="root"></div>', ssrBody);
  return html;
}
