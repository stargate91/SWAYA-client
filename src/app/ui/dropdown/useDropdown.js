import { useState, useRef, useEffect, useLayoutEffect, useCallback, useMemo } from 'react';
import styles from '../Dropdown.module.css';

/**
 * Custom hook to detect text truncation on option buttons.
 *
 * @param {string} label - Option label
 * @returns {Object} { buttonRef, isTruncated, checkTruncation }
 */
export function useDropdownOptionTruncation(label) {
  const [isTruncated, setIsTruncated] = useState(false);
  const buttonRef = useRef(null);

  const checkTruncation = useCallback(() => {
    if (buttonRef.current) {
      const isTextTruncated = buttonRef.current.scrollWidth > buttonRef.current.clientWidth;
      setIsTruncated(isTextTruncated);
    }
  }, []);

  useEffect(() => {
    checkTruncation();
  }, [label, checkTruncation]);

  return {
    buttonRef,
    isTruncated,
    checkTruncation,
  };
}

/**
 * Custom hook managing search filtering, auto-focus, and positioning for DropdownMenu.
 *
 * @param {Object} params
 * @param {boolean} params.isOpen - Whether dropdown menu is open
 * @param {Array} [params.options=[]] - Dropdown options
 * @param {boolean} [params.searchable=false] - Whether search is enabled
 * @param {Object} [params.menuCoords] - Computed coordinates for the menu portal
 * @returns {Object} { searchTerm, setSearchTerm, searchInputRef, menuRef, filteredOptions, isNoResults }
 */
export function useDropdownMenu({
  isOpen,
  options = [],
  searchable = false,
  menuCoords,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (isOpen && searchable) {
      const timer = setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, searchable]);

  useLayoutEffect(() => {
    if (!menuRef.current || !menuCoords) return;
    menuRef.current.style.setProperty('--dropdown-menu-top', `${menuCoords.top}px`);
    menuRef.current.style.setProperty('--dropdown-menu-left', `${menuCoords.left}px`);
    menuRef.current.style.setProperty('--dropdown-menu-width', `${menuCoords.width}px`);
  }, [menuCoords]);

  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;
    const lower = searchTerm.toLowerCase();
    return options.filter((opt) =>
      String(opt.label || '').toLowerCase().includes(lower)
    );
  }, [options, searchTerm]);

  const isNoResults = filteredOptions.length === 0;

  return {
    searchTerm,
    setSearchTerm,
    searchInputRef,
    menuRef,
    filteredOptions,
    isNoResults,
  };
}

export function useDropdown({
  options = [],
  value,
  onChange,
  placeholder,
  disabled = false,
  variant = 'default',
  multiple = false,
  layout = 'stacked',
  onFilterChange,
  setCurrentPage,
  t,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const [menuCoords, setMenuCoords] = useState({ top: 0, left: 0, width: 0 });

  const isSorter = variant === 'sorter' || layout === 'inline';
  const displayPlaceholder = placeholder ?? (t ? t('common.select') : 'Select');
  const selectedOption = options.find((opt) => opt.value === value);

  const updateMenuCoords = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const threshold = 280;
      const spaceBelow = window.innerHeight - rect.bottom;
      const openUpwards = spaceBelow < threshold && rect.top > spaceBelow;

      setMenuCoords({
        top: openUpwards
          ? rect.top + window.scrollY - 6
          : rect.bottom + window.scrollY + 6,
        left: rect.left + window.scrollX,
        width: isSorter && multiple ? Math.max(rect.width, 220) : rect.width,
        openUpwards,
      });
    }
  }, [isSorter, multiple]);

  useLayoutEffect(() => {
    if (isOpen) {
      updateMenuCoords();
      window.addEventListener('scroll', updateMenuCoords, true);
      window.addEventListener('resize', updateMenuCoords);
    }
    return () => {
      window.removeEventListener('scroll', updateMenuCoords, true);
      window.removeEventListener('resize', updateMenuCoords);
    };
  }, [isOpen, updateMenuCoords]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        !event.target.closest(`.${styles.menu}`)
      ) {
        setIsOpen(false);
      }
    }
    if (typeof document !== 'undefined') {
      document.addEventListener('mousedown', handleClickOutside, true);
      return () => document.removeEventListener('mousedown', handleClickOutside, true);
    }
  }, []);

  const handleToggle = useCallback(() => {
    if (!disabled) {
      if (!isOpen) {
        updateMenuCoords();
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    }
  }, [disabled, isOpen, updateMenuCoords]);

  const handleOptionClick = useCallback((val) => {
    if (onFilterChange) {
      onFilterChange(val);
    } else if (onChange) {
      let newValue;
      if (multiple) {
        const currentArray = Array.isArray(value) ? value : [];
        if (currentArray.includes(val)) {
          newValue = currentArray.filter((v) => v !== val);
        } else {
          newValue = [...currentArray, val];
        }
      } else {
        newValue = val;
      }
      onChange({ target: { value: newValue } });
    }
    if (setCurrentPage) {
      setCurrentPage(1);
    }
    if (!multiple) {
      setIsOpen(false);
    }
  }, [onFilterChange, onChange, multiple, value, setCurrentPage]);

  const getTriggerText = useCallback(() => {
    if (multiple) {
      const selectedLabels = options
        .filter((opt) => Array.isArray(value) && value.includes(opt.value))
        .map((opt) => opt.label);
      if (selectedLabels.length === 0) {
        return placeholder ?? (t ? (t('library.filter.allTags') || 'All Tags') : 'All Tags');
      }
      return selectedLabels.join(', ');
    }
    return selectedOption ? selectedOption.label : displayPlaceholder;
  }, [multiple, options, value, placeholder, t, selectedOption, displayPlaceholder]);

  return {
    isOpen,
    setIsOpen,
    handleToggle,
    containerRef,
    triggerRef,
    menuCoords,
    handleOptionClick,
    getTriggerText,
    isSorter,
    selectedOption,
  };
}

export default useDropdown;
