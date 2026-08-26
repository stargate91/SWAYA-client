import { useState, useMemo, useCallback } from 'react';
import { resolveMediaImageUrl } from '@/lib/imageUrls';
import { API_BASE } from '@/lib/backend';
import { ROUTES } from '@/lib/routes';

const getAge = (birthday) => {
  if (!birthday) return null;
  const birthDate = new Date(birthday);
  if (isNaN(birthDate.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const getDisplayName = (person) => {
  const age = person.age_at_release || person.age || (person.birthday ? getAge(person.birthday) : null);
  return age ? `${person.name} (${age})` : person.name;
};

export function useCastAndCrewViewModel({ item, settings, t, navigate }) {
  const isAdult = Boolean(item?.is_adult);
  const genderPref = settings?.adult_gender_preference;
  const isTv = item?.type === 'tv';

  const resolvePersonAvatarUrl = useCallback((path) => {
    return resolveMediaImageUrl(path, 'person', API_BASE);
  }, []);

  const resolveCompanyLogoUrl = useCallback((path) => {
    return resolveMediaImageUrl(path, 'logo', API_BASE);
  }, []);

  const allPeople = useMemo(() => {
    const processPeople = (list) => {
      if (!list) return [];
      if (!isAdult || !genderPref || genderPref === 'all') {
        return list.map((p) => ({ ...p, isFilteredOut: false }));
      }
      return list.map((person) => {
        let isFilteredOut = false;
        const g = typeof person.gender === 'string'
          ? (person.gender.toUpperCase().includes('FEMALE') ? 1 : person.gender.toUpperCase().includes('MALE') ? 2 : 0)
          : person.gender;
        if (genderPref === 'female' && g !== 1) {
          isFilteredOut = true;
        } else if (genderPref === 'male' && g !== 2) {
          isFilteredOut = true;
        }
        return { ...person, isFilteredOut };
      });
    };

    const filteredDirectors = processPeople(item?.directors);
    const filteredWriters = processPeople(item?.writers);
    const filteredSound = processPeople(item?.sound);
    const filteredCast = processPeople(item?.cast);

    const list = [];
    const maxTotal = 15;

    // 1. Directors (max 2) - Priority 1
    const slicedDirectors = filteredDirectors ? filteredDirectors.slice(0, 2) : [];
    slicedDirectors.forEach((p) => {
      list.push({ ...p, displayRole: t('dynamic.roles.director') || 'Director' });
    });

    // 2. Cast/Actors (up to remaining slots) - Priority 2
    const remainingForCast = maxTotal - list.length;
    const slicedCast = filteredCast ? filteredCast.slice(0, Math.max(0, remainingForCast)) : [];
    slicedCast.forEach((p) => {
      list.push({ ...p, displayRole: p.character });
    });

    // 3. Writers (up to remaining slots) - Priority 3
    const remainingForWriters = maxTotal - list.length;
    if (remainingForWriters > 0) {
      const slicedWriters = filteredWriters ? filteredWriters.slice(0, remainingForWriters) : [];
      slicedWriters.forEach((p) => {
        if (!list.some((existing) => existing.id === p.id)) {
          list.push({ ...p, displayRole: t('dynamic.roles.writer') || 'Writer' });
        }
      });
    }

    // 4. Sound (up to remaining slots) - Priority 4
    const remainingForSound = maxTotal - list.length;
    if (remainingForSound > 0) {
      const slicedSound = filteredSound ? filteredSound.slice(0, remainingForSound) : [];
      slicedSound.forEach((p) => {
        if (!list.some((existing) => existing.id === p.id)) {
          list.push({ ...p, displayRole: p.job || (t('dynamic.roles.sound') || 'Sound') });
        }
      });
    }

    // Sort: Preferred gender (isFilteredOut === false) comes first
    list.sort((a, b) => {
      if (a.isFilteredOut && !b.isFilteredOut) return 1;
      if (!a.isFilteredOut && b.isFilteredOut) return -1;
      return 0;
    });

    return list.map((person) => ({
      ...person,
      displayName: getDisplayName(person),
    }));
  }, [item?.directors, item?.cast, item?.writers, item?.sound, isAdult, genderPref, t]);

  const showCompanies = isTv && Boolean(item?.companies && item.companies.length > 0);
  const showNetworks = isTv && Boolean(item?.networks && item.networks.length > 0);
  const hasCast = allPeople.length > 0;

  const totalTabs = (hasCast ? 1 : 0) + (showCompanies ? 1 : 0) + (showNetworks ? 1 : 0);

  const [activeTabState, setActiveTab] = useState('cast');
  const activeTab = useMemo(() => {
    if (activeTabState === 'cast' && !hasCast) {
      if (showCompanies) return 'companies';
      if (showNetworks) return 'networks';
    }
    if (activeTabState === 'companies' && !showCompanies) {
      if (hasCast) return 'cast';
      if (showNetworks) return 'networks';
    }
    if (activeTabState === 'networks' && !showNetworks) {
      if (hasCast) return 'cast';
      if (showCompanies) return 'companies';
    }
    return activeTabState;
  }, [activeTabState, hasCast, showCompanies, showNetworks]);

  const companiesLabel = isAdult
    ? (t('library.details.studio') || 'Studio')
    : (t('library.details.productionCompanies') || 'Production Companies');

  const networksLabel = t('library.details.platformsNetworks') || 'Networks';
  const castLabel = t('library.details.cast') || 'Cast & Crew';

  const tabs = useMemo(() => {
    const list = [];
    if (hasCast) {
      list.push({ value: 'cast', label: castLabel });
    }
    if (showCompanies) {
      list.push({ value: 'companies', label: companiesLabel });
    }
    if (showNetworks) {
      list.push({ value: 'networks', label: networksLabel });
    }
    return list;
  }, [hasCast, showCompanies, showNetworks, castLabel, companiesLabel, networksLabel]);

  const handleCompanyClick = useCallback((c) => {
    if (c?.id) {
      navigate(ROUTES.STUDIO_DETAIL(c.id));
    }
  }, [navigate]);

  return {
    allPeople,
    showCompanies,
    showNetworks,
    totalTabs,
    tabs,
    activeTab,
    setActiveTab,
    handleCompanyClick,
    resolvePersonAvatarUrl,
    resolveCompanyLogoUrl,
  };
}

export default useCastAndCrewViewModel;
