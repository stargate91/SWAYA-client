import { BASE_URL, LANDING_LOCALES } from '../constants.js';
import { getHrefLangTags, getOgLocaleTags } from '../utils.js';
import { getLandingJsonLd } from '../schema.js';
import {
  renderHeaderHtml,
  renderHeroHtml,
  renderVideoHtml,
  renderShowcaseHtml,
  renderComparePreviewHtml,
  renderFaqHtml,
  renderDownloadHtml,
  renderFooterHtml,
} from '../templates/landingSections.js';

export function buildHtmlForLanding(templateHtml, locale = 'en') {
  const landingData = LANDING_LOCALES[locale] || LANDING_LOCALES.en;
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const landingUrl = `${BASE_URL}${prefix || '/'}`;
  const fullTitle =
    landingData.meta?.title || 'SWAYA - Personal Offline Media Center & Video Player';
  const description =
    landingData.meta?.description ||
    landingData.hero?.subtitle ||
    'Personal offline media center for Windows. Organize movies, TV shows, and adult video collections with rich metadata, built-in player, and 100% privacy.';

  const jsonLd = getLandingJsonLd({ locale, landingData, description });

  let html = templateHtml;
  html = html.replaceAll('src="./', 'src="/');
  html = html.replaceAll('href="./', 'href="/');

  html = html.replace(/<html lang=".*?"/i, `<html lang="${locale}"`);
  html = html.replace(/<title>.*?<\/title>/i, `<title>${fullTitle}</title>`);
  html = html.replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${landingUrl}" />${getHrefLangTags('')}`);
  html = html.replace(
    /<meta name="description" content=".*?" \/>/i,
    `<meta name="description" content="${description}" />`
  );
  html = html.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${landingUrl}" />`);
  html = html.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${fullTitle}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${description}" />`);
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/i, `<meta name="twitter:title" content="${fullTitle}" />`);
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/i, `<meta name="twitter:description" content="${description}" />`);

  const ogLocaleTags = getOgLocaleTags(locale, false);
  html = html.replace(/<meta property="og:locale"[\s\S]*?<meta property="og:image"/i, `${ogLocaleTags.trim()}\n  <meta property="og:image"`);
  html = html.replace(/<meta property="og:image:alt" content=".*?" \/>/i, `<meta property="og:image:alt" content="${fullTitle}" />`);
  html = html.replace(/<meta name="twitter:image:alt" content=".*?" \/>/i, `<meta name="twitter:image:alt" content="${fullTitle}" />`);

  const jsonLdScript = `<script id="site-jsonld" type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n  </script>`;
  html = html.replace(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/i, jsonLdScript);

  const homeUrl = prefix || '/';
  const docsUrl = `${prefix}/docs`;
  const changelogUrl = `${prefix}/changelog`;

  const hero = landingData.hero || {};
  const video = landingData.video || {};
  const showcase = landingData.showcase || {};
  const faq = landingData.faq || {};
  const download = landingData.download || {};
  const footer = landingData.footer || {};

  const ssrBody = `
    <div id="root">
      ${renderHeaderHtml({ homeUrl, docsUrl, changelogUrl, landingData })}
      <main style="max-width: 1200px; margin: 0 auto; padding: 3rem 1rem;">
        ${renderHeroHtml({ hero, description })}
        ${renderVideoHtml({ video })}
        ${renderShowcaseHtml({ showcase })}
        ${renderComparePreviewHtml({ prefix, locale, landingData })}
        ${renderFaqHtml({ faq })}
        ${renderDownloadHtml({ download })}
      </main>
      ${renderFooterHtml({ footer, homeUrl, docsUrl, changelogUrl, prefix, locale })}
    </div>
  `.trim();

  html = html.replace('<div id="root"></div>', ssrBody);
  return html;
}
