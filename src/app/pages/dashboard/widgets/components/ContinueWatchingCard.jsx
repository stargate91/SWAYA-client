import { Play, Minus } from '@/ui/icons';
import PosterCard from '@/ui/PosterCard';
import Tooltip from '@/ui/Tooltip';
import IconButton from '@/ui/IconButton';
import { useContinueWatchingCard } from '../hooks/useContinueWatchingCard';
import styles from '../ContinueWatchingWidget.module.css';

export default function ContinueWatchingCard({
  item,
  activePlayback,
  handlePlay,
  handleResetProgress,
  t,
}) {
  const {
    progressPercent,
    subtitle,
    episodeMeta,
    resolvedImageUrl,
    isActive,
    onCardClick,
    onResetClick,
    t: T,
  } = useContinueWatchingCard({
    item,
    activePlayback,
    handlePlay,
    handleResetProgress,
    t,
  });

  return (
    <PosterCard
      aspect="landscape"
      size="scene"
      variant="overlay-title"
      disableHoverAnimation
      title={item.title}
      subtitle={subtitle}
      hoverSubtitle={episodeMeta}
      active={isActive}
      imageUrl={resolvedImageUrl}
      loading="eager"
      progressPercent={progressPercent}
      onClick={onCardClick}
      topRightAction={
        <div className={styles['top-right-action']}>
          <Tooltip
            content={T('dashboard.continue_watching.remove') || 'Remove progress'}
            side="top"
          >
            <IconButton
              variant="flat-danger"
              label={T('dashboard.continue_watching.remove') || 'Remove progress'}
              onClick={onResetClick}
            >
              <Minus size={14} />
            </IconButton>
          </Tooltip>
        </div>
      }
      playOverlay={{
        icon: <Play size={18} fill="currentColor" />,
        onClick: onCardClick,
      }}
    />
  );
}
