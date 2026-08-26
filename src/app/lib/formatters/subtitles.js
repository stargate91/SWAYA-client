import { calculateAge, calculateSlenderScore, calculateCurvyScore } from './person';
import { formatRating } from './numbers';
import { formatFileSize } from './bytes';
import { formatReleaseDate } from './dates';

/**
 * Formats performer card/grid subtitle based on the current sort key or role.
 *
 * @param {object} item - Performer item
 * @param {string} sortKey - Active sort key
 * @param {Function} t - Translation function
 * @returns {string} Formatted subtitle
 */
export function formatPerformerSubtitle(item, sortKey, t) {
  const isPhysicalSort = ['height', 'weight', 'cup_size', 'waist', 'hip', 'hourglass_ratio', 'body_slender', 'body_curvy'].includes(sortKey);
  const isMetadataSort = ['birthday', 'rating', 'popularity', 'library_count', 'last_watched', 'watch_count', 'tag_count', 'finish_count', 'last_finish'].includes(sortKey);

  if (isPhysicalSort || isMetadataSort) {
    if (sortKey === 'height') {
      return item.height ? `${item.height} cm` : '—';
    } else if (sortKey === 'weight') {
      return item.weight ? `${item.weight} kg` : '—';
    } else if (sortKey === 'cup_size') {
      const band = item.band_size || '';
      const cup = item.cup_size || '';
      return (band || cup) ? `${band}${cup}` : '—';
    } else if (sortKey === 'waist') {
      return item.waist ? `${t('library.performerEdit.waistInches') || 'Waist'}: ${item.waist}"` : '—';
    } else if (sortKey === 'hip') {
      return item.hip ? `${t('library.performerEdit.hipInches') || 'Hip'}: ${item.hip}"` : '—';
    } else if (sortKey === 'hourglass_ratio') {
      const w = parseFloat(item.waist) || 0;
      const h = parseFloat(item.hip) || 0;
      return w > 0 && h > 0 ? (w / h).toFixed(2) : '—';
    } else if (sortKey === 'body_slender') {
      const score = calculateSlenderScore(item);
      return score ? `${t('library.sort.slenderScore') || 'Slender Score'}: ${score}` : '—';
    } else if (sortKey === 'body_curvy') {
      const score = calculateCurvyScore(item);
      return score ? `${t('library.sort.curvyScore') || 'Curvy Score'}: ${score}` : '—';
    } else if (sortKey === 'birthday') {
      return calculateAge(item.birthday) || '—';
    } else if (sortKey === 'rating') {
      if (item.is_adult_person || item.rating_theporndb) {
        return item.rating_theporndb ? `ThePornDB Rating: ${formatRating(item.rating_theporndb)}` : '—';
      }
      return item.popularity ? `Popularity: ${formatRating(item.popularity)}` : '—';
    } else if (sortKey === 'popularity') {
      return item.popularity ? `Popularity: ${formatRating(item.popularity)}` : '—';
    } else if (sortKey === 'library_count') {
      const count = item.library_count || 0;
      return t('library.sort.libraryCountValue', { count }) || `${count} ${count === 1 ? 'appearance' : 'appearances'}`;
    } else if (sortKey === 'last_watched') {
      return item.last_watched_at ? `Last Watched: ${item.last_watched_at.substring(0, 10)}` : '—';
    } else if (sortKey === 'watch_count') {
      return `Watch Count: ${item.watch_count || 0}`;
    } else if (sortKey === 'tag_count') {
      return `Tags: ${item.tag_count || 0}`;
    } else if (sortKey === 'finish_count') {
      return `Finish Count: ${item.finish_count || 0}`;
    } else if (sortKey === 'last_finish') {
      return item.last_finish_at ? `Last Finish: ${item.last_finish_at.substring(0, 10)}` : '—';
    }
  }

  return item.people_role ? t(`dynamic.roles.${item.people_role}`, { defaultValue: item.people_role }) : '';
}

