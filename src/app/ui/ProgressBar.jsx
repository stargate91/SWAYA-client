import PropTypes from 'prop-types';
import { X } from '@/ui/icons';
import IconButton from './IconButton';
import Tooltip from './Tooltip';
import LinearProgress from './LinearProgress';
import styles from './ProgressBar.module.css';

export default function ProgressBar({
  taskName,
  progress = 0,
  timeRemaining = '--:--',
  active = true,
  variant = 'primary',
  onAbort,
}) {
  const isSub = variant === 'sub';
  const containerClass = `${styles.container} ${isSub ? styles['container--sub'] : ''}`.trim();
  const dotClass = `${styles['pulse-dot']} ${isSub ? styles['pulse-dot--sub'] : ''}`.trim();

  return (
    <div className={containerClass}>
      {active && <span className={dotClass} />}
      <span className={styles.text}>
        {taskName}
      </span>
      <LinearProgress
        value={progress}
        variant={isSub ? 'sub' : 'blue'}
        className={styles['progress-line']}
      />
      <span className={styles.stats}>
        {/* eslint-disable-next-line react/jsx-no-literals */}
        {progress}{'% | '}{timeRemaining}
      </span>
      {onAbort && (
        <Tooltip content="Abort task" side="bottom">
          <IconButton
            variant="danger"
            size="xs"
            onClick={onAbort}
          >
            <X size={10} strokeWidth={2.5} />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
}

ProgressBar.propTypes = {
  taskName: PropTypes.string.isRequired,
  progress: PropTypes.number,
  timeRemaining: PropTypes.string,
  active: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'sub']),
  onAbort: PropTypes.func,
};
