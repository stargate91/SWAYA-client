import { useState, useEffect, useRef, useCallback } from 'react';

export function useListHeaderSticky({ activeList, onImageClick }) {
  const [isStuck, setIsStuck] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStuck(!entry.isIntersecting);
      },
      {
        threshold: [0],
        root: heroRef.current?.closest('.lists-main') || null,
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [activeList?.id]);

  const listColor = activeList?.color;

  const themeRef = useCallback((node) => {
    if (node) {
      node.style.setProperty('--list-theme-color', listColor || 'var(--color-accent-blue)');
    }
  }, [listColor]);

  const buttonThemeRef = useCallback((node) => {
    if (node) {
      if (listColor) {
        const bg = (listColor.includes('success') || listColor.includes('warning'))
          ? `color-mix(in srgb, ${listColor} 80%, black)`
          : listColor;
        node.style.setProperty('--button-primary-bg', bg);
        node.style.setProperty('--button-primary-color', 'var(--color-text-primary)');
      } else {
        node.style.removeProperty('--button-primary-bg');
        node.style.removeProperty('--button-primary-color');
      }
    }
  }, [listColor]);

  const handleImageKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onImageClick?.(e);
    }
  }, [onImageClick]);

  return {
    isStuck,
    heroRef,
    themeRef,
    buttonThemeRef,
    handleImageKeyDown,
  };
}

export default useListHeaderSticky;
