import { useState, useRef, useEffect, useMemo, useCallback } from 'react';

const ICON_SIZE_MAP = {
  xs: 10,
  sm: 12,
  md: 12,
  lg: 14,
};

/**
 * Normalizes an option or source item to standard { value, label, icon } format.
 *
 * @param {Object} item - Option or source item
 * @returns {Object|null} Normalized item
 */
export function normalizeComboItem(item) {
  if (!item) return null;
  return {
    ...item,
    value: item.value ?? item.id,
    label: item.label ?? item.name ?? '',
    icon: item.icon,
    disabled: Boolean(item.disabled),
  };
}

/**
 * Custom hook encapsulating dropdown state, click-outside detection,
 * and option/source normalization for SearchInputCombo.
 *
 * @param {Object} [params]
 * @param {Array} [params.options=[]] - Selectable options/types
 * @param {string} [params.selectedOption] - Currently selected option value
 * @param {Function} [params.onOptionChange] - Option change callback
 * @param {Array} [params.sources=[]] - Selectable sources
 * @param {string} [params.selectedSource] - Currently selected source value
 * @param {Function} [params.onSourceChange] - Source change callback
 * @param {string} [params.size='md'] - Component size ('xs'|'sm'|'md'|'lg')
 * @param {boolean} [params.disabled=false] - Disabled state
 * @returns {Object}
 */
export function useSearchInputCombo({
  options = [],
  selectedOption,
  onOptionChange,
  sources = [],
  onSourceChange,
  size = 'md',
  disabled = false,
} = {}) {

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (typeof document !== 'undefined') {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  const normalizedOptions = useMemo(() => {
    return (options || []).map(normalizeComboItem).filter(Boolean);
  }, [options]);

  const normalizedSources = useMemo(() => {
    return (sources || []).map(normalizeComboItem).filter(Boolean);
  }, [sources]);

  const activeOption = useMemo(() => {
    return normalizedOptions.find((o) => o.value === selectedOption) || normalizedOptions[0] || null;
  }, [normalizedOptions, selectedOption]);

  const ActiveIcon = activeOption?.icon || null;
  const activeLabel = activeOption?.label || '';
  const activeIconSize = ICON_SIZE_MAP[size] || 12;

  const hasOptions = normalizedOptions.length > 0;
  const hasSources = normalizedSources.length > 0;
  const hasSelector = hasOptions || hasSources;

  const handleToggle = useCallback(() => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  }, [disabled]);

  const handleOptionSelect = useCallback(
    (optVal) => {
      const opt = normalizedOptions.find((o) => o.value === optVal);
      if (opt?.disabled) return;
      onOptionChange?.(optVal);
      setIsOpen(false);
    },
    [normalizedOptions, onOptionChange]
  );

  const handleSourceSelect = useCallback(
    (sourceVal) => {
      const src = normalizedSources.find((s) => s.value === sourceVal);
      if (src?.disabled) return;
      onSourceChange?.(sourceVal);
    },
    [normalizedSources, onSourceChange]
  );

  return {
    isOpen,
    setIsOpen,
    containerRef,
    handleToggle,
    activeOption,
    ActiveIcon,
    activeLabel,
    activeIconSize,
    normalizedOptions,
    normalizedSources,
    hasOptions,
    hasSources,
    hasSelector,
    handleOptionSelect,
    handleSourceSelect,
  };
}

export default useSearchInputCombo;
