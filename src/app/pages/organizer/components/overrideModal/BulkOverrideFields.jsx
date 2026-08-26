import Dropdown from '@/ui/Dropdown';
import Input from '@/ui/Input';
import Checkbox from '@/ui/Checkbox';
import Text from '@/ui/Text';
import BulkOverrideFieldRow from './BulkOverrideFieldRow';

export default function BulkOverrideFields({ form: propForm, ...props }) {
  const form = propForm || props;
  const {
    t,
    category,
    initialMainType,
    mainType,
    setMainType,
    applyMainType,
    setApplyMainType,
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
  } = form;

  const showMainCategory = isMovieOrEpisodeOrBonusOrScene ?? (
    initialMainType === 'movie' ||
    initialMainType === 'episode' ||
    initialMainType === 'bonus' ||
    initialMainType === 'scene'
  );

  const isMovieScene = isMovieOrScene ?? (mainType === 'movie' || mainType === 'scene');
  const isExtraBonus = isExtraOrBonus ?? (mainType === 'extra' || mainType === 'bonus');
  const isEp = isEpisode ?? (mainType === 'episode');

  return (
    <>
      {/* Main Category override */}
      {showMainCategory && (
        <BulkOverrideFieldRow
          label={t('organizer.overrideModal.labels.mainCategory')}
          checked={applyMainType}
          onChange={setApplyMainType}
        >
          <Dropdown
            value={mainType}
            onChange={(e) => setMainType?.(e.target.value)}
            options={filteredMainTypeOptions}
            disabled={!applyMainType}
          />
        </BulkOverrideFieldRow>
      )}

      {/* Target Language override (for Movies & Episodes) */}
      {!hideLanguage && !isExtraBonus && (
        <BulkOverrideFieldRow
          label={t('organizer.overrideModal.labels.targetLanguage')}
          checked={applyTargetLanguage}
          onChange={setApplyTargetLanguage}
        >
          <Dropdown
            value={targetLanguage}
            onChange={(e) => setTargetLanguage?.(e.target.value)}
            options={translatedLanguageOptions}
            disabled={!applyTargetLanguage}
          />
        </BulkOverrideFieldRow>
      )}

      {/* Source override (for Movies & Scenes) */}
      {isMovieScene && (
        <BulkOverrideFieldRow
          label={t('organizer.overrideModal.labels.source')}
          checked={applySource}
          onChange={setApplySource}
        >
          <Dropdown
            value={source}
            onChange={(e) => setSource?.(e.target.value)}
            options={translatedSourceOptions}
            disabled={!applySource}
          />
        </BulkOverrideFieldRow>
      )}

      {/* Edition override (for Movies & Scenes) */}
      {isMovieScene && (
        <BulkOverrideFieldRow
          label={t('organizer.overrideModal.labels.edition')}
          checked={applyEdition}
          onChange={setApplyEdition}
        >
          <Dropdown
            value={edition}
            onChange={(e) => setEdition?.(e.target.value)}
            options={translatedEditionOptions}
            disabled={!applyEdition}
          />
        </BulkOverrideFieldRow>
      )}

      {/* Audio Type override (for Movies, Episodes & Scenes) */}
      {!isExtraBonus && (
        <BulkOverrideFieldRow
          label={t('organizer.overrideModal.labels.audioType')}
          checked={applyAudioType}
          onChange={setApplyAudioType}
        >
          <Dropdown
            value={audioType}
            onChange={(e) => setAudioType?.(e.target.value)}
            options={translatedAudioTypeOptions}
            disabled={!applyAudioType}
          />
        </BulkOverrideFieldRow>
      )}

      {/* Season Number override (for Episodes) */}
      {isEp && (
        <BulkOverrideFieldRow
          label={t('organizer.overrideModal.labels.seasonNumber')}
          checked={applySeasonNum}
          onChange={setApplySeasonNum}
        >
          <Input
            type="text"
            value={seasonNum}
            onChange={(e) => setSeasonNum?.(e.target.value)}
            placeholder={t('organizer.overrideModal.placeholders.seasonNumber')}
            disabled={!applySeasonNum}
          />
        </BulkOverrideFieldRow>
      )}

      {/* Subcategory override (for Extras & Bonus videos) */}
      {isExtraBonus && category !== 'metadata' && (
        <BulkOverrideFieldRow
          label={t('organizer.overrideModal.labels.extraSubcategory')}
          checked={applySubcategory}
          onChange={setApplySubcategory}
        >
          <Dropdown
            value={subcategory}
            onChange={(e) => setSubcategory?.(e.target.value)}
            options={subcategoryList}
            disabled={!applySubcategory}
          />
        </BulkOverrideFieldRow>
      )}

      {/* Parent ID override (for Extras & Bonus videos) */}
      {isExtraBonus && (
        <BulkOverrideFieldRow
          label={getParentLabel?.()}
          checked={applyParentId}
          onChange={setApplyParentId}
        >
          <Dropdown
            value={parentId}
            onChange={(e) => setParentId?.(e.target.value)}
            options={parentCandidates}
            disabled={!applyParentId}
            searchable={true}
          />
        </BulkOverrideFieldRow>
      )}

      {/* Language override (for Subtitle & Audio extras) */}
      {mainType === 'extra' &&
        (category === 'subtitle' || category === 'audio') && (
          <BulkOverrideFieldRow
            label={t('organizer.overrideModal.labels.language')}
            checked={applyLanguage}
            onChange={setApplyLanguage}
          >
            <Dropdown
              value={language}
              onChange={(e) => setLanguage?.(e.target.value)}
              options={translatedLanguageOptions}
              disabled={!applyLanguage}
            />
          </BulkOverrideFieldRow>
        )}

      {/* Auto-numbering and sorting panel checkbox (Only for Episodes) */}
      {isEp && (
        <Checkbox
          checked={applyAutoNumbering}
          onChange={(e) => setApplyAutoNumbering?.(e.target.checked)}
        >
          <Text weight="semibold">
            {t('organizer.overrideModal.labels.autoNumberCheck')}
          </Text>
        </Checkbox>
      )}
    </>
  );
}
