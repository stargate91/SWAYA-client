import { useState, useRef, useCallback } from 'react';

/**
 * Custom hook to manage optimistic UI status toggles and queued batch processing
 * with automatic error rollback for entity follow/active mutations.
 */
export function useEntityBatchToggleQueue({ onProcessItem }) {
  const [optimisticStatus, setOptimisticStatus] = useState({});
  const [loadingIds, setLoadingIds] = useState(new Set());
  const [queuedIds, setQueuedIds] = useState(new Set());
  const actionQueueRef = useRef([]);

  const processQueuedActions = useCallback(() => {
    const tasksToProcess = [...actionQueueRef.current];
    actionQueueRef.current = [];

    if (tasksToProcess.length === 0) return;

    tasksToProcess.forEach(async (task) => {
      setQueuedIds((prev) => {
        const next = new Set(prev);
        next.delete(task.id);
        return next;
      });
      setLoadingIds((prev) => {
        const next = new Set(prev);
        next.add(task.id);
        return next;
      });

      try {
        await onProcessItem(task);
      } catch (err) {
        console.error(err);
        setOptimisticStatus((prev) => ({ ...prev, [task.id]: task.previousStatus }));
      } finally {
        setLoadingIds((prev) => {
          const next = new Set(prev);
          next.delete(task.id);
          return next;
        });
      }
    });
  }, [onProcessItem]);

  const enqueueToggleStatus = useCallback(({ id, newActiveStatus, previousStatus, ...meta }) => {
    setOptimisticStatus((prev) => ({ ...prev, [id]: newActiveStatus }));
    setQueuedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });

    actionQueueRef.current.push({
      id,
      newActiveStatus,
      previousStatus,
      ...meta,
    });

    processQueuedActions();
  }, [processQueuedActions]);

  return {
    optimisticStatus,
    loadingIds,
    queuedIds,
    enqueueToggleStatus,
  };
}
