import { Minus, Download } from '@/ui/icons';
import Button from '@/ui/Button';
import { normalizeMediaEntity, formatReleaseDate } from '@/lib/normalizeMediaEntity';
import PosterCard from '@/ui/PosterCard';
import { useListCardActions } from '../hooks/useListCardActions';
import posterCardStyles from '@/ui/PosterCard.module.css';

export default function ListsCard({
  item,
  isSceneList,
  sessionMode,
  settings,
  t,
  handleCardClick,
  handleRemoveListItem,
  torrentEnabled = false,
  openTorrentModal,
}) {
  const { onRemove, onDownload, onCardClick, showDownloadOverlay } = useListCardActions({
    item,
    isSceneList,
    torrentEnabled,
    handleRemoveListItem,
    openTorrentModal,
    handleCardClick,
  });

  const n = normalizeMediaEntity(item, {
    context: 'library',
    settings,
    sessionMode,
  });

  const isScene = n.isScene;
  const posterUrl = n.imageUrl;

  let subtitle = n.subtitle;
  let performers;
  let date;

  if (isScene) {
    performers = n.performers;
    subtitle = undefined;
    date = formatReleaseDate(item);
  }

  const removeAction = (
    <Button
      className={posterCardStyles['action-btn']}
      variant="glass"
      aria-invalid={true}
      onClick={onRemove}
    >
      <Minus size={11} strokeWidth={3.5} /> {t('common.remove') || 'Remove'}
    </Button>
  );

  const downloadOverlay = showDownloadOverlay ? {
    onClick: onDownload,
    icon: <Download size={18} />,
    label: t('common.download') || 'Download',
  } : null;

  const cardAspect = isSceneList ? 'landscape' : 'poster';

  return (
    <PosterCard
      aspect={cardAspect}
      imageUrl={posterUrl}
      title={item.title}
      subtitle={subtitle}
      performers={performers}
      date={date}
      ratingImdb={!isSceneList ? n.ratingImdb : undefined}
      ratingTmdb={!isSceneList ? n.ratingTmdb : undefined}
      bottomAction={removeAction}
      playOverlay={downloadOverlay}
      fillHeight
      onClick={onCardClick}
    />
  );
}
