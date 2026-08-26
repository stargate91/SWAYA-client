import { describe, it, expect } from 'vitest';
import { getLandingJsonLd } from '../../src/site/schema/landingSchema.js';
import { getDocsHubJsonLd, getDocArticleJsonLd } from '../../src/site/schema/docsSchema.js';
import { getChangelogJsonLd } from '../../src/site/schema/changelogSchema.js';
import { getCompareHubJsonLd, getCompareJsonLd } from '../../src/site/schema/compareSchema.js';
import { getHelpJsonLd } from '../../src/site/schema/helpSchema.js';

describe('Landing JSON-LD Schemas', () => {
  it('should generate valid WebSite, Organization, SoftwareApplication, and VideoObject schemas in envelope graph', () => {
    const mockT = (key, opts) => opts?.defaultValue || key;
    const schemas = getLandingJsonLd({
      locale: 'en',
      t: mockT,
      videoContentUrl: 'https://swaya.xyz/assets/action.mp4',
    });

    const envelope = schemas['site-jsonld'];
    expect(envelope).toBeDefined();
    expect(envelope['@context']).toBe('https://schema.org');

    const graph = envelope['@graph'];
    expect(Array.isArray(graph)).toBe(true);

    const website = graph.find((s) => s['@type'] === 'WebSite');
    expect(website).toBeDefined();

    const webpage = graph.find((s) => s['@type'] === 'WebPage');
    expect(webpage).toBeDefined();
    expect(webpage.isPartOf?.['@id']).toBe('https://swaya.xyz/#website');

    const org = graph.find((s) => s['@type'] === 'Organization');
    expect(org).toBeDefined();
    expect(org.sameAs).toContain('https://discord.gg/g34ZcJScj');
    expect(org.sameAs).toContain('https://github.com/zsakfoso/SWAYA');
    expect(org.sameAs).toContain('https://x.com/swaya_official');
    expect(org.sameAs).toContain('https://www.instagram.com/swayaxyz');

    const app = graph.find((s) => s['@type'] === 'SoftwareApplication');
    expect(app).toBeDefined();
    expect(app.downloadUrl).toBe('https://swaya.xyz/#download');
    expect(app.offers.price).toBe('39.00');
    expect(app.offers.priceValidUntil).toBe(`${new Date().getFullYear()}-12-31`);
    expect(app.aggregateRating.ratingValue).toBe('4.9');
    expect(app.aggregateRating.ratingCount).toBe('142');
    expect(Array.isArray(app.review)).toBe(true);
    expect(app.review.length).toBeGreaterThan(0);

    const video = graph.find((s) => s['@type'] === 'VideoObject');
    expect(video).toBeDefined();
    expect(video.contentUrl).toBe('https://swaya.xyz/assets/action.mp4');
    expect(video.embedUrl).toBe('https://swaya.xyz/#demo-video');
    expect(video.duration).toBe('PT2M48S');
    expect(video.uploadDate).toBe('2026-08-20T00:00:00+00:00');

    const faq = graph.find((s) => s['@type'] === 'FAQPage');
    expect(faq).toBeDefined();
    expect(Array.isArray(faq.mainEntity)).toBe(true);

    const nav = graph.find((s) => s['@type'] === 'ItemList' && s['@id']?.includes('#navigation'));
    expect(nav).toBeDefined();
    expect(Array.isArray(nav.itemListElement)).toBe(true);
    expect(nav.itemListElement.length).toBeGreaterThanOrEqual(4);
    expect(nav.itemListElement.some((item) => item['@type'] === 'SiteNavigationElement' && item.url.includes('/docs'))).toBe(true);
  });
});

