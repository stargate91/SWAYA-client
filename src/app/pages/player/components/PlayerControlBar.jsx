import PropTypes from 'prop-types';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Languages,
  Captions,
  PictureInPicture2,
  Square,
  Rewind,
  FastForward,
  SkipBack,
  SkipForward,
  Droplets,
  Minimize2,
} from '@/ui/icons';
import Badge from '@/ui/Badge';
import PlayerIconButton from './PlayerIconButton';
import PlayerSlider from './PlayerSlider';
import { PlayerMenu, PlayerMenuItem, PlayerMenuEmpty, PlayerMenuDivider } from './PlayerMenu';
import { usePlayerControlBarState } from '../hooks/usePlayerControlBarState';
import styles from './PlayerControlBar.module.css';

export default function PlayerControlBar({
  t,
  currentTime,
  duration,
  chapters,
  isPaused,
  isMuted,
  volume,
  speed,
  isAdult,
  justAddedPeak,
  audioTracks = [],
  embeddedAudioTracks = [],
  externalAudioTracks = [],
  subTracks = [],
  embeddedSubTracks = [],
  externalSubTracks = [],
  isSubOff = true,
  showAudioMenu,
  showSubMenu,
  bottomOffset,
  formatTime,
  handleSeek,
  handleSpeedDown,
  handlePlayPause,
  handleClose,
  handleSpeedUp,
  toggleMute,
  handleVolumeChange,
  handleAddPeak,
  setShowAudioMenu,
  setShowSubMenu,
  handleMinimizePip,
  handleTogglePip,
  handleSelectAudioTrack,
  handleSelectSubTrack,
  handleDisableSubtitles,
  handleNextChapter,
  handlePrevChapter,
}) {
  const {
    speedText,
    toggleAudioMenu,
    toggleSubMenu,
    formattedEmbeddedAudioTracks,
    formattedExternalAudioTracks,
    formattedEmbeddedSubTracks,
    formattedExternalSubTracks,
  } = usePlayerControlBarState({
    t,
    speed,
    audioTracks,
    embeddedAudioTracks,
    externalAudioTracks,
    subTracks,
    embeddedSubTracks,
    externalSubTracks,
    showAudioMenu,
    showSubMenu,
    setShowAudioMenu,
    setShowSubMenu,
    handleSelectAudioTrack,
    handleSelectSubTrack,
  });

  return (
    // eslint-disable-next-line react/forbid-dom-props
    <div className={styles.bottom} style={bottomOffset > 0 ? { transform: `translateY(-${bottomOffset}px)` } : undefined}>

      {/* Progress Bar */}
      <div className={styles['progress-container']}>
        <span className={styles.time}>{formatTime(currentTime)}</span>
        <PlayerSlider
          variant="progress"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          chapters={chapters}
          duration={duration}
        />
        <span className={styles.time}>{formatTime(duration)}</span>
      </div>

      {/* Action Row */}
      <div className={styles.actions}>

        {/* Left Actions */}
        <div className={styles['actions-group']}>
          <PlayerIconButton onClick={handlePrevChapter}>
            <SkipBack size={18} fill="currentColor" />
          </PlayerIconButton>

          <PlayerIconButton onClick={handleSpeedDown}>
            <Rewind size={18} fill="currentColor" />
          </PlayerIconButton>

          <PlayerIconButton variant="primary" onClick={handlePlayPause}>
            {isPaused ? <Play size={20} fill="currentColor" /> : <Pause size={20} fill="currentColor" />}
          </PlayerIconButton>

          <PlayerIconButton onClick={handleClose}>
            <Square size={18} fill="currentColor" />
          </PlayerIconButton>

          <PlayerIconButton onClick={handleSpeedUp}>
            <FastForward size={18} fill="currentColor" />
          </PlayerIconButton>

          <PlayerIconButton onClick={handleNextChapter}>
            <SkipForward size={18} fill="currentColor" />
          </PlayerIconButton>

          {speed !== 1.0 && (
            <Badge family="status" tone="accent" className={styles['speed-badge']}>
              {speedText}
            </Badge>
          )}

          <div className={styles['volume-group']}>
            <PlayerIconButton onClick={toggleMute}>
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </PlayerIconButton>
            <PlayerSlider
              variant="volume"
              min={0}
              max={100}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className={styles['actions-group']}>

          {/* Audio Tracks Dropdown */}
          {showAudioMenu && (
            <PlayerMenu title={t('player.audio_tracks', { defaultValue: 'Audio Tracks' })}>
              {formattedEmbeddedAudioTracks.map((track) => (
                <PlayerMenuItem
                  key={track.id}
                  active={track.selected}
                  onClick={track.onSelect}
                >
                  {track.label}
                </PlayerMenuItem>
              ))}
              {formattedEmbeddedAudioTracks.length > 0 && formattedExternalAudioTracks.length > 0 && <PlayerMenuDivider />}
              {formattedExternalAudioTracks.map((track) => (
                <PlayerMenuItem
                  key={track.id}
                  active={track.selected}
                  onClick={track.onSelect}
                >
                  {track.label}
                </PlayerMenuItem>
              ))}
              {audioTracks.length === 0 && (
                <PlayerMenuEmpty>{t('player.no_audio_tracks', { defaultValue: 'No audio tracks' })}</PlayerMenuEmpty>
              )}
            </PlayerMenu>
          )}

          {/* Subtitles Dropdown */}
          {showSubMenu && (
            <PlayerMenu title={t('common.subtitles', { defaultValue: 'Subtitles' })}>
              <PlayerMenuItem
                active={isSubOff}
                onClick={handleDisableSubtitles}
              >
                {t('player.off', { defaultValue: 'Off' })}
              </PlayerMenuItem>
              {subTracks.length > 0 && <PlayerMenuDivider />}
              {formattedEmbeddedSubTracks.map((track) => (
                <PlayerMenuItem
                  key={track.id}
                  active={track.selected}
                  onClick={track.onSelect}
                >
                  {track.label}
                </PlayerMenuItem>
              ))}
              {formattedEmbeddedSubTracks.length > 0 && formattedExternalSubTracks.length > 0 && <PlayerMenuDivider />}
              {formattedExternalSubTracks.map((track) => (
                <PlayerMenuItem
                  key={track.id}
                  active={track.selected}
                  onClick={track.onSelect}
                >
                  {track.label}
                </PlayerMenuItem>
              ))}
            </PlayerMenu>
          )}

          {/* Peak Button */}
          {isAdult && (
            <PlayerIconButton
              peakState={justAddedPeak ? 'peak-success' : 'peak'}
              onClick={handleAddPeak}
              title={t('library.addPeak') || 'Add Finish'}
            >
              <Droplets size={18} fill="currentColor" />
            </PlayerIconButton>
          )}

          <PlayerIconButton
            active={showAudioMenu}
            onClick={toggleAudioMenu}
          >
            <Languages size={18} />
          </PlayerIconButton>

          <PlayerIconButton
            active={showSubMenu}
            onClick={toggleSubMenu}
          >
            <Captions size={18} />
          </PlayerIconButton>

          <PlayerIconButton onClick={handleMinimizePip}>
            <Minimize2 size={18} />
          </PlayerIconButton>

          <PlayerIconButton onClick={handleTogglePip}>
            <PictureInPicture2 size={18} />
          </PlayerIconButton>
        </div>

      </div>

    </div>
  );
}

