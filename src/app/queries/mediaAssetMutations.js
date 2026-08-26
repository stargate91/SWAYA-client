import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { QK } from '@/lib/queryKeys';
import {
  matchesEntityId,
  stripEntityPrefix,
  isTvEntityId,
  isCollectionEntityId,
} from '@/lib/entityIds';

const matchesLibraryEntity = (item, rawItemId, cleanId) => {
  if (!item || typeof item !== 'object') return false;
  return (
    matchesEntityId(item.id, rawItemId) ||
    matchesEntityId(item.id, cleanId) ||
    matchesEntityId(item.tmdb_id, cleanId) ||
    matchesEntityId(item.tv_tmdb_id, cleanId)
  );
};

const normalizeLocalPosterPath = (path) => {
  if (!path || typeof path !== 'string') return path;
  const cleanPath = path.replace(/\\/g, '/');
  const marker = 'media/images/posters/';
  if (cleanPath.includes(marker)) {
    return cleanPath.split(marker).pop();
  }
  return path;
};

const applyPosterFields = (item, data, rawItemId) => {
  if (!item || typeof item !== 'object') return item;
  const nextPosterPath = data?.poster_path ?? data?.path ?? data?.url ?? item.poster_path;
  const nextLocalPosterPath = normalizeLocalPosterPath(data?.local_poster_path ?? item.local_poster_path);
  const nextDisplayPoster = nextLocalPosterPath || nextPosterPath || item.displayPoster;

  const nextItem = {
    ...item,
    poster_path: nextPosterPath,
    local_poster_path: nextLocalPosterPath,
    displayPoster: nextDisplayPoster,
  };

  if (isTvEntityId(rawItemId)) {
    nextItem.tv_poster_path = nextPosterPath;
  }

  return nextItem;
};

const updatePosterInCacheData = (cacheData, rawItemId, cleanId, data) => {
  if (!cacheData || typeof cacheData !== 'object') return cacheData;

  if (Array.isArray(cacheData)) {
    let changed = false;
    const nextArray = cacheData.map((entry) => {
      const nextEntry = updatePosterInCacheData(entry, rawItemId, cleanId, data);
      if (nextEntry !== entry) changed = true;
      return nextEntry;
    });
    return changed ? nextArray : cacheData;
  }

  if (matchesLibraryEntity(cacheData, rawItemId, cleanId)) {
    return applyPosterFields(cacheData, data, rawItemId);
  }

  let changed = false;
  const nextObject = {};
  for (const [key, value] of Object.entries(cacheData)) {
    const nextValue = updatePosterInCacheData(value, rawItemId, cleanId, data);
    if (nextValue !== value) changed = true;
    nextObject[key] = nextValue;
  }

  return changed ? nextObject : cacheData;
};

const applyLogoFields = (item, data) => {
  if (!item || typeof item !== 'object') return item;
  return {
    ...item,
    logo_path: data?.logo_path ?? data?.path ?? data?.url ?? item.logo_path,
  };
};

const updateLogoInCacheData = (cacheData, rawItemId, cleanId, data) => {
  if (!cacheData || typeof cacheData !== 'object') return cacheData;

  if (Array.isArray(cacheData)) {
    let changed = false;
    const nextArray = cacheData.map((entry) => {
      const nextEntry = updateLogoInCacheData(entry, rawItemId, cleanId, data);
      if (nextEntry !== entry) changed = true;
      return nextEntry;
    });
    return changed ? nextArray : cacheData;
  }

  if (matchesLibraryEntity(cacheData, rawItemId, cleanId)) {
    return applyLogoFields(cacheData, data);
  }

  let changed = false;
  const nextObject = {};
  for (const [key, value] of Object.entries(cacheData)) {
    const nextValue = updateLogoInCacheData(value, rawItemId, cleanId, data);
    if (nextValue !== value) changed = true;
    nextObject[key] = nextValue;
  }

  return changed ? nextObject : cacheData;
};

