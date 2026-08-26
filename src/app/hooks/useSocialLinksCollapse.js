import { useState, useMemo, useCallback } from 'react';

/**
 * Custom hook to manage partitioned display and collapse/expand state for social / external links.
 *
 * @param {Object} [params]
 * @param {Array} [params.socialLinks=[]] - Array of social links
 * @param {number} [params.maxVisible=4] - Number of links visible before collapsing
 * @param {boolean} [params.initialExpanded=false] - Initial expansion state
 * @param {Function} [params.t] - Optional translation function for toggle tooltip
 * @returns {Object} { hasLinks, hasExtra, mainLinks, extraLinks, isExpanded, setIsExpanded, toggleExpanded, toggleTooltip }
 */
export function useSocialLinksCollapse({
  socialLinks = [],
  maxVisible = 4,
  initialExpanded = false,
  t,
} = {}) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);

  const hasLinks = Boolean(socialLinks && socialLinks.length > 0);
  const hasExtra = Boolean(hasLinks && socialLinks.length > maxVisible);

  const mainLinks = useMemo(() => {
    if (!hasLinks) return [];
    return hasExtra ? socialLinks.slice(0, maxVisible) : socialLinks;
  }, [hasLinks, hasExtra, socialLinks, maxVisible]);

  const extraLinks = useMemo(() => {
    if (!hasLinks || !hasExtra) return [];
    return socialLinks.slice(maxVisible);
  }, [hasLinks, hasExtra, socialLinks, maxVisible]);

  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const toggleTooltip = useMemo(() => {
    if (isExpanded) {
      return t?.('common.showLess') || 'Show Less';
    }
    return t?.('common.showMore') || 'Show More';
  }, [isExpanded, t]);

  return {
    hasLinks,
    hasExtra,
    mainLinks,
    extraLinks,
    isExpanded,
    setIsExpanded,
    toggleExpanded,
    toggleTooltip,
  };
}

export default useSocialLinksCollapse;
