import { usePersonCreditsSections } from '../../hooks/usePersonCreditsSections';
import Lightbox from '@/ui/Lightbox';
import PersonCreditsRow from './PersonCreditsRow';
import PersonCreditsHeaderToolbar from './PersonCreditsHeaderToolbar';
import PersonCreditsDiscoverGrid from './PersonCreditsDiscoverGrid';
import PersonCreditsGalleryGrid from './PersonCreditsGalleryGrid';
import styles from './PersonCreditsSections.module.css';

export default function PersonCreditsSections({ id, item, navigate, t }) {
  const creditsState = usePersonCreditsSections({ id, item, t });
  const {
    settings,
    playMutation,
    torrentEnabled,
    openTorrentModal,
    viewMode,
    myLibraryTabs,
    activeLibraryTab,
    activeLibraryItems,
    validFinishes,
    getSnapshotUrl,
    handlePlayFinish,
    lightboxUrl,
    setLightboxUrl,
  } = creditsState;

  return (
    <div className={styles.container}>
      <div className={styles['detail-panel']}>
        <PersonCreditsHeaderToolbar
          {...creditsState}
          item={item}
          t={t}
        />

        {viewMode === 'library' && myLibraryTabs.length > 0 && (
          <div className={styles['discover-grid-wrapper']}>
            <PersonCreditsRow
              items={activeLibraryItems}
              mediaType={activeLibraryTab}
              navigate={navigate}
              t={t}
              settings={settings}
              playMutation={playMutation}
              torrentEnabled={torrentEnabled}
              openTorrentModal={openTorrentModal}
            />
          </div>
        )}

        {viewMode === 'discover' && (
          <PersonCreditsDiscoverGrid
            {...creditsState}
            item={item}
            navigate={navigate}
            t={t}
          />
        )}

        {viewMode === 'gallery' && (
          <PersonCreditsGalleryGrid
            validFinishes={validFinishes}
            getSnapshotUrl={getSnapshotUrl}
            handlePlayFinish={handlePlayFinish}
            setLightboxUrl={setLightboxUrl}
            t={t}
          />
        )}
      </div>

      {lightboxUrl && (
        <Lightbox
          imageUrl={lightboxUrl}
          onClose={() => setLightboxUrl(null)}
          t={t}
        />
      )}
    </div>
  );
}
