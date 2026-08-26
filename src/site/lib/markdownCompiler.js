import { marked } from 'marked';
import {
  stripLeadingH1,
  preprocessAlerts,
  slugifyHeading,
  extractHeadings,
} from './markdownHeadingExtractor.js';


export {
  stripLeadingH1,
  preprocessAlerts,
  slugifyHeading,
  extractHeadings,
};

// Configure marked options
marked.setOptions({
  gfm: true,
  breaks: false,
});

/**
 * Compiles markdown to semantic HTML with slugified heading anchors and TOC metadata.
 * @param {string} markdown
 * @returns {{ html: string, headings: Array<{ id: string, text: string, level: number }> }}
 */
export function compileMarkdown(markdown) {
  if (!markdown) return { html: '', headings: [] };

  const headingList = [];
  const stripped = stripLeadingH1(markdown);
  const processed = preprocessAlerts(stripped);

  const renderer = new marked.Renderer();

  // Custom heading renderer to extract anchors and guarantee no duplicate H1
  renderer.heading = function (arg1, arg2) {
    const text = typeof arg1 === 'object' && arg1 !== null ? (arg1.text || '') : (typeof arg1 === 'string' ? arg1 : '');
    const depth = typeof arg1 === 'object' && arg1 !== null ? (arg1.depth || 2) : (typeof arg2 === 'number' ? arg2 : 2);
    const headingDepth = depth === 1 ? 2 : depth;
    const plainText = typeof text === 'string' ? text.replace(/<[^>]*>/g, '').trim() : '';
    const slug = slugifyHeading(plainText);

    if (headingDepth === 2 || headingDepth === 3) {
      headingList.push({ id: slug, text: plainText, level: headingDepth });
    }

    return `<h${headingDepth} id="${slug}">${text}</h${headingDepth}>`;
  };

  try {
    const compiled = marked.parse(processed, { renderer });
    return { html: compiled, headings: headingList };
  } catch (err) {
    console.error('Error compiling markdown:', err);
    return { html: `<p>${markdown}</p>`, headings: [] };
  }
}

export default compileMarkdown;

