import PropTypes from 'prop-types';
import Button from '@/ui/Button';
import { Droplets, Clock, Play, Loader2 } from '@/ui/icons';
import Card from '@/ui/Card';
import Inline from '@/ui/Inline';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';
import Badge from '@/ui/Badge';
import { usePeaksHistoryItem } from '../hooks/usePeaksHistoryItem';
import styles from './HistoryList.module.css';

export default function PeaksHistoryItemCard({
  log,
  index,
  playMutation,
  handlePlayMoment,
  setLightboxImage,
  onTitleClick,
  t,
}) {
  const {
    snapshotUrl,
    posterUrl,
    peakText,
    formattedCreatedAt,
    isMutationPending,
    handlePlay,
    handleImageClick,
    handleTitleClick,
  } = usePeaksHistoryItem({
    log,
    playMutation,
    handlePlayMoment,
    setLightboxImage,
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
    >
      <Inline align="center" justify="between" wrap fullWidth gap="md">
        <Inline align="center" gap="md" flex={1} className="u-min-w-0">
          <div className={`${styles['poster-wrapper']} ${styles['is-scene']}`}>
            {posterUrl ? (
              <img
                src={posterUrl}
                alt=""
                loading="lazy"
                decoding="async"
                className={snapshotUrl ? `${styles['poster-image']} ${styles['poster-image--zoomable']}` : styles['poster-image']}
                onClick={handleImageClick}
              />
            ) : (
              <Inline justify="center" align="center" fullWidth fullHeight className="u-text-muted">
                <Droplets size={18} color="var(--color-state-danger)" />
              </Inline>
            )}
          </div>

          <Stack gap="sm" flex={1} className="u-min-w-0">
            <Text
              as="h3"
              variant="small"
              weight="semibold"
              color="primary"
              className={styles['title-link']}
              truncate
              onClick={handleTitleClick}
            >
              {log.title}
            </Text>

            <Inline gap="lg" align="center">
              <Inline gap="xs" align="center">
                <Clock size={12} className="u-text-muted" />
                <Text variant="small" color="muted">
                  {formattedCreatedAt}
                </Text>
              </Inline>

              <Badge family="status" tone="danger" size="sm" leftIcon={<Droplets size={12} fill="currentColor" />}>
                {peakText}
              </Badge>
            </Inline>
          </Stack>
        </Inline>

        <Inline align="center" className={styles['actions-group']}>
          <Button
            variant="secondary"
            size="sm"
            onClick={handlePlay}
            disabled={isMutationPending}
            icon={
              isMutationPending ? (
                <Loader2 className="spinner" size={14} />
              ) : (
                <Play size={14} />
              )
            }
          >
            {t('historyPage.playMoment', { defaultValue: 'Play Moment' })}
          </Button>
        </Inline>
      </Inline>
    </Card>
  );
}

PeaksHistoryItemCard.propTypes = {
  log: PropTypes.object.isRequired,
  index: PropTypes.number,
  playMutation: PropTypes.object,
  handlePlayMoment: PropTypes.func,
  setLightboxImage: PropTypes.func,
  onTitleClick: PropTypes.func,
  t: PropTypes.func,
};
