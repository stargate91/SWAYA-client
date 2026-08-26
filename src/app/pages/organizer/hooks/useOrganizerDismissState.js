/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState, useCallback } from 'react';

const EMPTY_SET = new Set();

export function useOrganizerDismissState({ organizer, scopeKey, activeMainTab }) {
  const [dismissedByScope, setDismissedByScope] = useState({});
  const dismissedRowIds = dismissedByScope[scopeKey] || EMPTY_SET;

  useEffect(() => {
    if (!organizer || !Array.isArray(organizer.items)) {
      return;
    }

    const prefix = activeMainTab === 'extras' ? 'extra-' : 'item-';
    const validIds = new Set(
      organizer.items.map((item) => `${prefix}${item.id}`)
    );

    setDismissedByScope((current) => {
      const currentScopeSet = current[scopeKey] || EMPTY_SET;
      const nextScopeSet = new Set();
      currentScopeSet.forEach((id) => {
        if (validIds.has(id)) {
          nextScopeSet.add(id);
        }
      });

      return nextScopeSet.size === currentScopeSet.size
        ? current
        : {
          ...current,
          [scopeKey]: nextScopeSet,
        };
    });
  }, [organizer, scopeKey, activeMainTab]);

  const dismissRows = useCallback((rowIds) => {
    const validRowIds = rowIds.filter((id) => id.startsWith('item-') || id.startsWith('extra-'));
    if (validRowIds.length === 0) return;
    setDismissedByScope((current) => {
      const next = new Set(current[scopeKey] || EMPTY_SET);
      validRowIds.forEach((id) => next.add(id));
      return {
        ...current,
        [scopeKey]: next,
      };
    });
  }, [scopeKey]);

  const restoreDismissedRows = useCallback(() => {
    setDismissedByScope((current) => ({
      ...current,
      [scopeKey]: new Set(),
    }));
  }, [scopeKey]);

  const dismissedCount = dismissedRowIds.size;

  return {
    dismissedRowIds,
    dismissedCount,
    dismissRows,
    restoreDismissedRows,
  };
}
