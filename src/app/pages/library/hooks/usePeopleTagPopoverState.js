import { useCallback, useMemo } from 'react';
import { useEntityTagManager } from './useEntityTagManager';

/**
 * Custom hook to prepare tag chips, suggested tags,
 * autocomplete state, and creation handlers for PeopleTagPopover.
 *
 * @param {object} params
 * @param {object} params.item - Person entity item
 * @param {object} params.updatePersonStatusMutation - Mutation to update person status/tags
 * @param {Function} [params.t] - Translation function
 */
export function usePeopleTagPopoverState({
  item,
  updatePersonStatusMutation,
} = {}) {
  const {
    allTags,
    currentTags,
    filteredTags,
    searchQuery,
    setSearchQuery,
    isBusy,
    handleToggleTag,
    handleAddTag,
    handleKeyDown,
  } = useEntityTagManager({ item, updatePersonStatusMutation });

  const assignedChips = useMemo(() => {
    return currentTags.map((tagName) => {
      const tagObj = allTags.find((tag) => tag.name === tagName);
      const color = tagObj?.color || 'var(--color-accent)';
      return {
        name: tagName,
        color,
        onRemove: () => handleToggleTag(tagName),
      };
    });
  }, [currentTags, allTags, handleToggleTag]);

  const suggestedTags = useMemo(() => item?.suggested_tags || [], [item]);
  const hasSuggestedTags = suggestedTags.length > 0;

  const suggestedChips = useMemo(() => {
    if (!hasSuggestedTags) return [];
    return suggestedTags
      .filter((tagName) => !currentTags.includes(tagName))
      .map((tagName) => ({
        name: tagName,
        onAdd: () => handleAddTag(tagName),
      }));
  }, [hasSuggestedTags, suggestedTags, currentTags, handleAddTag]);

  const allSuggestedAssigned = useMemo(() => {
    if (!hasSuggestedTags) return false;
    return suggestedTags.every((t) => currentTags.includes(t));
  }, [hasSuggestedTags, suggestedTags, currentTags]);

  const trimmedSearch = useMemo(() => searchQuery.trim(), [searchQuery]);

  const showCreateOption = useMemo(() => {
    if (!trimmedSearch) return false;
    const tagExists = allTags.some((t) => t.name.toLowerCase() === trimmedSearch.toLowerCase());
    return !tagExists;
  }, [trimmedSearch, allTags]);

  const onCreateTag = useCallback(
    (closeDropdown) => {
      if (trimmedSearch) {
        void handleAddTag(trimmedSearch);
        closeDropdown?.();
      }
    },
    [trimmedSearch, handleAddTag]
  );

  const onSelectTag = useCallback(
    (tag) => {
      if (tag?.name) {
        void handleAddTag(tag.name);
      }
    },
    [handleAddTag]
  );

  const onClearSearch = useCallback(() => {
    setSearchQuery('');
  }, [setSearchQuery]);

  return {
    allTags,
    currentTags,
    assignedChips,
    hasSuggestedTags,
    suggestedChips,
    allSuggestedAssigned,
    filteredTags,
    searchQuery,
    setSearchQuery,
    isBusy,
    trimmedSearch,
    showCreateOption,
    onCreateTag,
    onSelectTag,
    onClearSearch,
    handleKeyDown,
  };
}

export default usePeopleTagPopoverState;
