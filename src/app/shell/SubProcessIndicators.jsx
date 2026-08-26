import PropTypes from 'prop-types';
import { Clapperboard } from '@/ui/icons';
import Tooltip from '@/ui/Tooltip';
import { formatTorrentStats } from '@/lib/formatters';
import { useSubProcessIndicatorsData } from './useSubProcessIndicatorsData';
import styles from './SubProcessIndicators.module.css';

export default function SubProcessIndicators({
  imageProgress,
  hydrateProgress,
  collectionProgress,
  torrentProgress,
  syncProgress,
}) {
  const { indicatorItems } = useSubProcessIndicatorsData({
    imageProgress,
    hydrateProgress,
    collectionProgress,
    torrentProgress,
    syncProgress,
  });

  return (
    <div className={styles.container}>
      {indicatorItems.map(({
        key,
        icon: Icon,
        isActive,
        percentageText,
        hasTorrentDownloads,
        fallbackTooltip,
        downloads,
      }) => {
        const tooltipContent = hasTorrentDownloads ? (
          <div className={styles['torrent-tooltip']}>
            {downloads.map((dl) => (
              <div key={dl.hash} className={styles['torrent-tooltip-item']}>
                <span className={styles['torrent-name']}><Clapperboard size={12} /> {dl.name}</span>
                <span className={styles['torrent-stats']}>{formatTorrentStats(dl.progress, dl.speedText)}</span>
              </div>
            ))}
          </div>
        ) : fallbackTooltip;

        return (
          <Tooltip
            key={key}
            content={tooltipContent}
            side="bottom"
            delay={100}
          >
            <div className={`${styles.indicator} ${isActive ? styles['is-active'] : ''}`}>
              <Icon size={14} className={styles.icon} />
              {isActive && (
                <span className={styles.percentage}>
                  {percentageText}
                </span>
              )}
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
}

SubProcessIndicators.propTypes = {
  imageProgress: PropTypes.object,
  hydrateProgress: PropTypes.object,
  collectionProgress: PropTypes.object,
  torrentProgress: PropTypes.object,
  syncProgress: PropTypes.object,
};
