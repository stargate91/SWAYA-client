import { useCallback } from 'react';

/**
 * Hook to manage list card actions (item removal, torrent download modal trigger)
 * with event propagation stopping.
 *
 * @param {object} [params={}]
 * @param {object} [params.item] - Media item object
 * @param {boolean} [params.isSceneList=false] - Whether the card is in a scene list
 * @param {boolean} [params.torrentEnabled=false] - Whether torrent downloads are enabled
 * @param {(id: string | number) => void} [params.handleRemoveListItem] - Removal callback
 * @param {(modalConfig: object) => void} [params.openTorrentModal] - Modal trigger callback
 * @param {(item: object) => void} [params.handleCardClick] - Card click callback
 * @returns {{
 *   onRemove: (e: React.MouseEvent) => void,
 *   onDownload: (e: React.MouseEvent) => void,
 *   onCardClick: () => void,
 *   showDownloadOverlay: boolean
 * }}
 */
export function useListCardActions({
  item,
  isSceneList = false,
  torrentEnabled = false,
  handleRemoveListItem,
  openTorrentModal,
  handleCardClick,
} = {}) {
  const onRemove = useCallback(
    (e) => {
      if (e?.stopPropagation) {
        e.stopPropagation();
      }
      if (handleRemoveListItem && item?.id !== undefined) {
        handleRemoveListItem(item.id);
      }
    },
    [handleRemoveListItem, item]
  );

  const onDownload = useCallback(
    (e) => {
      if (e?.stopPropagation) {
        e.stopPropagation();
      }
      if (openTorrentModal && item) {
        openTorrentModal({
          title: item.title,
          mediaType: item.media_type || (isSceneList ? 'scene' : 'movie'),
          provider: item.provider || (isSceneList ? 'stashdb' : 'tmdb'),
          externalId: item.tmdb_id || item.stashdb_id || item.theporndb_id || item.id,
          isAdult: Boolean(isSceneList || item.is_adult),
        });
      }
    },
    [openTorrentModal, item, isSceneList]
  );

  const onCardClick = useCallback(() => {
    if (handleCardClick && item) {
      handleCardClick(item);
    }
  }, [handleCardClick, item]);

  const showDownloadOverlay = Boolean(torrentEnabled && item && !item.in_library);

  return {
    onRemove,
    onDownload,
    onCardClick,
    showDownloadOverlay,
  };
}

export default useListCardActions;
