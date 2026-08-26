import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { fetchMediaPreviewUrl } from '@/queries/metadataQueries';

/**
 * Hook to manage video hover preview state and async URL fetching for media items.
 *
 * @param {string|number|null|undefined} previewItemId - Media item ID to check/fetch preview for
 * @param {Object} options
 * @param {boolean} [options.isHovered=false] - Whether the parent element/card is currently hovered
 * @param {boolean} [options.previewEnabled=true] - Whether hover previews are enabled for this entity
 * @param {number} [options.previewDelay=800] - Default delay in ms before triggering the preview lookup
 * @param {Object} [options.settings] - Optional pre-fetched settings object
 * @returns {{ previewSrc: string|null, isLoadingPreview: boolean, isHoverPreviewsEnabled: boolean }}
 */
export function useMediaHoverPreview(previewItemId, {
  isHovered = false,
  previewEnabled = true,
  previewDelay = 800,
  settings: propSettings,
} = {}) {
  const [previewSrc, setPreviewSrc] = useState(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const queryClient = useQueryClient();

  const settings = propSettings || (queryClient ? queryClient.getQueryData(['settings']) : null) || {};
  const isHoverPreviewsEnabled = settings.hover_previews_enabled !== false;
  const hoverPreviewsDelay = settings.hover_previews_delay ?? previewDelay;

  const shouldPreview = Boolean(previewItemId && previewEnabled && isHovered && isHoverPreviewsEnabled);

  useEffect(() => {
    if (!shouldPreview) {
      return;
    }

    let active = true;
    let controller = null;

    const timer = setTimeout(async () => {
      if (!active) return;
      setIsLoadingPreview(true);
      try {
        controller = new AbortController();
        const url = await fetchMediaPreviewUrl(queryClient, previewItemId, controller.signal);
        if (url && active) {
          setPreviewSrc(url);
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Failed to load hover video preview:', err);
        }
      } finally {
        if (active) {
          setIsLoadingPreview(false);
        }
      }
    }, hoverPreviewsDelay);

    return () => {
      active = false;
      clearTimeout(timer);
      if (controller) {
        controller.abort();
      }
    };
  }, [shouldPreview, previewItemId, hoverPreviewsDelay, queryClient]);

  return {
    previewSrc: shouldPreview ? previewSrc : null,
    isLoadingPreview: shouldPreview ? isLoadingPreview : false,
    isHoverPreviewsEnabled,
  };
}

export default useMediaHoverPreview;
