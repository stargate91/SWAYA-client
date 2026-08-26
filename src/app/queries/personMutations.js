import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { getEntityIdVariants, QK } from '@/lib/queryKeys';

import {
  syncPersonCacheData,
  addPersonTmdbOptimistic,
  addPersonTmdbSuccess,
  updatePersonStatusOptimistic,
} from './personCacheHelpers';

const syncPersonProfileCaches = syncPersonCacheData;
const syncPersonBackdropCaches = syncPersonCacheData;

export const useAddPersonTmdbMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables) => {
      const payload = typeof variables === 'object' && variables !== null ? variables : { tmdb_id: variables };
      return api.people.addFromTmdb(payload);
    },
    onMutate: async (variables) => {
      return addPersonTmdbOptimistic(queryClient, variables);
    },
    onError: (err, variables, context) => {
      if (context) {
        if (context.previousPeople) {
          context.previousPeople.forEach(([key, val]) => {
            queryClient.setQueryData(key, val);
          });
        }
        if (context.previousPeopleInfinite) {
          context.previousPeopleInfinite.forEach(([key, val]) => {
            queryClient.setQueryData(key, val);
          });
        }
        if (context.previousLibrary) {
          context.previousLibrary.forEach(([key, val]) => {
            queryClient.setQueryData(key, val);
          });
        }
        if (context.previousLibraryInfinite) {
          context.previousLibraryInfinite.forEach(([key, val]) => {
            queryClient.setQueryData(key, val);
          });
        }
      }
    },
    onSuccess: (data, variables) => {
      addPersonTmdbSuccess(queryClient, data, variables);
    },
    meta: {
      invalidatePerson: (data) => ({
        id: data?.id || '',
        opts: { lists: false, stats: true, recommendations: true },
      }),
    },
  });
};

export const useUpdatePersonStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ personId, payload }) => api.people.updateStatus(personId, payload),
    onMutate: async ({ personId, payload }) => {
      return updatePersonStatusOptimistic(queryClient, personId, payload);
    },
    onError: (err, variables, context) => {
      if (context) {
        if (context.previousPersonDetails) {
          context.previousPersonDetails.forEach(([key, val]) => {
            queryClient.setQueryData(key, val);
          });
        }
        if (context.previousPeople) {
          context.previousPeople.forEach(([key, val]) => {
            queryClient.setQueryData(key, val);
          });
        }
        if (context.previousPeopleInfinite) {
          context.previousPeopleInfinite.forEach(([key, val]) => {
            queryClient.setQueryData(key, val);
          });
        }
        if (context.previousLibrary) {
          context.previousLibrary.forEach(([key, val]) => {
            queryClient.setQueryData(key, val);
          });
        }
        if (context.previousLibraryInfinite) {
          context.previousLibraryInfinite.forEach(([key, val]) => {
            queryClient.setQueryData(key, val);
          });
        }
      }
    },
    meta: {
      invalidatePerson: (_data, variables) => ({
        id: variables?.personId,
        opts: { lists: true, stats: true, recommendations: true, listsList: true },
      }),
    },
  });
};

export const useOverridePersonBackdropMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ personId, backdropPath }) => api.people.overrideBackdrop(personId, backdropPath),
    onMutate: ({ personId, backdropPath }) => {
      const variants = getEntityIdVariants(personId);
      const previousDetails = variants.map(id => [
        [...QK.personDetail, id],
        queryClient.getQueryData([...QK.personDetail, id])
      ]);
      const previousPeople = queryClient.getQueriesData({ queryKey: QK.people });
      const previousPeopleInfinite = queryClient.getQueriesData({ queryKey: QK.peopleInfinite });
      const previousLibraryItemDetail = queryClient.getQueriesData({ queryKey: QK.libraryItemDetail });
      const previousLibraryTvDetail = queryClient.getQueriesData({ queryKey: QK.libraryTvDetail });

      syncPersonBackdropCaches(queryClient, personId, {
        backdrop_path: backdropPath,
        local_backdrop_path: null,
        has_local_backdrop: true,
      });

      return {
        previousDetails,
        previousPeople,
        previousPeopleInfinite,
        previousLibraryItemDetail,
        previousLibraryTvDetail
      };
    },
    onError: (err, variables, context) => {
      if (context) {
        const currentDetail = queryClient.getQueryData([...QK.personDetail, variables.personId]) ||
          queryClient.getQueryData([...QK.personDetail, String(variables.personId)]);
        if (currentDetail && currentDetail.backdrop_path && currentDetail.backdrop_path !== variables.backdropPath) {
          return;
        }
        context.previousDetails.forEach(([key, val]) => {
          queryClient.setQueryData(key, val);
        });
        context.previousPeople.forEach(([key, val]) => {
          queryClient.setQueryData(key, val);
        });
        context.previousPeopleInfinite.forEach(([key, val]) => {
          queryClient.setQueryData(key, val);
        });
        context.previousLibraryItemDetail.forEach(([key, val]) => {
          queryClient.setQueryData(key, val);
        });
        context.previousLibraryTvDetail.forEach(([key, val]) => {
          queryClient.setQueryData(key, val);
        });
      }
    },
    onSuccess: (data, variables) => {
      const { personId, backdropPath } = variables;
      const currentDetail = queryClient.getQueryData([...QK.personDetail, personId]) ||
        queryClient.getQueryData([...QK.personDetail, String(personId)]);
      if (currentDetail && currentDetail.backdrop_path && currentDetail.backdrop_path !== backdropPath && currentDetail.backdrop_path !== data?.backdrop_path) {
        return;
      }
      syncPersonBackdropCaches(queryClient, personId, data);
    },
    meta: {
      invalidatePerson: (_data, variables) => ({
        id: variables?.personId,
        opts: { detail: false, lists: true, stats: true, recommendations: true },
      }),
    },
  });
};

