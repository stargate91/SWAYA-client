import { useMemo, useCallback } from 'react';
import { TARGET_LANGUAGE_OPTIONS } from '@/lib/languages';
import { SOURCE_LABELS, EDITION_LABELS, AUDIO_TYPE_LABELS } from '@/lib/formatters/media';

export const SUBCATEGORIES_BY_CATEGORY = {
  video: [
    { value: 'trailer', label: 'Trailer' },
    { value: 'sample', label: 'Sample' },
    { value: 'behind_the_scenes', label: 'Behind the Scenes' },
    { value: 'featurette', label: 'Featurette' },
    { value: 'deleted_scenes', label: 'Deleted Scenes' },
    { value: 'interview', label: 'Interview' },
    { value: 'scene_comparison', label: 'Scene Comparison' },
    { value: 'short', label: 'Short' },
    { value: 'promo', label: 'Promo' },
    { value: 'clip', label: 'Clip' },
    { value: 'other', label: 'Other' },
  ],
  image: [
    { value: 'poster', label: 'Poster' },
    { value: 'fanart', label: 'Fanart' },
    { value: 'disc', label: 'Disc' },
    { value: 'backdrop', label: 'Backdrop' },
    { value: 'banner', label: 'Banner' },
    { value: 'thumbnail', label: 'Thumbnail' },
    { value: 'logo', label: 'Logo' },
    { value: 'clearlogo', label: 'Clearlogo' },
    { value: 'character_art', label: 'Character Art' },
    { value: 'other', label: 'Other' },
  ],
  subtitle: [
    { value: 'full', label: 'Full' },
    { value: 'forced', label: 'Forced' },
    { value: 'sdh', label: 'SDH' },
    { value: 'hearing_impaired', label: 'Hearing Impaired' },
    { value: 'commentary_sub', label: 'Commentary Sub' },
    { value: 'lyrics', label: 'Lyrics' },
    { value: 'other', label: 'Other' },
  ],
  audio: [
    { value: 'dubbed', label: 'Dubbed' },
    { value: 'original', label: 'Original' },
    { value: 'commentary_audio', label: 'Commentary Audio' },
    { value: 'descriptive', label: 'Descriptive' },
    { value: 'isolated_score', label: 'Isolated Score' },
    { value: 'other', label: 'Other' },
  ],
  metadata: [
    { value: 'nfo', label: 'NFO' },
    { value: 'xml', label: 'XML' },
    { value: 'json', label: 'JSON' },
    { value: 'txt', label: 'TXT' },
    { value: 'url', label: 'URL' },
    { value: 'other', label: 'Other' },
  ],
};

export const LANGUAGE_OPTIONS = TARGET_LANGUAGE_OPTIONS;

export const SOURCE_OPTIONS = [
  { value: 'none', label: 'None' },
  ...Object.entries(SOURCE_LABELS).map(([value, label]) => ({ value, label })),
];

export const EDITION_OPTIONS = [
  { value: 'none', label: 'None' },
  ...Object.entries(EDITION_LABELS).map(([value, label]) => ({ value, label })),
];

export const AUDIO_TYPE_OPTIONS = [
  { value: 'none', label: 'None' },
  ...Object.entries(AUDIO_TYPE_LABELS).map(([value, label]) => ({ value, label })),
];

export const MAIN_TYPE_OPTIONS = [
  { value: 'movie', label: 'Movie' },
  { value: 'episode', label: 'Episode' },
  { value: 'bonus', label: 'Bonus Video' },
];

export function useTranslatedOverrideOptions(t, isScenesMode = false) {
  const translate = useCallback((key, fallback) => {
    const val = t(key);
    return (val && val !== key) ? val : fallback;
  }, [t]);

  const translatedLanguageOptions = useMemo(() =>
    LANGUAGE_OPTIONS.map((opt) => ({
      ...opt,
      label: translate(`languages.${opt.value}`, opt.label),
    })),
    [translate]
  );

  const translatedSubcategoriesByCategory = useMemo(() => {
    const result = {};
    Object.keys(SUBCATEGORIES_BY_CATEGORY).forEach((catKey) => {
      result[catKey] = SUBCATEGORIES_BY_CATEGORY[catKey].map((opt) => ({
        ...opt,
        label: translate(`dynamic.organizerOptions.subcategories.${opt.value}`, opt.label),
      }));
    });
    return result;
  }, [translate]);

  const translatedSourceOptions = useMemo(() =>
    SOURCE_OPTIONS.map((opt) => ({
      ...opt,
      label: translate(`dynamic.organizerOptions.sources.${opt.value}`, opt.label),
    })),
    [translate]
  );

  const translatedEditionOptions = useMemo(() =>
    EDITION_OPTIONS.map((opt) => ({
      ...opt,
      label: translate(`dynamic.organizerOptions.editions.${opt.value}`, opt.label),
    })),
    [translate]
  );

  const translatedAudioTypeOptions = useMemo(() =>
    AUDIO_TYPE_OPTIONS.map((opt) => ({
      ...opt,
      label: translate(`dynamic.organizerOptions.audioTypes.${opt.value}`, opt.label),
    })),
    [translate]
  );

  const translatedMainTypeOptions = useMemo(() => {
    if (isScenesMode) {
      return [
        { value: 'scene', label: translate('dynamic.organizerOptions.mainTypes.scene', 'Scene') },
        { value: 'bonus', label: translate('dynamic.organizerOptions.mainTypes.bonus', 'Bonus Video') },
      ];
    }
    return MAIN_TYPE_OPTIONS.map((opt) => ({
      ...opt,
      label: translate(`dynamic.organizerOptions.mainTypes.${opt.value}`, opt.label),
    }));
  }, [translate, isScenesMode]);

  return {
    translatedLanguageOptions,
    translatedSubcategoriesByCategory,
    translatedSourceOptions,
    translatedEditionOptions,
    translatedAudioTypeOptions,
    translatedMainTypeOptions,
  };
}
