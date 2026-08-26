import { QK, invalidatePerson } from '@/lib/queryKeys';
import { matchesEntityId } from '@/lib/entityIds';

export const matchesId = matchesEntityId;

export const syncPersonCacheData = (queryClient, personId, data) => {
  if (!queryClient || !personId || !data) return;

  queryClient.setQueriesData({ queryKey: QK.personDetail }, (oldData) => {
    if (!oldData) return oldData;

    const matchesDbId = matchesId(oldData.id, personId) || matchesId(oldData.tmdb_id, personId);
    const matchesExternalId = oldData.external_ids && Object.values(oldData.external_ids).some(extId => matchesId(extId, personId));

    if (matchesDbId || matchesExternalId) {
      return {
        ...oldData,
        profile_path: data?.profile_path ?? oldData.profile_path,
        local_profile_path: data?.local_profile_path ?? oldData.local_profile_path,
        has_local_profile: data?.has_local_profile ?? oldData.has_local_profile,
        backdrop_path: data?.backdrop_path ?? oldData.backdrop_path,
        local_backdrop_path: data?.local_backdrop_path ?? oldData.local_backdrop_path,
        has_local_backdrop: data?.has_local_backdrop ?? oldData.has_local_backdrop,
      };
    }
    return oldData;
  });

  queryClient.setQueriesData({ queryKey: QK.people }, (oldData) => {
    if (!oldData?.items) return oldData;
    return {
      ...oldData,
      items: oldData.items.map((item) => (
        matchesId(item.id, personId)
          ? {
            ...item,
            profile_path: data?.profile_path ?? item.profile_path,
            poster_path: data?.profile_path ?? item.poster_path,
            local_profile_path: data?.local_profile_path ?? item.local_profile_path,
            backdrop_path: data?.backdrop_path ?? item.backdrop_path,
            local_backdrop_path: data?.local_backdrop_path ?? item.local_backdrop_path,
          }
          : item
      )),
    };
  });

  queryClient.setQueriesData({ queryKey: QK.peopleInfinite }, (oldData) => {
    if (!oldData?.pages) return oldData;
    return {
      ...oldData,
      pages: oldData.pages.map((page) => ({
        ...page,
        items: (page.items || []).map((item) => (
          matchesId(item.id, personId)
            ? {
              ...item,
              profile_path: data?.profile_path ?? item.profile_path,
              poster_path: data?.profile_path ?? item.poster_path,
              local_profile_path: data?.local_profile_path ?? item.local_profile_path,
              backdrop_path: data?.backdrop_path ?? item.backdrop_path,
              local_backdrop_path: data?.local_backdrop_path ?? item.local_backdrop_path,
            }
            : item
        )),
      })),
    };
  });

  queryClient.setQueriesData({ queryKey: QK.library }, (oldData) => {
    if (!oldData?.items) return oldData;
    return {
      ...oldData,
      items: oldData.items.map((item) => (
        matchesId(item.id, personId)
          ? {
            ...item,
            profile_path: data?.profile_path ?? item.profile_path,
            poster_path: data?.profile_path ?? item.poster_path,
            local_profile_path: data?.local_profile_path ?? item.local_profile_path,
            displayPoster: data?.profile_path ?? item.displayPoster,
            backdrop_path: data?.backdrop_path ?? item.backdrop_path,
            local_backdrop_path: data?.local_backdrop_path ?? item.local_backdrop_path,
          }
          : item
      )),
    };
  });

  const cachedPerson = queryClient.getQueryData([...QK.personDetail, personId]) ||
    queryClient.getQueryData([...QK.personDetail, String(personId)]) ||
    queryClient.getQueryData([...QK.personDetail, Number(personId)]);
  const personName = (data?.name || cachedPerson?.name)?.toLowerCase();

  const updateMediaDetailCache = (oldData) => {
    if (!oldData) return oldData;
    if (!oldData.directors && !oldData.cast) return oldData;
    const updatePersonList = (list) => {
      if (!list) return list;
      return list.map((p) => {
        const isMatch = matchesId(p.id, personId);
        const matchesPrefixedId = p.id === `local:${personId}` || p.id === `tmdb:${personId}`;
        const matchesName = personName && p.name?.toLowerCase() === personName;

        return isMatch || matchesPrefixedId || matchesName
          ? {
            ...p,
            profile_path: data?.profile_path ?? p.profile_path,
            local_profile_path: data?.local_profile_path ?? p.local_profile_path,
          }
          : p;
      });
    };
    return {
      ...oldData,
      directors: updatePersonList(oldData.directors),
      cast: updatePersonList(oldData.cast),
    };
  };

  queryClient.setQueriesData({ queryKey: QK.libraryItemDetail }, updateMediaDetailCache);
  queryClient.setQueriesData({ queryKey: QK.libraryTvDetail }, updateMediaDetailCache);
  invalidatePerson(queryClient, personId, { recommendations: true });
};

