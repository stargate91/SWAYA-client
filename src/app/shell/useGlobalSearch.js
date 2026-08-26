import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettingsQuery } from '@/queries/settingsQueries';
import { useGlobalSearchQuery } from '@/queries/metadataQueries';
import { resolveMediaImageUrl, buildImageProxyUrl } from '@/lib/imageUrls';
import { isAdultEntityId } from '@/lib/entityIds';
import { useDebounce } from '@/hooks/useDebounce';
import { useLibraryModeStore, isSfwMode } from '@/stores/useLibraryModeStore';
import { resolveSearchResultPath } from '@/lib/urlHelpers';
import { SOURCES, TYPES_BY_SOURCE } from '@/lib/searchConstants';
import { hasProviderCredential, getFirstEnabledProvider } from '@/lib/providerAvailability';
import { ROUTES } from '@/lib/routes';
import { Clapperboard } from '@/ui/icons';

export function useGlobalSearch({ t }) {
  const navigate = useNavigate();

  // Search query input state
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  const { data: settings = {} } = useSettingsQuery();
  const { sessionMode } = useLibraryModeStore();

  const hasAdult = settings?.include_adult;
  const filteredSources = useMemo(() => {
    return SOURCES
      .filter((s) => !s.adult || hasAdult)
      .map((s) => ({
        ...s,
        disabled: !hasProviderCredential(settings, s.id),
      }));
  }, [hasAdult, settings]);

  const hasAnyProvider = useMemo(() => {
    return filteredSources.some((s) => !s.disabled);
  }, [filteredSources]);

  // Selection state
  const [selectedSource, setSelectedSource] = useState(() => getFirstEnabledProvider(filteredSources, 'tmdb') || 'tmdb');
  const [userSelectedType, setUserSelectedType] = useState('all');

  const activeObj = filteredSources.find((s) => s.id === selectedSource);
  const effectiveSource = activeObj && !activeObj.disabled
    ? selectedSource
    : (getFirstEnabledProvider(filteredSources, 'tmdb') || selectedSource);

  const availableTypes = useMemo(() => TYPES_BY_SOURCE[effectiveSource] || [], [effectiveSource]);
  const selectedType = availableTypes.some((item) => item.id === userSelectedType)
    ? userSelectedType
    : (availableTypes[0]?.id || 'all');
  const setSelectedType = setUserSelectedType;

  // UI visibility states
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const hasValidSource = hasAnyProvider && filteredSources.some((s) => s.id === effectiveSource && !s.disabled);

  const { data: searchResults = [] } = useGlobalSearchQuery(
    {
      query: debouncedQuery,
      source: effectiveSource,
      type: selectedType,
      includeAdult: hasAdult,
    },
    {
      enabled: Boolean(hasValidSource && debouncedQuery && debouncedQuery.trim().length >= 2),
    }
  );

  const filteredResults = useMemo(() => {
    return Array.isArray(searchResults) ? searchResults : [];
  }, [searchResults]);

  const groupedSections = useMemo(() => {
    if (selectedType !== 'all') {
      return null;
    }
    const groups = {
      movie: [],
      tv: [],
      person: [],
      collection: [],
      studio: [],
      scene: [],
      other: [],
    };
    filteredResults.forEach((item) => {
      const type = item.media_type;
      if (groups[type]) {
        groups[type].push(item);
      } else {
        groups.other.push(item);
      }
    });

    const groupTitles = {
      movie: t('library.tabs.movies') || 'Movies',
      tv: t('library.tabs.tv') || 'TV Shows',
      person: effectiveSource === 'tmdb' ? (t('library.tabs.people') || 'Artists') : (t('library.tabs.adultPeople') || 'Stars'),
      collection: t('library.tabs.collections') || 'Collections',
      studio: t('library.tabs.studios') || 'Studios & Networks',
      scene: t('library.tabs.scenes') || 'Scenes',
      other: t('common.other') || 'Other',
    };

    const typeIcons = (TYPES_BY_SOURCE[effectiveSource] || []).reduce((acc, tOpt) => {
      acc[tOpt.id] = tOpt.icon;
      return acc;
    }, {});

    return Object.entries(groups)
      .filter(([, items]) => items.length > 0)
      .map(([type, items]) => ({
        type,
        title: groupTitles[type] || type,
        icon: typeIcons[type] || Clapperboard,
        items,
      }));
  }, [filteredResults, selectedType, effectiveSource, t]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOverlayOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isAdultItem = useCallback((item) => {
    const prov = (item.provider || item.source || effectiveSource || '').toLowerCase();
    const isAdultProv = prov === 'theporndb' || prov === 'stashdb' || prov === 'fansdb';
    return Boolean(
      isAdultProv ||
      effectiveSource !== 'tmdb' ||
      item.is_adult ||
      item.adult ||
      item.media_type === 'scene' ||
      isAdultEntityId(item.id)
    );
  }, [effectiveSource]);

  const shouldBlur = useCallback((item) => {
    return isSfwMode(sessionMode) && isAdultItem(item);
  }, [sessionMode, isAdultItem]);

  const resolveCardImageUrl = useCallback((item) => {
    const imagePath = item.poster_path || item.profile_path || item.logo_path || item.still_path || item.image || item.backdrop_path;
    if (!imagePath) return null;
    const rawUrl = resolveMediaImageUrl(imagePath, 'posterThumb');
    return shouldBlur(item) && rawUrl ? buildImageProxyUrl(rawUrl, { blur: true }) : rawUrl;
  }, [shouldBlur]);

  // Open overlay when query has results
  useEffect(() => {
    if (debouncedQuery.trim().length >= 2 && filteredResults.length > 0) {
      queueMicrotask(() => {
        setIsOverlayOpen(true);
      });
    }
  }, [debouncedQuery, filteredResults.length]);

  const handleInputChange = useCallback((e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim().length < 2) {
      setIsOverlayOpen(false);
    }
  }, []);

  const handleSourceSelect = useCallback((sourceId) => {
    const src = filteredSources.find((s) => s.id === sourceId);
    if (src?.disabled) return;
    setSelectedSource(sourceId);
    const sourceTypes = TYPES_BY_SOURCE[sourceId] || [];
    const hasSameType = sourceTypes.some((tOpt) => tOpt.id === selectedType);
    if (!hasSameType && sourceTypes.length > 0) {
      setSelectedType(sourceTypes[0].id);
    }
  }, [filteredSources, selectedType, setSelectedType]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      setIsOverlayOpen(false);
      const targetUrl = query.trim()
        ? `/search?q=${encodeURIComponent(query.trim())}&source=${selectedSource}&type=${selectedType}`
        : `/search?source=${selectedSource}&type=${selectedType}`;
      navigate(targetUrl);
      setQuery('');
    } else if (e.key === 'Escape') {
      setIsOverlayOpen(false);
    }
  }, [navigate, query, selectedSource, selectedType]);

  const handleResultClick = useCallback((item) => {
    setIsOverlayOpen(false);
    const path = resolveSearchResultPath(item, selectedSource);
    if (path) {
      navigate(path);
      setQuery('');
    }
  }, [navigate, selectedSource]);

  const handleAdvancedSearchClick = useCallback(() => {
    setIsOverlayOpen(false);
    const targetUrl = query.trim()
      ? `/search?q=${encodeURIComponent(query.trim())}&source=${selectedSource}&type=${selectedType}`
      : `/search?source=${selectedSource}&type=${selectedType}`;
    navigate(targetUrl);
    setQuery('');
  }, [navigate, query, selectedSource, selectedType]);

  const handleSeeAllClick = useCallback(() => {
    setIsOverlayOpen(false);
    navigate(ROUTES.SEARCH(query, selectedSource, selectedType));
    setQuery('');
  }, [navigate, query, selectedSource, selectedType]);

  const handleFocus = useCallback(() => {
    if (query.trim().length >= 2) {
      setIsOverlayOpen(true);
    }
  }, [query]);

  // Get active icons/labels
  const activeSourceObj = useMemo(() => SOURCES.find((s) => s.id === selectedSource) || SOURCES[0], [selectedSource]);
  const activeTypeObj = useMemo(() => (TYPES_BY_SOURCE[selectedSource] || []).find((tOpt) => tOpt.id === selectedType) || { name: 'All', icon: Clapperboard }, [selectedSource, selectedType]);
  const ActiveTypeIcon = activeTypeObj.icon;

  const placeholder = useMemo(() => {
    if (!hasAnyProvider) {
      return t('search.noProvidersConfigured') || 'Configure API keys in Settings to search...';
    }
    const typeLabel = (t(`dynamic.searchTypes.${activeTypeObj.id}`) || activeTypeObj.name).toLowerCase();
    if (selectedSource === 'tmdb') {
      return t('search.placeholderTmdb', { type: typeLabel }) || `Search ${typeLabel}...`;
    }
    return t('search.placeholderPattern', { type: typeLabel, source: activeSourceObj.name }) || `Search ${typeLabel} on ${activeSourceObj.name}...`;
  }, [hasAnyProvider, t, activeTypeObj, selectedSource, activeSourceObj.name]);

  const translatedSources = useMemo(() => {
    return filteredSources.map((s) => ({
      ...s,
      name: s.labelKey ? t(s.labelKey, { defaultValue: s.name }) : s.name,
      disabled: s.disabled,
    }));
  }, [filteredSources, t]);

  const translatedTypeOptions = useMemo(() => {
    return (TYPES_BY_SOURCE[effectiveSource] || []).map((tOpt) => ({
      value: tOpt.id,
      label: tOpt.labelKey ? t(tOpt.labelKey, { defaultValue: tOpt.name }) : tOpt.name,
      icon: tOpt.icon,
    }));
  }, [effectiveSource, t]);

  return {
    query,
    debouncedQuery,
    selectedSource: effectiveSource,
    selectedType,
    setSelectedType,
    isOverlayOpen,
    setIsOverlayOpen,
    containerRef,
    inputRef,
    filteredResults,
    groupedSections,
    activeSourceObj,
    activeTypeObj,
    ActiveTypeIcon,
    placeholder,
    hasAnyProvider,
    translatedSources,
    translatedTypeOptions,
    handleInputChange,
    handleSourceSelect,
    handleKeyDown,
    handleResultClick,
    handleAdvancedSearchClick,
    handleSeeAllClick,
    handleFocus,
    resolveCardImageUrl,
  };
}
