import { useState, useMemo, useCallback } from 'react';
import { getOriginalImageUrlHelper } from '@/lib/imageUrls';
import { API_BASE } from '@/lib/backend';
import {
  calculateAge,
  getGenderLabel,
  formatDate,
  formatRating,
  getCountryISO,
  getFlagEmoji,
  calculateAliases
} from '@/lib/formatters';

export function usePeopleLeftSidebar({
  item,
  mediaUrl,
  locale,
  t,
}) {
  const [lightboxUrl, setLightboxUrl] = useState(null);

  const getOriginalUrl = useCallback(() => {
    return getOriginalImageUrlHelper(true, item, mediaUrl, API_BASE);
  }, [item, mediaUrl]);

  const handleOpenOriginalImage = useCallback(() => {
    const url = getOriginalUrl();
    if (url) {
      setLightboxUrl(url);
    }
  }, [getOriginalUrl]);

  const handleCloseLightbox = useCallback(() => {
    setLightboxUrl(null);
  }, []);

  const { candidateAliases, drawerAliases } = useMemo(() => {
    return calculateAliases(item?.alternate_names);
  }, [item?.alternate_names]);

  const placeOfBirth = item?.place_of_birth;
  const gender = item?.gender;
  const knownForDept = item?.known_for_department;
  const isAdult = item?.is_adult;
  const birthday = item?.birthday;
  const lastFinishAt = item?.last_finish_at;

  const countryISO = useMemo(() => getCountryISO(placeOfBirth), [placeOfBirth]);
  const flagEmoji = useMemo(() => getFlagEmoji(countryISO), [countryISO]);

  const genderVal = useMemo(() => getGenderLabel(gender, t), [gender, t]);

  const deptVal = useMemo(() => {
    if (knownForDept) {
      return t?.(`dynamic.roles.${knownForDept.toLowerCase()}`) || knownForDept;
    }
    return isAdult
      ? (t?.('lists.roles.performer') || 'Performer')
      : (t?.('lists.roles.artist') || 'Artist');
  }, [knownForDept, isAdult, t]);

  const ageVal = useMemo(() => {
    return birthday ? calculateAge(birthday, t) : '—';
  }, [birthday, t]);

  const lastFinishDateText = useMemo(() => {
    return formatDate(lastFinishAt, { year: 'numeric', month: 'short', day: 'numeric' }, locale);
  }, [lastFinishAt, locale]);

  const formatRatingLabel = useCallback((displayVal) => {
    return displayVal !== null && displayVal !== undefined
      ? `${t?.('library.details.yourRating') || 'Your Rating'}: ${formatRating(displayVal)}`
      : (t?.('library.details.yourRating') || 'Your Rating');
  }, [t]);

  const displayName = item?.name || item?.title || 'Unknown Person';

  return {
    displayName,
    candidateAliases,
    drawerAliases,
    countryISO,
    flagEmoji,
    genderVal,
    deptVal,
    ageVal,
    lastFinishDateText,
    lightboxUrl,
    handleOpenOriginalImage,
    handleCloseLightbox,
    formatRatingLabel,
  };
}

export default usePeopleLeftSidebar;
