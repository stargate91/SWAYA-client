import {
  BASE_URL,
  createJsonLdEnvelope,
  createBreadcrumbListSchema,
  createOrganizationSchema,
} from './baseSchemas.js';

export function getHelpJsonLd({
  locale = 'en',
  t = (k) => k,
  prefix = '',
  helpUrl = `${BASE_URL}/help`,
}) {
  const homeUrl = prefix ? `${BASE_URL}${prefix}` : `${BASE_URL}/`;

  const breadcrumbs = createBreadcrumbListSchema([
    {
      name: t('docs.ui.breadcrumbHome', { defaultValue: 'Home' }),
      item: homeUrl,
    },
    {
      name: t('landing.navbar.help', { defaultValue: 'Help & Support' }),
      item: helpUrl,
    },
  ]);

  const organization = createOrganizationSchema({
    includeAvailableLanguages: true,
  });

  const contactPage = {
    '@type': 'ContactPage',
    'name': `${t('landing.help.title', { defaultValue: 'How Can We Help You?' })} - SWAYA`,
    'description': t('landing.help.subtitle', {
      defaultValue:
        'Get in touch with the developer, join our Discord community for live chat, or browse our documentation guides.',
    }),
    'url': helpUrl,
    'inLanguage': locale || 'en',
    'mainEntity': organization,
  };

  return createJsonLdEnvelope([breadcrumbs, contactPage]);
}

export default getHelpJsonLd;
