import { useState, useCallback, useMemo } from 'react';
import { FolderSync, Sparkles, ShieldCheck } from 'lucide-react';
import { useTranslation } from '@/providers/LanguageContext';
import { SHOWCASE_SECTIONS } from '../data/featuresConfig';

const SHOWCASE_ICON_MAP = {
  FolderSync,
  Sparkles,
  ShieldCheck,
};


/**
 * Hook providing showcase feature sections, benefits localization, and screenshot lightbox modal state.
 * @returns {{
 *   t: Function,
 *   sections: Array<object>,
 *   activeLightboxImage: string|null,
 *   openLightbox: (imageUrl: string) => void,
 *   closeLightbox: () => void
 * }}
 */
export function useShowcase() {
  const { t } = useTranslation();
  const [activeLightboxImage, setActiveLightboxImage] = useState(null);

  const openLightbox = useCallback((imageUrl) => {
    setActiveLightboxImage(imageUrl);
  }, []);

  const closeLightbox = useCallback(() => {
    setActiveLightboxImage(null);
  }, []);

  const sections = useMemo(
    () =>
      SHOWCASE_SECTIONS.map((section) => ({
        ...section,
        icon: SHOWCASE_ICON_MAP[section.iconName] || null,
        benefits: (section.benefitIndices || []).map((idx) =>
          t(`${section.benefitKeyPrefix}.${idx}`)
        ),
        integrationsLabel: section.integrationsLabelKey
          ? t(section.integrationsLabelKey)
          : null,
      })),
    [t]
  );

  return {
    t,
    sections,
    activeLightboxImage,
    openLightbox,
    closeLightbox,
  };
}

export default useShowcase;

