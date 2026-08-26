export const BASE_URL = 'https://swaya.xyz';
export const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

/**
 * Wraps graph elements in standard JSON-LD container envelope.
 */
export function createJsonLdEnvelope(graph, key = 'site-jsonld') {
  return {
    [key]: {
      '@context': 'https://schema.org',
      '@graph': Array.isArray(graph) ? graph.filter(Boolean) : [graph].filter(Boolean),
    },
  };
}
