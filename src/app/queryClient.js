import { QueryClient, MutationCache } from '@tanstack/react-query';
import {
  invalidateAllMediaCaches,
  invalidateEntity,
  invalidateTvDetail,
  invalidatePerson,
  invalidateTag,
} from './lib/queryKeys';
import { sendIpc } from './lib/ipc';
import { toast } from './stores/useToastStore';

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: (data, variables, context, mutation) => {
      try {
        const meta = mutation.meta || mutation.options?.meta;
        if (!meta) return;

        // 1. Static or dynamic invalidation list
        const rawInvalidates = typeof meta.invalidates === 'function'
          ? meta.invalidates(data, variables, context)
          : meta.invalidates;

        if (Array.isArray(rawInvalidates)) {
          rawInvalidates.forEach((queryKey) => {
            if (queryKey) {
              queryClient.invalidateQueries({ queryKey });
            }
          });
        }

        // 2. Global media cache invalidation
        const shouldInvalidateAllMedia = typeof meta.invalidateAllMedia === 'function'
          ? meta.invalidateAllMedia(data, variables, context)
          : meta.invalidateAllMedia;

        if (shouldInvalidateAllMedia) {
          invalidateAllMediaCaches(queryClient);
        }

        // 3. Entity detail + related caches invalidation
        if (meta.invalidateEntity) {
          const entityTarget = typeof meta.invalidateEntity === 'function'
            ? meta.invalidateEntity(data, variables, context)
            : meta.invalidateEntity;

          if (entityTarget) {
            const targets = Array.isArray(entityTarget) ? entityTarget : [entityTarget];
            targets.forEach((target) => {
              if (typeof target === 'object' && target !== null && 'id' in target) {
                invalidateEntity(queryClient, target.id, target.opts || {});
              } else if (target) {
                invalidateEntity(queryClient, target);
              }
            });
          }
        }

        // 4. TV show detail invalidation
        if (meta.invalidateTv) {
          const tvId = typeof meta.invalidateTv === 'function'
            ? meta.invalidateTv(data, variables, context)
            : meta.invalidateTv;
          if (tvId) {
            invalidateTvDetail(queryClient, tvId);
          }
        }

        // 5. Person detail + related caches invalidation
        if (meta.invalidatePerson) {
          const personTarget = typeof meta.invalidatePerson === 'function'
            ? meta.invalidatePerson(data, variables, context)
            : meta.invalidatePerson;

          if (personTarget) {
            const targets = Array.isArray(personTarget) ? personTarget : [personTarget];
            targets.forEach((target) => {
              if (typeof target === 'object' && target !== null && 'id' in target) {
                invalidatePerson(queryClient, target.id, target.opts || {});
              } else if (target) {
                invalidatePerson(queryClient, target);
              }
            });
          }
        }

        // 6. Tag caches invalidation
        if (meta.invalidateTag) {
          const tagTarget = typeof meta.invalidateTag === 'function'
            ? meta.invalidateTag(data, variables, context)
            : meta.invalidateTag;
          if (tagTarget) {
            invalidateTag(queryClient, tagTarget);
          }
        }

        // 7. Optional IPC cache broadcast across Electron windows
        if (meta.broadcast) {
          const broadcastPayload = typeof meta.broadcast === 'function'
            ? meta.broadcast(data, variables, context)
            : meta.broadcast;
          if (broadcastPayload) {
            sendIpc('broadcast-ipc-event', {
              channel: 'invalidate-query-cache',
              payload: typeof broadcastPayload === 'object' ? broadcastPayload : {},
            });
          }
        }

        // 8. Declarative success toast
        if (meta.successToast) {
          const message = typeof meta.successToast === 'function'
            ? meta.successToast(data, variables, context)
            : meta.successToast;
          if (message) {
            toast(message, 'success');
          }
        }

        // 9. Reset all queries (e.g. database wipe / factory reset)
        if (meta.resetAllQueries) {
          queryClient.resetQueries();
        }
      } catch (err) {
        console.error('Error in global mutationCache onSuccess:', err);
      }
    },
    onError: (error, variables, context, mutation) => {
      try {
        const meta = mutation.meta || mutation.options?.meta;
        if (meta?.errorToast) {
          const message = typeof meta.errorToast === 'function'
            ? meta.errorToast(error, variables, context)
            : meta.errorToast;
          if (message) {
            toast(message, 'danger');
          }
        }
      } catch (err) {
        console.error('Error in global mutationCache onError:', err);
      }
    },
  }),
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        const errorMessage = String(error?.message || error || '');
        const isNetworkOrStartupError =
          error?.name === 'TypeError' ||
          errorMessage.includes('Failed to fetch') ||
          errorMessage.includes('NetworkError') ||
          errorMessage.includes('ERR_CONNECTION_REFUSED') ||
          errorMessage.includes('502') ||
          errorMessage.includes('503') ||
          errorMessage.includes('504');

        if (isNetworkOrStartupError) {
          return failureCount < 5;
        }
        return false;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
      refetchOnWindowFocus: false,
      staleTime: 30000,
    },
  },
});


