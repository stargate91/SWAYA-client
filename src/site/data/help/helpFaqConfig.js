import { FAQ_ITEMS, getFaqItemsByIds } from '../faqConfig.js';

export const HELP_FAQ_IDS = [
  'faq-license',
  'faq-offline',
  'faq-renamer-filebot',
];

/**
 * Resolves FAQ items configured for the help page.
 * @param {Function} t
 * @returns {Array<object>}
 */
export function getHelpFaqItems(t = (k) => k) {
  return getFaqItemsByIds(FAQ_ITEMS, HELP_FAQ_IDS, t);
}
