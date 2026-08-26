import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/providers/LanguageContext';
import { usePageMeta } from './usePageMeta';
import { useLocalizedUrls } from './useLocalizedUrls';
import { getLandingJsonLd } from '../schema/landingSchema';
import defaultActionVideo from '../../assets/action.mp4';

/**
 * Main hook for the Landing Page, synchronizing multi-lingual page metadata, video structured data, and demo launch handler.
 * @returns {{
 *   onOpenDemo: () => void
 * }}
 */
export function useLandingPage() {
  const navigate = useNavigate();
  const { t, locale } = useTranslation();
  const { prefix } = useLocalizedUrls();

  const currentUrl = prefix ? `https://swaya.xyz${prefix}` : 'https://swaya.xyz/';
  const currentPath = prefix || '/';

  const videoContentUrl = typeof defaultActionVideo === 'string'
    ? (defaultActionVideo.startsWith('http')
        ? defaultActionVideo
        : `https://swaya.xyz${defaultActionVideo.startsWith('/') ? defaultActionVideo : '/' + defaultActionVideo}`)
    : 'https://swaya.xyz/assets/action.mp4';

  const landingJsonLd = useMemo(
    () => getLandingJsonLd({ locale, t, videoContentUrl }),
    [locale, t, videoContentUrl]
  );

  usePageMeta({
    title: t('landing.meta.title', {
      defaultValue: 'SWAYA - Personal Offline Media Center & Video Player',
    }),
    description: t('landing.meta.description', {
      defaultValue: t('landing.hero.subtitle', {
        defaultValue:
          'Personal offline media center for Windows. Organize movies, TV shows, and adult video collections with rich metadata, built-in player, and 100% privacy.',
      }),
    }),
    url: currentUrl,
    canonicalUrl: currentUrl,
    pathname: currentPath,
    locale: locale || 'en',
    ogType: 'website',
    jsonLd: landingJsonLd,
  });

  const onOpenDemo = useCallback(() => {
    navigate('/dashboard');
  }, [navigate]);

  return {
    onOpenDemo,
  };
}

export default useLandingPage;
