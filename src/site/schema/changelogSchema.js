import {
  BASE_URL,
  createJsonLdEnvelope,
  createBreadcrumbListSchema,
  createCollectionPageSchema,
  createSoftwareApplicationSchema,
} from './baseSchemas.js';
import { LATEST_SOFTWARE_VERSION } from '../data/siteConfig.js';

export function getChangelogJsonLd({
  locale = 'en',
  t = (k) => k,
  prefix = '',
  changelogUrl = `${BASE_URL}/changelog`,
  latestRelease = {},
}) {
  const breadcrumbs = createBreadcrumbListSchema([
    {
      name: t('docs.ui.breadcrumbHome', { defaultValue: 'Home' }),
      item: prefix ? `${BASE_URL}${prefix}` : `${BASE_URL}/`,
    },
    {
      name: t('landing.footer.links.changelog', { defaultValue: 'Changelog' }),
      item: changelogUrl,
    },
  ]);

  const collectionPage = createCollectionPageSchema({
    name: t('landing.changelog.title', { defaultValue: 'SWAYA Changelog & Release Notes' }),
    description: t('landing.changelog.subtitle', {
      defaultValue:
        'Official release notes, feature changelogs, and updates for the SWAYA offline media center & video player.',
    }),
    url: changelogUrl,
    inLanguage: locale || 'en',
  });

  const softwareApp = createSoftwareApplicationSchema({
    softwareVersion: latestRelease?.version || LATEST_SOFTWARE_VERSION,
    dateModified: latestRelease?.date || '2026-08-16',
    releaseNotes: latestRelease?.description || '',
    featureList: [
      'Torrent client dashboard integration and global torrent search',
      'Granular reviews and bespoke TV season navigation',
      'Automated batch file renaming with regex and template routing',
      'GPU-accelerated offline 4K HDR playback engine',
    ],
    url: BASE_URL,
    inLanguage: locale || 'en',
    processorRequirements: 'x64 architecture',
  });

  return createJsonLdEnvelope([breadcrumbs, collectionPage, softwareApp]);
}

export default getChangelogJsonLd;