const syncPosterCaches = (queryClient, rawItemId, data) => {
  const cleanId = stripEntityPrefix(rawItemId);

  queryClient.setQueriesData({ queryKey: QK.library }, (oldData) => (
    updatePosterInCacheData(oldData, rawItemId, cleanId, data)
  ));
  queryClient.setQueriesData({ queryKey: QK.libraryCollections }, (oldData) => (
    updatePosterInCacheData(oldData, rawItemId, cleanId, data)
  ));

  const detailKeys = [
    [...QK.libraryItemDetail, rawItemId],
    [...QK.libraryItemDetail, cleanId],
    [...QK.libraryTvDetail, rawItemId],
    [...QK.libraryTvDetail, cleanId],
  ];

  if (isCollectionEntityId(rawItemId)) {
    detailKeys.push([...QK.libraryCollectionDetail, rawItemId]);
    detailKeys.push([...QK.libraryCollectionDetail, cleanId]);
  }

  detailKeys.forEach((key) => {
    queryClient.setQueriesData({ queryKey: key }, (oldData) => updatePosterInCacheData(oldData, rawItemId, cleanId, data));
  });
};

const syncLogoCaches = (queryClient, rawItemId, data) => {
  const cleanId = stripEntityPrefix(rawItemId);

  queryClient.setQueriesData({ queryKey: QK.library }, (oldData) => (
    updateLogoInCacheData(oldData, rawItemId, cleanId, data)
  ));

  const detailKeys = [
    [...QK.libraryItemDetail, rawItemId],
    [...QK.libraryItemDetail, cleanId],
    [...QK.libraryTvDetail, rawItemId],
    [...QK.libraryTvDetail, cleanId],
  ];

  detailKeys.forEach((key) => {
    queryClient.setQueriesData({ queryKey: key }, (oldData) => updateLogoInCacheData(oldData, rawItemId, cleanId, data));
  });
};

const applyBackdropFields = (item, data, rawItemId) => {
  if (!item || typeof item !== 'object') return item;
  const nextBackdropPath = data?.backdrop_path ?? data?.path ?? data?.url ?? item.backdrop_path;
  const nextLocalBackdropPath = data?.local_backdrop_path ?? item.local_backdrop_path;

  const nextItem = {
    ...item,
    backdrop_path: nextBackdropPath,
    local_backdrop_path: nextLocalBackdropPath,
  };

  if (isTvEntityId(rawItemId)) {
    nextItem.tv_backdrop_path = nextBackdropPath;
  }

  return nextItem;
};

const updateBackdropInCacheData = (cacheData, rawItemId, cleanId, data) => {
  if (!cacheData || typeof cacheData !== 'object') return cacheData;

  if (Array.isArray(cacheData)) {
    let changed = false;
    const nextArray = cacheData.map((entry) => {
      const nextEntry = updateBackdropInCacheData(entry, rawItemId, cleanId, data);
      if (nextEntry !== entry) changed = true;
      return nextEntry;
    });
    return changed ? nextArray : cacheData;
  }

  if (matchesLibraryEntity(cacheData, rawItemId, cleanId)) {
    return applyBackdropFields(cacheData, data, rawItemId);
  }

  let changed = false;
  const nextObject = {};
  for (const [key, value] of Object.entries(cacheData)) {
    const nextValue = updateBackdropInCacheData(value, rawItemId, cleanId, data);
    if (nextValue !== value) changed = true;
    nextObject[key] = nextValue;
  }

  return changed ? nextObject : cacheData;
};

const syncBackdropCaches = (queryClient, rawItemId, data) => {
  const cleanId = stripEntityPrefix(rawItemId);

  queryClient.setQueriesData({ queryKey: QK.library }, (oldData) => (
    updateBackdropInCacheData(oldData, rawItemId, cleanId, data)
  ));
  queryClient.setQueriesData({ queryKey: QK.libraryCollections }, (oldData) => (
    updateBackdropInCacheData(oldData, rawItemId, cleanId, data)
  ));

  const detailKeys = [
    [...QK.libraryItemDetail, rawItemId],
    [...QK.libraryItemDetail, cleanId],
    [...QK.libraryTvDetail, rawItemId],
    [...QK.libraryTvDetail, cleanId],
  ];

  if (isCollectionEntityId(rawItemId)) {
    detailKeys.push([...QK.libraryCollectionDetail, rawItemId]);
    detailKeys.push([...QK.libraryCollectionDetail, cleanId]);
  }

  detailKeys.forEach((key) => {
    queryClient.setQueriesData({ queryKey: key }, (oldData) => updateBackdropInCacheData(oldData, rawItemId, cleanId, data));
  });
};

