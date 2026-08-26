import { useCallback } from 'react';
import { useTranslation } from '@/providers/LanguageContext';
import { STRIPE_CHECKOUT_URL } from '../data/siteConfig';
import { trackConversion } from '../lib/analytics';

/**
 * Hook providing translations and CTA configuration for the DownloadSection component.
 */
export function useDownloadSection() {
  const { t } = useTranslation();

  const title = t('landing.download.title');
  const subtitle = t('landing.download.subtitle');
  const buttonText = t('landing.download.button');
  const disclaimer = t('landing.download.disclaimer');
  const checkoutUrl = STRIPE_CHECKOUT_URL;

  const handleBuyClick = useCallback(() => {
    trackConversion({ source: 'download_section' });
  }, []);

  return {
    t,
    title,
    subtitle,
    buttonText,
    disclaimer,
    checkoutUrl,
    handleBuyClick,
  };
}

export default useDownloadSection;
