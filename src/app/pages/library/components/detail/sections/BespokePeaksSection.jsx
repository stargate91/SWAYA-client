import { memo } from 'react';
import { Droplets, X } from '@/ui/icons';
import { useMediaDetailContext } from '../MediaDetailContext';
import { usePeaksSection } from '../../../hooks/usePeaksSection';
import Inline from '@/ui/Inline';
import Card from '@/ui/Card';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';
import IconButton from '@/ui/IconButton';
import Tooltip from '@/ui/Tooltip';
import { formatTime, formatDate, formatEpisodeCode } from '@/lib/formatters';

const LPAR = '(';
const RPAR = ')';

function BespokePeaksSection() {
  const { state, mutations, t } = useMediaDetailContext();
  const { item, cleanId, effectiveId, isOwned, isMovie, isScene } = state;

  const {
    peaks,
    peaksCount,
    shouldRender,
    handleDeletePeak,
    handlePlayMedia,
    isDeletePending,
  } = usePeaksSection({
    item,
    cleanId,
    effectiveId,
    isOwned,
    isMovie,
    isScene,
    mutations,
  });

  if (!shouldRender) {
    return null;
  }

  const titleContent = (
    <Inline gap="sm" align="center">
      <Droplets size={12} color="var(--color-state-danger)" />
      <span>
        {t('library.details.peaksTitle') || 'Peak Moments'} {LPAR}{peaksCount}{RPAR}
      </span>
    </Inline>
  );

  return (
    <Card
      variant="glass-shaded"
      headerVariant="shaded"
      padding="md"
      title={titleContent}
    >
      <Stack gap="sm" fullWidth className="bespoke-peaks-section-body">
        {peaks.length > 0 ? (
          <Stack
            gap="2xs"
            scrollable
            maxHeight="11rem"
            fullWidth
          >
            {peaks.map((log, index) => {
              const hasPosition = log.video_position != null && log.video_position > 0;
              const isPlayable = hasPosition;

              return (
                <Inline
                  fullWidth
                  justify="between"
                  align="center"
                  key={log.id || index}
                  surface="card"
                  radius="sm"
                  padding="xs"
                  interactive={isPlayable}
                  onClick={isPlayable ? () => handlePlayMedia(log) : undefined}
                  role={isPlayable ? 'button' : undefined}
                  tabIndex={isPlayable ? 0 : undefined}
                  onKeyDown={isPlayable ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handlePlayMedia(log);
                    }
                  } : undefined}
                  title={isPlayable ? (t('library.details.playVideo') || 'Play Video') : undefined}
                >
                  <Inline gap="xs" align="center">
                    <Droplets size={11} color="var(--color-state-danger)" />
                    <Inline gap="2xs" align="center">
                      {log.season_number != null && log.episode_number != null && (
                        <Text as="span" color="muted">
                          {formatEpisodeCode(log.season_number, log.episode_number)}
                        </Text>
                      )}
                      <Text variant="small" weight="semibold">
                        {hasPosition ? formatTime(log.video_position) : (t('library.details.playSession') || 'Play Session')}
                      </Text>
                    </Inline>
                  </Inline>

                  <Inline gap="sm" align="center">
                    <Text color="muted" variant="xsmall">
                      {formatDate(log.watched_at)}
                    </Text>
                    <Tooltip content={log.isOptimistic ? (t('library.details.savingPeak') || 'Saving Finish...') : (t('library.details.deletePeakBtn') || 'Delete Peak')} side="top">
                      <IconButton
                        variant="ghost"
                        size="xs"
                        destructiveHover
                        onClick={(e) => handleDeletePeak(e, log)}
                        disabled={isDeletePending || log.isOptimistic}
                        title={null}
                      >
                        <X size={14} />
                      </IconButton>
                    </Tooltip>
                  </Inline>
                </Inline>
              );
            })}
          </Stack>
        ) : (
          <Text variant="small" color="muted" italic>
            {t('library.details.noPeaks') || 'No peak moments recorded yet.'}
          </Text>
        )}
      </Stack>
    </Card>
  );
}

export default memo(BespokePeaksSection);
