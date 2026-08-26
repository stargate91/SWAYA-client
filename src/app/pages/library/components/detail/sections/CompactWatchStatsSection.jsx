import { memo } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronRight } from '@/ui/icons';
import Card from '@/ui/Card';
import Grid from '@/ui/Grid';
import Inline from '@/ui/Inline';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';
import WatchStatsCard from '@/ui/data/WatchStatsCard';
import LinearProgress from '@/ui/LinearProgress';
import Divider from '@/ui/Divider';
import { useWatchStatsViewModel } from '../../../hooks/useWatchStatsViewModel';

function CompactWatchStatsSection({ item, isMovie, isScene, t }) {
  const {
    formattedLogs,
    hasLogs,
    isScrollableHistory,
    isHistoryExpanded,
    toggleHistoryExpanded,
    watchStatus,
    watchCount,
    progressPercent,
    progressText,
    lastWatchedText,
    statusClass,
    watchCountText,
    progressPercentText,
    watchActivityText,
  } = useWatchStatsViewModel({ item, isMovie, isScene, t });

  if (!item) return null;

  return (
    <Card
      variant="glass-shaded"
      headerVariant="shaded"
      padding="md"
      title={t('library.details.watchStats') || 'Watch Stats'}
    >
      <Stack gap="md" fullWidth>
        <Grid variant="three-cols">
          <WatchStatsCard
            label={t('library.details.watchStatus') || 'Status'}
            value={
              <Inline as="span" gap="xs">
                <span className={`status-${statusClass}`}>
                  {watchStatus}
                </span>
                {((isMovie || isScene) && watchCount > 0) && (
                  <Text as="span" color="muted">
                    {watchCountText}
                  </Text>
                )}
              </Inline>
            }
          />

          <WatchStatsCard
            label={t('library.details.movieProgress') || 'Progress'}
          >
            <Inline justify="between" fullWidth className="u-mb-2xs">
              <Text variant="small" weight="semibold">{progressText}</Text>
              <Text variant="small" color="muted">{progressPercentText}</Text>
            </Inline>
            <LinearProgress value={progressPercent} variant="accent" />
          </WatchStatsCard>

          <WatchStatsCard
            label={t('library.details.lastWatched') || 'Last Watched'}
            value={lastWatchedText}
          />
        </Grid>

        {hasLogs && (
          <Stack gap="sm" fullWidth>
            <Divider />
            <Inline
              as="button"
              type="button"
              onClick={toggleHistoryExpanded}
              justify="between"
              align="center"
              fullWidth
              interactive
            >
              <Text variant="small" color="secondary">{watchActivityText}</Text>
              {isHistoryExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </Inline>

            {isHistoryExpanded && (
              <Stack
                gap="xs"
                scrollable={isScrollableHistory}
                maxHeight={isScrollableHistory ? '7.2rem' : undefined}
              >
                {formattedLogs.map((log) => (
                  <Inline
                    key={log.id}
                    justify="between"
                    align="center"
                    fullWidth
                    surface="soft"
                    radius="sm"
                    padding="xs"
                  >
                    <Text variant="small" weight="bold">{log.title}</Text>
                    <Text variant="caption" color="muted">{log.dateText}</Text>
                  </Inline>
                ))}
              </Stack>
            )}
          </Stack>
        )}
      </Stack>
    </Card>
  );
}

CompactWatchStatsSection.propTypes = {
  item: PropTypes.object,
  isMovie: PropTypes.bool,
  isScene: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

export default memo(CompactWatchStatsSection);
