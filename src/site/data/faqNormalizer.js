/**
 * Factory and normalizer utilities for FAQ items across landing, help, and comparison pages.
 */

/**
 * Creates a standard FAQ definition with auto-generated i18n keys based on index.
 */
export function createFaqItemDef({
  id,
  index,
  question,
  answer,
  keyPrefix = 'landing.faq.items',
}) {
  return {
    id,
    index,
    questionKey: index !== undefined ? `${keyPrefix}.${index}.question` : undefined,
    answerKey: index !== undefined ? `${keyPrefix}.${index}.answer` : undefined,
    question,
    answer,
  };
}

/**
 * Normalizes any FAQ item format (key-based, question/answer, or q/a) into a uniform object with accessibility IDs.
 */
export function normalizeFaqItem(item, t = (k) => k, index = 0, sectionId = 'faq') {
  if (!item) return null;

  const itemIndex = item.index !== undefined ? item.index : index;
  const id = item.id ?? `faq-${itemIndex}`;
  const questionKey = item.questionKey || `landing.faq.items.${itemIndex}.question`;
  const answerKey = item.answerKey || `landing.faq.items.${itemIndex}.answer`;

  const question =
    (typeof t === 'function' ? t(questionKey, { defaultValue: item.question || item.q || '' }) : null) ||
    item.question ||
    item.q ||
    '';

  const answer =
    (typeof t === 'function' ? t(answerKey, { defaultValue: item.answer || item.a || '' }) : null) ||
    item.answer ||
    item.a ||
    '';

  return {
    ...item,
    id,
    index: itemIndex,
    question,
    answer,
    triggerId: item.triggerId || `${sectionId}-trigger-${id}`,
    panelId: item.panelId || `${sectionId}-panel-${id}`,
  };
}

/**
 * Normalizes an array of FAQ items with translation and accessibility ID support.
 */
export function normalizeFaqList(items = [], t = (k) => k, sectionId = 'faq') {
  if (!Array.isArray(items)) return [];
  return items.map((item, idx) => normalizeFaqItem(item, t, idx, sectionId)).filter(Boolean);
}

/**
 * Selects and normalizes specific FAQ items by their IDs from a pool.
 */
export function getFaqItemsByIds(faqPool = [], targetIds = [], t = (k) => k, sectionId = 'faq') {
  const normalizedPool = normalizeFaqList(faqPool, t, sectionId);
  const poolMap = new Map(normalizedPool.map((item) => [item.id, item]));

  return targetIds
    .map((id) => poolMap.get(id))
    .filter(Boolean);
}

