import {
  createFaqItemDef,
  normalizeFaqItem,
  normalizeFaqList,
  getFaqItemsByIds,
} from './faqNormalizer.js';

export {
  createFaqItemDef,
  normalizeFaqItem,
  normalizeFaqList,
  getFaqItemsByIds,
};

export const FAQ_ITEMS = [
  createFaqItemDef({
    id: 'faq-compare-plex',
    index: 0,
  }),
  createFaqItemDef({
    id: 'faq-renamer-filebot',
    index: 1,
  }),
  createFaqItemDef({
    id: 'faq-external-drives',
    index: 2,
  }),
  createFaqItemDef({
    id: 'faq-offline',
    index: 3,
  }),
  createFaqItemDef({
    id: 'faq-player',
    index: 4,
  }),
  createFaqItemDef({
    id: 'faq-scrapers',
    index: 5,
  }),
  createFaqItemDef({
    id: 'faq-license',
    index: 6,
  }),
];

export default FAQ_ITEMS;
