import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { QK } from '@/lib/queryKeys';

export const usePeopleQuery = (params) => useQuery({
  queryKey: [...QK.people, params],
  queryFn: ({ signal }) => api.people.getList(params, { signal }),
});

export const usePeopleInfiniteQuery = (params) => useInfiniteQuery({
  queryKey: [...QK.peopleInfinite, params],
  queryFn: ({ pageParam = 1 }) => api.people.getList({ ...params, page: pageParam }),
  initialPageParam: 1,
  getNextPageParam: (lastPage) => {
    const next = (lastPage.page || 1) + 1;
    return next <= (lastPage.total_pages || 1) ? next : undefined;
  },
});

export const fetchPeopleAll = (queryClient, params) => {
  return queryClient.fetchQuery({
    queryKey: [...QK.people, params],
    queryFn: () => api.people.getAll(params),
    staleTime: 60 * 1000,
  });
};

