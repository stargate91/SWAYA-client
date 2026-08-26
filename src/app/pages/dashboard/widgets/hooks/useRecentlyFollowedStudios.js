import { useMemo } from 'react';
import { useSettingsQuery } from '@/queries/settingsQueries';
import { useRecentlyFollowedStudiosInfiniteQuery } from '@/queries/dashboardQueries';
import useRecommendationActions from './useRecommendationActions';
import { useLibraryModeStore, isNsfwMode } from '@/stores/useLibraryModeStore';

export default function useRecentlyFollowedStudios() {
  const sessionMode = useLibraryModeStore((state) => state.sessionMode);
  const { data: settings = {} } = useSettingsQuery();
  const includeAdult = settings?.include_adult && isNsfwMode(sessionMode);

  const { handleCardClick } = useRecommendationActions();

  const {
    data: paginatedData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useRecentlyFollowedStudiosInfiniteQuery(includeAdult);

  const handleLoadMoreStudios = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  const items = useMemo(() => {
    const list = paginatedData?.pages ? paginatedData.pages.flat() : [];
    return list.map(s => ({
      ...s,
      media_type: 'studio'
    }));
  }, [paginatedData]);

  return {
    includeAdult,
    items,
    isLoading,
    handleCardClick,
    handleLoadMoreStudios,
    hasNextPage,
    isFetchingNextPage,
  };
}
