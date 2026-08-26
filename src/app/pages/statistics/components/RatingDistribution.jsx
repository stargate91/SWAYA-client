import { useStatisticsPage } from '../hooks/useStatisticsPage';
import SegmentedControl from '@/ui/SegmentedControl';
import Skeleton from '@/ui/Skeleton';
import Card from '@/ui/Card';
import Text from '@/ui/Text';
import Tooltip from '@/ui/Tooltip';
import styles from './RatingDistribution.module.css';

export function RatingDistribution() {
  const {
    ratingsState,
    t,
    distTabs,
    effectiveDistTab,
    setDistTab,
    activeDistStats,
  } = useStatisticsPage();

  const rows = activeDistStats?.distributionRows || [];

  if (ratingsState.isStatsLoading) {
    return (
      <Card
        variant="flat-glass"
        padding="md"
        divider
        eyebrow={t('statistics.ratings.distribution', { defaultValue: 'Rating Distribution' })}
      >
        <div className={styles.histogram}>
          {Array.from({ length: 10 }).map((_, idx) => (
            <div key={`skeleton-${idx}`} className={styles.column}>
              <Skeleton width="100%" height="100%" variant="rect" />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card
      variant="flat-glass"
      padding="md"
      divider
      eyebrow={t('statistics.ratings.distribution', { defaultValue: 'Rating Distribution' })}
      actions={
        <SegmentedControl
          options={distTabs}
          value={effectiveDistTab}
          onChange={setDistTab}
          variant="filter"
        />
      }
    >
      <div key={effectiveDistTab} className={styles.histogram}>
        {rows.map((row, index) => {
          const hasCount = (row.count || 0) > 0;
          const heightPercent = hasCount ? Math.max(8, row.percentage) : 0;
          const tooltipContent = `${row.ratingLabel} • ${row.count} ${t('statistics.ratings.rated', { defaultValue: 'items' })}`;

          return (
            <div
              key={row.ratingLabel || index}
              className={styles.column}
              /* eslint-disable-next-line react/forbid-dom-props */
              style={{ '--col-index': index }}
            >
              <Text
                variant="xsmall"
                color="muted"
                weight="medium"
                tabular
                align="center"
              >
                {hasCount ? row.count : '\u00A0'}
              </Text>
              <Tooltip
                content={tooltipContent}
                side="top"
                triggerClassName={styles['bar-tooltip-trigger']}
                fullWidth
              >
                <div className={styles['bar-track']}>
                  <div
                    className={styles['bar-fill']}
                    /* eslint-disable-next-line react/forbid-dom-props */
                    style={{ height: `${heightPercent}%` }}
                    data-has-count={hasCount ? 'true' : undefined}
                  />
                </div>
              </Tooltip>
              <Text
                variant="xsmall"
                color="secondary"
                weight="semibold"
                tabular
                align="center"
              >
                {row.ratingLabel}
              </Text>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
