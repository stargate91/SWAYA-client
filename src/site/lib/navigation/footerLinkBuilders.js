import {
  DISCORD_INVITE_URL,
  DEV_EMAIL,
  FEATURED_DOC_SLUGS,
  FEATURED_COMPARISONS,
} from '../../data/siteConfig';

/**
 * Builds the list of main navigation links for the footer.
 */
export function buildNavigationLinks({
  homeUrl,
  docsUrl,
  changelogUrl,
  helpUrl,
  helpLabel,
  privacyUrl,
  privacyLabel,
  termsUrl,
  termsLabel,
  discordLabel,
  contactLabel,
  t,
}) {
  return [
    {
      to: homeUrl,
      label: t('landing.footer.links.home'),
      onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    },
    {
      to: docsUrl,
      label: t('landing.footer.links.docs'),
    },
    {
      to: changelogUrl,
      label: t('landing.footer.links.changelog', { defaultValue: 'Changelog' }),
    },
    {
      to: helpUrl,
      label: helpLabel,
    },
    {
      href: DISCORD_INVITE_URL,
      label: discordLabel,
      isExternal: true,
      iconKey: 'discord',
      rightIconKey: 'external',
      ariaLabel: `${discordLabel} (opens in new tab)`,
    },
    {
      href: `mailto:${DEV_EMAIL}`,
      label: contactLabel,
      isMailto: true,
      iconKey: 'mail',
      title: DEV_EMAIL,
      ariaLabel: `${contactLabel}: ${DEV_EMAIL}`,
    },
    {
      to: '/dashboard',
      label: t('landing.footer.links.liveDemo'),
      rightIconKey: 'arrowRight',
    },
  ];
}

/**
 * Builds the list of comparison alternative links for the footer.
 */
export function buildComparisonLinks({ prefix, compareUrl, t }) {
  return [
    ...FEATURED_COMPARISONS.map((comp) => ({
      key: comp.slug,
      to: `${prefix}/compare/${comp.slug}`,
      label: comp.label,
    })),
    {
      to: compareUrl,
      label: t('landing.footer.links.allComparisons', { defaultValue: 'All Alternatives →' }),
    },
  ];
}

/**
 * Builds the list of documentation guide links for the footer.
 */
export function buildDocumentationLinks({ prefix, docsUrl, t }) {
  return [
    ...FEATURED_DOC_SLUGS.map((docSlug) => ({
      key: docSlug,
      to: `${prefix}/docs/${docSlug}`,
      label: t(`docs.items.${docSlug}.title`),
    })),
    {
      to: docsUrl,
      label: t('landing.footer.links.allGuides'),
    },
  ];
}
