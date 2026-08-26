import { useMemo } from 'react';
import { EyeOff, Trash2, Search, Sliders, X } from '@/ui/icons';

/**
 * Encapsulates domain validation and business rules for organizer bulk action bar operations.
 *
 * @param {Object} params
 * @param {Array} params.selectedRows - Currently selected rows in organizer
 * @param {Function} params.dismissRows - Callback to dismiss rows
 * @param {Function} params.clearSelectedRows - Callback to clear selection
 * @param {Function} params.openBulkDeleteModal - Callback to open delete modal
 * @param {Function} params.openMatchModal - Callback to open match modal
 * @param {Function} params.openBulkOverrideModal - Callback to open bulk override modal
 * @param {string} [params.scanMode] - Current scan mode (e.g. 'scenes', 'movies')
 * @param {string} [params.provider] - Current provider (e.g. 'theporndb')
 * @param {Function} params.t - Localization translation function
 * @returns {Object} { actions, isVisible, title }
 */
export function useOrganizerBulkActions({
  selectedRows = [],
  dismissRows,
  clearSelectedRows,
  openBulkDeleteModal,
  openMatchModal,
  openBulkOverrideModal,
  scanMode,
  provider,
  t,
}) {
  const isVisible = Boolean(selectedRows && selectedRows.length > 0);

  const title = useMemo(() => {
    if (!isVisible) return '';
    const template = t?.('organizer.bulkBar.title') || '{count} items selected';
    return template.replace('{count}', String(selectedRows.length));
  }, [isVisible, selectedRows.length, t]);

  const actions = useMemo(() => {
    if (!isVisible) return [];

    const hasExtra = selectedRows.some((row) => row?.rawType === 'extra');
    const hasUnsupportedMatch = selectedRows.some(
      (row) => row?.rawType === 'extra' || row?.rawType === 'video' || row?.rawType === 'movie'
    );
    const isScanModeUnsupportedForMatch = scanMode === 'scenes' || scanMode === 'movies';
    const isProviderUnsupportedForMatch = provider === 'theporndb';
    const canMatch = !hasUnsupportedMatch && !isScanModeUnsupportedForMatch && !isProviderUnsupportedForMatch;

    const firstRawType = selectedRows[0]?.rawType;
    const isHomogeneousType = selectedRows.every((r) => r?.rawType === firstRawType);
    const canOverride = isHomogeneousType && firstRawType !== 'video';

    return [
      !hasExtra
        ? {
          key: 'dismiss',
          label: t?.('common.remove') || 'Remove',
          icon: EyeOff,
          onClick: () => {
            dismissRows?.(selectedRows.map((r) => r.id));
            clearSelectedRows?.();
          },
          disabled: selectedRows.length === 0,
        }
        : null,
      {
        key: 'delete',
        label: t?.('common.delete') || 'Delete',
        icon: Trash2,
        variant: 'danger',
        onClick: () => openBulkDeleteModal?.(selectedRows),
        disabled: selectedRows.length === 0,
      },
      canMatch
        ? {
          key: 'match',
          label: t?.('organizer.actions.match') || 'Match',
          icon: Search,
          onClick: () => openMatchModal?.(null, selectedRows),
          disabled: selectedRows.length === 0,
        }
        : null,
      canOverride
        ? {
          key: 'override',
          label: t?.('organizer.actions.override') || 'Override',
          icon: Sliders,
          onClick: () => openBulkOverrideModal?.(selectedRows),
        }
        : null,
      {
        key: 'clear',
        label: t?.('organizer.bulkBar.clear') || 'Clear selection',
        icon: X,
        onClick: clearSelectedRows,
        disabled: selectedRows.length === 0,
      },
    ].filter(Boolean);
  }, [
    isVisible,
    selectedRows,
    scanMode,
    provider,
    dismissRows,
    clearSelectedRows,
    openBulkDeleteModal,
    openMatchModal,
    openBulkOverrideModal,
    t,
  ]);

  return {
    actions,
    isVisible,
    title,
  };
}

export default useOrganizerBulkActions;
