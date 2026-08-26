import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSavePersonCustomFieldsMutation, useSettingsQuery } from '@/queries';
import { usePersonDetailQuery, useScrapeHealthyCelebMutation } from '@/queries/metadataQueries';
import { TARGET_LANGUAGE_OPTIONS } from '@/lib/languages';
import {
  getGenderOptions,
  getSameSexOnlyOptions,
  getBreastTypeOptions,
  getCupSizeOptions,
  getHairColorOptions,
  getEyeColorOptions,
  getEthnicityOptions,
  getButtShapeOptions,
  getButtSizeOptions,
  getDropdownOptions,
} from './performerCustomValuesConfig';

const createInitialFormState = (manualData = {}) => ({
  name: manualData.name || '',
  alternate_names: manualData.alternate_names || [],
  biographies: manualData.biographies || (manualData.biography ? { en: manualData.biography } : {}),
  birthday: manualData.birthday || '',
  place_of_birth: manualData.place_of_birth || '',
  gender: manualData.gender !== undefined ? String(manualData.gender) : '',
  height: manualData.height !== undefined ? String(manualData.height) : '',
  weight: manualData.weight !== undefined ? String(manualData.weight) : '',
  hair_color: manualData.hair_color ? manualData.hair_color.toUpperCase() : '',
  eye_color: manualData.eye_color ? manualData.eye_color.toUpperCase() : '',
  ethnicity: manualData.ethnicity ? manualData.ethnicity.toUpperCase() : '',
  measurements: manualData.measurements || '',
  cup_size: manualData.cup_size || '',
  band_size: manualData.band_size !== undefined ? String(manualData.band_size) : '',
  waist: manualData.waist !== undefined ? String(manualData.waist) : '',
  hip: manualData.hip !== undefined ? String(manualData.hip) : '',
  tattoos: manualData.tattoos || '',
  piercings: manualData.piercings || '',
  breast_type: manualData.breast_type || '',
  same_sex_only: manualData.same_sex_only || '',
  butt_shape: manualData.butt_shape || '',
  butt_size: manualData.butt_size || '',
});

