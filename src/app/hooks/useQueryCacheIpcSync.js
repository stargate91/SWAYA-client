import { useEffect } from 'react';
import { onIpc, isElectron } from '@/lib/ipc';
import { invalidateEntity, invalidateTvDetail } from '@/lib/queryKeys';

/**
 * Subscribes to IPC 'invalidate-query-cache' events and synchronizes TanStack Query cache.
 *
 * @param {import('@tanstack/react-query').QueryClient} queryClient
 */
export function useQueryCacheIpcSync(queryClient) {
  useEffect(() => {
    if (!isElectron || !queryClient) return;

    return onIpc('invalidate-query-cache', (event, payload) => {
      if (!payload) return;
      const { entityId, entityOpts, tvId, keys } = payload;
      if (entityId) {
        invalidateEntity(queryClient, entityId, entityOpts || {});
      }
      if (tvId) {
        invalidateTvDetail(queryClient, tvId);
      }
      if (Array.isArray(keys)) {
        keys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }
    });
  }, [queryClient]);
}

export default useQueryCacheIpcSync;
