import { useMemo } from 'react';
import { FOLDER_COLLECTION_MODES } from '../config';
import useTemplatePreview from './useTemplatePreview';

export function useMovieTemplatePreview(form, isAdult = false) {
  const getPreview = useTemplatePreview(form);

  return useMemo(() => {
    const sortOptions = {
      enabled: form.folder_sort_by_type,
      moviesName: form.folder_movies_name,
      tvName: form.folder_tv_name,
    };

    const folderField = isAdult ? 'folder_adult_movie_template' : 'folder_movie_template';
    const namingField = isAdult ? 'naming_adult_movie_template' : 'naming_movie_template';

    const folderMoviePreview = getPreview(
      form[folderField] || form.folder_movie_template,
      'movie',
      { isFile: false, sortOptions }
    );

    const namingMoviePreview = getPreview(
      form[namingField] || form.naming_movie_template,
      'movie'
    );

    const folderCollectionPreview = form.folder_collection_template
      ? getPreview(form.folder_collection_template, 'movie', { isFile: false, sortOptions })
      : '';

    const collectionStructurePreview = getPreview(
      form.folder_collection_mode === FOLDER_COLLECTION_MODES.THRESHOLD
        ? '{collection_title}/{title} ({year})'
        : '{title} ({year})',
      'movie',
      { sortOptions }
    );

    return {
      folderField,
      namingField,
      folderMoviePreview,
      namingMoviePreview,
      folderCollectionPreview,
      collectionStructurePreview,
    };
  }, [
    form,
    isAdult,
    getPreview,
  ]);
}
