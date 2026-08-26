import { useStatisticsPage } from '../hooks/useStatisticsPage';
import { useLibraryDnaPlot } from '../hooks/useLibraryDnaPlot';
import { isNsfwMode } from '@/stores/useLibraryModeStore';
import { Dna } from '@/ui/icons';
import Inline from '@/ui/Inline';
import Card from '@/ui/Card';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';
import Badge from '@/ui/Badge';
import Tooltip from '@/ui/Tooltip';
import LinearProgress from '@/ui/LinearProgress';
import RadarChart from '@/ui/RadarChart';
import styles from './LibraryInsightsShared.module.css';

export const LibraryDNA = () => {
  const { dnaData, t: T, sessionMode, dnaProgressCount, MIN_DNA_TITLES } = useStatisticsPage();
  const isNsfw = isNsfwMode(sessionMode);

  const plotted = useLibraryDnaPlot(dnaData.nodes);

  const wrapperClass = `${styles['stage-base']} ${styles['dna-stage']} ${!dnaData.hasEnoughData ? styles['ghost'] : ''}`.trim();

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
          {T('statistics.stats.library_dna') || 'Library DNA'}
        </Text>
      </div>

      <div className={wrapperClass}>
        <Inline justify="center" align="center">
          <RadarChart
            nodes={plotted.nodes}
            rings={plotted.rings}
            polygonPoints={plotted.polygonPoints}
          />
        </Inline>

        {dnaData.hasEnoughData && (
          <Stack gap="xs">
            {dnaData.nodes.map((node) => {
              const tooltipContent = T('statistics.stats.items_count_tooltip', { label: node.translatedLabel, count: node.count }) || `${node.translatedLabel}: ${node.count}`;
              return (
                <Tooltip key={node.id} content={tooltipContent} fullWidth delay={200}>
                  <div className={styles['genre-item']}>
                    <Inline
                      gap="md"
                      align="center"
                      justify="between"
                      fullWidth
                    >
                      <Text variant="small" color="primary" weight="bold">
                        {node.translatedLabel}
                      </Text>
                      <Text variant="small" color="accent" weight="extrabold" as="strong">
                        {node.count}
                      </Text>
                    </Inline>
                  </div>
                </Tooltip>
              );
            })}

            {dnaData.otherGenres.length > 0 && (
              <Stack gap="xs">
                <Text variant="caption" color="secondary" weight="extrabold" uppercase as="span">
                  {T('statistics.stats.other_genres') || 'Other Genres'}
                </Text>
                <Inline gap="xs">
                  {dnaData.otherGenres.map((node) => {
                    const tooltipContent = T('statistics.stats.items_count_tooltip', { label: node.translatedLabel, count: node.count }) || `${node.translatedLabel}: ${node.count}`;
                    return (
                      <Tooltip key={`other-${node.id}`} content={tooltipContent} delay={200}>
                        <Badge
                          size="sm"
                          roundness="full"
                          tone="neutral"
                        >
                          {node.translatedLabel} {node.count}
                        </Badge>
                      </Tooltip>
                    );
                  })}
                </Inline>
              </Stack>
            )}
          </Stack>
        )}
      </div>

      {!dnaData.hasEnoughData && (
        <div className={styles['overlay-card']}>
          <Stack align="center" gap="sm">
            <div className={`${styles['overlay-icon-wrapper']} ${styles['overlay-icon-wrapper--dna']}`}>
              <Dna size={24} strokeWidth={2.5} className={styles['overlay-icon-svg']} />
            </div>
            <Text variant="body" color="primary" weight="extrabold" as="h4">
              {T('statistics.stats.dna_overlay_title') || 'Library DNA Blueprint'}
            </Text>
            <Text
              variant="small"
              color="secondary"
              align="center"
              as="p"
              className={styles['overlay-copy']}
            >
              {isNsfw
                ? (T('statistics.stats.dna_overlay_copy_nsfw') || 'Match and organize adult scenes to map your library\'s NSFW genre footprint.')
                : (T('statistics.stats.dna_overlay_copy_sfw') || 'Scan and match SFW movies to reveal your library\'s unique genre DNA blueprint.')}
            </Text>
            <Stack align="center" gap="sm" className={styles['overlay-progress']}>
              <Inline justify="center">
                <Text variant="caption" color="secondary" weight="extrabold" uppercase>
                  {T('statistics.stats.dna_progress_text', { count: dnaProgressCount, limit: MIN_DNA_TITLES }) || `${dnaProgressCount} of ${MIN_DNA_TITLES} titles`}
                </Text>
              </Inline>
              <LinearProgress
                value={(dnaProgressCount / MIN_DNA_TITLES) * 100}
                variant="dna"
              />
            </Stack>
          </Stack>
        </div>
      )}
    </Card>
  );
};
