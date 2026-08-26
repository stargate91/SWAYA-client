/**
 * Schema.org generator for FAQPage schemas.
 */

/**
 * Builds a structured FAQPage schema.
 * @param {Array<{ question?: string, q?: string, answer?: string, a?: string }>} items
 * @returns {object} FAQPage schema
 */
export function createFaqPageSchema(items = []) {
  return {
    '@type': 'FAQPage',
    'mainEntity': (items || []).map((item) => ({
      '@type': 'Question',
      'name': item.question || item.q || '',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer || item.a || '',
      },
    })),
  };
}
