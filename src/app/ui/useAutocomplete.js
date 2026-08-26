import { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react';

export function useAutocomplete({
  onChange,
  options = [],
  onSelect,
  minDropdownWidth = 180,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(100);
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);
  const [menuCoords, setMenuCoords] = useState({ top: 0, left: 0, width: 0 });

  const [prevOptions, setPrevOptions] = useState(options);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  if (options !== prevOptions || isOpen !== prevIsOpen) {
    setPrevOptions(options);
    setPrevIsOpen(isOpen);
    setVisibleCount(100);
  }

  const handleScroll = useCallback((e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop - clientHeight < 50) {
      setVisibleCount((prev) => Math.min(prev + 100, options.length));
    }
  }, [options.length]);

  const updateCoords = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const openUpwards = spaceBelow < 200 && rect.top > spaceBelow;

      setMenuCoords({
        top: openUpwards
          ? rect.top + window.scrollY - 6
          : rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: Math.max(rect.width, minDropdownWidth),
      });
    }
  }, [minDropdownWidth]);

  useLayoutEffect(() => {
    if (isOpen) {
      updateCoords();
      window.addEventListener('scroll', updateCoords, true);
      window.addEventListener('resize', updateCoords);
    }
    return () => {
      window.removeEventListener('scroll', updateCoords, true);
      window.removeEventListener('resize', updateCoords);
    };
  }, [isOpen, updateCoords]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        (!dropdownRef.current || !dropdownRef.current.contains(event.target))
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen && typeof document !== 'undefined') {
      document.addEventListener('mousedown', handleClickOutside, true);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside, true);
      };
    }
  }, [isOpen]);

  const handleSelectOption = useCallback((opt) => {
    onSelect?.(opt);
    onChange?.(opt.name || opt.label || String(opt));
    setIsOpen(false);
  }, [onSelect, onChange]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && isOpen && options.length > 0) {
      e.preventDefault();
      handleSelectOption(options[0]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }, [isOpen, options, handleSelectOption]);

  const handleFocus = useCallback(() => {
    updateCoords();
    setIsOpen(true);
  }, [updateCoords]);

  const handleInputChange = useCallback((val) => {
    onChange?.(val);
    setIsOpen(true);
  }, [onChange]);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  const visibleOptions = options.slice(0, visibleCount);

  return {
    isOpen,
    setIsOpen,
    closeDropdown,
    visibleOptions,
    containerRef,
    dropdownRef,
    menuCoords,
    handleScroll,
    handleSelectOption,
    handleKeyDown,
    handleFocus,
    handleInputChange,
  };
}

export default useAutocomplete;
