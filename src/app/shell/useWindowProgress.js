import { useEffect, useState } from 'react';
import { useTranslation } from '@/providers/LanguageContext';
import {
  useImageStatusQuery,
  useScanStatusQuery,
  useHydrateStatusQuery,
  useCollectionStatusQuery,
  useSettingsQuery,
  useActiveTorrentsQuery
} from '@/queries';
import {
  getScanProgress,
  formatScanRemaining,
  getScanTaskName,
  getImageProgress,
  formatImageRemaining,
} from './windowProgressUtils';
import { formatSpeed, formatEta } from '@/lib/formatters';

export default function useWindowProgress() {
  const { t } = useTranslation();
  const [now, setNow] = useState(() => Date.now());

  const { data: settings = {} } = useSettingsQuery();
  const torrentEnabled = Boolean(settings?.torrent_enabled);

  const scanStatusQuery = useScanStatusQuery();
  const imageStatusQuery = useImageStatusQuery();
  const hydrateStatusQuery = useHydrateStatusQuery();
  const collectionStatusQuery = useCollectionStatusQuery();
  const torrentStatusQuery = useActiveTorrentsQuery(torrentEnabled);

  const scanStatus = scanStatusQuery.data || null;
  const imageStatus = imageStatusQuery.data || null;
  const hydrateStatus = hydrateStatusQuery.data || null;
  const collectionStatus = collectionStatusQuery.data || null;
  const activeDownloads = (torrentStatusQuery.data?.downloads || []).filter(
    d => d.progress < 100 && d.state === 'downloading'
  );

  const isPrimaryActive = Boolean(scanStatus?.active);
  const isImageActive = Boolean(imageStatus?.active) && !isPrimaryActive;
  const isHydrateActive = Boolean(hydrateStatus?.active);
  const isCollectionActive = Boolean(collectionStatus?.active);
  const isTorrentActive = activeDownloads.length > 0;

  useEffect(() => {
    if (!isPrimaryActive) return undefined;

    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [isPrimaryActive]);

  const isMainActive = isPrimaryActive && (
    scanStatus?.phase === 'collecting' ||
    scanStatus?.phase === 'resolving' ||
    scanStatus?.phase === 'enriching' ||
    scanStatus?.phase === 'organizing' ||
    scanStatus?.phase === 'undoing' ||
    scanStatus?.phase === 'sync_language'
  );

  const isPeopleImportActive = isPrimaryActive && scanStatus?.phase === 'people_importing';
  const isPeopleEnricherActive = isPeopleImportActive || isHydrateActive;

  const rawProgress = isPrimaryActive ? getScanProgress(scanStatus) : 0;

  const scanProgressData = isPrimaryActive && isMainActive
    ? scanStatus.phase === 'sync_language'
      ? {
        taskName: t('progress.sync.running') || 'Syncing metadata languages...',
        progress: Math.round(scanStatus.progress || 0),
        timeRemaining: `${scanStatus.processed_files || 0}/${scanStatus.total_files || 0}`,
        active: true,
        variant: 'primary',
      }
      : {
        taskName: getScanTaskName(scanStatus, t),
        progress: rawProgress,
        timeRemaining: formatScanRemaining(scanStatus, rawProgress, now),
        active: true,
        variant: 'primary',
      }
    : null;

  // Calculate overall torrent progress and speed
  let torrentProgressData = null;
  if (isTorrentActive) {
    const totalProgress = activeDownloads.reduce((sum, d) => sum + d.progress, 0) / activeDownloads.length;
    const overallSpeed = activeDownloads.reduce((sum, d) => sum + d.speed, 0);
    let taskName;
    if (activeDownloads.length === 1) {
      const name = activeDownloads[0].name;
      taskName = t('progress.torrent.downloading_single', { name }) || `Downloading ${name}...`;
      if (taskName.includes('{{name}}')) {
        taskName = taskName.replace('{{name}}', name);
      }
    } else {
      const count = activeDownloads.length;
      taskName = t('progress.torrent.downloading_multiple', { count }) || `Downloading ${count} torrents...`;
      if (taskName.includes('{{count}}')) {
        taskName = taskName.replace('{{count}}', String(count));
      }
    }

    const overallEta = activeDownloads.length > 0 ? Math.max(...activeDownloads.map(d => d.eta || 0)) : 0;
    const etaStr = overallEta > 0 ? ` | ${formatEta(overallEta)}` : '';

    torrentProgressData = {
      taskName,
      progress: Math.round(totalProgress),
      timeRemaining: `${formatSpeed(overallSpeed)}${etaStr}`,
      active: true,
      variant: 'sub',
      downloads: activeDownloads.map(d => ({
        hash: d.hash,
        name: d.name,
        progress: Math.round(d.progress),
        speedText: formatSpeed(d.speed)
      }))
    };
  }

  return {
    hasProgress: isMainActive || isPeopleEnricherActive || isCollectionActive || isImageActive || isTorrentActive,
    scanProgress: scanProgressData,
    imageProgress: isImageActive
      ? {
        taskName: t('progress.images.downloading'),
        progress: getImageProgress(imageStatus),
        timeRemaining: formatImageRemaining(imageStatus),
        active: true,
        variant: 'sub',
      }
      : null,
    hydrateProgress: isPeopleImportActive
      ? {
        taskName: t('progress.people.importing') || 'Importing bulk people...',
        progress: scanStatus.total > 0 ? Math.round((scanStatus.current / scanStatus.total) * 100) : 0,
        timeRemaining: `${scanStatus.current || 0}/${scanStatus.total || 0}`,
        active: true,
        variant: 'sub',
      }
      : isHydrateActive
        ? {
          taskName: t('progress.people.hydrating') || 'Enriching extra people...',
          progress: hydrateStatus.total > 0 ? Math.round((hydrateStatus.current / hydrateStatus.total) * 100) : 0,
          timeRemaining: `${hydrateStatus.current || 0}/${hydrateStatus.total || 0}`,
          active: true,
          variant: 'sub',
        }
        : null,
    collectionProgress: isCollectionActive
      ? {
        taskName: t('progress.collections.enriching') || 'Enriching collections...',
        progress: collectionStatus.total > 0 ? Math.round((collectionStatus.current / collectionStatus.total) * 100) : 0,
        timeRemaining: `${collectionStatus.current || 0}/${collectionStatus.total || 0}`,
        active: true,
        variant: 'sub',
      }
      : null,
    torrentProgress: torrentProgressData,
    syncProgress: null,
  };
}
