import { BASE_URL, LANDING_LOCALES } from '../constants.js';
import { getHrefLangTags, getOgLocaleTags } from '../utils.js';
import { getChangelogJsonLd } from '../schema.js';

export function buildHtmlForChangelog(templateHtml, locale = 'en') {
  const landingData = LANDING_LOCALES[locale] || LANDING_LOCALES.en;
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const changelogUrl = `${BASE_URL}${prefix}/changelog`;
  const fullTitle = `${landingData.changelog?.title || 'SWAYA Changelog & Release Notes'} - SWAYA`;
  const description =
    landingData.changelog?.subtitle ||
    'Track all updates, new features, performance improvements, and bug fixes for the SWAYA desktop offline media center & video player.';

  const jsonLd = getChangelogJsonLd({
    locale,
    landingData,
    changelogUrl,
    fullTitle,
    description,
    prefix,
  });

  let html = templateHtml;
  html = html.replaceAll('src="./', 'src="/');
  html = html.replaceAll('href="./', 'href="/');

  html = html.replace(/<html lang=".*?"/i, `<html lang="${locale}"`);
  html = html.replace(/<title>.*?<\/title>/i, `<title>${fullTitle}</title>`);
  html = html.replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${changelogUrl}" />${getHrefLangTags('/changelog')}`);
  html = html.replace(
    /<meta name="description" content=".*?" \/>/i,
    `<meta name="description" content="${description}" />`
  );
  html = html.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${changelogUrl}" />`);
  html = html.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${fullTitle}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${description}" />`);
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/i, `<meta name="twitter:title" content="${fullTitle}" />`);
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/i, `<meta name="twitter:description" content="${description}" />`);

  const ogLocaleTags = getOgLocaleTags(locale, false);
  html = html.replace(/<meta property="og:locale"[\s\S]*?<meta property="og:image"/i, `${ogLocaleTags.trim()}\n  <meta property="og:image"`);

  const changelogOgImage = `${BASE_URL}/og/changelog.jpg`;
  html = html.replace(/<meta property="og:image" content=".*?" \/>/i, `<meta property="og:image" content="${changelogOgImage}" />`);
  html = html.replace(/<meta name="twitter:image" content=".*?" \/>/i, `<meta name="twitter:image" content="${changelogOgImage}" />`);
  html = html.replace(/<meta property="og:image:alt" content=".*?" \/>/i, `<meta property="og:image:alt" content="${fullTitle}" />`);
  html = html.replace(/<meta name="twitter:image:alt" content=".*?" \/>/i, `<meta name="twitter:image:alt" content="${fullTitle}" />`);

  const jsonLdScript = `<script id="site-jsonld" type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n  </script>`;
  html = html.replace(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/i, jsonLdScript);

  const homeUrl = prefix || '/';

  const ssrBody = `
    <div id="root">
      <main style="max-width: 1080px; margin: 0 auto; padding: 2rem 1rem;">
        <nav aria-label="Breadcrumb">
          <a href="${homeUrl}">Home</a> &gt; <span>Changelog</span>
        </nav>
        <header style="margin: 2rem 0; border-bottom: 1px solid #222; padding-bottom: 1.5rem;">
          <span style="font-size: 0.85rem; color: #38bdf8; font-weight: 600; text-transform: uppercase;">${landingData.changelog?.badge || 'Release History'}</span>
          <h1 style="font-size: 2.5rem; font-weight: 800; margin: 0.5rem 0;">${landingData.changelog?.title || 'SWAYA Release Notes & Changelog'}</h1>
          <p style="color: #94a3b8; font-size: 1.15rem; max-width: 800px; line-height: 1.6;">${description}</p>
        </header>
        <section>
          <article style="background: #131722; border: 1px solid #222; border-radius: 12px; padding: 2rem; margin-bottom: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
              <span style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.85rem;">v1.0.0 (Latest Release)</span>
              <time datetime="2026-08-16" style="color: #64748b; font-size: 0.9rem;">2026-08-16</time>
            </div>
            <h2 style="font-size: 1.5rem; font-weight: 700; color: #fff; margin-bottom: 0.75rem;">Torrent Client Integration, Granular Reviews & Bespoke Series Architecture</h2>
            <p style="color: #94a3b8; line-height: 1.6; margin-bottom: 1.5rem;">Major workstation release introducing full external torrent client dashboards, global torrent search, ratings drawer, bespoke TV season navigation, and optimized batch SQL logs.</p>
          </article>
        </section>
      </main>
    </div>
  `.trim();

  html = html.replace('<div id="root"></div>', ssrBody);
  return html;
}
