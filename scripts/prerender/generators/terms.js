import { BASE_URL, LANDING_LOCALES } from '../constants.js';
import { getHrefLangTags, getOgLocaleTags } from '../utils.js';
import { getTermsJsonLd } from '../schema.js';

export function buildHtmlForTerms(templateHtml, locale = 'en') {
  const landingData = LANDING_LOCALES[locale] || LANDING_LOCALES.en;
  const termsData = landingData.terms || LANDING_LOCALES.en.terms || {};
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const termsUrl = `${BASE_URL}${prefix}/terms`;
  const fullTitle = `${termsData.title || 'Terms of Service & Refund Policy'} - SWAYA`;
  const description =
    termsData.subtitle ||
    'Terms governing your perpetual lifetime SWAYA software license, permitted personal usage, and 14-day / 7-day refund policy.';

  const homeLabel = landingData.footer?.links?.home || 'Home';
  const pageTitle = termsData.title || 'Terms of Service & Refund Policy';

  const jsonLd = getTermsJsonLd({
    locale,
    prefix,
    termsUrl,
    title: pageTitle,
    description,
    breadcrumbHome: homeLabel,
    breadcrumbTerms: pageTitle,
  });

  let html = templateHtml;
  html = html.replaceAll('src="./', 'src="/');
  html = html.replaceAll('href="./', 'href="/');

  html = html.replace(/<html lang=".*?"/i, `<html lang="${locale}"`);
  html = html.replace(/<title>.*?<\/title>/i, `<title>${fullTitle}</title>`);
  html = html.replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${termsUrl}" />${getHrefLangTags('/terms')}`);
  html = html.replace(
    /<meta name="description" content=".*?" \/>/i,
    `<meta name="description" content="${description}" />`
  );
  html = html.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${termsUrl}" />`);
  html = html.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${fullTitle}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${description}" />`);
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/i, `<meta name="twitter:title" content="${fullTitle}" />`);
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/i, `<meta name="twitter:description" content="${description}" />`);

  const ogLocaleTags = getOgLocaleTags(locale, false);
  html = html.replace(/<meta property="og:locale"[\s\S]*?<meta property="og:image"/i, `${ogLocaleTags.trim()}\n  <meta property="og:image"`);

  const ogImage = `${BASE_URL}/og/terms.jpg`;
  html = html.replace(/<meta property="og:image" content=".*?" \/>/i, `<meta property="og:image" content="${ogImage}" />`);
  html = html.replace(/<meta name="twitter:image" content=".*?" \/>/i, `<meta name="twitter:image" content="${ogImage}" />`);
  html = html.replace(/<meta property="og:image:alt" content=".*?" \/>/i, `<meta property="og:image:alt" content="${fullTitle}" />`);
  html = html.replace(/<meta name="twitter:image:alt" content=".*?" \/>/i, `<meta name="twitter:image:alt" content="${fullTitle}" />`);

  const jsonLdScript = `<script id="site-jsonld" type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n  </script>`;
  html = html.replace(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/i, jsonLdScript);

  const homeUrl = prefix || '/';

  const ssrBody = `
    <div id="root">
      <main style="max-width: 900px; margin: 0 auto; padding: 3rem 1.5rem; color: #e2e8f0; font-family: sans-serif; line-height: 1.6;">
        <nav aria-label="Breadcrumb" style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 1.5rem;">
          <a href="${homeUrl}" style="color: #cbd5e1; text-decoration: none;">${homeLabel}</a> &gt; <span>${pageTitle}</span>
        </nav>
        <header style="margin-bottom: 2.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid #1e293b;">
          <h1 style="font-size: 2.5rem; font-weight: 800; margin: 0.5rem 0; letter-spacing: -0.025em; color: #fff;">${pageTitle}</h1>
          <p style="color: #94a3b8; font-size: 1.1rem; line-height: 1.6;">${description}</p>
        </header>
        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.4rem; color: #38bdf8; margin-bottom: 0.75rem;">${termsData.section1Title || '1. Software License Grant & Usage'}</h2>
          <p>${termsData.section1Text || 'Subject to payment of the applicable one-time license fee, SWAYA grants perpetual personal access on up to 3 personal devices owned by you.'}</p>
        </section>
        <section style="margin-bottom: 2rem; background: rgba(239, 68, 68, 0.05); border: 1px solid #ef4444; border-radius: 12px; padding: 1.5rem;">
          <h2 style="font-size: 1.4rem; color: #ef4444; margin-bottom: 0.75rem;">${termsData.section2Title || '2. Refund & Cancellation Policy'}</h2>
          <p>${termsData.section2Text || 'Unactivated licenses are eligible for 100% refund within 14 days of purchase. Activated licenses are backed by a 7-day technical compatibility guarantee.'}</p>
        </section>
      </main>
    </div>
  `;

  return html.replace(/<div id="root">[\s\S]*?<\/div>/i, ssrBody);
}
