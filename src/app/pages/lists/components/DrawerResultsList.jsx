import { Loader2, ENTITY_ICONS } from '@/ui/icons';
import CompactCard from '@/ui/CompactCard';
import Skeleton from '@/ui/Skeleton';
import Stack from '@/ui/Stack';
import Inline from '@/ui/Inline';
import Text from '@/ui/Text';
import ResultAddButton from './ResultAddButton';
import { resolveMediaImageUrl } from '@/lib/imageUrls';
import { normalizeMediaEntity } from '@/lib/normalizeMediaEntity';
import { useDrawerResultsState } from '../hooks/useDrawerResultsState';

export default function DrawerResultsList({
  searching,
  loadingMore,
  results = [],
  filteredResults = [],
  query,
  isAdded,
  listType,
  mediaType,
  skeletonAspect = 'poster',
  t,
  handleScroll,
  handleAdd,
  handleRemove,
}) {
  const { sessionMode, settings } = useDrawerResultsState();

  return (
    <Stack flex={1} scrollable gap="xs" padding="lg" onScroll={handleScroll}>
      {searching && (
        Array.from({ length: 6 }).map((_, idx) => (
          <Skeleton.CompactCard key={idx} aspect={skeletonAspect} />
        ))
      )}

      {!searching && results.length === 0 && query && (
        <Inline justify="center" align="center" padding="2xl">
          <Text color="secondary" size="2xs">
            {t('common.noResults', { defaultValue: 'No results found.' })}
          </Text>
        </Inline>
      )}

      {!searching && results.length > 0 && filteredResults.length === 0 && (
        <Inline justify="center" align="center" padding="2xl">
          <Text color="secondary" size="2xs">
            {t('lists.no_status_match', { defaultValue: 'No items match the selected status filter.' })}
          </Text>
        </Inline>
      )}

      {!searching && filteredResults.map((item) => {
        const added = isAdded(item);
        const n = normalizeMediaEntity(item, { context: 'drawer', sessionMode, settings });
        const itemIsScene = item.media_type === 'scene' || mediaType === 'scene' || item.media_type === 'video' || mediaType === 'video' || item.media_type === 'videos' || mediaType === 'videos';
        const poster = itemIsScene ? (item.backdrop_path || item.poster_path) : (item.poster_path || item.profile_path);
        const resolvedImage = resolveMediaImageUrl(poster, itemIsScene ? 'stillThumb' : 'posterThumb');

        const FallbackIcon = listType === 'person' ? ENTITY_ICONS.performer : (itemIsScene ? ENTITY_ICONS.scene : ENTITY_ICONS.movie);
        const cardAspect = listType === 'person' ? 'circle' : (itemIsScene ? 'landscape' : 'poster');

        const rightAction = (
          <ResultAddButton
            added={added}
            onAdd={() => handleAdd(item)}
            onRemove={() => handleRemove(item)}
            t={t}
          />
        );

        return (
          <CompactCard
            key={item.id || item.tmdb_id || item.title}
            aspect={cardAspect}
            imageUrl={resolvedImage}
            fallbackIcon={FallbackIcon}
            title={n.title}
            meta={n.subtitle}
            rightElement={rightAction}
          />
        );
      })}

      {loadingMore && (
        <Inline justify="center" align="center" padding="md">
          <Loader2 size={16} className="u-spin" />
        </Inline>
      )}
    </Stack>
  );
}
