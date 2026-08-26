import { useMemo, useState, useCallback } from 'react';
import { useFullMetadataQuery, usePersonDetailQuery, useLibraryCollectionDetailQuery } from '@/queries/metadataQueries';
import { useTranslation } from '@/providers/LanguageContext';
import { resolveDetailsImageUrl, buildTmdbImageUrl, TMDB_IMAGE_SIZES, pathsMatch } from '@/lib/imageUrls';
import { API_BASE } from '@/lib/backend';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

export function useUniversalImageGridState({
  itemId,
  mediaType,
  imageType = 'backdrop',
  customImages,
  currentPath,
  onSelect,
  initialVisibleCount,
  visibleStep,
  selectedSource,
}) {
  const { locale } = useTranslation();
  const isPerson = mediaType === 'person';
  const isCollection = mediaType === 'collection';
  const [loadMoreCount, setLoadMoreCount] = useState(0);
  const metadataLanguage = locale === 'en' ? 'en-US' : locale;
  const normalizedMediaType = mediaType === 'tv' ? 'tv' : mediaType;

  // Extract clean ID if it starts with collection_
  const cleanItemId = useMemo(() => {
    if (typeof itemId === 'string' && itemId.startsWith('collection_')) {
      return itemId.replace('collection_', '');
    }
    return itemId;
  }, [itemId]);

  const metadataQueryId = cleanItemId;

  const { data: fullMetadata, isLoading: isLoadingMetadata } = useFullMetadataQuery(metadataQueryId, normalizedMediaType, {
    enabled: !customImages && Boolean(metadataQueryId) && !isPerson && !isCollection,
    language: metadataLanguage,
  });

  const { data: personDetail, isLoading: isLoadingPerson } = usePersonDetailQuery(cleanItemId, {
    enabled: !customImages && Boolean(cleanItemId) && isPerson,
  });

  const { data: collectionDetail, isLoading: isLoadingCollection } = useLibraryCollectionDetailQuery(cleanItemId, {
    enabled: !customImages && Boolean(cleanItemId) && isCollection,
    language: metadataLanguage,
  });

  const isLoading = isLoadingMetadata || isLoadingPerson || isLoadingCollection;

  const images = useMemo(() => {
    if (customImages) return customImages;

    if (isPerson) {
      if (!personDetail?.images) return [];
      let list = [...(personDetail?.images || [])];

      if (selectedSource && selectedSource !== 'all') {
        const getDomain = (img) => {
          try {
            return new URL(img).hostname;
          } catch {
            return '';
          }
        };
        const hasUuid = (img) => /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i.test(img);

        const isStashDB = (img) => {
          const lower = String(img || '').toLowerCase();
          if (lower.includes('/stashdb_') || lower.includes('stashdb.org')) return true;
          return false;
        };

        const isFansDB = (img) => {
          const lower = String(img || '').toLowerCase();
          if (lower.includes('/fansdb_') || lower.includes('fansdb.cc')) return true;
          const d = getDomain(img);
          if (d && (d.includes('metadataapi') || d.includes('theporndb')) && hasUuid(img)) return true;
          if (lower.includes('metadataapi') && hasUuid(img)) return true;
          return false;
        };

        const isThePornDB = (img) => {
          const lower = String(img || '').toLowerCase();
          if (lower.includes('/theporndb_') || lower.includes('theporndb')) return true;
          const d = getDomain(img);
          if (d && d.includes('metadataapi') && !hasUuid(img)) return true;
          if (lower.includes('metadataapi') && !hasUuid(img)) return true;
          return false;
        };

        const isTMDB = (img) => img.includes('tmdb') || (!isThePornDB(img) && !isStashDB(img) && !isFansDB(img));

        let filteredList = list;
        if (selectedSource === 'tmdb') {
          filteredList = list.filter(isTMDB);
        } else if (selectedSource === 'stashdb') {
          filteredList = list.filter(isStashDB);
        } else if (selectedSource === 'fansdb') {
          filteredList = list.filter(isFansDB);
        } else if (selectedSource === 'theporndb') {
          filteredList = list.filter(isThePornDB);
        }

        if (filteredList.length > 0) {
          list = filteredList;
        }
      }

      // Simple unique string deduplication
      const seen = new Set();
      const filteredList = [];
      for (const img of list) {
        if (!img || seen.has(img)) continue;
        seen.add(img);
        filteredList.push(img);
      }
      list = filteredList;

      return list.map((img) => ({
        file_path: img,
        width: 0,
        height: 0,
        vote_average: 0,
      }));
    }

    if (isCollection) {
      if (imageType === 'backdrop') {
        const collectionBackdropOptions = Array.isArray(collectionDetail?.collection_backdrops)
          ? collectionDetail.collection_backdrops
          : Array.isArray(collectionDetail?.backdrops)
            ? collectionDetail.backdrops
            : Array.isArray(collectionDetail?.images?.backdrops)
              ? collectionDetail.images.backdrops
              : [];

        const seen = new Set();
        return collectionBackdropOptions
          .map((bd, index) => {
            const cleanPath = bd.file_path || bd.backdrop_path || bd.path || '';
            const key = cleanPath.split(/[/\\]/).pop().toLowerCase().replace(/\.[^/.]+$/, '');
            return {
              file_path: cleanPath,
              key,
              width: bd.width,
              height: bd.height,
              vote_average: bd.vote_average,
              sort_score: Number(bd.vote_average) || 0,
              sort_votes: Number(bd.vote_count) || 0,
              sort_index: index,
              iso_639_1: bd.iso_639_1,
            };
          })
          .filter((opt) => opt.file_path && opt.key && (!opt.iso_639_1 || opt.iso_639_1 === 'null'))
          .sort((a, b) => b.sort_score - a.sort_score || b.sort_votes - a.sort_votes || a.sort_index - b.sort_index)
          .filter((opt) => {
            if (seen.has(opt.key)) return false;
            seen.add(opt.key);
            return true;
          });
      }

      const collectionPosterOptions = Array.isArray(collectionDetail?.collection_posters)
        ? collectionDetail.collection_posters
        : Array.isArray(collectionDetail?.posters)
          ? collectionDetail.posters
          : Array.isArray(collectionDetail?.images?.posters)
            ? collectionDetail.images.posters
            : [];

      const localeShort = String(metadataLanguage || '').split('-', 1)[0].toLowerCase();
      return collectionPosterOptions
        .map((img) => {
          const imgLang = String(img.iso_639_1 || '').toLowerCase();
          let score = 0;
          if (imgLang === String(metadataLanguage || '').toLowerCase()) {
            score = 4;
          } else if (localeShort && imgLang.split('-', 1)[0] === localeShort) {
            score = 3;
          } else if (imgLang === 'en' || imgLang === 'en-us') {
            score = 2;
          } else if (!imgLang || imgLang === 'null') {
            score = 1;
          }
          return {
            file_path: img.file_path || img.poster_path || img.path,
            width: img.width,
            height: img.height,
            vote_average: img.vote_average,
            score,
          };
        })
        .sort((a, b) => {
          if (b.score !== a.score) {
            return b.score - a.score;
          }
          return (b.vote_average || 0) - (a.vote_average || 0);
        });
    }

    const activeMatch = fullMetadata?.matches?.find((m) => m.is_active);
    const imageKey = imageType === 'backdrop' ? 'backdrops' : imageType === 'logo' ? 'logos' : 'posters';

    if (!activeMatch && fullMetadata?.raw_details?.images) {
      const rawImages = fullMetadata.raw_details.images[imageKey];
      if (Array.isArray(rawImages)) {
        const isBackdrop = imageType === 'backdrop';
        const localeShort = String(metadataLanguage || '').split('-', 1)[0].toLowerCase();

        if (isBackdrop) {
          return rawImages
            .filter((img) => {
              const imgLang = String(img.iso_639_1 || '').toLowerCase();
              return (imgLang === '' || imgLang === 'null') && (img.width || 0) >= 1280;
            })
            .map((img) => ({
              file_path: img.file_path,
              width: img.width,
              height: img.height,
              vote_average: img.vote_average,
              score: (img.width || 0) >= 1920 ? 2 : 1,
            }))
            .sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
        }

        return rawImages
          .map((img) => {
            const imgLang = String(img.iso_639_1 || '').toLowerCase();
            let score = 0;
            if (imgLang === String(metadataLanguage || '').toLowerCase()) {
              score = 4;
            } else if (localeShort && imgLang.split('-', 1)[0] === localeShort) {
              score = 3;
            } else if (imgLang === 'en' || imgLang === 'en-us') {
              score = 2;
            } else if (!imgLang || imgLang === 'null') {
              score = 1;
            }
            return {
              file_path: img.file_path,
              width: img.width,
              height: img.height,
              vote_average: img.vote_average,
              score,
            };
          })
          .sort((a, b) => {
            if (b.score !== a.score) {
              return b.score - a.score;
            }
            return (b.vote_average || 0) - (a.vote_average || 0);
          });
      }
    }

    const responseMap =
      normalizedMediaType === 'tv'
        ? activeMatch?.tv_api_responses || activeMatch?.api_responses || {}
        : activeMatch?.api_responses || activeMatch?.tv_api_responses || {};

    const responseEntries = Object.entries(responseMap);
    const isBackdrop = imageType === 'backdrop';
    const localeShort = String(metadataLanguage || '').split('-', 1)[0].toLowerCase();
    const allImagesMap = new Map();

    for (const [lang, response] of responseEntries) {
      const rawImages = response?.images?.[imageKey];
      if (!Array.isArray(rawImages)) continue;

      const normalizedLang = String(lang || '').toLowerCase();

      // For backdrops, only include language-independent entries
      if (isBackdrop && normalizedLang !== 'null' && normalizedLang !== '') {
        continue;
      }

      let langScore = 0;
      if (isBackdrop) {
        langScore = 1;
      } else if (normalizedLang === String(metadataLanguage || '').toLowerCase()) {
        langScore = 4;
      } else if (localeShort && normalizedLang.split('-', 1)[0] === localeShort) {
        langScore = 3;
      } else if (normalizedLang === 'en' || normalizedLang === 'en-us') {
        langScore = 2;
      } else if (!normalizedLang || normalizedLang === 'null') {
        langScore = 1;
      }

      for (const img of rawImages) {
        if (!img.file_path) continue;
        if (isBackdrop && (img.width || 0) < 1280) continue;
        const score = isBackdrop ? ((img.width || 0) >= 1920 ? 2 : 1) : langScore;
        const existing = allImagesMap.get(img.file_path);
        if (!existing || existing.score < score) {
          allImagesMap.set(img.file_path, {
            file_path: img.file_path,
            width: img.width,
            height: img.height,
            vote_average: img.vote_average,
            score,
          });
        }
      }
    }

    return Array.from(allImagesMap.values()).sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return (b.vote_average || 0) - (a.vote_average || 0);
    });
  }, [
    collectionDetail,
    customImages,
    fullMetadata,
    imageType,
    isCollection,
    isPerson,
    metadataLanguage,
    normalizedMediaType,
    personDetail,
    selectedSource,
  ]);

  const selectedIndex = useMemo(() => {
    return images.findIndex((img) => {
      const path = img.file_path || img.backdrop_path || img.poster_path || img.logo_path;
      return pathsMatch(path, currentPath);
    });
  }, [images, currentPath]);

  const [prevImages, setPrevImages] = useState(images);
  const [prevInitialVisibleCount, setPrevInitialVisibleCount] = useState(initialVisibleCount);
  if (prevImages !== images || prevInitialVisibleCount !== initialVisibleCount) {
    setPrevImages(images);
    setPrevInitialVisibleCount(initialVisibleCount);
    setLoadMoreCount(0);
  }

  const baseVisibleCount = initialVisibleCount ?? Number.POSITIVE_INFINITY;
  const minimumVisibleCount =
    selectedIndex >= 0 ? Math.max(baseVisibleCount, selectedIndex + 1) : baseVisibleCount;

  const step = visibleStep ?? initialVisibleCount ?? 16;
  const visibleCount = Math.min(images.length, minimumVisibleCount + loadMoreCount * step);

  const displayedImages = useMemo(() => {
    return images.slice(0, visibleCount);
  }, [images, visibleCount]);

  const hasMore = displayedImages.length < images.length;

  const handleLoadMore = useCallback(() => {
    setLoadMoreCount((prev) => prev + 1);
  }, []);

  const loadMoreRef = useInfiniteScroll({
    onIntersect: handleLoadMore,
    enabled: hasMore,
    rootMargin: '240px 0px',
    threshold: 0.01,
  });

  const handleSelectImage = useCallback((path) => {
    if (onSelect) {
      onSelect(path);
    }
  }, [onSelect]);

  const allGridItems = useMemo(() => {
    if (imageType === 'logo') {
      return [{ isDefaultLogo: true }, ...displayedImages];
    }
    return displayedImages;
  }, [imageType, displayedImages]);

  const gridVariant = imageType === 'logo' ? 'logo' : imageType === 'backdrop' ? 'backdrop' : 'picker';
  const cardAspect = imageType === 'backdrop' ? 'landscape' : imageType === 'logo' ? 'logo' : 'poster';

  const resolveThumbUrl = useCallback((path) => {
    const isLocalOrProxy = path.startsWith('/media/') || path.startsWith('/api/');
    if (imageType === 'backdrop') {
      return isLocalOrProxy
        ? resolveDetailsImageUrl(path, API_BASE, 'backdrop')
        : path.startsWith('/')
          ? buildTmdbImageUrl(path, TMDB_IMAGE_SIZES.backdropThumb)
          : resolveDetailsImageUrl(path, API_BASE, 'backdropThumb');
    }
    if (imageType === 'poster') {
      return isLocalOrProxy
        ? resolveDetailsImageUrl(path, API_BASE, isPerson ? 'person' : 'poster')
        : path.startsWith('/')
          ? buildTmdbImageUrl(path, isPerson ? TMDB_IMAGE_SIZES.personThumb : TMDB_IMAGE_SIZES.posterThumb)
          : resolveDetailsImageUrl(path, API_BASE, isPerson ? 'person' : 'poster');
    }
    // Logo or generic
    return isLocalOrProxy
      ? resolveDetailsImageUrl(path, API_BASE, 'logo')
      : buildTmdbImageUrl(path, TMDB_IMAGE_SIZES.posterThumb);
  }, [imageType, isPerson]);

  return {
    isLoading,
    images,
    allGridItems,
    gridVariant,
    cardAspect,
    hasMore,
    loadMoreRef,
    handleSelectImage,
    resolveThumbUrl,
  };
}
