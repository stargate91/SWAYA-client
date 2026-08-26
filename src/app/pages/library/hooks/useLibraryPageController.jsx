import { useState, useMemo, useCallback } from 'react';
import { useLibraryState } from './useLibraryState';
import { useLibraryModals } from './useLibraryModals';
import { useLibraryScrollSync } from './useLibraryScrollSync';
import { useLibraryFocusedTag } from './useLibraryFocusedTag';
import { useRandomPlay } from './useRandomPlay';
import { useUi } from '@/providers/UiProvider';
import { isLibraryTagsTab, isLibraryPeopleTab, isLibraryStudiosTab, isLibraryScenesTab } from '@/lib/libraryTabs';
import Button from '@/ui/Button';
import { UserPlus, Plus, Play } from '@/ui/icons';

export function useLibraryPageController({
  initialTab = 'movies',
  lockTab = false,
  showTabs = true,
  pageTitle = null,
} = {}) {
  const state = useLibraryState({ initialTab, lockTab, includeTagsTab: true });
  const [imagePickerData, setImagePickerData] = useState(null);
  const { toast } = useUi();

  const {
    focusedTagName,
    setFocusedTagName,
    focusedTag,
    isTagFocusMode,
    handleExitTagFocus,
  } = useLibraryFocusedTag({
    isTags: state.isTags,
    sortedItems: state.sortedItems,
  });

  const modals = useLibraryModals({
    state,
    focusedTagName,
    setFocusedTagName,
  });

  const { sentinelRef } = useLibraryScrollSync({
    currentPage: state.currentPage,
    totalPages: state.totalPages,
    isDataLoading: state.isDataLoading,
    isLoading: state.isLoading,
    paginationMode: state.paginationMode,
    setCurrentPage: state.setCurrentPage,
  });

  const { handleRandomPlay } = useRandomPlay({
    getRandomPlayableItem: state.getRandomPlayableItem,
  });

  const isPlayableTab = ['movies', 'tv', 'scenes', 'videos', 'adult_scenes', 'adult_videos'].includes(state.resolvedTab);
  const isAdultMode = state.activeSessionMode === 'nsfw';
  const showOwnershipSegment = state.resolvedTab === 'movies' || state.resolvedTab === 'tv' || state.resolvedTab === 'scenes';

  const currentTabObj = state.tabs.find((tab) => tab.value === state.resolvedTab);
  const hasItems = currentTabObj ? (currentTabObj.count > 0) : false;
  const showInlineSorter = !showTabs && isLibraryTagsTab(state.resolvedTab) && Boolean(state.setSortKey && state.setSortDirection && state.setCurrentPage);

  const handleOwnershipChange = useCallback((val) => {
    state.setOwnershipFilter(val);
    state.setCurrentPage(1);
  }, [state]);

  const handleSortKeyChange = useCallback((val) => {
    state.setSortKey(val);
    state.setCurrentPage(1);
  }, [state]);

  const handleSortDirectionToggle = useCallback(() => {
    state.setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    state.setCurrentPage(1);
  }, [state]);

  const headerActions = useMemo(() => (
    <>
      {isLibraryPeopleTab(state.resolvedTab) && modals.openAddPeopleModal && (
        <Button variant="primary" size="sm" onClick={modals.openAddPeopleModal} className="library-header-btn">
          <UserPlus size={14} />
          {state.t('library.people.addPeopleBtn') || 'Add People'}
        </Button>
      )}
      {isLibraryStudiosTab(state.resolvedTab) && modals.openAddStudiosModal && (
        <Button variant="primary" size="sm" onClick={modals.openAddStudiosModal} className="library-header-btn">
          <Plus size={14} />
          {state.t('library.studios.addStudiosBtn') || 'Add Studios'}
        </Button>
      )}
      {isLibraryTagsTab(state.resolvedTab) && modals.openCreateTagModal && (
        <Button variant="primary" size="sm" onClick={modals.openCreateTagModal} className="library-header-btn">
          <Plus size={14} />
          {state.t('library.tags.createBtn') || 'Create Tag'}
        </Button>
      )}
      {isPlayableTab && hasItems && handleRandomPlay && (
        <Button variant="secondary" size="sm" onClick={handleRandomPlay} icon={Play} className="library-header-btn">
          {state.t('library.playRandom') || 'Play Random'}
        </Button>
      )}
    </>
  ), [state, modals, isPlayableTab, hasItems, handleRandomPlay]);

  const isScene = isLibraryScenesTab(state.resolvedTab);
  const isStudio = isLibraryStudiosTab(state.resolvedTab);
  const isTag = isLibraryTagsTab(state.resolvedTab);
  const skeletonGridVariant = (isScene || isStudio) ? 'scene' : (isTag ? 'auto-tags' : 'poster');
  const skeletonCardAspect = isStudio ? 'logo' : (isScene ? 'scene' : 'poster');
  const skeletonCount = (isScene || isStudio) ? 8 : (isTag ? 12 : 16);

  const gridProps = {
    t: state.t,
    isDataLoading: state.isDataLoading,
    paginatedItems: state.paginatedItems,
    isTags: state.isTags,
    isCollections: state.isCollections,
    resolvedTab: state.resolvedTab,
    emptyTitle: state.emptyTitle,
    emptyDescription: state.emptyDescription,
    emptyStateVariant: state.emptyStateVariant,
    emptyIcon: state.emptyIcon,
    hasActiveFilters: state.hasActiveFilters,
    onAddPeople: modals.openAddPeopleModal,
    onAddStudios: modals.openAddStudiosModal,
    onCreateTag: modals.openCreateTagModal,
    onEditTag: modals.openEditTagModal,
    onDeleteTag: modals.openDeleteTagModal,
    focusedTag,
    onFocusTag: setFocusedTagName,
    onExitTagFocus: handleExitTagFocus,
    activeSessionMode: state.activeSessionMode,
    onEditImage: setImagePickerData,
    sortKey: state.sortKey,
    onUnfollowPerson: modals.handleUnfollowPerson,
  };

  const imagePickerProps = {
    isOpen: Boolean(imagePickerData),
    onClose: () => setImagePickerData(null),
    title: imagePickerData?.title,
    entityId: imagePickerData?.entityId,
    tmdbId: imagePickerData?.tmdbId,
    imageType: imagePickerData?.imageType,
    entityType: imagePickerData?.entityType,
    currentPath: imagePickerData?.currentPath,
    t: state.t,
    toast,
    externalIds: imagePickerData?.externalIds,
    item: imagePickerData?.item,
    closeOnSelect: false,
  };

  return {
    state,
    toast,
    isAdultMode,
    showOwnershipSegment,
    handleOwnershipChange,
    showInlineSorter,
    handleSortKeyChange,
    handleSortDirectionToggle,
    headerActions,
    isTagFocusMode,
    sentinelRef,
    gridProps,
    imagePickerProps,
    skeletonGridVariant,
    skeletonCardAspect,
    skeletonCount,
    pageTitle: pageTitle || state.t('library.title'),
    showTabs,
  };
}

export default useLibraryPageController;
