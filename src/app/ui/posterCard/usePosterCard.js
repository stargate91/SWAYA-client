import { useState, useCallback, useMemo } from 'react';
import styles from '../PosterCard.module.css';

export function usePosterCard({
  imageUrl,
  previewSrc = null,
  onClick,
  onHoverChange,
  asComponent,
  size,
  active = false,
  disableHoverAnimation = false,
  className = '',
  style,
  customStyle,
}) {
  const isInteractive = Boolean(onClick);
  const DefaultComponent = asComponent || 'div';

  const [prevImageUrl, setPrevImageUrl] = useState(imageUrl);
  const [imageError, setImageError] = useState(false);

  if (imageUrl !== prevImageUrl) {
    setPrevImageUrl(imageUrl);
    setImageError(false);
  }

  const [prevPreviewSrc, setPrevPreviewSrc] = useState(previewSrc);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  if (previewSrc !== prevPreviewSrc) {
    setPrevPreviewSrc(previewSrc);
    if (!previewSrc) {
      setIsVideoPlaying(false);
    }
  }

  const handleMouseEnter = useCallback(() => {
    onHoverChange?.(true);
  }, [onHoverChange]);

  const handleMouseLeave = useCallback(() => {
    onHoverChange?.(false);
  }, [onHoverChange]);

  const handleKeyDown = useCallback(
    (e) => {
      if (onClick && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick(e);
      }
    },
    [onClick]
  );

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const handleVideoPlaying = useCallback(() => {
    setIsVideoPlaying(true);
  }, []);

  const cardClassName = useMemo(() => {
    return `
      ${styles.card}
      ${active ? styles['is-active'] : ''}
      ${disableHoverAnimation ? styles['no-hover-animation'] : ''}
      ${className}
    `.trim();
  }, [active, disableHoverAnimation, className]);

  const interactiveProps = useMemo(() => {
    if (DefaultComponent === 'div' && isInteractive) {
      return {
        role: 'button',
        tabIndex: 0,
        onKeyDown: handleKeyDown,
      };
    }
    return {};
  }, [DefaultComponent, isInteractive, handleKeyDown]);

  const widthStyle = useMemo(() => {
    if (!size) return {};
    const cardWidth =
      size === 'scene'
        ? '25.875rem'
        : size === 'default'
          ? '12.5rem'
          : size;
    return {
      '--ui-poster-card-width': cardWidth,
      '--ui-poster-card-min-width': cardWidth,
    };
  }, [size]);

  const computedStyle = useMemo(() => {
    return { ...widthStyle, ...(customStyle || style) };
  }, [widthStyle, customStyle, style]);

  return {
    DefaultComponent,
    imageError,
    handleImageError,
    isVideoPlaying,
    handleVideoPlaying,
    handleMouseEnter,
    handleMouseLeave,
    cardClassName,
    interactiveProps,
    computedStyle,
  };
}

export default usePosterCard;
