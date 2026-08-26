import { useState, useMemo, useCallback } from 'react';
import { useAllTagsQuery } from '@/queries/libraryQueries';

export function useBespokeTagManager({
  customTags = [],
  suggestedTags = [],
  isAdult = false,
  onUpdateTags,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: allTags = [] } = useAllTagsQuery(isAdult);

  const unassignedSuggestions = useMemo(() => {
    return suggestedTags.filter(
      (tag) => !customTags.some((ct) => ct.toLowerCase() === tag.toLowerCase())
    );
  }, [suggestedTags, customTags]);

  const availableTags = useMemo(() => {
    return allTags.filter(
      (tag) => !customTags.some((ct) => ct.toLowerCase() === tag.name.toLowerCase())
    );
  }, [allTags, customTags]);

  const filteredTags = useMemo(() => {
    if (!searchQuery) return availableTags;
    const query = searchQuery.toLowerCase();
    return availableTags.filter((tag) => tag.name.toLowerCase().includes(query));
  }, [availableTags, searchQuery]);

  const handleToggleTag = useCallback((tagName) => {
    const isAssigned = customTags.includes(tagName);
    const nextTags = isAssigned
      ? customTags.filter((name) => name !== tagName)
      : [...customTags, tagName];
    onUpdateTags?.(nextTags);
  }, [customTags, onUpdateTags]);

  const handleAddTag = useCallback((tagName) => {
    if (!tagName) return;
    const trimmed = tagName.trim();
    if (!trimmed || customTags.includes(trimmed)) return;
    onUpdateTags?.([...customTags, trimmed]);
    setSearchQuery('');
  }, [customTags, onUpdateTags]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      e.preventDefault();
      handleAddTag(searchQuery);
    }
  }, [searchQuery, handleAddTag]);

  const getTagColor = useCallback((tagName) => {
    return allTags.find((t) => t.name === tagName)?.color || 'var(--color-accent-blue)';
  }, [allTags]);

  const trimmedQuery = searchQuery.trim();
  const tagExists = allTags.some((t) => t.name.toLowerCase() === trimmedQuery.toLowerCase());
  const canCreateTag = Boolean(trimmedQuery && !tagExists);

  return {
    allTags,
    searchQuery,
    setSearchQuery,
    unassignedSuggestions,
    filteredTags,
    handleToggleTag,
    handleAddTag,
    handleKeyDown,
    getTagColor,
    trimmedQuery,
    canCreateTag,
  };
}

export default useBespokeTagManager;
