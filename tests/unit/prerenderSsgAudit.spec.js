import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { VALID_LOCALES } from '../../src/site/data/localesConfig.js';

describe('SSG Prerender Output & SEO Audit', () => {
  const buildDir = path.resolve(process.cwd(), 'build');

  it('should verify that prerendered HTML files exist for all 17 locales', () => {
    // Check root index.html (EN)
    expect(fs.existsSync(path.join(buildDir, 'index.html'))).toBe(true);

    // Check non-default locale landing pages
    VALID_LOCALES.filter((l) => l !== 'en').forEach((locale) => {
      const localeIndexPath = path.join(buildDir, locale, 'index.html');
      expect(fs.existsSync(localeIndexPath), `Missing prerendered landing page for [${locale}]`).toBe(true);
    });
  });

  it('should ensure valid SEO tags, hreflang alternates, and JSON-LD in prerendered HTML', () => {
    const rootHtml = fs.readFileSync(path.join(buildDir, 'index.html'), 'utf8');

    expect(rootHtml).toContain('<title>');
    expect(rootHtml).toContain('<meta name="description"');
    expect(rootHtml).toContain('<link rel="canonical"');
    expect(rootHtml).toContain('type="application/ld+json"');
    expect(rootHtml).toContain('<meta name="twitter:site" content="@swaya_official" />');
    expect(rootHtml).toContain('<meta name="twitter:creator" content="@swaya_official" />');
    expect(rootHtml).toContain('<noscript>');

    // Hreflang checks
    VALID_LOCALES.forEach((locale) => {
      expect(rootHtml).toContain(`hreflang="${locale}"`);
    });
    expect(rootHtml).toContain('hreflang="x-default"');
  });

  it('should verify sitemap.xml exists and contains entries for all localized pages', () => {
    const sitemapPath = path.join(buildDir, 'sitemap.xml');
    expect(fs.existsSync(sitemapPath)).toBe(true);

    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    expect(sitemapContent).toContain('<urlset');
    expect(sitemapContent).toContain('https://swaya.xyz/');
    expect(sitemapContent).toContain('https://swaya.xyz/docs');
    expect(sitemapContent).toContain('https://swaya.xyz/changelog');
    expect(sitemapContent).toContain('https://swaya.xyz/help');
    expect(sitemapContent).toContain('https://swaya.xyz/compare');
  });

  it('should verify that Content-Security-Policy is synchronized and allows media/img streaming', () => {
    const indexHtml = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf8');
    const headersFile = fs.readFileSync(path.resolve(process.cwd(), 'public/_headers'), 'utf8');
    const vercelJson = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'vercel.json'), 'utf8'));
    const netlifyToml = fs.readFileSync(path.resolve(process.cwd(), 'netlify.toml'), 'utf8');

    const expectedMediaSrc = "media-src 'self' blob: data: https://swaya.xyz;";
    const expectedImgSrc = "https://swaya.xyz";

    expect(indexHtml).toContain(expectedMediaSrc);
    expect(indexHtml).toContain(expectedImgSrc);

    expect(headersFile).toContain(expectedMediaSrc);
    expect(headersFile).toContain(expectedImgSrc);

    const vercelCsp = vercelJson.headers[0].headers.find((h) => h.key === 'Content-Security-Policy')?.value;
    expect(vercelCsp).toContain(expectedMediaSrc);
    expect(vercelCsp).toContain(expectedImgSrc);

    expect(netlifyToml).toContain(expectedMediaSrc);
    expect(netlifyToml).toContain(expectedImgSrc);
  });

  it('should verify that all prerendered pages have valid Schema.org root JSON-LD without envelope keys', () => {
    const sampleFiles = [
      'index.html',
      'hu/index.html',
      'docs/index.html',
      'docs/organizer/index.html',
      'compare/index.html',
      'compare/filebot/index.html',
      'hu/compare/filebot/index.html',
      'changelog/index.html',
      'help/index.html',
      'privacy/index.html',
      'terms/index.html',
    ];

    sampleFiles.forEach((relPath) => {
      const filePath = path.join(buildDir, relPath);
      expect(fs.existsSync(filePath), `File ${relPath} should exist`).toBe(true);

      const html = fs.readFileSync(filePath, 'utf8');
      const match = html.match(/<script id="site-jsonld" type="application\/ld\+json">([\s\S]*?)<\/script>/i);
      expect(match, `File ${relPath} should have a site-jsonld script`).toBeTruthy();

      const parsed = JSON.parse(match[1]);
      expect(parsed['@context'], `File ${relPath} must have root @context`).toBe('https://schema.org');
      expect(Array.isArray(parsed['@graph']) || parsed['@type'], `File ${relPath} must have @graph or @type`).toBeTruthy();

      // Ensure no envelope keys leaked into root JSON-LD
      expect(parsed['compare-jsonld']).toBeUndefined();
      expect(parsed['compare-hub-jsonld']).toBeUndefined();
      expect(parsed['privacy-jsonld']).toBeUndefined();
      expect(parsed['terms-jsonld']).toBeUndefined();
      expect(parsed['site-jsonld']).toBeUndefined();
    });
  });

  it('should verify genuine HTTP 404 configuration and scoped SPA rewrites', () => {
    // 1. Verify 404.html fallback
    const notFoundPath = path.join(buildDir, '404.html');
    expect(fs.existsSync(notFoundPath), '404.html must exist in build directory').toBe(true);

    const notFoundHtml = fs.readFileSync(notFoundPath, 'utf8');
    expect(notFoundHtml).toContain('<title>404 - Page Not Found | SWAYA</title>');
    expect(notFoundHtml).toContain('<meta name="robots" content="noindex, follow" />');
    expect(notFoundHtml).not.toContain('<link rel="canonical"');

    // 2. Verify _redirects does not have catch-all soft-404 rewrite
    const redirectsContent = fs.readFileSync(path.resolve(process.cwd(), 'public/_redirects'), 'utf8');
    expect(redirectsContent).not.toMatch(/^\s*\/\*\s+\/index\.html\s+200\s*$/m);
    expect(redirectsContent).toContain('/dashboard/* /index.html 200');
    expect(redirectsContent).toContain('/:lang/dashboard/* /index.html 200');

    // 3. Verify vercel.json rewrites are scoped to demo app routes
    const vercelJson = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'vercel.json'), 'utf8'));
    const catchAllRewrite = vercelJson.rewrites?.find((r) => r.source === '/((?!assets/|.*\\..*).*)');
    expect(catchAllRewrite).toBeUndefined();
    expect(vercelJson.rewrites?.some((r) => r.source.includes('dashboard'))).toBe(true);
  });

  it('should verify that all prerendered pages have matching page-specific og:image, og:image:alt, and twitter:image tags', () => {
    const testCases = [
      { file: 'compare/index.html', titleContains: 'SWAYA Comparisons', imageContains: '/og/compare-hub.jpg' },
      { file: 'compare/filebot/index.html', titleContains: 'FileBot', imageContains: '/og/compare-filebot.jpg' },
      { file: 'privacy/index.html', titleContains: 'Privacy Policy', imageContains: '/og/privacy.jpg' },
      { file: 'terms/index.html', titleContains: 'Terms of Service', imageContains: '/og/terms.jpg' },
      { file: 'changelog/index.html', titleContains: 'Changelog', imageContains: '/og/changelog.jpg' },
      { file: 'help/index.html', titleContains: 'Help', imageContains: '/og/help.jpg' },
      { file: 'docs/index.html', titleContains: 'SWAYA Documentation' },
      { file: 'docs/organizer/index.html', titleContains: 'Smart File Organizer', imageContains: '/og/docs-organizer.jpg' },
    ];

    testCases.forEach(({ file, titleContains, imageContains }) => {
      const filePath = path.join(buildDir, file);
      expect(fs.existsSync(filePath), `File ${file} should exist`).toBe(true);

      const html = fs.readFileSync(filePath, 'utf8');
      const ogAltMatch = html.match(/<meta property="og:image:alt" content="([^"]+)"/i);
      const twitterAltMatch = html.match(/<meta name="twitter:image:alt" content="([^"]+)"/i);
      const ogImageMatch = html.match(/<meta property="og:image" content="([^"]+)"/i);
      const twitterImageMatch = html.match(/<meta name="twitter:image" content="([^"]+)"/i);

      expect(ogAltMatch, `${file} should have og:image:alt`).toBeTruthy();
      expect(twitterAltMatch, `${file} should have twitter:image:alt`).toBeTruthy();
      expect(ogAltMatch[1]).toContain(titleContains);
      expect(twitterAltMatch[1]).toContain(titleContains);

      if (imageContains) {
        expect(ogImageMatch, `${file} should have og:image`).toBeTruthy();
        expect(twitterImageMatch, `${file} should have twitter:image`).toBeTruthy();
        expect(ogImageMatch[1]).toContain(imageContains);
        expect(twitterImageMatch[1]).toContain(imageContains);
      }
    });
  });

  it('should verify RSS feed.xml exists and is valid RSS 2.0 with changelog release items', () => {
    const feedPath = path.join(buildDir, 'feed.xml');
    expect(fs.existsSync(feedPath), 'feed.xml must exist in build directory').toBe(true);

    const feedContent = fs.readFileSync(feedPath, 'utf8');
    expect(feedContent).toContain('<rss version="2.0"');
    expect(feedContent).toContain('<channel>');
    expect(feedContent).toContain('<title>SWAYA Changelog &amp; Release Notes</title>');
    expect(feedContent).toContain('https://swaya.xyz/changelog');
    expect(feedContent).toContain('<item>');
    expect(feedContent).toContain('<guid isPermaLink="true">');
    expect(feedContent).toContain('<pubDate>');
    expect(feedContent).toContain('<image>');
    expect(feedContent).toContain('https://swaya.xyz/og-image.jpg');

    // Check index.html head has RSS link
    const indexHtml = fs.readFileSync(path.join(buildDir, 'index.html'), 'utf8');
    expect(indexHtml).toContain('type="application/rss+xml"');
    expect(indexHtml).toContain('href="https://swaya.xyz/feed.xml"');
  });

  it('should verify llms.txt and llms-full.txt include multi-language hubs and endpoints', () => {
    const llmsPath = path.join(buildDir, 'llms.txt');
    const llmsFullPath = path.join(buildDir, 'llms-full.txt');

    expect(fs.existsSync(llmsPath), 'llms.txt must exist in build directory').toBe(true);
    expect(fs.existsSync(llmsFullPath), 'llms-full.txt must exist in build directory').toBe(true);

    const llmsContent = fs.readFileSync(llmsPath, 'utf8');
    const llmsFullContent = fs.readFileSync(llmsFullPath, 'utf8');

    VALID_LOCALES.forEach((locale) => {
      const expectedDocUrl = locale === 'en' ? 'https://swaya.xyz/docs' : `https://swaya.xyz/${locale}/docs`;
      expect(llmsContent).toContain(expectedDocUrl);
      expect(llmsFullContent).toContain(expectedDocUrl);
    });
  });
});

