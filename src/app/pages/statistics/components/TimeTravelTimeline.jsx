import { useStatisticsPage } from '../hooks/useStatisticsPage';
import { isNsfwMode } from '@/stores/useLibraryModeStore';
import { Clock } from '@/ui/icons';
import Inline from '@/ui/Inline';
import Card from '@/ui/Card';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';
import LinearProgress from '@/ui/LinearProgress';
import BarChart from '@/ui/BarChart';
import styles from './LibraryInsightsShared.module.css';

export const TimeTravelTimeline = () => {
  const { timelineData, t: T, sessionMode, timelineProgressCount, MIN_TIMELINE_TITLES } = useStatisticsPage();
  const isNsfw = isNsfwMode(sessionMode);

  const wrapperClass = `${styles['stage-base']} ${styles['timeline-stage']} ${!timelineData.hasEnoughData ? styles['ghost'] : ''}`.trim();

  return (
    <Card
      variant="flat-glass"
      padding="none"
      glowBlob={true}
      flex={1}
      className={styles['insights-panel']}
    >
      <div className={styles['panel-header']}>
        <Text variant="title" color="primary" weight="extrabold" as="h3">
          {T('statistics.stats.timeline') || 'Time Travel'}
        </Text>
      </div>

      {timelineData.hasEnoughData && (
        <div className={styles['timeline-top-decade']}>
          <Text variant="body" color="accent" weight="semibold" as="p">
            {T('statistics.stats.top_decade', { decade: timelineData.topDecadeLabel }) || `Most files are from the ${timelineData.topDecadeLabel}`}
          </Text>
        </div>
      )}

      <div className={wrapperClass}>
        <BarChart
          sortedData={timelineData.sorted}
          maxCount={timelineData.maxCount}
          T={T}
          formatDecade={timelineData.formatDecade}
        />
      </div>

      {!timelineData.hasEnoughData && (
        <div className={styles['overlay-card']}>
          <Stack align="center" gap="sm">
            <div className={`${styles['overlay-icon-wrapper']} ${styles['overlay-icon-wrapper--timeline']}`}>
              <Clock size={24} strokeWidth={2.5} className={styles['overlay-icon-svg']} />
            </div>
            <Text variant="body" color="primary" weight="extrabold" as="h4">
              {T('statistics.stats.timeline_overlay_title') || 'Time-Travel Timeline'}
            </Text>
            <Text
              variant="small"
              color="secondary"
              align="center"
              as="p"
              className={styles['overlay-copy']}
            >
              {isNsfw
                ? (T('statistics.stats.timeline_overlay_copy_nsfw') || 'Match more adult scenes to build a chronological timeline of your collection.')
                : (T('statistics.stats.timeline_overlay_copy_sfw') || 'Add more movies to map your collection across the history of cinema.')}
            </Text>
            <Stack align="center" gap="sm" className={styles['overlay-progress']}>
              <Inline justify="center">
                <Text variant="caption" color="secondary" weight="extrabold" uppercase>
                  {T('statistics.stats.timeline_progress_text', { count: timelineProgressCount, limit: MIN_TIMELINE_TITLES }) || `${timelineProgressCount} of ${MIN_TIMELINE_TITLES} items`}
                </Text>
              </Inline>
              <LinearProgress
                value={(timelineProgressCount / MIN_TIMELINE_TITLES) * 100}
                variant="timeline"
              />
            </Stack>
          </Stack>
        </div>
      )}
    </Card>
  );
};