export const addPersonTmdbOptimistic = (queryClient, variables) => {
  if (typeof variables !== 'object' || variables === null) return {};

  const personId = variables.tmdb_id;
  const personData = {
    id: `person:${personId}`,
    tmdb_id: personId,
    name: variables.name,
    profile_path: variables.profile_path,
    gender: variables.gender,
    is_adult: variables.is_adult,
    is_active: true,
  };

  // Cancel outgoing refetches (non-blocking)
  queryClient.cancelQueries({ queryKey: QK.people });
  queryClient.cancelQueries({ queryKey: QK.peopleInfinite });
  queryClient.cancelQueries({ queryKey: QK.library });
  queryClient.cancelQueries({ queryKey: QK.libraryInfinite });

  const previousPeople = queryClient.getQueriesData({ queryKey: QK.people });
  const previousPeopleInfinite = queryClient.getQueriesData({ queryKey: QK.peopleInfinite });
  const previousLibrary = queryClient.getQueriesData({ queryKey: QK.library });
  const previousLibraryInfinite = queryClient.getQueriesData({ queryKey: QK.libraryInfinite });

  // Update library list
  const allLibraryQueries = queryClient.getQueriesData({ queryKey: QK.library });
  allLibraryQueries.forEach(([queryKey, oldData]) => {
    if (!oldData?.items) return;
    const params = queryKey[1] || {};
    const isPeopleTab = params.tab === 'people' || params.tab === 'adult_people';

    if (isPeopleTab) {
      const alreadyExists = oldData.items.some((item) => matchesId(item.id, personId) || matchesId(item.tmdb_id, personId));
      if (!alreadyExists) {
        queryClient.setQueryData(queryKey, {
          ...oldData,
          items: [...oldData.items, personData],
          total_items: (oldData.total_items || 0) + 1,
        });
      }
    }
  });

  // Update infinite library lists
  const allLibraryInfiniteQueries = queryClient.getQueriesData({ queryKey: QK.libraryInfinite });
  allLibraryInfiniteQueries.forEach(([queryKey, oldData]) => {
    if (!oldData?.pages) return;
    const params = queryKey[1] || {};
    const isPeopleTab = params.tab === 'people' || params.tab === 'adult_people';

    if (isPeopleTab) {
      const alreadyExists = oldData.pages.some((p) => (p.items || []).some((item) => matchesId(item.id, personId) || matchesId(item.tmdb_id, personId)));
      if (!alreadyExists) {
        queryClient.setQueryData(queryKey, {
          ...oldData,
          pages: oldData.pages.map((page, index) => {
            if (index === 0) {
              return {
                ...page,
                items: [personData, ...(page.items || [])],
              };
            }
            return page;
          }),
        });
      }
    }
  });

  // Update people lists
  const allPeopleQueries = queryClient.getQueriesData({ queryKey: QK.people });
  allPeopleQueries.forEach(([queryKey, oldData]) => {
    if (!oldData?.items) return;
    queryClient.setQueryData(queryKey, {
      ...oldData,
      items: oldData.items.map((item) => (
        matchesId(item.id, personId) || matchesId(item.tmdb_id, personId)
          ? { ...item, is_active: true }
          : item
      )),
    });
  });

  // Update infinite people lists
  const allPeopleInfiniteQueries = queryClient.getQueriesData({ queryKey: QK.peopleInfinite });
  allPeopleInfiniteQueries.forEach(([queryKey, oldData]) => {
    if (!oldData?.pages) return;
    queryClient.setQueryData(queryKey, {
      ...oldData,
      pages: oldData.pages.map((page) => ({
        ...page,
        items: (page.items || []).map((item) => (
          matchesId(item.id, personId) || matchesId(item.tmdb_id, personId)
            ? { ...item, is_active: true }
            : item
        )),
      })),
    });
  });

  return { previousPeople, previousPeopleInfinite, previousLibrary, previousLibraryInfinite };
};

