import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { navigateToCreditDetail } from '@/lib/routes';
import { resolveDetailsImageUrl } from '@/lib/imageUrls';
import { API_BASE } from '@/lib/backend';

/**
 * Hook to process and normalize known_for credits for a person, along with navigation handlers.
 *
 * @param {object} [item] - Person entity object containing known_for array
 * @returns {{
 *   knownForCredits: Array<{
 *     raw: object,
 *     id: string | number,
 *     title: string,
 *     isScene: boolean,
 *     aspect: 'landscape' | 'poster',
 *     size: string,
 *     posterUrl: string | null,
 *     inLibrary: boolean,
 *     handleClick: () => void
 *   }>,
 *   hasKnownFor: boolean,
 *   handleCreditClick: (credit: object) => void
 * }}
 */
export function usePeopleKnownFor(item) {
  const navigate = useNavigate();

  const handleCreditClick = useCallback(
    (credit) => {
      if (credit) {
        navigateToCreditDetail(navigate, credit, credit.media_type || credit.type);
      }
    },
    [navigate]
  );

  const knownForCredits = useMemo(() => {
    const rawList = Array.isArray(item?.known_for) ? item.known_for : [];
    return rawList.map((itemCredit, i) => {
      const credit = typeof itemCredit === 'string' ? { title: itemCredit, id: `str-${i}`, type: 'movie' } : itemCredit;
      const isScene = credit?.type === 'scene' || credit?.media_type === 'scene';
      const posterUrl = credit?.poster_path
        ? resolveDetailsImageUrl(credit.poster_path, API_BASE, isScene ? 'backdrop' : 'poster')
        : null;
      const creditTitle = credit?.title || credit?.name || (typeof itemCredit === 'string' ? itemCredit : 'Unknown');

      return {
        raw: credit,
        id: `${credit?.id ?? i}-${credit?.type || credit?.media_type || 'movie'}-${i}`,
        title: creditTitle,
        isScene,
        aspect: isScene ? 'landscape' : 'poster',
        size: isScene ? '12rem' : '6.75rem',
        posterUrl,
        inLibrary: Boolean(credit?.in_library),
        handleClick: () => handleCreditClick(credit),
      };
    });
  }, [item, handleCreditClick]);

  return {
    knownForCredits,
    hasKnownFor: knownForCredits.length > 0,
    handleCreditClick,
  };
}

export default usePeopleKnownFor;
