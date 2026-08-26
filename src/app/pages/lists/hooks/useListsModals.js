import { useState, useCallback, createElement } from 'react';
import Button from '@/ui/Button';
import Inline from '@/ui/Inline';
import { List as ListIcon, Edit2, AlertTriangle, Users, Video, Film } from '@/ui/icons';
import { useUi } from '@/providers/UiProvider';
import { isNsfwMode } from '@/stores/useLibraryModeStore';
import ListsAddModalContent from '../components/ListsAddModalContent';
import CreateListModalContent from '../components/CreateListModalContent';
import DeleteListModalContent from '../components/DeleteListModalContent';

export function useListsModals({
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
}) {
  const { openModal, closeModal, confirmDialog } = useUi();
  const [isImageDrawerOpen, setIsImageDrawerOpen] = useState(false);

  const openImageDrawer = useCallback(() => setIsImageDrawerOpen(true), []);
  const closeImageDrawer = useCallback(() => setIsImageDrawerOpen(false), []);

  const handleStartCreate = useCallback(() => {
    openModal({
      title: t('lists.create_title') || 'Create Custom List',
      icon: ListIcon,
      content: createElement(CreateListModalContent, {
        onClose: closeModal,
        t,
        mode: 'create',
        existingLists: lists,
        existingNames: lists.map((l) => l.name),
        defaultIsAdult: isNsfwMode(sessionMode),
        onSave: (payload) => {
          createMutation.mutate(payload, {
            onSuccess: (newList) => {
              closeModal();
              if (newList && newList.id) {
                setActiveListId(newList.id);
              }
            },
          });
        },
      }),
      footer: createElement(
        Inline,
        { justify: 'end', gap: 'sm' },
        createElement(
          Button,
          { variant: 'secondary-neutral', onClick: closeModal },
          t('common.cancel') || 'Cancel'
        ),
        createElement(
          Button,
          { variant: 'primary', type: 'submit', form: 'create-list-form' },
          t('common.create') || 'Create'
        )
      ),
    });
  }, [openModal, closeModal, t, lists, sessionMode, createMutation, setActiveListId]);

  const handleStartEdit = useCallback((list, e) => {
    e?.stopPropagation?.();
    openModal({
      title: t('lists.edit_title') || 'Edit List Details',
      icon: Edit2,
      content: createElement(CreateListModalContent, {
        onClose: closeModal,
        t,
        initialList: list,
        mode: 'edit',
        existingLists: lists,
        existingNames: lists.map((l) => l.name),
        onSave: (payload) => {
          updateMutation.mutate(
            {
              listId: list.id,
              payload,
            },
            {
              onSuccess: () => {
                closeModal();
              },
            }
          );
        },
      }),
      footer: createElement(
        Inline,
        { justify: 'end', gap: 'sm' },
        createElement(
          Button,
          { variant: 'secondary-neutral', onClick: closeModal },
          t('common.cancel') || 'Cancel'
        ),
        createElement(
          Button,
          { variant: 'primary', type: 'submit', form: 'create-list-form' },
          t('common.save') || 'Save'
        )
      ),
    });
  }, [openModal, closeModal, t, lists, updateMutation]);

  const handleDelete = useCallback((listId, e) => {
    e?.stopPropagation?.();
    confirmDialog({
      title: t('lists.delete_confirm_title') || 'Delete List',
      icon: AlertTriangle,
      variant: 'danger',
      content: createElement(DeleteListModalContent, { t }),
      cancelText: t('common.cancel') || 'Cancel',
      confirmText: t('common.delete') || 'Delete',
      onConfirm: async () => {
        await deleteMutation.mutateAsync(listId);
        if (activeListId === listId) {
          const nextList = lists.find((l) => l.id !== listId);
          setActiveListId(nextList ? nextList.id : null);
        }
      },
    });
  }, [confirmDialog, t, deleteMutation, activeListId, lists, setActiveListId]);

  const handleStartAddItems = useCallback(() => {
    if (!activeList) return;
    const isPerson = activeList.list_type === 'person';
    const headerTitle = isPerson
      ? (t('lists.add_people_title') || 'Add People')
      : (t('lists.add_titles_title') || 'Add Titles');
    const headerIcon = isPerson
      ? Users
      : (activeList.list_type === 'video_scene' ? Video : Film);

    openModal({
      title: headerTitle,
      icon: headerIcon,
      width: 'lg',
      height: 'lg',
      content: createElement(ListsAddModalContent, {
        activeList,
        addListItemMutation,
        activeListDetails,
        t,
      }),
    });
  }, [activeList, t, openModal, addListItemMutation, activeListDetails]);

  return {
    isImageDrawerOpen,
    setIsImageDrawerOpen,
    openImageDrawer,
    closeImageDrawer,
    handleStartCreate,
    handleStartEdit,
    handleDelete,
    handleStartAddItems,
  };
}

export default useListsModals;
