/**
 * Pipeline for merging canonical comparison item models with localized translation overlays.
 */

/**
 * Merges a canonical base comparison model with localized translation overrides.
 * @param {object} baseComparison - Canonical English comparison item
 * @param {object} [locMap] - Localized translation map for this competitor slug
 * @returns {object} Localized and normalized comparison object
 */
export function mergeComparisonWithLocale(baseComparison, locMap) {
  if (!baseComparison) return null;
  if (!locMap) return baseComparison;

  return {
    ...baseComparison,
    ...locMap,
    whenToChooseCompetitor: locMap.whenToChooseCompetitor || baseComparison.whenToChooseCompetitor,
    whenToChooseSwaya: locMap.whenToChooseSwaya || baseComparison.whenToChooseSwaya,
    matrix: locMap.matrix
      ? baseComparison.matrix.map((row, idx) => ({
          ...row,
          ...(locMap.matrix[idx] || {}),
        }))
      : baseComparison.matrix,
    deepDives: locMap.deepDives
      ? baseComparison.deepDives.map((d, idx) => ({
          ...d,
          ...(locMap.deepDives[idx] || {}),
        }))
      : baseComparison.deepDives,
    faqs: locMap.faqs
      ? baseComparison.faqs.map((f, idx) => ({
          ...f,
          ...(locMap.faqs[idx] || {}),
        }))
      : baseComparison.faqs,
  };
}
