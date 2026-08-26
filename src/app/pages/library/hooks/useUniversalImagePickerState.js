import { useState, useMemo } from 'react';
import useImagePicker from './useImagePicker';

export function useUniversalImagePickerState({
  entityId,
  tmdbId,
  imageType = 'backdrop',
  entityType = 'movie',
  currentPath,
  t,
  toast,
  onClose,
  closeOnSelect = true,
  externalIds,
  item,
}) {
  // Compute available provider sources (for person entities)
  const sources = useMemo(() => {
    const list = [];
    if (entityType === 'person') {
      const hasStash = !!externalIds?.stashdb || !!item?.stashdb || !!item?.external_ids?.stashdb || item?.external_links?.some(l => l.provider === 'stashdb');
      const hasFans = !!externalIds?.fansdb || !!item?.fansdb || !!item?.external_ids?.fansdb || item?.external_links?.some(l => l.provider === 'fansdb');
      const hasThePornDb = !!externalIds?.theporndb || !!item?.theporndb || !!item?.external_ids?.theporndb || item?.external_links?.some(l => l.provider === 'theporndb');
      const hasTMDb = !!externalIds?.tmdb || !!item?.tmdb || !!item?.external_ids?.tmdb || item?.external_links?.some(l => l.provider === 'tmdb') || (!hasStash && !hasFans && !hasThePornDb);

      if (hasTMDb) list.push({ value: 'tmdb', label: 'TMDb' });
      if (hasStash) list.push({ value: 'stashdb', label: 'StashDB' });
      if (hasFans) list.push({ value: 'fansdb', label: 'FansDB' });
      if (hasThePornDb) list.push({ value: 'theporndb', label: 'ThePornDB' });
    }
    return list;
  }, [entityType, externalIds, item]);

  const [selectedPath, setSelectedPath] = useState(currentPath);

  const [imageSource, setImageSource] = useState(() => {
    return sources.length > 0 ? sources[0].value : 'tmdb';
  });

  const { isPending, handleSaveUrl, handleUploadFile } = useImagePicker({
    entityId,
    entityType,
    imageType,
    toast,
    t,
    onClose,
    closeOnSelect,
    onBeforeSave: (path) => setSelectedPath(path),
  });

  const isPersonBackdrop = entityType === 'person' && imageType === 'backdrop';
  const isScene = entityType === 'scene' || item?.type === 'scene' || (typeof entityId === 'string' && entityId.startsWith('stashdb_'));
  const imageLookupId = entityType === 'tv' && tmdbId ? tmdbId : entityId;

  // Scene logo options deduplicated
  const logoOptions = useMemo(() => {
    if (!isScene || imageType !== 'logo') return [];
    const opts = [];
    const seenLogos = new Set();

    if (item?.original_logo_path) {
      opts.push({
        path: item.original_logo_path,
        label: t?.('library.details.originalSceneLogo') || 'Original Scene Logo',
        alt: 'Original Logo',
      });
      seenLogos.add(item.original_logo_path);
    }

    if (item?.companies?.[0]?.logo_path && !seenLogos.has(item.companies[0].logo_path)) {
      opts.push({
        path: item.companies[0].logo_path,
        label: item.companies[0].name || 'Studio Logo',
        alt: item.companies[0].name || 'Studio',
      });
      seenLogos.add(item.companies[0].logo_path);
    }

    if (item?.networks?.[0]?.logo_path && !seenLogos.has(item.networks[0].logo_path)) {
      opts.push({
        path: item.networks[0].logo_path,
        label: item.networks[0].name || 'Network Logo',
        alt: item.networks[0].name || 'Network',
      });
      seenLogos.add(item.networks[0].logo_path);
    }

    return opts;
  }, [isScene, imageType, item, t]);

  // Scene poster/backdrop options
  const sceneImageOptions = useMemo(() => {
    if (!isScene || (imageType !== 'poster' && imageType !== 'backdrop')) return [];
    const opts = [];
    if (item?.original_backdrop_path) {
      opts.push({
        path: item.original_backdrop_path,
        label: t?.('library.details.originalSceneStill') || 'Original Scene Still',
        alt: 'Original Still',
      });
    }
    return opts;
  }, [isScene, imageType, item, t]);

  const handleSelectTmdbImage = handleSaveUrl;
  const handleSelectDefaultText = () => handleSaveUrl('none');

  return {
    sources,
    selectedPath,
    imageSource,
    setImageSource,
    isPending,
    isPersonBackdrop,
    isScene,
    imageLookupId,
    logoOptions,
    sceneImageOptions,
    handleSelectTmdbImage,
    handleSelectDefaultText,
    handleUploadFile,
  };
}

export default useUniversalImagePickerState;
