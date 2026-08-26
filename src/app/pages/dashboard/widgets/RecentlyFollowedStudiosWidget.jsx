import RecommendationCarousel from './components/RecommendationCarousel';
import WidgetShell from '@/ui/WidgetShell';
import { useTranslation } from '@/providers/LanguageContext';
import useRecentlyFollowedStudios from './hooks/useRecentlyFollowedStudios';

export default function RecentlyFollowedStudiosWidget() {
  const { t: T } = useTranslation();
  const {
    includeAdult,
    items,
    isLoading,
    handleCardClick,
    handleLoadMoreStudios,
    hasNextPage,
    isFetchingNextPage,
  } = useRecentlyFollowedStudios();

  if (!isLoading && !items?.length) {
    return null;
  }

  return (
    <WidgetShell loading={isLoading} size="lg" transparent={true} aspect="poster">
      <RecommendationCarousel
        title={T(includeAdult ? 'dashboard.recommendations.recently_followed_studios_adult' : 'dashboard.recommendations.recently_followed_studios') || (includeAdult ? 'Lastly Followed Studios' : 'Lastly Followed Companies')}
        items={items}
        onCardClick={handleCardClick}
        onLoadMore={handleLoadMoreStudios}
        hasMore={hasNextPage}
        isLoadingMore={isFetchingNextPage}
        showWatchlist={false}
      />
    </WidgetShell>
  );
}
