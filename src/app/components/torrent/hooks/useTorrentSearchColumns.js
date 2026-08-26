import { useMemo, createElement } from 'react';
import Text from '@/ui/Text';
import { formatBytes } from '@/lib/formatters';
import { TorrentTitleCell, TorrentActionCell } from '../TorrentSearchTableCells';

export function useTorrentSearchColumns({
  t,
  selectedResolution,
  setSelectedResolution,
  selectedCodec,
  setSelectedCodec,
  setSelectedSource,
  activeDownloads,
  downloadingHash,
  handleDownload,
  filteredResults = [],
}) {
  const columns = useMemo(() => [
    {
      key: 'title',
      label: t('torrent.searchModal.colTitle') || 'Title',
      render: (_, item) => createElement(TorrentTitleCell, {
        item,
        selectedResolution,
        setSelectedResolution,
        selectedCodec,
        setSelectedCodec,
      }),
    },
    {
      key: 'size',
      label: t('torrent.searchModal.colSize') || 'Size',
      width: '5.625rem',
      render: (size) => createElement(Text, { tabular: true }, formatBytes(size)),
    },
    {
      key: 'seeders',
      label: t('torrent.searchModal.colSeeders') || 'Seeders',
      width: '5rem',
      render: (seeders) => createElement(Text, { color: 'success', weight: 'bold' }, seeders ?? 0),
    },
    {
      key: 'leechers',
      label: t('torrent.searchModal.colLeechers') || 'Peers',
      width: '5rem',
      render: (leechers) => createElement(Text, { color: 'danger' }, leechers ?? 0),
    },
    {
      key: 'indexer',
      label: t('torrent.searchModal.colSource') || 'Source',
      width: '6.25rem',
      render: (indexer) =>
        indexer ? createElement(
          Text,
          {
            interactive: true,
            color: 'secondary',
            truncate: true,
            onClick: () => setSelectedSource((prev) => (prev === indexer ? null : indexer)),
          },
          indexer
        ) : '-',
    },
    {
      key: 'action',
      label: t('torrent.searchModal.colAction') || 'Action',
      width: '5.625rem',
      align: 'center',
      render: (_, item) => createElement(TorrentActionCell, {
        item,
        activeDownloads,
        downloadingHash,
        handleDownload,
        t,
      }),
    },
  ], [
    t,
    selectedResolution,
    selectedCodec,
    activeDownloads,
    downloadingHash,
    handleDownload,
    setSelectedResolution,
    setSelectedCodec,
    setSelectedSource,
  ]);

  const tableRows = useMemo(() => {
    return filteredResults.map((item, index) => ({
      ...item,
      id: item.guid || item.magnetUri || item.downloadUrl || String(index),
    }));
  }, [filteredResults]);

  return {
    columns,
    tableRows,
  };
}

export default useTorrentSearchColumns;
