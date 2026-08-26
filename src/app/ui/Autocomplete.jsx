import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import Input from './Input';
import { useAutocomplete } from './useAutocomplete';
import styles from './Autocomplete.module.css';

/**
 * Autocomplete (Combobox) component that shows search suggestions under an Input field.
 * Uses React Portal to avoid overflow clipping in headers, cards, or modals.
 */
export default function Autocomplete({
  value,
  onChange,
  options = [],
  onSelect,
  renderItem,
  renderFooter,
  size = 'md',
  placeholder,
  leftElement,
  rightElement,
  className = '',
  dropdownClassName = '',
  minDropdownWidth = 180,
  ...props
}) {
  const {
    isOpen,
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
  } = useAutocomplete({
    onChange,
    options,
    onSelect,
    minDropdownWidth,
  });

  const dropdownPortal = isOpen && (options.length > 0 || renderFooter) ? (
    createPortal(
      <div
        ref={dropdownRef}
        // eslint-disable-next-line react/forbid-dom-props
        style={{
          position: 'absolute',
          top: `${menuCoords.top}px`,
          left: `${menuCoords.left}px`,
          width: `${menuCoords.width}px`,
          zIndex: 1000,
          visibility: menuCoords.width > 0 ? 'visible' : 'hidden',
        }}
        className={`${styles.dropdown} ${dropdownClassName}`.trim()}
        onWheel={(e) => e.stopPropagation()}
        onScroll={handleScroll}
      >
        {visibleOptions.map((opt, index) => (
          <button
            key={opt.id || opt.value || opt.name || index}
            type="button"
            className={styles.item}
            onClick={() => handleSelectOption(opt)}
          >
            {renderItem ? renderItem(opt) : (opt.name || opt.label || String(opt))}
          </button>
        ))}
        {renderFooter && renderFooter(closeDropdown, styles.item, styles['item-create'])}
      </div>,
      document.body
    )
  ) : null;

  return (
    <div className={`${styles.wrapper} ${className}`.trim()} ref={containerRef}>
      <Input
        type="text"
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        size={size}
        placeholder={placeholder}
        leftElement={leftElement}
        rightElement={rightElement}
        {...props}
      />
      {dropdownPortal}
    </div>
  );
}

Autocomplete.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  onSelect: PropTypes.func.isRequired,
  renderItem: PropTypes.func,
  renderFooter: PropTypes.func,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  placeholder: PropTypes.string,
  leftElement: PropTypes.node,
  rightElement: PropTypes.node,
  className: PropTypes.string,
  dropdownClassName: PropTypes.string,
  minDropdownWidth: PropTypes.number,
};
