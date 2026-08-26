import { useMemo, useCallback } from 'react';
import useQueryParams from '@/hooks/useQueryParams';
import {
  useActiveTorrentsQuery,
  useSettingsQuery,
  usePauseTorrentMutation,
  useResumeTorrentMutation,
  useDeleteTorrentMutation,
} from '@/queries';
import { useTranslation } from '@/providers/LanguageContext';
import { useUi } from '@/providers/UiProvider';
import { getSimplifiedTorrentState, calculateTorrentStats } from '../utils/torrentMatching';

export function useTorrentPage() {
  const { t } = useTranslation();
  const { toast } = useUi();
  const { getString, setParam, setParams } = useQueryParams();

  const { data: settings = {} } = useSettingsQuery();
  const torrentEnabled = Boolean(settings?.torrent_enabled);

  const {
    data: torrentData,
    isLoading,
    refetch,
    isFetching,
  } = useActiveTorrentsQuery(torrentEnabled);

  const torrents = useMemo(() => torrentData?.downloads || [], [torrentData?.downloads]);

  const pauseMutation = usePauseTorrentMutation();
  const resumeMutation = useResumeTorrentMutation();
  const deleteMutation = useDeleteTorrentMutation();

  const activeFilter = getString('filter', 'all');
  const searchQuery = getString('q', '');
  const sortKey = getString('sort', 'name');
  const sortDirection = getString('dir', 'asc');

  const setActiveFilter = useCallback(
    (filter) => {
      setParam('filter', filter === 'all' ? null : filter);
    },
    [setParam]
  );

  const setSearchQuery = useCallback(
    (q) => {
      setParam('q', q || null);
    },
    [setParam]
  );

  const handleSort = useCallback(
    (key) => {
      if (sortKey === key) {
        setParam('dir', sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setParams({ sort: key, dir: 'asc' });
      }
    },
    [sortKey, sortDirection, setParam, setParams]
  );

  const stats = useMemo(() => calculateTorrentStats(torrents), [torrents]);

  const filteredTorrents = useMemo(() => {
    const list = torrents
      .filter((t) => {
        const state = getSimplifiedTorrentState(t);
        if (activeFilter === 'downloading') return state === 'downloading';
        if (activeFilter === 'completed' || activeFilter === 'seeding') {
          return state === 'seeding' || state === 'completed' || (t.progress >= 100 && state !== 'paused');
        }
        if (activeFilter === 'paused') return state === 'paused';
        return true;
      })
      .filter((t) => {
        if (!searchQuery) return true;
        return (t.name || '').toLowerCase().includes(searchQuery.toLowerCase());
      })
      .map((t) => ({
        ...t,
        id: t.hash,
      }));

    if (sortKey) {
      list.sort((a, b) => {
        let valA, valB;
        if (sortKey === 'name') {
          valA = (a.name || '').toLowerCase();
          valB = (b.name || '').toLowerCase();
          return sortDirection === 'asc'
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }
        if (sortKey === 'size') {
          valA = a.size || 0;
          valB = b.size || 0;
          return sortDirection === 'asc' ? valA - valB : valB - valA;
        }
        if (sortKey === 'progress') {
          valA = a.progress || 0;
          valB = b.progress || 0;
          return sortDirection === 'asc' ? valA - valB : valB - valA;
        }
        if (sortKey === 'state') {
          valA = getSimplifiedTorrentState(a);
          valB = getSimplifiedTorrentState(b);
          return sortDirection === 'asc'
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }
        return 0;
      });
    }

    return list;
  }, [torrents, activeFilter, searchQuery, sortKey, sortDirection]);

  const pauseTorrent = useCallback((rowOrHash) => {
    const hash = typeof rowOrHash === 'object' ? rowOrHash.hash : rowOrHash;
    const row = typeof rowOrHash === 'object' ? rowOrHash : null;
    const state = row ? getSimplifiedTorrentState(row) : '';
    const isSeeding = state === 'seeding' || ((row?.progress || 0) >= 100);

    const successMsg = isSeeding
      ? (t('torrent.toasts.seedingStopped') || 'Seeding stopped')
      : (t('torrent.toasts.paused') || 'Download paused');
    const failMsg = isSeeding
      ? (t('torrent.toasts.stopSeedingFailed') || 'Could not stop seeding')
      : (t('torrent.toasts.pauseFailed') || 'Could not pause download');

    pauseMutation.mutate(hash, {
      onSuccess: () => {
        toast(successMsg, 'success');
      },
      onError: (err) => {
        toast(err.message || failMsg, 'danger');
      },
    });
  }, [pauseMutation, toast, t]);

  const resumeTorrent = useCallback((rowOrHash) => {
    const hash = typeof rowOrHash === 'object' ? rowOrHash.hash : rowOrHash;
    const row = typeof rowOrHash === 'object' ? rowOrHash : null;
    const state = row ? getSimplifiedTorrentState(row) : '';
    const isCompleted = ((row?.progress || 0) >= 100) || state === 'completed';

    const successMsg = isCompleted
      ? (t('torrent.toasts.seedingStarted') || 'Seeding started')
      : (t('torrent.toasts.resumed') || 'Download resumed');
    const failMsg = isCompleted
      ? (t('torrent.toasts.startSeedingFailed') || 'Could not start seeding')
      : (t('torrent.toasts.resumeFailed') || 'Could not resume download');

    resumeMutation.mutate(hash, {
      onSuccess: () => {
        toast(successMsg, 'success');
      },
      onError: (err) => {
        toast(err.message || failMsg, 'danger');
      },
    });
  }, [resumeMutation, toast, t]);

  const deleteTorrent = useCallback((hash, deleteFiles = false) => {
    return deleteMutation.mutateAsync({ hash, deleteFiles });
  }, [deleteMutation]);

  const activeDownloadsRatio = `${stats.downloadingCount} / ${stats.totalCount}`;

  return {
    torrentEnabled,
    isLoading,
    isFetching,
    refetch,
    torrents,
    filteredTorrents,
    stats,
    activeDownloadsRatio,
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
    sortKey,
    sortDirection,
    handleSort,
    pauseTorrent,
    resumeTorrent,
    deleteTorrent,
    isDeleting: deleteMutation.isPending,
  };
}