export const addPersonTmdbSuccess = (queryClient, data, variables) => {
  if (!data || !variables || typeof variables !== 'object') return;
  const tempId = `person:${variables.tmdb_id}`;

  // Update temp ID to real ID in ['library']
  const allLibraryQueries = queryClient.getQueriesData({ queryKey: QK.library });
  allLibraryQueries.forEach(([queryKey, oldData]) => {
    if (!oldData?.items) return;
    queryClient.setQueryData(queryKey, {
      ...oldData,
      items: oldData.items.map((item) =>
        matchesId(item.id, tempId) ? { ...item, ...data } : item
      ),
    });
  });

  // Update temp ID to real ID in ['libraryInfinite']
  const allLibraryInfiniteQueries = queryClient.getQueriesData({ queryKey: QK.libraryInfinite });
  allLibraryInfiniteQueries.forEach(([queryKey, oldData]) => {
    if (!oldData?.pages) return;
    queryClient.setQueryData(queryKey, {
      ...oldData,
      pages: oldData.pages.map((page) => ({
        ...page,
        items: (page.items || []).map((item) =>
          matchesId(item.id, tempId) ? { ...item, ...data } : item
        ),
      })),
    });
  });

  // Update temp ID to real ID in ['people-infinite']
  const allPeopleInfiniteQueries = queryClient.getQueriesData({ queryKey: QK.peopleInfinite });
  allPeopleInfiniteQueries.forEach(([queryKey, oldData]) => {
    if (!oldData?.pages) return;
    queryClient.setQueryData(queryKey, {
      ...oldData,
      pages: oldData.pages.map((page) => ({
        ...page,
        items: (page.items || []).map((item) =>
          matchesId(item.id, tempId) || matchesId(item.tmdb_id, variables.tmdb_id)
            ? { ...item, ...data, is_active: true }
            : item
        ),
      })),
    });
  });
};

