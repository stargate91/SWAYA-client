import { useState, createElement } from 'react';
import { Sparkles } from '@/ui/icons';
import { confirmDialog } from '@/providers/UiProvider';
import OrganizerRenameModalContent from '../components/renameModal/OrganizerRenameModalContent';
import { mapOrganizerItemRow, mapExtraRow } from '@/lib/mappers';
import { fetchRenamePreview } from '@/queries/renameQueries';
import { fetchScanStatus, useStopTaskMutation } from '@/queries/scanQueries';
import { QK } from '@/lib/queryKeys';

export function useOrganizerRename({
  scanStatusQuery,
  renameMutation,
  queryClient,
  renameStartedRef,
  setIsRenamePending,
  t,
  toast,
  closeModal,
  settings,
  scanMode,
  sessionMode,
  addPendingResolvedIds,
  removePendingResolvedIds,
}) {
  const [isRenameStarting, setIsRenameStarting] = useState(false);
  const stopTaskMutation = useStopTaskMutation();

  const handleRename = async (organizeInPlaceDefault = false) => {
    const scanStatus = scanStatusQuery?.data || null;
    const isScanActive = Boolean(scanStatus?.active);
    const scanPhase = scanStatus?.phase || '';

    if (isRenameStarting || (isScanActive && scanPhase === 'organizing')) {
      return;
    }

    setIsRenameStarting(true);
    let matchedItems = [];
    let matchedExtras = [];
    try {
      const response = await fetchRenamePreview(queryClient, { scanMode, sessionMode });
      const items = response?.items || [];
      matchedItems = items.filter((item) => item.parent_id === undefined);
      matchedExtras = items.filter((item) => item.parent_id !== undefined);
    } catch (err) {
      console.error(err);
      toast(t('organizer.toasts.failedToFetchMatchedItems') || 'Failed to fetch items for renaming.', 'danger');
      setIsRenameStarting(false);
      return;
    } finally {
      setIsRenameStarting(false);
    }

    if (matchedItems.length === 0) {
      toast(t('organizer.toasts.noMatchedItems'), 'danger');
      return;
    }

    const mappedItems = [
      ...matchedItems.map((item) => mapOrganizerItemRow(item, t)),
      ...matchedExtras.map((extra) => mapExtraRow(extra, t)),
    ];

    const executeRename = async (organizeInPlaceVal) => {
      closeModal();
      setIsRenameStarting(true);
      const previousScanStatus = queryClient.getQueryData(QK.scanStatus);
      const rowIds = [
        ...matchedItems.map((item) => `item-${item.id}`),
        ...matchedExtras.map((extra) => `extra-${extra.id}`),
      ];
      if (addPendingResolvedIds) {
        addPendingResolvedIds(rowIds);
      }
      try {
        const ids = matchedItems.map((item) => item.id);
        if (renameStartedRef) {
          renameStartedRef.current = true;
        }
        setIsRenamePending(true);

        // Pause/stop active background task first to avoid locks/conflicts
        const currentStatus = await fetchScanStatus(queryClient);
        if (currentStatus?.active && currentStatus?.phase !== 'organizing') {
          toast(t('organizer.toasts.pausingBackgroundTask') || 'Pausing background tasks...', 'info');
          await stopTaskMutation.mutateAsync();

          let stopped = false;
          for (let i = 0; i < 30; i++) {
            const checkStatus = await fetchScanStatus(queryClient);
            if (!checkStatus?.active) {
              stopped = true;
              break;
            }
            await new Promise((resolve) => setTimeout(resolve, 500));
          }

          if (!stopped) {
            throw new Error(t('organizer.toasts.failedToPauseTask') || 'Failed to stop active background task.');
          }
        }

        queryClient.setQueryData(QK.scanStatus, (current) => ({
          ...(current || {}),
          active: true,
          phase: 'organizing',
          current: 0,
          total: ids.length,
          start_time: Math.floor(Date.now() / 1000),
          can_stop: true,
          stop_requested: false,
          current_file_progress: 0,
        }));
        const response = await renameMutation.mutateAsync({
          item_ids: ids,
          organize_in_place: organizeInPlaceVal
        });
        if (response?.status === 'error') {
          throw new Error(response.message);
        }
      } catch (error) {
        if (removePendingResolvedIds) {
          removePendingResolvedIds(rowIds);
        }
        queryClient.setQueryData(QK.scanStatus, previousScanStatus || null);
        if (renameStartedRef) {
          renameStartedRef.current = false;
        }
        setIsRenamePending(false);
        toast(error.message || t('organizer.toasts.renameStartFailed'), 'danger');
      } finally {
        setIsRenameStarting(false);
      }
    };

    const showModal = (organizeInPlaceVal) => {
      confirmDialog({
        title: t('organizer.renameModal.title') || 'Confirm Rename',
        description: t('organizer.renameModal.description') || 'Review the files that will be renamed.',
        icon: Sparkles,
        variant: 'primary',
        width: 'xl',
        content: createElement(OrganizerRenameModalContent, {
          items: mappedItems,
          t,
          organizeInPlace: organizeInPlaceVal,
          setOrganizeInPlace: showModal,
        }),
        cancelText: t('common.cancel') || 'Cancel',
        confirmText: organizeInPlaceVal
          ? (t('organizer.renameModal.organizeInPlace') || 'Organize in Place')
          : (t('organizer.actions.rename') || 'Rename'),
        onConfirm: () => {
          executeRename(organizeInPlaceVal);
        },
      });
    };

    const defaultInPlace = organizeInPlaceDefault || (settings?.folder_organization_enabled === false);
    if (organizeInPlaceDefault) {
      executeRename(true);
    } else {
      showModal(defaultInPlace);
    }
  };

  return {
    handleRename,
    isRenameStarting,
  };
}

export default useOrganizerRename;
