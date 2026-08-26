import { useEffect } from 'react';
import { sendIpc } from '@/lib/ipc';

export function useThemeSync({ currentTheme, savedTheme }) {
  useEffect(() => {
    const resolvedCurrent = currentTheme || 'dark';
    const resolvedSaved = savedTheme || 'dark';

    document.documentElement.setAttribute('data-theme', resolvedCurrent);
    const timer = setTimeout(() => {
      sendIpc('theme-changed', resolvedCurrent);
    }, 150);

    return () => {
      clearTimeout(timer);
      document.documentElement.setAttribute('data-theme', resolvedSaved);
      sendIpc('theme-changed', resolvedSaved);
    };
  }, [currentTheme, savedTheme]);
}

export default useThemeSync;
