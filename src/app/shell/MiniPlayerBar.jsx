import { Play, Pause, Maximize2, X } from '@/ui/icons';
import Inline from '@/ui/Inline';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';
import LinearProgress from '@/ui/LinearProgress';
import IconButton from '@/ui/IconButton';
import { useMiniPlayerBar } from './useMiniPlayerBar';
import styles from './MiniPlayerBar.module.css';

export default function MiniPlayerBar() {
  const {
    isVisible,
    title,
    formattedTime,
    progressPercent,
    isPaused,
    togglePlay,
    restore,
    closePlayer,
  } = useMiniPlayerBar();

  if (!isVisible) {
    return null;
  }

  return (
    <Stack gap="sm" className={styles['player-control-bar']}>
      <Inline justify="between" align="center" gap="md">
        <Text variant="small" weight="medium" truncate color="ink" className={styles.title}>
          {title}
        </Text>
        <Text variant="xsmall" tabular className={styles.time}>
          {formattedTime}
        </Text>
      </Inline>

      <LinearProgress value={progressPercent} variant="accent" size="xs" flat />

      <Inline gap="sm" align="center" justify="end">
        <IconButton
          variant="primary"
          size="sm"
          onClick={togglePlay}
        >
          {isPaused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}
        </IconButton>

        <IconButton
          variant="secondary-neutral"
          size="sm"
          onClick={restore}
        >
          <Maximize2 size={16} />
        </IconButton>

        <IconButton
          variant="secondary-neutral"
          size="sm"
          className={styles['btn-close']}
          onClick={closePlayer}
        >
          <X size={16} />
        </IconButton>
      </Inline>
    </Stack>
  );
}
