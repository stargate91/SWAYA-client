import { useCallback, createElement } from 'react';
import { Download } from '@/ui/icons';
import { useUi } from '@/providers/UiProvider';
import { useTranslation } from '@/providers/LanguageContext';
import { useSettingsQuery } from '@/queries/settingsQueries';
import TorrentSearchModalContent from '@/components/torrent/TorrentSearchModalContent';

export function useTorrentModal() {
  const { openModal, closeModal } = useUi();
  const { t } = useTranslation();
  const { data: settings } = useSettingsQuery();
  const torrentEnabled = Boolean(settings?.torrent_enabled);

  const openTorrentModal = useCallback(({ title, name, mediaType, provider, externalId, isAdult }) => {
    openModal({
      title: t('torrent.searchModal.title') || 'Search and Download Torrents',
      icon: Download,
      width: 'xl',
      height: 'lg',
      content: createElement(TorrentSearchModalContent, {
        defaultQuery: title || name,
        mediaType,
        provider,
        externalId,
        isAdult: Boolean(isAdult || (provider && provider !== 'tmdb')),
        onClose: closeModal,
      }),
    });
  }, [openModal, closeModal, t]);

  return {
    torrentEnabled,
    openTorrentModal,
  };
}

export default useTorrentModal;
