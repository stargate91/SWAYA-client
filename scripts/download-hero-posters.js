import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.resolve(__dirname, '../public/images/hero');

const POSTERS = [
  // Column 1
  { name: 'dune-2', url: 'https://image.tmdb.org/t/p/w780/6izwz7rsy95ARzTR3poZ8H6c5pp.jpg', title: 'Dune 2' },
  { name: 'oppenheimer', url: 'https://image.tmdb.org/t/p/w780/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', title: 'Oppenheimer' },
  { name: 'arcane', url: 'https://image.tmdb.org/t/p/w780/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg', title: 'Arcane' },
  { name: 'pulp-fiction', url: 'https://image.tmdb.org/t/p/w780/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg', title: 'Pulp Fiction' },

  // Column 2
  { name: 'blade-runner-2049', url: 'https://image.tmdb.org/t/p/w780/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg', title: 'Blade Runner 2049' },
  { name: 'interstellar', url: 'https://image.tmdb.org/t/p/w780/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', title: 'Interstellar' },
  { name: 'the-matrix', url: 'https://image.tmdb.org/t/p/w780/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg', title: 'The Matrix' },
  { name: 'the-batman', url: 'https://image.tmdb.org/t/p/w780/74xTEgt7R36Fpooo50r9T25onhq.jpg', title: 'The Batman' },

  // Column 3
  { name: 'inception', url: 'https://image.tmdb.org/t/p/w780/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg', title: 'Inception' },
  { name: 'spider-verse', url: 'https://image.tmdb.org/t/p/w780/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg', title: 'Spider-Verse' },
  { name: 'the-dark-knight', url: 'https://image.tmdb.org/t/p/w780/qJ2tW6WMUDux911r6m7haRef0WH.jpg', title: 'The Dark Knight' },
  { name: 'matrix-reloaded', url: 'https://image.tmdb.org/t/p/w780/dXNAPwY7VrqMAo51EKhhCJfaGb5.jpg', title: 'Matrix Reloaded' },

  // Column 4
  { name: 'the-last-of-us', url: 'https://image.tmdb.org/t/p/w780/dmo6TYuuJgaYinXBPjrgG9mB5od.jpg', title: 'The Last of Us' },
  { name: 'breaking-bad', url: 'https://image.tmdb.org/t/p/w780/anFx9aTOOYqgS3v7x3R84Kz67ly.jpg', title: 'Breaking Bad' },
  { name: 'gladiator', url: 'https://image.tmdb.org/t/p/w780/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg', title: 'Gladiator' },
  { name: 'top-gun-maverick', url: 'https://image.tmdb.org/t/p/w780/62HCnUTziyWcpDaBO2i1DX17ljH.jpg', title: 'Top Gun Maverick' },

  // Column 5
  { name: 'alien', url: 'https://image.tmdb.org/t/p/w780/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg', title: 'Alien' },
  { name: 'dune-1', url: 'https://image.tmdb.org/t/p/w780/d5NXSklXo0qyIYkgV94XAgMIckC.jpg', title: 'Dune 1' },
  { name: 'lotr-return-of-the-king', url: 'https://image.tmdb.org/t/p/w780/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg', title: 'LOTR Return of the King' },
  { name: 'shawshank-redemption', url: 'https://image.tmdb.org/t/p/w780/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg', title: 'Shawshank Redemption' },
];

async function downloadAndConvertPosters() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(`Starting download and 700px WebP conversion of ${POSTERS.length} hero posters...`);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 700, height: 1050 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  let successCount = 0;

  for (let i = 0; i < POSTERS.length; i++) {
    const poster = POSTERS[i];
    const outputPath = path.join(OUTPUT_DIR, `${poster.name}.webp`);

    console.log(`[${i + 1}/${POSTERS.length}] Processing ${poster.title} (${poster.url})...`);

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            html, body { width: 700px; height: 1050px; overflow: hidden; background: #000; }
            img { width: 700px; height: 1050px; object-fit: cover; display: block; }
          </style>
        </head>
        <body>
          <img id="poster" src="${poster.url}" alt="${poster.title}" crossorigin="anonymous" />
        </body>
      </html>
    `;

    try {
      await page.setContent(htmlContent, { waitUntil: 'load' });
      await page.waitForSelector('#poster');
      await page.evaluate(async () => {
        const img = document.getElementById('poster');
        if (!img.complete) {
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          });
        }
      });

      // Export as high-quality, lightweight WebP (700x1050)
      const buffer = await page.screenshot({
        type: 'webp',
        quality: 85,
        clip: { x: 0, y: 0, width: 700, height: 1050 },
      });

      fs.writeFileSync(outputPath, buffer);
      const stats = fs.statSync(outputPath);
      console.log(`  ✓ Saved ${poster.name}.webp (${Math.round(stats.size / 1024)} KB)`);
      successCount++;
    } catch (err) {
      console.error(`  ✗ Failed to process ${poster.title}:`, err.message);
    }
  }

  await browser.close();
  console.log(`✨ Successfully generated ${successCount}/${POSTERS.length} 700px WebP hero posters in ${OUTPUT_DIR}`);
}

downloadAndConvertPosters().catch((err) => {
  console.error('Fatal error during poster generation:', err);
  process.exit(1);
});
