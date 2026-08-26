import { useMemo } from 'react';
import { Image, Zap, Package, Download, RefreshCw } from '@/ui/icons';

const INDICATOR_CONFIGS = [
  { key: 'image', label: 'Images', icon: Image },
  { key: 'hydrate', label: 'Hydrate', icon: Zap },
  { key: 'collection', label: 'Collection', icon: Package },
  { key: 'torrent', label: 'Downloads', icon: Download },
  { key: 'sync', label: 'Sync', icon: RefreshCw },
];

/**
 * Custom hook to aggregate sub-process progress data,
 * calculate percentages, format tooltips, and produce indicator models.
 *
 * @param {object} params
 * @param {object} [params.imageProgress]
 * @param {object} [params.hydrateProgress]
 * @param {object} [params.collectionProgress]
 * @param {object} [params.torrentProgress]
 * @param {object} [params.syncProgress]
 */
export function useSubProcessIndicatorsData({
  imageProgress,
  hydrateProgress,
  collectionProgress,
  torrentProgress,
  syncProgress,
} = {}) {
  const dataMap = useMemo(() => ({
    image: imageProgress,
    hydrate: hydrateProgress,
    collection: collectionProgress,
    torrent: torrentProgress,
    sync: syncProgress,
  }), [imageProgress, hydrateProgress, collectionProgress, torrentProgress, syncProgress]);

  const indicatorItems = useMemo(() => {
    return INDICATOR_CONFIGS.map(({ key, label, icon }) => {
      const data = dataMap[key];
      const isActive = Boolean(data);
      const percent = data ? Math.round(data.progress || 0) : 0;
      const percentageText = `${percent}%`;

      const hasTorrentDownloads = key === 'torrent' && Array.isArray(data?.downloads) && data.downloads.length > 0;

      const fallbackTooltip = isActive
        ? `${data.taskName || label}: ${percentageText}`
        : label;

      return {
        key,
        label,
        icon,
        data,
        isActive,
        percent,
        percentageText,
        hasTorrentDownloads,
        fallbackTooltip,
        downloads: hasTorrentDownloads ? data.downloads : null,
      };
    });
  }, [dataMap]);

  const hasAnyActive = useMemo(() => {
    return indicatorItems.some((item) => item.isActive);
  }, [indicatorItems]);

  return {
    indicatorItems,
    hasAnyActive,
  };
}

export default useSubProcessIndicatorsData;
