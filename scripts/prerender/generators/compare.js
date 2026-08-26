import { BASE_URL, LANDING_LOCALES, DOCS_LOCALES, DOC_METADATA } from '../constants.js';
import { getHrefLangTags, getOgLocaleTags } from '../utils.js';
import { getCompareJsonLd, getCompareHubJsonLd } from '../schema.js';
import { getComparisonsList } from '../../../src/site/data/comparisonsData.js';
import { COMPARE_RELATED_DOCS_MAP } from '../../../src/site/data/docRelations.js';

export function buildHtmlForCompareHub(templateHtml, locale = 'en') {
  const landingData = LANDING_LOCALES[locale] || LANDING_LOCALES.en;
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const homeUrl = prefix || '/';
  const hubUrl = `${BASE_URL}${prefix}/compare`;
  const baseTitle = landingData.compare?.metaTitle || 'SWAYA Comparisons & Software Alternatives';
  const fullTitle = `${baseTitle} - SWAYA`;
  const description =
    landingData.compare?.metaDescription ||
    landingData.compare?.hubSubtitle ||
    'Compare SWAYA against FileBot, Plex, tinyMediaManager, StashApp, Jellyfin, and Kodi. Find the best offline media center, disk renamer, and MPV video player for Windows.';

  const jsonLd = getCompareHubJsonLd({ locale, prefix, currentUrl: hubUrl });
  const comparisons = getComparisonsList(locale);

  let html = templateHtml;
  html = html.replaceAll('src="./', 'src="/');
  html = html.replaceAll('href="./', 'href="/');

  html = html.replace(/<html lang=".*?"/i, `<html lang="${locale}"`);
  html = html.replace(/<title>.*?<\/title>/i, `<title>${fullTitle}</title>`);
  html = html.replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${hubUrl}" />${getHrefLangTags('/compare')}`);
  html = html.replace(
    /<meta name="description" content=".*?" \/>/i,
    `<meta name="description" content="${description}" />`
  );
  html = html.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${hubUrl}" />`);
  html = html.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${fullTitle}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${description}" />`);
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/i, `<meta name="twitter:title" content="${fullTitle}" />`);
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/i, `<meta name="twitter:description" content="${description}" />`);

  const ogLocaleTags = getOgLocaleTags(locale, false);
  html = html.replace(/<meta property="og:locale"[\s\S]*?<meta property="og:image"/i, `${ogLocaleTags.trim()}\n  <meta property="og:image"`);

  const ogImage = `${BASE_URL}/og/compare-hub.jpg`;
  html = html.replace(/<meta property="og:image" content=".*?" \/>/i, `<meta property="og:image" content="${ogImage}" />`);
  html = html.replace(/<meta name="twitter:image" content=".*?" \/>/i, `<meta name="twitter:image" content="${ogImage}" />`);
  html = html.replace(/<meta property="og:image:alt" content=".*?" \/>/i, `<meta property="og:image:alt" content="${fullTitle}" />`);
  html = html.replace(/<meta name="twitter:image:alt" content=".*?" \/>/i, `<meta name="twitter:image:alt" content="${fullTitle}" />`);

  const jsonLdScript = `<script id="site-jsonld" type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n  </script>`;
  html = html.replace(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/i, jsonLdScript);

  const cardsHtml = comparisons
    .map(
      (comp) => `
      <article style="background: #11141e; border: 1px solid #1e2433; border-radius: 12px; padding: 2rem; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <span style="font-size: 0.75rem; font-weight: 700; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.05em; background: rgba(56, 189, 248, 0.1); padding: 0.25rem 0.6rem; border-radius: 9999px;">${comp.category}</span>
            <span style="font-size: 0.85rem; color: #64748b;">${comp.shortCategory || ''}</span>
          </div>
          <h2 style="font-size: 1.5rem; font-weight: 700; color: #fff; margin-bottom: 0.75rem;">SWAYA vs ${comp.name}</h2>
          <p style="color: #94a3b8; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">${comp.heroTagline || comp.metaDescription}</p>
          <div style="background: #0a0d14; border: 1px solid #1e2433; border-radius: 8px; padding: 0.75rem 1rem; margin-bottom: 1.5rem; font-size: 0.85rem;">
            <div style="color: #38bdf8; margin-bottom: 0.25rem;"><strong>SWAYA:</strong> ${comp.swayaPricing}</div>
            <div style="color: #94a3b8;"><strong>${comp.name}:</strong> ${comp.competitorPricing}</div>
          </div>
        </div>
        <a href="${prefix}/compare/${comp.slug}" style="display: inline-block; width: 100%; text-align: center; background: #1e293b; color: #38bdf8; font-weight: 600; padding: 0.75rem 1rem; border-radius: 8px; text-decoration: none; border: 1px solid #334155;">View Comparison &amp; Matrix →</a>
      </article>
    `
    )
    .join('');

  const ssrBody = `
    <div id="root">
      <main style="max-width: 1140px; margin: 0 auto; padding: 3rem 1.5rem;">
        <nav aria-label="Breadcrumb" style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 1rem;">
          <a href="${homeUrl}" style="color: #cbd5e1; text-decoration: none;">Home</a> &gt; <span>Comparisons &amp; Alternatives</span>
        </nav>
        <header style="text-align: center; margin-bottom: 3.5rem;">
          <span style="font-size: 0.85rem; color: #38bdf8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; background: rgba(56, 189, 248, 0.1); padding: 0.3rem 0.8rem; border-radius: 9999px; display: inline-block; margin-bottom: 0.75rem;">Software Alternatives &amp; In-Depth Matrix</span>
          <h1 style="font-size: 2.75rem; font-weight: 800; margin: 0.5rem 0; letter-spacing: -0.025em; color: #fff;">${fullTitle}</h1>
          <p style="color: #94a3b8; font-size: 1.15rem; max-width: 750px; margin: 0 auto; line-height: 1.6;">${description}</p>
        </header>

        <section style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin-bottom: 4rem;">
          ${cardsHtml}
        </section>

        <section style="text-align: center; background: linear-gradient(180deg, #131722 0%, #0f172a 100%); border: 1px solid #1e293b; border-radius: 16px; padding: 3rem 1.5rem; margin-bottom: 3rem;">
          <h2 style="font-size: 2rem; font-weight: 800; color: #fff; margin-bottom: 0.75rem;">Take Total Control of Your Local Media Universe</h2>
          <p style="color: #94a3b8; font-size: 1.1rem; max-width: 650px; margin: 0 auto 1.75rem auto; line-height: 1.6;">Discover how SWAYA unites automated batch file renaming on disk, rich visual library browsing, and built-in hardware-accelerated 4K MPV playback.</p>
          <a href="https://buy.stripe.com/aFaaEXaIOb64dhT4YmcjS00" style="background: #38bdf8; color: #0f172a; padding: 0.85rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 1.05rem; display: inline-block; margin: 0.5rem;">Buy Lifetime License (€39)</a>
          <a href="/dashboard" style="background: #1e293b; color: #f8fafc; padding: 0.85rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 1.05rem; display: inline-block; margin: 0.5rem;">Launch Live Web Demo</a>
        </section>
      </main>
    </div>
  `.trim();

  return html.replace(/<div id="root">[\s\S]*?<\/div>/i, ssrBody);
}

