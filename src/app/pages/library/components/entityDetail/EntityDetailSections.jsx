import Grid from '@/ui/Grid';
import PosterCard from '@/ui/PosterCard';
import Pill from '@/ui/Pill';
import ScrollRow from '@/ui/ScrollRow';
import { API_BASE } from '@/lib/backend';
import { isTvLikeMediaType } from '@/lib/mediaTypes';
import { getPosterImagePath, resolveDetailsImageUrl } from '@/lib/imageUrls';
import { ENTITY_ICONS } from '@/ui/icons';
import { navigateToCreditDetail } from '@/lib/routes';
import Text from '@/ui/Text';
import { useTextTruncation } from '@/hooks/useTextTruncation';
import { useHorizontalInfiniteScroll } from '@/hooks/useHorizontalInfiniteScroll';
export function OverviewContent({ text, emptyText, t, openDrawer, className = '', clamp = 3 }) {
  const { targetRef: overviewRef, isTruncated } = useTextTruncation(text, { threshold: 1 });

  if (!text) {
    return emptyText ? (
      <Text color="muted" italic className={className}>
        {emptyText}
      </Text>
    ) : null;
  }

  return (
    <div className={className}>
      <Text
        ref={overviewRef}
        as="div"
        clamp={clamp}
        preserveWhitespace
      >
        {text}
      </Text>
      {isTruncated && (
        <Text
          as="button"
          type="button"
          interactive
          color="accent"
          variant="small"
          onClick={openDrawer}
        >
          {t('library.details.readMore') || 'Read More'}
        </Text>
      )}
    </div>
  );
}

export function EntityCardGrid({ items, type, navigate, t }) {
  if (!items?.length) {
    return null;
  }

  const openItem = (item) => {
    navigateToCreditDetail(navigate, item, type, item.source);
  };

  return (
    <Grid variant="poster">
      {items.map((item, index) => {
        const resolvedType = item.media_type || item.type || type;
        const posterPath = getPosterImagePath(item) || item.backdrop_path || item.local_backdrop_path;
        const subtitleParts = [];
        if (item.year) subtitleParts.push(String(item.year));
        if (item.job) subtitleParts.push(item.job);
        if (item.character) subtitleParts.push(item.character);
        if (item.episode_count) {
          subtitleParts.push(
            t('library.details.episodePlural', {
              count: item.episode_count,
              defaultValue: `${item.episode_count} Episodes`,
            })
          );
        }

        return (
          <PosterCard
            key={`${type}-${item.tmdb_id || item.id}`}
            title={item.title}
            subtitle={subtitleParts.join(' - ')}
            imageUrl={resolveDetailsImageUrl(posterPath, API_BASE, 'poster')}
            ratingImdb={item.rating_imdb}
            ratingTmdb={item.rating_tmdb ?? item.rating}
            icon={isTvLikeMediaType(resolvedType) ? ENTITY_ICONS.tv : ENTITY_ICONS.movie}
            customStyle={{ '--item-index': index }}
            onClick={() => openItem(item)}
          />
        );
      })}
    </Grid>
  );
}

function HorizontalCollectionItemsList({ items, navigate, t, customStyle }) {
  if (!items?.length) {
    return null;
  }

  const openItem = (item) => {
    navigateToCreditDetail(navigate, item, item.media_type || item.type, item.source);
  };

  return (
    <Grid
      variant="carousel-2row"
      /* eslint-disable-next-line react/forbid-component-props */
      style={customStyle}
    >
      {items.map((item, index) => {
        const isTv = isTvLikeMediaType(item.media_type || item.type);
        const posterPath = getPosterImagePath(item) || item.backdrop_path || item.local_backdrop_path;
        const posterUrl = posterPath ? resolveDetailsImageUrl(posterPath, API_BASE, 'poster') : null;

        const ratingPill = item.in_library ? (
          <Pill variant="success">
            {t('library.details.have') || 'HAVE'}
          </Pill>
        ) : (
          <Pill variant="missing">
            {t('library.details.missing') || 'MISSING'}
          </Pill>
        );

        return (
          <PosterCard
            key={`collection-item-${item.media_type || item.type || 'movie'}-${item.tmdb_id || item.id}`}
            title={item.title}
            subtitle={item.year ? String(item.year) : undefined}
            imageUrl={posterUrl}
            ratingPill={ratingPill}
            icon={isTv ? ENTITY_ICONS.tv : ENTITY_ICONS.movie}
            onClick={() => openItem(item)}
            customStyle={{ '--item-index': index }}
            isMissing={!item.in_library}
          />
        );
      })}
    </Grid>
  );
}

export function CollectionItemsSection({ items, navigate, t }) {
  const { visibleItems, cols, handleScroll } = useHorizontalInfiniteScroll({
    items,
    initialLimit: 30,
    step: 20,
    threshold: 300,
  });

  return (
    <section>
      <ScrollRow
        onScroll={handleScroll}
        showArrows={true}
      >
        <HorizontalCollectionItemsList
          items={visibleItems}
          navigate={navigate}
          t={t}
          customStyle={{ '--cols': cols }}
        />
      </ScrollRow>
    </section>
  );
}