describe('Docs JSON-LD Schemas', () => {
  it('should generate valid Docs Hub and Article schemas in envelope graph', () => {
    const hubEnvelope = getDocsHubJsonLd({
      locale: 'en',
      prefix: '',
      hubUrl: 'https://swaya.xyz/docs',
      fullTitle: 'SWAYA Documentation',
      description: 'Official guides',
      breadcrumbHome: 'Home',
      breadcrumbDocs: 'Docs',
      allDocs: [{ slug: 'organizer', title: 'Organizer Guide' }],
    });

    const hubGraph = hubEnvelope['site-jsonld']['@graph'];
    const collectionPage = hubGraph.find((s) => s['@type'] === 'CollectionPage');
    expect(collectionPage).toBeDefined();

    const breadcrumbs = hubGraph.find((s) => s['@type'] === 'BreadcrumbList');
    expect(breadcrumbs).toBeDefined();

    const articleEnvelope = getDocArticleJsonLd({
      locale: 'en',
      prefix: '',
      docUrl: 'https://swaya.xyz/docs/organizer',
      title: 'SWAYA Docs - Organizer',
      description: 'Learn batch file renaming',
      datePublished: '2026-08-15',
      dateModified: '2026-08-16',
      breadcrumbHome: 'Home',
      breadcrumbDocs: 'Docs',
    });

    const articleGraph = articleEnvelope['site-jsonld']['@graph'];
    const techArticle = articleGraph.find((s) => s['@type'] === 'TechArticle');
    expect(techArticle).toBeDefined();
    expect(techArticle.datePublished).toBe('2026-08-15');
    expect(techArticle.dateModified).toBe('2026-08-16');
    expect(techArticle.speakable).toBeDefined();
    expect(techArticle.publisher?.['@id']).toBe('https://swaya.xyz/#organization');

    // Test automatic per-slug date resolution from docDates.js and HowTo schema
    const autoDateEnvelope = getDocArticleJsonLd({
      locale: 'en',
      slug: 'organizer',
      docUrl: 'https://swaya.xyz/docs/organizer',
      title: 'Organizer Guide',
      description: 'Smart File Organizer',
    });
    const autoArticle = autoDateEnvelope['site-jsonld']['@graph'].find((s) => s['@type'] === 'TechArticle');
    expect(autoArticle.datePublished).toBe('2026-08-11');
    expect(autoArticle.dateModified).toBe('2026-08-21');
    expect(autoArticle.speakable).toBeDefined();
    expect(autoArticle.publisher).toBeDefined();

    const howTo = autoDateEnvelope['site-jsonld']['@graph'].find((s) => s['@type'] === 'HowTo');
    expect(howTo).toBeDefined();
    expect(howTo.name).toBe('How to Automatically Batch Rename and Organize Media Files on Disk');
    expect(Array.isArray(howTo.step)).toBe(true);
    expect(howTo.step.length).toBe(4);
    expect(howTo.step[0]['@type']).toBe('HowToStep');
    expect(howTo.step[0].name).toBe('Select Incoming Media Folder');

    // Test localized HowTo in Hungarian
    const huEnvelope = getDocArticleJsonLd({
      locale: 'hu',
      slug: 'organizer',
      docUrl: 'https://swaya.xyz/hu/docs/organizer',
      title: 'Okos Fájlrendező',
      description: 'Automatikus párosítás és átnevezés',
    });
    const huHowTo = huEnvelope['site-jsonld']['@graph'].find((s) => s['@type'] === 'HowTo');
    expect(huHowTo).toBeDefined();
    expect(huHowTo.name).toBe('Hogyan nevezz át és rendezz kötegelten médiafájlokat a merevlemezen');
    expect(huHowTo.step[0].name).toBe('Forrásmappa Kiválasztása');

    // Test localized HowTo in German
    const deEnvelope = getDocArticleJsonLd({
      locale: 'de',
      slug: 'player',
      docUrl: 'https://swaya.xyz/de/docs/player',
      title: 'Wiedergabe-Engine',
      description: 'MPV 4K Player',
    });
    const deHowTo = deEnvelope['site-jsonld']['@graph'].find((s) => s['@type'] === 'HowTo');
    expect(deHowTo).toBeDefined();
    expect(deHowTo.name).toBe('4K-HDR-Medien mit der MPV-Engine in SWAYA abspielen');

    // Test localized HowTo in all 7 new languages
    const newLocales = ['ko', 'nl', 'pl', 'zh-tw', 'sv', 'tr', 'cs'];
    newLocales.forEach((loc) => {
      const envelope = getDocArticleJsonLd({
        locale: loc,
        slug: 'organizer',
        docUrl: `https://swaya.xyz/${loc}/docs/organizer`,
        title: 'Organizer',
        description: 'Organizer Guide',
      });
      const howToSchema = envelope['site-jsonld']['@graph'].find((s) => s['@type'] === 'HowTo');
      expect(howToSchema).toBeDefined();
      expect(howToSchema.step.length).toBeGreaterThan(0);
    });
  });
});

describe('Changelog, Compare, and Help JSON-LD Schemas', () => {
  it('should generate valid Changelog schema in envelope graph', () => {
    const mockT = (k, opts) => opts?.defaultValue || k;
    const changelogEnvelope = getChangelogJsonLd({
      locale: 'hu',
      t: mockT,
      prefix: '/hu',
      changelogUrl: 'https://swaya.xyz/hu/changelog',
      latestRelease: { version: '1.0.0', date: '2026-08-15' },
    });
    const graph = changelogEnvelope['site-jsonld']['@graph'];
    const collection = graph.find((s) => s['@type'] === 'CollectionPage');
    expect(collection).toBeDefined();

    const software = graph.find((s) => s['@type'] === 'SoftwareApplication');
    expect(software.softwareVersion).toBe('1.0.0');
  });

  it('should generate valid Compare Hub and Detail schemas in envelope graph', () => {
    const hubEnvelope = getCompareHubJsonLd({
      locale: 'en',
      currentUrl: 'https://swaya.xyz/compare',
    });
    const hubGraph = hubEnvelope['compare-hub-jsonld']['@graph'];
    const collection = hubGraph.find((s) => s['@type'] === 'CollectionPage');
    expect(collection).toBeDefined();

    const itemList = hubGraph.find((s) => s['@type'] === 'ItemList' && s['@id']?.includes('#itemlist'));
    expect(itemList).toBeDefined();
    expect(itemList.itemListElement.length).toBeGreaterThanOrEqual(6);

    const detailEnvelope = getCompareJsonLd({
      comparison: {
        slug: 'filebot',
        name: 'FileBot',
        title: 'FileBot Alternative',
        metaDescription: 'Compare FileBot with SWAYA',
        faqs: [{ question: 'Q1', answer: 'A1' }],
      },
      locale: 'en',
      currentUrl: 'https://swaya.xyz/compare/filebot',
    });
    const detailGraph = detailEnvelope['compare-jsonld']['@graph'];
    const webpage = detailGraph.find((s) => s['@type'] === 'WebPage');
    expect(webpage).toBeDefined();
    const faq = detailGraph.find((s) => s['@type'] === 'FAQPage');
    expect(faq).toBeDefined();
  });

  it('should generate valid Help schema in envelope graph', () => {
    const mockT = (k, opts) => opts?.defaultValue || k;
    const helpEnvelope = getHelpJsonLd({
      locale: 'en',
      t: mockT,
      prefix: '',
      helpUrl: 'https://swaya.xyz/help',
    });
    const graph = helpEnvelope['site-jsonld']['@graph'];
    const contactPage = graph.find((s) => s['@type'] === 'ContactPage');
    expect(contactPage).toBeDefined();
  });
});
