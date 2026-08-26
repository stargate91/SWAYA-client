import { useState, useMemo, useCallback } from 'react';

export const PRESET_BLACKLIST = [
  'gay', 'bisexual', 'transgender', 'cuckold',
  'group sex', 'gangbang', 'hentai', 'parody', 'anal', 'pegging', 'bdsm', 'feet',
  'pregnant', 'cartoon', 'anime', 'fetish',
  'ebony', 'black man', 'black woman', 'asian', 'latina', 'interracial',
];

/**
 * Hook for managing the adult tag blacklist state, adding, removing, and preset tags.
 */
export function useTagSafetyFilters(blacklistField) {
  const [newBlacklistWord, setNewBlacklistWord] = useState('');

  // Normalize string comma-separated tags to array list
  const currentBlacklist = useMemo(() => {
    const val = blacklistField?.value || '';
    return val
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
  }, [blacklistField?.value]);

  // Handlers to add/remove tags
  const handleAddBlacklist = useCallback(
    (tag) => {
      const trimmed = (tag || '').trim().toLowerCase();
      if (!trimmed || currentBlacklist.includes(trimmed)) return;
      const updated = [...currentBlacklist, trimmed].join(', ');
      blacklistField?.onChange?.({ target: { value: updated } });
    },
    [currentBlacklist, blacklistField]
  );

  const handleRemoveBlacklist = useCallback(
    (tag) => {
      const updated = currentBlacklist.filter((t) => t !== tag).join(', ');
      blacklistField?.onChange?.({ target: { value: updated } });
    },
    [currentBlacklist, blacklistField]
  );

  const handleAddCustomWord = useCallback(() => {
    handleAddBlacklist(newBlacklistWord);
    setNewBlacklistWord('');
  }, [handleAddBlacklist, newBlacklistWord]);

  return {
    newBlacklistWord,
    setNewBlacklistWord,
    currentBlacklist,
    handleAddBlacklist,
    handleRemoveBlacklist,
    handleAddCustomWord,
    presetBlacklist: PRESET_BLACKLIST,
  };
}

export default useTagSafetyFilters;
