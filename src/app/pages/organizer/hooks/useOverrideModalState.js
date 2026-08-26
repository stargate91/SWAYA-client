import { useState, useMemo } from 'react';
import { useTranslation } from '@/providers/LanguageContext';
import { useUpdateMediaMutation, useOrganizerParentCandidatesQuery } from '@/queries';
import { isNsfwMode } from '@/stores/useLibraryModeStore';
import { isEpisodeMediaType } from '@/lib/mediaTypes';
import { useTranslatedOverrideOptions } from '../utils/overrideConstants';
import {
  isOrganizerItemScene,
  isOrganizerRowScene,
  isOrganizerParentCandidateAdult,
} from '@/lib/mappers';

export function useOverrideModalState({ row, onClose, toast, scanMode, sessionMode }) {
  const { t } = useTranslation();

  const isScenesMode = row.rawPayload?.scan_mode === 'scenes' || row.rawPayload?.parent_scan_mode === 'scenes';
  const {
    translatedLanguageOptions,
    translatedSubcategoriesByCategory,
    translatedSourceOptions,
    translatedEditionOptions,
    translatedAudioTypeOptions,
    translatedMainTypeOptions,
  } = useTranslatedOverrideOptions(t, isScenesMode);

  const isExtra = row.rawType === 'extra';
  const category = isExtra ? (row.rawPayload?.category || 'video') : 'video';

  // Get parent candidates (movies/episodes/scenes) from query hook
  const matchedQuery = useOrganizerParentCandidatesQuery({ scanMode, sessionMode, isManual: false });
  const manualQuery = useOrganizerParentCandidatesQuery({ scanMode, sessionMode, isManual: true });

  const candidatesList = useMemo(() => {
    const matchedItems = matchedQuery.data?.items || [];
    const manualItems = manualQuery.data?.items || [];
    return [...matchedItems, ...manualItems];
  }, [matchedQuery.data, manualQuery.data]);

  const isExtraAdult = isNsfwMode(sessionMode);
  const isExtraScene = isOrganizerRowScene(row);

  const filteredCandidates = useMemo(() => {
    return candidatesList.filter((item) => {
      if (item.id === row.itemId) return false;

      const isParentAdult = isOrganizerParentCandidateAdult(item);
      if (isExtraAdult !== isParentAdult) return false;

      if (isExtraAdult) {
        const isParentScene = isOrganizerItemScene(item);
        if (isExtraScene !== isParentScene) return false;
      }

      return true;
    });
  }, [candidatesList, row.itemId, isExtraAdult, isExtraScene]);

  const parentCandidates = useMemo(() => {
    return filteredCandidates.map((item) => ({
      value: item.id,
      label: item.filename || item.current_path || `ID: ${item.id}`,
    }));
  }, [filteredCandidates]);

  // Initial values setup
  const initialMainType = isExtra
    ? (category === 'video' ? 'bonus' : 'extra')
    : row.rawType;

  const initialSeason = useMemo(() => row.rawPayload?.season ?? '', [row.rawPayload]);
  const initialEpisode = useMemo(() => row.rawPayload?.episode ?? '', [row.rawPayload]);

  const [mainType, setMainType] = useState(initialMainType);

  const subcategoryList = translatedSubcategoriesByCategory[mainType === 'bonus' ? 'video' : category] || [];

  const [targetLanguage, setTargetLanguage] = useState(row.rawPayload?.target_language || 'en');
  const [source, setSource] = useState(row.rawPayload?.custom_source || 'none');
  const [edition, setEdition] = useState(row.rawPayload?.custom_edition || 'none');
  const [audioType, setAudioType] = useState(row.rawPayload?.custom_audio_type || 'none');
  const [seasonNum, setSeasonNum] = useState(initialSeason);
  const [episodeNum, setEpisodeNum] = useState(initialEpisode);
  const [subcategory, setSubcategory] = useState(row.rawPayload?.subtype || 'other');
  const [language, setLanguage] = useState((row.rawPayload?.language || 'en').toLowerCase());
  const [selectedParentId, setParentId] = useState(row.parent_id || '');
  const parentId = selectedParentId || (parentCandidates.length > 0 ? parentCandidates[0].value : '');

  const [matchAction, setMatchAction] = useState('keep');
  const updateMediaMutation = useUpdateMediaMutation();

  const isMatchedEpisode = isEpisodeMediaType(row.rawType) && row.rawStatus === 'matched';
  const isSeasonModified = String(seasonNum) !== String(initialSeason);
  const isEpisodeModified = String(episodeNum) !== String(initialEpisode);
  const showSelector = isMatchedEpisode && (isSeasonModified || isEpisodeModified);

  const activeMatch = useMemo(() =>
    row.rawPayload?.matches?.find((m) => m.is_active) || row.rawPayload?.matches?.[0],
    [row.rawPayload]
  );
  const hideLanguage = useMemo(() => {
    const isScenes = row.rawPayload?.scan_mode === 'scenes' || row.rawPayload?.parent_scan_mode === 'scenes';
    const hasAdultProviderMatch = activeMatch && ['theporndb', 'stashdb', 'fansdb'].includes(activeMatch.provider);
    return isScenes || hasAdultProviderMatch;
  }, [row.rawPayload, activeMatch]);

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (mainType === 'episode') {
      const isSeasonEmpty = !String(seasonNum ?? '').trim();
      const isEpisodeEmpty = !String(episodeNum ?? '').trim();
      if (isSeasonEmpty || isEpisodeEmpty) {
        toast(t('organizer.toasts.overrideSeasonEpisodeRequired'), 'danger');
        return;
      }
    }

    if ((mainType === 'bonus' || (isExtra && mainType !== 'movie' && mainType !== 'episode')) && String(parentId) === String(row.itemId)) {
      toast(t('organizer.toasts.selfParentError') || 'An item cannot be its own parent.', 'danger');
      return;
    }

    const payload = {
      id: row.itemId,
      type: isExtra ? 'extra' : 'media',
    };

    if (showSelector && matchAction === 'reset') {
      payload.reset_match = true;
    }

    if (!isExtra) {
      // Media updates
      payload.main_type = mainType;
      if (mainType === 'bonus') {
        payload.parent_id = parentId;
      } else {
        payload.custom_language = targetLanguage;
        payload.custom_audio_type = audioType;
        if (mainType === 'movie' || mainType === 'scene') {
          payload.custom_source = source;
          payload.custom_edition = edition;
        } else if (mainType === 'episode') {
          payload.season = seasonNum;
          payload.episode = episodeNum;
        }
      }
    } else {
      // Extra updates
      payload.main_type = mainType;
      if (mainType === 'movie' || mainType === 'episode' || mainType === 'scene') {
        payload.parent_id = parentId;
        if (mainType === 'episode') {
          payload.season = seasonNum;
          payload.episode = episodeNum;
        }
      } else {
        payload.parent_id = parentId;
        if (category !== 'metadata') {
          payload.subtype = subcategory;
        }
        if (category === 'subtitle' || category === 'audio') {
          payload.language = language;
        }
      }
    }

    try {
      await updateMediaMutation.mutateAsync({
        ...payload,
        scanMode,
        sessionMode,
      });
      toast(t('organizer.toasts.overrideSuccess'), 'success');
      onClose();
    } catch (err) {
      toast(err.message || t('organizer.toasts.overrideSaveFailed'), 'danger');
    }
  };

  const currentItemType = row.rawType || row.rawPayload?.parsed_info?.type;
  const filteredMainTypeOptions = useMemo(() => {
    if (isExtra) {
      const parentType = String(row.parentType || row.rawPayload?.parent_type || '').toLowerCase();
      if (parentType === 'movie') {
        return translatedMainTypeOptions.filter((opt) => opt.value === 'bonus' || opt.value === 'movie');
      }
      if (parentType === 'tv' || parentType === 'episode') {
        return translatedMainTypeOptions.filter((opt) => opt.value === 'bonus' || opt.value === 'episode');
      }
      if (parentType === 'scene') {
        const hasScene = translatedMainTypeOptions.some((opt) => opt.value === 'scene');
        if (hasScene) {
          return translatedMainTypeOptions.filter((opt) => opt.value === 'bonus' || opt.value === 'scene');
        }
        return [
          { value: 'scene', label: t('dynamic.organizerOptions.mainTypes.scene') || 'Scene' },
          { value: 'bonus', label: t('dynamic.organizerOptions.mainTypes.bonus') || 'Bonus Video' },
        ];
      }
      return translatedMainTypeOptions;
    }

    if (currentItemType === 'movie') {
      return translatedMainTypeOptions.filter((opt) => opt.value !== 'episode');
    }
    if (isEpisodeMediaType(currentItemType) || currentItemType === 'tv' || currentItemType === 'episode') {
      return translatedMainTypeOptions.filter((opt) => opt.value !== 'movie');
    }
    return translatedMainTypeOptions;
  }, [translatedMainTypeOptions, isExtra, row.parentType, row.rawPayload?.parent_type, currentItemType, t]);

  return {
    t,
    isExtra,
    category,
    initialMainType,
    mainType,
    setMainType,
    hideLanguage,
    subcategoryList,
    targetLanguage,
    setTargetLanguage,
    source,
    setSource,
    edition,
    setEdition,
    audioType,
    setAudioType,
    seasonNum,
    setSeasonNum,
    episodeNum,
    setEpisodeNum,
    subcategory,
    setSubcategory,
    language,
    setLanguage,
    parentCandidates,
    parentId,
    setParentId,
    matchAction,
    setMatchAction,
    showSelector,
    filteredMainTypeOptions,
    translatedLanguageOptions,
    translatedSourceOptions,
    translatedEditionOptions,
    translatedAudioTypeOptions,
    handleSubmit,
    isSaving: updateMediaMutation.isPending,
  };
}
