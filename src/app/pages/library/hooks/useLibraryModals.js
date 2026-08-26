import { useCallback, createElement } from 'react';
import { useUi } from '@/providers/UiProvider';
import Button from '@/ui/Button';
import AddPeopleModalContent from '../modals/add-people/AddPeopleModalContent';
import AddStudiosModalContent from '../modals/add-studios/AddStudiosModalContent';
import CreateTagModalContent from '../modals/CreateTagModalContent';
import { Pencil, Tag, Trash2, Users, Film } from '@/ui/icons';
import Text from '@/ui/Text';
import Inline from '@/ui/Inline';
import { useDeleteTagMutation, useUpdatePersonStatusMutation } from '@/queries';

export function useLibraryModals({ state, focusedTagName, setFocusedTagName }) {
  const { openModal, closeModal, confirmDialog, toast } = useUi();
  const deleteTagMutation = useDeleteTagMutation();
  const updatePersonStatusMutation = useUpdatePersonStatusMutation();

  const handleUnfollowPerson = useCallback((person) => {
    updatePersonStatusMutation.mutate({
      personId: person.id,
      payload: {
        is_active: false,
      },
    });
  }, [updatePersonStatusMutation]);

  const openAddPeopleModal = () => {
    const isAdult = state.activeSessionMode === 'nsfw';
    openModal({
      title: isAdult
        ? (state.t('library.addPeople.adultModalTitle') || 'Add Adult People')
        : (state.t('library.addPeople.modalTitle') || 'Add People'),
      description: isAdult
        ? (state.t('library.addPeople.adultModalDescription') || 'Track or search for adult people to add to the library.')
        : (state.t('library.addPeople.modalDescription') || 'Track or search for people to add to the library.'),
      icon: Users,
      width: 'lg',
      height: 'lg',
      bodyClassName: 'add-people-modal-body',
      content: createElement(AddPeopleModalContent, {
        isAdult,
        t: state.t,
        onClose: closeModal,
      }),
      footer: createElement(
        Button,
        { variant: 'secondary-neutral', onClick: closeModal },
        state.t('common.close') || 'Close'
      ),
    });
  };

  const openAddStudiosModal = () => {
    const isAdult = state.activeSessionMode === 'nsfw';
    openModal({
      title: isAdult
        ? (state.t('library.addStudios.adultModalTitle') || 'Add Adult Studios')
        : (state.t('library.addStudios.modalTitle') || 'Add Studios'),
      description: isAdult
        ? (state.t('library.addStudios.adultModalDescription') || 'Track local adult studios to add to the library.')
        : (state.t('library.addStudios.modalDescription') || 'Track local studios to add to the library.'),
      icon: Film,
      width: 'lg',
      height: 'lg',
      bodyClassName: 'add-studios-modal-body',
      content: createElement(AddStudiosModalContent, {
        isAdult,
        t: state.t,
        onClose: closeModal,
      }),
      footer: createElement(
        Button,
        { variant: 'secondary-neutral', onClick: closeModal },
        state.t('common.close') || 'Close'
      ),
    });
  };

  const openCreateTagModal = () => {
    const isAdult = state.activeSessionMode === 'nsfw';
    openModal({
      title: state.t('library.tags.modalTitle') || 'Create Tag',
      description: state.t('library.tags.modalDescription') || 'Create a new custom tag for organizing your media.',
      icon: Tag,
      content: createElement(CreateTagModalContent, {
        onClose: closeModal,
        t: state.t,
        defaultColor: 'var(--color-accent)',
        isAdult,
      }),
      footer: createElement(
        Inline,
        { justify: 'end', gap: 'md', fullWidth: true },
        createElement(
          Button,
          { variant: 'secondary-neutral', onClick: closeModal },
          state.t('common.close') || 'Close'
        ),
        createElement(
          Button,
          { variant: 'primary', type: 'submit', form: 'create-tag-form' },
          state.t('common.create') || 'Create'
        )
      ),
    });
  };

  const openEditTagModal = (tag) => {
    const isAdult = state.activeSessionMode === 'nsfw';
    openModal({
      title: state.t('library.tags.editModalTitle') || 'Edit Tag',
      description: state.t('library.tags.editModalDescription') || 'Rename the tag or adjust its color.',
      icon: Pencil,
      content: createElement(CreateTagModalContent, {
        mode: 'edit',
        initialTag: tag,
        onClose: closeModal,
        isAdult,
        onSuccess: ({ name }) => {
          if (focusedTagName === tag.name) {
            setFocusedTagName(name);
          }
        },
        t: state.t,
      }),
      footer: createElement(
        Inline,
        { justify: 'end', gap: 'md', fullWidth: true },
        createElement(
          Button,
          { variant: 'secondary-neutral', onClick: closeModal },
          state.t('common.close') || 'Close'
        ),
        createElement(
          Button,
          { variant: 'primary', type: 'submit', form: 'edit-tag-form' },
          state.t('common.save') || 'Save'
        )
      ),
    });
  };

  const openDeleteTagModal = (tag) => {
    confirmDialog({
      title: state.t('library.tags.deleteModalTitle') || 'Delete Tag',
      description: state.t('library.tags.deleteModalDescription') || 'Remove this tag from every tagged item.',
      icon: Trash2,
      variant: 'danger',
      content: createElement(
        Text,
        { color: 'muted' },
        (state.t('library.tags.deleteConfirm') || 'Delete "{name}" and remove it from all tagged items?').replace('{name}', tag.name)
      ),
      cancelText: state.t('common.cancel') || 'Cancel',
      confirmText: state.t('library.tags.deleteBtn') || 'Delete Tag',
      onConfirm: async () => {
        try {
          await deleteTagMutation.mutateAsync(tag);
          if (focusedTagName === tag.name) {
            setFocusedTagName(null);
          }
        } catch (error) {
          toast(error?.message || state.t('library.tags.deleteFailed') || 'Failed to delete tag', 'error');
        }
      },
    });
  };

  return {
    openAddPeopleModal,
    openAddStudiosModal,
    openCreateTagModal,
    openEditTagModal,
    openDeleteTagModal,
    handleUnfollowPerson,
    deleteTagMutation,
    updatePersonStatusMutation,
  };
}

export default useLibraryModals;
