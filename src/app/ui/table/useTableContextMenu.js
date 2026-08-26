import { useMemo } from 'react';
import { EyeOff, Trash2, Search, Sliders, X } from '@/ui/icons';
import { useTranslation } from '@/providers/LanguageContext';
import { useContextMenu } from '../useContextMenu';

export function useTableContextMenu({
  selectedRows = [],
  rowActions = [],
  openBulkDeleteModal,
  openMatchModal,
  openBulkOverrideModal,
  dismissRows,
  clearSelectedRows,
} = {}) {
  const { t } = useTranslation();
  const {
    contextMenu,
    handleRowContextMenu,
    closeContextMenu,
    activeRow,
    useBulkActions,
  } = useContextMenu(selectedRows);

  const contextMenuItems = useMemo(() => {
    const items = [];
    if (!activeRow) return items;

    if (useBulkActions) {
      const hasExtras = selectedRows.some((r) => r.rawType === 'extra');
      const allSameType = selectedRows.every((r) => r.rawType === selectedRows[0]?.rawType);

      if (!hasExtras && dismissRows && clearSelectedRows) {
        items.push({
          key: 'bulk-dismiss',
          label: t('common.remove') || 'Remove',
          icon: EyeOff,
          onClick: () => {
            dismissRows(selectedRows.map((r) => r.id));
            clearSelectedRows();
          },
        });
      }

      if (openBulkDeleteModal) {
        items.push({
          key: 'bulk-delete',
          label: t('common.delete') || 'Delete',
          icon: Trash2,
          variant: 'danger',
          onClick: () => openBulkDeleteModal(selectedRows),
        });
      }

      if (
        !hasExtras &&
        !selectedRows.some((r) => r.rawType === 'video' || r.rawType === 'movie') &&
        openMatchModal
      ) {
        items.push({
          key: 'bulk-match',
          label: t('organizer.actions.match') || 'Match',
          icon: Search,
          onClick: () => openMatchModal(null, selectedRows),
        });
      }

      if (allSameType && selectedRows[0]?.rawType !== 'video' && openBulkOverrideModal) {
        items.push({
          key: 'bulk-override',
          label: t('organizer.actions.override') || 'Override',
          icon: Sliders,
          onClick: () => openBulkOverrideModal(selectedRows),
        });
      }

      if (clearSelectedRows) {
        items.push({ divider: true });
        items.push({
          key: 'bulk-clear',
          label: t('organizer.bulkBar.clear') || 'Clear selection',
          icon: X,
          onClick: clearSelectedRows,
        });
      }
    } else if (rowActions.length > 0) {
      const visibleActions = rowActions.filter((action) =>
        action.isVisible ? action.isVisible(activeRow) : true
      );

      visibleActions.forEach((action) => {
        if (
          (action.key === 'dismiss' || action.key === 'delete') &&
          items.length > 0 &&
          !items[items.length - 1].divider
        ) {
          items.push({ divider: true });
        }

        items.push({
          key: action.key,
          label: action.tooltip || action.label,
          icon: action.icon,
          variant: action.variant || (action.isDanger ? 'danger' : undefined),
          className: action.className || '',
          onClick: () => action.onClick(activeRow),
        });
      });
    }

    return items;
  }, [
    activeRow,
    useBulkActions,
    selectedRows,
    dismissRows,
    clearSelectedRows,
    openBulkDeleteModal,
    openMatchModal,
    openBulkOverrideModal,
    rowActions,
    t,
  ]);

  return {
    contextMenu,
    contextMenuItems,
    handleRowContextMenu,
    closeContextMenu,
    activeRow,
    useBulkActions,
  };
}

export default useTableContextMenu;
