import { useState } from 'react';
import {
  isLibraryCollectionTab,
  isLibraryPeopleTab,
  isLibraryTvTab,
  isLibraryTagsTab,
  isLibraryVideoTab,
  isLibraryScenesTab,
  isLibraryMovieTab,
  isLibraryStudiosTab,
} from '@/lib/libraryTabs';
import { useLibrarySortOptions } from './useLibrarySortOptions';
import { useLibraryFilterOptions } from './useLibraryFilterOptions';

export function useLibraryFiltersLayout(filterState) {
  const {
    t,
    settings,
    resolvedTab,
    activeSessionMode,
    ownershipFilter,
    peopleRoleFilter,
    genderFilter,
    filterData,
    selectedTags = [],
    tagsFilter = [],
    setSelectedTags,
    setTagsFilter,
  } = filterState;

  const [showAdvanced, setShowAdvanced] = useState(false);

  const isVideoTab = isLibraryVideoTab(resolvedTab);
  const isCollectionTab = isLibraryCollectionTab(resolvedTab);
  const isPeopleTab = isLibraryPeopleTab(resolvedTab);
  const isTagsTab = isLibraryTagsTab(resolvedTab);
  const isTvTab = isLibraryTvTab(resolvedTab);
  const isScenesTab = isLibraryScenesTab(resolvedTab);
  const isMovieTab = isLibraryMovieTab(resolvedTab);
  const isStudiosTab = isLibraryStudiosTab(resolvedTab);

  const actualSelectedTags = selectedTags.length > 0 ? selectedTags : tagsFilter;
  const actualSetSelectedTags = setSelectedTags || setTagsFilter;

  const { sortOptions } = useLibrarySortOptions({
    resolvedTab,
    activeSessionMode,
    settings,
    ownershipFilter,
    t,
  });

  const {
    studioTypeOptions,
    collectionStatusOptions,
    roleOptions,
    shouldShowGenderFilter,
    genderOptions,
    watchedOptions,
    genreOptions,
    performerOptions,
    studioOptions,
    networkOptions,
    tagOptions,
    decadeOptions,
    yearOptions,
  } = useLibraryFilterOptions({
    filterData,
    peopleRoleFilter,
    genderFilter,
    activeSessionMode,
    settings,
    t,
  });

  return {
    showAdvanced,
    setShowAdvanced,
    isVideoTab,
    isCollectionTab,
    isPeopleTab,
    isTagsTab,
    isTvTab,
    isScenesTab,
    isMovieTab,
    isStudiosTab,
    actualSelectedTags,
    actualSetSelectedTags,
    sortOptions,
    studioTypeOptions,
    collectionStatusOptions,
    roleOptions,
    shouldShowGenderFilter,
    genderOptions,
    watchedOptions,
    genreOptions,
    performerOptions,
    studioOptions,
    networkOptions,
    tagOptions,
    decadeOptions,
    yearOptions,
  };
}
