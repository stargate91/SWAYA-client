import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { QK } from '@/lib/queryKeys';

export const useImageStatusQuery = ({ enabled = true } = {}) => useQuery({
  queryKey: QK.imageStatus,
  queryFn: () => api.image.getStatus(),
  enabled,
  refetchInterval: (query) => {
    const data = query.state.data;
    if (!data?.active) return false;
    return 1500;
  },
});

