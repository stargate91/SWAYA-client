import { getComparisonsList } from '../../../src/site/data/comparisonsData.js';

export function renderHeaderHtml({ homeUrl, docsUrl, changelogUrl, landingData }) {
  return `
    <header style="max-width: 1200px; margin: 0 auto; padding: 1.5rem 1rem; display: flex; justify-content: space-between; align-items: center;">
      <a href="${homeUrl}" style="font-size: 1.5rem; font-weight: 800; color: #38bdf8; text-decoration: none;">SWAYA</a>
      <nav>
        <a href="${homeUrl}" style="color: #fff; margin-right: 1.5rem; text-decoration: none;">${landingData.navbar?.home || 'Home'}</a>
        <a href="${docsUrl}" style="color: #94a3b8; margin-right: 1.5rem; text-decoration: none;">${landingData.navbar?.docs || 'Documentation'}</a>
        <a href="${changelogUrl}" style="color: #94a3b8; margin-right: 1.5rem; text-decoration: none;">${landingData.navbar?.changelog || 'Changelog'}</a>
        <a href="https://discord.gg/g34ZcJScj" style="color: #94a3b8; margin-right: 1.5rem; text-decoration: none;" target="_blank" rel="noopener noreferrer">${landingData.navbar?.discord || 'Discord'}</a>
        <a href="https://buy.stripe.com/aFaaEXaIOb64dhT4YmcjS00" style="background: #38bdf8; color: #0f172a; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; font-weight: 600;" target="_blank" rel="noopener noreferrer">${landingData.navbar?.buy || 'Buy SWAYA (€39)'}</a>
      </nav>
    </header>
  `.trim();
}

export function renderHeroHtml({ hero, description }) {
  return `
    <section style="text-align: center; margin-bottom: 4rem;">
      <span style="display: inline-block; padding: 0.35rem 0.85rem; background: rgba(56, 189, 248, 0.15); color: #38bdf8; border-radius: 9999px; font-size: 0.85rem; font-weight: 600; margin-bottom: 1.25rem;">
        ${hero.priceTag || 'Launch Special (50% Off)'}
      </span>
      <h1 style="font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; line-height: 1.15; margin-bottom: 1.25rem; color: #f8fafc;">
        ${hero.taglinePrefix || 'Your Entire Offline Media Universe,'} <span style="color: #38bdf8;">${hero.taglineAccent || 'Under Total Control.'}</span>
      </h1>
      <p style="font-size: 1.25rem; color: #94a3b8; max-width: 800px; margin: 0 auto 2rem auto; line-height: 1.6;">
        ${description}
      </p>
      <div style="margin-bottom: 1.5rem;">
        <a href="https://buy.stripe.com/aFaaEXaIOb64dhT4YmcjS00" style="background: #38bdf8; color: #0f172a; padding: 0.9rem 2rem; border-radius: 8px; text-decoration: none; font-size: 1.1rem; font-weight: 700; display: inline-block; margin: 0.5rem;" target="_blank" rel="noopener noreferrer">${hero.buyCta || 'Get Lifetime Access for €39'}</a>
        <a href="/dashboard" style="background: #1e293b; color: #f8fafc; padding: 0.9rem 2rem; border-radius: 8px; text-decoration: none; font-size: 1.1rem; font-weight: 600; display: inline-block; margin: 0.5rem;">${hero.demoCta || 'Launch Live Web Demo'}</a>
      </div>
      <div style="color: #64748b; font-size: 0.9rem; display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
        <span>⚡ ${hero.guarantees?.payment || 'One-time payment'}</span>
        <span>•</span>
        <span>🛡️ ${hero.guarantees?.updates || 'Lifetime updates'}</span>
        <span>•</span>
        <span>✨ ${hero.guarantees?.devices || 'Up to 3 personal devices'}</span>
      </div>
    </section>
  `.trim();
}

