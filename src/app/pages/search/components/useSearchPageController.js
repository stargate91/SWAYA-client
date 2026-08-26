import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from '@/providers/LanguageContext';
import { useUi } from '@/providers/UiProvider';
import { useSettingsQuery } from '@/queries/settingsQueries';
import { fetchGlobalSearch } from '@/queries/metadataQueries';
import { useLibraryModeStore } from '@/stores/useLibraryModeStore';
import { useQueryParams } from '@/hooks/useQueryParams';
import { SOURCES, TYPES_BY_SOURCE } from '@/lib/searchConstants';
import { hasProviderCredential, getFirstEnabledProvider } from '@/lib/providerAvailability';
import { normalizeMediaEntity } from '@/lib/normalizeMediaEntity';
import { resolveSearchResultPath } from '@/lib/urlHelpers';

export { SOURCES, TYPES_BY_SOURCE };

export default function useSearchPageController() {
  const { t } = useTranslation();
  const { toast } = useUi();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: settings } = useSettingsQuery();
  const { sessionMode } = useLibraryModeStore();
  const { getString, setParams } = useQueryParams();

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

  // Read URL query params
  const urlQuery = getString('q', '');
  const defaultSource = useMemo(() => getFirstEnabledProvider(filteredSources, 'tmdb') || 'tmdb', [filteredSources]);
  const urlSource = getString('source', defaultSource);
  const rawUrlType = getString('type', urlSource === 'tmdb' ? 'all' : (TYPES_BY_SOURCE[urlSource]?.[0]?.id || 'scene'));
  const availableTypesForSource = TYPES_BY_SOURCE[urlSource] || [];
  const normalizedRawType = rawUrlType === 'performer' ? 'person' : rawUrlType;
  const isTypeValidForSource = availableTypesForSource.some(t => t.id === normalizedRawType);
  const urlType = isTypeValidForSource ? normalizedRawType : (availableTypesForSource[0]?.id || 'all');

  // Fallback: If adult content disabled or provider has no API key, fallback to first available provider
  useEffect(() => {
    if (!settings) return;
    const currentSourceObj = filteredSources.find((s) => s.id === urlSource);
    if (hasAnyProvider && (!currentSourceObj || currentSourceObj.disabled)) {
      const fallbackSource = getFirstEnabledProvider(filteredSources, 'tmdb') || filteredSources[0]?.id || 'tmdb';
      const nextTypes = TYPES_BY_SOURCE[fallbackSource] || [];
      setParams({ source: fallbackSource, type: nextTypes[0]?.id || 'all' }, { replace: true });
    }
  }, [filteredSources, hasAnyProvider, urlSource, settings, setParams]);

  const [prevUrlQuery, setPrevUrlQuery] = useState(urlQuery);
  const [localQuery, setLocalQuery] = useState(urlQuery);
  if (urlQuery !== prevUrlQuery) {
    setPrevUrlQuery(urlQuery);
    setLocalQuery(urlQuery);
  }

  // Search Results state
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [loadedPage, setLoadedPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);

  // Reset pagination when search params change
  const currentSearchKey = `${urlQuery}:${urlSource}:${urlType}`;
  const [prevSearchKey, setPrevSearchKey] = useState(currentSearchKey);

  if (currentSearchKey !== prevSearchKey) {
    setPrevSearchKey(currentSearchKey);
    setLoadedPage(1);
    setHasMorePages(true);
    setResults([]);
  }

  // Execute search when URL params change or loadedPage increases
  const performSearch = useCallback(async (pageToLoad = 1) => {
    if (!urlQuery.trim() || !hasProviderCredential(settings, urlSource)) {
      setResults([]);
      setIsLoading(false);
      setIsMoreLoading(false);
      return;
    }

    if (pageToLoad === 1) {
      setIsLoading(true);
    } else {
      setIsMoreLoading(true);
    }

    try {
      const data = await fetchGlobalSearch(queryClient, {
        query: urlQuery,
        source: urlSource,
        type: urlType,
        includeAdult: hasAdult,
        page: pageToLoad,
      });
      if (pageToLoad === 1) {
        setResults(data || []);
      } else {
        setResults((prev) => [...prev, ...(data || [])]);
      }
      if (!data || data.length < 20) {
        setHasMorePages(false);
      }
    } catch (err) {
      console.error('Search error:', err);
      toast(err?.message || t('common.error') || 'Search failed', 'danger');
      if (pageToLoad === 1) {
        setResults([]);
      }
      setHasMorePages(false);
    } finally {
      setIsLoading(false);
      setIsMoreLoading(false);
    }
  }, [urlQuery, urlSource, urlType, hasAdult, settings, queryClient, t, toast]);

  useEffect(() => {
    queueMicrotask(() => {
      performSearch(loadedPage);
    });
  }, [performSearch, loadedPage]);

  const normalizedResults = useMemo(() => {
    return results
      .map((item) => {
        const entity = normalizeMediaEntity(item, {
          context: 'search',
          settings,
          sessionMode,
          provider: urlSource,
          isAdultContext: urlSource !== 'tmdb' || item.is_adult || item.media_type === 'scene',
        });
        if (!entity) return null;
        return {
          raw: item,
          entity,
        };
      })
      .filter(Boolean);
  }, [results, settings, sessionMode, urlSource]);

  const handleCardClick = (item) => {
    const targetPath = resolveSearchResultPath(item, urlSource);
    if (targetPath) {
      navigate(targetPath, { state: { allowAdult: true } });
    }
  };

  // Handle changing source (applies type fallback logic)
  const handleSourceChange = (newSource) => {
    const srcObj = filteredSources.find((s) => s.id === newSource);
    if (srcObj?.disabled) return;
    const availableTypes = TYPES_BY_SOURCE[newSource] || [];
    const hasSameType = availableTypes.some(t => t.id === urlType);
    const nextType = hasSameType ? urlType : (availableTypes[0]?.id || 'all');
    
    setParams({
      q: urlQuery,
      source: newSource,
      type: nextType,
    });
  };

  const handleTypeChange = (newType) => {
    setParams({
      q: urlQuery,
      source: urlSource,
      type: newType,
    });
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    const cleanLocalQuery = localQuery.trim();
    if (!cleanLocalQuery) return;

    if (cleanLocalQuery === urlQuery) {
      performSearch(1);
    } else {
      setParams({
        q: cleanLocalQuery,
        source: urlSource,
        type: urlType,
      });
    }
  };

  const sourceOptions = useMemo(() => {
    return filteredSources.map(s => ({
      value: s.id,
      label: s.labelKey ? t(s.labelKey, { defaultValue: s.name }) : s.name,
      disabled: s.disabled,
    }));
  }, [filteredSources, t]);

  const typeOptions = useMemo(() => {
    const types = TYPES_BY_SOURCE[urlSource] || [];
    return types.map(tOpt => ({
      value: tOpt.id,
      label: tOpt.labelKey ? t(tOpt.labelKey, { defaultValue: tOpt.name }) : tOpt.name,
    }));
  }, [urlSource, t]);

  return {
    t,
    localQuery,
    setLocalQuery,
    urlQuery,
    urlSource,
    urlType,
    isLoading,
    isMoreLoading,
    setLoadedPage,
    hasMorePages,
    filteredResults: normalizedResults,
    normalizedResults,
    sourceOptions,
    typeOptions,
    handleSourceChange,
    handleTypeChange,
    handleSearchSubmit,
    handleCardClick,
    sessionMode,
    hasAnyProvider,
  };
}
