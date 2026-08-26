import { useState, useRef, useEffect, useCallback } from 'react';

export function useImagePreviewTooltip({ delay = 0, offsetX = 15, offsetY = 15 } = {}) {
  const [activeItem, setActiveItem] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef(null);
  const hoverTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  const handleMouseEnter = useCallback((e, item) => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (delay > 0) {
      hoverTimerRef.current = setTimeout(() => {
        setActiveItem(item || null);
        setCoords({ x: clientX, y: clientY });
        setIsVisible(true);
      }, delay);
    } else {
      setActiveItem(item || null);
      setCoords({ x: clientX, y: clientY });
      setIsVisible(true);
    }
  }, [delay]);

  const handleMouseMove = useCallback((e) => {
    if (tooltipRef.current) {
      tooltipRef.current.style.transform = `translate3d(${e.clientX + offsetX}px, ${e.clientY + offsetY}px, 0)`;
    }
  }, [offsetX, offsetY]);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    setIsVisible(false);
    setActiveItem(null);
  }, []);

  return {
    tooltipRef,
    activeItem,
    isVisible,
    coords,
    handleMouseEnter,
    handleMouseMove,
    handleMouseLeave,
  };
}

export default useImagePreviewTooltip;
