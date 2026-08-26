import { useMemo } from 'react';
import { useOrganizerModalActions } from '../hooks/useOrganizerModalActions';
import { OrganizerModalContext, OrganizerModalActionsContext } from './OrganizerModalContext';

export function OrganizerModalProvider({
  children,
  focusFirstAvailableResult,
  clearSelectedRows,
  dismissRows,
  selectedRows,
  scanMode,
  sessionMode,
  provider,
  addPendingResolvedIds,
  removePendingResolvedIds,
}) {
  const {
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
  } = useOrganizerModalActions({
    focusFirstAvailableResult,
    clearSelectedRows,
    dismissRows,
    selectedRows,
    scanMode,
    sessionMode,
    provider,
    addPendingResolvedIds,
    removePendingResolvedIds,
  });

  const actionsValue = useMemo(() => ({
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
  }), [
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
  ]);

  const uiValue = useMemo(() => ({
    ...actionsValue,
    selectedRows,
    dismissRows,
    clearSelectedRows,
    scanMode,
    sessionMode,
    provider,
  }), [
    actionsValue,
    selectedRows,
    dismissRows,
    clearSelectedRows,
    scanMode,
    sessionMode,
    provider,
  ]);

  return (
    <OrganizerModalActionsContext.Provider value={actionsValue}>
      <OrganizerModalContext.Provider value={uiValue}>
        {children}
      </OrganizerModalContext.Provider>
    </OrganizerModalActionsContext.Provider>
  );
}

export const OrganizerActionsProvider = OrganizerModalProvider;

