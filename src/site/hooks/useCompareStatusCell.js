import { useMemo } from 'react';
import { Check, X, Minus } from 'lucide-react';
import { useTranslation } from '@/providers/LanguageContext';

/**
 * Hook to compute status badge styling, icon, and localized label for CompareStatusCell.
 */
export function useCompareStatusCell({ value, isSwaya = false, t: customT } = {}) {
  const { t: contextT } = useTranslation();
  const t = customT || contextT;

  return useMemo(() => {
    if (value === true) {
      return {
        variantClassKey: 'status-badge--yes',
        icon: Check,
        label: t('landing.compare.yes', { defaultValue: 'Yes' }),
      };
    }

    if (value === false) {
      return {
        variantClassKey: 'status-badge--no',
        icon: X,
        label: t('landing.compare.no', { defaultValue: 'No' }),
      };
    }

    if (isSwaya && typeof value === 'string') {
      return {
        variantClassKey: 'status-badge--yes',
        icon: Check,
        label: value,
      };
    }

    const partialLabel =
      value === 'Partial'
        ? t('landing.compare.partial', { defaultValue: 'Partial' })
        : value;

    return {
      variantClassKey: 'status-badge--partial',
      icon: Minus,
      label: partialLabel,
    };
  }, [value, isSwaya, t]);
}

export default useCompareStatusCell;
