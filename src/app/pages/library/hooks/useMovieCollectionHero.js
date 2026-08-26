import { useState, useMemo, useCallback, createElement } from 'react';
import { Layers, Check, X } from '@/ui/icons';
import { getOriginalImageUrlHelper } from '@/lib/imageUrls';
import { API_BASE } from '@/lib/backend';

export function useMovieCollectionHero({
  item,
  mediaUrl,
  metaPills = [],
  t,
}) {
  const [lightboxUrl, setLightboxUrl] = useState(null);

  const getOriginalUrl = useCallback(() => {
    return getOriginalImageUrlHelper(false, item, mediaUrl, API_BASE);
  }, [item, mediaUrl]);

  const handleOpenOriginalImage = useCallback(() => {
    const url = getOriginalUrl();
    if (url) {
      setLightboxUrl(url);
    }
  }, [getOriginalUrl]);

  const handleCloseLightbox = useCallback(() => {
    setLightboxUrl(null);
  }, []);

  const totalCount = item?.total_count;
  const ownedCount = item?.owned_count;

  const missingCount = useMemo(() => {
    return (totalCount !== undefined && ownedCount !== undefined)
      ? totalCount - ownedCount
      : 0;
  }, [totalCount, ownedCount]);

  const resolvedMetaPills = useMemo(() => {
    if (metaPills && metaPills.length > 0) {
      return metaPills;
    }

    return [
      totalCount !== undefined ? {
        key: 'total-count',
        icon: createElement(Layers, { size: 14 }),
        content: t?.('library.details.totalCount', {
          count: totalCount,
          defaultValue: `${totalCount} total`,
        }) || `${totalCount} total`,
      } : null,
      ownedCount !== undefined ? {
        key: 'owned-count',
        icon: Number(ownedCount) === 0 ? createElement(X, { size: 14 }) : createElement(Check, { size: 14 }),
        content: t?.('library.details.inLibraryCount', {
          count: ownedCount,
          defaultValue: `${ownedCount} in library`,
        }) || `${ownedCount} in library`,
      } : null,
      missingCount > 0 ? {
        key: 'missing-count',
        icon: createElement(X, { size: 14 }),
        content: t?.('library.details.missingCount', {
          count: missingCount,
          defaultValue: `${missingCount} missing`,
        }) || `${missingCount} missing`,
      } : null,
    ].filter(Boolean);
  }, [metaPills, totalCount, ownedCount, missingCount, t]);

  const displayTitle = item?.title || item?.name || 'Unknown Collection';

  return {
    displayTitle,
    resolvedMetaPills,
    missingCount,
    lightboxUrl,
    handleOpenOriginalImage,
    handleCloseLightbox,
  };
}

export default useMovieCollectionHero;
