import { useMemo } from 'react';

/**
 * Hook for DocsBreadcrumb component that memoizes breadcrumb navigation items.
 * @param {object} params
 * @param {string} params.homeUrl - Localized URL to home page
 * @param {string} [params.docsUrl] - Localized URL to docs hub
 * @param {string} [params.category] - Active category label (if viewing an article)
 * @param {Function} [params.t] - Translation function
 * @returns {object} Formatted breadcrumb items
 */
export function useDocsBreadcrumb({ homeUrl, docsUrl, category, t = (k, opts) => opts?.defaultValue || k }) {
  const items = useMemo(() => {
    return [
      {
        label: t('docs.ui.breadcrumbHome', { defaultValue: 'Home' }),
        to: homeUrl,
      },
      ...(category
        ? [
            {
              label: t('docs.ui.breadcrumbDocs', { defaultValue: 'Documentation' }),
              to: docsUrl,
            },
            {
              label: category,
            },
          ]
        : [
            {
              label: t('docs.ui.breadcrumbDocs', { defaultValue: 'Documentation' }),
            },
          ]),
    ];
  }, [homeUrl, docsUrl, category, t]);

  return {
    items,
  };
}

export default useDocsBreadcrumb;