export const useUploadPersonBackdropMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ personId, file }) => api.people.uploadBackdrop(personId, file),
    onSuccess: (data, variables) => {
      const { personId } = variables;
      syncPersonBackdropCaches(queryClient, personId, data);
    },
    meta: {
      invalidatePerson: (_data, variables) => ({
        id: variables?.personId,
        opts: { lists: true, stats: true, recommendations: true },
      }),
    },
  });
};

export const useOverridePersonProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ personId, profilePath }) => api.people.overrideProfile(personId, profilePath),
    onMutate: ({ personId, profilePath }) => {
      const variants = getEntityIdVariants(personId);
      const previousDetails = variants.map(id => [
        [...QK.personDetail, id],
        queryClient.getQueryData([...QK.personDetail, id])
      ]);
      const previousPeople = queryClient.getQueriesData({ queryKey: QK.people });
      const previousPeopleInfinite = queryClient.getQueriesData({ queryKey: QK.peopleInfinite });
      const previousLibraryItemDetail = queryClient.getQueriesData({ queryKey: QK.libraryItemDetail });
      const previousLibraryTvDetail = queryClient.getQueriesData({ queryKey: QK.libraryTvDetail });

      syncPersonProfileCaches(queryClient, personId, {
        profile_path: profilePath,
        local_profile_path: null,
        has_local_profile: true,
      });

      return {
        previousDetails,
        previousPeople,
        previousPeopleInfinite,
        previousLibraryItemDetail,
        previousLibraryTvDetail
      };
    },
    onError: (err, variables, context) => {
      if (context) {
        const currentDetail = queryClient.getQueryData([...QK.personDetail, variables.personId]) ||
          queryClient.getQueryData([...QK.personDetail, String(variables.personId)]);
        if (currentDetail && currentDetail.profile_path && currentDetail.profile_path !== variables.profilePath) {
          return;
        }
        context.previousDetails.forEach(([key, val]) => {
          queryClient.setQueryData(key, val);
        });
        context.previousPeople.forEach(([key, val]) => {
          queryClient.setQueryData(key, val);
        });
        context.previousPeopleInfinite.forEach(([key, val]) => {
          queryClient.setQueryData(key, val);
        });
        context.previousLibraryItemDetail.forEach(([key, val]) => {
          queryClient.setQueryData(key, val);
        });
        context.previousLibraryTvDetail.forEach(([key, val]) => {
          queryClient.setQueryData(key, val);
        });
      }
    },
    onSuccess: (data, variables) => {
      const { personId, profilePath } = variables;
      const currentDetail = queryClient.getQueryData([...QK.personDetail, personId]) ||
        queryClient.getQueryData([...QK.personDetail, String(personId)]);
      if (currentDetail && currentDetail.profile_path && currentDetail.profile_path !== profilePath && currentDetail.profile_path !== data?.profile_path) {
        return;
      }
      syncPersonProfileCaches(queryClient, personId, data);
    },
    meta: {
      invalidatePerson: (_data, variables) => ({
        id: variables?.personId,
        opts: { detail: false, lists: true, stats: true, recommendations: true, listsList: true },
      }),
    },
  });
};

export const useUploadPersonProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ personId, file }) => api.people.uploadProfile(personId, file),
    onSuccess: (data, variables) => {
      const { personId } = variables;
      syncPersonProfileCaches(queryClient, personId, data);
    },
    meta: {
      invalidatePerson: (_data, variables) => ({
        id: variables?.personId,
        opts: { lists: true, stats: true, recommendations: true, listsList: true },
      }),
    },
  });
};

