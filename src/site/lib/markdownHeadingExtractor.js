/**
 * Heading and slug extraction utilities for markdown compilation and Table of Contents (TOC).
 */

/**
 * Converts heading text to an accessible URL-safe anchor slug.
 * @param {string} text
 * @returns {string}
 */
export function slugifyHeading(text) {
  if (!text || typeof text !== 'string') return '';
  const plainText = text.replace(/<[^>]*>/g, '').trim();
  return plainText
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

/**
 * Strips leading # H1 title if present to preserve single H1 semantic hierarchy.
 * @param {string} markdown
 * @returns {string}
 */
export function stripLeadingH1(markdown) {
  if (!markdown) return '';
  return markdown.trimStart().replace(/^#\s+[^\r\n]+(?:\r?\n)*/, '');
}

/**
 * Preprocesses GitHub-style alerts (> [!NOTE], etc.)
 * @param {string} markdown
 * @returns {string}
 */
export function preprocessAlerts(markdown) {
  if (!markdown) return '';
  return markdown.replace(
    /^>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*\n((?:>.*\n?)*)/gim,
    (match, type, content) => {
      const cleanContent = content.replace(/^>\s?/gm, '').trim();
      const typeLower = type.toLowerCase();
      return `\n<div class="site-alert site-alert--${typeLower}" data-alert-type="${typeLower}">\n\n<strong>${type.toUpperCase()}</strong>\n\n${cleanContent}\n\n</div>\n`;
    }
  );
}

/**
 * Extracts H2 and H3 headings directly from markdown source without full HTML rendering.
 * @param {string} markdown
 * @returns {Array<{ id: string, text: string, level: number }>}
 */
export function extractHeadings(markdown) {
  if (!markdown) return [];

  const stripped = stripLeadingH1(markdown);
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(stripped)) !== null) {
    const level = match[1].length;
    const rawText = match[2].trim();
    const plainText = rawText.replace(/<[^>]*>/g, '').trim();
    const id = slugifyHeading(plainText);

    if (id) {
      headings.push({ id, text: plainText, level });
    }
  }

  return headings;
}
