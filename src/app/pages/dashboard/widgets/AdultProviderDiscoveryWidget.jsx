import RecommendationCarousel from './components/RecommendationCarousel';
import WidgetShell from '@/ui/WidgetShell';
import Dropdown from '@/ui/Dropdown';
import Inline from '@/ui/Inline';
import { useTranslation } from '@/providers/LanguageContext';
import AdultDashboardFocusSelector from '../components/AdultDashboardFocusSelector';
import { useAdultProviderDiscovery } from './hooks/useAdultProviderDiscovery';

export default function AdultProviderDiscoveryWidget({ provider = 'stashdb' }) {
  const { t: T } = useTranslation();

  const {
    isVisible,
    isLoading,
    currentFocus,
    localSortMode,
    items,
    settings,
    actualWatchlistIds,
    handleWatchlist,
    handlePlayClick,
    handleCardClick,
    playMutationPending,
    handleSortChange,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    defaultTitle,
    titleKey,
  } = useAdultProviderDiscovery({ provider });

  if (!isVisible) {
    return null;
  }

  return (
    <WidgetShell loading={isLoading} size="lg" transparent={true} aspect="scene">
      <RecommendationCarousel
        title={T(titleKey) || defaultTitle}
        items={items}
        watchlistIds={actualWatchlistIds}
        onWatchlist={handleWatchlist}
        onCardClick={handleCardClick}
        isAdultCarousel={true}
        settings={settings}
        onPlayClick={handlePlayClick}
        playMutationPending={playMutationPending}
        onLoadMore={currentFocus ? fetchNextPage : null}
        hasMore={currentFocus ? hasNextPage : false}
        isLoadingMore={isFetchingNextPage}
        headerActions={
          <Inline gap="xs" align="center" wrap={false}>
            {currentFocus && (
              <Dropdown
                options={[
                  { value: 'TRENDING', label: T('dashboard.recommendations.sort_trending') || 'Trending' },
                  { value: 'POPULARITY', label: T('dashboard.recommendations.sort_popularity') || 'Popular' },
                ]}
                value={localSortMode}
                onChange={(e) => handleSortChange(e.target.value)}
                size="sm"
                width="sm"
              />
            )}
            <AdultDashboardFocusSelector
              provider={provider}
              currentFocus={currentFocus}
              t={T}
            />
          </Inline>
        }
      />
    </WidgetShell>
  );
}
