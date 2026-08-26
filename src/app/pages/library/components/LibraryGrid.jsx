import { useCallback } from 'react';
import EmptyState from '@/ui/EmptyState';
import Button from '@/ui/Button';
import Stack from '@/ui/Stack';
import Inline from '@/ui/Inline';
import Skeleton from '@/ui/Skeleton';
import Grid from '@/ui/Grid';
import VirtualGrid from '@/ui/VirtualGrid';
import {
  isLibraryPeopleTab,
  isLibraryTagsTab,
  isLibraryScenesTab,
  isLibraryStudiosTab,
} from '@/lib/libraryTabs';
import { Plus, UserPlus, ArrowLeft } from '@/ui/icons';
import { LibraryPosterCard } from './LibraryPosterCard';
import { LibraryTagCard } from './LibraryTagCard';
import ExpandedTagPanel from './ExpandedTagPanel';
import { useLibraryGridActions } from '../hooks/useLibraryGridActions';

export default function LibraryGrid({
  t,
  isDataLoading,
  paginatedItems,
  isTags,
  isCollections,
  resolvedTab,
  emptyTitle,
  emptyDescription,
  emptyStateVariant,
  emptyIcon,
  hasActiveFilters,
  onAddPeople,
  onAddStudios,
  onCreateTag,
  onEditTag,
  onDeleteTag,
  focusedTag,
  onFocusTag,
  onExitTagFocus,
  activeSessionMode,
  onEditImage,
  sortKey,
  onUnfollowPerson,
}) {
  const {
    settings,
    playMutation,
    bulkUpdateWatchedMutation,
    handlePlayOverlayClick,
    handleUnfollowStudio,
    handleItemClick,
    openImagePicker,
    resolvePosterUrl,
  } = useLibraryGridActions({
    resolvedTab,
    isTags,
    isCollections,
    onEditImage,
    t,
  });

  const renderTagItem = useCallback(
    (item, index) => (
      <LibraryTagCard
        key={item.name}
        item={item}
        index={index}
        t={t}
        onFocusTag={onFocusTag}
        onEditTag={onEditTag}
        onDeleteTag={onDeleteTag}
        resolvePosterUrl={resolvePosterUrl}
      />
    ),
    [t, onFocusTag, onEditTag, onDeleteTag, resolvePosterUrl]
  );

  const renderPosterItem = useCallback(
    (item, index) => (
      <LibraryPosterCard
        key={item.id ? `${item.type || item.media_type || resolvedTab || 'item'}-${item.id}` : index}
        item={item}
        index={index}
        resolvedTab={resolvedTab}
        isCollections={isCollections}
        emptyIcon={emptyIcon}
        t={t}
        playMutationPending={playMutation.isPending}
        onItemClick={handleItemClick}
        onPlayOverlayClick={handlePlayOverlayClick}
        onEditImageClick={openImagePicker}
        onUnfollow={onUnfollowPerson}
        onUnfollowStudio={handleUnfollowStudio}
        settings={settings}
        sortKey={sortKey}
        bulkUpdateWatchedMutation={bulkUpdateWatchedMutation}
      />
    ),
    [
      resolvedTab,
      isCollections,
      emptyIcon,
      t,
      playMutation.isPending,
      handleItemClick,
      handlePlayOverlayClick,
      openImagePicker,
      onUnfollowPerson,
      handleUnfollowStudio,
      settings,
      sortKey,
      bulkUpdateWatchedMutation,
    ]
  );

  if (isDataLoading && paginatedItems.length === 0) {
    const isScene = isLibraryScenesTab(resolvedTab);
    const isStudio = isLibraryStudiosTab(resolvedTab);
    const isTag = isLibraryTagsTab(resolvedTab);
    const gridVariant = (isScene || isStudio) ? 'scene' : (isTag ? 'auto-tags' : 'poster');
    const cardAspect = isStudio ? 'logo' : (isScene ? 'scene' : 'poster');

    return (
      <div className="library-content">
        <Grid variant={gridVariant}>
          {Array.from({ length: (isScene || isStudio) ? 8 : (isTag ? 12 : 16) }).map((_, idx) => (
            <Skeleton.Card key={idx} aspect={cardAspect} />
          ))}
        </Grid>
      </div>
    );
  }

  return (
    <div className="library-content">
      {focusedTag || paginatedItems.length > 0 ? (
        isTags ? (
          focusedTag ? (
            <Stack gap="lg" fullWidth>
              <Inline align="center" justify="start">
                <Button variant="secondary-neutral" leftIcon={<ArrowLeft size={14} />} animateIcon onClick={onExitTagFocus}>
                  {t('library.tags.backToTags') || 'Back to Tags'}
                </Button>
              </Inline>
              <ExpandedTagPanel
                key={focusedTag.name}
                tag={focusedTag}
                t={t}
                resolvePosterUrl={resolvePosterUrl}
                emptyIcon={emptyIcon}
                isFocusMode
                activeSessionMode={activeSessionMode}
              />
            </Stack>
          ) : (
            <VirtualGrid
              items={paginatedItems}
              variant="auto-tags"
              gap="xl"
              scrollSelector=".shell__content"
              renderItem={renderTagItem}
            />
          )
        ) : (
          <VirtualGrid
            items={paginatedItems}
            variant={(isLibraryScenesTab(resolvedTab) || isLibraryStudiosTab(resolvedTab)) ? 'scene' : 'poster'}
            scrollSelector=".shell__content"
            renderItem={renderPosterItem}
          />
        )
      ) : (
        <EmptyState
          size="lg"
          border={emptyStateVariant === 'default' ? 'solid' : 'dashed'}
          background="solid"
          title={emptyTitle}
          description={emptyDescription}
          icon={emptyIcon}
          actions={
            isLibraryPeopleTab(resolvedTab) && onAddPeople && !hasActiveFilters ? (
              <Button variant="primary" size="sm" onClick={onAddPeople}>
                <UserPlus size={16} />
                {t('library.people.addPeopleBtn') || 'Add People'}
              </Button>
            ) : isLibraryStudiosTab(resolvedTab) && onAddStudios && !hasActiveFilters ? (
              <Button variant="primary" size="sm" onClick={onAddStudios}>
                <Plus size={16} />
                {t('library.studios.addStudiosBtn') || 'Add Studios'}
              </Button>
            ) : isLibraryTagsTab(resolvedTab) && onCreateTag && !hasActiveFilters ? (
              <Button variant="primary" size="sm" onClick={onCreateTag}>
                <Plus size={16} />
                {t('library.tags.createBtn') || 'Create Tag'}
              </Button>
            ) : null
          }
        />
      )}
    </div>
  );
}

