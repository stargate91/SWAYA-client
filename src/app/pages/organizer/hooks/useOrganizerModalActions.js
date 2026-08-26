import { useMemo, useCallback, createElement } from 'react';
import { FolderOpen, Play, Search, Sliders, Trash2, EyeOff, FileJson } from '@/ui/icons';
import { useQueryClient } from '@tanstack/react-query';
import Button from '@/ui/Button';
import OrganizerMatchModalContent from '../components/matchModal/OrganizerMatchModalContent';
import OrganizerOverrideModalContent from '../components/overrideModal/OrganizerOverrideModalContent';
import OrganizerBulkOverrideModalContent from '../components/overrideModal/OrganizerBulkOverrideModalContent';
import { isElectron, showItemInFolder, openMpvFullscreen } from '@/lib/ipc';
import { useUi } from '@/providers/UiProvider';
import { useTranslation } from '@/providers/LanguageContext';
import { useOrganizerDeleteActions } from './useOrganizerDeleteActions';
import { useSettingsQuery, usePreviewMediaMutation, fetchItemFullMetadata } from '@/queries';
import { mapOrganizerTypeLabel } from '@/lib/mappers';
import modalStyles from '@/ui/Modal.module.css';
import DeleteActionCards from '../components/DeleteActionCards';
import InspectModalContent from '../components/InspectModalContent';

