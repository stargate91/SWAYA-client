import { useState, useMemo } from 'react';
import { useTranslation } from '@/providers/LanguageContext';
import { Clapperboard, Tv, Video, Users, Film } from '@/ui/icons';
import { useStatsQuery, useRatingsStatsQuery, useSettingsQuery } from '@/queries';
import { useLibraryModeStore, isNsfwMode, SESSION_MODES } from '@/stores/useLibraryModeStore';
import { formatDecade, formatNumber, calculateProgressPercent } from '@/lib/formatters';

const RADAR_GENRE_LIMIT = 6;
const MIN_DNA_TITLES = 4;
const MIN_TIMELINE_TITLES = 5;

const translateGenreLabel = (genre, T) => {
  if (!genre) return '';
  const label = typeof genre === 'object' ? (genre.name || genre.genre || '') : String(genre);
  const genreKey = `dynamic.genres.${label}`;
  const translated = T(genreKey);
  return (translated && translated !== genreKey) ? translated : label;
};

/**
 * Enriches a raw rating stat object with numeric average and formatted percentage fields.
 *
 * @param {Object} [stat] - Raw stat object
 * @returns {Object} Enriched stat object
 */
export const enrichRatingStat = (stat) => {
  const totalRated = stat?.totalRated || 0;
  const totalUnrated = stat?.totalUnrated || 0;
  const total = totalRated + totalUnrated;
  const unratedPercent = calculateProgressPercent(totalUnrated, total);
  const averageNum = parseFloat(stat?.average) || 0;
  return {
    ...stat,
    average: stat?.average || '0.0',
    averageNum,
    totalRated,
    totalUnrated,
    unratedPercent,
    unratedPercentText: ` (${unratedPercent}%)`,
  };
};

