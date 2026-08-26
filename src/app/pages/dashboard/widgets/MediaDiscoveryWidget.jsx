import RecommendationCarousel from './components/RecommendationCarousel';
import WidgetShell from '@/ui/WidgetShell';
import { useTranslation } from '@/providers/LanguageContext';
import useMediaDiscovery from './hooks/useMediaDiscovery';
import { useMediaDiscoveryItems } from './hooks/useMediaDiscoveryItems';

export default function MediaDiscoveryWidget({ mediaType = 'movies' }) {
  const { t: T } = useTranslation();
  const {
    recommendations,
    isLoading,
    actualWatchlistIds,
    handleWatchlist,
    handlePlayClick,
    handleCardClick,
    playMutationPending,
  } = useMediaDiscovery();

  const { items, title, hasItems } = useMediaDiscoveryItems({
    recommendations,
    mediaType,
    t: T,
  });

  if (!isLoading && !hasItems) {
    return null;
  }

  return (
    <WidgetShell loading={isLoading} size="lg" transparent={true} aspect="poster">
      <RecommendationCarousel
        title={title}
        items={items}
        watchlistIds={actualWatchlistIds}
        onWatchlist={handleWatchlist}
        onCardClick={handleCardClick}
        onPlayClick={handlePlayClick}
        playMutationPending={playMutationPending}
      />
    </WidgetShell>
  );
}
