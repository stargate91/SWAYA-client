import SpotlightBanner from './components/SpotlightBanner';
import RecommendationSkeleton from './components/RecommendationSkeleton';
import { ChevronLeft, ChevronRight } from '@/ui/icons';
import Inline from '@/ui/Inline';
import Button from '@/ui/Button';
import styles from './components/SpotlightBanner.module.css';
import { useSpotlightProvider } from './hooks/useSpotlightProvider';

export default function SpotlightWidget() {
  const {
    isLoading,
    isVisible,
    item,
    activeProviderObj,
    hasMultipleProviders,
    actualWatchlistIds,
    handleWatchlist,
    handleCardClick,
    handleNextProvider,
    handlePrevProvider,
    isAdult,
  } = useSpotlightProvider();

  if (isLoading) {
    return <RecommendationSkeleton showBanner />;
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div className="u-relative">
      <SpotlightBanner
        item={item}
        watchlistIds={actualWatchlistIds}
        onWatchlist={handleWatchlist}
        onCardClick={handleCardClick}
        isAdult={isAdult}
      />
      {hasMultipleProviders && (
        <Inline
          align="center"
          gap="xs"
          className={`${styles.controls} ${styles['glass-pill']}`}
        >
          <Button
            variant="ghost"
            size="xs"
            onClick={handleNextProvider}
          >
            {activeProviderObj?.label}
          </Button>
          <Inline gap="2xs" align="center">
            <Button
              variant="ghost"
              size="xs"
              onClick={handlePrevProvider}
              icon={<ChevronLeft size={16} />}
            />
            <Button
              variant="ghost"
              size="xs"
              onClick={handleNextProvider}
              icon={<ChevronRight size={16} />}
            />
          </Inline>
        </Inline>
      )}
    </div>
  );
}
