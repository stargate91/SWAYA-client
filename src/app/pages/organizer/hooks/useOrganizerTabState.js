import { useCallback } from 'react';
import { useQueryParams } from '@/hooks/useQueryParams';

export function useOrganizerTabState() {
  const { getString, setParam } = useQueryParams();

  const activeMainTab = getString('mainTab', 'manual');
  const activeExtrasTab = getString('extrasTab', 'bonus');
  const activeManualTab = getString('manualTab', 'movies');

  const setActiveMainTab = useCallback((tab) => {
    setParam('mainTab', tab);
  }, [setParam]);

  const setActiveExtrasTab = useCallback((tab) => {
    setParam('extrasTab', tab);
  }, [setParam]);

  const setActiveManualTab = useCallback((tab) => {
    setParam('manualTab', tab);
  }, [setParam]);

  return {
    activeMainTab,
    setActiveMainTab,
    activeExtrasTab,
    setActiveExtrasTab,
    activeManualTab,
    setActiveManualTab,
  };
}

