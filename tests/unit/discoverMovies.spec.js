import { describe, it, expect } from 'vitest';
import { MOCK_MOVIES, MOCK_DISCOVER_MOVIES, MOCK_PEOPLE } from '../../src/app/lib/mock/mockData';
import { handleRecommendationRequests } from '../../src/app/lib/mock/handlers/recommendationHandlers';
import { handleLibraryRequests } from '../../src/app/lib/mock/handlers/libraryHandlers';
import { handlePeopleRequests } from '../../src/app/lib/mock/handlers/peopleHandlers';

describe('Discovery Movies Mock Suite', () => {
  it('should have separate discover movies distinct from library recently-added movies', () => {
    const libraryMovieIds = new Set(MOCK_MOVIES.map((m) => m.id));
    const discoverMovieIds = MOCK_DISCOVER_MOVIES.map((m) => m.id);

    expect(discoverMovieIds.length).toBeGreaterThanOrEqual(10);

    discoverMovieIds.forEach((id) => {
      expect(libraryMovieIds.has(id)).toBe(false);
    });

    MOCK_DISCOVER_MOVIES.forEach((movie) => {
      expect(movie.in_library).toBe(false);
      expect(movie.title).toBeTruthy();
      expect(movie.poster_path).toBeTruthy();
      expect(movie.cast).toBeInstanceOf(Array);
      expect(movie.cast.length).toBeGreaterThan(0);
    });
  });

  it('recommendations/discover endpoint returns discover movies with filter support', async () => {
    const resAll = handleRecommendationRequests('recommendations/discover', {}, 'http://localhost/api/recommendations/discover');
    const dataAll = await resAll.json();
    expect(dataAll.length).toBe(MOCK_DISCOVER_MOVIES.length);

    // Filter by year
    const res1999 = handleRecommendationRequests('recommendations/discover', {}, 'http://localhost/api/recommendations/discover?year=1999');
    const data1999 = await res1999.json();
    expect(data1999.some((m) => m.title === 'The Matrix')).toBe(true);
    expect(data1999.some((m) => m.title === 'Fight Club')).toBe(true);
    expect(data1999.every((m) => m.year === 1999)).toBe(true);
  });

  it('allows viewing full detail page for discover movies via library/item', async () => {
    const matrixRes = handleLibraryRequests('library/item/603', {}, 'http://localhost/api/library/item/603');
    const matrix = await matrixRes.json();
    expect(matrix).not.toBeNull();
    expect(matrix.title).toBe('The Matrix');
    expect(matrix.in_library).toBe(false);
    expect(matrix.cast.length).toBeGreaterThan(0);

    // Also supports tmdb_603 query format
    const tmdbMatrixRes = handleLibraryRequests('library/item/detail', {}, 'http://localhost/api/library/item/detail?provider=tmdb&external_id=603');
    const tmdbMatrix = await tmdbMatrixRes.json();
    expect(tmdbMatrix).not.toBeNull();
    expect(tmdbMatrix.title).toBe('The Matrix');
  });

  it('has actor profiles available for discover movie cast members', async () => {
    const keanu = MOCK_PEOPLE.find((p) => p.id === 6384);
    expect(keanu).toBeDefined();
    expect(keanu.name).toBe('Keanu Reeves');

    const personRes = handlePeopleRequests('people/6384', {}, 'http://localhost/api/people/6384');
    const personData = await personRes.json();
    expect(personData.name).toBe('Keanu Reeves');

    const personMoviesRes = handlePeopleRequests('people/6384/movies', {}, 'http://localhost/api/people/6384/movies');
    const personMovies = await personMoviesRes.json();
    expect(personMovies.items.some((m) => m.title === 'The Matrix')).toBe(true);
  });
});