export const updatePersonStatusOptimistic = (queryClient, personId, payload) => {
  const allPersonDetailQueries = queryClient.getQueriesData({ queryKey: QK.personDetail });
  const personKeys = [];

  allPersonDetailQueries.forEach(([queryKey, queryData]) => {
    const keyId = queryKey[1];
    if (keyId === undefined || keyId === null) return;
    const isMatch = matchesId(keyId, personId) || (queryData && matchesId(queryData.id, personId));
    if (isMatch) {
      personKeys.push(queryKey);
    }
  });

  if (personKeys.length === 0) {
    personKeys.push([...QK.personDetail, personId]);
  }

  // Cancel outgoing refetches (non-blocking)
  for (const key of personKeys) {
    queryClient.cancelQueries({ queryKey: key });
  }
  queryClient.cancelQueries({ queryKey: QK.people });
  queryClient.cancelQueries({ queryKey: QK.peopleInfinite });
  queryClient.cancelQueries({ queryKey: QK.library });
  queryClient.cancelQueries({ queryKey: QK.libraryInfinite });

  // Snapshot previous values
  const previousPersonDetails = personKeys.map((key) => [key, queryClient.getQueryData(key)]);
  const previousPeople = queryClient.getQueriesData({ queryKey: QK.people });
  const previousPeopleInfinite = queryClient.getQueriesData({ queryKey: QK.peopleInfinite });
  const previousLibrary = queryClient.getQueriesData({ queryKey: QK.library });
  const previousLibraryInfinite = queryClient.getQueriesData({ queryKey: QK.libraryInfinite });

  // Find the person's data from any existing cache to use for adding
  let personData = null;
  personKeys.forEach((key) => {
    const data = queryClient.getQueryData(key);
    if (data && (matchesId(data.id, personId) || matchesId(data.tmdb_id, personId))) {
      personData = data;
    }
  });
  if (!personData) {
    previousPeople.forEach(([, val]) => {
      if (val?.items) {
        const found = val.items.find((item) => matchesId(item.id, personId) || matchesId(item.tmdb_id, personId));
        if (found) personData = found;
      }
    });
  }
  if (!personData) {
    previousPeopleInfinite.forEach(([, val]) => {
      if (val?.pages) {
        val.pages.forEach((page) => {
          const found = (page.items || []).find((item) => matchesId(item.id, personId) || matchesId(item.tmdb_id, personId));
          if (found) personData = found;
        });
      }
    });
  }

  const updates = {};
  if (payload) {
    if ('is_favorite' in payload) updates.is_favorite = payload.is_favorite;
    if ('is_active' in payload) updates.is_active = payload.is_active;
    if ('user_rating' in payload) updates.user_rating = payload.user_rating;
    if ('user_comment' in payload) updates.user_comment = payload.user_comment;
    if ('custom_tags' in payload) updates.custom_tags = payload.custom_tags;
  }

  if (Object.keys(updates).length > 0) {
    // Update person details
    personKeys.forEach((key) => {
      queryClient.setQueryData(key, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          ...updates,
        };
      });
    });

    // Update people lists
    const allPeopleQueries = queryClient.getQueriesData({ queryKey: QK.people });
    allPeopleQueries.forEach(([queryKey, oldData]) => {
      if (!oldData?.items) return;
      const params = queryKey[1] || {};
      const filterRating = params.filter_rating;
      const hasNewRating = updates.user_rating !== undefined && updates.user_rating !== null && Number(updates.user_rating) > 0;

      let newItems = oldData.items.map((item) => (
        matchesId(item.id, personId)
          ? { ...item, ...updates }
          : item
      ));

      if (filterRating === 'unrated' && 'user_rating' in updates && hasNewRating) {
        newItems = newItems.filter((item) => !matchesId(item.id, personId));
      } else if (filterRating === 'rated' && 'user_rating' in updates && !hasNewRating) {
        newItems = newItems.filter((item) => !matchesId(item.id, personId));
      }

      const diff = oldData.items.length - newItems.length;
      queryClient.setQueryData(queryKey, {
        ...oldData,
        items: newItems,
        total_items: diff > 0 ? Math.max(0, (oldData.total_items || 0) - diff) : oldData.total_items,
      });
    });

    // Update infinite people lists
    const allPeopleInfiniteQueries = queryClient.getQueriesData({ queryKey: QK.peopleInfinite });
    allPeopleInfiniteQueries.forEach(([queryKey, oldData]) => {
      if (!oldData?.pages) return;
      queryClient.setQueryData(queryKey, {
        ...oldData,
        pages: oldData.pages.map((page) => {
          const newItems = (page.items || []).map((item) => (
            matchesId(item.id, personId)
              ? { ...item, ...updates }
              : item
          ));
          return {
            ...page,
            items: newItems,
          };
        }),
      });
    });

    // Update library list
    const allLibraryQueries = queryClient.getQueriesData({ queryKey: QK.library });
    allLibraryQueries.forEach(([queryKey, oldData]) => {
      if (!oldData?.items) return;
      const params = queryKey[1] || {};
      const isPeopleTab = params.tab === 'people' || params.tab === 'adult_people';
      const filterRating = params.filter_rating;
      const hasNewRating = updates.user_rating !== undefined && updates.user_rating !== null && Number(updates.user_rating) > 0;

      let newItems = oldData.items;
      if ('is_active' in updates) {
        if (updates.is_active === false) {
          newItems = newItems.filter((item) => !matchesId(item.id, personId));
        } else if (updates.is_active === true && isPeopleTab && personData) {
          const alreadyExists = newItems.some((item) => matchesId(item.id, personId));
          if (!alreadyExists) {
            newItems = [...newItems, { ...personData, ...updates }];
          }
        }
      } else if (filterRating === 'unrated' && 'user_rating' in updates && hasNewRating) {
        newItems = newItems.filter((item) => !matchesId(item.id, personId));
      } else if (filterRating === 'rated' && 'user_rating' in updates && !hasNewRating) {
        newItems = newItems.filter((item) => !matchesId(item.id, personId));
      } else {
        newItems = newItems.map((item) => (
          matchesId(item.id, personId)
            ? { ...item, ...updates }
            : item
        ));
      }

      const diff = oldData.items.length - newItems.length;
      queryClient.setQueryData(queryKey, {
        ...oldData,
        items: newItems,
        total_items: diff > 0 ? Math.max(0, (oldData.total_items || 0) - diff) : oldData.total_items,
      });
    });

    // Update infinite library lists
    const allLibraryInfiniteQueries = queryClient.getQueriesData({ queryKey: QK.libraryInfinite });
    allLibraryInfiniteQueries.forEach(([queryKey, oldData]) => {
      if (!oldData?.pages) return;
      const params = queryKey[1] || {};
      const isPeopleTab = params.tab === 'people' || params.tab === 'adult_people';

      queryClient.setQueryData(queryKey, {
        ...oldData,
        pages: oldData.pages.map((page, index) => {
          let newItems = page.items || [];
          if ('is_active' in updates) {
            if (updates.is_active === false) {
              newItems = newItems.filter((item) => !matchesId(item.id, personId));
            } else if (updates.is_active === true && isPeopleTab && personData && index === 0) {
              const alreadyExists = oldData.pages.some((p) => (p.items || []).some((item) => matchesId(item.id, personId)));
              if (!alreadyExists) {
                newItems = [{ ...personData, ...updates }, ...newItems];
              }
            }
          } else {
            newItems = newItems.map((item) => (
              matchesId(item.id, personId)
                ? { ...item, ...updates }
                : item
            ));
          }
          return {
            ...page,
            items: newItems,
          };
        }),
      });
    });
  }

  return { previousPersonDetails, previousPeople, previousPeopleInfinite, previousLibrary, previousLibraryInfinite };
};
