/**
 * Schema.org generators for navigation, breadcrumb lists, and collection pages.
 */

/**
 * Builds a structured BreadcrumbList schema item.
 */
export function createBreadcrumbListSchema(items = []) {
  return {
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'name': item.name,
      'item': item.item,
    })),
  };
}

/**
 * Builds a structured CollectionPage schema.
 */
export function createCollectionPageSchema(options = {}) {
  const {
    id,
    url,
    name,
    description,
    inLanguage = 'en',
    mainEntity,
  } = options;

  const schema = {
    '@type': 'CollectionPage',
    'name': name,
    'description': description,
    'url': url,
    'inLanguage': inLanguage || 'en',
  };

  if (id) schema['@id'] = id;
  if (mainEntity) schema.mainEntity = mainEntity;

  return schema;
}

/**
 * Builds a structured ItemList with SiteNavigationElement items.
 */
export function createSiteNavigationSchema(items = [], options = {}) {
  const {
    id = 'https://swaya.xyz/#navigation',
    name = 'Site Navigation',
  } = options;

  return {
    '@type': 'ItemList',
    '@id': id,
    'name': name,
    'itemListElement': items.map((item, idx) => ({
      '@type': 'SiteNavigationElement',
      'position': idx + 1,
      'name': item.name,
      'description': item.description || undefined,
      'url': item.url,
    })),
  };
}
