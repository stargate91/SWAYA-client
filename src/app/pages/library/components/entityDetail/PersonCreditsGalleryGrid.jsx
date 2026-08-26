import VirtualGrid from '@/ui/VirtualGrid';
import GalleryCard from '@/ui/GalleryCard';
import { formatTime } from '@/lib/formatters';
import styles from './PersonCreditsSections.module.css';

export default function PersonCreditsGalleryGrid({
  validFinishes = [],
  getSnapshotUrl,
  handlePlayFinish,
  setLightboxUrl,
  t,
}) {
  return (
    <div className={styles['discover-grid-wrapper']}>
      <VirtualGrid
        items={validFinishes}
        variant="auto-gallery"
        scrollSelector={`.${styles['discover-grid-wrapper']}`}
        renderItem={(finish) => {
          const fullSnapUrl = getSnapshotUrl?.(finish.snapshot_path);
          return (
            <GalleryCard
              key={finish.id}
              imageUrl={fullSnapUrl}
              title={finish.media_title}
              timeLabel={formatTime(finish.video_position)}
              onPlayClick={() => handlePlayFinish?.(finish)}
              onImageClick={() => setLightboxUrl?.(fullSnapUrl)}
              playTitle={t('library.details.playMoment') || 'Play Moment'}
            />
          );
        }}
      />
    </div>
  );
}
