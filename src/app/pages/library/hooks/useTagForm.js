import { useState, useEffect, useCallback, useRef } from 'react';
import { useAllTagsQuery, useCreateTagMutation, useUpdateTagMutation } from '@/queries';
import api from '@/lib/api';
import { useImagePositionDrag } from './useImagePositionDrag';

export function useTagForm({
  initialTag = null,
  mode = 'create',
  onSuccess,
  onClose,
  defaultColor = 'var(--color-accent-blue)',
  isAdult = false,
  t,
}) {
  const [name, setName] = useState(initialTag?.name || '');
  const [color, setColor] = useState(initialTag?.color || defaultColor);
  const [customImages, setCustomImages] = useState(
    (initialTag?.custom_images || []).map((img) =>
      typeof img === 'string' ? { path: img, position_x: 50, position_y: 50 } : { position_x: 50, position_y: 50, ...img }
    )
  );
  const [newUrl, setNewUrl] = useState('');
  const [selectedFeederboxTag, setSelectedFeederboxTag] = useState(null);
  const [selectedMediaType, setSelectedMediaType] = useState('img');
  const [lightboxUrl, setLightboxUrl] = useState(null);
  const [error, setError] = useState('');
  const [feederboxSuggestions, setFeederboxSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFetchingAsset, setIsFetchingAsset] = useState(false);
  const searchTimeoutRef = useRef(null);
  const containerRef = useRef(null);

  const { data: tags = [] } = useAllTagsQuery(isAdult);
  const createTagMutation = useCreateTagMutation();
  const updateTagMutation = useUpdateTagMutation();
  const formId = mode === 'edit' ? 'edit-tag-form' : 'create-tag-form';

  const { handleDragStart, draggingIndex } = useImagePositionDrag({
    customImages,
    setCustomImages,
  });

  useEffect(() => {
    const formElement = document.getElementById(formId);
    if (formElement) {
      const modalElement = formElement.closest('[data-modal="true"]');
      if (modalElement) {
        modalElement.style.setProperty('--current-tag-color', color);
      }
    }
  }, [color, formId]);

  const handleFileUpload = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (customImages.length >= 3) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setCustomImages((prev) => [...prev, { path: reader.result, position_x: 50, position_y: 50 }]);
    };
    reader.readAsDataURL(file);
  }, [customImages.length]);

  const handleAddUrl = useCallback((e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!newUrl.trim()) return;
    if (customImages.length >= 3) return;
    setCustomImages((prev) => [...prev, { path: newUrl.trim(), position_x: 50, position_y: 50 }]);
    setNewUrl('');
  }, [newUrl, customImages.length]);

  const handleRemoveImage = useCallback((index) => {
    setCustomImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleNameChange = useCallback((val) => {
    setName(val);
    setError('');

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!isAdult || !val || val.trim().length < 2) {
      setFeederboxSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const results = await api.tags.searchFeederbox(val.trim());
        setFeederboxSuggestions(results || []);
        setShowSuggestions((results || []).length > 0);
      } catch {
        setFeederboxSuggestions([]);
      }
    }, 250);
  }, [isAdult]);

  const handleApplyMedia = useCallback(async (item, type) => {
    setSelectedMediaType(type);
    if (type === 'none') {
      setCustomImages([]);
      return;
    }

    setIsFetchingAsset(true);
    try {
      const res = await api.tags.downloadFeederboxAsset(item.name, type);
      if (res?.path) {
        setCustomImages([{ path: res.path, position_x: 50, position_y: 50 }]);
      }
    } catch {
      const fallbackUrl = type === 'vid' ? item.video_url : item.image_url;
      if (fallbackUrl) {
        setCustomImages([{ path: fallbackUrl, position_x: 50, position_y: 50 }]);
      }
    } finally {
      setIsFetchingAsset(false);
    }
  }, []);

  const handleSelectFeederbox = useCallback((item) => {
    setName(item.name);
    setSelectedFeederboxTag(item);
    setShowSuggestions(false);
    setError('');

    const initialType = item.has_image ? 'img' : item.has_video ? 'vid' : 'none';
    handleApplyMedia(item, initialType);
  }, [handleApplyMedia]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, []);

  const handleSubmit = useCallback(async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const trimmedName = name.strip ? name.strip() : name.trim();
    if (!trimmedName) {
      setError(t('library.tags.errorNameRequired') || 'Name is required');
      return;
    }

    // Case-insensitive uniqueness check
    const exists = tags.some(
      (tag) => tag.name.toLowerCase() === trimmedName.toLowerCase() && String(tag.id) !== String(initialTag?.id)
    );
    if (exists) {
      setError(t('library.tags.errorExists') || 'A tag with this name already exists');
      return;
    }

    try {
      if (mode === 'edit' && initialTag?.id != null) {
        await updateTagMutation.mutateAsync({
          id: Number(initialTag.id),
          tagId: Number(initialTag.id),
          payload: { name: trimmedName, color, custom_images: customImages },
        });
      } else {
        await createTagMutation.mutateAsync({
          name: trimmedName,
          color,
          is_adult: isAdult,
          custom_images: customImages,
        });
      }
      onSuccess?.({ id: initialTag?.id, name: trimmedName, color, custom_images: customImages });
      onClose?.();
    } catch (err) {
      setError(err.message || (mode === 'edit' ? 'Failed to update tag' : 'Failed to create tag'));
    }
  }, [name, tags, initialTag, mode, color, customImages, isAdult, updateTagMutation, createTagMutation, onSuccess, onClose, t]);

  return {
    formId,
    name,
    setName,
    color,
    setColor,
    customImages,
    newUrl,
    setNewUrl,
    selectedFeederboxTag,
    selectedMediaType,
    lightboxUrl,
    setLightboxUrl,
    error,
    feederboxSuggestions,
    showSuggestions,
    setShowSuggestions,
    isFetchingAsset,
    containerRef,
    draggingIndex,
    handleDragStart,
    handleFileUpload,
    handleAddUrl,
    handleRemoveImage,
    handleNameChange,
    handleApplyMedia,
    handleSelectFeederbox,
    handleSubmit,
  };
}
