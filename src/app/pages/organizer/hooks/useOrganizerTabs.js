import { useMemo } from 'react';
import { EXTRAS_TABS, MAIN_TABS, MANUAL_TABS } from '../utils/organizerConstants';

const getMainTabsForMode = (scanMode) => {
  if (scanMode === 'offline') return ['scenes', 'extras'];
  if (scanMode === 'scenes') return ['manual', 'scenes', 'extras'];
  if (scanMode === 'tv') return ['manual', 'episodes', 'extras'];
  return ['manual', 'movies', 'extras'];
};

const getManualTabsForMode = (scanMode) => {
  if (scanMode === 'scenes' || scanMode === 'offline') return ['scenes'];
  if (scanMode === 'tv') return ['episodes'];
  return ['movies'];
};

export function useOrganizerTabs({ t, tabCounts, scanMode }) {
  const computedMainTabs = useMemo(() => {
    const allowedTabs = new Set(getMainTabsForMode(scanMode));
    return MAIN_TABS.filter((tab) => allowedTabs.has(tab.value)).map((tab) => {
      let label = t(tab.labelKey);
      if (scanMode === 'offline' && tab.value === 'scenes') {
        label = t('organizer.tabs.videos') || 'Videos';
      }
      return {
        ...tab,
        label,
        count: tab.value === 'manual'
          ? tabCounts.manualCount
          : tab.value === 'movies'
            ? tabCounts.moviesCount
            : tab.value === 'episodes'
              ? tabCounts.episodesCount
              : tab.value === 'scenes'
                ? tabCounts.scenesCount
                : tabCounts.extrasCount,
      };
    });
  }, [t, tabCounts, scanMode]);

  const computedManualTabs = useMemo(() => {
    const allowedTabs = new Set(getManualTabsForMode(scanMode));
    return MANUAL_TABS.filter((tab) => allowedTabs.has(tab.value)).map((tab) => ({
      ...tab,
      label: t(tab.labelKey),
      count: tab.value === 'movies'
        ? tabCounts.manualMoviesCount
        : tab.value === 'episodes'
          ? tabCounts.manualEpisodesCount
          : tabCounts.manualScenesCount,
    }));
  }, [t, tabCounts, scanMode]);

  const computedExtrasTabs = useMemo(() => EXTRAS_TABS
    .map((tab) => {
      let count = 0;
      if (tab.value === 'bonus') count = tabCounts.extraBonusCount || 0;
      else if (tab.value === 'subtitles') count = tabCounts.extraSubtitlesCount || 0;
      else if (tab.value === 'audio') count = tabCounts.extraAudioCount || 0;
      else if (tab.value === 'images') count = tabCounts.extraImagesCount || 0;
      else if (tab.value === 'metadata') count = tabCounts.extraMetadataCount || 0;

      return {
        ...tab,
        label: t(tab.labelKey),
        count,
      };
    }), [tabCounts, t]);

  return {
    computedExtrasTabs,
    computedManualTabs,
    computedMainTabs,
  };
}