export function renderVideoHtml({ video }) {
  return `
    <section id="demo-video" style="text-align: center; margin-bottom: 4rem; padding: 3rem 1rem; background: #0c0f17; border-radius: 12px; border: 1px solid #1e293b;">
      <span style="display: inline-block; padding: 0.25rem 0.75rem; background: rgba(56, 189, 248, 0.15); color: #38bdf8; border-radius: 9999px; font-size: 0.8rem; font-weight: 600; margin-bottom: 0.75rem;">
        ${video.tag || 'Product Overview'}
      </span>
      <h2 style="font-size: 2rem; font-weight: 700; color: #f8fafc; margin-bottom: 0.75rem;">
        ${video.title || 'What is SWAYA?'} <span style="color: #38bdf8;">${video.titleAccent || 'See It in Action.'}</span>
      </h2>
      <p style="font-size: 1.1rem; color: #94a3b8; max-width: 700px; margin: 0 auto 1.5rem auto; line-height: 1.6;">
        ${video.subtitle || ''}
      </p>
      <div style="position: relative; width: 100%; aspect-ratio: 16/9; max-width: 900px; margin: 0 auto; border-radius: 12px; overflow: hidden; border: 1px solid #1e293b; background: #000;">
        <video src="/assets/action.mp4" poster="/og-image.jpg" preload="metadata" playsinline style="width: 100%; height: 100%; object-fit: cover;" aria-label="SWAYA Action Video Demo"></video>
      </div>
    </section>
  `.trim();
}

export function renderShowcaseHtml({ showcase }) {
  const sectionsHtml = Object.entries(showcase)
    .map(([key, sec]) => {
      const benefitsHtml = (sec.benefits || [])
        .map((b) => `<li style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem; color: #cbd5e1;"><span>✓</span> <span>${b}</span></li>`)
        .join('');
      return `
        <section id="${key}" style="margin-bottom: 4rem; padding: 2.5rem; background: #131722; border: 1px solid #1e293b; border-radius: 12px;">
          <span style="display: inline-block; padding: 0.25rem 0.75rem; background: rgba(56, 189, 248, 0.15); color: #38bdf8; border-radius: 9999px; font-size: 0.8rem; font-weight: 600; margin-bottom: 0.75rem;">
            ${sec.tag || ''}
          </span>
          <h2 style="font-size: 1.85rem; font-weight: 700; color: #f8fafc; margin-bottom: 0.75rem;">
            ${sec.title || ''} <span style="color: #38bdf8;">${sec.titleAccent || ''}</span>
          </h2>
          <p style="font-size: 1.05rem; color: #94a3b8; line-height: 1.6; margin-bottom: 1.25rem; max-width: 800px;">
            ${sec.description || ''}
          </p>
          <ul style="list-style: none; padding: 0; margin: 0;">
            ${benefitsHtml}
          </ul>
        </section>
      `;
    })
    .join('');

  return `
    <div id="features" style="margin-bottom: 4rem;">
      ${sectionsHtml}
    </div>
  `.trim();
}

export function renderComparePreviewHtml({ prefix, locale = 'en', landingData }) {
  const compPrefix = prefix || '';
  const compareData = landingData.compare || {};
  const comparisons = getComparisonsList(locale);

  const cardsHtml = comparisons
    .map(
      (comp) => `
      <a href="${compPrefix}/compare/${comp.slug}" style="background: #11141e; border: 1px solid #1e2433; border-radius: 12px; padding: 1.5rem; text-decoration: none; color: inherit; display: flex; flex-direction: column; justify-content: space-between; gap: 1rem;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <h3 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin: 0;">SWAYA vs ${comp.name}</h3>
            <span style="font-size: 0.75rem; color: #94a3b8; background: #1e293b; padding: 0.2rem 0.5rem; border-radius: 9999px;">${comp.shortCategory || ''}</span>
          </div>
          <div style="color: #38bdf8; font-size: 0.9rem; font-weight: 600; margin-bottom: 0.5rem; line-height: 1.4;">${comp.heroTagline || ''}</div>
          <p style="color: #94a3b8; font-size: 0.85rem; line-height: 1.6; margin: 0;">${comp.heroSubtitle || comp.metaDescription || ''}</p>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 0.75rem; border-top: 1px solid #1e2433; font-size: 0.85rem;">
          <span style="color: #64748b;">${comp.name}: ${comp.competitorPricing}</span>
          <span style="color: #38bdf8; font-weight: 600;">${compareData.viewComparison || 'View Comparison'} →</span>
        </div>
      </a>
    `
    )
    .join('');

  return `
    <section id="compare" style="margin-bottom: 4rem;">
      <div style="text-align: center; margin-bottom: 2.5rem;">
        <span style="display: inline-block; padding: 0.25rem 0.75rem; background: rgba(56, 189, 248, 0.15); color: #38bdf8; border-radius: 9999px; font-size: 0.8rem; font-weight: 600; margin-bottom: 0.75rem;">
          ${compareData.tag || 'Software Alternatives'}
        </span>
        <h2 style="font-size: 2rem; font-weight: 700; color: #f8fafc; margin-bottom: 0.75rem;">
          ${compareData.title || 'Why SWAYA?'} <span style="color: #38bdf8;">${compareData.titleAccent || 'See How We Compare.'}</span>
        </h2>
        <p style="font-size: 1.1rem; color: #94a3b8; max-width: 700px; margin: 0 auto; line-height: 1.6;">
          ${compareData.subtitle || ''}
        </p>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
        ${cardsHtml}
      </div>
      <div style="text-align: center;">
        <a href="${compPrefix}/compare" style="display: inline-block; background: #1e293b; color: #38bdf8; padding: 0.75rem 1.75rem; border-radius: 8px; text-decoration: none; font-weight: 600; border: 1px solid #334155;">
          ${compareData.viewAll || 'Explore All Alternatives & Full Matrix →'}
        </a>
      </div>
    </section>
  `.trim();
}

