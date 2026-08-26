import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from '@/providers/LanguageContext';
import { getStoredConsent, updateConsentState, CONSENT_CHANGE_EVENT } from '../lib/analytics/consent';

/**
 * Hook managing GDPR/ePrivacy cookie consent banner state and telemetry consent synchronization.
 * @returns {{
 *   visible: boolean,
 *   acceptAll: () => void,
 *   acceptEssential: () => void,
 *   t: Function
 * }}
 */
export function useCookieConsent() {
  const { t } = useTranslation();
  const [consentState, setConsentState] = useState(() => getStoredConsent());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsClient(true);
    });
    const stored = getStoredConsent();
    if (stored === 'granted') {
      updateConsentState('granted');
    }
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const handleConsentChange = (e) => {
      setConsentState(e.detail?.state ?? getStoredConsent());
    };

    window.addEventListener(CONSENT_CHANGE_EVENT, handleConsentChange);
    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, handleConsentChange);
    };
  }, []);

  const acceptAll = useCallback(() => {
    updateConsentState('granted');
    setConsentState('granted');
  }, []);

  const acceptEssential = useCallback(() => {
    updateConsentState('denied');
    setConsentState('denied');
  }, []);

  const isBannerVisible = isClient && consentState === null;

  const ariaLabel = t('landing.cookies.ariaLabel', { defaultValue: 'Privacy & Cookie Consent' });
  const title = t('landing.cookies.title', { defaultValue: 'Privacy & Anonymous Analytics' });
  const description = t('landing.cookies.description', {
    defaultValue:
      'We use privacy-friendly anonymous analytics to monitor Core Web Vitals and crash diagnostics to improve SWAYA.',
  });
  const essentialLabel = t('landing.cookies.essentialOnly', { defaultValue: 'Essential Only' });
  const acceptLabel = t('landing.cookies.acceptAll', { defaultValue: 'Accept Analytics' });

  return {
    isBannerVisible,
    consentState,
    acceptAll,
    acceptEssential,
    ariaLabel,
    title,
    description,
    essentialLabel,
    acceptLabel,
    t,
  };
}

export default useCookieConsent;
