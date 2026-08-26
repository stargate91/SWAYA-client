import { useMemo } from 'react';

/**
 * Hook to format comparison card titles, labels, links, and pricing details.
 */
export function useCompareCard(comp, prefix = '', t = (k) => k) {
  return useMemo(() => {
    if (!comp) {
      return {
        cardUrl: '',
        ariaLabel: '',
        cardTitle: '',
        shortCategory: '',
        heroTagline: '',
        heroSubtitle: '',
        pricingText: '',
        viewComparisonLabel: '',
      };
    }

    const cardUrl = `${prefix}/compare/${comp.slug}`;
    const ariaLabel = `Compare SWAYA vs ${comp.name}`;
    const hubTitlePrefix = t('landing.compare.hubTitle', { defaultValue: 'SWAYA vs' });
    const cardTitle = `${hubTitlePrefix} ${comp.name}`;
    const pricingText = `${comp.name} Pricing: ${comp.competitorPricing}`;
    const viewComparisonLabel = t('landing.compare.viewComparison', {
      defaultValue: 'View Comparison',
    });

    return {
      cardUrl,
      ariaLabel,
      cardTitle,
      shortCategory: comp.shortCategory,
      heroTagline: comp.heroTagline,
      heroSubtitle: comp.heroSubtitle,
      pricingText,
      viewComparisonLabel,
    };
  }, [comp, prefix, t]);
}

export default useCompareCard;
