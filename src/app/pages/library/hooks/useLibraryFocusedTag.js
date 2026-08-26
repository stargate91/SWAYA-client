import { useState, useMemo, useEffect, useCallback } from 'react';

export function useLibraryFocusedTag({ isTags, sortedItems = [] }) {
  const [focusedTagName, setFocusedTagName] = useState(null);

  useEffect(() => {
    if (!isTags && focusedTagName !== null) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFocusedTagName(null);
    }
  }, [isTags, focusedTagName]);

  const handleExitTagFocus = useCallback(() => {
    setFocusedTagName(null);
  }, []);

  const focusedTag = useMemo(() => {
    if (!isTags || !focusedTagName) return null;
    return sortedItems.find((item) => item.name === focusedTagName) || null;
  }, [focusedTagName, isTags, sortedItems]);

  const isTagFocusMode = isTags && Boolean(focusedTag);

  return {
    focusedTagName,
    setFocusedTagName,
    focusedTag,
    isTagFocusMode,
    handleExitTagFocus,
  };
}

export default useLibraryFocusedTag;
