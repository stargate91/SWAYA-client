import VirtualGrid from '@/ui/VirtualGrid';
import PosterCard from '@/ui/PosterCard';
import AdultOverlay from '@/ui/AdultOverlay';
import Button from '@/ui/Button';
import Spinner from '@/ui/Spinner';
import Stack from '@/ui/Stack';
import Inline from '@/ui/Inline';
import Divider from '@/ui/Divider';

export default function SearchResults({
  filteredResults,
  urlType,
  FallbackIcon,
  handleCardClick,
  hasMorePages,
  setLoadedPage,
  isMoreLoading,
  t,
}) {
  const isStudioSearch = urlType === 'studio' || urlType === 'company' || urlType === 'network';
  const isSceneSearch = urlType === 'scene';
  const gridVariant = isStudioSearch ? 'logo' : (isSceneSearch ? 'scene' : 'poster');

  return (
    <>
      <VirtualGrid
        items={filteredResults}
        variant={gridVariant}
        scrollSelector=".shell__content"
        renderItem={({ raw, entity }, idx) => {
          if (!entity) return null;

          return (
            <PosterCard
              key={`${raw.id}-${raw.media_type}-${idx}`}
              size={entity.cardSize}
              aspect={entity.aspect}
              title={entity.title}
              subtitle={entity.subtitle}
              date={entity.date}
              performers={entity.performers}
              imageUrl={entity.imageUrl}
              icon={FallbackIcon}
              onClick={() => handleCardClick(raw)}
              overlay={entity.shouldBlur ? <AdultOverlay variant="obscure" /> : null}
            />
          );
        }}
      />

      {hasMorePages && (
        <Stack gap="lg" fullWidth>
          <Divider />
          <Inline justify="center" fullWidth>
            {isMoreLoading ? (
              <Spinner label={t('common.loading') || 'Loading...'} />
            ) : (
              <Button
                variant="secondary-neutral"
                onClick={() => setLoadedPage((prev) => prev + 1)}
              >
                {t('search.moreMatches', {
                  count: 20,
                  defaultValue: 'Load More Results (+20)'
                })}
              </Button>
            )}
          </Inline>
        </Stack>
      )}
    </>
  );
}
