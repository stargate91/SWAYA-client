import { BASE_URL, LANDING_LOCALES } from '../constants.js';
import { getHrefLangTags, getOgLocaleTags } from '../utils.js';
import { getPrivacyJsonLd } from '../schema.js';

export function buildHtmlForPrivacy(templateHtml, locale = 'en') {
  const landingData = LANDING_LOCALES[locale] || LANDING_LOCALES.en;
  const privacyData = landingData.privacy || LANDING_LOCALES.en.privacy || {};
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const privacyUrl = `${BASE_URL}${prefix}/privacy`;
  const fullTitle = `${privacyData.title || 'Privacy Policy'} - SWAYA`;
  const description =
    privacyData.subtitle ||
    'SWAYA is an offline-first desktop media center and video player. We prioritize your privacy with zero telemetry, complete local data storage, and strict cryptographic protections.';

  const homeLabel = landingData.footer?.links?.home || 'Home';
  const pageTitle = privacyData.title || 'Privacy Policy';

  const jsonLd = getPrivacyJsonLd({
    locale,
    prefix,
    privacyUrl,
    title: pageTitle,
    description,
    breadcrumbHome: homeLabel,
    breadcrumbPrivacy: pageTitle,
  });

  let html = templateHtml;
  html = html.replaceAll('src="./', 'src="/');
  html = html.replaceAll('href="./', 'href="/');

  html = html.replace(/<html lang=".*?"/i, `<html lang="${locale}"`);
  html = html.replace(/<title>.*?<\/title>/i, `<title>${fullTitle}</title>`);
  html = html.replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${privacyUrl}" />${getHrefLangTags('/privacy')}`);
  html = html.replace(
    /<meta name="description" content=".*?" \/>/i,
    `<meta name="description" content="${description}" />`
  );
  html = html.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${privacyUrl}" />`);
  html = html.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${fullTitle}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${description}" />`);
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/i, `<meta name="twitter:title" content="${fullTitle}" />`);
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/i, `<meta name="twitter:description" content="${description}" />`);

  const ogLocaleTags = getOgLocaleTags(locale, false);
  html = html.replace(/<meta property="og:locale"[\s\S]*?<meta property="og:image"/i, `${ogLocaleTags.trim()}\n  <meta property="og:image"`);

  const ogImage = `${BASE_URL}/og/privacy.jpg`;
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
          <h2 style="font-size: 1.4rem; color: #38bdf8; margin-bottom: 0.75rem;">${privacyData.section1Title || '1. Zero-Telemetry & Local Media Storage'}</h2>
          <p>${privacyData.section1Text || 'SWAYA is an offline-first desktop media center and video player.'}</p>
        </section>
        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.4rem; color: #38bdf8; margin-bottom: 0.75rem;">${privacyData.section2Title || '2. Purchase Information & License Delivery'}</h2>
          <p>${privacyData.section2Text || 'When you purchase a SWAYA license, your payment is securely processed by Stripe.'}</p>
        </section>
        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.4rem; color: #38bdf8; margin-bottom: 0.75rem;">${privacyData.section3Title || '3. Device Activation & Offline Validation'}</h2>
          <p>${privacyData.section3Text || 'License seats are cryptographically validated for up to 3 personal devices without persistent internet connectivity.'}</p>
        </section>
      </main>
    </div>
  `;

  return html.replace(/<div id="root">[\s\S]*?<\/div>/i, ssrBody);
}
