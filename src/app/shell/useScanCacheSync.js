import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useScanStatusQuery, useHydrateStatusQuery } from '@/queries/scanQueries';
import { invalidateAllMediaCaches, invalidatePerson } from '@/lib/queryKeys';

export function useScanCacheSync() {
  const queryClient = useQueryClient();

  const { data: isScanActive = false } = useScanStatusQuery({
    select: (data) => Boolean(data?.active),
  });
  const { data: isHydrateActive = false } = useHydrateStatusQuery({
    select: (data) => Boolean(data?.active),
  });

  const prevScanActiveRef = useRef(false);
  const prevHydrateActiveRef = useRef(false);

  useEffect(() => {
    const wasScanActive = prevScanActiveRef.current;

    if (wasScanActive && !isScanActive) {
      invalidateAllMediaCaches(queryClient);
      invalidatePerson(queryClient, '', { lists: true, stats: true, recommendations: true });
    }

    prevScanActiveRef.current = isScanActive;
  }, [isScanActive, queryClient]);

  useEffect(() => {
    const wasHydrateActive = prevHydrateActiveRef.current;

    if (wasHydrateActive && !isHydrateActive) {
      invalidateAllMediaCaches(queryClient);
      invalidatePerson(queryClient, '', { lists: true, stats: true, recommendations: true });
    }

    prevHydrateActiveRef.current = isHydrateActive;
  }, [isHydrateActive, queryClient]);
}
