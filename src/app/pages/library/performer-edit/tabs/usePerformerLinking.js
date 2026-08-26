import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useSettingsQuery } from '@/queries';
import { useTranslation } from '@/providers/LanguageContext';
import { useUi } from '@/providers/UiProvider';
import {
  useLinkPersonSourceMutation,
  useUnlinkPersonSourceMutation,
  useSetPrimaryPersonSourceMutation,
  useDeletePersonMutation,
} from '@/queries';
import { usePersonDetailQuery, fetchPeopleTmdbSearch } from '@/queries/metadataQueries';
import { resolveMediaImageUrl } from '@/lib/imageUrls';
import { hasProviderCredential } from '@/lib/providerAvailability';
import { ROUTES } from '@/lib/routes';
import { AlertTriangle } from '@/ui/icons';

export const SOURCE_BUCKETS = [
  { key: 'tmdb', label: 'TMDb', dbName: 'tmdb' },
  { key: 'stashdb', label: 'StashDB', dbName: 'stashdb' },
  { key: 'fansdb', label: 'FansDB', dbName: 'fansdb' },
  { key: 'theporndb', label: 'ThePornDB', dbName: 'theporndb' },
];

export function usePerformerLinking({ personId, defaultQuery = '', person: initialPerson }) {
  const queryClient = useQueryClient();
  const { data: fetchedPerson } = usePersonDetailQuery(personId);
  const person = fetchedPerson || initialPerson;
  const { data: settings } = useSettingsQuery();
  const { t } = useTranslation();
  const { toast, confirmDialog } = useUi();
  const navigate = useNavigate();

  const sourceBuckets = useMemo(() => {
    return SOURCE_BUCKETS.map((bucket) => ({
      ...bucket,
      isConfigured: hasProviderCredential(settings, bucket.key),
    }));
  }, [settings]);

  const [activeSearchSource, setActiveSearchSource] = useState(null);
  const [query, setQuery] = useState(defaultQuery);
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const [linkingSource, setLinkingSource] = useState(null);
  const [oldProfileUrl, setOldProfileUrl] = useState(null);
  const [isWaitingForImage, setIsWaitingForImage] = useState(false);
  const showSuccessToastPendingRef = useRef(false);
  const safetyTimeoutRef = useRef(null);

  // Mutations
  const linkMutation = useLinkPersonSourceMutation();
  const unlinkMutation = useUnlinkPersonSourceMutation();
  const setPrimaryMutation = useSetPrimaryPersonSourceMutation();
  const deleteMutation = useDeletePersonMutation();

  const currentProfileUrl = person?.profile_path ? resolveMediaImageUrl(person.profile_path, 'personThumb') : null;

  const filteredResults = useMemo(() => {
    if (!person?.is_adult || !settings?.adult_gender_preference || settings.adult_gender_preference === 'all') {
      return results;
    }
    return results.filter((item) => {
      if (item.gender == null) return true;
      if (settings.adult_gender_preference === 'female') return item.gender === 1;
      if (settings.adult_gender_preference === 'male') return item.gender === 2;
      return true;
    });
  }, [results, settings, person?.is_adult]);

  const getLinkedInfo = useCallback((bucket) => {
    if (!person) return null;
    if (person.external_links && person.external_links.length > 0) {
      const link = person.external_links.find(
        (l) => l.provider === bucket.dbName || l.provider === bucket.key
      );
      if (link) return link;
    }
    const extIds = person.external_ids || {};
    const idValue = extIds[bucket.key] || extIds[bucket.dbName] || extIds[`${bucket.key}_id`] || extIds[`${bucket.dbName}_id`];
    if (idValue) {
      return {
        provider: bucket.dbName,
        external_id: idValue,
        profile_url: null,
      };
    }
    return null;
  }, [person]);

  const handleSearch = useCallback(async (e) => {
    if (e) e.preventDefault();
    if (!query.trim() || !activeSearchSource) return;

    setIsSearching(true);
    setError('');
    try {
      const res = await fetchPeopleTmdbSearch(queryClient, {
        query: query.trim(),
        adultOnly: true,
        source: activeSearchSource,
      });
      setResults(res || []);
      setHasSearched(true);
    } catch (err) {
      setError(err.message || 'Search failed');
    } finally {
      setIsSearching(false);
    }
  }, [query, activeSearchSource, queryClient]);

  useEffect(() => {
    if (defaultQuery && activeSearchSource) {
      const performSearch = async () => {
        setIsSearching(true);
        setError('');
        try {
          const res = await fetchPeopleTmdbSearch(queryClient, {
            query: defaultQuery.trim(),
            adultOnly: true,
            source: activeSearchSource,
          });
          setResults(res || []);
          setHasSearched(true);
        } catch (err) {
          setError(err.message || 'Search failed');
        } finally {
          setIsSearching(false);
        }
      };
      performSearch();
    }
  }, [defaultQuery, activeSearchSource, queryClient]);

  useEffect(() => {
    if (!isWaitingForImage || !linkingSource) return;

    const bucket = SOURCE_BUCKETS.find((b) => b.key === linkingSource);
    const linkedInfo = bucket ? getLinkedInfo(bucket) : null;

    if (linkedInfo) {
      const handleFinish = () => {
        setLinkingSource(null);
        setIsWaitingForImage(false);
        if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
        if (showSuccessToastPendingRef.current) {
          toast(t('library.details.sourceLinked') || 'Source linked successfully!', 'success');
          showSuccessToastPendingRef.current = false;
        }
      };

      const targetImgUrl = linkedInfo.profile_url
        ? resolveMediaImageUrl(linkedInfo.profile_url, 'personThumb')
        : (person?.profile_path ? resolveMediaImageUrl(person.profile_path, 'personThumb') : null);

      if (targetImgUrl) {
        const img = new Image();
        img.onload = handleFinish;
        img.onerror = handleFinish;
        img.src = targetImgUrl;
      } else {
        handleFinish();
      }
    }
  }, [person, currentProfileUrl, oldProfileUrl, isWaitingForImage, linkingSource, t, toast, getLinkedInfo]);

  useEffect(() => {
    return () => {
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
    };
  }, []);

  const handleSetPrimary = useCallback(async (sourceKey) => {
    try {
      await setPrimaryMutation.mutateAsync({
        personId,
        source: sourceKey,
      });
      toast(t('library.details.primarySourceSet') || 'Primary source updated successfully!', 'success');
    } catch (err) {
      toast(err.message || t('library.details.primarySourceSetFailed') || 'Failed to set primary source', 'danger');
    }
  }, [personId, setPrimaryMutation, t, toast]);

  const handleLink = useCallback(async (item) => {
    let cleanId = item.id;
    if (typeof cleanId === 'string' && cleanId.includes(':')) {
      cleanId = cleanId.split(':')[1] || cleanId;
    }
    const sourceKey = activeSearchSource;
    setLinkingSource(sourceKey);
    setOldProfileUrl(currentProfileUrl);
    setIsWaitingForImage(true);

    setActiveSearchSource(null);
    setResults([]);
    setHasSearched(false);

    try {
      await linkMutation.mutateAsync({
        personId,
        source: sourceKey,
        externalId: String(cleanId),
        overrides: {},
        profileUrl: item.profile_path || item.poster_path || null,
      });
      showSuccessToastPendingRef.current = true;

      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = setTimeout(() => {
        setLinkingSource(null);
        setIsWaitingForImage(false);
        if (showSuccessToastPendingRef.current) {
          toast(t('library.details.sourceLinked') || 'Source linked successfully!', 'success');
          showSuccessToastPendingRef.current = false;
        }
      }, 8000);
    } catch (err) {
      toast(err.message || t('library.performerEdit.linking.link_source_failed') || 'Failed to link source', 'danger');
      setLinkingSource(null);
      setIsWaitingForImage(false);
      showSuccessToastPendingRef.current = false;
    }
  }, [activeSearchSource, currentProfileUrl, linkMutation, personId, t, toast]);

  const handleUnlink = useCallback((sourceKey, action) => {
    const linkedSourcesCount = SOURCE_BUCKETS.filter((bucket) => !!getLinkedInfo(bucket)).length;
    if (action === 'remove' && linkedSourcesCount === 1) {
      confirmDialog({
        title: t('library.details.deletePerformerTitle') || 'Delete Performer?',
        variant: 'danger',
        icon: AlertTriangle,
        cancelText: t('common.cancel') || 'Cancel',
        confirmText: t('library.details.deletePerformerConfirmBtn') || 'Delete Performer',
        description: t('library.details.deletePerformerWarning') || 'Are you sure you want to permanently delete this performer? All manually entered attributes, custom biographies, overrides, and ratings will be lost.',
        onConfirm: async () => {
          try {
            await deleteMutation.mutateAsync(personId);
            toast(t('library.performerEdit.linking.performer_deleted') || 'Performer removed from database successfully.', 'success');
            navigate(ROUTES.LIBRARY, { replace: true });
          } catch (err) {
            toast(err.message || t('library.performerEdit.linking.delete_performer_failed') || 'Failed to delete performer', 'danger');
          }
        },
      });
      return;
    }

    unlinkMutation.mutate(
      { personId, source: sourceKey, action },
      {
        onSuccess: () => {
          toast(
            t('library.details.unlinkSuccess', { source: sourceKey }) || `Successfully unlinked from ${sourceKey}.`,
            'success'
          );
        },
        onError: (err) => {
          toast(
            err.message || t('library.details.unlinkSourceFailed') || 'Failed to unlink source',
            'danger'
          );
        },
      }
    );
  }, [confirmDialog, deleteMutation, getLinkedInfo, navigate, personId, t, toast, unlinkMutation]);

  const resetSearch = useCallback(() => {
    setActiveSearchSource(null);
    setResults([]);
    setHasSearched(false);
  }, []);

  const handleOpenSearch = useCallback((bucketKey) => {
    if (!hasProviderCredential(settings, bucketKey)) {
      toast(t('library.performerEdit.apiKeyRequired') || 'API key required in Settings', 'warning');
      return;
    }
    setActiveSearchSource(bucketKey);
    setQuery(person?.name || '');
  }, [settings, person?.name, t, toast]);

  return {
    t,
    person,
    sourceBuckets,
    activeSearchSource,
    query,
    setQuery,
    filteredResults,
    isSearching,
    error,
    hasSearched,
    linkingSource,
    linkMutation,
    unlinkMutation,
    setPrimaryMutation,
    getLinkedInfo,
    handleSearch,
    handleLink,
    handleUnlink,
    handleSetPrimary,
    resetSearch,
    handleOpenSearch,
  };
}
