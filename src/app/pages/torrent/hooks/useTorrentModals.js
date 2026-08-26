import { useCallback, createElement } from 'react';
import Button from '@/ui/Button';
import Inline from '@/ui/Inline';
import { useUi } from '@/providers/UiProvider';
import TorrentDeleteModalContent from '../components/TorrentDeleteModalContent';

export function useTorrentModals({ t, deleteTorrent }) {
  const { toast, openModal, closeModal } = useUi();

  const handleDeleteOption = useCallback(async (torrent, deleteFiles) => {
    try {
      await deleteTorrent(torrent?.hash, deleteFiles);
      closeModal();
      toast(t('torrent.toasts.deleted') || 'Torrent removed successfully', 'success');
    } catch (err) {
      closeModal();
      toast(err?.message || t('torrent.toasts.deleteFailed') || 'Failed to remove torrent', 'danger');
    }
  }, [deleteTorrent, closeModal, toast, t]);

  const promptDeleteTorrent = useCallback((torrent) => {
    openModal({
      title: t('torrent.deleteConfirmTitle') || 'Remove Download?',
      description:
        t('dynamic.torrent.deleteConfirmDesc', { name: torrent?.name }) ||
        `How do you want to remove '${torrent?.name}'?`,
      variant: 'danger',
      footer: createElement(
        Inline,
        { gap: 'md', justify: 'end' },
        createElement(
          Button,
          { variant: 'ghost', onClick: closeModal },
          t('common.cancel') || 'Cancel'
        )
      ),
      content: createElement(TorrentDeleteModalContent, {
        onRemoveClientOnly: () => handleDeleteOption(torrent, false),
        onRemoveTorrentAndFiles: () => handleDeleteOption(torrent, true),
        t,
      }),
    });
  }, [openModal, t, closeModal, handleDeleteOption]);

  return {
    promptDeleteTorrent,
    handleDeleteOption,
  };
}

export default useTorrentModals;

