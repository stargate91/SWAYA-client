import { useMemo, useCallback } from 'react';
import { resolveMediaImageUrl, resolveCustomImageUrl } from '@/lib/imageUrls';
import { isPersonMediaType, isSceneMediaType } from '@/lib/mediaTypes';

export function useLibraryTagCardViewModel({
  item,
  onFocusTag,
  onEditTag,
  onDeleteTag,
  resolvePosterUrl,
}) {
  const samplePreviews = useMemo(() => {
    return Array.isArray(item?.sample_previews) ? item.sample_previews.slice(0, 3) : [];
  }, [item]);

  const previewCount = samplePreviews.length;
  const singlePreview = previewCount === 1 ? samplePreviews[0] : null;

  const singlePreviewImage = useMemo(() => {
    if (!singlePreview) return '';
    const raw = singlePreview.poster || singlePreview.backdrop || singlePreview.still;
    if (!raw) return '';
    if (singlePreview.kind === 'custom' || raw.startsWith('/media') || raw.startsWith('http') || raw.startsWith('data:')) {
      return resolveCustomImageUrl(raw);
    }
    const isPerson = isPersonMediaType(singlePreview.kind);
    if (isPerson) {
      return singlePreview.backdrop ? resolveMediaImageUrl(singlePreview.backdrop, 'backdrop') : '';
    }
    const isScene = isSceneMediaType(singlePreview.kind);
    if (isScene) {
      return singlePreview.still ? resolveMediaImageUrl(singlePreview.still, 'still') : '';
    }
    return resolveMediaImageUrl(singlePreview.backdrop || singlePreview.poster, 'backdrop');
  }, [singlePreview]);

  const isVideoPreview = Boolean(
    previewCount === 1 &&
    singlePreviewImage &&
    (singlePreviewImage.endsWith('.webm') || singlePreviewImage.endsWith('.mp4'))
  );

  const resolvePreviewUrl = useCallback((preview) => {
    if (!preview) return '';
    const raw = preview.poster || preview.still || preview.backdrop;
    if (!raw) return '';
    if (preview.kind === 'custom' || raw.startsWith('/media') || raw.startsWith('http') || raw.startsWith('data:')) {
      return resolveCustomImageUrl(raw);
    }
    if (isSceneMediaType(preview.kind)) {
      return resolveMediaImageUrl(preview.still || preview.backdrop || preview.poster, 'still');
    }
    return resolvePosterUrl ? resolvePosterUrl(preview.poster) : resolveMediaImageUrl(preview.poster, 'poster');
  }, [resolvePosterUrl]);

  const handleCardClick = useCallback(() => {
    onFocusTag?.(item?.name);
  }, [onFocusTag, item?.name]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onFocusTag?.(item?.name);
    }
  }, [onFocusTag, item?.name]);

  const handleEditClick = useCallback((event) => {
    event.stopPropagation();
    onEditTag?.(item);
  }, [onEditTag, item]);

  const handleDeleteClick = useCallback((event) => {
    event.stopPropagation();
    onDeleteTag?.(item);
  }, [onDeleteTag, item]);

  return {
    samplePreviews,
    previewCount,
    singlePreviewImage,
    isVideoPreview,
    resolvePreviewUrl,
    handleCardClick,
    handleKeyDown,
    handleEditClick,
    handleDeleteClick,
  };
}
