export const getGenderOptions = (t) => [
  { value: '1', label: t('library.performerEdit.female') || 'Female' },
  { value: '2', label: t('library.performerEdit.male') || 'Male' },
  { value: '0', label: t('common.other') || 'Other' },
];

export const getSameSexOnlyOptions = () => [
  { value: 'No', label: 'No' },
  { value: 'Yes', label: 'Yes' },
];

export const getBreastTypeOptions = (t) => [
  { value: 'NATURAL', label: t('dynamic.performerTraits.breastTypes.natural') || 'Natural' },
  { value: 'FAKE', label: t('dynamic.performerTraits.breastTypes.fake') || 'Fake / Implant' },
  { value: 'NA', label: t('dynamic.performerTraits.breastTypes.na') || 'N/A' },
];

export const getCupSizeOptions = () => [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
  { value: 'DD', label: 'DD' },
  { value: 'DDD', label: 'DDD' },
  { value: 'E', label: 'E' },
  { value: 'F', label: 'F' },
  { value: 'G', label: 'G' },
  { value: 'H', label: 'H' },
  { value: 'I', label: 'I' },
  { value: 'J', label: 'J' },
  { value: 'K', label: 'K' },
];

export const getHairColorOptions = (t) => [
  { value: 'BLONDE', label: t('dynamic.performerTraits.hairColors.blonde') || 'Blonde' },
  { value: 'BRUNETTE', label: t('dynamic.performerTraits.hairColors.brunette') || 'Brunette' },
  { value: 'BLACK', label: t('dynamic.performerTraits.hairColors.black') || 'Black' },
  { value: 'RED', label: t('dynamic.performerTraits.hairColors.red') || 'Red' },
  { value: 'AUBURN', label: t('dynamic.performerTraits.hairColors.auburn') || 'Auburn' },
  { value: 'GREY', label: t('dynamic.performerTraits.hairColors.grey') || 'Grey' },
  { value: 'BALD', label: t('dynamic.performerTraits.hairColors.bald') || 'Bald' },
  { value: 'VARIOUS', label: t('dynamic.performerTraits.hairColors.various') || 'Various' },
  { value: 'WHITE', label: t('dynamic.performerTraits.hairColors.white') || 'White' },
  { value: 'OTHER', label: t('common.other') || 'Other' },
];

export const getEyeColorOptions = (t) => [
  { value: 'BLUE', label: t('dynamic.performerTraits.eyeColors.blue') || 'Blue' },
  { value: 'BROWN', label: t('dynamic.performerTraits.eyeColors.brown') || 'Brown' },
  { value: 'GREY', label: t('dynamic.performerTraits.eyeColors.grey') || 'Grey' },
  { value: 'GREEN', label: t('dynamic.performerTraits.eyeColors.green') || 'Green' },
  { value: 'HAZEL', label: t('dynamic.performerTraits.eyeColors.hazel') || 'Hazel' },
  { value: 'RED', label: t('dynamic.performerTraits.eyeColors.red') || 'Red' },
];

export const getEthnicityOptions = (t) => [
  { value: 'CAUCASIAN', label: t('dynamic.performerTraits.ethnicities.caucasian') || 'Caucasian' },
  { value: 'BLACK', label: t('dynamic.performerTraits.ethnicities.black') || 'Black' },
  { value: 'ASIAN', label: t('dynamic.performerTraits.ethnicities.asian') || 'Asian' },
  { value: 'INDIAN', label: t('dynamic.performerTraits.ethnicities.indian') || 'Indian' },
  { value: 'LATIN', label: t('dynamic.performerTraits.ethnicities.latin') || 'Latin' },
  { value: 'MIDDLE_EASTERN', label: t('dynamic.performerTraits.ethnicities.middle_eastern') || 'Middle Eastern' },
  { value: 'MIXED', label: t('dynamic.performerTraits.ethnicities.mixed') || 'Mixed' },
  { value: 'OTHER', label: t('common.other') || 'Other' },
];

export const getButtShapeOptions = (t) => [
  { value: 'BUBBLE', label: t('dynamic.performerTraits.buttShapes.bubble') || 'Bubble' },
  { value: 'HEART', label: t('dynamic.performerTraits.buttShapes.heart') || 'Heart' },
  { value: 'SQUARE', label: t('dynamic.performerTraits.buttShapes.square') || 'Square' },
  { value: 'FLAT', label: t('dynamic.performerTraits.buttShapes.flat') || 'Flat' },
];

export const getButtSizeOptions = (t) => [
  { value: 'SMALL', label: t('dynamic.performerTraits.buttSizes.small') || 'Small' },
  { value: 'MEDIUM', label: t('dynamic.performerTraits.buttSizes.medium') || 'Medium' },
  { value: 'BIG', label: t('dynamic.performerTraits.buttSizes.big') || 'Big' },
  { value: 'EXTRA_BIG', label: t('dynamic.performerTraits.buttSizes.extra_big') || 'Extra Big' },
];

export const getDropdownOptions = (standardOptions, currentValue) => {
  if (!currentValue) return standardOptions;
  const upperValue = currentValue.toUpperCase();
  const exists = standardOptions.some(opt => opt.value === upperValue);
  if (exists) return standardOptions;
  const label = currentValue.charAt(0).toUpperCase() + currentValue.slice(1).toLowerCase();
  return [...standardOptions, { value: upperValue, label }];
};
