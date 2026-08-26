import { useMemo } from 'react';
import { POSTER_COLUMNS } from '../data/posterWallData';

/**
 * Hook providing memoized poster column data structures for the hero background poster wall.
 * @returns {{ columns: Array<{ id: number, posters: Array<string> }> }}
 */
export function usePosterWall() {
  const columns = useMemo(() => {
    return POSTER_COLUMNS.map((posters, colIdx) => ({
      id: colIdx,
      posters,
    }));
  }, []);

  return { columns };
}

export default usePosterWall;
