import { Search, List as ListIcon } from '@/ui/icons';
import EmptyState from '@/ui/EmptyState';
import Grid from '@/ui/Grid';
import VirtualGrid from '@/ui/VirtualGrid';
import Skeleton from '@/ui/Skeleton';
import ListsCard from './ListsCard';
import { useTorrentModal } from '@/hooks/useTorrentModal';

export default function ListsGrid({
  isDetailsLoading,
  activeList,
  activeListDetails,
  filteredListItems,
  sessionMode,
  settings,
  t,
  handleCardClick,
  handleRemoveListItem,
}) {
  const { torrentEnabled, openTorrentModal } = useTorrentModal();
  const listType = activeList?.list_type;
  const isSceneList = listType === 'video_scene' || activeList?.name === 'Adult Scenes' || activeList?.name === 'NSFW Watchlist' || activeList?.name === 'Video Watchlist' || (listType === 'media' && Boolean(activeList?.is_adult));

  const gridVariant = isSceneList ? 'scene' : 'poster';
  const skeletonAspect = isSceneList ? 'scene' : 'poster';

  if (isDetailsLoading) {
    return (
      <Grid variant={gridVariant}>
        {Array.from({ length: 12 }).map((_, idx) => (
          <Skeleton.Card key={idx} aspect={skeletonAspect} />
        ))}
      </Grid>
    );
  }

  if (!activeListDetails || !activeListDetails.items || activeListDetails.items.length === 0) {
    return (
      <EmptyState
        title={t('lists.empty_list_title') || 'List is Empty'}
        description={t('lists.empty_list_desc') || 'This list has no items yet.'}
        icon={ListIcon}
        size="lg"
        border="dashed"
        background="solid"
        customStyle={activeList?.color ? {
          '--list-theme-color': activeList.color,
        } : null}
      />
    );
  }

  if (filteredListItems.length === 0) {
    return (
      <EmptyState
        title={t('lists.no_search_results_title') || 'No Matches Found'}
        description={t('lists.no_search_results_desc') || 'Try refining your search query.'}
        icon={Search}
        size="lg"
        border="dashed"
        background="solid"
        customStyle={activeList?.color ? {
          '--list-theme-color': activeList.color,
        } : null}
      />
    );
  }

  return (
    <VirtualGrid
      items={filteredListItems}
      variant={gridVariant}
      scrollSelector="[class*='main--scrollable'], [class*='lists-main']"
      renderItem={(item) => (
        <ListsCard
          key={item.id}
          item={item}
          isSceneList={isSceneList}
          sessionMode={sessionMode}
          settings={settings}
          t={t}
          handleCardClick={handleCardClick}
          handleRemoveListItem={handleRemoveListItem}
          torrentEnabled={torrentEnabled}
          openTorrentModal={openTorrentModal}
        />
      )}
    />
  );
}
