import { useTranslation } from '@/providers/LanguageContext';

/**
 * Hook to compute formatted release meta, localized labels, and highlights for ChangelogReleaseCard.
 */
export function useChangelogCard(release, customT) {
  const { t: ctxT } = useTranslation();
  const t = customT || ctxT;

  const version = release?.version || '';
  const isLatest = Boolean(release?.isLatest);
  const date = release?.date || '';
  const title = release?.title || '';
  const description = release?.description || '';
  const highlights = release?.highlights || [];
  const sections = release?.sections || [];

  const latestBadgeLabel = t('landing.changelog.latest', { defaultValue: 'Latest Release' });
  const highlightsTitle = t('landing.changelog.highlights', { defaultValue: 'Key Highlights' });

  return {
    version,
    isLatest,
    date,
    title,
    description,
    highlights,
    sections,
    latestBadgeLabel,
    highlightsTitle,
    t,
  };
}

export default useChangelogCard;
