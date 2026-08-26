import { useMemo, createElement } from 'react';
import Text from '@/ui/Text';
import Tooltip from '@/ui/Tooltip';
import { Play, Pause, Trash2 } from '@/ui/icons';
import { formatBytes } from '@/lib/formatters';
import { getSimplifiedTorrentState } from '@/components/torrent/torrentMatching';
import { useTorrentModals } from './useTorrentModals';
import { TorrentProgressCell, TorrentStatusBadge } from '../components/TorrentTableCells';

export function useTorrentTable({
  t,
  resumeTorrent,
  pauseTorrent,
  deleteTorrent,
}) {
  const { promptDeleteTorrent } = useTorrentModals({ t, deleteTorrent });

  const columns = useMemo(() => [
    {
      key: 'name',
      label: t('torrent.cols.name') || 'Name',
      sortable: true,
      render: (name) => createElement(
        Tooltip,
        { content: name, side: 'top', fullWidth: true },
        createElement(Text, { weight: 'medium', truncate: true }, name)
      ),
    },
    {
      key: 'size',
      label: t('torrent.cols.size') || 'Size',
      align: 'right',
      width: '6.25rem',
      sortable: true,
      render: (size) => createElement(Text, { tabular: true }, formatBytes(size)),
    },
    {
      key: 'progress',
      label: t('torrent.cols.progress') || 'Progress',
      width: '14rem',
      sortable: true,
      render: (progress, row) => createElement(TorrentProgressCell, { progress, row }),
    },
    {
      key: 'state',
      label: t('torrent.cols.status') || 'Status',
      width: '8.125rem',
      align: 'center',
      sortable: true,
      render: (_, row) => createElement(TorrentStatusBadge, { state: getSimplifiedTorrentState(row), t }),
    },
  ], [t]);

  const rowActions = useMemo(() => [
    {
      key: 'resume',
      label: (row) => {
        const isCompleted = (row.progress || 0) >= 100;
        return isCompleted
          ? (t('torrent.actions.startSeeding') || 'Start Seeding')
          : (t('torrent.actions.resume') || 'Resume');
      },
      icon: Play,
      isVisible: (row) => {
        const state = getSimplifiedTorrentState(row);
        return state === 'paused';
      },
      onClick: (row) => resumeTorrent(row),
    },
    {
      key: 'pause',
      label: (row) => {
        const isCompleted = (row.progress || 0) >= 100;
        return isCompleted
          ? (t('torrent.actions.stopSeeding') || 'Stop Seeding')
          : (t('torrent.actions.pause') || 'Pause');
      },
      icon: Pause,
      isVisible: (row) => {
        const state = getSimplifiedTorrentState(row);
        return state !== 'paused';
      },
      onClick: (row) => pauseTorrent(row),
    },
    {
      key: 'delete',
      label: t('torrent.actions.delete') || 'Remove',
      tooltip: t('common.delete') || 'Remove',
      icon: Trash2,
      variant: 'danger',
      onClick: (row) => promptDeleteTorrent(row),
    },
  ], [t, resumeTorrent, pauseTorrent, promptDeleteTorrent]);

  const filterOptions = useMemo(() => [
    { value: 'all', label: t('common.all') || 'All' },
    { value: 'downloading', label: t('torrent.states.downloading') || 'Downloading' },
    { value: 'completed', label: t('torrent.states.completed') || 'Completed' },
    { value: 'paused', label: t('torrent.states.paused') || 'Paused' },
  ], [t]);

  return {
    columns,
    rowActions,
    filterOptions,
    promptDeleteTorrent,
  };
}

export default useTorrentTable;
