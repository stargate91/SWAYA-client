import Page from '@/ui/Page';
import Skeleton from '@/ui/Skeleton';
import Stack from '@/ui/Stack';
import Inline from '@/ui/Inline';
import Grid from '@/ui/Grid';
import ScrollRow from '@/ui/ScrollRow';
import HeroSection from './HeroSection';
import UtilityBarPortal from '@/ui/UtilityBarPortal';
import styles from './DetailPageShell.module.css';

export default function DetailPageShell({
  children,
  backdropUrl,
  fallbackUrl,
  isLoading = false,
  topRightControls,
  pageClassName = '',
  isScene = false,
  isFallback,
  containerRef,
  isPreviewPlaying,
  previewSrc,
  isPeople = false,
  isScrolled = false,
  isDrawerOpen = false,
  onVideoPlayingChange,
}) {

  const combinedClassName = `${styles.page} ${isScene ? styles['page-scene'] : ''} ${pageClassName}`.trim();

  if (isLoading) {
    /* eslint-disable react/forbid-component-props, react/forbid-dom-props */
    if (isPeople) {
      return (
        <Page variant="viewport-flush" className={`${combinedClassName} entity-detail-page--people`}>
          <div className={styles['layout-wrapper']}>
            <div className={`${styles.container} media-detail-page__container`}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(15rem, 20.625rem) minmax(0, 1fr)',
                  gap: 'var(--space-2xl)',
                  width: '100%',
                  height: '100%',
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                }}
              >
                {/* Left Sidebar Panel Skeleton */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: '1fr auto',
                    gap: 'var(--space-lg)',
                    padding: 'var(--space-lg)',
                    borderRadius: 'var(--radius-xl)',
                    background: 'color-mix(in srgb, var(--color-panel-translucent) 65%, transparent)',
                    border: '0.0625rem solid color-mix(in srgb, var(--color-border-default) 40%, transparent)',
                    boxShadow: '0 1rem 2.5rem color-mix(in srgb, var(--color-bg-canvas) 30%, transparent)',
                    height: '100%',
                    boxSizing: 'border-box',
                  }}
                >
                  {/* Top section: Title, Subtitle, Profile photo */}
                  <Stack gap="md" fullWidth fill>
                    <Stack gap="2xs" fullWidth>
                      <Skeleton width="80%" height="1.5rem" variant="text" />
                      <Skeleton width="60%" height="0.875rem" variant="text" />
                    </Stack>

                    <Skeleton
                      width="100%"
                      height="100%"
                      variant="rect"
                      style={{ flex: 1, borderRadius: 'var(--radius-lg)' }}
                    />
                  </Stack>

                  {/* Bottom section: Actions, Rating, Info grid, Bio button */}
                  <Stack gap="sm" fullWidth>
                    <Inline gap="sm" fullWidth>
                      <Skeleton height="2.25rem" variant="rect" style={{ flex: 1, borderRadius: 'var(--radius-sm)' }} />
                      <Skeleton height="2.25rem" variant="rect" style={{ flex: 1, borderRadius: 'var(--radius-sm)' }} />
                      <Skeleton height="2.25rem" variant="rect" style={{ flex: 1, borderRadius: 'var(--radius-sm)' }} />
                    </Inline>

                    <Skeleton width="100%" height="0.75rem" variant="rect" style={{ borderRadius: 'var(--radius-xs)' }} />

                    {/* Info grid skeleton card */}
                    <div
                      style={{
                        position: 'relative',
                        top: '-0.75rem',
                        marginBottom: '-0.75rem',
                        background: 'color-mix(in srgb, var(--color-text-primary) 3%, transparent)',
                        border: '0.0625rem solid color-mix(in srgb, var(--color-text-primary) 8%, transparent)',
                        borderRadius: 'var(--radius-sm)',
                        padding: 'var(--space-sm)',
                        boxSizing: 'border-box',
                        width: '100%',
                      }}
                    >
                      <Grid variant="two-cols" gap="md">
                        <Stack gap="2xs">
                          <Skeleton width="50%" height="0.625rem" variant="text" />
                          <Skeleton width="80%" height="0.875rem" variant="text" />
                        </Stack>
                        <Stack gap="2xs">
                          <Skeleton width="50%" height="0.625rem" variant="text" />
                          <Skeleton width="80%" height="0.875rem" variant="text" />
                        </Stack>
                        <Stack gap="2xs">
                          <Skeleton width="50%" height="0.625rem" variant="text" />
                          <Skeleton width="80%" height="0.875rem" variant="text" />
                        </Stack>
                        <Stack gap="2xs">
                          <Skeleton width="50%" height="0.625rem" variant="text" />
                          <Skeleton width="80%" height="0.875rem" variant="text" />
                        </Stack>
                      </Grid>
                    </div>

                    <Skeleton width="100%" height="2.25rem" variant="rect" style={{ borderRadius: 'var(--radius-md)' }} />
                  </Stack>
                </div>

                {/* Right side area: Known For horizontal cards list */}
                <Stack justify="end" fullHeight fullWidth fill style={{ paddingBottom: 'var(--space-lg)' }}>
                  <Stack gap="md" fullWidth>
                    {/* Title: KNOWN FOR */}
                    <Skeleton width="7.5rem" height="1.125rem" variant="text" />

                    {/* Horizontal row of cards */}
                    <ScrollRow>
                      {Array.from({ length: 8 }).map((_, idx) => (
                        <Stack key={idx} gap="sm" style={{ width: '7.5rem', flexShrink: 0 }}>
                          <Skeleton width="100%" height="11.25rem" variant="rect" style={{ borderRadius: 'var(--radius-md)' }} />
                          <Skeleton width="90%" height="0.75rem" variant="text" />
                          <Skeleton width="60%" height="0.625rem" variant="text" />
                        </Stack>
                      ))}
                    </ScrollRow>
                  </Stack>
                </Stack>
              </div>
            </div>
          </div>
        </Page>
      );
    }

    return (
      <Page variant="viewport-flush" className={combinedClassName}>
        <div className={styles['layout-wrapper']}>
          <div className={`${styles.container} media-detail-page__container`}>
            <Stack gap="xl" fullWidth>
              <Skeleton.Banner style={{ height: '23.75rem', borderRadius: 'var(--radius-3xl)' }} />
              <Stack gap="lg">
                <Skeleton.Title width="18.75rem" />
                <Inline gap="md">
                  <Skeleton width="5rem" height="1.25rem" variant="text" />
                  <Skeleton width="7.5rem" height="1.25rem" variant="text" />
                  <Skeleton width="3.75rem" height="1.25rem" variant="text" />
                </Inline>
                <Stack gap="md" style={{ marginTop: 'var(--space-lg)' }}>
                  <Skeleton width="100%" height="1.125rem" variant="text" />
                  <Skeleton width="95%" height="1.125rem" variant="text" />
                  <Skeleton width="60%" height="1.125rem" variant="text" />
                </Stack>
              </Stack>
            </Stack>
          </div>
        </div>
      </Page>
    );
    /* eslint-enable react/forbid-component-props, react/forbid-dom-props */
  }

  return (
    <Page
      variant="viewport-flush"
      backdrop={
        <HeroSection
          backdropUrl={backdropUrl || fallbackUrl}
          isFallback={isFallback !== undefined ? isFallback : (!backdropUrl && !isScene)}
          isPreviewPlaying={isPreviewPlaying}
          previewSrc={previewSrc}
          onPlayingChange={onVideoPlayingChange}
        />
      }
      className={combinedClassName}
      data-scrolled={isScrolled}
      data-preview-playing={isPreviewPlaying}
      data-drawer-open={isDrawerOpen}
    >

      {topRightControls && (
        <UtilityBarPortal align="right">
          <div className={styles['top-right-controls']}>
            {topRightControls}
          </div>
        </UtilityBarPortal>
      )}

      <div className={styles['layout-wrapper']}>
        <div
          ref={containerRef}
          className={`${styles.container} media-detail-page__container`}
        >
          {children}
        </div>
      </div>
    </Page>
  );
}
