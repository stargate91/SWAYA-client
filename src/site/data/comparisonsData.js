/**
 * Accurate, comprehensive comparison data for Swaya vs competitor alternatives.
 */

import {
  filebotComparison,
  plexComparison,
  tinymediamanagerComparison,
  stashComparison,
  jellyfinComparison,
  kodiComparison,
} from './comparisons/items/index.js';
import { getLocalizedComparison } from './comparisonsTranslations.js';

export const COMPARISONS_LIST = [
  filebotComparison,
  plexComparison,
  tinymediamanagerComparison,
  stashComparison,
  jellyfinComparison,
  kodiComparison,
];


export const COMPARISONS_MAP = COMPARISONS_LIST.reduce((acc, comp) => {
  acc[comp.slug] = comp;
  return acc;
}, {});

export function getComparisonBySlug(slug, locale = 'en') {
  if (!slug) return null;
  const base = COMPARISONS_MAP[slug.toLowerCase()];
  if (!base) return null;
  return getLocalizedComparison(base, locale);
}

export function getComparisonsList(locale = 'en') {
  return COMPARISONS_LIST.map((comp) => getLocalizedComparison(comp, locale));
}
