import { useState, useCallback } from 'react';

const PRESET_COLORS = [
  'var(--color-accent-blue)',
  'color-mix(in srgb, var(--color-accent-blue) 75%, white)',
  'color-mix(in srgb, var(--color-accent-blue) 75%, black)',
  'var(--color-state-success)',
  'var(--color-state-warning)',
  'var(--color-state-danger)'
];

export function useCreateListForm({
  onSave,
  t,
  initialList = null,
  mode = 'create',
  existingLists = [],
  existingNames = [],
  defaultIsAdult = false,
}) {
  const getInitialListType = () => {
    if (initialList?.list_type) {
      if (initialList.list_type === 'media') {
        return initialList.is_adult ? 'video_scene' : 'movie_tv';
      }
      return initialList.list_type;
    }
    return defaultIsAdult ? 'video_scene' : 'movie_tv';
  };

  const [name, setName] = useState(initialList?.name || '');
  const [description, setDescription] = useState(initialList?.description || '');
  const [color, setColor] = useState(initialList?.color || PRESET_COLORS[0]);
  const [listType, setListType] = useState(getInitialListType);
  const isAdult = initialList ? Boolean(initialList.is_adult) : Boolean(defaultIsAdult);
  const [error, setError] = useState('');

  const handleSubmit = useCallback((e) => {
    if (e?.preventDefault) e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const otherNames = existingLists.length > 0
      ? existingLists.filter(l => (
          Boolean(l.is_adult) === isAdult &&
          (l.list_type === listType || (l.list_type === 'media' && (isAdult ? listType === 'video_scene' : listType === 'movie_tv'))) &&
          (mode !== 'edit' || l.id !== initialList?.id)
        )).map(l => l.name)
      : (mode === 'edit'
          ? existingNames.filter(n => n.toLowerCase() !== initialList?.name?.toLowerCase())
          : existingNames);

    if (otherNames.some(n => n.toLowerCase() === trimmedName.toLowerCase())) {
      setError(t('lists.error_duplicate_name') || 'A list with this name already exists.');
      return;
    }

    onSave({
      name: trimmedName,
      description: description.trim(),
      color,
      list_type: listType,
      is_adult: isAdult,
    });
  }, [name, description, color, listType, isAdult, existingLists, existingNames, mode, initialList, onSave, t]);

  return {
    name,
    setName,
    description,
    setDescription,
    color,
    setColor,
    listType,
    setListType,
    isAdult,
    error,
    handleSubmit,
    presetColors: PRESET_COLORS,
  };
}
