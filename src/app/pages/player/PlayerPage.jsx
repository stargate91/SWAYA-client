import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Maximize2, X, Minimize2 } from '@/ui/icons';
import { useTranslation } from '@/providers/LanguageContext';
import { useQueryParams } from '@/hooks/useQueryParams';
import { formatTime, formatRating } from '@/lib/formatters';
import useVideoPlayer from './hooks/useVideoPlayer';
import PlayerControlBar from './components/PlayerControlBar';
import PlayerEndOverlay from './components/PlayerEndOverlay';
import PlayerIconButton from './components/PlayerIconButton';
import styles from './PlayerPage.module.css';

export default function PlayerPage() {
  const { itemId } = useParams();
  const { t } = useTranslation();
  const containerRef = useRef(null);

  const {
    currentTime,
    isPaused,
    duration,
    volume,
    isMuted,
    title,
    logoUrl,
    showControls,
    isPip,
    showEndOverlay,
    userRating,
    hoverRating,
    episodeNumber,
    speed,
    isAdult,
    mediaType,
    mediaImage,
    justAddedPeak,
    logoError,
    chapters,
    clockTime,
    endTime,
    trackList,
    audioTracks,
    embeddedAudioTracks,
    externalAudioTracks,
    subTracks,
    embeddedSubTracks,
    externalSubTracks,
    isSubOff,
    showAudioMenu,
    showSubMenu,
    bottomOffset,
    osdMessage,
    peaksCount,
    tvShowId,
    tvShowTitle,
    tvShowPoster,
    tvShowRating,
    seasonNumber,
    seasonPoster,
    setShowAudioMenu,
    setShowSubMenu,
    setLogoError,
    setHoverRating,
    handleDismissOverlay,
    handleMouseMove,
    handleWheel,
    handleDoubleClick,
    handleClose,
    handlePlayPause,
    handleSeek,
    handleVolumeChange,
    toggleMute,
    handleSpeedUp,
    handleSpeedDown,
    handleAddPeak,
    handleRate,
    handleReplay,
    handleTogglePip,
    handleMinimizePip,
    handleSelectAudioTrack,
    handleSelectSubTrack,
    handleDisableSubtitles,
    handleNextChapter,
    handlePrevChapter,
    currentChapter,
  } = useVideoPlayer({
    itemId,
    containerRef,
  });

  const starSymbol = '★';
  const ratingText = userRating ? `${formatRating(userRating)} / 10` : '';

  const { getBoolean } = useQueryParams();
  const controlsOnly = getBoolean('controls_only');

  if (isPip) {
    return (
      /* eslint-disable-next-line jsx-a11y/no-static-element-interactions */
      <div
        className={`${styles['player-page']} ${styles['player-page--transparent']} ${styles['player-page--pip']}`}
        onMouseMove={handleMouseMove}
      >
        <div 
          role="presentation"
          className={styles['player-page__pip-drag-handle']} 
          onDoubleClick={handleDoubleClick}
        />
        <div
          role="presentation"
          className={styles['player-page__pip-interactive-area']}
          onWheel={handleWheel}
          onDoubleClick={handleDoubleClick}
        />
        <div className={styles['player-page__pip-overlay']}>
          <PlayerIconButton size="sm" onClick={handleMinimizePip}>
            <Minimize2 size={16} />
          </PlayerIconButton>
          <PlayerIconButton size="sm" onClick={handleTogglePip}>
            <Maximize2 size={16} />
          </PlayerIconButton>
          <PlayerIconButton size="sm" variant="danger" onClick={handleClose}>
            <X size={16} />
          </PlayerIconButton>
        </div>
      </div>
    );
  }


  return (
    /* eslint-disable-next-line jsx-a11y/no-static-element-interactions */
    <div
      className={`${styles['player-page']} ${controlsOnly ? styles['player-page--transparent'] : ''} ${!showControls ? styles['player-page--hide-cursor'] : ''}`}
      onMouseMove={handleMouseMove}
      onWheel={handleWheel}
      onDoubleClick={handleDoubleClick}
    >
      {/* Video Container (Nesting target) */}
      <div ref={containerRef} className={styles['player-page__video-container']} />

      {/* Custom Controls Overlay */}
      <div
        className={styles['player-page__controls-overlay']}
        data-active={showControls ? 'true' : undefined}
      >

        {/* Top Header */}
        <div className={styles['player-page__header']}>
          <div className={styles['player-page__header-left']}>
            {logoUrl && !logoError ? (
              <img
                src={logoUrl}
                alt={title}
                className={styles['player-page__logo']}
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className={styles['player-page__title']}>{title}</span>
            )}
          </div>

          {currentChapter && (
            <div className={styles['player-page__current-chapter']}>
              {currentChapter.title}
            </div>
          )}

          <div className={styles['player-page__header-right']}>
            <div className={styles['player-page__time-info']}>
              <span className={styles['player-page__clock']}>{clockTime}</span>
              {endTime && <span className={styles['player-page__ends-at']}>{t('player.ends_at', { defaultValue: 'Ends at' }) + ' ' + endTime}</span>}
            </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <PlayerControlBar
          t={t}
          currentTime={currentTime}
          duration={duration}
          chapters={chapters}
          isPaused={isPaused}
          isMuted={isMuted}
          volume={volume}
          speed={speed}
          isAdult={isAdult}
          mediaType={mediaType}
          justAddedPeak={justAddedPeak}
          trackList={trackList}
          audioTracks={audioTracks}
          embeddedAudioTracks={embeddedAudioTracks}
          externalAudioTracks={externalAudioTracks}
          subTracks={subTracks}
          embeddedSubTracks={embeddedSubTracks}
          externalSubTracks={externalSubTracks}
          isSubOff={isSubOff}
          showAudioMenu={showAudioMenu}
          showSubMenu={showSubMenu}
          bottomOffset={bottomOffset}
          formatTime={formatTime}
          handleSeek={handleSeek}
          handleSpeedDown={handleSpeedDown}
          handlePlayPause={handlePlayPause}
          handleClose={handleClose}
          handleSpeedUp={handleSpeedUp}
          toggleMute={toggleMute}
          handleVolumeChange={handleVolumeChange}
          handleAddPeak={handleAddPeak}
          setShowAudioMenu={setShowAudioMenu}
          setShowSubMenu={setShowSubMenu}
          handleMinimizePip={handleMinimizePip}
          handleTogglePip={handleTogglePip}
          handleSelectAudioTrack={handleSelectAudioTrack}
          handleSelectSubTrack={handleSelectSubTrack}
          handleDisableSubtitles={handleDisableSubtitles}
          handleNextChapter={handleNextChapter}
          handlePrevChapter={handlePrevChapter}
        />

      </div>

      {osdMessage && (
        <div className={styles['player-page__osd']}>
          {osdMessage}
        </div>
      )}

      {showEndOverlay && (
        <PlayerEndOverlay
          t={t}
          title={title}
          episodeNumber={episodeNumber}
          userRating={userRating}
          hoverRating={hoverRating}
          ratingText={ratingText}
          starSymbol={starSymbol}
          peaksCount={peaksCount}
          mediaType={mediaType}
          mediaImage={mediaImage}
          isAdult={isAdult}
          tvShowId={tvShowId}
          tvShowTitle={tvShowTitle}
          tvShowPoster={tvShowPoster}
          tvShowRating={tvShowRating}
          seasonNumber={seasonNumber}
          seasonPoster={seasonPoster}
          setHoverRating={setHoverRating}
          handleRate={handleRate}
          handleReplay={handleReplay}
          handleClose={handleClose}
          handleDismiss={handleDismissOverlay}
        />
      )}
    </div>
  );
}
