import { useMemo } from 'react';
import { buildOrganizerColumns } from '../utils/organizerTableConfig';
import { useOrganizerStableActions } from './useOrganizerModals';

export function useOrganizerColumns({
  activeExtrasTab,
  activeMainTab,
  collisionStrategy,
  handleSortToggle,
  handleToggleAll,
  handleToggleRow,
  normalizeStatusTone,
  sortConfig,
  t,
  onMouseEnterSource,
  onMouseMoveSource,
  onMouseLeaveSource,
}) {
  const { openMatchModal, openOverrideModal } = useOrganizerStableActions();

  const columns = useMemo(() => {
    return buildOrganizerColumns({
      activeExtrasTab,
      activeMainTab,
      collisionStrategy,
      handleToggleAll,
      handleToggleRow,
      normalizeStatusTone,
      sortConfig,
      handleSortToggle,
      t,
      onOpenMatch: (row) => openMatchModal(row),
      onOpenOverride: (row) => openOverrideModal(row),
      onMouseEnterSource,
      onMouseMoveSource,
      onMouseLeaveSource,
    });
  }, [
    activeExtrasTab,
    activeMainTab,
    collisionStrategy,
    handleToggleAll,
    handleToggleRow,
    normalizeStatusTone,
    t,
    openMatchModal,
    openOverrideModal,
    sortConfig,
    handleSortToggle,
    onMouseEnterSource,
    onMouseMoveSource,
    onMouseLeaveSource,
  ]);

  return { columns };
}
