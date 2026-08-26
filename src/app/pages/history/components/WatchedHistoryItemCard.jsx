import Button from '@/ui/Button';
import Spinner from '@/ui/Spinner';
import { Clock, CheckCircle2, RotateCcw, Play, ENTITY_ICONS } from '@/ui/icons';
import Inline from '@/ui/Inline';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';
import Badge from '@/ui/Badge';
import Card from '@/ui/Card';
import LinearProgress from '@/ui/LinearProgress';
import { useWatchedHistoryItem } from '../hooks/useWatchedHistoryItem';
import styles from './HistoryList.module.css';

const LPAR = '(';
const RPAR = ')';
const PERCENT = '%';
const SLASH = ' / ';

export default function WatchedHistoryItemCard({
  log,
  index,
  playMutation,
  handlePlay,
  onTitleClick,
  t,
}) {
  const {
    isSingle,
    isScene,
    posterUrl,
    percent,
    displayTitle,
    formattedWatchedAt,
    formattedResumeTime,
    formattedDuration,
    isMutationPending,
    isPlayDisabled,
    playButtonLabel,
    handlePlayItem,
    handleTitleClick,
    showProgress,
    progressVariant,
  } = useWatchedHistoryItem({
    log,
    playMutation,
    handlePlay,
    onTitleClick,
    t,
  });

  return (
    <Card
      key={log.id}
      variant="soft"
      padding="md"
      animated
      itemIndex={index}
      className={log.is_active ? styles['card-active'] : ''}
    >
      <Inline align="center" justify="between" wrap fullWidth gap="md">
        <Inline align="center" gap="md" flex={1} className="u-min-w-0">
          <button
            type="button"
            className={`${styles['poster-wrapper']} ${isScene ? styles['is-scene'] : ''}`}
            onClick={handleTitleClick}
            aria-label={displayTitle || 'View item'}
          >
            {posterUrl ? (
              <img
                src={posterUrl}
                alt=""
                loading="lazy"
                decoding="async"
                className={styles['poster-image']}
                onError={(e) => console.error('History image failed:', { src: posterUrl, log, e })}
              />
            ) : (
              <Inline justify="center" align="center" fullWidth fullHeight className="u-text-muted">
                {isScene ? (
                  <ENTITY_ICONS.episode size={18} />
                ) : isSingle ? (
                  <ENTITY_ICONS.movie size={18} />
                ) : (
                  <ENTITY_ICONS.tv size={18} />
                )}
              </Inline>
            )}
          </button>

          <Stack gap="sm" flex={1} className="u-min-w-0">
            <Inline gap="sm" align="baseline">
              <Text
                variant="body"
                weight="semibold"
                truncate
                color="primary"
                className={styles['title-link']}
                onClick={handleTitleClick}
              >
                {displayTitle}
              </Text>
              {log.year && (
                <Text variant="small" color="muted">
                  {LPAR}{log.year}{RPAR}
                </Text>
              )}
            </Inline>

            <Inline gap="lg" align="center">
              <Inline gap="xs" align="center">
                <Clock size={12} className="u-text-muted" />
                <Text variant="small" color="muted">
                  {formattedWatchedAt}
                </Text>
              </Inline>

              {log.is_watched ? (
                <Badge family="status" tone="success" size="sm" leftIcon={<CheckCircle2 size={12} />}>
                  {t('historyPage.watchedStatus') || 'Watched'}
                </Badge>
              ) : log.is_active ? (
                <Inline gap="xs" align="center">
                  {log.is_active && <span className={styles['pulse-dot']} />}
                  <Text variant="small" color="accent" weight="bold">
                    {percent}{PERCENT}
                  </Text>
                  <Text variant="small" color="secondary">
                    {LPAR}{formattedResumeTime}{SLASH}{formattedDuration}{RPAR}
                  </Text>
                </Inline>
              ) : (
                percent > 0 && (
                  <Inline gap="xs" align="center">
                    <Text variant="small" color="accent" weight="bold">
                      {percent}{PERCENT}
                    </Text>
                    <Text variant="small" color="muted">
                      {LPAR}{formattedResumeTime}{SLASH}{formattedDuration}{RPAR}
                    </Text>
                  </Inline>
                )
              )}
            </Inline>

            {showProgress && (
              <LinearProgress
                value={percent}
                variant={progressVariant}
                className={styles['progress-bar']}
              />
            )}
          </Stack>
        </Inline>

        <Inline align="center" className={styles['actions-group']}>
          <Button
            variant="secondary"
            size="sm"
            onClick={handlePlayItem}
            disabled={isPlayDisabled}
            icon={
              isMutationPending ? (
                <Spinner size={14} />
              ) : log.is_active ? (
                null
              ) : log.is_watched ? (
                <RotateCcw size={14} />
              ) : (
                <Play size={14} />
              )
            }
          >
            {playButtonLabel}
          </Button>
        </Inline>
      </Inline>
    </Card>
  );
}
