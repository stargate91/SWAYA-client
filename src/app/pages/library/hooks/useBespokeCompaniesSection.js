import { useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { resolveMediaImageUrl } from '@/lib/imageUrls';
import { isSceneMediaType } from '@/lib/mediaTypes';
import { ROUTES } from '@/lib/routes';
import { API_BASE } from '@/lib/backend';

export function useBespokeCompaniesSection({ item, t }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isSceneType = item?.type === 'scene' || isSceneMediaType(item?.media_type);

  const allCompanies = useMemo(() => {
    const list = [...(item?.companies || [])];
    if (item?.networks && Array.isArray(item.networks)) {
      for (const net of item.networks) {
        if (!list.some((c) => (c.id && net.id ? c.id === net.id : c.name === net.name))) {
          list.push(net);
        }
      }
    }
    return list;
  }, [item]);

  const sectionLabel = isSceneType
    ? (t('library.details.studio') || 'Studio')
    : item?.is_adult
      ? (t('library.details.studio') || 'Studio')
      : (t('library.details.productionCompanies') || 'Production Companies');

  const handleCompanyClick = useCallback((company) => {
    if (company?.id) {
      const extIds = item?.external_ids || {};
      let src = extIds.source || '';
      if (!src) {
        if (extIds.theporndb) src = 'theporndb';
        else if (extIds.stashdb) src = 'stashdb';
        else if (extIds.fansdb) src = 'fansdb';
        else if (extIds.tmdb) src = 'tmdb';
      }

      const isCurrentlyScene = location.pathname.includes('/scene/') || isSceneType;
      const mediaType = isCurrentlyScene ? 'scenes' : 'movies';

      const url = ROUTES.STUDIO_DETAIL(company.id, {
        view: 'discover',
        source: src ? src.toLowerCase() : undefined,
        media_type: mediaType,
      });
      navigate(url);
    }
  }, [item, location.pathname, isSceneType, navigate]);

  const resolveCompanyLogoUrl = useCallback((path) => {
    return resolveMediaImageUrl(path, 'logo', API_BASE);
  }, []);

  return {
    allCompanies,
    sectionLabel,
    handleCompanyClick,
    resolveCompanyLogoUrl,
    hasCompanies: allCompanies.length > 0,
  };
}
