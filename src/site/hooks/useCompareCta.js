import { useMemo, useCallback } from 'react';
import { useTranslation } from '@/providers/LanguageContext';
import { STRIPE_CHECKOUT_URL } from '../data/siteConfig';
import { trackConversion } from '../lib/analytics';

/**
 * Hook providing title, subtitle, CTA texts, checkout URL, and guarantees for Compare CTA section.
 */
export function useCompareCta() {
  const { t } = useTranslation();

  const title = t('landing.compare.ctaTitle', {
    defaultValue: 'Ready to Take Control of Your Media?',
  });

  const subtitle = t('landing.compare.ctaSubtitle', {
    defaultValue:
      'Get lifetime access to the all-in-one offline media center, batch disk organizer, and 4K MPV player for a one-time payment of €39.',
  });

  const buyCtaText = t('landing.compare.buyCta', {
    defaultValue: 'Get Lifetime Access for €39',
  });

  const demoCtaText = t('landing.compare.demoCta', {
    defaultValue: 'Launch Live Demo',
  });

  const checkoutUrl = STRIPE_CHECKOUT_URL;

  const handleBuyClick = useCallback(() => {
    trackConversion({ source: 'compare_cta' });
  }, []);

  const guarantees = useMemo(
    () => [
      {
        id: 'payment',
        label: t('landing.hero.guarantees.payment', {
          defaultValue: 'One-time payment',
        }),
        hasIcon: true,
      },
      {
        id: 'updates',
        label: t('landing.hero.guarantees.updates', {
          defaultValue: 'Lifetime updates',
        }),
        hasIcon: false,
      },
      {
        id: 'devices',
        label: t('landing.hero.guarantees.devices', {
          defaultValue: 'Up to 3 personal devices',
        }),
        hasIcon: false,
      },
    ],
    [t]
  );

  return {
    title,
    subtitle,
    buyCtaText,
    demoCtaText,
    checkoutUrl,
    handleBuyClick,
    guarantees,
  };
}

export default useCompareCta;
