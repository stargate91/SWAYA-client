import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useUi } from '@/providers/UiProvider';
import { useTranslation } from '@/providers/LanguageContext';
import { useActiveTorrentsQuery, fetchTorrentSearch, useDownloadTorrentMutation } from '@/queries/torrentQueries';

export function useTorrentSearch({
  defaultQuery = '',
  mediaType = 'movie',
  provider,
  externalId,
  isAdult = false,
}) {
  const { t } = useTranslation();
  const { toast } = useUi();
  const queryClient = useQueryClient();
  const { data: activeTorrentsData, refetch: refetchActiveTorrents } = useActiveTorrentsQuery();
  const downloadTorrentMutation = useDownloadTorrentMutation();
  const activeDownloads = activeTorrentsData?.downloads || [];

  const [query, setQuery] = useState(defaultQuery || '');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloadingHash, setDownloadingHash] = useState(null);

  const [selectedSource, setSelectedSource] = useState(null);
  const [selectedResolution, setSelectedResolution] = useState(null);
  const [selectedCodec, setSelectedCodec] = useState(null);

  const performSearch = useCallback(async (searchQuery = query) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setSelectedSource(null);
    setSelectedResolution(null);
    setSelectedCodec(null);
    try {
      const res = await fetchTorrentSearch(queryClient, {
        query: searchQuery,
        categories: isAdult ? '6000' : undefined,
      });
      setResults(res?.results || []);
    } catch (err) {
      console.error('Torrent search error:', err);
      toast(err.message || t('torrent.searchModal.netError') || 'Network error performing search.', 'danger');
    } finally {
      setLoading(false);
    }
  }, [query, isAdult, toast, t, queryClient]);

  useEffect(() => {
    let ignore = false;
    if (defaultQuery) {
      const runInitialSearch = async () => {
        setLoading(true);
        setSelectedSource(null);
        setSelectedResolution(null);
        setSelectedCodec(null);
        try {
          const res = await fetchTorrentSearch(queryClient, {
            query: defaultQuery,
            categories: isAdult ? '6000' : undefined,
          });
          if (!ignore) {
            setResults(res?.results || []);
          }
        } catch (err) {
          if (!ignore) {
            console.error('Torrent search error:', err);
            toast(err.message || t('torrent.searchModal.netError') || 'Network error performing search.', 'danger');
          }
        } finally {
          if (!ignore) {
            setLoading(false);
          }
        }
      };
      runInitialSearch();
    }
    return () => {
      ignore = true;
    };
  }, [defaultQuery, isAdult, toast, t, queryClient]);

  const filteredResults = useMemo(() => {
    return results.filter((item) => {
      if (selectedSource && item.indexer !== selectedSource) return false;
      if (selectedResolution && item.resolution !== selectedResolution) return false;
      if (selectedCodec && item.video_codec !== selectedCodec) return false;
      return true;
    });
  }, [results, selectedSource, selectedResolution, selectedCodec]);

  const availableSources = useMemo(
    () => Array.from(new Set(results.map((r) => r.indexer).filter(Boolean))),
    [results]
  );
  const availableResolutions = useMemo(
    () => Array.from(new Set(results.map((r) => r.resolution).filter(Boolean))).sort(),
    [results]
  );
  const availableCodecs = useMemo(
    () => Array.from(new Set(results.map((r) => r.video_codec).filter(Boolean))).sort(),
    [results]
  );

  const handleDownload = useCallback(async (item) => {
    const identifier = item.magnetUri || item.downloadUrl;
    if (!identifier) {
      toast(t('torrent.searchModal.noLink') || 'No valid magnet link or torrent file found.', 'danger');
      return;
    }

    setDownloadingHash(identifier);
    try {
      const payload = {
        torrent_url: identifier,
        media_type: mediaType || 'movie',
      };
      if (provider) payload.provider = provider;
      if (externalId) payload.external_id = String(externalId);

      const res = await downloadTorrentMutation.mutateAsync(payload);

      if (res && (res.success || res.status === 'success')) {
        toast(t('torrent.searchModal.downloadStarted') || 'Torrent added to download client!', 'success');
        refetchActiveTorrents();
      } else {
        throw new Error(res?.message || 'Unexpected response from server.');
      }
    } catch (err) {
      toast(err.message || 'Failed to start download.', 'danger');
    } finally {
      setDownloadingHash(null);
    }
  }, [mediaType, provider, externalId, downloadTorrentMutation, refetchActiveTorrents, t, toast]);

  return {
    query,
    setQuery,
    performSearch,
    loading,
    resultsCount: results.length,
    filteredResults,
    availableSources,
    availableResolutions,
    availableCodecs,
    selectedSource,
    setSelectedSource,
    selectedResolution,
    setSelectedResolution,
    selectedCodec,
    setSelectedCodec,
    activeDownloads,
    downloadingHash,
    handleDownload,
  };
}
