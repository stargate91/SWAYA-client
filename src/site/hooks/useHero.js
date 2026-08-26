import { useMemo, useCallback } from 'react';
import { Zap, Shield, Sparkles } from 'lucide-react';
import { useTranslation } from '@/providers/LanguageContext';
import { STRIPE_CHECKOUT_URL } from '../data/siteConfig';
import { trackConversion } from '../lib/analytics';

/**
 * Hook providing headline text, pricing badges, CTAs, and guarantees for Hero components.
 */
export function useHero() {
  const { t } = useTranslation();

  const brandTitle = t('landing.hero.title');
  const taglinePrefix = t('landing.hero.taglinePrefix');
  const taglineAccent = t('landing.hero.taglineAccent');
  const subtitle = t('landing.hero.subtitle');
  const priceOld = t('landing.hero.priceOld');
  const priceNew = t('landing.hero.priceNew');
  const priceTag = t('landing.hero.priceTag');
  const buyCtaText = t('landing.hero.buyCta', { defaultValue: 'Get Lifetime Access for €39' });
  const demoCtaText = t('landing.hero.demoCta', { defaultValue: 'Launch Live Web Demo' });
  const checkoutUrl = STRIPE_CHECKOUT_URL;

  const handleBuyClick = useCallback(() => {
    trackConversion({ source: 'hero' });
  }, []);

  const guarantees = useMemo(
    () => [
      {
        id: 'payment',
        icon: Zap,
        iconKey: 'zap',
        label: t('landing.hero.guarantees.payment', { defaultValue: 'One-time payment' }),
      },
      {
        id: 'updates',
        icon: Shield,
        iconKey: 'shield',
        label: t('landing.hero.guarantees.updates', { defaultValue: 'Lifetime updates' }),
      },
      {
        id: 'devices',
        icon: Sparkles,
        iconKey: 'sparkles',
        label: t('landing.hero.guarantees.devices', { defaultValue: 'Up to 3 personal devices' }),
      },
    ],
    [t]
  );


  return {
    t,
    brandTitle,
    taglinePrefix,
    taglineAccent,
    subtitle,
    priceOld,
    priceNew,
    priceTag,
    buyCtaText,
    demoCtaText,
    checkoutUrl,
    handleBuyClick,
    guarantees,
  };
}

export default useHero;
