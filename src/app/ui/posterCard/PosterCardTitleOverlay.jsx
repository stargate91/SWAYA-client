import Tooltip from '../Tooltip';
import styles from './PosterCardTitleOverlay.module.css';

export default function PosterCardTitleOverlay({
  title,
  subtitle,
  hoverSubtitle,
}) {
  if (!title) return null;

  return (
    <div className={styles['title-overlay']}>
      <div className={styles['title-overlay-gradient']} />
      <div className={styles['title-overlay-content']}>
        <Tooltip
          content={title}
          side="top"
          triggerClassName={styles['tooltip-trigger']}
        >
          <div className={styles['title-overlay-label']}>{title}</div>
        </Tooltip>
        {subtitle && (
          <div
            className={`${styles['title-overlay-subtitle']} ${
              hoverSubtitle ? styles['title-overlay-subtitle--has-hover'] : ''
            }`}
          >
            <span className={styles['title-overlay-subtitle-default']}>
              {subtitle}
            </span>
            {hoverSubtitle && (
              <span className={styles['title-overlay-subtitle-hover']}>
                {hoverSubtitle}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
