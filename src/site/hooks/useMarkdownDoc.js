import { useState, useMemo, useEffect, useCallback } from 'react';
import { 
  compileMarkdown, 
  stripLeadingH1, 
  preprocessAlerts 
} from '../lib/markdownCompiler';

export { stripLeadingH1, preprocessAlerts, compileMarkdown };

/**
 * Hook compiling markdown guide content to HTML, extracting heading structures, and providing code block copy handlers.
 * @param {object} options
 * @param {string} options.content - Raw markdown string
 * @param {Function} [options.onHeadingsExtracted] - Callback receiving parsed headings
 * @returns {{
 *   html: string,
 *   headings: Array<{ id: string, text: string, level: number }>,
 *   copiedCode: string|null,
 *   handleCopy: (text: string, id: string) => void
 * }}
 */
export function useMarkdownDoc({ content, onHeadingsExtracted }) {
  const [copiedCode, setCopiedCode] = useState(null);

  const { html, headings } = useMemo(() => {
    return compileMarkdown(content);
  }, [content]);

  useEffect(() => {
    if (onHeadingsExtracted) {
      onHeadingsExtracted(headings);
    }
  }, [headings, onHeadingsExtracted]);

  const handleCopy = useCallback((text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  }, []);

  return {
    html,
    headings,
    copiedCode,
    handleCopy,
  };
}

export default useMarkdownDoc;
