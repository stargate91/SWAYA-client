import { useState, useCallback, useMemo } from 'react';
import { useAllTagsQuery, useCreateTagMutation } from '@/queries';

export function useEntityTagManager({ item, updatePersonStatusMutation }) {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: allTags = [] } = useAllTagsQuery(item?.is_adult);
  const createTagMutation = useCreateTagMutation();
  const currentTags = useMemo(() => item?.custom_tags || [], [item?.custom_tags]);
  const isBusy = Boolean(updatePersonStatusMutation?.isPending || createTagMutation?.isPending);

  const handleToggleTag = useCallback((tagName) => {
    if (!item?.id || !tagName || !updatePersonStatusMutation) {
      return;
    }

    const isAssigned = currentTags.includes(tagName);
    const nextTags = isAssigned
      ? currentTags.filter((name) => name !== tagName)
      : [...currentTags, tagName];

    updatePersonStatusMutation.mutate({
      personId: item.id,
      payload: {
        custom_tags: nextTags,
      },
    });
  }, [item, currentTags, updatePersonStatusMutation]);

  const handleAddTag = useCallback(async (tagName) => {
    if (!item?.id || !tagName || !updatePersonStatusMutation) {
      return;
    }
    const trimmedName = tagName.trim();
    if (!trimmedName || currentTags.includes(trimmedName)) return;

    const exists = allTags.find((tag) => tag.name.toLowerCase() === trimmedName.toLowerCase());

    if (exists) {
      updatePersonStatusMutation.mutate({
        personId: item.id,
        payload: {
          custom_tags: [...currentTags, exists.name],
        },
      });
      setSearchQuery('');
    } else {
      try {
        await createTagMutation.mutateAsync({
          name: trimmedName,
          color: 'var(--color-accent-blue)',
          is_adult: item?.is_adult || false,
        });

        await updatePersonStatusMutation.mutateAsync({
          personId: item.id,
          payload: {
            custom_tags: [...currentTags, trimmedName],
          },
        });
        setSearchQuery('');
      } catch (err) {
        console.error(err);
      }
    }
  }, [item, currentTags, allTags, createTagMutation, updatePersonStatusMutation]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmed = searchQuery.trim();
      if (!trimmed) return;
      handleAddTag(trimmed);
    }
  }, [searchQuery, handleAddTag]);

  const filteredTags = useMemo(() => {
    return allTags.filter((tag) => {
      const isAssigned = currentTags.some((ct) => ct.toLowerCase() === tag.name.toLowerCase());
      const matchesSearch = tag.name.toLowerCase().includes(searchQuery.toLowerCase());
      return !isAssigned && matchesSearch;
    });
  }, [allTags, currentTags, searchQuery]);

  return {
    allTags,
    currentTags,
    filteredTags,
    searchQuery,
    setSearchQuery,
    isBusy,
    handleToggleTag,
    handleAddTag,
    handleKeyDown,
  };
}
