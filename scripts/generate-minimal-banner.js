import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.resolve(__dirname, '../public');
const ARTIFACT_DIR = path.resolve(
  process.env.USERPROFILE || 'C:\\Users\\Levi',
  '.gemini/antigravity-ide/brain/2266a9e4-17fa-441e-a226-75f75fead2ea'
);

// High precision, minimalist, modern geometric 'S' monogram
// Dominant Swaya Electric Blue (#38bdf8, #0ea5e9, #2563eb) with crisp White accents (#ffffff)
const newMinimalSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
  <defs>
    <!-- Primary Swaya Electric Blue Gradient -->
    <linearGradient id="swaya-blue-main" x1="120" y1="90" x2="390" y2="420" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="50%" stop-color="#0ea5e9" />
      <stop offset="100%" stop-color="#2563eb" />
    </linearGradient>

    <!-- Deep Blue Shadow Gradient for overlapping ribbon fold -->
    <linearGradient id="swaya-blue-dark" x1="200" y1="200" x2="320" y2="320" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0284c7" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>

    <!-- Crisp White-Cyan Edge Highlight Gradient -->
    <linearGradient id="swaya-white-highlight" x1="140" y1="100" x2="380" y2="180" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="1" />
      <stop offset="60%" stop-color="#bae6fd" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.2" />
    </linearGradient>

    <!-- Bottom White Accent Gradient -->
    <linearGradient id="swaya-white-accent-bottom" x1="380" y1="410" x2="140" y2="330" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
      <stop offset="50%" stop-color="#7dd3fc" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#0284c7" stop-opacity="0.1" />
    </linearGradient>

    <!-- Subtle Soft Drop Shadow -->
    <filter id="swaya-subtle-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#0369a1" flood-opacity="0.28" />
    </filter>
  </defs>

  <!-- Clean, Iconic Geometric 'S' Monogram -->
  <g filter="url(#swaya-subtle-shadow)">
    <!-- Upper Sweeping Wing / Loop -->
    <path
      d="M 370 125 C 370 125 210 125 180 125 C 135 125 110 160 110 205 C 110 250 145 275 200 295 L 310 335 C 345 350 365 370 365 400 C 365 440 330 465 285 465 L 140 465"
      stroke="url(#swaya-blue-main)"
      stroke-width="54"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <!-- Inner Crisp White Top Accent Line -->
    <path
      d="M 355 125 L 180 125 C 145 125 125 150 125 185 C 125 218 150 240 190 255 L 260 280"
      stroke="url(#swaya-white-highlight)"
      stroke-width="12"
      stroke-linecap="round"
      stroke-linejoin="round"
      opacity="0.95"
    />

    <!-- Inner Crisp White Bottom Accent Line -->
    <path
      d="M 155 465 L 285 465 C 320 465 348 445 348 410 C 348 380 330 362 295 348 L 245 330"
      stroke="url(#swaya-white-accent-bottom)"
      stroke-width="12"
      stroke-linecap="round"
      stroke-linejoin="round"
      opacity="0.9"
    />

    <!-- Pure White Geometric Center Core Spark / Accent Vertex -->
    <circle cx="256" cy="295" r="7" fill="#ffffff" />
  </g>
</svg>`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'swaya-logo.svg'), newMinimalSvg);
fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.svg'), newMinimalSvg);
console.log('✓ Updated public/swaya-logo.svg and public/favicon.svg');

function generateBannerHtml() {
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
      background-color: #080a0f;
      background-image: 
        radial-gradient(ellipse at 50% 45%, #0f172a 0%, #080a0f 70%, #030407 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    /* Minimal ultra-subtle vignette */
    .overlay-glow {
      position: absolute;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, rgba(14, 165, 233, 0.02) 50%, transparent 75%);
      filter: blur(50px);
      pointer-events: none;
    }

    .brand-group {
      position: relative;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 32px;
    }

    .logo-wrapper {
      width: 210px;
      height: 210px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .logo-wrapper svg {
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
  <div class="overlay-glow"></div>
  <div class="brand-group">
    <div class="logo-wrapper">
      ${newMinimalSvg}
    </div>
    <div class="brand-title">SWAYA</div>
  </div>
</body>
</html>`;
}

async function render() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 2,
  });

  const html = generateBannerHtml();
  await page.setContent(html, { waitUntil: 'load' });

  const ogPath = path.join(PUBLIC_DIR, 'og-image.jpg');
  await page.screenshot({
    path: ogPath,
    type: 'jpeg',
    quality: 95,
  });
  console.log(`✓ Generated ${ogPath}`);

  if (fs.existsSync(ARTIFACT_DIR)) {
    const artPath = path.join(ARTIFACT_DIR, 'banner-minimal.jpg');
    fs.copyFileSync(ogPath, artPath);
    console.log(`✓ Copied to artifact ${artPath}`);
  }

  await browser.close();
}

render().catch(console.error);
