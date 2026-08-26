import { useMemo } from 'react';
import { usePlaybackStore } from '@/stores/usePlaybackStore';
import { formatTime } from '@/lib/formatters';

export function useMiniPlayerBar() {
  const isVisible = usePlaybackStore((state) => state.active && state.isMinimized);
  const title = usePlaybackStore((state) => state.title);
  const currentTime = usePlaybackStore((state) => state.currentTime);
  const duration = usePlaybackStore((state) => state.duration);
  const isPaused = usePlaybackStore((state) => state.isPaused);
  const togglePlay = usePlaybackStore((state) => state.togglePlay);
  const restore = usePlaybackStore((state) => state.restore);
  const closePlayer = usePlaybackStore((state) => state.closePlayer);

  const formattedTime = useMemo(() => {
    return `${formatTime(currentTime)} / ${formatTime(duration)}`;
  }, [currentTime, duration]);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return {
    isVisible,
    title,
    formattedTime,
    progressPercent,
    isPaused,
    togglePlay,
    restore,
    closePlayer,
  };
}

export default useMiniPlayerBar;
