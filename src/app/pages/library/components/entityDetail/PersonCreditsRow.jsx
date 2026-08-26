import VirtualGrid from '@/ui/VirtualGrid';
import PersonCreditsCard from './PersonCreditsCard';

export default function PersonCreditsRow({
  items = [],
  mediaType,
  navigate,
  t,
  scrollSelector = '[class*="discover-grid-wrapper"]',
  torrentEnabled = false,
  openTorrentModal,
  settings,
  playMutation,
}) {
  const isScene = mediaType === 'scenes' || mediaType?.includes('scene');

  return (
    <VirtualGrid
      items={items}
      variant={isScene ? 'auto-scene' : 'auto-poster'}
      scrollSelector={scrollSelector}
      renderItem={(item, i) => (
        <PersonCreditsCard
          key={`${item.id}-${item.type || mediaType}-${item.job || ''}-${i}`}
          item={item}
          mediaType={mediaType}
          navigate={navigate}
          playMutation={playMutation}
          t={t}
          showLibraryBadge={false}
          placeholderIconSize={18}
          settings={settings}
          torrentEnabled={torrentEnabled}
          openTorrentModal={openTorrentModal}
        />
      )}
    />
  );
}
