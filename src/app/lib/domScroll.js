/**
 * DOM Scroll Utilities
 * Provides centralized, safe scroll container discovery and scroll execution.
 */

export const getScrollContainer = () => {
  if (typeof document === 'undefined') return null;
  return (
    document.querySelector('.shell__content') ||
    document.querySelector('.media-detail-page__container') ||
    document.documentElement ||
    document.body
  );
};

export const scrollToTop = (smooth = true) => {
  const container = getScrollContainer();
  if (container && typeof container.scrollTo === 'function') {
    container.scrollTo({
      top: 0,
      left: 0,
      behavior: smooth ? 'smooth' : 'auto',
    });
  } else if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }
};