export function renderFaqHtml({ faq }) {
  const faqItemsHtml = (faq.items || [])
    .map(
      (item) => `
      <div style="margin-bottom: 1.5rem; padding: 1.5rem; background: #131722; border: 1px solid #1e293b; border-radius: 8px;">
        <h3 style="font-size: 1.15rem; font-weight: 600; color: #f8fafc; margin-bottom: 0.5rem;">${item.question}</h3>
        <p style="font-size: 0.95rem; color: #94a3b8; line-height: 1.6; margin: 0;">${item.answer}</p>
      </div>
    `
    )
    .join('');

  return `
    <section id="faq" style="margin-bottom: 4rem;">
      <div style="text-align: center; margin-bottom: 2.5rem;">
        <span style="display: inline-block; padding: 0.25rem 0.75rem; background: rgba(56, 189, 248, 0.15); color: #38bdf8; border-radius: 9999px; font-size: 0.8rem; font-weight: 600; margin-bottom: 0.75rem;">
          ${faq.tag || 'Got Questions?'}
        </span>
        <h2 style="font-size: 2rem; font-weight: 700; color: #f8fafc; margin-bottom: 0.75rem;">
          ${faq.title || 'Frequently Asked'} <span style="color: #38bdf8;">${faq.titleAccent || 'Questions.'}</span>
        </h2>
        <p style="font-size: 1.1rem; color: #94a3b8; max-width: 700px; margin: 0 auto; line-height: 1.6;">
          ${faq.subtitle || ''}
        </p>
      </div>
      <div style="max-width: 900px; margin: 0 auto;">
        ${faqItemsHtml}
      </div>
    </section>
  `.trim();
}

export function renderDownloadHtml({ download }) {
  return `
    <section id="download" style="text-align: center; padding: 3rem 1.5rem; background: linear-gradient(180deg, #131722 0%, #0f172a 100%); border: 1px solid #1e293b; border-radius: 12px; margin-bottom: 4rem;">
      <h2 style="font-size: 2rem; font-weight: 800; color: #f8fafc; margin-bottom: 0.75rem;">
        ${download.title || 'Take Control of Your Collection Today'}
      </h2>
      <p style="font-size: 1.15rem; color: #94a3b8; max-width: 700px; margin: 0 auto 1.5rem auto; line-height: 1.6;">
        ${download.subtitle || ''}
      </p>
      <a href="https://buy.stripe.com/aFaaEXaIOb64dhT4YmcjS00" style="background: #38bdf8; color: #0f172a; padding: 1rem 2.5rem; border-radius: 8px; text-decoration: none; font-size: 1.15rem; font-weight: 700; display: inline-block; margin-bottom: 0.75rem;" target="_blank" rel="noopener noreferrer">
        ${download.button || 'Buy Lifetime License (€39)'}
      </a>
      <p style="font-size: 0.85rem; color: #64748b; margin: 0;">
        ${download.disclaimer || ''}
      </p>
    </section>
  `.trim();
}

