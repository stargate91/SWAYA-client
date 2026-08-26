import { useMemo } from 'react';
import { useLibraryModeStore, isNsfwMode } from '@/stores/useLibraryModeStore';

const normVal = (v) => (v || '').replace(/_/g, ' ').trim().toLowerCase();

function filterItemsByData(items, dataValues) {
  if (!dataValues || dataValues.length === 0) return [];
  const available = new Set(dataValues.map((v) => normVal(v)));
  return items.filter((item) => available.has(normVal(item.value)));
}

export function useLibraryAdvancedFilters({ filterData, settings, t }) {
  const sessionMode = useLibraryModeStore((state) => state.sessionMode);
  const isAdultAllowed = Boolean(settings?.include_adult || isNsfwMode(sessionMode));

  const breastSizeItems = useMemo(() => filterItemsByData([
    { value: 'SMALL', label: t('dynamic.performerTraits.breastSizes.small') || 'Small' },
    { value: 'MEDIUM', label: t('dynamic.performerTraits.breastSizes.medium') || 'Medium' },
    { value: 'BIG', label: t('dynamic.performerTraits.breastSizes.big') || 'Big' },
    { value: 'EXTRA_BIG', label: t('dynamic.performerTraits.breastSizes.extra_big') || 'Extra Big' },
  ], filterData?.breast_sizes), [filterData?.breast_sizes, t]);

  const buttShapeItems = useMemo(() => filterItemsByData([
    { value: 'BUBBLE', label: t('dynamic.performerTraits.buttShapes.bubble') || 'Bubble' },
    { value: 'HEART', label: t('dynamic.performerTraits.buttShapes.heart') || 'Heart' },
    { value: 'SQUARE', label: t('dynamic.performerTraits.buttShapes.square') || 'Square' },
    { value: 'FLAT', label: t('dynamic.performerTraits.buttShapes.flat') || 'Flat' },
  ], filterData?.butt_shapes), [filterData?.butt_shapes, t]);

  const buttSizeItems = useMemo(() => filterItemsByData([
    { value: 'SMALL', label: t('dynamic.performerTraits.buttSizes.small') || 'Small' },
    { value: 'MEDIUM', label: t('dynamic.performerTraits.buttSizes.medium') || 'Medium' },
    { value: 'BIG', label: t('dynamic.performerTraits.buttSizes.big') || 'Big' },
    { value: 'EXTRA_BIG', label: t('dynamic.performerTraits.buttSizes.extra_big') || 'Extra Big' },
  ], filterData?.butt_sizes), [filterData?.butt_sizes, t]);

  const tattooItems = useMemo(() => filterItemsByData([
    { value: 'yes', label: t('library.filter.yes') || 'Yes' },
    { value: 'no', label: t('library.filter.no') || 'No' },
  ], filterData?.tattoos), [filterData?.tattoos, t]);

  const piercingItems = useMemo(() => filterItemsByData([
    { value: 'yes', label: t('library.filter.yes') || 'Yes' },
    { value: 'no', label: t('library.filter.no') || 'No' },
  ], filterData?.piercings), [filterData?.piercings, t]);

  return {
    isAdultAllowed,
    breastSizeItems,
    buttShapeItems,
    buttSizeItems,
    tattooItems,
    piercingItems,
  };
}
