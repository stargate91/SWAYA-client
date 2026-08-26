import { useId } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronUp } from '@/ui/icons';
import Tooltip from './Tooltip';
import { useTranslation } from '@/providers/LanguageContext';
import Field from './Field';
import { useDropdown } from './dropdown/useDropdown';
import DropdownMenu from './dropdown/DropdownMenu';
import DropdownOptionItem from './dropdown/DropdownOptionItem';
import styles from './Dropdown.module.css';

export { DropdownMenu, DropdownOptionItem };

const WIDTH_PRESETS = {
  sm: '8.5rem',
  md: '13rem',
  lg: '16rem',
  full: '100%',
  auto: 'auto',
};

export default function Dropdown({
  label,
  labelPlacement = 'top',
  options = [],
  value,
  onChange,
  hint,
  className = '',
  placeholder,
  searchable = false,
  disabled = false,
  variant = 'default',
  sortDirection = 'asc',
  onSortDirectionToggle,
  menuClassName = '',
  themeColor = '',
  multiple = false,
  layout = 'stacked',
  onFilterChange,
  setCurrentPage,
  size,
  width,
  flex,
}) {
  const { t } = useTranslation();
  const generatedId = useId();

  const isSorter = variant === 'sorter' || layout === 'inline';
  const controlSize = size || (isSorter ? 'sm' : 'md');

  const chevronSizeMap = {
    xs: 10,
    sm: 12,
    md: 12,
    lg: 14,
  };
  const chevronSize = chevronSizeMap[controlSize] || 12;

  const {
    isOpen,
    handleToggle,
    containerRef,
    triggerRef,
    menuCoords,
    handleOptionClick,
    getTriggerText,
  } = useDropdown({
    options,
    value,
    onChange,
    placeholder,
    disabled,
    variant,
    multiple,
    layout,
    onFilterChange,
    setCurrentPage,
    t,
  });

  const dropdownContent = (
    <div
      className={`${styles.dropdown} ${
        isSorter ? styles['dropdown-sorter'] : ''
      }`.trim()}
      // eslint-disable-next-line react/forbid-dom-props
      style={themeColor ? { '--list-theme-color': themeColor } : undefined}
    >
      <div className={styles['sorter-wrapper']}>
        <button
          ref={triggerRef}
          type="button"
          className={`${styles.trigger} ${
            styles['trigger--' + controlSize] || ''
          } ${multiple ? 'ui-dropdown__trigger--sorter-custom' : ''} ${
            disabled ? styles['is-disabled'] : ''
          } ${isOpen ? styles['is-open'] : ''}`.trim()}
          onClick={handleToggle}
          disabled={disabled}
        >
          <span className={styles['trigger-text']}>
            {label && labelPlacement === 'inside' && (
              <span className={styles['trigger-label']}>{label} </span>
            )}
            {getTriggerText()}
          </span>
          {(!isSorter || multiple) && (
            <span
              className={`${styles.chevron} ${
                isOpen ? styles['is-open'] : ''
              } ${multiple ? styles['chevron-multiple'] : ''}`.trim()}
            >
              <ChevronDown size={chevronSize} />
            </span>
          )}
        </button>

        {isSorter && !multiple && onSortDirectionToggle && (
          <Tooltip
            content={
              sortDirection === 'asc'
                ? t('dropdown.ascending')
                : t('dropdown.descending')
            }
            side="top"
          >
            <button
              type="button"
              className={styles['direction-btn']}
              onClick={(e) => {
                e.stopPropagation();
                if (onSortDirectionToggle) onSortDirectionToggle();
              }}
              title={null}
            >
              {sortDirection === 'asc' ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </button>
          </Tooltip>
        )}
      </div>

      <DropdownMenu
        isOpen={isOpen}
        menuCoords={menuCoords}
        options={options}
        value={value}
        onOptionClick={handleOptionClick}
        searchable={searchable}
        variant={
          variant === 'default' && layout === 'inline' ? 'sorter' : variant
        }
        size={controlSize}
        className={menuClassName}
        themeColor={themeColor}
        multiple={multiple}
      />
    </div>
  );

  const fieldLabel = labelPlacement === 'inside' ? undefined : label;
  const resolvedWidth = WIDTH_PRESETS[width] || width;
  const flexStyle = typeof flex === 'number' && flex !== 1
    ? { flex: `${flex} 1 0%`, minWidth: 0, width: 0 }
    : undefined;

  const containerStyle = (resolvedWidth || flexStyle)
    ? {
      ...(resolvedWidth ? { width: resolvedWidth, maxWidth: resolvedWidth, flexShrink: 0 } : {}),
      ...flexStyle,
    }
    : undefined;

  const rootClass = `${layout === 'inline' ? styles['inline-container'] : styles['dropdown-field']} ${
    flex === 1 ? styles['flex-1'] : ''
  } ${className}`.trim();

  if (layout === 'inline') {
    return (
      <div
        ref={containerRef}
        className={rootClass}
        // eslint-disable-next-line react/forbid-dom-props
        style={containerStyle}
      >
        {fieldLabel && (
          <span className={styles['inline-label']}>{fieldLabel}</span>
        )}
        {dropdownContent}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={rootClass}
      // eslint-disable-next-line react/forbid-dom-props
      style={containerStyle}
    >
      <Field label={fieldLabel} hint={hint} htmlFor={generatedId} className={styles['field-inner']}>
        {dropdownContent}
      </Field>
    </div>
  );
}

Dropdown.propTypes = {
  label: PropTypes.string,
  labelPlacement: PropTypes.oneOf(['top', 'inside']),
  options: PropTypes.array,
  value: PropTypes.any,
  onChange: PropTypes.func,
  hint: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  searchable: PropTypes.bool,
  disabled: PropTypes.bool,
  variant: PropTypes.string,
  sortDirection: PropTypes.oneOf(['asc', 'desc']),
  onSortDirectionToggle: PropTypes.func,
  menuClassName: PropTypes.string,
  themeColor: PropTypes.string,
  multiple: PropTypes.bool,
  layout: PropTypes.oneOf(['stacked', 'inline']),
  onFilterChange: PropTypes.func,
  setCurrentPage: PropTypes.func,
  size: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.oneOf(['sm', 'md', 'lg', 'full', 'auto']),
    PropTypes.string,
    PropTypes.number,
  ]),
  flex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