PlayerControlBar.propTypes = {
  t: PropTypes.func.isRequired,
  currentTime: PropTypes.number,
  duration: PropTypes.number,
  chapters: PropTypes.array,
  isPaused: PropTypes.bool,
  isMuted: PropTypes.bool,
  volume: PropTypes.number,
  speed: PropTypes.number,
  isAdult: PropTypes.bool,
  justAddedPeak: PropTypes.bool,
  audioTracks: PropTypes.array,
  embeddedAudioTracks: PropTypes.array,
  externalAudioTracks: PropTypes.array,
  subTracks: PropTypes.array,
  embeddedSubTracks: PropTypes.array,
  externalSubTracks: PropTypes.array,
  isSubOff: PropTypes.bool,
  showAudioMenu: PropTypes.bool,
  showSubMenu: PropTypes.bool,
  bottomOffset: PropTypes.number,
  formatTime: PropTypes.func.isRequired,
  handleSeek: PropTypes.func.isRequired,
  handleSpeedDown: PropTypes.func.isRequired,
  handlePlayPause: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSpeedUp: PropTypes.func.isRequired,
  toggleMute: PropTypes.func.isRequired,
  handleVolumeChange: PropTypes.func.isRequired,
  handleAddPeak: PropTypes.func,
  setShowAudioMenu: PropTypes.func.isRequired,
  setShowSubMenu: PropTypes.func.isRequired,
  handleMinimizePip: PropTypes.func.isRequired,
  handleTogglePip: PropTypes.func.isRequired,
  handleSelectAudioTrack: PropTypes.func,
  handleSelectSubTrack: PropTypes.func,
  handleDisableSubtitles: PropTypes.func,
  handleNextChapter: PropTypes.func,
  handlePrevChapter: PropTypes.func,
};
