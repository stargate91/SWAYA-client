import { useMemo } from 'react';
import useTemplatePreview from './useTemplatePreview';

export function useTvTemplatePreview(form, isAdult = false) {
  const getPreview = useTemplatePreview(form);

  return useMemo(() => {
    const sortOptions = {
      enabled: form.folder_sort_by_type,
      moviesName: form.folder_movies_name,
      tvName: form.folder_tv_name,
    };

    const folderTvField = isAdult ? 'folder_adult_tv_template' : 'folder_tv_template';
    const folderSeasonField = isAdult ? 'folder_adult_season_template' : 'folder_season_template';
    const namingEpisodeField = isAdult ? 'naming_adult_episode_template' : 'naming_episode_template';

    const folderTvPreview = getPreview(
      form[folderTvField] || form.folder_tv_template,
      'tv',
      { isFile: false, sortOptions }
    );

    const folderSeasonPreview = getPreview(
      form[folderSeasonField] || form.folder_season_template,
      'season',
      {
        isFile: false,
        sortOptions,
        contextOverrides: { season_number: 1, season_name: 'Season 1' },
      }
    );

    const folderEpisodePreview = form.folder_episode_template
      ? getPreview(form.folder_episode_template, 'episode', { isFile: false, sortOptions })
      : '';

    const namingEpisodePreview = getPreview(
      form[namingEpisodeField] || form.naming_episode_template,
      'tv'
    );

    return {
      folderTvField,
      folderSeasonField,
      namingEpisodeField,
      folderTvPreview,
      folderSeasonPreview,
      folderEpisodePreview,
      namingEpisodePreview,
    };
  }, [
    form,
    isAdult,
    getPreview,
  ]);
}
