import { useMemo } from 'react';
import {
  formatListAttr,
  formatBodyDimension,
  formatHeight,
  formatWeight,
  formatCareerYears,
  formatPhysicalAttributeLabel,
} from '@/lib/formatters';
import { useSettingsQuery } from '@/queries';

export function useEntityDetailSpecs({
  item = {},
  overviewTitle,
  t,
  settings: propSettings,
}) {
  const { data: querySettings } = useSettingsQuery();
  const settings = propSettings || querySettings;
  const includeAdult = settings?.include_adult ?? false;

  const {
    hasSafeSpecs,
    hasSpicySpecs,
    hasAnySpecs,
    specItems,
    drawerTitle,
    sectionTitle,
  } = useMemo(() => {
    const tattooVal = formatListAttr(item?.tattoos);
    const piercingVal = formatListAttr(item?.piercings);

    // Safe spec fields
    const safeSpecs = Boolean(
      item?.height ||
      item?.weight ||
      item?.hair_color ||
      item?.eye_color ||
      item?.ethnicity ||
      item?.tattoos ||
      item?.piercings ||
      item?.career_start_year ||
      item?.place_of_birth
    );

    // Explicit / Spicy spec fields
    const spicySpecs = Boolean(
      item?.measurements ||
      item?.cup_size ||
      item?.band_size ||
      item?.waist ||
      item?.hip ||
      item?.breast_type ||
      item?.breast_size ||
      item?.butt_shape ||
      item?.butt_size
    );

    const anySpecs = includeAdult ? (safeSpecs || spicySpecs) : safeSpecs;

    const items = [
      { label: t('library.details.placeOfBirth') || 'Place of Birth', value: item?.place_of_birth, fullWidth: true },
      { label: t('library.details.activeYears') || 'Active Years', value: formatCareerYears(item?.career_start_year, item?.career_end_year, t('library.details.present') || 'Present') },
      { label: t('library.details.height') || 'Height', value: formatHeight(item?.height) },
      { label: t('library.details.weight') || 'Weight', value: formatWeight(item?.weight) },
      ...(includeAdult ? [
        { label: t('library.details.measurements') || 'Measurements', value: item?.measurements },
        { label: t('library.details.cupSize') || 'Cup Size', value: item?.cup_size },
        { label: t('library.details.bandSize') || 'Band Size', value: item?.band_size },
        { label: t('library.details.waist') || 'Waist', value: formatBodyDimension(item?.waist) },
        { label: t('library.details.hip') || 'Hip', value: formatBodyDimension(item?.hip) },
        { label: t('library.details.breastType') || 'Breast Type', value: formatPhysicalAttributeLabel(item?.breast_type, t) },
        { label: t('library.details.breastSize') || 'Breast Size', value: formatPhysicalAttributeLabel(item?.breast_size, t) },
        { label: t('library.details.buttShape') || 'Butt Shape', value: formatPhysicalAttributeLabel(item?.butt_shape, t) },
        { label: t('library.details.buttSize') || 'Butt Size', value: formatPhysicalAttributeLabel(item?.butt_size, t) },
      ] : []),
      { label: t('library.details.hairColor') || 'Hair Color', value: formatPhysicalAttributeLabel(item?.hair_color, t) },
      { label: t('library.details.eyeColor') || 'Eye Color', value: formatPhysicalAttributeLabel(item?.eye_color, t) },
      { label: t('library.details.ethnicity') || 'Ethnicity', value: formatPhysicalAttributeLabel(item?.ethnicity, t) },
      { label: t('library.details.tattoos') || 'Tattoos', value: tattooVal, fullWidth: true },
      { label: t('library.details.piercings') || 'Piercings', value: piercingVal, fullWidth: true },
    ];

    const dTitle = item?.name || item?.title || overviewTitle || (t('library.details.overview') || 'Overview');
    const sTitle = overviewTitle || (item?.title ? (t('library.details.overview') || 'Overview') : (t('library.details.biographyTitle') || 'Biography'));

    return {
      hasSafeSpecs: safeSpecs,
      hasSpicySpecs: spicySpecs,
      hasAnySpecs: anySpecs,
      specItems: items,
      drawerTitle: dTitle,
      sectionTitle: sTitle,
    };
  }, [includeAdult, item, overviewTitle, t]);

  return {
    includeAdult,
    hasSafeSpecs,
    hasSpicySpecs,
    hasAnySpecs,
    specItems,
    drawerTitle,
    sectionTitle,
  };
}

export default useEntityDetailSpecs;
