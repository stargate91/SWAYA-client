import { useMemo } from 'react';

/**
 * Hook for HelpHeader component that builds breadcrumb items and localized header labels.
 * @param {object} params
 * @param {string} params.homeUrl - Path/URL to home page
 * @param {Function} [params.t] - Translation function
 * @returns {object} Formatted header properties
 */
export function useHelpHeader({ homeUrl, t = (k, opts) => opts?.defaultValue || k }) {
  const breadcrumbItems = useMemo(
    () => [
      {
        label: t('docs.ui.breadcrumbHome', { defaultValue: 'Home' }),
        to: homeUrl,
      },
      {
        label: t('landing.navbar.help', { defaultValue: 'Help & Support' }),
      },
    ],
    [homeUrl, t]
  );

  const badgeText = useMemo(
    () => t('landing.help.badge', { defaultValue: 'Help & Community' }),
    [t]
  );

  const titleText = useMemo(
    () => t('landing.help.title', { defaultValue: 'How Can We Help You?' }),
    [t]
  );

  const descriptionText = useMemo(
    () =>
      t('landing.help.subtitle', {
        defaultValue:
          'Get in touch with the developer, join our Discord community for live chat, or browse our documentation guides.',
      }),
    [t]
  );

  return {
    breadcrumbItems,
    badgeText,
    titleText,
    descriptionText,
  };
}

export default useHelpHeader;
