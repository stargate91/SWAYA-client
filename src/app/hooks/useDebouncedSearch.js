import { useState, useEffect, useRef } from 'react';
import { useDebounce } from './useDebounce';

export function useDebouncedSearch({
  initialValue = '',
  onSearchChange,
  delay = 300,
} = {}) {
  const [value, setValue] = useState(initialValue);
  const debouncedValue = useDebounce(value, delay);
  const onSearchChangeRef = useRef(onSearchChange);

  useEffect(() => {
    onSearchChangeRef.current = onSearchChange;
  }, [onSearchChange]);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (debouncedValue === initialValue) {
        return;
      }
    }
    onSearchChangeRef.current?.(debouncedValue);
  }, [debouncedValue, initialValue]);

  return {
    value,
    setValue,
    debouncedValue,
  };
}

export default useDebouncedSearch;
