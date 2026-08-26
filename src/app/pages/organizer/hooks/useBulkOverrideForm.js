import { useState, useMemo } from 'react';
import { useTranslation } from '@/providers/LanguageContext';
import { useOrganizerParentCandidatesQuery } from '@/queries';
import { isNsfwMode } from '@/stores/useLibraryModeStore';
import { isEpisodeMediaType } from '@/lib/mediaTypes';
import { useTranslatedOverrideOptions } from '../utils/overrideConstants';
import {
  isOrganizerItemScene,
  isOrganizerRowScene,
  isOrganizerParentCandidateAdult,
} from '@/lib/mappers';

/**
 * Custom hook to manage the form state, candidate queries, field options,
 * and visibility rules for bulk overriding media/extra items.
 *
 * @param {object} params
 * @param {Array<object>} [params.rows] - The selected rows in the organizer table
 * @param {string} [params.scanMode] - The current scan mode ('movies', 'tv', 'scenes')
 * @param {string} [params.sessionMode] - The session mode ('sfw', 'nsfw')
 * @param {Function} [params.t] - Optional translation function
 */
export function useBulkOverrideForm({ rows = [], scanMode, sessionMode, t: propT } = {}) {
  const { t: ctxT } = useTranslation();
  const t = propT || ctxT;

  const isExtra = rows[0]?.rawType === 'extra';
  const category = isExtra ? (rows[0]?.rawPayload?.category || 'video') : 'video';
  const initialMainType = isExtra
    ? (category === 'video' ? 'bonus' : 'extra')
    : rows[0]?.rawType;

  const [mainType, setMainType] = useState(initialMainType);
  const [applyMainType, setApplyMainType] = useState(false);

  const isScenesMode = useMemo(() =>
    rows.some((r) => r.rawPayload?.scan_mode === 'scenes' || r.rawPayload?.parent_scan_mode === 'scenes'),
    [rows]
  );

  const {
    translatedLanguageOptions,
    translatedSubcategoriesByCategory,
    translatedSourceOptions,
    translatedEditionOptions,
    translatedAudioTypeOptions,
    translatedMainTypeOptions,
  } = useTranslatedOverrideOptions(t, isScenesMode);

  const hideLanguage = useMemo(() => {
    const hasAdultMatch = rows.some((r) => {
      const activeMatch = r.rawPayload?.matches?.find((m) => m.is_active) || r.rawPayload?.matches?.[0];
      return activeMatch && ['theporndb', 'stashdb', 'fansdb'].includes(activeMatch.provider);
    });
    return isScenesMode || hasAdultMatch;
  }, [rows, isScenesMode]);

  const subcategoryList = translatedSubcategoriesByCategory[mainType === 'bonus' ? 'video' : category] || [];

  // Parent candidates query
  const matchedQuery = useOrganizerParentCandidatesQuery({ scanMode, sessionMode, isManual: false });
  const manualQuery = useOrganizerParentCandidatesQuery({ scanMode, sessionMode, isManual: true });

  const candidatesList = useMemo(() => {
    const matchedItems = matchedQuery.data?.items || [];
    const manualItems = manualQuery.data?.items || [];
    return [...matchedItems, ...manualItems];
  }, [matchedQuery.data, manualQuery.data]);

  const firstRow = rows[0] || {};
  const isExtraAdult = isNsfwMode(sessionMode);
  const isExtraScene = isOrganizerRowScene(firstRow);

  const filteredCandidates = useMemo(() => {
    return candidatesList.filter((item) => {
      if (rows.some((r) => r.itemId === item.id)) return false;

      const isParentAdult = isOrganizerParentCandidateAdult(item);
      if (isExtraAdult !== isParentAdult) return false;

      if (isExtraAdult) {
        const isParentScene = isOrganizerItemScene(item);
        if (isExtraScene !== isParentScene) return false;
      }

      return true;
    });
  }, [candidatesList, rows, isExtraAdult, isExtraScene]);

  const parentCandidates = useMemo(() => {
    return filteredCandidates.map((item) => ({
      value: item.id,
      label: item.filename || item.current_path || `ID: ${item.id}`,
    }));
  }, [filteredCandidates]);

  // Form field states
  const [applyTargetLanguage, setApplyTargetLanguage] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState('en');

  const [applySource, setApplySource] = useState(false);
  const [source, setSource] = useState('none');

  const [applyEdition, setApplyEdition] = useState(false);
  const [edition, setEdition] = useState('none');

  const [applyAudioType, setApplyAudioType] = useState(false);
  const [audioType, setAudioType] = useState('none');

  const [applySeasonNum, setApplySeasonNum] = useState(false);
  const [seasonNum, setSeasonNum] = useState('');

  const [applyParentId, setApplyParentId] = useState(false);
  const [selectedParentId, setParentId] = useState('');
  const parentId = selectedParentId || (parentCandidates.length > 0 ? parentCandidates[0].value : '');

  const getParentLabel = () => {
    if (scanMode === 'movies') {
      return t('organizer.overrideModal.labels.parentMovie') || 'Parent Movie';
    }
    if (scanMode === 'tv') {
      return t('organizer.overrideModal.labels.parentEpisode') || 'Parent Episode';
    }
    if (scanMode === 'scenes') {
      return t('organizer.overrideModal.labels.parentScene') || 'Parent Scene';
    }
    return t('organizer.overrideModal.labels.parentMovieOrEpisode') || 'Parent Movie or Episode';
  };

  const [applySubcategory, setApplySubcategory] = useState(false);
  const [subcategory, setSubcategory] = useState('other');

  const [applyLanguage, setApplyLanguage] = useState(false);
  const [language, setLanguage] = useState('en');

  const [applyAutoNumbering, setApplyAutoNumbering] = useState(false);

  const currentItemType = rows[0]?.rawType || rows[0]?.rawPayload?.parsed_info?.type;

  const filteredMainTypeOptions = useMemo(() => {
    if (currentItemType === 'movie') {
      return translatedMainTypeOptions.filter((opt) => opt.value !== 'episode');
    }
    if (isEpisodeMediaType(currentItemType) || currentItemType === 'tv' || currentItemType === 'episode') {
      return translatedMainTypeOptions.filter((opt) => opt.value !== 'movie');
    }
    return translatedMainTypeOptions;
  }, [translatedMainTypeOptions, currentItemType]);

  const isMovieOrEpisodeOrBonusOrScene =
    initialMainType === 'movie' ||
    initialMainType === 'episode' ||
    initialMainType === 'bonus' ||
    initialMainType === 'scene';

  const isMovieOrScene = mainType === 'movie' || mainType === 'scene';
  const isExtraOrBonus = mainType === 'extra' || mainType === 'bonus';
  const isEpisode = mainType === 'episode';

  return {
    t,
    isExtra,
    category,
    initialMainType,
    mainType,
    setMainType,
    applyMainType,
    setApplyMainType,
    isScenesMode,
    hideLanguage,
    subcategoryList,
    parentCandidates,
    getParentLabel,
    applyTargetLanguage,
    setApplyTargetLanguage,
    targetLanguage,
    setTargetLanguage,
    applySource,
    setApplySource,
    source,
    setSource,
    applyEdition,
    setApplyEdition,
    edition,
    setEdition,
    applyAudioType,
    setApplyAudioType,
    audioType,
    setAudioType,
    applySeasonNum,
    setApplySeasonNum,
    seasonNum,
    setSeasonNum,
    applyParentId,
    setApplyParentId,
    parentId,
    setParentId,
    applySubcategory,
    setApplySubcategory,
    subcategory,
    setSubcategory,
    applyLanguage,
    setApplyLanguage,
    language,
    setLanguage,
    applyAutoNumbering,
    setApplyAutoNumbering,
    filteredMainTypeOptions,
    translatedLanguageOptions,
    translatedSourceOptions,
    translatedEditionOptions,
    translatedAudioTypeOptions,
    isMovieOrEpisodeOrBonusOrScene,
    isMovieOrScene,
    isExtraOrBonus,
    isEpisode,
  };
}