export function renderFooterHtml({ footer, homeUrl, docsUrl, changelogUrl, prefix, locale = 'en' }) {
  const compPrefix = prefix || '';
  const currentLang = locale || 'en';

  const languages = [
    { code: 'en', label: 'English', path: '/' },
    { code: 'de', label: 'Deutsch', path: '/de' },
    { code: 'ja', label: '日本語', path: '/ja' },
    { code: 'hu', label: 'Magyar', path: '/hu' },
    { code: 'fr', label: 'Français', path: '/fr' },
    { code: 'es', label: 'Español', path: '/es' },
    { code: 'zh', label: '简体中文', path: '/zh' },
    { code: 'it', label: 'Italiano', path: '/it' },
    { code: 'ru', label: 'Русский', path: '/ru' },
    { code: 'pt', label: 'Português', path: '/pt' },
    { code: 'ko', label: '한국어', path: '/ko' },
    { code: 'nl', label: 'Nederlands', path: '/nl' },
    { code: 'pl', label: 'Polski', path: '/pl' },
    { code: 'zh-tw', label: '繁體中文', path: '/zh-tw' },
    { code: 'sv', label: 'Svenska', path: '/sv' },
    { code: 'tr', label: 'Türkçe', path: '/tr' },
    { code: 'cs', label: 'Čeština', path: '/cs' },
  ];

  const languageLinksHtml = languages
    .map((lang, idx) => {
      const isActive = lang.code === currentLang;
      const divider = idx > 0 ? '<span style="color: #334155; margin: 0 0.5rem;" aria-hidden="true">•</span>' : '';
      const color = isActive ? '#38bdf8' : '#94a3b8';
      const weight = isActive ? '700' : '500';
      return `${divider}<a href="${lang.path}" style="color: ${color}; font-weight: ${weight}; text-decoration: none; font-size: 0.85rem;">${lang.label}</a>`;
    })
    .join('');

  return `
    <footer role="contentinfo" style="border-top: 1px solid #1e293b; padding: 3.5rem 1rem 2rem 1rem; background: #0c0f17;">
      <div style="max-width: 1200px; margin: 0 auto;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin-bottom: 3rem;">
          <!-- 1. Brand -->
          <div>
            <span style="font-size: 1.4rem; font-weight: 800; color: #38bdf8; letter-spacing: -0.02em;">SWAYA</span>
            <p style="color: #94a3b8; font-size: 0.9rem; line-height: 1.6; margin-top: 0.75rem;">${footer.tagline || 'Next-generation offline media center & video player for Windows.'}</p>
            ${footer.badge ? `<span style="display: inline-block; margin-top: 0.75rem; padding: 0.25rem 0.6rem; background: rgba(56, 189, 248, 0.1); color: #38bdf8; font-size: 0.75rem; font-weight: 700; border-radius: 9999px;">${footer.badge}</span>` : ''}
          </div>

          <!-- 2. Navigation -->
          <div>
            <h4 style="color: #f8fafc; font-size: 0.95rem; font-weight: 700; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.05em;">${footer.columns?.navigation || 'Navigation'}</h4>
            <ul style="list-style: none; padding: 0; margin: 0; line-height: 2; font-size: 0.9rem;">
              <li><a href="${homeUrl}" style="color: #94a3b8; text-decoration: none;">${footer.links?.home || 'Home'}</a></li>
              <li><a href="${docsUrl}" style="color: #94a3b8; text-decoration: none;">${footer.links?.docs || 'Documentation'}</a></li>
              <li><a href="${changelogUrl}" style="color: #94a3b8; text-decoration: none;">${footer.links?.changelog || 'Changelog'}</a></li>
              <li><a href="${prefix}/help" style="color: #94a3b8; text-decoration: none;">${footer.links?.help || 'Help & Support'}</a></li>
              <li><a href="https://discord.gg/g34ZcJScj" style="color: #94a3b8; text-decoration: none;" target="_blank" rel="noopener noreferrer">${footer.links?.discord || 'Discord'} ↗</a></li>
              <li><a href="mailto:support@swaya.xyz" style="color: #94a3b8; text-decoration: none;">${footer.links?.contact || 'Contact Developer'}</a></li>
              <li><a href="/dashboard" style="color: #38bdf8; text-decoration: none; font-weight: 600;">${footer.links?.liveDemo || 'Live Demo'} →</a></li>
            </ul>
          </div>

          <!-- 3. Comparisons & Alternatives -->
          <div>
            <h4 style="color: #f8fafc; font-size: 0.95rem; font-weight: 700; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.05em;">${footer.columns?.comparisons || 'Comparisons'}</h4>
            <ul style="list-style: none; padding: 0; margin: 0; line-height: 2; font-size: 0.9rem;">
              <li><a href="${compPrefix}/compare/filebot" style="color: #94a3b8; text-decoration: none;">SWAYA vs FileBot</a></li>
              <li><a href="${compPrefix}/compare/plex" style="color: #94a3b8; text-decoration: none;">SWAYA vs Plex</a></li>
              <li><a href="${compPrefix}/compare/tinymediamanager" style="color: #94a3b8; text-decoration: none;">SWAYA vs tinyMediaManager</a></li>
              <li><a href="${compPrefix}/compare/stash" style="color: #94a3b8; text-decoration: none;">SWAYA vs StashApp</a></li>
              <li><a href="${compPrefix}/compare/jellyfin" style="color: #94a3b8; text-decoration: none;">SWAYA vs Jellyfin</a></li>
              <li><a href="${compPrefix}/compare/kodi" style="color: #94a3b8; text-decoration: none;">SWAYA vs Kodi</a></li>
              <li><a href="${compPrefix}/compare" style="color: #38bdf8; text-decoration: none; font-weight: 600;">${footer.links?.allComparisons || 'All Alternatives →'}</a></li>
            </ul>
          </div>

          <!-- 4. Documentation Guides -->
          <div>
            <h4 style="color: #f8fafc; font-size: 0.95rem; font-weight: 700; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.05em;">${footer.columns?.documentation || 'Documentation'}</h4>
            <ul style="list-style: none; padding: 0; margin: 0; line-height: 2; font-size: 0.9rem;">
              <li><a href="${prefix}/docs/getting-started" style="color: #94a3b8; text-decoration: none;">Getting Started</a></li>
              <li><a href="${prefix}/docs/organizer" style="color: #94a3b8; text-decoration: none;">Smart Organizer</a></li>
              <li><a href="${prefix}/docs/player" style="color: #94a3b8; text-decoration: none;">4K MPV Player</a></li>
              <li><a href="${prefix}/docs/settings" style="color: #94a3b8; text-decoration: none;">Settings & Scrapers</a></li>
              <li><a href="${docsUrl}" style="color: #38bdf8; text-decoration: none; font-weight: 600;">${footer.links?.allGuides || 'All 13 Guides →'}</a></li>
            </ul>
          </div>

          <!-- 5. Get SWAYA -->
          <div>
            <h4 style="color: #f8fafc; font-size: 0.95rem; font-weight: 700; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.05em;">${footer.columns?.getSwaya || 'Get SWAYA'}</h4>
            <p style="color: #94a3b8; font-size: 0.85rem; line-height: 1.5; margin-bottom: 1.25rem;">${footer.licenseDescription || 'Perpetual lifetime license for up to 3 personal devices with zero subscriptions.'}</p>
            <a href="https://buy.stripe.com/aFaaEXaIOb64dhT4YmcjS00" style="background: #38bdf8; color: #0f172a; padding: 0.65rem 1.25rem; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 0.95rem; display: inline-block; box-shadow: 0 4px 14px rgba(56, 189, 248, 0.25);" target="_blank" rel="noopener noreferrer">
              ${footer.buyLicense || 'Buy License (€39)'}
            </a>
          </div>
        </div>

        <!-- Language Alternates Selector -->
        <div style="border-top: 1px solid #1e2433; padding: 1.5rem 0; margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: center; gap: 0.75rem; flex-wrap: wrap;">
          <span style="color: #64748b; font-size: 0.85rem; font-weight: 600;">${footer.languages || 'Languages:'}</span>
          <div style="display: flex; align-items: center; flex-wrap: wrap; justify-content: center; gap: 0.25rem;">
            ${languageLinksHtml}
          </div>
        </div>

        <!-- Bottom Bar (Legal & Copyright) -->
        <div style="border-top: 1px solid #1e2433; padding-top: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; color: #64748b; font-size: 0.85rem;">
          <p style="margin: 0;">${(footer.copyright || '© 2026 SWAYA. All rights reserved.').replace('{{year}}', '2026')}</p>
          <div style="display: flex; gap: 1.25rem; align-items: center;">
            <a href="${prefix}/privacy" style="color: #94a3b8; text-decoration: none;">${footer.links?.privacy || 'Privacy Policy'}</a>
            <span style="color: #334155;" aria-hidden="true">•</span>
            <a href="${prefix}/terms" style="color: #94a3b8; text-decoration: none;">${footer.links?.terms || 'Terms & Refund Policy'}</a>
          </div>
          <p style="margin: 0;">${footer.madeWithLove || 'Crafted with precision for media collectors'}</p>
        </div>
      </div>
    </footer>
  `.trim();
}
