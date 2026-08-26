import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { useNavigationStore } from '@/stores/useNavigationStore';

export function useScrollRestoration(selector, dependencies = []) {
  const location = useLocation();
  const currentPath = location.pathname;
  const navType = useNavigationType();
  const isRestoringRef = useRef(false);

  useEffect(() => {
    if (navType !== 'POP') return undefined;

    // If any dependency is true, it indicates a loading state. Wait until loading is false.
    const isLoading = dependencies.some(dep => dep === true);
    if (isLoading) return undefined;

    const container = document.querySelector(selector);
    if (!container) return undefined;

    // Restore scroll position
    const savedState = useNavigationStore.getState().getPageState(currentPath);
    if (savedState.scrollTop !== undefined) {
      isRestoringRef.current = true;
      container.scrollTop = savedState.scrollTop;

      let frameId;
      let count = 0;
      const target = savedState.scrollTop;

      // Find the main page content container instead of the absolute header
      const contentEl = container.firstElementChild;

      if (savedState.scrollHeight !== undefined && contentEl) {
        contentEl.style.minHeight = `${savedState.scrollHeight}px`;
      }

      const performScroll = () => {
        if (!container) return;
        container.scrollTop = target;
        if (Math.abs(container.scrollTop - target) < 1 || count++ > 5) {
          if (contentEl) {
            contentEl.style.minHeight = '';
          }
          isRestoringRef.current = false;
          return;
        }
        frameId = requestAnimationFrame(performScroll);
      };

      frameId = requestAnimationFrame(performScroll);
      return () => {
        if (frameId) {
          cancelAnimationFrame(frameId);
        }
        if (contentEl) {
          contentEl.style.minHeight = '';
        }
        isRestoringRef.current = false;
      };
    }
    return undefined;
  }, [currentPath, selector, navType, ...dependencies]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const container = document.querySelector(selector);
    if (!container) return undefined;

    let debounceTimer = null;

    const saveScrollState = () => {
      if (!container) return;
      // Support both HashRouter (for Electron) and BrowserRouter
      const getActualSubPath = () => {
        const hash = window.location.hash;
        if (hash.startsWith('#')) {
          return hash.slice(1).split('?')[0];
        }
        return window.location.pathname;
      };

      if (getActualSubPath() !== currentPath) return;

      useNavigationStore.getState().setPageState(currentPath, {
        scrollTop: container.scrollTop,
        scrollHeight: container.scrollHeight,
      });
    };

    const handleScroll = () => {
      if (isRestoringRef.current) return;
      if (dependencies.some(dep => dep === true)) return;

      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      debounceTimer = setTimeout(() => {
        debounceTimer = null;
        saveScrollState();
      }, 150);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
        saveScrollState();
      }
      container.removeEventListener('scroll', handleScroll);
    };
  }, [currentPath, selector, ...dependencies]); // eslint-disable-line react-hooks/exhaustive-deps
}
