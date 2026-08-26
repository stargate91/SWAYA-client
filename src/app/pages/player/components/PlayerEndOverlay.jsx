import React from 'react';
import { RotateCcw, X, Flame } from '@/ui/icons';
import SegmentedRating from '@/ui/SegmentedRating';
import PlayerActionBtn from './PlayerActionBtn';
import styles from './PlayerEndOverlay.module.css';
import { resolveEpisodeNumber, formatTvEpisodeDisplayTitle } from '../utils/playerFormatting';

export default function PlayerEndOverlay({
  t,
  title,
  episodeNumber,
  userRating,
  peaksCount,
  mediaType,
  mediaImage,
  isAdult,
  tvShowId,
  tvShowTitle,
  tvShowRating,
  seasonNumber,
  handleRate,
  handleReplay,
  handleClose,
  handleDismiss,
}) {
  const mediaStillSrc = React.useMemo(() => {
    if (mediaImage) return mediaImage;
    return null;
  }, [mediaImage]);

  const isScene = mediaType === 'scene';
  const resolvedEpisodeNum = resolveEpisodeNumber(title, episodeNumber);
  const displayTitle = formatTvEpisodeDisplayTitle(title, tvShowId ? tvShowTitle : '');

  return (
    <div className={styles.overlay} data-active="true">
      <div className={styles.panel}>
        {/* Dismiss/Close Overlay Button (Edge cases/Keep watching) */}
        {handleDismiss && (
          <button
            className={styles['close-overlay-btn']}
            onClick={handleDismiss}
            title={t('player.back_to_video', { defaultValue: 'Back to Video' })}
            aria-label={t('player.back_to_video', { defaultValue: 'Back to Video' })}
          >
            <X size={18} />
          </button>
        )}

        {/* 1. Top Zone: Finished Media Info */}
        <div className={styles['top-zone']}>
          <div className={styles['media-container']} data-variant={mediaType === 'movie' ? 'poster' : 'still'}>
            <img
              src={mediaStillSrc || '/no-cover.png'}
              alt={title}
              className={styles['media-image']}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/no-cover.png';
              }}
            />
          </div>
          <div className={styles.metadata}>
            <span className={styles.tag}>
              {t('player.finished_watching', { defaultValue: 'Finished watching' })}
            </span>
            <h2 className={styles.title}>
              {tvShowTitle ? `${tvShowTitle} - ${displayTitle}` : displayTitle}
            </h2>
            {tvShowId && (
              <span className={styles['season-text']}>
                {t('player.season_number', { defaultValue: 'Season {{season}}', season: seasonNumber })}
                {resolvedEpisodeNum !== null && ` · ${t('player.episode_number', { defaultValue: 'Episode {{episode}}', episode: resolvedEpisodeNum })}`}
              </span>
            )}
          </div>
        </div>

        {/* 2. Middle Zone: Rating Bar & Stats */}
        <div className={styles['middle-zone']}>
          {!tvShowId ? (
            <div className={styles['rating-container']}>
              <SegmentedRating
                value={userRating}
                onChange={handleRate}
                t={t}
                labelUnder={true}
                className="table-segmented-rating-container layout-column"
                barClassName="rating-segmented-bar"
                segmentClassName="rating-segment"
                segmentFillClassName="rating-segment-fill"
                labelClassName="user-rating-label-under"
              />
            </div>
          ) : (
            <div className={styles['tv-rate-card']}>
              <span className={styles['tv-rate-prompt']}>
                {t('player.rate_show_prompt', { defaultValue: 'Ready to rate the series?' })}
              </span>
              <div className={styles['rating-container']}>
                <SegmentedRating
                  value={tvShowRating}
                  onChange={handleRate}
                  t={t}
                  labelUnder={true}
                  className="table-segmented-rating-container layout-column"
                  barClassName="rating-segmented-bar"
                  segmentClassName="rating-segment"
                  segmentFillClassName="rating-segment-fill"
                  labelClassName="user-rating-label-under"
                />
              </div>
            </div>
          )}

          {/* Scene specific Peaks statistics */}
          {isScene && isAdult && peaksCount > 0 && (
            <div className={styles['peaks-stats']}>
              <Flame size={18} className={styles['peaks-icon']} />
              <span>
                {t('player.peaks_recorded', {
                  count: peaksCount,
                  defaultValue: `You marked ${peaksCount} finish moments in this scene`,
                })}
              </span>
            </div>
          )}
        </div>

        {/* 3. Bottom Zone: Action Buttons */}
        <div className={styles['bottom-zone']}>
          <PlayerActionBtn onClick={handleReplay} icon={<RotateCcw size={18} />}>
            {t('player.replay', { defaultValue: 'Replay' })}
          </PlayerActionBtn>
          <PlayerActionBtn variant="danger" onClick={handleClose} icon={<X size={18} />}>
            {t('player.close_player', { defaultValue: 'Close Player' })}
          </PlayerActionBtn>
        </div>
      </div>
    </div>
  );
}