export const useLinkPersonSourceMutation = () => useMutation({
  mutationFn: ({ personId, source, externalId, overrides, profileUrl }) => api.people.linkSource(personId, source, externalId, overrides, profileUrl),
  meta: {
    invalidates: [QK.personDetail],
    invalidatePerson: (_data, variables) => ({
      id: variables?.personId,
      opts: { lists: true, stats: true, recommendations: true, listsList: true },
    }),
  },
});

export const useDeletePersonMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (personId) => api.people.delete(personId),
    onSuccess: (_data, personId) => {
      queryClient.removeQueries({ queryKey: [...QK.personDetail, personId] });
      queryClient.removeQueries({ queryKey: [...QK.personDetail, String(personId)] });
      queryClient.removeQueries({ queryKey: [...QK.personCredits, personId] });
      queryClient.removeQueries({ queryKey: [...QK.personCredits, String(personId)] });
    },
    meta: {
      invalidatePerson: (_data, personId) => ({
        id: personId,
        opts: { lists: true, stats: true, recommendations: true, listsList: true },
      }),
    },
  });
};

export const useUnlinkPersonSourceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ personId, source, action }) => api.people.unlinkSource(personId, source, action),
    onMutate: async ({ personId, source }) => {
      const idStr = String(personId);
      const idNum = Number(personId);
      const isNumValid = !isNaN(idNum);

      const personKeys = [
        [...QK.personDetail, personId],
        [...QK.personDetail, idStr],
      ];
      if (isNumValid) {
        personKeys.push([...QK.personDetail, idNum]);
      }

      for (const key of personKeys) {
        await queryClient.cancelQueries({ queryKey: key });
      }

      const previousPersonDetail = queryClient.getQueryData([...QK.personDetail, idStr]) || queryClient.getQueryData([...QK.personDetail, personId]);

      const updateData = (oldData) => {
        if (!oldData) return oldData;
        const newExternalLinks = (oldData.external_links || []).filter(
          (l) => l.provider !== source
        );
        const newExternalIds = { ...(oldData.external_ids || {}) };
        delete newExternalIds[source];
        delete newExternalIds[`${source}_id`];

        let newPrimaryProvider = oldData.primary_provider;
        if (oldData.primary_provider === source) {
          newPrimaryProvider = null;
        }

        return {
          ...oldData,
          external_links: newExternalLinks,
          external_ids: newExternalIds,
          primary_provider: newPrimaryProvider,
        };
      };

      personKeys.forEach((key) => {
        queryClient.setQueryData(key, updateData);
      });

      return { previousPersonDetail, personId };
    },
    onError: (err, variables, context) => {
      if (context && 'previousPersonDetail' in context) {
        const idStr = String(context.personId);
        const idNum = Number(context.personId);
        const isNumValid = !isNaN(idNum);

        queryClient.setQueryData([...QK.personDetail, context.personId], context.previousPersonDetail);
        queryClient.setQueryData([...QK.personDetail, idStr], context.previousPersonDetail);
        if (isNumValid) {
          queryClient.setQueryData([...QK.personDetail, idNum], context.previousPersonDetail);
        }
      }
    },
    meta: {
      invalidatePerson: (_data, variables) => ({
        id: variables?.personId,
        opts: { lists: true, stats: true, recommendations: true, listsList: true },
      }),
    },
  });
};

export const useSetPrimaryPersonSourceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ personId, source }) => api.people.setPrimarySource(personId, source),
    onSuccess: (data, variables) => {
      const idStr = String(variables.personId);
      const idNum = Number(variables.personId);
      const isNumValid = !isNaN(idNum);

      const personKeys = [
        [...QK.personDetail, variables.personId],
        [...QK.personDetail, idStr],
      ];
      if (isNumValid) {
        personKeys.push([...QK.personDetail, idNum]);
      }

      personKeys.forEach((key) => {
        queryClient.setQueryData(key, (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            primary_provider: variables.source,
          };
        });
      });
    },
    meta: {
      invalidatePerson: (_data, variables) => ({
        id: variables?.personId,
        opts: { lists: true, stats: true, recommendations: true },
      }),
    },
  });
};

export const useSetPersonFieldRoutingMutation = () => useMutation({
  mutationFn: ({ personId, routing }) => api.people.setFieldRouting(personId, routing),
  meta: {
    invalidatePerson: (_data, variables) => ({
      id: variables?.personId,
      opts: { lists: true, stats: true, recommendations: true },
    }),
  },
});

export const useSavePersonCustomFieldsMutation = () => useMutation({
  mutationFn: ({ personId, fields }) => api.people.saveCustomFields(personId, fields),
  meta: {
    invalidatePerson: (_data, variables) => ({
      id: variables?.personId,
      opts: { lists: true, stats: true, recommendations: true },
    }),
  },
});

