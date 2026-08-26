import Dropdown from '@/ui/Dropdown';
import WidgetShell from '@/ui/WidgetShell';
import PosterCard from '@/ui/PosterCard';
import posterCardStyles from '@/ui/PosterCard.module.css';
import Button from '@/ui/Button';
import Inline from '@/ui/Inline';
import { Check, Plus, Minus } from '@/ui/icons';
import Stack from '@/ui/Stack';
import ScrollRow from '@/ui/ScrollRow';
import EmptyState from '@/ui/EmptyState';
import Text from '@/ui/Text';
import useTMDBDiscovery from './hooks/useTMDBDiscovery';

const TMDBDiscoveryWidget = () => {
  const {
    T,
    genreId,
    setGenreId,
    year,
    setYear,
    scrollRef,
    discoveryItems,
    loading,
    translatedGenres,
    translatedYears,
  } = useTMDBDiscovery();

  return (
    <Stack gap="xl">
      <Inline gap="lg" align="center" justify="between" fullWidth>
        <Text as="h3" variant="display" weight="extrabold">
          {T('dashboard.recommendations.discovery_title') || 'Top 20 Discoveries'}
        </Text>

        <Inline gap="md" align="center">
          <Dropdown
            options={translatedGenres}
            value={genreId}
            onChange={(e) => setGenreId(e.target.value)}
            width="lg"
          />

          <Dropdown
            options={translatedYears}
            value={year}
            onChange={(e) => setYear(e.target.value)}
            width="sm"
          />
        </Inline>
      </Inline>

      <WidgetShell loading={loading} size="lg" transparent={true} aspect="poster">
        {discoveryItems.length === 0 ? (
          <EmptyState
            title={T('dashboard.recommendations.discovery_no_results') || 'No popular movies found matching filters.'}
            size="sm"
            background="none"
            border="none"
          />
        ) : (
          <ScrollRow ref={scrollRef}>
            {discoveryItems.map((item) => (
              <PosterCard
                key={item.key}
                size="default"
                imageUrl={item.posterUrl}
                loading="eager"
                onClick={item.handleCardClick}
                title={item.title}
                subtitle={item.subtitle}
                ratingImdb={item.ratingImdb}
                ratingTmdb={item.ratingTmdb}
                playOverlay={item.playOverlay}
                bottomAction={
                  <Button
                    onClick={item.handleToggleWatchlist}
                    className={posterCardStyles['action-btn']}
                    variant="glass"
                    aria-pressed={item.isWatchlisted}
                  >
                    {item.isWatchlisted ? (
                      <>
                        <span className={posterCardStyles['action-btn-state-default']}>
                          <Check size={12} strokeWidth={3} /> {T('dashboard.watchlist.added') || 'Watchlisted'}
                        </span>
                        <span className={posterCardStyles['action-btn-state-hover']}>
                          <Minus size={12} strokeWidth={3} /> {T('common.remove') || 'Remove'}
                        </span>
                      </>
                    ) : (
                      <>
                        <Plus size={12} strokeWidth={3} /> {T('dashboard.watchlist.add_short') || 'Watchlist'}
                      </>
                    )}
                  </Button>
                }
              />
            ))}
          </ScrollRow>
        )}
      </WidgetShell>
    </Stack>
  );
};

export default TMDBDiscoveryWidget;