/**
 * Formats media item subtitle based on active sort key.
 *
 * @param {object} item - Media item
 * @param {string} sortKey - Active sort key
 * @param {Function} t - Translation function
 * @param {string} [defaultSubtitle=''] - Fallback subtitle
 * @returns {string} Formatted subtitle
 */
export function formatMediaSubtitle(item, sortKey, t, defaultSubtitle = '') {
  if (!sortKey) return defaultSubtitle;

  if (sortKey === 'release_date' || sortKey === 'first_air_date') {
    const date = formatReleaseDate(item);
    return date || defaultSubtitle;
  }
  if (sortKey === 'last_air_date') {
    return item.last_air_date ? `${t('library.sort.lastAirDate') || 'Last Air Date'}: ${item.last_air_date.substring(0, 10)}` : defaultSubtitle;
  }
  if (sortKey === 'number_of_seasons') {
    const seasons = item.number_of_seasons || 0;
    return `${t('library.sort.numberOfSeasons') || 'Seasons'}: ${seasons}`;
  }
  if (sortKey === 'number_of_episodes') {
    const episodes = item.number_of_episodes || 0;
    return `${t('library.sort.numberOfEpisodes') || 'Episodes'}: ${episodes}`;
  }
  if (sortKey === 'year') {
    return item.year ? String(item.year) : defaultSubtitle;
  }
  if (sortKey === 'rating_imdb') {
    return defaultSubtitle;
  }
  if (sortKey === 'rating') {
    return defaultSubtitle;
  }
  if (sortKey === 'user_rating') {
    return item.user_rating ? `${t('library.sort.userRating') || 'User Rating'}: ${formatRating(item.user_rating)}` : defaultSubtitle;
  }
  if (sortKey === 'duration') {
    const runTime = item.duration || item.runtime || item.run_time;
    if (runTime) {
      const mins = runTime > 500 ? Math.round(runTime / 60) : Math.round(runTime);
      const hours = Math.floor(mins / 60);
      const remainingMins = mins % 60;
      const formatted = hours > 0
        ? `${hours}h ${remainingMins}m`
        : `${mins} ${t('library.sort.mins') || 'mins'}`;
      return `${t('library.sort.duration') || 'Duration'}: ${formatted}`;
    }
    return defaultSubtitle;
  }
  if (sortKey === 'file_size' || sortKey === 'size') {
    const sizeVal = Number(item.file_size || item.size || item.size_mb);
    if (sizeVal) {
      return formatFileSize(sizeVal, null, t);
    }
    return defaultSubtitle;
  }
  if (sortKey === 'tag_count') {
    const count = item.tag_count ?? (item.custom_tags || []).length;
    return `${t('library.sort.tags') || 'Tags'}: ${count || 0}`;
  }
  if (sortKey === 'added_at' || sortKey === 'created_at') {
    return item.added_at ? `Added: ${item.added_at.substring(0, 10)}` : defaultSubtitle;
  }
  if (sortKey === 'last_watched') {
    return item.last_watched_at ? `${t('library.sort.lastWatched') || 'Last Watched'}: ${item.last_watched_at.substring(0, 10)}` : defaultSubtitle;
  }
  if (sortKey === 'last_finish') {
    return item.last_finish_at ? `${t('library.sort.lastFinish') || 'Last Finish'}: ${item.last_finish_at.substring(0, 10)}` : defaultSubtitle;
  }
  if (sortKey === 'views' || sortKey === 'watch_count') {
    const count = item.views || item.watch_count || 0;
    return `${t('library.sort.watchCount') || 'Watch Count'}: ${count}`;
  }
  if (sortKey === 'finish_count') {
    const count = item.finish_count || 0;
    return `${t('library.sort.finishCount') || 'Finish Count'}: ${count}`;
  }
  if (sortKey === 'popularity') {
    return item.popularity ? `Popularity: ${formatRating(item.popularity)}` : defaultSubtitle;
  }

  return defaultSubtitle;
}
