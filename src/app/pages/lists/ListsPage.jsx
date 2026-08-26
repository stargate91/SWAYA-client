import Page from '@/ui/Page';
import EmptyState from '@/ui/EmptyState';
import SidePanelLayout from '@/ui/SidePanelLayout';
import Stack from '@/ui/Stack';
import { List as ListIcon } from '@/ui/icons';
import useListsPageState from './hooks/useListsPageState';
import { useListsModals } from './hooks/useListsModals';
import ListsSidebar from './components/ListsSidebar';
import ListsHeader from './components/ListsHeader';
import ListsGrid from './components/ListsGrid';
import ListImageSelectorDrawer from './components/ListImageSelectorDrawer';

export default function ListsPage() {
  const {
    t,
    isLoading,
    lists,
    activeListId,
    setActiveListId,
    activeList,
    activeListDetails,
    isDetailsLoading,
    fileInputRef,
    handleFileChange,
    handleTriggerImport,
    handleExportList,
    handleCardClick,
    handleRemoveListItem,
    createdLabel,
    filteredListItems,
    addListItemMutation,
    createMutation,
    updateMutation,
    deleteMutation,
    uploadImageMutation,
    overrideImageMutation,
    settings,
    sessionMode,
    filters,
  } = useListsPageState();

  const {
    isImageDrawerOpen,
    openImageDrawer,
    closeImageDrawer,
    handleStartCreate,
    handleStartEdit,
    handleDelete,
    handleStartAddItems,
  } = useListsModals({
    t,
    lists,
    sessionMode,
    activeList,
    activeListId,
    setActiveListId,
    activeListDetails,
    createMutation,
    updateMutation,
    deleteMutation,
    addListItemMutation,
  });

  return (
    <Page variant="viewport">
      <SidePanelLayout
        side="left"
        variant="plain"
        gap="clamp(var(--space-2xl), 2.5vw, var(--space-4xl))"
        fullHeight
        mainScrollable
        panelWidth="clamp(21rem, 20vw, 26rem)"
        panelContent={
          <ListsSidebar
            t={t}
            isLoading={isLoading}
            lists={lists}
            activeListId={activeListId}
            setActiveListId={setActiveListId}
            handleTriggerImport={handleTriggerImport}
            handleStartCreate={handleStartCreate}
            handleStartEdit={handleStartEdit}
            handleDelete={handleDelete}
          />
        }
      >
        <input
          type="file"
          ref={fileInputRef}
          accept=".swayapack,.zip,.json"
          onChange={handleFileChange}
          hidden
        />

        {activeList ? (
          <>
            <ListsHeader
              activeList={activeList}
              createdLabel={createdLabel}
              t={t}
              handleExportList={handleExportList}
              handleStartAddItems={handleStartAddItems}
              filters={filters}
              onImageClick={openImageDrawer}
            />
            <Stack flex={1} fullWidth>
              <ListsGrid
                isDetailsLoading={isDetailsLoading}
                activeList={activeList}
                activeListDetails={activeListDetails}
                filteredListItems={filteredListItems}
                sessionMode={sessionMode}
                settings={settings}
                t={t}
                handleCardClick={handleCardClick}
                handleRemoveListItem={handleRemoveListItem}
              />
            </Stack>
          </>
        ) : (
          <EmptyState
            icon={ListIcon}
            iconColor="muted"
            description={t('lists.no_list_selected_desc') || 'Select a list from the sidebar to view its items.'}
            fillHeight
          />
        )}
      </SidePanelLayout>

      <ListImageSelectorDrawer
        isOpen={isImageDrawerOpen}
        onClose={closeImageDrawer}
        list={activeList}
        state={{
          t,
          uploadImageMutation,
          overrideImageMutation,
        }}
      />
    </Page>
  );
}
