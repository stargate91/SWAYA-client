import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.resolve(__dirname, '../public');
const FAVICON_DIR = path.resolve(PUBLIC_DIR, 'favicon');

const svgContent = `<svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="swayaMarkBg" x1="36" y1="24" x2="220" y2="232" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#0E1628"/>
      <stop offset="1" stop-color="#182742"/>
    </linearGradient>
    <linearGradient id="swayaMarkAccent" x1="83" y1="53" x2="176" y2="202" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#77C4FF"/>
      <stop offset="0.52" stop-color="#4FA8FF"/>
      <stop offset="1" stop-color="#2383F6"/>
    </linearGradient>
    <filter id="swayaMarkGlow" x="33" y="28" width="188" height="200" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feGaussianBlur stdDeviation="10" result="effect1_foregroundBlur_1_1"/>
    </filter>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Sora:wght@800&amp;display=swap');
      .swaya-mark__glyph {
        font-family: 'Sora', sans-serif;
        font-size: 154px;
        font-style: normal;
        font-weight: 800;
        letter-spacing: -0.08em;
      }
    </style>
  </defs>

  <rect x="12" y="12" width="232" height="232" rx="60" fill="url(#swayaMarkBg)"/>
  <rect x="12.75" y="12.75" width="230.5" height="230.5" rx="59.25" stroke="#314764" stroke-opacity="0.72" stroke-width="1.5"/>
  <g filter="url(#swayaMarkGlow)">
    <text x="128" y="181" text-anchor="middle" class="swaya-mark__glyph" fill="url(#swayaMarkAccent)">S</text>
  </g>
  <text x="128" y="181" text-anchor="middle" class="swaya-mark__glyph" fill="url(#swayaMarkAccent)">S</text>
</svg>`;



async function buildAllAssets() {
  console.log('🚀 Generating minimal social banner with canonical vector logo...');
  fs.mkdirSync(FAVICON_DIR, { recursive: true });

  const browser = await chromium.launch();

  // 1. Generate 1200x630 Minimal Social Banner
  const bannerPage = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 2,
  });


  const bannerHtml = `<!DOCTYPE html>
<html>
<head>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1200px;
      height: 630px;
      overflow: hidden;
      background: #080a0f;
      background: radial-gradient(ellipse at 50% 45%, #0f172a 0%, #080a0f 70%, #030407 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .ambient-light {
      position: absolute;
      width: 480px;
      height: 480px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, rgba(14, 165, 233, 0.03) 55%, transparent 75%);
      filter: blur(45px);
      pointer-events: none;
    }
    .wrapper {
      position: relative;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 32px;
    }
    .logo-frame {
      width: 210px;
      height: 210px;
      display: flex;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(0 16px 36px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 24px rgba(56, 189, 248, 0.2));
    }
    .logo-frame svg {
      width: 100%;
      height: 100%;
      display: block;
    }
    .brand-title {
      font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif;
      font-size: 34px;
      font-weight: 800;
      letter-spacing: 0.4em;
      text-indent: 0.4em;
      color: #ffffff;
      text-transform: uppercase;
      opacity: 0.98;
      text-shadow: 0 4px 20px rgba(0, 0, 0, 0.9);
    }
  </style>
</head>
<body>
  <div class="ambient-light"></div>
  <div class="wrapper">
    <div class="logo-frame">
      ${svgContent}
    </div>
    <div class="brand-title">SWAYA</div>
  </div>
</body>
</html>`;

  await bannerPage.setContent(bannerHtml);
  const ogPath = path.join(PUBLIC_DIR, 'og-image.jpg');
  await bannerPage.screenshot({ path: ogPath, type: 'jpeg', quality: 95 });
  console.log(`✓ Generated minimal banner: public/og-image.jpg`);

  await browser.close();
  console.log('✨ All vector assets & favicons successfully created!');
}

buildAllAssets().catch(console.error);
