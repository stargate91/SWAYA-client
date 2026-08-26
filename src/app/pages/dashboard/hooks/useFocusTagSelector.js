import { useState, useMemo } from 'react';
import { useUpdateSettingsMutation } from '@/queries/settingsQueries';
import { getProviderTags } from '@/lib/tags';

export function useFocusTagSelector({ provider, currentFocus }) {
  const [prevFocus, setPrevFocus] = useState(currentFocus);
  const [inputValue, setInputValue] = useState(currentFocus || '');
  const updateSettingsMutation = useUpdateSettingsMutation();

  if (currentFocus !== prevFocus) {
    setPrevFocus(currentFocus);
    setInputValue(currentFocus || '');
  }

  const settingKey = `adult_${provider?.toLowerCase()}_focus_tag`;

  // Load correct tags list based on provider
  const tagsList = useMemo(() => getProviderTags(provider), [provider]);

  // Filter autocomplete options (case-insensitive contains check, return plain string array)
  const filteredOptions = useMemo(() => {
    if (!inputValue.trim()) {
      return tagsList;
    }
    const term = inputValue.toLowerCase();
    return tagsList.filter((tag) => tag.toLowerCase().includes(term));
  }, [inputValue, tagsList]);

  const handleSelect = async (tag) => {
    try {
      const selectedTag = typeof tag === 'string' ? tag : (tag?.name || tag?.label || String(tag));
      setInputValue(selectedTag);
      await updateSettingsMutation.mutateAsync({ [settingKey]: selectedTag });
    } catch (err) {
      console.error('Failed to update focus tag:', err);
    }
  };

  const handleClear = async () => {
    try {
      setInputValue('');
      await updateSettingsMutation.mutateAsync({ [settingKey]: '' });
    } catch (err) {
      console.error('Failed to clear focus tag:', err);
    }
  };

  return {
    inputValue,
    setInputValue,
    filteredOptions,
    handleSelect,
    handleClear,
    isUpdating: updateSettingsMutation.isPending,
  };
}
