import PropTypes from 'prop-types';
import { Star, Check, Plus } from '@/ui/icons';
import { resolveMediaImageUrl } from '@/lib/imageUrls';
import { resolveTitle, resolveMediaType } from '@/lib/normalizeMediaEntity';
import Button from '@/ui/Button';
import Text from '@/ui/Text';
import { useTranslation } from '@/providers/LanguageContext';
import Inline from '@/ui/Inline';
import Stack from '@/ui/Stack';
import Pill from '@/ui/Pill';
import { formatRating } from '@/lib/formatters';
import styles from './SpotlightBanner.module.css';

export const SpotlightBanner = ({ item, watchlistIds, onWatchlist, onCardClick, isAdult = false }) => {
  const { t: T } = useTranslation();
  if (!item) return null;

  const rawBackdrop = item.backdrop_path || item.poster_path;
  const imageUrl = resolveMediaImageUrl(rawBackdrop, 'backdrop', { width: isAdult ? 1280 : undefined });

  const title = resolveTitle(item);
  const isWatchlisted = watchlistIds.includes(item.id);
  const imdbRating = item.rating_imdb;
  const tmdbRating = item.rating_tmdb || item.vote_average;
  const ratingToDisplay = imdbRating || tmdbRating;
  const ratingSource = imdbRating ? 'imdb' : 'tmdb';
  const rawDate = item.release_date || item.first_air_date;
  const releaseDate = rawDate ? rawDate.substring(0, 10) : null;

  return (
    <div className={styles.spotlight}>
      {imageUrl && <img src={imageUrl} alt={title} />}
      <div className={styles['gradient-side']} />
      <div className={styles['gradient-bottom']} />

      <Stack gap="md" className={styles.copy}>
        <Text
          as="h2"
          clamp={2}
          variant="hero"
          weight="extrabold"
          className={styles['title-link']}
          onClick={() => onCardClick(item)}
        >
          {title}
        </Text>
        <Inline gap="lg" align="center">
          {ratingToDisplay ? (
            <Pill variant={ratingSource} size="lg">
              <Star size={14} fill="currentColor" strokeWidth={2.0} />
              {formatRating(ratingToDisplay)}
            </Pill>
          ) : null}
          {releaseDate ? <Text color="primary" className={styles['text-shadow']}>{releaseDate}</Text> : null}
        </Inline>
        <Text as="p" clamp={3} variant="small" color="secondary">
          {item.overview}
        </Text>
        <Inline gap="md" align="center">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              const type = resolveMediaType(item);
              onWatchlist(item, type);
            }}
            size="md"
            variant="secondary"
          >
            {isWatchlisted ? (
              <>
                <Check size={16} /> {T('dashboard.watchlist.added') || 'Watchlisted'}
              </>
            ) : (
              <>
                <Plus size={16} /> {T('dashboard.watchlist.add') || 'Watchlist'}
              </>
            )}
          </Button>
        </Inline>
      </Stack>
    </div>
  );
};

SpotlightBanner.propTypes = {
  item: PropTypes.object,
  watchlistIds: PropTypes.array.isRequired,
  onWatchlist: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
  isAdult: PropTypes.bool,
};

export default SpotlightBanner;
