import { useState, useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { useNavigationStore } from '@/stores/useNavigationStore';

export function usePreservedState(stateKey, defaultValue) {
  const location = useLocation();
  const currentPath = location.pathname;
  const navType = useNavigationType();

  const savedState = useNavigationStore.getState().getPageState(currentPath);
  const savedValue = savedState[stateKey];
  
  // Reset to default on PUSH navigations (direct clicks/sidebar/search)
  const initialValue = navType === 'PUSH' ? defaultValue : (savedValue !== undefined ? savedValue : defaultValue);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    useNavigationStore.getState().setPageState(currentPath, {
      [stateKey]: value
    });
  }, [currentPath, stateKey, value]);

  return [value, setValue];
}