export function buildHtmlForCompare(templateHtml, comparison, locale = 'en') {
  if (!comparison) return templateHtml;

  const prefix = locale === 'en' ? '' : `/${locale}`;
  const homeUrl = prefix || '/';
  const hubUrl = `${prefix}/compare`;
  const currentUrl = `${BASE_URL}${prefix}/compare/${comparison.slug}`;
  const fullTitle = `${comparison.metaTitle} - SWAYA`;
  const description = comparison.metaDescription;

  const jsonLd = getCompareJsonLd({ comparison, locale, prefix, currentUrl });

  let html = templateHtml;
  html = html.replaceAll('src="./', 'src="/');
  html = html.replaceAll('href="./', 'href="/');

  html = html.replace(/<html lang=".*?"/i, `<html lang="${locale}"`);
  html = html.replace(/<title>.*?<\/title>/i, `<title>${fullTitle}</title>`);
  html = html.replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${currentUrl}" />${getHrefLangTags(`/compare/${comparison.slug}`)}`);
  html = html.replace(
    /<meta name="description" content=".*?" \/>/i,
    `<meta name="description" content="${description}" />`
  );
  html = html.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${currentUrl}" />`);
  html = html.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${fullTitle}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${description}" />`);
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/i, `<meta name="twitter:title" content="${fullTitle}" />`);
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/i, `<meta name="twitter:description" content="${description}" />`);

  const ogLocaleTags = getOgLocaleTags(locale, false);
  html = html.replace(/<meta property="og:locale"[\s\S]*?<meta property="og:image"/i, `${ogLocaleTags.trim()}\n  <meta property="og:image"`);

  const ogImage = `${BASE_URL}/og/compare-${comparison.slug}.jpg`;
  html = html.replace(/<meta property="og:image" content=".*?" \/>/i, `<meta property="og:image" content="${ogImage}" />`);
  html = html.replace(/<meta name="twitter:image" content=".*?" \/>/i, `<meta name="twitter:image" content="${ogImage}" />`);
  html = html.replace(/<meta property="og:image:alt" content=".*?" \/>/i, `<meta property="og:image:alt" content="${fullTitle}" />`);
  html = html.replace(/<meta name="twitter:image:alt" content=".*?" \/>/i, `<meta name="twitter:image:alt" content="${fullTitle}" />`);

  const jsonLdScript = `<script id="site-jsonld" type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n  </script>`;
  html = html.replace(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/i, jsonLdScript);

  const competitorPoints = (comparison.whenToChooseCompetitor || [])
    .map((point) => `<li style="margin-bottom: 0.75rem; color: #cbd5e1; line-height: 1.5;">${point}</li>`)
    .join('');

  const swayaPoints = (comparison.whenToChooseSwaya || [])
    .map((point) => `<li style="margin-bottom: 0.75rem; color: #cbd5e1; line-height: 1.5;">${point}</li>`)
    .join('');

  const matrixRowsHtml = (comparison.matrix || [])
    .map(
      (row) => `
      <tr style="border-bottom: 1px solid #1e2433;">
        <td style="padding: 1rem; color: #fff; font-weight: 600; width: 35%;">
          ${row.feature}
        </td>
        <td style="padding: 1rem; color: #38bdf8; width: 32.5%; background: rgba(56, 189, 248, 0.03);">
          <div style="font-weight: 700; font-size: 1rem; margin-bottom: 0.25rem;">${row.swaya === true ? '✓ Supported' : (row.swaya === false ? '✗ Not Available' : row.swaya)}</div>
          <div style="font-size: 0.85rem; color: #94a3b8;">${row.swayaNote || ''}</div>
        </td>
        <td style="padding: 1rem; color: #cbd5e1; width: 32.5%;">
          <div style="font-weight: 700; font-size: 1rem; margin-bottom: 0.25rem;">${row.competitor === true ? '✓ Supported' : (row.competitor === false ? '✗ Not Available' : row.competitor)}</div>
          <div style="font-size: 0.85rem; color: #64748b;">${row.competitorNote || ''}</div>
        </td>
      </tr>
    `
    )
    .join('');

  const deepDivesHtml = (comparison.deepDives || [])
    .map(
      (dive) => `
      <article style="background: #11141e; border: 1px solid #1e2433; border-radius: 12px; padding: 2rem; margin-bottom: 1.5rem;">
        <h3 style="font-size: 1.35rem; font-weight: 700; color: #fff; margin-bottom: 0.75rem;">${dive.title}</h3>
        <p style="color: #94a3b8; font-size: 1rem; line-height: 1.6; margin: 0;">${dive.description}</p>
      </article>
    `
    )
    .join('');

  const relatedSlugs = COMPARE_RELATED_DOCS_MAP[comparison.slug] || [];
  const docsData = DOCS_LOCALES[locale] || DOCS_LOCALES.en;
  const relatedDocs = relatedSlugs.map((s) => ({
    slug: s,
    title: docsData.items?.[s]?.title || DOC_METADATA[s]?.title || s,
    description: docsData.items?.[s]?.description || DOC_METADATA[s]?.description || '',
    url: `${prefix}/docs/${s}`,
  }));

  const relatedDocsHtml = relatedDocs.length > 0
    ? `
      <section style="margin-bottom: 4rem;">
        <div style="text-align: center; margin-bottom: 2rem;">
          <h2 style="font-size: 1.85rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem;">Explore Relevant SWAYA Features &amp; Workflows</h2>
          <p style="color: #94a3b8; font-size: 1.05rem;">In-depth documentation guides covering core features compared above.</p>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem;">
          ${relatedDocs.map((doc) => `
            <a href="${doc.url}" style="background: #11141e; border: 1px solid #1e2433; border-radius: 12px; padding: 1.5rem; text-decoration: none; color: inherit; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <h3 style="font-size: 1.15rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
                  <span>${doc.title}</span>
                  <span style="color: #38bdf8;">→</span>
                </h3>
                <p style="color: #94a3b8; font-size: 0.9rem; line-height: 1.6; margin: 0;">${doc.description}</p>
              </div>
            </a>
          `).join('')}
        </div>
      </section>
    `
    : '';

  const faqsHtml = (comparison.faqs && comparison.faqs.length > 0)
    ? `
      <section style="margin-bottom: 4rem;">
        <div style="text-align: center; margin-bottom: 2.5rem;">
          <span style="font-size: 0.8rem; color: #38bdf8; font-weight: 600; text-transform: uppercase; background: rgba(56, 189, 248, 0.1); padding: 0.25rem 0.75rem; border-radius: 9999px; display: inline-block; margin-bottom: 0.5rem;">Got Questions?</span>
          <h2 style="font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem;">Frequently Asked Questions about SWAYA vs ${comparison.name}</h2>
          <p style="color: #94a3b8; font-size: 1.05rem;">Common questions about migrating to or using SWAYA alongside ${comparison.name}.</p>
        </div>
        <div style="max-width: 850px; margin: 0 auto;">
          ${comparison.faqs.map((faq) => `
            <div style="background: #11141e; border: 1px solid #1e2433; border-radius: 8px; padding: 1.5rem; margin-bottom: 1rem;">
              <h3 style="font-size: 1.15rem; font-weight: 600; color: #fff; margin-bottom: 0.5rem;">${faq.q}</h3>
              <p style="color: #94a3b8; font-size: 0.95rem; line-height: 1.6; margin: 0;">${faq.a}</p>
            </div>
          `).join('')}
        </div>
      </section>
    `
    : '';

  const ssrBody = `
    <div id="root">
      <main style="max-width: 1140px; margin: 0 auto; padding: 3rem 1.5rem;">
        <nav aria-label="Breadcrumb" style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 1.5rem;">
          <a href="${homeUrl}" style="color: #cbd5e1; text-decoration: none;">Home</a> &gt; <a href="${hubUrl}" style="color: #cbd5e1; text-decoration: none;">Comparisons</a> &gt; <span>SWAYA vs ${comparison.name}</span>
        </nav>

        <header style="text-align: center; margin-bottom: 4rem;">
          <span style="font-size: 0.85rem; color: #38bdf8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; background: rgba(56, 189, 248, 0.1); padding: 0.3rem 0.8rem; border-radius: 9999px; display: inline-block; margin-bottom: 1rem;">${comparison.badge || `SWAYA vs ${comparison.name}`}</span>
          <h1 style="font-size: 2.75rem; font-weight: 800; margin: 0.5rem 0 1rem 0; letter-spacing: -0.025em; color: #fff; line-height: 1.2;">${comparison.title}</h1>
          <p style="color: #94a3b8; font-size: 1.2rem; max-width: 800px; margin: 0 auto 2rem auto; line-height: 1.6;">${comparison.heroSubtitle || description}</p>
          
          <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem;">
            <div style="background: #11141e; border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 8px; padding: 0.6rem 1.25rem; font-size: 0.95rem;">
              <span style="color: #38bdf8; font-weight: 700;">SWAYA:</span> <span style="color: #fff;">${comparison.swayaPricing}</span>
            </div>
            <div style="background: #11141e; border: 1px solid #1e2433; border-radius: 8px; padding: 0.6rem 1.25rem; font-size: 0.95rem;">
              <span style="color: #94a3b8; font-weight: 700;">${comparison.name}:</span> <span style="color: #cbd5e1;">${comparison.competitorPricing}</span>
            </div>
          </div>

          <div>
            <a href="https://buy.stripe.com/aFaaEXaIOb64dhT4YmcjS00" style="background: #38bdf8; color: #0f172a; padding: 0.85rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 1.05rem; display: inline-block; margin: 0.5rem;">Get Lifetime Access (€39)</a>
            <a href="/dashboard" style="background: #1e293b; color: #f8fafc; padding: 0.85rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 1.05rem; display: inline-block; margin: 0.5rem;">Launch Live Web Demo</a>
          </div>
        </header>

        <!-- Side by Side Decision Assessment -->
        <section style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 4rem;">
          <div style="background: #11141e; border: 1px solid #1e2433; border-radius: 12px; padding: 2rem;">
            <h2 style="font-size: 1.35rem; font-weight: 700; color: #94a3b8; margin-bottom: 1.25rem;">When to Choose ${comparison.name}</h2>
            <ul style="padding-left: 1.25rem; margin: 0;">
              ${competitorPoints}
            </ul>
          </div>
          <div style="background: #11141e; border: 1px solid rgba(56, 189, 248, 0.4); border-radius: 12px; padding: 2rem; box-shadow: 0 0 30px rgba(56, 189, 248, 0.05);">
            <h2 style="font-size: 1.35rem; font-weight: 700; color: #38bdf8; margin-bottom: 1.25rem;">When to Choose SWAYA</h2>
            <ul style="padding-left: 1.25rem; margin: 0;">
              ${swayaPoints}
            </ul>
          </div>
        </section>

        <!-- Feature Matrix Table -->
        <section style="margin-bottom: 4rem;">
          <h2 style="font-size: 1.85rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; text-align: center;">Feature-by-Feature Comparison Matrix</h2>
          <div style="overflow-x: auto; background: #11141e; border: 1px solid #1e2433; border-radius: 12px;">
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.95rem;">
              <thead>
                <tr style="border-bottom: 2px solid #1e2433; background: #0a0d14;">
                  <th style="padding: 1.2rem 1rem; color: #94a3b8; font-weight: 600;">Feature</th>
                  <th style="padding: 1.2rem 1rem; color: #38bdf8; font-weight: 700; background: rgba(56, 189, 248, 0.05);">SWAYA</th>
                  <th style="padding: 1.2rem 1rem; color: #94a3b8; font-weight: 600;">${comparison.name}</th>
                </tr>
              </thead>
              <tbody>
                ${matrixRowsHtml}
              </tbody>
            </table>
          </div>
        </section>

        <!-- In-Depth Analysis Deep Dives -->
        <section style="margin-bottom: 4rem;">
          <h2 style="font-size: 1.85rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; text-align: center;">In-Depth Comparison &amp; Architectural Differences</h2>
          ${deepDivesHtml}
        </section>

        <!-- Related Feature Documentation Guides -->
        ${relatedDocsHtml}

        <!-- FAQs -->
        ${faqsHtml}

        <!-- Bottom CTA -->
        <section style="text-align: center; background: linear-gradient(180deg, #131722 0%, #0f172a 100%); border: 1px solid #1e293b; border-radius: 16px; padding: 3rem 1.5rem; margin-bottom: 3rem;">
          <h2 style="font-size: 2rem; font-weight: 800; color: #fff; margin-bottom: 0.75rem;">Ready to Upgrade Your Media Management?</h2>
          <p style="color: #94a3b8; font-size: 1.1rem; max-width: 650px; margin: 0 auto 1.75rem auto; line-height: 1.6;">Get a perpetual lifetime license for SWAYA today with complete local privacy, physical disk renamer, and hardware-accelerated 4K MPV player.</p>
          <a href="https://buy.stripe.com/aFaaEXaIOb64dhT4YmcjS00" style="background: #38bdf8; color: #0f172a; padding: 0.85rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 1.05rem; display: inline-block; margin: 0.5rem;">Buy Lifetime License (€39)</a>
          <a href="/dashboard" style="background: #1e293b; color: #f8fafc; padding: 0.85rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 1.05rem; display: inline-block; margin: 0.5rem;">Launch Live Web Demo</a>
        </section>
      </main>
    </div>
  `.trim();

  return html.replace(/<div id="root">[\s\S]*?<\/div>/i, ssrBody);
}
