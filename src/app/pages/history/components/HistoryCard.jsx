import PropTypes from 'prop-types';
import { Calendar, Clock, ChevronDown, ChevronUp, ArrowRight, RotateCcw } from '@/ui/icons';
import Button from '@/ui/Button';
import Tooltip from '@/ui/Tooltip';
import Spinner from '@/ui/Spinner';
import { useTranslation } from '@/providers/LanguageContext';
import Inline from '@/ui/Inline';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';
import Badge from '@/ui/Badge';
import Card from '@/ui/Card';
import { useHistoryCardLogs } from '../hooks/useHistoryCardLogs';
import styles from './HistoryCard.module.css';

export default function HistoryCard({
  batch,
  index,
  isAnyTaskActive,
  isReverting,
  onConfirmUndo,
}) {
  const { t } = useTranslation();

  const {
    isExpanded,
    toggleExpanded,
    isUndone,
    isRevertDisabled,
    icon,
    accentColor,
    canShowDetails,
    logs,
    formattedLogs,
    totalLogs,
    hasLogs,
    isLoadingLogs,
    isLogsError,
    formattedCreatedAt,
    batchIdLabel,
    handleUndo,
  } = useHistoryCardLogs({
    batch,
    isAnyTaskActive,
    isReverting,
    onConfirmUndo,
    t,
  });

  return (
    <Card
      variant="soft"
      padding="default"
      animated
      itemIndex={index}
      data-accent-color={accentColor}
    >
      <Inline align="center" justify="between" fullWidth>
        <Inline align="center" gap="lg" flex={1} className="u-min-w-0">
          <div className={styles['icon-box']}>
            {icon}
          </div>
          <Stack gap="sm" flex={1}>
            <Inline gap="md" align="center">
              {batch.success_count > 0 && (
                <Inline gap="md" align="center">
                  {batch.movie_count > 0 && (
                    <Badge size="sm">
                      <strong>{batch.movie_count}</strong> {t('historyPage.badgeMovies') || 'Movies'}
                    </Badge>
                  )}
                  {batch.episode_count > 0 && (
                    <Badge size="sm">
                      <strong>{batch.episode_count}</strong> {t('historyPage.badgeEpisodes') || 'Episodes'}
                    </Badge>
                  )}
                  {batch.scene_count > 0 && (
                    <Badge size="sm">
                      <strong>{batch.scene_count}</strong> {t('historyPage.badgeScenes') || 'Scenes'}
                    </Badge>
                  )}
                  {batch.video_count > 0 && (
                    <Badge size="sm">
                      <strong>{batch.video_count}</strong> {t('historyPage.badgeVideos') || 'Videos'}
                    </Badge>
                  )}
                  {batch.extra_count > 0 && (
                    <Badge size="sm">
                      <strong>{batch.extra_count}</strong> {t('historyPage.badgeExtras') || 'Extras'}
                    </Badge>
                  )}
                  <Badge family="status" tone="accent" size="sm">
                    <strong>{batch.success_count}</strong> {t('historyPage.statTotal') || 'Total'}
                  </Badge>
                  {batch.undone_count > 0 && batch.remaining_count > 0 && (
                    <>
                      <Badge size="sm">
                        <strong>{batch.undone_count}</strong> {t('historyPage.statReverted') || 'Reverted'}
                      </Badge>
                      <Badge family="status" tone="warning" size="sm">
                        <strong>{batch.remaining_count}</strong> {t('historyPage.statRemaining') || 'Remaining'}
                      </Badge>
                    </>
                  )}
                </Inline>
              )}
              {batch.failed_count > 0 && (
                <Badge family="status" tone="danger" size="sm">
                  <strong>{batch.failed_count}</strong> {t('historyPage.statFailed') || 'Failed'}
                </Badge>
              )}
            </Inline>
            <Inline gap="lg" align="center">
              <Inline gap="xs" align="center">
                <Calendar size={14} className="u-text-muted" />
                <Text variant="small" color="secondary">
                  {formattedCreatedAt}
                </Text>
              </Inline>
              <Inline gap="xs" align="center">
                <Clock size={14} className="u-text-muted" />
                <Text variant="small" color="secondary">
                  {batchIdLabel}
                </Text>
              </Inline>
            </Inline>
          </Stack>
        </Inline>

        <Inline align="center" gap="sm">
          {canShowDetails && (
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleExpanded}
            >
              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              <span>
                {isExpanded ? t('common.hideDetails') || 'Hide Details' : t('common.showDetails') || 'Show Details'}
              </span>
            </Button>
          )}
          <Tooltip
            content={
              isUndone
                ? (t('historyPage.alreadyRevertedTooltip') || 'This batch has already been reverted.')
                : null
            }
            side="left"
          >
            <Button
              variant="secondary"
              size="sm"
              disabled={isRevertDisabled}
              onClick={handleUndo}
              icon={<RotateCcw size={14} />}
            >
              {t('historyPage.revertButton') || 'Revert'}
            </Button>
          </Tooltip>
        </Inline>
      </Inline>

      {isExpanded && canShowDetails && (
        <div className={styles['card-details']}>
          <Inline align="center" justify="between">
            <Text variant="xsmall" weight="bold" color="muted" uppercase letterSpacing="wide">
              {t('historyPage.renamedFilesTitle') || 'Renamed Files:'}
            </Text>
            {totalLogs && totalLogs > logs.length ? (
              <Text variant="xsmall" color="secondary">
                {t('historyPage.logsCount', { defaultValue: '{{current}} / {{total}}', current: logs.length, total: totalLogs })}
              </Text>
            ) : null}
          </Inline>

          {isLoadingLogs ? (
            <Inline align="center" justify="center" padding="md">
              <Spinner size={18} />
            </Inline>
          ) : isLogsError ? (
            <Text variant="small" color="danger">
              {t('historyPage.loadLogsError') || 'Failed to load file details.'}
            </Text>
          ) : !hasLogs ? (
            <Text variant="small" color="muted">
              {t('historyPage.noLogsAvailable') || 'No file details found for this batch.'}
            </Text>
          ) : (
            <div className={styles['scroll-list']}>
              <Stack gap="xs" fullWidth>
                {formattedLogs.map((log) => (
                  <Card
                    key={log.id}
                    variant="subtle"
                    padding="sm"
                  >
                    <Stack gap="xs">
                      <Inline gap="md" align="center" wrap={false} fullWidth>
                        <Stack gap="none" flex={1} className="u-min-w-0">
                          <Text variant="xsmall" color="muted" truncate>
                            {log.oldDir}
                          </Text>
                          <Text variant="small" weight="medium" color="primary" truncate>
                            {log.oldFile}
                          </Text>
                        </Stack>
                        <ArrowRight size={14} className="u-text-muted u-shrink-0" />
                        <Stack gap="none" flex={1} className="u-min-w-0">
                          <Text variant="xsmall" color="muted" truncate>
                            {log.newDir}
                          </Text>
                          <Text variant="small" weight="medium" color="accent" truncate>
                            {log.newFile}
                          </Text>
                        </Stack>
                      </Inline>
                      {log.error_message && (
                        <Text variant="xsmall" color="danger">
                          {log.error_message}
                        </Text>
                      )}
                    </Stack>
                  </Card>
                ))}
              </Stack>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

HistoryCard.propTypes = {
  batch: PropTypes.object.isRequired,
  index: PropTypes.number,
  isAnyTaskActive: PropTypes.bool,
  isReverting: PropTypes.bool,
  onConfirmUndo: PropTypes.func,
};
