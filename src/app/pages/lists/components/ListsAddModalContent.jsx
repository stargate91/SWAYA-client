import Stack from '@/ui/Stack';
import useListsAddDrawer from '../hooks/useListsAddDrawer';
import DrawerSearchHeader from './DrawerSearchHeader';
import DrawerResultsList from './DrawerResultsList';

export default function ListsAddModalContent({
  activeList,
  addListItemMutation,
  activeListDetails,
  t,
}) {
  const state = useListsAddDrawer({
    isOpen: true,
    activeList,
    addListItemMutation,
    activeListDetails,
    t,
  });

  if (!activeList) return null;
  const listType = activeList.list_type;

  return (
    <Stack flex={1} fullHeight fill>
      <DrawerSearchHeader
        isSfwVideoList={!state.isAdultActive && listType === 'video_scene'}
        isAdultActive={state.isAdultActive}
        source={state.source}
        onSourceChange={state.handleSourceChange}
        mediaType={state.mediaType}
        setMediaType={state.setMediaType}
        mediaTypeOptions={state.mediaTypeOptions}
        showMediaTypeChips={state.showMediaTypeChips}
        provider={state.provider}
        setProvider={state.setProvider}
        providerOptions={state.providerOptions}
        showProviderChips={state.showProviderChips}
        statusFilter={state.statusFilter}
        setStatusFilter={state.setStatusFilter}
        query={state.query}
        setQuery={state.setQuery}
        placeholder={state.placeholder}
        setResults={state.setResults}
        t={t}
      />

      <DrawerResultsList
        searching={state.searching}
        loadingMore={state.loadingMore}
        results={state.results}
        filteredResults={state.filteredResults}
        query={state.query}
        isAdded={state.isAdded}
        listType={listType}
        mediaType={state.mediaType}
        skeletonAspect={state.skeletonAspect}
        t={t}
        handleScroll={state.handleScroll}
        handleAdd={state.handleAdd}
        handleRemove={state.handleRemove}
      />
    </Stack>
  );
}