export function useOrganizerModalActions({
  focusFirstAvailableResult,
  clearSelectedRows,
  dismissRows,
  scanMode,
  sessionMode,
  addPendingResolvedIds,
  removePendingResolvedIds,
}) {
  const { t } = useTranslation();
  const { closeModal, openModal, toast } = useUi();
  const queryClient = useQueryClient();
  const settingsQuery = useSettingsQuery();
  const settings = settingsQuery.data;
  const previewMediaMutation = usePreviewMediaMutation();

  const {
    refreshOrganizer,
    handleResolveOrganizerRows,
    handleDeleteOrganizerRow,
    handleDeleteOrganizerRows,
  } = useOrganizerDeleteActions({
    t,
    closeModal,
    toast,
    queryClient,
    focusFirstAvailableResult,
    clearSelectedRows,
    scanMode,
    sessionMode,
    addPendingResolvedIds,
    removePendingResolvedIds,
  });

  const isPlayableOrganizerRow = useCallback((row) => {
    if (!row?.sourcePath) {
      return false;
    }
    if (row.rawType === 'extra') {
      return String(row.rawPayload?.category || '').toLowerCase() === 'video';
    }
    return true;
  }, []);

  const handlePreviewRow = useCallback(async (row) => {
    const preferredPlayer = settings?.preferred_player || 'swaya';

    if (preferredPlayer === 'swaya' && isElectron) {
      await openMpvFullscreen({
        url: row.sourcePath,
        title: row.sourceName || row.name || 'Preview',
      });
    } else {
      if (!settings?.vlc_path && !settings?.mpc_path) {
        throw new Error(t('organizer.toasts.noMediaPlayerConfigured'));
      }
      await previewMediaMutation.mutateAsync(row.sourcePath);
    }
  }, [settings, t, previewMediaMutation]);

  const openDeleteModal = useCallback((row) => {
    const isExtra = row.rawType === 'extra';
    const actionCards = [
      !isExtra ? {
        key: 'ignore',
        label: t('organizer.details.delete.ignore.label'),
        description: t('organizer.details.delete.ignore.description'),
      } : null,
      {
        key: 'db_only',
        label: t('organizer.details.delete.dbOnly.label'),
        description: t(isExtra ? 'organizer.details.delete.dbOnly.descriptionExtra' : 'organizer.details.delete.dbOnly.descriptionMedia'),
      },
      {
        key: 'trash',
        label: t('organizer.details.delete.trash.label'),
        description: t(isExtra ? 'organizer.details.delete.trash.descriptionExtra' : 'organizer.details.delete.trash.descriptionMedia'),
        className: modalStyles['action-card--danger'],
      },
    ].filter(Boolean);

    openModal({
      title: t('organizer.details.delete.title'),
      description: t(isExtra ? 'organizer.details.delete.descriptionExtra' : 'organizer.details.delete.descriptionMedia'),
      icon: Trash2,
      variant: 'danger',
      content: createElement(DeleteActionCards, {
        actionCards,
        onSelectAction: (actionKey) => handleDeleteOrganizerRow(row, actionKey),
        toast,
        defaultErrorText: t('organizer.toasts.deleteActionFailed'),
      }),
      footer: createElement(
        Button,
        { variant: 'secondary-neutral', onClick: closeModal },
        t('common.cancel')
      ),
    });
  }, [closeModal, handleDeleteOrganizerRow, openModal, t, toast]);

  const openBulkDeleteModal = useCallback((rows) => {
    const hasExtras = rows.some((row) => row.rawType === 'extra');
    const hasMedia = rows.some((row) => row.rawType !== 'extra');
    const actionCards = [
      hasMedia ? {
        key: 'ignore',
        label: t('organizer.details.delete.ignore.label'),
        description: t('organizer.details.delete.ignore.description'),
      } : null,
      {
        key: 'db_only',
        label: t('organizer.details.delete.dbOnly.label'),
        description: hasMedia && hasExtras
          ? t('organizer.details.bulkDelete.dbOnly.descriptionMixed')
          : hasExtras
            ? t('organizer.details.bulkDelete.dbOnly.descriptionExtra')
            : t('organizer.details.bulkDelete.dbOnly.descriptionMedia'),
      },
      {
        key: 'trash',
        label: t('organizer.details.delete.trash.label'),
        description: hasMedia && hasExtras
          ? t('organizer.details.bulkDelete.trash.descriptionMixed')
          : hasExtras
            ? t('organizer.details.bulkDelete.trash.descriptionExtra')
            : t('organizer.details.bulkDelete.trash.descriptionMedia'),
        className: modalStyles['action-card--danger'],
      },
    ].filter(Boolean);

    openModal({
      title: t('organizer.details.bulkDelete.title'),
      description: t('organizer.details.bulkDelete.description').replace('{count}', String(rows.length)),
      icon: Trash2,
      variant: 'danger',
      content: createElement(DeleteActionCards, {
        actionCards,
        onSelectAction: (actionKey) => handleDeleteOrganizerRows(rows, actionKey),
        toast,
        defaultErrorText: t('organizer.toasts.deleteActionFailed'),
      }),
      footer: createElement(
        Button,
        { variant: 'secondary-neutral', onClick: closeModal },
        t('common.cancel')
      ),
    });
  }, [closeModal, handleDeleteOrganizerRows, openModal, t, toast]);

  const openMatchModal = useCallback((row, rows = null) => {
    const targetRows = rows || [row];
    const isBulk = targetRows.length > 1;
    openModal({
      title: isBulk
        ? t('organizer.details.matchModal.titleBulk') || 'Match Selected Items'
        : t('organizer.details.matchModal.title'),
      description: isBulk
        ? t('organizer.details.matchModal.descriptionBulk') || 'Search and apply a match for the selected items.'
        : t('organizer.details.matchModal.description'),
      width: 'lg',
      icon: Search,
      content: createElement(OrganizerMatchModalContent, {
        row,
        rows: targetRows,
        t,
        toast,
        scanMode,
        sessionMode,
        onResolved: (performMutationFn) =>
          handleResolveOrganizerRows(targetRows, performMutationFn),
      }),
      footer: createElement(
        Button,
        { variant: 'secondary-neutral', onClick: closeModal },
        t('common.cancel')
      ),
    });
  }, [closeModal, handleResolveOrganizerRows, openModal, scanMode, sessionMode, t, toast]);

  const openOverrideModal = useCallback((row) => {
    openModal({
      title: t('organizer.overrideModal.title').replace('{type}', mapOrganizerTypeLabel(row.rawType, t) || ''),
      description: t('organizer.overrideModal.description'),
      icon: Sliders,
      content: createElement(OrganizerOverrideModalContent, {
        row,
        onClose: closeModal,
        toast,
        scanMode,
        sessionMode,
      }),
      footer: [
        createElement(
          Button,
          { key: 'cancel', variant: 'secondary-neutral', type: 'button', onClick: () => closeModal() },
          t('common.cancel')
        ),
        createElement(
          Button,
          { key: 'submit', variant: 'primary', type: 'submit', form: 'organizer-override-form' },
          t('organizer.overrideModal.apply')
        ),
      ],
    });
  }, [closeModal, openModal, scanMode, sessionMode, t, toast]);

  const openBulkOverrideModal = useCallback((rows) => {
    const type = rows[0]?.rawType || '';
    openModal({
      title: (t('organizer.overrideModal.titleBulk') || 'Bulk Override {type}s').replace('{type}', mapOrganizerTypeLabel(type, t)),
      description: t('organizer.overrideModal.descriptionBulk') || 'Apply settings or numberings to all selected items.',
      icon: Sliders,
      className: 'ui-modal--bulk-override',
      content: createElement(OrganizerBulkOverrideModalContent, {
        rows,
        onClose: closeModal,
        toast,
        scanMode,
        sessionMode,
      }),
      footer: [
        createElement(
          Button,
          { key: 'cancel', variant: 'secondary-neutral', type: 'button', onClick: () => closeModal() },
          t('common.cancel')
        ),
        createElement(
          Button,
          { key: 'submit', variant: 'primary', type: 'submit', form: 'organizer-bulk-override-form' },
          t('organizer.overrideModal.applyBulk')
        ),
      ],
    });
  }, [closeModal, openModal, scanMode, sessionMode, t, toast]);

  const openInspectModal = useCallback((row) => {
    const buildInspectPayload = async () => {
      if (!row) {
        return '';
      }

      if (row.rawType === 'extra') {
        return JSON.stringify({
          kind: 'extra',
          summary: {
            id: row.itemId,
            source: row.source,
            target: row.target,
            source_path: row.sourcePath,
            target_path: row.targetPath,
          },
          organizer: row.rawPayload,
        }, null, 2);
      }

      try {
        const metadata = await fetchItemFullMetadata(queryClient, row.itemId);
        return JSON.stringify({
          kind: row.rawType,
          summary: {
            id: row.itemId,
            source: row.source,
            target: row.target,
            source_path: row.sourcePath,
            target_path: row.targetPath,
            status: row.rawStatus,
            action: row.rawAction || null,
            has_collision: row.hasCollision,
          },
          organizer: row.rawPayload,
          metadata,
        }, null, 2);
      } catch (err) {
        console.error(err);
        return JSON.stringify({
          kind: row.rawType,
          summary: {
            id: row.itemId,
            source: row.source,
            target: row.target,
            source_path: row.sourcePath,
            target_path: row.targetPath,
            status: row.rawStatus,
            action: row.rawAction || null,
            has_collision: row.hasCollision,
          },
          organizer: row.rawPayload,
          error: err.message || String(err),
        }, null, 2);
      }
    };

    const handleOpen = async () => {
      try {
        const inspectJson = await buildInspectPayload();

        const handleCopyInspect = async () => {
          try {
            await navigator.clipboard.writeText(inspectJson);
            toast(t('organizer.toasts.inspectCopySuccess') || 'Inspect payload copied', 'success');
          } catch {
            toast(t('organizer.toasts.inspectCopyFailed') || 'Copy failed', 'danger');
          }
        };

        const handleDownloadInspect = () => {
          const blob = new Blob([inspectJson], { type: 'application/json;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const anchor = document.createElement('a');
          anchor.href = url;
          anchor.download = `${row.source || 'organizer-item'}.json`;
          document.body.appendChild(anchor);
          anchor.click();
          document.body.removeChild(anchor);
          URL.revokeObjectURL(url);
        };

        openModal({
          title: t('organizer.details.inspect.title') || 'Inspect Item Data',
          description: t('organizer.details.inspect.description') || 'Raw database state and metadata payload',
          icon: FileJson,
          width: 'lg',
          content: createElement(InspectModalContent, { json: inspectJson }),
          footer: [
            createElement(
              Button,
              { key: 'copy', type: 'button', variant: 'secondary-neutral', onClick: handleCopyInspect },
              t('organizer.details.inspect.copy') || 'Copy JSON'
            ),
            createElement(
              Button,
              { key: 'download', type: 'button', variant: 'secondary-neutral', onClick: handleDownloadInspect },
              t('organizer.details.inspect.download') || 'Download'
            ),
            createElement(
              Button,
              { key: 'close', variant: 'secondary-neutral', onClick: closeModal },
              t('common.close') || 'Close'
            ),
          ],
        });
      } catch (error) {
        toast(error.message || t('organizer.toasts.inspectLoadFailed') || 'Load failed', 'danger');
      }
    };

    handleOpen();
  }, [closeModal, openModal, toast, t, queryClient]);

  const rowActions = useMemo(() => [
    {
      key: 'match',
      label: t('organizer.actions.match'),
      icon: Search,
      isVisible: (row) => row.rawType !== 'extra' && row.rawType !== 'video',
      onClick: (row) => openMatchModal(row),
    },
    {
      key: 'override',
      label: t('organizer.actions.override'),
      icon: Sliders,
      isVisible: (row) => row.rawType !== 'video',
      onClick: (row) => openOverrideModal(row),
    },
    {
      key: 'inspect',
      label: t('organizer.details.inspect.open') || 'Inspect',
      icon: FileJson,
      onClick: (row) => openInspectModal(row),
    },
    {
      key: 'preview',
      label: t('organizer.actions.preview'),
      icon: Play,
      isVisible: isPlayableOrganizerRow,
      onClick: async (row) => {
        try {
          await handlePreviewRow(row);
        } catch (error) {
          toast(error.message || t('organizer.toasts.previewFailed'), 'danger');
        }
      },
    },
    {
      key: 'show-in-folder',
      label: t('organizer.actions.showInFolder'),
      icon: FolderOpen,
      onClick: async (row) => {
        const result = await showItemInFolder(row.sourcePath);
        if (!result?.success) {
          toast(result?.error || t('organizer.toasts.showInFolderFailed'), 'danger');
        }
      },
    },
    {
      key: 'dismiss',
      label: t('organizer.actions.dismiss'),
      icon: EyeOff,
      isVisible: (row) => row.rawType !== 'extra',
      onClick: (row) => dismissRows([row.id]),
    },
    {
      key: 'delete',
      label: t('organizer.details.delete.title'),
      tooltip: t('common.delete'),
      icon: Trash2,
      variant: 'danger',
      onClick: (row) => openDeleteModal(row),
    },
  ], [
    t,
    dismissRows,
    openMatchModal,
    openOverrideModal,
    openInspectModal,
    openDeleteModal,
    isPlayableOrganizerRow,
    handlePreviewRow,
    toast,
  ]);

  return {
    openDeleteModal,
    openBulkDeleteModal,
    openMatchModal,
    openOverrideModal,
    openBulkOverrideModal,
    openInspectModal,
    rowActions,
    refreshOrganizer,
    handlePreviewRow,
    isPlayableOrganizerRow,
  };
}

export default useOrganizerModalActions;
