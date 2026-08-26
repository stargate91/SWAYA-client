import PropTypes from 'prop-types';
import Pill from '@/ui/Pill';
import Lightbox from '@/ui/Lightbox';
import Grid from '@/ui/Grid';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';
import SectionHeader from '@/ui/SectionHeader';
import { OverviewContent } from './EntityDetailSections';
import EditableMediaCard from './EditableMediaCard';
import EntityDetailDrawer from './EntityDetailDrawer';
import Inline from '@/ui/Inline';
import { useMovieCollectionHero } from '../../hooks/useMovieCollectionHero';

export default function MovieCollectionHeroSection({
  item,
  mediaUrl,
  overviewText,
  overviewTitle,
  metaPills = [],
  t,
  onMediaCardClick,
  isDrawerOpen,
  setIsDrawerOpen,
}) {
  const {
    displayTitle,
    resolvedMetaPills,
    lightboxUrl,
    handleOpenOriginalImage,
    handleCloseLightbox,
  } = useMovieCollectionHero({
    item,
    mediaUrl,
    metaPills,
    t,
  });

  return (
    <>
      <Grid as="section" variant="hero-detail">
        <EditableMediaCard
          mediaUrl={mediaUrl}
          onClick={handleOpenOriginalImage}
          onEditClick={onMediaCardClick}
          editTitle={t('library.details.changePoster') || 'Change Poster'}
          viewOriginalTitle={t('library.details.viewOriginalImage') || 'View Original Image'}
          type="poster"
        />

        {/* eslint-disable-next-line react/forbid-component-props */}
        <Stack gap="xl" style={{ maxWidth: '35rem' }}>
          <Stack gap="md">
            <Text as="h1" variant="display" color="primary" weight="bold" uppercase truncate>
              {displayTitle}
            </Text>
            {resolvedMetaPills.length > 0 && (
              <Inline gap="md" fullWidth>
                {resolvedMetaPills.map((metaItem) => (
                  <Pill key={metaItem.key} variant="meta" icon={metaItem.icon}>
                    {metaItem.content}
                  </Pill>
                ))}
              </Inline>
            )}
          </Stack>

          {overviewText && (
            <Stack gap="sm">
              {overviewTitle && (
                <SectionHeader title={overviewTitle} as="h3" />
              )}
              <OverviewContent
                text={overviewText}
                t={t}
                openDrawer={() => setIsDrawerOpen(true)}
                clamp={10}
              />
            </Stack>
          )}
        </Stack>
      </Grid>

      <EntityDetailDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        item={item || {}}
        overviewTitle={overviewTitle}
        drawerAliases={[]}
        overviewText={overviewText}
        t={t}
      />

      {lightboxUrl && (
        <Lightbox
          imageUrl={lightboxUrl}
          onClose={handleCloseLightbox}
          t={t}
        />
      )}
    </>
  );
}

MovieCollectionHeroSection.propTypes = {
  item: PropTypes.object,
  mediaUrl: PropTypes.string,
  overviewText: PropTypes.string,
  overviewTitle: PropTypes.string,
  metaPills: PropTypes.array,
  t: PropTypes.func,
  onMediaCardClick: PropTypes.func,
  isDrawerOpen: PropTypes.bool,
  setIsDrawerOpen: PropTypes.func,
};

