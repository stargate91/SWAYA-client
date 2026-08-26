import { useCallback, createElement } from 'react';
import { Trash2 } from '@/ui/icons';
import Button from '@/ui/Button';
import { ROUTES } from '@/lib/routes';
import modalStyles from '@/ui/Modal.module.css';
import MediaDeleteModalContent from '../components/detail/MediaDeleteModalContent';

export function useMediaDeleteAction({
  id,
  normalizedType,
  deleteLibraryItemMutation,
  t,
  openModal,
  closeModal,
  toast,
  navigate,
}) {
  const handleDeleteClick = useCallback(() => {
    const isTv = normalizedType === 'tv';
    const isScene = normalizedType === 'scene' || normalizedType === 'video';
    const descKey = isTv
      ? 'library.delete.descriptionTv'
      : isScene
        ? `library.delete.description${normalizedType.charAt(0).toUpperCase() + normalizedType.slice(1)}`
        : 'library.delete.descriptionMovie';

    const actionCards = [
      {
        key: 'db_only',
        label: t('library.delete.dbOnly.label') || 'Remove from database only',
        description: t('library.delete.dbOnly.description') || 'Only delete metadata and details from SWAYA. Your local media files will remain untouched on your disk.',
      },
      {
        key: 'trash',
        label: t('library.delete.trash.label') || 'Delete files and database entry',
        description: t('library.delete.trash.description') || 'Permanently delete all media files (moves to Recycle Bin/Trash) and remove it from SWAYA.',
        className: modalStyles['action-card--danger'],
      },
    ];

    const handleSelectAction = async (actionKey) => {
      try {
        await deleteLibraryItemMutation.mutateAsync({
          itemId: id,
          mediaType: normalizedType,
          mode: actionKey,
        });
        closeModal();
        toast(t('library.delete.toasts.success') || 'Item removed successfully', 'success');
        navigate(ROUTES.LIBRARY);
      } catch (err) {
        toast(err.message || t('library.delete.toasts.failed') || 'Failed to remove item', 'danger');
      }
    };

    openModal({
      title: t('library.delete.title') || 'Remove from Library?',
      description: t(descKey) || `How do you want to remove this ${normalizedType}?`,
      icon: Trash2,
      variant: 'danger',
      content: createElement(MediaDeleteModalContent, {
        actionCards,
        onSelectAction: handleSelectAction,
        isPending: deleteLibraryItemMutation.isPending,
      }),
      footer: createElement(
        Button,
        { variant: 'secondary-neutral', onClick: closeModal },
        t('common.cancel') || 'Cancel'
      ),
    });
  }, [
    id,
    normalizedType,
    deleteLibraryItemMutation,
    t,
    openModal,
    closeModal,
    toast,
    navigate,
  ]);

  return { handleDeleteClick };
}
