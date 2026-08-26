import {
  BASE_URL,
  createJsonLdEnvelope,
  createBreadcrumbListSchema,
  createOrganizationSchema,
} from './baseSchemas.js';

export function getPrivacyJsonLd({
  locale = 'en',
  prefix = '',
  privacyUrl = `${BASE_URL}/privacy`,
  title = 'Privacy Policy',
  description = 'SWAYA is an offline-first desktop media center and video player. We prioritize your privacy with zero telemetry, complete local data storage, and strict cryptographic protections.',
  breadcrumbHome = 'Home',
  breadcrumbPrivacy = 'Privacy Policy',
}) {
  const homeUrl = prefix ? `${BASE_URL}${prefix}` : `${BASE_URL}/`;

  const breadcrumbs = createBreadcrumbListSchema([
    { name: breadcrumbHome, item: homeUrl },
    { name: breadcrumbPrivacy, item: privacyUrl },
  ]);

  const webPage = {
    '@type': 'WebPage',
    '@id': `${privacyUrl}#webpage`,
    'url': privacyUrl,
    'name': `${title} - SWAYA`,
    'description': description,
    'inLanguage': locale || 'en',
    'breadcrumb': breadcrumbs,
    'publisher': {
      '@id': `${BASE_URL}/#organization`,
    },
  };

  const organization = createOrganizationSchema({ id: `${BASE_URL}/#organization` });

  return createJsonLdEnvelope([breadcrumbs, webPage, organization], 'privacy-jsonld');
}

export function getTermsJsonLd({
  locale = 'en',
  prefix = '',
  termsUrl = `${BASE_URL}/terms`,
  title = 'Terms of Service & Refund Policy',
  description = 'Terms governing your perpetual lifetime SWAYA software license, permitted personal usage, and 14-day / 7-day refund policy.',
  breadcrumbHome = 'Home',
  breadcrumbTerms = 'Terms & Refund Policy',
}) {
  const homeUrl = prefix ? `${BASE_URL}${prefix}` : `${BASE_URL}/`;

  const breadcrumbs = createBreadcrumbListSchema([
    { name: breadcrumbHome, item: homeUrl },
    { name: breadcrumbTerms, item: termsUrl },
  ]);

  const webPage = {
    '@type': 'WebPage',
    '@id': `${termsUrl}#webpage`,
    'url': termsUrl,
    'name': `${title} - SWAYA`,
    'description': description,
    'inLanguage': locale || 'en',
    'breadcrumb': breadcrumbs,
    'publisher': {
      '@id': `${BASE_URL}/#organization`,
    },
  };

  const organization = createOrganizationSchema({ id: `${BASE_URL}/#organization` });

  return createJsonLdEnvelope([breadcrumbs, webPage, organization], 'terms-jsonld');
}

export default {
  getPrivacyJsonLd,
  getTermsJsonLd,
};
