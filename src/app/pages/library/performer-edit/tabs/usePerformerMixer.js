import { useState, useMemo, useCallback } from 'react';
import { useSetPersonFieldRoutingMutation, useSettingsQuery } from '@/queries';
import { usePersonDetailQuery } from '@/queries/metadataQueries';
import { calculateButtSize, formatMixerValue } from '@/lib/formatters';

export function usePerformerMixer({ initialPerson, t, toast }) {
  const { data: settings } = useSettingsQuery();
  const routingMutation = useSetPersonFieldRoutingMutation();

  const { data: fetchedPerson } = usePersonDetailQuery(initialPerson?.id);
  const person = fetchedPerson || initialPerson;

  const [prevFieldRouting, setPrevFieldRouting] = useState(person?.field_routing);
  const [localRouting, setLocalRouting] = useState(() => person?.field_routing || {});

  if (person?.field_routing !== prevFieldRouting) {
    setPrevFieldRouting(person?.field_routing);
    setLocalRouting(person?.field_routing || {});
  }

  const currentRouting = useMemo(() => localRouting || {}, [localRouting]);

  const isMale = String(person?.gender) === '2';
  const includeAdult = settings?.include_adult;

  const isUnderage = useMemo(() => {
    if (person?.is_adult) return false;
    const bday = person?.birthday;
    if (!bday) return false;
    const birthDate = new Date(bday);
    if (isNaN(birthDate.getTime())) return false;
    const today = new Date();
    const minDate = new Date(birthDate.getFullYear() + 18, birthDate.getMonth(), birthDate.getDate());
    minDate.setDate(minDate.getDate() + 14);
    return minDate > today;
  }, [person?.birthday, person?.is_adult]);

  const FIELDS = useMemo(() => [
    { key: 'biography', label: 'Biography', type: 'text' },
    { key: 'birthday', label: 'Birthday', type: 'string' },
    { key: 'place_of_birth', label: 'Place of Birth', type: 'string' },
    ...(person?.is_adult ? [{ key: 'gender', label: 'Gender', type: 'gender' }] : []),
    ...(!isUnderage ? [
      { key: 'height', label: 'Height', type: 'height' },
      ...(includeAdult ? [{ key: 'weight', label: 'Weight', type: 'weight' }] : []),
      { key: 'hair_color', label: 'Hair Color', type: 'string' },
      { key: 'eye_color', label: 'Eye Color', type: 'string' },
    ] : []),
    { key: 'ethnicity', label: 'Ethnicity', type: 'string' },
    ...(includeAdult && !isMale && !isUnderage
      ? [
        { key: 'measurements', label: 'Measurements', type: 'string' },
        { key: 'cup_size', label: 'Cup Size', type: 'string' },
        { key: 'band_size', label: 'Band Size', type: 'string' },
        { key: 'waist', label: 'Waist', type: 'string' },
        { key: 'hip', label: 'Hip', type: 'string' },
        { key: 'breast_type', label: 'Breast Type', type: 'string' },
        { key: 'butt_shape', label: 'Butt Shape', type: 'string' },
        { key: 'butt_size', label: 'Butt Size', type: 'string' },
      ]
      : []),
    { key: 'tattoos', label: 'Tattoos', type: 'string' },
    { key: 'piercings', label: 'Piercings', type: 'string' },
    ...(person?.is_adult ? [{ key: 'same_sex_only', label: 'Same Sex Only', type: 'same_sex_only' }] : []),
  ], [person?.is_adult, isUnderage, includeAdult, isMale]);

  const PROVIDERS = useMemo(() => (
    person?.is_adult
      ? [
        { key: 'tmdb', label: 'TMDb' },
        { key: 'stashdb', label: 'StashDB' },
        { key: 'fansdb', label: 'FansDB' },
        { key: 'theporndb', label: 'ThePornDB' },
        { key: 'manual', label: 'Custom' },
      ]
      : [
        { key: 'tmdb', label: 'TMDb' },
        { key: 'manual', label: 'Custom' },
      ]
  ), [person?.is_adult]);

  const formatValue = useCallback((val, type, fieldKey) => {
    return formatMixerValue(val, type, fieldKey, t);
  }, [t]);

  const getProviderValue = useCallback((providerKey, fieldKey) => {
    const link = person?.external_links?.find((l) => l.provider === providerKey);
    if (!link || !link.source_data) return null;
    if (fieldKey === 'biography') {
      return link.source_data.biographies || link.source_data.biography;
    }

    if (fieldKey === 'butt_size') {
      const rawButtSize = link.source_data.butt_size;
      if (rawButtSize) return rawButtSize;

      const h = link.source_data.height;
      const w = link.source_data.waist;
      const hp = link.source_data.hip;
      const computed = calculateButtSize(h, w, hp);
      if (computed) return computed;
    }

    return link.source_data[fieldKey];
  }, [person]);

  const getAutoValue = useCallback((fieldKey) => {
    if (person?.primary_provider) {
      const val = getProviderValue(person.primary_provider, fieldKey);
      if (val !== null && val !== undefined && val !== '') return val;
    }
    const priority = ['tmdb', 'stashdb', 'fansdb', 'theporndb'];
    for (const prov of priority) {
      if (prov === person?.primary_provider) continue;
      const val = getProviderValue(prov, fieldKey);
      if (val !== null && val !== undefined && val !== '') return val;
    }
    return null;
  }, [person, getProviderValue]);

  const isSourceLinked = useCallback((providerKey) => {
    if (providerKey === 'manual') return true;
    return person?.external_links?.some((l) => l.provider === providerKey);
  }, [person]);

  const handleSelectRoute = useCallback(async (fieldKey, providerKey) => {
    const newRouting = { ...currentRouting };
    if (providerKey === 'auto') {
      delete newRouting[fieldKey];
    } else {
      newRouting[fieldKey] = providerKey;
    }

    setLocalRouting(newRouting);

    try {
      await routingMutation.mutateAsync({
        personId: person.id,
        routing: newRouting,
      });
      toast(t('library.performerEdit.mixer.routing_updated') || 'Metadata routing updated successfully!', 'success');
    } catch (err) {
      setLocalRouting(person?.field_routing || {});
      toast(err.message || t('library.performerEdit.mixer.routing_update_failed') || 'Failed to update routing', 'danger');
    }
  }, [currentRouting, routingMutation, person, t, toast]);

  return {
    person,
    currentRouting,
    FIELDS,
    PROVIDERS,
    formatValue,
    getProviderValue,
    getAutoValue,
    isSourceLinked,
    handleSelectRoute,
  };
}
