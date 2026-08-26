import { useRef, useCallback, useEffect } from 'react';

/**
 * Hook to manage active row focus in the organizer table, ensuring continuous
 * row selection across page changes, data refetches, and item resolution.
 *
 * @param {object} params
 * @param {object} params.organizer - Paginated organizer query response
 * @param {string|null} params.activeRowId - Current active focused row identifier
 * @param {function} params.setActiveRowId - State setter for active row
 * @param {Set} [params.pendingResolvedIds] - Set of resolved item IDs being removed
 */
export function useOrganizerFocus({
  organizer,
  activeRowId,
  setActiveRowId,
  pendingResolvedIds,
}) {
  const focusFirstAvailableResultRef = useRef();

  useEffect(() => {
    focusFirstAvailableResultRef.current = (nextOrganizer = organizer) => {
      if (!nextOrganizer || !Array.isArray(nextOrganizer.items)) {
        setActiveRowId(null);
        return;
      }

      const items = nextOrganizer.items;

      // Determine IDs of valid rows (filtering out pending resolved IDs)
      const rowIds = items
        .map((item) => (item.parent_id !== undefined ? `extra-${item.id}` : `item-${item.id}`))
        .filter((id) => !pendingResolvedIds?.has(id));

      if (rowIds.length === 0) {
        setActiveRowId(null);
        return;
      }

      // If activeRowId is still available in the current page, keep it focused
      if (activeRowId && rowIds.includes(activeRowId)) {
        return;
      }

      // Otherwise, find the next item to focus based on index of the old activeRowId
      const oldIndex = items.findIndex((item) => {
        const id = item.parent_id !== undefined ? `extra-${item.id}` : `item-${item.id}`;
        return id === activeRowId;
      });

      if (oldIndex !== -1) {
        // Try focusing the first valid item at or after oldIndex
        for (let i = oldIndex; i < items.length; i++) {
          const item = items[i];
          const id = item.parent_id !== undefined ? `extra-${item.id}` : `item-${item.id}`;
          if (rowIds.includes(id)) {
            setActiveRowId(id);
            return;
          }
        }
        // If not found, try focusing the last valid item before oldIndex
        for (let i = oldIndex - 1; i >= 0; i--) {
          const item = items[i];
          const id = item.parent_id !== undefined ? `extra-${item.id}` : `item-${item.id}`;
          if (rowIds.includes(id)) {
            setActiveRowId(id);
            return;
          }
        }
      }

      // Fallback: focus the first valid row on the page
      setActiveRowId(rowIds[0]);
    };
  });

  const focusFirstAvailableResult = useCallback((nextOrganizer) => {
    focusFirstAvailableResultRef.current?.(nextOrganizer);
  }, []);

  return {
    focusFirstAvailableResult,
  };
}

export default useOrganizerFocus;
