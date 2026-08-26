import { DOC_CONFIG_SECTIONS } from './docCategories';
import { RELATED_DOCS_MAP, COMPARE_RELATED_DOCS_MAP } from './docRelations';
import { getDocRawMarkdown } from './docContentLoader';

/**
 * Transforms doc category configs into localized doc sections with loaded markdown contents.
 */
export function getDocSections(t = (k) => k, locale = 'en') {
  return DOC_CONFIG_SECTIONS.map((section) => ({
    category: t(section.categoryKey),
    categoryKey: section.categoryKey,
    items: section.items.map((item) => ({
      slug: item.slug,
      title: t(item.titleKey),
      description: t(item.descriptionKey),
      icon: item.icon,
      content: getDocRawMarkdown(item.slug, locale),
    })),
  }));
}

/**
 * Returns a flat list of all documentation guides across all categories.
 */
export function getAllDocs(t = (k) => k, locale = 'en') {
  return getDocSections(t, locale).flatMap((s) => s.items);
}

/**
 * Finds a single doc item by its slug.
 */
export function getDocBySlug(slug, t = (k) => k, locale = 'en') {
  if (!slug) return null;
  const allDocs = getAllDocs(t, locale);
  return allDocs.find((d) => d.slug === slug) || null;
}

/**
 * Retrieves related doc items for a given guide slug.
 */
export function getRelatedDocs(slug, t = (k) => k, locale = 'en') {
  const relatedSlugs = RELATED_DOCS_MAP[slug] || [];
  const allDocs = getAllDocs(t, locale);
  return relatedSlugs.map((s) => allDocs.find((d) => d.slug === s)).filter(Boolean);
}

/**
 * Retrieves related doc items for a given competitor comparison slug.
 */
export function getCompareRelatedDocs(slug, t = (k) => k, locale = 'en') {
  const relatedSlugs = COMPARE_RELATED_DOCS_MAP[slug] || [];
  const allDocs = getAllDocs(t, locale);
  return relatedSlugs.map((s) => allDocs.find((d) => d.slug === s)).filter(Boolean);
}

/**
 * Filters doc sections and items based on search keyword.
 */
export function filterDocSections(docSections = [], searchQuery = '') {
  if (!searchQuery || !searchQuery.trim()) return docSections;

  const query = searchQuery.toLowerCase().trim();
  return docSections
    .map((section) => {
      const items = (section.items || []).filter(
        (item) =>
          item.title?.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query) ||
          item.slug?.toLowerCase().includes(query)
      );
      return { ...section, items };
    })
    .filter((section) => section.items.length > 0);
}

// Fallback constant for un-contextualized usages
export const DOC_SECTIONS = getDocSections();
export const ALL_DOCS = getAllDocs();