export const useOverrideBackdropMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ itemId, backdropPath, mediaType }) => api.media.overrideBackdrop(itemId, backdropPath, mediaType),
    onMutate: async ({ itemId, backdropPath }) => {
      syncBackdropCaches(queryClient, itemId, { backdrop_path: backdropPath });
    },
    onSuccess: (data, variables) => {
      syncBackdropCaches(queryClient, variables?.itemId, data);
    },
    meta: {
      invalidates: [QK.recommendations, QK.recentlyAdded, QK.recentlyActivated, QK.discover],
      invalidateEntity: (_data, variables) => ({
        id: variables?.itemId,
        opts: { detail: false, lists: true, recommendations: true, continueWatching: true },
      }),
    },
  });
};

export const useUploadBackdropMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ itemId, file, mediaType }) => api.media.uploadBackdrop(itemId, file, mediaType),
    onSuccess: (data, variables) => {
      syncBackdropCaches(queryClient, variables?.itemId, data);
    },
    meta: {
      invalidates: [QK.recommendations, QK.recentlyAdded, QK.recentlyActivated, QK.discover],
      invalidateEntity: (_data, variables) => ({
        id: variables?.itemId,
        opts: { detail: false, lists: true, recommendations: true, continueWatching: true },
      }),
    },
  });
};

export const useOverridePosterMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ itemId, posterPath, mediaType }) => api.media.overridePoster(itemId, posterPath, mediaType),
    onSuccess: (data, variables) => {
      syncPosterCaches(queryClient, variables?.itemId, data);
    },
    meta: {
      invalidates: [QK.recommendations, QK.recentlyAdded, QK.recentlyActivated, QK.discover],
      invalidateEntity: (_data, variables) => ({
        id: variables?.itemId,
        opts: { detail: false, lists: true, recommendations: true, listsList: true },
      }),
    },
  });
};

export const useUploadPosterMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ itemId, file, mediaType }) => api.media.uploadPoster(itemId, file, mediaType),
    onSuccess: (data, variables) => {
      syncPosterCaches(queryClient, variables?.itemId, data);
    },
    meta: {
      invalidates: [QK.recommendations, QK.recentlyAdded, QK.recentlyActivated, QK.discover],
      invalidateEntity: (_data, variables) => ({
        id: variables?.itemId,
        opts: { detail: false, lists: true, recommendations: true, listsList: true },
      }),
    },
  });
};

export const useOverrideLogoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ itemId, logoPath, mediaType }) => api.media.overrideLogo(itemId, logoPath, mediaType),
    onSuccess: (data, variables) => {
      syncLogoCaches(queryClient, variables?.itemId, data);
    },
    meta: {
      invalidates: [QK.libraryTvDetail, QK.libraryItemDetail],
      invalidateEntity: (_data, variables) => ({
        id: variables?.itemId,
        opts: { detail: false, lists: true, recommendations: true, listsList: true },
      }),
    },
  });
};

export const useUploadLogoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ itemId, file, mediaType }) => api.media.uploadLogo(itemId, file, mediaType),
    onSuccess: (data, variables) => {
      syncLogoCaches(queryClient, variables?.itemId, data);
    },
    meta: {
      invalidates: [QK.libraryTvDetail, QK.libraryItemDetail],
      invalidateEntity: (_data, variables) => ({
        id: variables?.itemId,
        opts: { detail: false, lists: true, recommendations: true, listsList: true },
      }),
    },
  });
};