export function usePerformerCustomValuesForm({
  personId,
  person: initialPerson,
  onDirtyChange,
  t,
  toast,
}) {
  const { data: settings } = useSettingsQuery();
  const { data: fetchedPerson } = usePersonDetailQuery(personId);
  const person = fetchedPerson || initialPerson;
  const saveMutation = useSavePersonCustomFieldsMutation();
  const scrapeMutation = useScrapeHealthyCelebMutation();
  const manualLink = person?.external_links?.find((l) => l.provider === 'manual');
  const manualData = manualLink?.source_data || {};

  const genderOptions = useMemo(() => getGenderOptions(t), [t]);
  const sameSexOnlyOptions = useMemo(() => getSameSexOnlyOptions(), []);
  const breastTypeOptions = useMemo(() => getBreastTypeOptions(t), [t]);
  const cupSizeOptions = useMemo(() => getCupSizeOptions(), []);
  const hairColorOptions = useMemo(() => getHairColorOptions(t), [t]);
  const eyeColorOptions = useMemo(() => getEyeColorOptions(t), [t]);
  const ethnicityOptions = useMemo(() => getEthnicityOptions(t), [t]);
  const buttShapeOptions = useMemo(() => getButtShapeOptions(t), [t]);
  const buttSizeOptions = useMemo(() => getButtSizeOptions(t), [t]);

  const [selectedBioLang, setSelectedBioLang] = useState('en');

  const [prevManualLink, setPrevManualLink] = useState(manualLink);
  const [initialForm, setInitialForm] = useState(() => createInitialFormState(manualData));
  const [form, setForm] = useState(initialForm);

  const [healthyCelebUrl, setHealthyCelebUrl] = useState('');
  const [isFetchingHealthyCeleb, setIsFetchingHealthyCeleb] = useState(false);

  const handleFetchHealthyCeleb = async () => {
    setIsFetchingHealthyCeleb(true);
    try {
      const data = await scrapeMutation.mutateAsync({ personId, healthyCelebUrl });

      setForm((prev) => {
        const next = { ...prev };
        if (data.height) next.height = String(data.height);
        if (data.weight) next.weight = String(data.weight);
        if (data.measurements) next.measurements = data.measurements;
        if (data.cup_size) next.cup_size = data.cup_size;
        if (data.band_size) next.band_size = String(data.band_size);
        if (data.waist) next.waist = String(data.waist);
        if (data.hip) next.hip = String(data.hip);
        if (data.hair_color) next.hair_color = data.hair_color;
        if (data.eye_color) next.eye_color = data.eye_color;
        if (data.ethnicity) next.ethnicity = data.ethnicity;
        if (data.place_of_birth) next.place_of_birth = data.place_of_birth;
        return next;
      });

      if (data.source_url) {
        setHealthyCelebUrl(data.source_url);
      }

      toast(t('library.performerEdit.custom.fetch_healthyceleb_success') || 'Successfully fetched statistics from HealthyCeleb!', 'success');
    } catch (err) {
      toast(err.message || t('library.performerEdit.custom.fetch_healthyceleb_failed') || 'Failed to fetch statistics from HealthyCeleb', 'danger');
    } finally {
      setIsFetchingHealthyCeleb(false);
    }
  };

  const isMale = String(form.gender) === '2' || (form.gender === '' && String(person?.gender) === '2');

  const isUnderage = useMemo(() => {
    if (person?.is_adult) return false;
    const bday = form.birthday || person?.birthday;
    if (!bday) return false;
    const birthDate = new Date(bday);
    if (isNaN(birthDate.getTime())) return false;
    const today = new Date();
    const minDate = new Date(birthDate.getFullYear() + 18, birthDate.getMonth(), birthDate.getDate());
    minDate.setDate(minDate.getDate() + 14);
    return minDate > today;
  }, [form.birthday, person?.birthday, person?.is_adult]);

  if (prevManualLink !== manualLink) {
    setPrevManualLink(manualLink);
    const initialized = createInitialFormState(manualData);
    setInitialForm(initialized);
    setForm(initialized);
  }

  const handleChange = useCallback((key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  }, []);

  const handleReset = useCallback(() => {
    if (initialForm) {
      setForm(initialForm);
    }
  }, [initialForm]);

  const errors = useMemo(() => {
    const errs = {};
    if (form.height) {
      const h = Number(form.height);
      if (isNaN(h) || h < 50 || h > 300) {
        errs.height = t('library.performerEdit.validation.height');
      }
    }
    if (form.weight) {
      const w = Number(form.weight);
      if (isNaN(w) || w < 30 || w > 300) {
        errs.weight = t('library.performerEdit.validation.weight');
      }
    }
    if (form.cup_size) {
      if (!/^[A-Z]{1,3}$/.test(form.cup_size)) {
        errs.cup_size = t('library.performerEdit.validation.cupSize');
      }
    }
    if (form.band_size) {
      const b = Number(form.band_size);
      if (isNaN(b) || b < 10 || b > 100) {
        errs.band_size = t('library.performerEdit.validation.bandSize');
      }
    }
    if (form.waist) {
      const w = Number(form.waist);
      if (isNaN(w) || w < 10 || w > 100) {
        errs.waist = t('library.performerEdit.validation.waist');
      }
    }
    if (form.hip) {
      const h = Number(form.hip);
      if (isNaN(h) || h < 10 || h > 100) {
        errs.hip = t('library.performerEdit.validation.hip');
      }
    }
    if (person?.is_adult && form.birthday) {
      const birthDate = new Date(form.birthday);
      if (!isNaN(birthDate.getTime())) {
        const today = new Date();
        const minDate = new Date(birthDate.getFullYear() + 18, birthDate.getMonth(), birthDate.getDate());
        minDate.setDate(minDate.getDate() + 14);
        if (minDate > today) {
          errs.birthday = t('library.performerEdit.validation.underage') || 'Performer must be at least 18 years and 2 weeks old';
        }
      }
    }
    return errs;
  }, [form.height, form.weight, form.cup_size, form.band_size, form.waist, form.hip, form.birthday, person?.is_adult, t]);

  const computedMeasurements = useMemo(() => {
    const parts = [];
    if (form.band_size && form.cup_size) {
      parts.push(`${form.band_size}${form.cup_size}`);
    } else if (form.cup_size) {
      parts.push(form.cup_size);
    } else if (form.band_size) {
      parts.push(form.band_size);
    }

    if (form.waist && form.hip) {
      parts.push(`${form.waist}-${form.hip}`);
    } else if (form.waist) {
      parts.push(form.waist);
    } else if (form.hip) {
      parts.push(form.hip);
    }
    return parts.join('-');
  }, [form.band_size, form.cup_size, form.waist, form.hip]);

  const handleSave = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (Object.keys(errors).length > 0) {
      toast(t('library.performerEdit.validation.correctErrors'), 'danger');
      return;
    }
    try {
      const payload = {};
      Object.entries(form).forEach(([k, v]) => {
        if (k === 'biographies') {
          const cleanedBios = {};
          Object.entries(v || {}).forEach(([lang, val]) => {
            if (val && val.trim() !== '') {
              cleanedBios[lang] = val;
            }
          });
          payload['biographies'] = cleanedBios;
        } else if (v === '') {
          payload[k] = null;
        } else if (k === 'gender' || k === 'height' || k === 'weight' || k === 'band_size' || k === 'waist' || k === 'hip') {
          payload[k] = Number(v);
        } else {
          payload[k] = v;
        }
      });
      payload['measurements'] = computedMeasurements || null;

      await saveMutation.mutateAsync({
        personId: person.id,
        fields: payload,
      });
      setInitialForm(form);
      toast(t('library.performerEdit.custom.values_saved') || 'Custom values saved successfully!', 'success');
    } catch (err) {
      toast(err.message || t('library.performerEdit.custom.save_values_failed') || 'Failed to save custom values', 'danger');
    }
  };

  const isDirty = useMemo(() => {
    if (!initialForm) return false;
    return Object.keys(form).some((key) => {
      if (key === 'measurements') return false;
      if (key === 'biographies') {
        const current = form[key] || {};
        const initial = initialForm[key] || {};
        const allKeys = new Set([...Object.keys(current), ...Object.keys(initial)]);
        for (const k of allKeys) {
          if ((current[k] || '') !== (initial[k] || '')) return true;
        }
        return false;
      }
      return form[key] !== initialForm[key];
    });
  }, [form, initialForm]);

  useEffect(() => {
    if (onDirtyChange) {
      onDirtyChange(Boolean(isDirty));
    }
  }, [isDirty, onDirtyChange]);

  const bioLanguageOptions = useMemo(() => {
    return TARGET_LANGUAGE_OPTIONS.map((opt) => ({
      value: opt.value,
      label: `${opt.label} ${form.biographies?.[opt.value] ? '✓' : ''}`.trim(),
    }));
  }, [form.biographies]);

  return {
    person,
    settings,
    form,
    setForm,
    handleChange,
    errors,
    isMale,
    isUnderage,
    computedMeasurements,
    isDirty,
    handleSave,
    handleReset,
    saveMutation,
    // HealthyCeleb
    healthyCelebUrl,
    setHealthyCelebUrl,
    isFetchingHealthyCeleb,
    handleFetchHealthyCeleb,
    // Language & Bio
    selectedBioLang,
    setSelectedBioLang,
    bioLanguageOptions,
    // Options
    genderOptions,
    sameSexOnlyOptions,
    breastTypeOptions,
    cupSizeOptions,
    hairColorOptions,
    eyeColorOptions,
    ethnicityOptions,
    buttShapeOptions,
    buttSizeOptions,
    getDropdownOptions,
  };
}
