import { ImageOff } from '@/ui/icons';
import EmptyState from '@/ui/EmptyState';
import SelectableCard from '@/ui/SelectableCard';
import Grid from '@/ui/Grid';
import { formatRating } from '@/lib/formatters';
import { pathsMatch } from '@/lib/imageUrls';
import { useUniversalImageGridState } from '../../hooks/useUniversalImageGridState';

export default function UniversalImageGrid({
  itemId,
  mediaType,
  imageType = 'backdrop', // 'backdrop' | 'poster' | 'logo'
  customImages,
  currentPath,
  onSelect,
  isPending,
  pendingPath,
  initialVisibleCount,
  visibleStep,
  t,
  selectedSource,
}) {
  const {
    isLoading,
    images,
    allGridItems,
    gridVariant,
    cardAspect,
    hasMore,
    loadMoreRef,
    handleSelectImage,
    resolveThumbUrl,
  } = useUniversalImageGridState({
    itemId,
    mediaType,
    imageType,
    customImages,
    currentPath,
    onSelect,
    initialVisibleCount,
    visibleStep,
    selectedSource,
  });

  if (isLoading) {
    return (
      <Grid variant={gridVariant}>
        {Array.from({ length: 8 }).map((_, index) => (
          <SelectableCard
            key={`skeleton-${index}`}
            disabled={true}
            aspect={cardAspect}
            variant="picker"
          />
        ))}
      </Grid>
    );
  }

  if (images.length === 0) {
    return (
      <EmptyState
        size="md"
        border="dashed"
        background="translucent"
        iconColor="muted"
        icon={ImageOff}
        className="span-full"
        title={t?.('library.details.noImagesAvailable') || `No ${imageType} options found.`}
      />
    );
  }

  return (
    <>
      <Grid variant={gridVariant}>
        {allGridItems.map((img, idx) => {
          if (img.isDefaultLogo) {
            return (
              <SelectableCard
                key="default-logo"
                selected={pathsMatch(currentPath, 'none') || !currentPath}
                onClick={() => handleSelectImage('none')}
                aspect="logo"
                variant="picker"
                showCheckmark={false}
                alt=" "
                infoLeft={t?.('library.details.defaultText') || 'Default Text'}
                textPreview="Aa"
              />
            );
          }

          const path = img.file_path || img.backdrop_path || img.poster_path || img.logo_path;
          if (!path) return null;

          const thumbUrl = resolveThumbUrl(path);
          const isImagePending = isPending && pendingPath === path;
          const isSelected = pathsMatch(path, currentPath) || isImagePending;

          const infoLeft = img.width && img.height ? `${img.width}×${img.height}` : '';
          const infoRight = img.vote_average ? `★ ${formatRating(img.vote_average)}` : '';

          return (
            <SelectableCard
              key={`${path}-${idx}`}
              imageUrl={thumbUrl}
              alt={`${imageType} ${idx + 1}`}
              selected={isSelected}
              isPending={isImagePending}
              aspect={cardAspect}
              infoLeft={infoLeft}
              infoRight={infoRight}
              variant="picker"
              showCheckmark={false}
              onClick={() => handleSelectImage(path)}
            />
          );
        })}
      </Grid>

      {hasMore && (
        <div ref={loadMoreRef} aria-hidden="true" />
      )}
    </>
  );
}
