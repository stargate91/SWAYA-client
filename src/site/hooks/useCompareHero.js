import { useMemo, useCallback } from 'react';
import { useTranslation } from '@/providers/LanguageContext';
import { STRIPE_CHECKOUT_URL } from '../data/siteConfig';
import { trackConversion } from '../lib/analytics';

/**
 * Hook preparing breadcrumb items, CTAs, checkout URL, and pricing badges for CompareHero.
 */
export function useCompareHero({
  comparison,
  homeUrl,
  hubUrl,
  swayaPricingLabel,
  competitorPricingLabel,
  mainTitlePrefix,
}) {
  const { t } = useTranslation();

  const breadcrumbItems = useMemo(
    () => [
      {
        label: t('landing.footer.links.home', { defaultValue: 'Home' }),
        to: homeUrl,
      },
      {
        label: t('landing.footer.columns.comparisons', { defaultValue: 'Comparisons' }),
        to: hubUrl,
      },
      {
        label: comparison?.name,
      },
    ],
    [t, homeUrl, hubUrl, comparison?.name]
  );

  const checkoutUrl = STRIPE_CHECKOUT_URL;
  const buyCtaText = t('landing.compare.buyCta', {
    defaultValue: 'Get SWAYA Lifetime for €39',
  });
  const demoCtaText = t('landing.compare.demoCta', {
    defaultValue: 'Try Live Web Demo',
  });

  const handleBuyClick = useCallback(() => {
    trackConversion({ source: 'compare_hero' });
  }, []);

  return {
    t,
    breadcrumbItems,
    checkoutUrl,
    buyCtaText,
    demoCtaText,
    handleBuyClick,
    badge: comparison?.badge,
    mainTitlePrefix,
    tagline: comparison?.heroTagline,
    subtitle: comparison?.heroSubtitle,
    swayaPricingLabel,
    swayaPricing: comparison?.swayaPricing,
    competitorPricingLabel,
    competitorPricing: comparison?.competitorPricing,
  };
}

export default useCompareHero;