export function useStatisticsPage() {
  const { t } = useTranslation();
  const sessionMode = useLibraryModeStore((state) => state.sessionMode);
  const { data: settings } = useSettingsQuery();
  const { data: stats = {}, isLoading } = useStatsQuery(isNsfwMode(sessionMode));

  const hasAdultSupport = settings?.include_adult;
  const activeSessionMode = hasAdultSupport ? sessionMode : SESSION_MODES.SFW;
  const resolvedAdultGenderPreference =
    isNsfwMode(activeSessionMode) && settings?.adult_gender_preference && settings.adult_gender_preference !== 'all'
      ? settings.adult_gender_preference
      : undefined;

  const ratingsStatsQuery = useRatingsStatsQuery(
    isNsfwMode(activeSessionMode),
    resolvedAdultGenderPreference
  );

  const ratingsStats = ratingsStatsQuery.data || {};
  const defaultStat = useMemo(() => ({
    average: '0.0',
    totalRated: 0,
    totalUnrated: 0,
    favoritesCount: 0,
    distribution: Array(20).fill(0)
  }), []);

  const moviesStats = useMemo(() => enrichRatingStat(ratingsStats.movies || defaultStat), [ratingsStats.movies, defaultStat]);
  const tvStats = useMemo(() => enrichRatingStat(ratingsStats.tv || defaultStat), [ratingsStats.tv, defaultStat]);
  const ratingScenesStats = useMemo(() => enrichRatingStat(ratingsStats.scenes || defaultStat), [ratingsStats.scenes, defaultStat]);
  const videosStats = useMemo(() => enrichRatingStat(ratingsStats.videos || defaultStat), [ratingsStats.videos, defaultStat]);
  const peopleStats = useMemo(() => enrichRatingStat(ratingsStats.people || defaultStat), [ratingsStats.people, defaultStat]);
  const studiosStats = useMemo(() => enrichRatingStat(ratingsStats.studios || defaultStat), [ratingsStats.studios, defaultStat]);

  const ratingsState = useMemo(() => ({
    isStatsLoading: ratingsStatsQuery.isLoading,
    activeSessionMode,
    moviesStats,
    tvStats,
    scenesStats: ratingScenesStats,
    videosStats,
    peopleStats,
    studiosStats,
  }), [ratingsStatsQuery.isLoading, activeSessionMode, moviesStats, tvStats, ratingScenesStats, videosStats, peopleStats, studiosStats]);


  const [distTab, setDistTab] = useState('movies');

  const isAdultMode = isNsfwMode(sessionMode);
  const effectiveDistTab = !isAdultMode && distTab === 'scenes' ? 'movies' : distTab;

  const distTabs = useMemo(() => [
    { value: 'movies', label: t('tabs.movies', { defaultValue: 'Movies' }), icon: Clapperboard },
    { value: 'tv', label: t('tabs.tvShows', { defaultValue: 'TV Shows' }), icon: Tv },
    ...(isAdultMode ? [{ value: 'scenes', label: t('tabs.scenes', { defaultValue: 'Scenes' }), icon: Video }] : []),
    { value: 'videos', label: t('tabs.videos', { defaultValue: 'Videos' }) || 'Videos', icon: Video },
    { value: 'people', label: t('statistics.ratings.talents', { defaultValue: 'Talents' }), icon: Users },
    { value: 'studios', label: t('tabs.studios', { defaultValue: 'Studios' }), icon: Film },
  ], [t, isAdultMode]);

  const dnaProgressCount = stats?.actual_dna_titles || 0;
  const timelineProgressCount = stats?.actual_timeline_items || 0;

  const scenesStats = useMemo(() => {
    const totalScenes = stats.total_scenes || 0;
    const totalVideos = stats.total_videos || 0;
    const isNsfw = isNsfwMode(sessionMode);

    return {
      title: isNsfw
        ? (t('statistics.stats.total_scenes_videos') || 'Scenes & Videos')
        : (t('statistics.stats.total_videos') || 'Total Videos'),
      value: isNsfw
        ? formatNumber(totalScenes + totalVideos)
        : formatNumber(totalVideos),
      subText: isNsfw && totalVideos > 0
        ? `${totalScenes} scenes, ${totalVideos} videos`
        : isNsfw
          ? (t('statistics.stats.scenes_sub') || 'Scenes in library')
          : (t('statistics.stats.videos_sub') || 'Videos in library'),
    };
  }, [stats.total_scenes, stats.total_videos, sessionMode, t]);

  const dnaData = useMemo(() => {
    const constellation = stats?.genre_constellation;
    const sourceNodes = constellation?.nodes || [];

    const isMocked = constellation?.is_mocked ?? false;
    const sortedNodes = [...sourceNodes].sort((a, b) => (b.count || 0) - (a.count || 0));
    const nodes = sortedNodes.slice(0, RADAR_GENRE_LIMIT).map((node) => ({
      ...node,
      translatedLabel: translateGenreLabel(node.label, t),
    }));
    const otherGenres = sortedNodes.slice(RADAR_GENRE_LIMIT).map((node) => ({
      ...node,
      translatedLabel: translateGenreLabel(node.label, t),
    }));

    const hasEnoughData = constellation?.has_enough_data ?? false;

    return {
      nodes,
      otherGenres: isMocked ? [] : otherGenres,
      isMocked,
      hasEnoughData,
    };
  }, [stats.genre_constellation, t]);

  const timelineData = useMemo(() => {
    const decades = stats?.decade_distribution || {};
    const isMocked = stats?.timeline_is_mocked ?? false;
    const sorted = Object.entries(decades).sort((a, b) => a[0].localeCompare(b[0]));
    const maxCount = Math.max(...sorted.map(([, count]) => count), 1);
    const topDecade = sorted.length > 0 ? [...sorted].sort((a, b) => b[1] - a[1])[0][0] : '2000s';

    const topDecadeLabel = formatDecade(topDecade, t);

    const hasEnoughData = stats?.timeline_has_enough_data ?? false;

    return {
      sorted,
      maxCount,
      topDecadeLabel,
      isMocked,
      hasEnoughData,
      formatDecade: (decade) => formatDecade(decade, t),
    };
  }, [stats.decade_distribution, stats.timeline_is_mocked, stats.timeline_has_enough_data, t]);

  const activeDistStats = useMemo(() => {
    if (ratingsState.isStatsLoading) return null;
    const statsObj =
      effectiveDistTab === 'people' ? ratingsState.peopleStats :
        effectiveDistTab === 'studios' ? ratingsState.studiosStats :
          effectiveDistTab === 'tv' ? ratingsState.tvStats :
            effectiveDistTab === 'scenes' ? ratingsState.scenesStats :
              effectiveDistTab === 'videos' ? ratingsState.videosStats :
                ratingsState.moviesStats;

    if (!statsObj || !statsObj.distributionRows) return null;

    return {
      distributionRows: statsObj.distributionRows,
    };
  }, [ratingsState, effectiveDistTab]);

  return {
    t,
    stats,
    isLoading,
    sessionMode,
    ratingsState,
    distTab,
    setDistTab,
    isAdultMode,
    effectiveDistTab,
    distTabs,
    dnaProgressCount,
    timelineProgressCount,
    scenesStats,
    dnaData,
    timelineData,
    activeDistStats,
    MIN_DNA_TITLES,
    MIN_TIMELINE_TITLES,
  };
}
