import { BASE_URL, LANDING_LOCALES } from '../constants.js';
import { getHrefLangTags, getOgLocaleTags } from '../utils.js';
import { getHelpJsonLd } from '../schema.js';
import { DEV_EMAIL, DISCORD_INVITE_URL } from '../../../src/site/data/siteConfig.js';


export function buildHtmlForHelp(templateHtml, locale = 'en') {
  const landingData = LANDING_LOCALES[locale] || LANDING_LOCALES.en;
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const helpUrl = `${BASE_URL}${prefix}/help`;
  const fullTitle = `${landingData.help?.title || 'How Can We Help You?'} - SWAYA`;
  const description =
    landingData.help?.subtitle ||
    'Get in touch with the developer, join our Discord community for live chat, or browse our documentation guides.';

  const jsonLd = getHelpJsonLd({
    locale,
    helpUrl,
    prefix,
    landingData,
  });

  let html = templateHtml;
  html = html.replaceAll('src="./', 'src="/');
  html = html.replaceAll('href="./', 'href="/');

  html = html.replace(/<html lang=".*?"/i, `<html lang="${locale}"`);
  html = html.replace(/<title>.*?<\/title>/i, `<title>${fullTitle}</title>`);
  html = html.replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${helpUrl}" />${getHrefLangTags('/help')}`);
  html = html.replace(
    /<meta name="description" content=".*?" \/>/i,
    `<meta name="description" content="${description}" />`
  );
  html = html.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${helpUrl}" />`);
  html = html.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${fullTitle}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${description}" />`);
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/i, `<meta name="twitter:title" content="${fullTitle}" />`);
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/i, `<meta name="twitter:description" content="${description}" />`);

  const ogLocaleTags = getOgLocaleTags(locale, false);
  html = html.replace(/<meta property="og:locale"[\s\S]*?<meta property="og:image"/i, `${ogLocaleTags.trim()}\n  <meta property="og:image"`);

  const helpOgImage = `${BASE_URL}/og/help.jpg`;
  html = html.replace(/<meta property="og:image" content=".*?" \/>/i, `<meta property="og:image" content="${helpOgImage}" />`);
  html = html.replace(/<meta name="twitter:image" content=".*?" \/>/i, `<meta name="twitter:image" content="${helpOgImage}" />`);
  html = html.replace(/<meta property="og:image:alt" content=".*?" \/>/i, `<meta property="og:image:alt" content="${fullTitle}" />`);
  html = html.replace(/<meta name="twitter:image:alt" content=".*?" \/>/i, `<meta name="twitter:image:alt" content="${fullTitle}" />`);

  const jsonLdScript = `<script id="site-jsonld" type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n  </script>`;
  html = html.replace(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/i, jsonLdScript);

  const homeUrl = prefix || '/';
  const docsUrl = `${prefix}/docs`;

  const ssrBody = `
    <div id="root">
      <main style="max-width: 1140px; margin: 0 auto; padding: 3rem 1.5rem;">
        <nav aria-label="Breadcrumb" style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 1rem;">
          <a href="${homeUrl}" style="color: #cbd5e1; text-decoration: none;">Home</a> &gt; <span>${landingData.navbar?.help || 'Help & Support'}</span>
        </nav>
        <header style="text-align: center; margin-bottom: 3.5rem;">
          <span style="font-size: 0.85rem; color: #38bdf8; font-weight: 600; text-transform: uppercase;">${landingData.help?.badge || 'Help & Community'}</span>
          <h1 style="font-size: 2.75rem; font-weight: 800; margin: 0.75rem 0; letter-spacing: -0.025em;">${landingData.help?.title || 'How Can We Help You?'}</h1>
          <p style="color: #94a3b8; font-size: 1.15rem; max-width: 700px; margin: 0 auto; line-height: 1.6;">${description}</p>
        </header>
        
        <section style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; max-width: 58rem; margin: 0 auto 4rem auto;">
          <!-- Discord -->
          <article style="background: #11141e; border: 1px solid #1e2433; border-radius: 16px; padding: 2rem; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <span style="font-size: 0.75rem; font-weight: 700; color: #818cf8; text-transform: uppercase;">${landingData.help?.cards?.discord?.tag || 'Live Community & Chat'}</span>
              <h2 style="font-size: 1.35rem; font-weight: 700; margin: 0.5rem 0 0.75rem 0;">${landingData.help?.cards?.discord?.title || 'Discord Server'}</h2>
              <p style="color: #94a3b8; font-size: 0.95rem; line-height: 1.6;">${landingData.help?.cards?.discord?.description || 'Join our active community of media collectors. Ask questions, share tips, get fast assistance, and stay updated with the latest releases.'}</p>
            </div>
            <div style="margin-top: 2rem;">
              <a href="${DISCORD_INVITE_URL}" target="_blank" rel="noopener noreferrer" style="display: inline-block; width: 100%; text-align: center; background: #6366f1; color: #fff; font-weight: 600; padding: 0.75rem 1.25rem; border-radius: 8px; text-decoration: none;">${landingData.help?.cards?.discord?.button || 'Join Discord Server'}</a>
            </div>
          </article>

          <!-- Email -->
          <article style="background: #11141e; border: 1px solid #1e2433; border-radius: 16px; padding: 2rem; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <span style="font-size: 0.75rem; font-weight: 700; color: #38bdf8; text-transform: uppercase;">${landingData.help?.cards?.email?.tag || 'Developer Contact'}</span>
              <h2 style="font-size: 1.35rem; font-weight: 700; margin: 0.5rem 0 0.75rem 0;">${landingData.help?.cards?.email?.title || 'Direct Email Support'}</h2>
              <p style="color: #94a3b8; font-size: 0.95rem; line-height: 1.6;">${landingData.help?.cards?.email?.description || 'Have questions about licensing, feature requests, private feedback, or encountered a bug? Reach out to the developer directly.'}</p>
            </div>
            <div style="margin-top: 2rem;">
              <a href="mailto:${DEV_EMAIL}" style="display: inline-block; width: 100%; text-align: center; background: #1e293b; color: #e2e8f0; font-weight: 600; padding: 0.75rem 1.25rem; border-radius: 8px; text-decoration: none; border: 1px solid #334155;">${landingData.help?.cards?.email?.button || 'Send Email'} (${DEV_EMAIL})</a>
            </div>
          </article>
        </section>

        <section style="background: #0f131c; border: 1px solid #1e2433; border-radius: 16px; padding: 2.5rem; margin-bottom: 3rem;">
          <h2 style="font-size: 1.75rem; font-weight: 700; margin-bottom: 0.5rem;">${landingData.help?.quickDocs?.title || 'Looking for Documentation?'}</h2>
          <p style="color: #94a3b8; font-size: 1rem; margin-bottom: 1.5rem;">${landingData.help?.quickDocs?.subtitle || 'Explore step-by-step feature guides, batch renaming workflows, and technical details.'}</p>
          <a href="${docsUrl}" style="color: #38bdf8; font-weight: 600; text-decoration: none;">${landingData.help?.quickDocs?.allGuides || 'Explore All 13 Guides →'}</a>
        </section>
      </main>
    </div>
  `;

  return html.replace(/<div id="root">[\s\S]*?<\/div>/i, ssrBody);
}
