import { useMemo, useCallback, createElement } from 'react';
import { Download } from '@/ui/icons';
import TorrentSearchModalContent from '@/components/torrent/TorrentSearchModalContent';
import { parseMediaProviderAndExternalId } from '@/lib/entityIds';

export function useMediaActionModals({
  cleanId,
  item,
  type,
  t,
  openModal,
  closeModal,
}) {
  const { provider, externalId } = useMemo(() => {
    return parseMediaProviderAndExternalId(cleanId);
  }, [cleanId]);

  const handleOpenTorrentSearch = useCallback(() => {
    openModal({
      title: t('torrent.searchModal.title') || 'Search and Download Torrents',
      icon: Download,
      width: 'xl',
      height: 'lg',
      content: createElement(TorrentSearchModalContent, {
        defaultQuery: item?.title || item?.name,
        mediaType: type,
        provider,
        externalId,
        isAdult: Boolean(item?.is_adult || item?.adult || (provider && provider !== 'tmdb')),
        onClose: closeModal,
      }),
    });
  }, [closeModal, externalId, item, openModal, provider, t, type]);

  return {
    provider,
    externalId,
    handleOpenTorrentSearch,
  };
}

export default useMediaActionModals;
