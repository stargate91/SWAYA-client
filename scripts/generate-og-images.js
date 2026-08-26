import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { DOC_METADATA } from './prerender/constants.js';
import { COMPARISONS_LIST } from '../src/site/data/comparisonsData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OG_OUTPUT_DIR = path.resolve(__dirname, '../public/og');

const CARDS = [
  ...Object.entries(DOC_METADATA).map(([slug, meta]) => ({
    fileName: `docs-${slug}.jpg`,
    tag: meta.category || 'Documentation',
    title: meta.title,
    description: meta.description,
    type: 'Documentation Guide',
  })),
  {
    fileName: 'changelog.jpg',
    tag: 'Release History',
    title: 'SWAYA Release Notes & Changelog',
    description: 'Track all updates, new features, performance improvements, and bug fixes for the SWAYA desktop offline media workstation.',
    type: 'Changelog',
  },
  {
    fileName: 'help.jpg',
    tag: 'Help & Support',
    title: 'SWAYA Help & Customer Support',
    description: 'Get help with SWAYA, join our Discord community for live chat, or browse our documentation guides.',
    type: 'Help',
  },
  {
    fileName: 'privacy.jpg',
    tag: 'Privacy & Security',
    title: 'SWAYA Privacy Policy',
    description: '100% offline data processing with zero telemetry, no user tracking, and complete personal privacy on Windows.',
    type: 'Legal',
  },
  {
    fileName: 'terms.jpg',
    tag: 'Terms & Licensing',
    title: 'SWAYA Terms of Service & Refund Policy',
    description: 'Perpetual personal software license with 14-day money-back guarantee and lifetime version updates.',
    type: 'Legal',
  },
  {
    fileName: 'compare-hub.jpg',
    tag: 'Software Alternatives',
    title: 'SWAYA Comparisons & Alternatives',
    description: 'Compare SWAYA against FileBot, Plex, tinyMediaManager, StashApp, Jellyfin, and Kodi. Find the right offline media center for Windows.',
    type: 'Comparison Hub',
  },
  ...COMPARISONS_LIST.map((comp) => ({
    fileName: `compare-${comp.slug}.jpg`,
    tag: comp.badge || `SWAYA vs ${comp.name}`,
    title: comp.title || `SWAYA vs ${comp.name}`,
    description: comp.heroTagline || comp.metaDescription,
    type: 'Comparison',
  })),
];

function generateHtmlCard({ tag, title, description }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      width: 1200px;
      height: 630px;
      overflow: hidden;
      background-color: #0c0f17;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #f8fafc;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 70px 80px;
      position: relative;
    }
    .glow-1 {
      position: absolute;
      top: -120px;
      right: -100px;
      width: 550px;
      height: 550px;
      background: radial-gradient(circle, rgba(56, 189, 248, 0.18) 0%, rgba(14, 165, 233, 0.05) 50%, transparent 70%);
      pointer-events: none;
    }
    .glow-2 {
      position: absolute;
      bottom: -150px;
      left: 100px;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%);
      pointer-events: none;
    }
    .card-border {
      position: absolute;
      top: 24px;
      left: 24px;
      right: 24px;
      bottom: 24px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 20px;
      pointer-events: none;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 2;
    }
    .brand-group {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .logo-badge {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: linear-gradient(135deg, #0284c7, #38bdf8);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 900;
      font-size: 24px;
      color: #ffffff;
      box-shadow: 0 0 25px rgba(56, 189, 248, 0.4);
    }
    .brand-name {
      font-size: 28px;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: #ffffff;
    }
    .brand-sub {
      font-size: 14px;
      color: #94a3b8;
      margin-left: 4px;
      font-weight: 500;
    }
    .tag-badge {
      background: rgba(56, 189, 248, 0.12);
      border: 1px solid rgba(56, 189, 248, 0.3);
      color: #38bdf8;
      font-size: 15px;
      font-weight: 700;
      padding: 8px 18px;
      border-radius: 9999px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .main-content {
      z-index: 2;
      max-width: 980px;
      margin-top: 10px;
    }
    .title {
      font-size: 52px;
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -1px;
      color: #ffffff;
      margin-bottom: 20px;
    }
    .description {
      font-size: 24px;
      line-height: 1.45;
      color: #94a3b8;
      max-width: 900px;
    }
    .footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 2;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 24px;
    }
    .footer-left {
      font-size: 16px;
      color: #64748b;
      font-weight: 500;
    }
    .footer-highlight {
      color: #e2e8f0;
      font-weight: 600;
    }
    .footer-url {
      font-size: 18px;
      font-weight: 700;
      color: #38bdf8;
      letter-spacing: 0.2px;
    }
  </style>
</head>
<body>
  <div class="glow-1"></div>
  <div class="glow-2"></div>
  <div class="card-border"></div>

  <div class="header">
    <div class="brand-group">
      <div class="logo-badge">S</div>
      <div>
        <span class="brand-name">SWAYA</span>
        <span class="brand-sub">Offline Media Workstation</span>
      </div>
    </div>
    <div class="tag-badge">${tag}</div>
  </div>

  <div class="main-content">
    <h1 class="title">${title}</h1>
    <p class="description">${description}</p>
  </div>

  <div class="footer">
    <div class="footer-left">
      <span class="footer-highlight">SWAYA for Windows</span> • 100% Offline Privacy • Built-in MPV
    </div>
    <div class="footer-url">swaya.xyz</div>
  </div>
</body>
</html>`;
}

async function generateAllOgImages() {
  fs.mkdirSync(OG_OUTPUT_DIR, { recursive: true });
  console.log(`🎨 Generating ${CARDS.length} OpenGraph 1200x630 preview images...`);

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });

  for (const card of CARDS) {
    const html = generateHtmlCard(card);
    await page.setContent(html, { waitUntil: 'load' });
    const targetPath = path.join(OG_OUTPUT_DIR, card.fileName);
    await page.screenshot({
      path: targetPath,
      type: 'jpeg',
      quality: 90,
    });
    console.log(`✓ Created: public/og/${card.fileName}`);
  }

  await browser.close();
  console.log('✨ All OpenGraph images successfully created in public/og/');
}

generateAllOgImages().catch((err) => {
  console.error('Error generating OG images:', err);
  process.exit(1);
});
