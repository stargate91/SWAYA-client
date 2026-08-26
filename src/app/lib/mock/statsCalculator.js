import {
  MOCK_MOVIES,
  MOCK_VIDEOS,
  MOCK_SHOWS,
  MOCK_ADULT_SCENES,
  MOCK_PEOPLE,
  MOCK_STUDIOS,
  MOCK_ORGANIZER_FILES
} from './mockData';

/**
 * Calculates a 10-step distribution table for ratings (1 to 10).
 */
function buildDistribution(items, ratingExtractor) {
  const scores = items.map(ratingExtractor).filter(r => typeof r === 'number' && r > 0);
  const total = scores.length;
  const distributionRows = [];
  const distribution20 = Array(20).fill(0);

  for (let score = 10; score >= 1; score--) {
    const count = scores.filter(s => Math.round(s) === score).length;
    const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
    distributionRows.push({
      score,
      ratingLabel: String(score),
      count,
      percentage
    });
  }

  // 20-step half-star distribution (0.5 to 10)
  for (const s of scores) {
    const idx = Math.min(19, Math.max(0, Math.round(s * 2) - 1));
    distribution20[idx] = (distribution20[idx] || 0) + 1;
  }

  const avg = total > 0 ? (scores.reduce((a, b) => a + b, 0) / total).toFixed(1) : '0.0';
  const favoritesCount = items.filter(i => Boolean(i.favorite || i.is_favorite)).length;

  return {
    average: avg,
    averageNum: parseFloat(avg),
    totalRated: total,
    totalUnrated: items.length - total,
    favoritesCount,
    distribution: distribution20,
    distributionRows
  };
}

/**
 * Computes rich dynamic Library Stats (Library DNA, Timeline, Storage).
 */
export function computeLibraryStats(isNsfw = false) {
  const mediaList = isNsfw
    ? [...MOCK_ADULT_SCENES, ...MOCK_VIDEOS.filter(v => v.is_adult)]
    : [...MOCK_MOVIES, ...MOCK_VIDEOS.filter(v => !v.is_adult), ...MOCK_SHOWS];

  // 1. Genre/Tag Constellation (Library DNA) - Uses suggested_tags & tags in NSFW mode
  const genreCounts = {};
  for (const item of mediaList) {
    const tagsOrGenres = isNsfw
      ? [
          ...(Array.isArray(item.suggested_tags) ? item.suggested_tags : []),
          ...(Array.isArray(item.tags) ? item.tags : []),
          ...(Array.isArray(item.custom_tags) ? item.custom_tags : []),
          ...(Array.isArray(item.genres) ? item.genres : [])
        ]
      : (Array.isArray(item.genres) && item.genres.length > 0 ? item.genres : (item.tags || []));

    const uniqueLabels = new Set();
    for (const g of tagsOrGenres) {
      const label = typeof g === 'object' ? (g.name || g.label) : String(g);
      if (label && label.trim()) {
        uniqueLabels.add(label.trim());
      }
    }

    for (const label of uniqueLabels) {
      genreCounts[label] = (genreCounts[label] || 0) + 1;
    }
  }

  const sortedGenres = Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([label, count], index) => ({
      id: `dna_${index + 1}`,
      label,
      count
    }));

  const actualDnaTitles = mediaList.filter(i => {
    if (isNsfw) {
      return (i.suggested_tags?.length || 0) > 0 || (i.tags?.length || 0) > 0 || (i.custom_tags?.length || 0) > 0 || (i.genres?.length || 0) > 0;
    }
    return (i.genres?.length || 0) > 0 || (i.tags?.length || 0) > 0;
  }).length;
  const hasEnoughDna = actualDnaTitles >= 4;

  // 2. Time-Travel Timeline (Decade distribution)
  const decadeCounts = {};
  let actualTimelineItems = 0;

  for (const item of mediaList) {
    const year = Number(item.year || (item.release_date ? item.release_date.slice(0, 4) : 0));
    if (year > 1900 && year < 2100) {
      actualTimelineItems++;
      const decade = `${Math.floor(year / 10) * 10}s`;
      decadeCounts[decade] = (decadeCounts[decade] || 0) + 1;
    }
  }

  const hasEnoughTimeline = actualTimelineItems >= 5;

  // 3. Storage and duration calculations
  const totalBytes = mediaList.reduce((acc, item) => acc + (item.size || item.file_size || 8500000000), 0);
  const totalGb = totalBytes / (1024 * 1024 * 1024);
  const storageFormatted = totalGb >= 1000
    ? `${(totalGb / 1024).toFixed(1)} TB`
    : `${totalGb.toFixed(1)} GB`;

  const totalEpisodes = isNsfw ? 0 : MOCK_SHOWS.reduce((acc, show) => {
    return acc + (show.episodes_count || show.number_of_episodes || (show.seasons?.reduce((sAcc, s) => sAcc + (s.episodes?.length || 0), 0)) || 0);
  }, 0);

  return {
    total_movies: isNsfw ? 0 : MOCK_MOVIES.length,
    total_tv: isNsfw ? 0 : MOCK_SHOWS.length,
    total_episodes: totalEpisodes,
    total_scenes: isNsfw ? MOCK_ADULT_SCENES.length : 0,
    total_videos: isNsfw ? MOCK_VIDEOS.filter(v => v.is_adult).length : MOCK_VIDEOS.filter(v => !v.is_adult).length,
    total_size_gb: Math.round(totalGb),
    total_duration_hours: Math.round(mediaList.reduce((acc, i) => acc + ((i.duration || 7200) / 3600), 0)),
    storage: storageFormatted,
    drive_count: 2,
    unmatched: isNsfw ? 0 : MOCK_ORGANIZER_FILES.length,
    actual_dna_titles: actualDnaTitles,
    actual_timeline_items: actualTimelineItems,
    genre_constellation: {
      nodes: sortedGenres,
      has_enough_data: hasEnoughDna,
      is_mocked: false
    },
    decade_distribution: decadeCounts,
    timeline_has_enough_data: hasEnoughTimeline,
    timeline_is_mocked: false
  };
}

/**
 * Computes Rating Distribution and summaries for all media categories.
 */
export function computeRatingsStats(isNsfw = false) {
  const getRating = (item) => item.user_rating || item.rating || item.vote_average || 0;

  const movies = buildDistribution(isNsfw ? [] : MOCK_MOVIES, getRating);
  const tv = buildDistribution(isNsfw ? [] : MOCK_SHOWS, getRating);
  const scenes = buildDistribution(isNsfw ? MOCK_ADULT_SCENES : [], getRating);
  const videos = buildDistribution(MOCK_VIDEOS.filter(v => (isNsfw ? v.is_adult : !v.is_adult)), getRating);
  const people = buildDistribution(
    MOCK_PEOPLE.filter(p => (isNsfw ? p.is_adult : !p.is_adult)),
    getRating
  );
  const studios = buildDistribution(
    MOCK_STUDIOS.filter(s => (isNsfw ? s.is_adult : !s.is_adult)),
    getRating
  );

  return {
    movies,
    tv,
    scenes,
    videos,
    people,
    studios
  };
}

