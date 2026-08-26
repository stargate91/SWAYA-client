import fs from 'node:fs';
import path from 'node:path';
import { BASE_URL, BUILD_DIR, PUBLIC_DIR } from './constants.js';
import { CHANGELOG_RELEASES } from '../../src/site/data/changelogConfig.js';

function escapeXml(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateRssFeed() {
  const latestRelease = CHANGELOG_RELEASES[0];
  const lastBuildDate = latestRelease?.date
    ? new Date(latestRelease.date).toUTCString()
    : new Date().toUTCString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n`;
  xml += `  <channel>\n`;
  xml += `    <title>SWAYA Changelog &amp; Release Notes</title>\n`;
  xml += `    <link>${BASE_URL}/changelog</link>\n`;
  xml += `    <description>Track updates, new features, performance improvements, and bug fixes for the SWAYA desktop media center &amp; video player.</description>\n`;
  xml += `    <language>en-us</language>\n`;
  xml += `    <lastBuildDate>${lastBuildDate}</lastBuildDate>\n`;
  xml += `    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />\n`;
  xml += `    <image>\n`;
  xml += `      <url>${BASE_URL}/og-image.jpg</url>\n`;
  xml += `      <title>SWAYA Changelog &amp; Release Notes</title>\n`;
  xml += `      <link>${BASE_URL}/changelog</link>\n`;
  xml += `      <width>144</width>\n`;
  xml += `      <height>144</height>\n`;
  xml += `    </image>\n`;

  for (const rel of CHANGELOG_RELEASES) {
    const itemTitle = `SWAYA v${rel.version} - ${rel.title}`;
    const itemLink = `${BASE_URL}/changelog#v${rel.version.replaceAll('.', '_')}`;
    const pubDate = rel.date ? new Date(rel.date).toUTCString() : lastBuildDate;

    let contentHtml = `<p>${rel.description}</p>`;
    if (rel.highlights && rel.highlights.length > 0) {
      contentHtml += `<h3>Key Highlights</h3><ul>`;
      rel.highlights.forEach((h) => {
        contentHtml += `<li>${h}</li>`;
      });
      contentHtml += `</ul>`;
    }

    if (rel.sections && rel.sections.length > 0) {
      rel.sections.forEach((sec) => {
        contentHtml += `<h4>${sec.title}</h4><ul>`;
        sec.items.forEach((it) => {
          contentHtml += `<li>${it}</li>`;
        });
        contentHtml += `</ul>`;
      });
    }

    xml += `    <item>\n`;
    xml += `      <title>${escapeXml(itemTitle)}</title>\n`;
    xml += `      <link>${itemLink}</link>\n`;
    xml += `      <guid isPermaLink="true">${itemLink}</guid>\n`;
    xml += `      <pubDate>${pubDate}</pubDate>\n`;
    xml += `      <description><![CDATA[${contentHtml}]]></description>\n`;
    xml += `    </item>\n`;
  }

  xml += `  </channel>\n`;
  xml += `</rss>\n`;

  if (fs.existsSync(BUILD_DIR)) {
    fs.writeFileSync(path.join(BUILD_DIR, 'feed.xml'), xml, 'utf-8');
  }
  if (fs.existsSync(PUBLIC_DIR)) {
    fs.writeFileSync(path.join(PUBLIC_DIR, 'feed.xml'), xml, 'utf-8');
  }

  console.log('✓ Generated RSS 2.0 feed.xml for changelog and release syndication');
}
